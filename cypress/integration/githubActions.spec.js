import { login } from "../pages/GithubPage";
import {
  addNewRepo,
  verifyNewRepoCreated,
  openRepoDetails,
} from "../pages/GithubMainPage";
import {
  commitReadMeFile,
  addBranch,
  addFile,
  updateFile,
  createPullRequest,
  mergePullRequest,
} from "../pages/GithubRepoDetailsPage";

describe("Github actions test", () => {
  beforeEach(() => {
    login();
  });

  it("Add new repo", () => {
    addNewRepo();
    verifyNewRepoCreated();
  });

  it("Commit a README file", () => {
    openRepoDetails();
    commitReadMeFile();
  });

  it("Add a new branch to repo", () => {
    openRepoDetails();
    addBranch();
  });

  it("Commit file into branch", () => {
    openRepoDetails();
    addFile();
  });

  it("update existent file", () => {
    openRepoDetails();
    updateFile();
  });

  it("Create a pull request", () => {
    openRepoDetails();
    createPullRequest();
  });

  it("Merge pull request", () => {
    openRepoDetails();
    mergePullRequest();
  });
});
