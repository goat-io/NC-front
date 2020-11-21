<p align="center">Natural Cycles - Challenge</p>

## Description and Features

- Built using [Create React App](https://github.com/facebook/create-react-app)
- All requests performed with [Axios](https://github.com/axios/axios)
- Refresh token implemented using [Axios Auth Refresh](https://github.com/Flyrell/axios-auth-refresh)
- Internationalization using [i18next](https://www.i18next.com/)
- [Firebase](https://firebase.google.com) authentication
- [Cypress.io](https://www.cypress.io/) for E2E testing
- Completely automated pipeline using [Github Actions](https://github.com/features/actions) for CI/CD
- Deployed using [Netlify](https://www.netlify.com/)

## See it in action!

Deployed App: [Check this link](https://nc-challenge.netlify.app/#)
![NC-challenge](https://user-images.githubusercontent.com/48744933/99883050-fa9d7500-2c24-11eb-810b-5d87f03e2a5b.gif)

## Installation

```bash
$ npm install

or

$ yarn
```

## Running the app

- Copy the `.env.example` file to `.env` and fill out your environment
  variables. Then, run the following commands:

```bash
# Run the server in development mode
$ npm run start

or

$ yarn start
```

## Test

```bash
# Run Cypress e2e tests
$ npm run e2e

or

# Run the server in development mode
$ yarn e2e
```

## License

[MIT licensed](LICENSE).
