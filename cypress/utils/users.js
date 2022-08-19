export const defaultUser = {
  userName: Cypress.env("USER_NAME"),
  userEmail: Cypress.env("USER_EMAIL"),
  password: Cypress.env("PASSWORD"),
  authToken: Cypress.env("AUTH_TOKEN"),
};
