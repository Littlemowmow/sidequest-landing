import { getUncachableGitHubClient } from "../server/github";
import * as fs from "fs";
import * as path from "path";

const IGNORE_PATTERNS = [
  "node_modules",
  "dist",
  ".DS_Store",
  "server/public",
  ".git",
  ".cache",
  ".config",
  ".upm",
  ".local",
  "*.tar.gz",
  ".replit",
  ".breakpoints",
  "generated-icon.png",
  "script/push-to-github.ts",
  "script/create-repo.ts",
];

function shouldIgnore(filePath: string): boolean {
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.startsWith("*")) {
      if (filePath.endsWith(pattern.slice(1))) return true;
    } else if (filePath === pattern || filePath.startsWith(pattern + "/") || filePath.startsWith(pattern)) {
      return true;
    }
  }
  return false;
}

function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (shouldIgnore(relativePath)) continue;
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }
  return files;
}

function isBinaryFile(filePath: string): boolean {
  const binaryExts = [".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp", ".woff", ".woff2", ".ttf", ".eot", ".mp4", ".mp3", ".pdf"];
  return binaryExts.some(ext => filePath.toLowerCase().endsWith(ext));
}

async function pushToGithub() {
  const octokit = await getUncachableGitHubClient();
  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;
  const repo = "sidequest-landing";
  
  console.log(`Pushing to ${owner}/${repo}...`);

  // Initialize the repo with a README first if it's empty
  let isEmptyRepo = false;
  try {
    await octokit.repos.getContent({ owner, repo, path: "" });
  } catch (e: any) {
    if (e.status === 409 || e.status === 404) {
      isEmptyRepo = true;
    }
  }

  if (isEmptyRepo) {
    console.log("Repo is empty, initializing with README...");
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "README.md",
      message: "Initial commit",
      content: Buffer.from("# SideQuest Landing Page\n\nCollege group trip planning app.\n").toString("base64"),
    });
    console.log("Repo initialized.");
  }

  const workDir = "/home/runner/workspace";
  const files = getAllFiles(workDir);
  console.log(`Found ${files.length} files to push`);

  const blobs: { path: string; sha: string; mode: string; type: string }[] = [];
  
  for (const file of files) {
    const fullPath = path.join(workDir, file);
    const isBinary = isBinaryFile(file);
    
    let content: string;
    let encoding: "base64" | "utf-8";
    
    if (isBinary) {
      content = fs.readFileSync(fullPath).toString("base64");
      encoding = "base64";
    } else {
      content = fs.readFileSync(fullPath, "utf-8");
      encoding = "utf-8";
    }
    
    const { data: blob } = await octokit.git.createBlob({
      owner,
      repo,
      content,
      encoding,
    });
    
    blobs.push({
      path: file,
      sha: blob.sha,
      mode: "100644",
      type: "blob",
    });
    
    process.stdout.write(`\r  Uploaded ${blobs.length}/${files.length}: ${file}                    `);
  }
  
  console.log("\n\nCreating tree...");
  const { data: tree } = await octokit.git.createTree({
    owner,
    repo,
    tree: blobs as any,
  });

  // Get the current commit on main to use as parent
  const { data: ref } = await octokit.git.getRef({ owner, repo, ref: "heads/main" });
  const parentSha = ref.object.sha;

  console.log("Creating commit...");
  const { data: commit } = await octokit.git.createCommit({
    owner,
    repo,
    message: "SideQuest landing page - full codebase",
    tree: tree.sha,
    parents: [parentSha],
  });

  console.log("Updating main branch...");
  await octokit.git.updateRef({
    owner,
    repo,
    ref: "heads/main",
    sha: commit.sha,
    force: true,
  });

  console.log(`\nDone! All code pushed to: https://github.com/${owner}/${repo}`);
}

pushToGithub().catch(console.error);
