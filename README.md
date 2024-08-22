# <img src="https://avatars.githubusercontent.com/u/153521348?s=24&v=4" /> Source UI

A NextJS based web analytics ui, designed to display data fetched from a GraphQL API. The project's structure includes folders for components, pages, and styles. Styling is achieved through SCSS files for global styling and tailwind for localized styling.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Running E2E Tests Playwright

```bash
yarn e2e
```

To add more tests, first install the VSCode extensions:

```code
Playwright Test for VSCode
Playwright Runner
```

Now you have a tab 'Testing' in the left sidebar. Each test in the e2e/\*.spec.ts has a 'play' button to run each test individually.

You can also, on the 'Testing' tab, run in debug mode, and on 'Show Browser' will run the test in browser view.

To write more tests, you can click on 'Record at cursor' and it will generate a test for you based on the clicks and interactions you do on the browser.

You can also run a test in debug mode until a certain point (past login per example), then cancel the debug mode and click on 'Record at cursor' to generate the test from that point on.

### Running tests on CI

Playwright will look for the env 'CI' (which is set on playwright workflow) and if if's true, it will run the tests pointing to http://127.0.0.1:3000 instead of develop url. This is useful for running tests on CI, as it will point directly to the fresh build of the app.
Everytime new envs are added, we also need to add them to .github/workflows/playwright.yml file.

Running tests on the CI will also generate a video of the tests running, and a screenshot of the page when the test fails and send all the results to http://qase.io for reporting. The command to run it locally is the following (make sure you have .env 'QASE_APIKEY_E2E' setup correctly)

```bash
QASE_REPORT=1 npx playwright test
```
