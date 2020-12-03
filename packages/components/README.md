# DFOhub components

This package holds the complex components and widgets for the DFOhub application.
It should grow with all the components needed by the application.


## Components

The available sample components are:

- [ConnectWidget](./src/ConnectWidget/README.md)

## Styling

See the Styling paragraph of the [Design System](../design-system/README.md#styling) documentation.

## Storybook

Every component includes the stories for [Storybook](https://storybook.js.org/).

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

