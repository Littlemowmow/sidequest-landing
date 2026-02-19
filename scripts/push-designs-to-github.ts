import { getUncachableGitHubClient } from "../server/github";
import * as fs from "fs";

const REPO_OWNER = "Littlemowmow";
const REPO_NAME = "sidequest-landing";
const BRANCH = "main";
const COMMIT_MESSAGE = "Add iOS app screen mockups to /designs folder";

async function pushDesigns() {
  console.log("Getting GitHub client...");
  const octokit = await getUncachableGitHubClient();

  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  const { data: ref } = await octokit.git.getRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `heads/${BRANCH}`,
  });
  const currentSha = ref.object.sha;
  console.log(`Current branch SHA: ${currentSha}`);

  const designsFile = fs.readFileSync("/home/runner/workspace/client/src/pages/designs.tsx", "utf-8");
  console.log(`Read designs.tsx (${designsFile.length} chars)`);

  console.log("Creating blob...");
  const { data: blob } = await octokit.git.createBlob({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    content: Buffer.from(designsFile).toString("base64"),
    encoding: "base64",
  });

  console.log("Creating tree...");
  const { data: newTree } = await octokit.git.createTree({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    base_tree: currentSha,
    tree: [
      {
        path: "designs/app-screens.tsx",
        mode: "100644",
        type: "blob",
        sha: blob.sha,
      },
    ],
  });

  console.log("Creating commit...");
  const { data: newCommit } = await octokit.git.createCommit({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    message: COMMIT_MESSAGE,
    tree: newTree.sha,
    parents: [currentSha],
  });

  console.log("Updating branch...");
  await octokit.git.updateRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `heads/${BRANCH}`,
    sha: newCommit.sha,
  });

  console.log(`\nPushed successfully!`);
  console.log(`File: designs/app-screens.tsx`);
  console.log(`Repo: https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/main/designs`);
  console.log(`Commit: ${newCommit.sha.substring(0, 7)} - ${COMMIT_MESSAGE}`);
}

pushDesigns().catch((err) => {
  console.error("Failed to push:", err.message || err);
  process.exit(1);
});
