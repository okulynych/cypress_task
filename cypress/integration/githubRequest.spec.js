import { defaultUser } from "../utils/users";
import { gitHubApiUrl, repoName } from "../utils/constants";

describe("Github request test", () => {
  it("Get repos", () => {
    cy.request(`${gitHubApiUrl}/users/${defaultUser.userName}/repos`).should(
      (response) => {
        const boilerplateRepo = response.body[0];
        const actual_ids = response.body
          .map((x) => x["id"])
          .sort()
          .slice(0, 2);
        const expected_ids = [347631046, 494199691];
        expect(response.status).equal(200);
        expect(response.body).to.have.length(4);
        expect(boilerplateRepo).to.have.property("id", 347631046);
        expect(boilerplateRepo).to.have.property(
          "node_id",
          "MDEwOlJlcG9zaXRvcnkzNDc2MzEwNDY="
        );
        expect(actual_ids).eql(expected_ids);
      }
    );
  });

  it("Get branches", () => {
    const authorization = `Authorization: token ${defaultUser.authToken}`;
    const options = {
      method: "GET",
      url: `${gitHubApiUrl}/repos/${defaultUser.userName}/${repoName}/branches`,
      headers: {
        authorization,
      },
    };

    cy.request(options).should((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.have.length(2);
    });
  });
});
