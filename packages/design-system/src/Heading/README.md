# Heading

This component implements a heading.

## Usage

```jsx
  <Heading>
    Title h1
  </Heading>

  <Heading variant="h2" color="primary">
    Title h2 with primary color
  </Heading>
```

## Props

| Name      | Type                                              | Required | Default | Description                                             |
| --------- | ------------------------------------------------- | -------- | ------- | ------------------------------------------------------- |
| className | string                                            |          |         | names of custom css classes separated by space          |
| variant   | One of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'] |          | h1      | type of heading                                         |
| color     | string                                            |          |         | can be "primary", "secondary" or a specific color code. |
