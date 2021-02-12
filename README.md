# tasty_var

[![Netlify Status](https://api.netlify.com/api/v1/badges/2d272f62-d211-467b-a2bb-8b6925a75daf/deploy-status)](https://app.netlify.com/sites/tastyvar/deploys)

This is my developer blog built [Gatsby](https://www.gatsbyjs.com/). You can read it at: <https://www.tastyvar.com/>.

## Getting started

### Requirements

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

To install dependencies, run

    $ yarn

## Useful commands

To start the development server, run

    $ yarn start

To build the site, run

    $ yarn build

To preview a built version of the site locally, run

    $ yarn build && yarn serve

## Testing

To run the tests, run

    $ yarn test

To run the tests in watch mode, run

    $ yarn test --watch

End-to-end tests are located in [`cypress/e2e`](cypress/e2e). You can run them by running

    $ yarn test:e2e

To run the e2e tests in CI mode, run

    $ yarn test:e2e:ci

## Deployment

The site is deployed using [Netlify](https://www.netlify.com/). Deploy config can be found in [`.netlify.toml`](.netlify.toml).

Each push to the `main` branch triggers a new build.
