import { mainPageUrl, password } from "../utils/constants";
import { defaultUser } from "../utils/users";

const signInButton = 'a[href="/login"]';
const userNameInput = "#login_field";
const passwordInput = "#password";
const submitButton = "input[type=submit]";
const gitHubMainLogo = 'a[href="https://github.com/"]';

function clickSignInButton() {
  cy.get(signInButton).click();
}

function fillUserName(userName) {
  cy.get(userNameInput).clear().type(userName);
}

function fillPassword(password) {
  cy.get(passwordInput).clear().type(password);
}

function submit() {
  cy.get(submitButton).click();
}

export function login() {
  cy.visit(mainPageUrl);
  clickSignInButton();
  fillUserName(defaultUser.userName);
  fillPassword(defaultUser.password);
  submit();
}

export function verifyLoginSuccessful() {
  cy.get(gitHubMainLogo).first().should("be.visible");
}
