# Cypress playground Task

This is a Cypress playground task solution.

It's using [cypress](https://www.cypress.io/).

The solution contains 3 specs - githubActions.spec, githubLogin.spec and githubRequest.spec.

## Requrements

To run this project, you need a personal account on github.com.

You also need to generate personal api token.

## Installation

To run this project, install it locally using npm:

```
cd ../cypress_task
npm install
```

## Setting variables

To run tests, CYPRESS_USER_NAME, CYPRESS_USER_EMAIL, CYPRESS_PASSWORD, CYPRESS_AUTH_TOKEN env variables must be set.

These variables are your credentials to GitHub.

export CYPRESS_USER_NAME='MyUser';

export CYPRESS_USER_EMAIL='MyUser@dummy.com';

export CYPRESS_PASSWORD='MyPass';

export CYPRESS_AUTH_TOKEN='MyShinyMetalGitHubApiToken';

## Usage

A simple run of all tests:

```
npx cypress run
```

```
npm run test-all
```
