# Covenants app

This package contains the main application, based on [Create React App](https://create-react-app.dev).

## Prerequisites
A good knowledge of [React](https://reactjs.org/) and [React hooks](https://reactjs.org/docs/hooks-intro.html) is required.

## The app structure

The `App` component has two `ContextProvider`, both imported from the `core` package:

- `Web3ContextProvider` allows connecting to Ethereum and listening on any change
- `PluginsContextProvider` allows using the plugin system

The `MainTemplate` component is the template of every page of the app. It shows a header, a menu and the supllied component.

The `Menu` component loads the menu from the plugin system, with a `usePlaceholder` hook.

The __routing__ is performed inside the `router.js` file.
It uses the same `usePlaceholder` hook to retrieve the routes.
If the supplied route requires a connection to Ethereum and the connection is not yet established, it will show the `Connect` component, otherwise the route component will be rendered.

It's recommended to keep using the plugin system for the menu and the routing and not write these items directly in the `app` package.  
The `PluginsContextProvider` in the `App` component loads the plugins from the `sample-plugin` package, which can be considered as a reference implementation.

The `src/data/context.json` file keeps the configuration to initialize web3.

## Build

The app uses the default Create React App scripts.

To build the app, you can use the `lerna` scripts in the root project (`build` and `build-dev`), as stated in the root project documentation.

If you prefer to build only this package, just run:

```shell script
npm run build
```

## Run

To run the app, execute:

```shell script
npm run start
```
