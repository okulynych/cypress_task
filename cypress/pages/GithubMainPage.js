import { defaultUser } from "../utils/users";
import { repoName, repoType } from "../utils/constants";

const newBtn = 'a[href="/new"][class*=btn]';
const submitBtn = "Create repository";
const repoNameInput = "#repository_name";
const repoTypePublic = "#repository_visibility_public";
const repoTypePrivate = "#repository_visibility_private";
const repoNameLink = `a[href="/${defaultUser.userName}/${repoName}"]`;

export function addNewRepo() {
  cy.get(newBtn).first().click();
  cy.contains(submitBtn).should("be.disabled");
  cy.get(repoNameInput).type(repoName);
  cy.contains(submitBtn).should("be.enabled");
  setRepoType(repoType);
  cy.contains(submitBtn).click();
}
function setRepoType() {
  if (repoType === "private") {
    cy.get(repoTypePrivate).click();
  } else {
    cy.get(repoTypePublic).click();
  }
}

export function verifyNewRepoCreated() {
  cy.url().should("contain", repoName);
}

export function openRepoDetails() {
  cy.get(repoNameLink).first().should("be.visible").click();
}
