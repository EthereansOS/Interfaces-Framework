# TextField

This component implements a input.
It **accepts all the basic input props**.

## Usage

```jsx
<TextField name="" onChange={(e) => console.log(e)} />
```

## Props

| Name           | Type     | Required | Default | Description                                                            |
| -------------- | -------- | -------- | ------- | ---------------------------------------------------------------------- |
| className      | string   |          |         | names of custom css classes to apply to the input wrapper              |
| inputClassName | string   |          |         | names of custom css classes to apply to the underlying input component |
| onChange       | function | yes      |         | handler triggered by the native change event of the input element      |
| startComponent | node     |          |         | component to render to the left of the input                           |
| endComponent   | node     |          |         | component to render to the right of the input                          |
| multiline      | bool     |          |         | if true renders a textarea                                             |
