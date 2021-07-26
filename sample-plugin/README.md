# DFOhub sample plugin

This package represents a sample plugin for the DFOhub application.

It shows how to create a menu with a couple of pages and the corresponding routes.

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
To install this plugin in your app, just pass it to the `PluginsContextProvider` imported from '@ethereansos/interfaces-core' inside your app, as follows:

```jsx
// file src/App.js inside the 'app' package
import React from 'react'
import { PluginsContextProvider } from '@ethereansos/interfaces-core'
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

### Creating a menu

We can use the `addElement` function to create any kind of element.

For example, to create a menu item, we can write:

```js
// file src/index.js inside this package
const initPlugin = ({ addElement }) => {
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
}

const pluginDefinition = {
  name: 'sample-plugin',
  init: initPlugin,
}

export default pluginDefinition
```

This way, we have created two menu items. The `addElement` requires two parameters:

- the name of a group of elements (`menu` in our code)
- an object of any kind that is useful for our purpose

_Note_: the only constraint of the object is to have a property called `index`, that's used by the plugin system to return the elements in an indexed order.

To retrieve the menu items and display the whole menu, in our application, we can write:

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { usePlaceholder } from '@ethereansos/interfaces-core'

function Menu(props) {
  const menu = usePlaceholder('menu')

  return (
    <div>
      {menu.map(({ label, link, name }) => (
        <Link key={`${link}-${label}`} to={link}>
          {label}
        </Link>
      ))}
    </div>
  )
}

export default Menu
```

As you can see, to get the menu items you can simply call the `usePlaceholder` hook from the `core` package.

**Important**: the component which calls the `usePlaceholder` hook must be hierarcally inside the `PluginsContextProvider` component.

The above code is extracted by the `Menu` component in the `app` package.
Have a look at its source code for the complete version.

### Creating routes

Now, let's create the routes of the application.

We can add other calls to the `addElement` function in our plugin initialization, as follows:

```js
addElement('router', {
  index: 10,
  path: '/',
  Component: TestPage,
  exact: true,
  requireConnection: false,
  templateProps: {
    selected: 'home',
    showMenu: true,
  },
})
addElement('router', {
  index: 20,
  path: '/about',
  Component: TestPage2,
  exact: true,
  requireConnection: true,
  templateProps: {
    selected: 'about',
    showMenu: true,
  },
})
```

The name of the group of routes is `router`.

The object has all the information for its use inside the application (see `src/router.js` file in the `app` package):

- `index` for sorting, as seen before
- `path`, `Component` and `exact` are used by the `Route` component
- `requireConnection` is used to say that the route requires a connection to Ethereum, otherwise the `Connect` component will be shown
- `templateProps` contains the props to pass to the `MainTemplate` component:
  - `selected` contains the menu item name which should be selected as current page
  - `showMenu` defines if the menu should be shown for this Component

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
