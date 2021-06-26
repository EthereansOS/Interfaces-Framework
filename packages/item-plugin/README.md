# DFOhub Organization plugin

This package represents a the `item` plugin for the Item application.

## Package structure

In this sample package, there is just one file `src/index.js` containing the definition of the plugin. The real plugins will probably have a more structured organization of files. 

Storybook is already included in the package, even if not used in this sample.

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

