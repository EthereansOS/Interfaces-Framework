# Design System

We provide a Storybook app with our design components ready to use. All the components are documented and design approved, so you can cut the development time cost and being sure to follow the design standards.

To start the Storybook, clone the repo and start in local:

```js
  git clone https://github.com/TODO...
  npm i
  npm run storybook
```

It will expose the app on http://localhost:6006 by default.

## Basic global style variables

```css
  body {
    background-color: var(--color-background-light);
    font-family: var(--font-family);
  }

  :root {
    --container-width: 100%;
    --header-height: 80px;
    --unit: 4px;

    --font-family: ITEMregular, sans-serif;
    --font-family-secondary: ITEMGig, sans-serif;

    --color-default: #212121;
    --color-light: #9c9c9c;
    --color-primary: #8653f6;
    --color-secondary: rgb(255, 0, 122);
    --color-text: #6e6e6e;
    --color-background-light: #ffff;
    --color-background: #333333;
    --color-background-dark: #292929;
    --color-background-extra-dark: #212121;
    --color-background-black: #191919;

    --tooltip-background-color: #383838;
    --tooltip-color: #888888;

    --button-border-radius: 8px;
    --button-color: var(--color-text);
    --button-color-primary: #fff;
    --button-color-secondary: var(--color-text);
    --button-background-color: var(--color-default);
    --button-background-color-primary: var(--color-primary);
    --button-background-color-secondary: var(--color-secondary);
    --button-background-image-primary: linear-gradient(
      to right,
      rgb(144, 72, 253) 30%,
      rgb(75, 203, 201) 90%
    );

    --text-input-background-color: #ffffff;
    --text-input-border-color: #191919;
    --text-input-border-width: 2px;
    --text-input-border-radius: 5px;

    --card-background-primary: #6fbefd;
  }
```

## Typography global style variables

```css
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  div,
  span {
    color: var(--color-text);
  }
  h1 {
    font-size: 32px;
    line-height: 130%;
    margin-bottom: calc(var(--unit) * 4);
  }
  h2 {
    font-size: 28px;
    margin-top: calc(var(--unit) * 10);
    margin-bottom: calc(var(--unit) * 6);
    font-weight: normal;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 16px;
  }
  a {
    text-decoration: none;
  }

  .body1 {
    font-size: 18px;
    line-height: 130%;
  }

  .body2 {
    font-size: 14px;
    line-height: 120%;
  }
```
