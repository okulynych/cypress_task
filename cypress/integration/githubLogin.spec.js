import { login, verifyLoginSuccessful } from "../pages/GithubPage";

describe("Github login test", () => {
  it("login", () => {
    login();
    verifyLoginSuccessful();
  });
});
