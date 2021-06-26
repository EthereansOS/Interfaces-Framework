# CategoryBar

Shows the Item list element

## Usage

```jsx
export const Sample = () => (
  <ItemListElement
    name="Sample Item"
    symbol="XYZ"
    address="0x12312312"
    description="a short description here"
    image="https://ipfs.io/ipfs/QmXDJTjjkTLGk8urwdReWKGt9nHArCEmN8CMWuetKMEF7D"
    onClick={action('Click me')}
  />
)
```

## Props

| Name        | Type   | Required | Default | Description           |
| ----------- | ------ | -------- | ------- | --------------------- |
| name        | string |          |         | The name              |
| symbol      | string |          |         | The symbol            |
| address     | string |          |         | Item address          |
| description | string |          |         | Item description      |
| image       | string |          |         | Item logo             |
| onClick     | func   |          |         | the callback on click |
