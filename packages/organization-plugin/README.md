# DFOhub Organization plugin

This package represents a the `organization` plugin for the DFOhub application.

## Package structure

In this sample package, there is just one file `src/index.js` containing the definition of the plugin. The real plugins will probably have a more structured organization of files. 

Storybook is already included in the package, even if not used in this sample.

## How to create a plugin

In this tutorial we will create the sample-plugin from scratch.

A plugin is simply an object with a `name` and an `init` method.

The `init` method is called with a function `addElement` as argument, which allows adding placeholders. So, the following is a simple definition of a plugin:

```js
// file src/index.js inside this package
const pluginDefinition = {
  name: 'sample-plugin',
  init: ({ addElement }) => {
    console.log('Hello!')
  },
}

export default pluginDefinition
```

We are exporting the plugin from our sample package, whose name id `@dfohub/sample-plugin`.
To install this plugin in your app, just pass it to the `PluginsContextProvider` imported from '@dfohub/core' inside your app, as follows:

```jsx
// file src/App.js inside the 'app' package
import React from 'react'
import { PluginsContextProvider } from '@dfohub/core'
import samplePlugin from '@dfohub/sample-plugin'

function App() {
  return (
    <PluginsContextProvider plugins={[samplePlugin]}>
      <div>Hello!</div>
    </PluginsContextProvider>
  )
}

export default App
```

The actual `App.js` file inside the `app` package is more complex, but the code above is enough to install the plugin in the app.

Now, let's make our plugin do something more interesting, like creating a menu.

## Storybook

[Storybook](https://storybook.js.org/) is integrated in this package even if the sample pages don't use it.

You can build Storybook with:

```shell script
npm run build-storybook
```

You can launch Storybook with:

```shell script
npm run storybook
```

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

