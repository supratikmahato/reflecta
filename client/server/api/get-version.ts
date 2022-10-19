import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default defineEventHandler(async (event) => {
  const resp = await octokit.request("GET /repos/{owner}/{repo}/tags", {
    owner: "TechGenius7777",
    repo: "coffee",
  });
  return resp.data[0].name;
});
