# DFOhub core package

This package includes some core features used by the app, like the plugin system and the integration with Ethereum.

## Features

### Plugin system

The plugin system is a set of React custom hooks and context providers to manage the plugins.

The whole source code is in the `src/hooks/userPlugin.js` file.

The plugin system manages two kinds of data: __plugins__ and __placeholders__.

Placeholders hold an ordered list of items grouped by name. For example, you can have a set of "menu" items, a set of "router" items, etc.

(TODO: SPIEGARE ANCHE I PLUGINS O LI TOGLIAMO?)

The exported objects are:

- `PluginsContextProvider` context provider for the plugin system
- `usePlugins` hook that returns the installed plugins
- `usePlaceholder` hook that returns the installed placeholders

Look at the file `src/App.js` inside the `app` package and at the file `src/index.js` inside the `sampe-plugin` package for an example of use of the plugin system.

Basically, in the app you need to provide a PluginsContextProvider with the plugin definition:

```js
<PluginsContextProvider plugins={[samplePlugin]}>
```

The plugin definition is an object with an `init` method that initializes the plugin with the required placeholders, for example:

```js
const pluginDefinition = {
  name: 'sample-plugin',
  init: ({ addElement }) => {
    addElement('menu', {
      name: 'home',
      label: 'Home',
      link: '/',
      index: 10,
    })
    addElement('menu', {
      name: 'about',
      label: 'About',
      link: '/about',
      index: 20,
    })
  },
}
```

### Ethereum integration

The intergration with Ethereum is performed in the `src/hooks/&useWeb3.js` file.

It provides:

- a `Web3ContextProvider` which initialize web3 with the provided context.
- a `useWeb3` React custom hook which returns the following information:
    - a `connect` function to start connecting to Ethereum
    - an `onEthereumUpdate` function to listen to changes
    - all the details of the current connection:
        - web3
        - networkId
        - web3ForLogs
        - allContracts
        - proxyChangedTopic
        - dfoHubENSResolver
        - uniswapV2Factory
        - uniswapV2Router
        - wethAddress
        - list
        - dfoHub
        - walletAddress
        - walletAvatar
        - connectionStatus
    - a `webs3States` array holding the available states (`NOT_CONNECTED`, `CONNECTED`, `CONNECTING`)

The context provider can be initialized in the following way (look at `src/App.js` of `app` package):

```js
<Web3ContextProvider context={context}>
```

where `context` holds the configuration to initialize web3.

To use the hook, you can simply write:

```js
const { connect, connectionStatus } = useWeb3()
```

Look at the source of the `Connect` component inside the `app` package for a usage example.

### Other hooks

There is another hook in this package called `usePrevious`. It simply returns the previously stored value.

It's used in the `Connect` component inside the `app` package to check if the connection state passed from `CONNECTING` to `CONNECTED`.

## Build

This package uses [rollup](https://rollupjs.org/guide/en/) to create the bundle.

To build the package, you can use the `lerna` scripts in the root project (`build` and `build-dev`), as stated in the root project documentation.

If you prefer to build only this package, just run:

```shell script
npm run build
```

to simply build the package, or

```shell script
npm run build:dev
```

to build and keep watching for changes.

