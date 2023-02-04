import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default defineEventHandler(async () => {
  const resp = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: "TechGenius7777",
      repo: "coffee",
    }
  );
  return resp.data.tag_name;
});
