# DFOhub

This project is a scaffold of a React app that leverages the Ethereum blockchain.

## How to install this project?

1. Clone it from the repository
2. `cd` into the project folder
3. `npm install`

## What is the project structure?

The project is a monorepo based on [lerna](https://lerna.js.org/).

All the packages contained in this monorepo are inside the `packages` folder.
They are:

- [app](#): the actual React application
- [core](core): the core logic which allows injecting plugins and other external functionalities in the app.
- [design-system](design): the base component library used inside the app
- [components](components): a widget library used inside the app
- [sample-plugin](plugins): an example of a plugin which add some pages to the app

## How to build the application?

From the root project folder, execute:

```shell script
npx lerna run build
```

to build all the packages.

## How to run the application?

As a prerequisite, you need to install the [MetaMask Plugin](https://metamask.io/download.html) for your preferred browser.

Then go to the `packages/app` folder and execute:

```shell script
npm run start
```

## How to reinstall the project from scratch?

If you're experiencing unexpected behaviour in the installed packages, you can reinstall everything from scratch with the following commands from the root project folder:

```shell script
npx lerna clean
rm -rf node_modules
rm package-lock.json
npm i
```

## Deploy

Deployment is done automatically with github actions when something is pushed on `main` (configured [here](https://github.com/b-u-i-d-l/js-framework/blob/main/.github/workflows/build-and-deploy.yml#L6)).
The build is done autmoatically by the CI and the content of the `build` folder is pushed to the `gh-pages` branch ([here](https://github.com/b-u-i-d-l/js-framework/blob/main/.github/workflows/build-and-deploy.yml#L26))

**NOTE**: if the github page is a under relative path (e.g. a project page), `homepage` must be set on `package.json` of `app`, otherwise the static content will be loaded using the wrong path. see: https://create-react-app.dev/docs/deployment/#building-for-relative-paths

## Development

`development` is the development branch. Everything merged in `main` will be deployed automatically (this can be changed and a specific branch that trigger the deployment can be ued instead, see above). So every PR will be done against `development` and, after been reviewed, merged in `main` and deployed automatically

### Commits

Commits are linted automatically using [Commitlint](https://commitlint.js.org/) which check if your commit messages meet the [conventional commit format)[https://www.conventionalcommits.org/en/v1.0.0/]