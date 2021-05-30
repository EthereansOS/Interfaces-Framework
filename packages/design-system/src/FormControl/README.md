# Container

This component renders a label with a control passed via prop (such as a checkbox or a select or whatever custom input you might have developed).

## Usage

```jsx
<FormControl control={<input type="checkbox" />} label="Metadata First" />
```

## Props

| Name    | Type         | Required | Default | Description                                      |
| ------- | ------------ | -------- | ------- | ------------------------------------------------ |
| control | ReactElement | yes      |         | The element to display to the right of the label |
| label   | string       |          |         | The label of the control                         |
