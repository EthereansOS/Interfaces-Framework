# Token

This component shows the correct icon / symbol of the token, based on the address.

## Usage

```jsx
<Token address={token.address} showSymbol />
```

```jsx
<Token address={token.address} showIcon showSymbol />
```

## Props

| Name       | Type   | Required | Default | Description                                                      |
| ---------- | ------ | -------- | ------- | ---------------------------------------------------------------- |
| className  | string | false    |         | names of custom css classes for the container separated by space |
| address    | string | true     | generic | address of the token                                             |
| showSymbol | bool   | false    | false   | flag to show the symbol (e.g. ETH)                               |
| showIcon   | bool   | false    | false   | flag to show the icon                                            |
