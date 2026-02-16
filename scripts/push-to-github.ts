import { getUncachableGitHubClient } from "../server/github";
import * as fs from "fs";
import * as path from "path";

const REPO_OWNER = "Littlemowmow";
const REPO_NAME = "sidequest-landing";
const BRANCH = "main";
const COMMIT_MESSAGE = "Polish iOS app screen mockups — realistic frames, status bars, glows, refined spacing";

const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", ".cache", ".local", ".config",
  ".upm", ".replit", "__pycache__", ".vite"
]);

const IGNORE_FILES = new Set([
  ".replit", "replit.nix", ".breakpoints", "generated-icon.png",
  ".gitignore"
]);

function getAllFiles(dir: string, base: string = ""): { path: string; content: string }[] {
  const results: { path: string; content: string }[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name) && !entry.name.startsWith(".")) {
        results.push(...getAllFiles(fullPath, relativePath));
      }
    } else if (entry.isFile()) {
      if (IGNORE_FILES.has(entry.name)) continue;
      if (entry.name.endsWith(".png") || entry.name.endsWith(".ico")) continue;

      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        results.push({ path: relativePath, content });
      } catch {
      }
    }
  }
  return results;
}

async function pushToGitHub() {
  console.log("Getting GitHub client...");
  const octokit = await getUncachableGitHubClient();

  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  let currentSha: string | undefined;
  try {
    const { data: ref } = await octokit.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `heads/${BRANCH}`,
    });
    currentSha = ref.object.sha;
    console.log(`Current branch SHA: ${currentSha}`);
  } catch (e: any) {
    if (e.status === 404) {
      console.log("Branch not found, will create new branch");
    } else {
      throw e;
    }
  }

  console.log("Collecting files...");
  const files = getAllFiles("/home/runner/workspace");
  console.log(`Found ${files.length} files to push`);

  console.log("Creating blobs...");
  const tree: { path: string; mode: "100644"; type: "blob"; sha: string }[] = [];

  const batchSize = 10;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const blobResults = await Promise.all(
      batch.map(async (file) => {
        const { data: blob } = await octokit.git.createBlob({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          content: Buffer.from(file.content).toString("base64"),
          encoding: "base64",
        });
        return { path: file.path, sha: blob.sha };
      })
    );

    for (const result of blobResults) {
      tree.push({
        path: result.path,
        mode: "100644",
        type: "blob",
        sha: result.sha,
      });
    }
    console.log(`  Uploaded ${Math.min(i + batchSize, files.length)}/${files.length} files`);
  }

  console.log("Creating tree...");
  const { data: newTree } = await octokit.git.createTree({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    tree,
    ...(currentSha ? { base_tree: currentSha } : {}),
  });

  console.log("Creating commit...");
  const { data: newCommit } = await octokit.git.createCommit({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    message: COMMIT_MESSAGE,
    tree: newTree.sha,
    parents: currentSha ? [currentSha] : [],
  });

  console.log("Updating branch reference...");
  if (currentSha) {
    await octokit.git.updateRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `heads/${BRANCH}`,
      sha: newCommit.sha,
    });
  } else {
    await octokit.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${BRANCH}`,
      sha: newCommit.sha,
    });
  }

  console.log(`\nPushed successfully to https://github.com/${REPO_OWNER}/${REPO_NAME}`);
  console.log(`Commit: ${newCommit.sha.substring(0, 7)} - ${COMMIT_MESSAGE}`);
}

pushToGitHub().catch((err) => {
  console.error("Failed to push:", err.message || err);
  process.exit(1);
});
