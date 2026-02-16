import { getUncachableGitHubClient } from "../server/github";

async function createRepo() {
  const octokit = await getUncachableGitHubClient();
  
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);
  
  const repoName = "sidequest-landing";
  
  try {
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: "SideQuest - College group trip planning app landing page",
      private: false,
      auto_init: false,
    });
    console.log(`Repository created: ${repo.html_url}`);
    console.log(`Clone URL: ${repo.clone_url}`);
    console.log(`\nNext: push code with:`);
    console.log(`git remote add github ${repo.clone_url}`);
    console.log(`git push github main`);
  } catch (err: any) {
    if (err.status === 422) {
      const { data: repo } = await octokit.repos.get({ owner: user.login, repo: repoName });
      console.log(`Repository already exists: ${repo.html_url}`);
      console.log(`Clone URL: ${repo.clone_url}`);
      console.log(`\nNext: push code with:`);
      console.log(`git remote add github ${repo.clone_url}`);
      console.log(`git push github main`);
    } else {
      throw err;
    }
  }
}

createRepo().catch(console.error);
