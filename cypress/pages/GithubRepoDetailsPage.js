import {
  readMeFile,
  readMEContent,
  readMeCommitMessage,
  branchName,
  fileName,
  fileContent,
  commitMessage,
  fileContentUpdate,
  commitMessageUpdate,
  pullRequestTitleText,
  pullRequestText,
} from "../utils/constants";

const creatingNewFileLink = "creating a new file";
const fileNameInput = "input[name=filename]";
const fileContentInput = "div[role=presentation][contenteditable=true]";
const commitSummaryInput = "#commit-summary-input";
const submitFileBtn = "#submit-file";
const swithBranchDropDown = "#branch-select-menu";
const createNewBranchInput = "#context-commitish-filter-field";
const createBranchLink = "Create branch: ";
const branchesLink = 'a[href*="branches"][class*=Link]';
const branchLinkByName = `a[class*=branch][href*="${branchName}"]`;
const addFileBtn = "Add file";
const createFileMenuItem = "Create new file";
const createdFileLink = `a[title="${fileName}"]`;
const createdFileCommitMessage = `a[title="${commitMessage}"]`;
const editThisFileBtn = 'button[title="Edit this file"]';
const newPullRequestBtn = "New pull request";
const pullRequestTitle = "#pull_request_title";
const pullRequestBodyInput = "#pull_request_body";
const createPullRequestBtn = "[class*=hx_create-pr-button]";
const pullRequestsTabItem = "Pull requests";
const pullRequestNameLink = "a[id*=issue]";
const mergePullRequestBtn = "Merge pull request";
const confirmMergeBtn = "Confirm merge";
const pullRequestStatus = "span[title*=Status]";
const pullRequestMessage = "Pull request successfully merged and closed";

function verifyPullRequestStatus(status) {
  cy.get(pullRequestStatus).should("contains.text", status);
}

export function commitReadMeFile() {
  cy.contains(creatingNewFileLink).click();
  cy.get(submitFileBtn).should("be.disabled");
  fillFileAndCommit(readMeFile, readMEContent, readMeCommitMessage);
}

function fillFileAndCommit(
  fileName,
  fileContent,
  commitMessage,
  fileExists = false
) {
  !fileExists && cy.get(fileNameInput).type(fileName);
  cy.get(fileContentInput).click().clear().type(fileContent);
  cy.get(commitSummaryInput).type(commitMessage);
  cy.get(submitFileBtn).click();
}

export function addBranch() {
  cy.get(swithBranchDropDown).should("be.visible").click();
  cy.get(createNewBranchInput).should("be.visible").type(branchName);
  cy.contains(createBranchLink).click();
  cy.url().should("contain", `/tree/${branchName}`);
}

export function addFile() {
  cy.get(branchesLink).click();
  cy.get(branchLinkByName).first().click();
  cy.url().should("contain", `/tree/${branchName}`);
  cy.contains(addFileBtn).click();
  cy.contains(createFileMenuItem).should("be.visible").click();
  fillFileAndCommit(fileName, fileContent, commitMessage);
  cy.get(createdFileLink).should("be.visible");
  cy.get(createdFileCommitMessage).should("be.visible");
}

export function updateFile() {
  cy.get(branchesLink).click();
  cy.get(branchLinkByName).first().click();
  cy.url().should("contain", `/tree/${branchName}`);
  cy.get(createdFileCommitMessage).should("be.visible");
  cy.get(createdFileLink).should("be.visible").click({ force: true });
  cy.get(editThisFileBtn).first().click();
  fillFileAndCommit(fileName, fileContentUpdate, commitMessageUpdate, true);
}

export function createPullRequest() {
  cy.get(branchesLink).click();
  cy.contains(newPullRequestBtn).first().should("be.visible").click();
  cy.get(pullRequestTitle).click().clear().type(pullRequestTitleText);
  cy.get(pullRequestBodyInput).type(pullRequestText);
  cy.get(createPullRequestBtn).click();
  cy.url().should("contains", "/pull/");
  verifyPullRequestStatus("Open");
}

export function mergePullRequest() {
  cy.contains(pullRequestsTabItem).click();
  cy.get(pullRequestNameLink).should("be.visible").click();
  cy.contains(mergePullRequestBtn).click({ force: true });
  cy.contains(confirmMergeBtn).click();
  cy.contains(pullRequestMessage).should("be.visible");
}
