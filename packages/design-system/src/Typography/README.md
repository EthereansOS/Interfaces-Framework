# Typography

This component implements a all the text tags the apps need to display.
Apart from h variants, it'll render p HTML elements.

## Usage

```jsx
  <Typography>
    Title h1
  </Typography>

  <Typography variant="h2" color="primary">
    Title h2 with primary color
  </Typography>

  <Typography variant="body1" color="secondary">
    Title h2 with primary color
  </Typography>

  <Typography variant="h2" color="primary">
    Title h2 with primary color
  </Typography>
```

## Props

| Name       | Type                                                                                          | Required | Default | Description                                    |
| ---------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------- |
| className  | string                                                                                        |          |         | names of custom css classes separated by space |
| variant    | One of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'body1', 'body2', 'subtitle1', 'subtitle2'] |          | h1      | type of typography                             |
| color      | One of ['primary', 'secondary'] or string                                                     |          |         | the color                                      |
| fontFamily | One of ['primary', 'secondary'] or string                                                     |          |         | the font family                                |
| weight     | string                                                                                        |          |         | the weight                                     |
| as         | string                                                                                        |          |         | the html element to use                        |
