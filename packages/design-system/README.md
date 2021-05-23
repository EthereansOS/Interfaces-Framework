# DFOhub design system

This package holds the design system for the DFOhub application.
It should grow with all the basic components needed by the application.

## Components

The available sample components are:

- [Button](./src/Button/README.md)
- [Container](./src/Container/README.md)
- [Card](./src/Card/README.md)
- [Typography](./src/Typography/README.md)

## Styling

All the components are styled with [postcss-modules](https://github.com/css-modules/postcss-modules).

Let's take the `Button` component as an example.

The stylesheet is in the `button.modules.scss` SASS file.
The name of all stylesheet files needs to be `COMPONENT.modules.scss`, where `COMPONENT` is the name of the component.
Every stylesheet should have a `.root` selector for the component, for example:

```scss
.root {
  font-size: 15px;
  font-weight: bold;

  &.primary {
    background-color: $color-primary;
  }

  &.secondary {
    background-color: $color-secondary;
  }
}
```

To use this stylesheet, you need to import it and reference it as follows:

```jsx
import classNames from 'classnames'
import style from './button.module.scss'

const Button = ({ text, onClick, variant, className }) => (
  <button className={classNames(style['root'], style[variant], className)}>
    Hello!
  </button>
)
```

To reference a stylesheet class from the component use `style[CLASS]`.
The postcss-modules build will convert it into a class named `'dfo-ds_COMPONENT_CLASS`, as defined in the `rollup.config.js` file.
So, for our button component, the name will be `dfo-ds_button_root`.

The `classNames` function imported by the [classnames](https://www.npmjs.com/package/classnames) module converts the arguments into a string of space-separated classes.
The arguments can be of different types: see the module documentation for more information.

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
