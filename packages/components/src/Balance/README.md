# Wallet

This component shows the value of the wallet, and has an edit mode, where you can swap / transfer assets.

## Usage

```jsx
<Wallet token={token} isEdit={false} getEthereumPrice={getEthereumPrice} />
```

```jsx
<Wallet
  token={token}
  tokenPrice={1.709}
  isEdit={true}
  onSwap={onSwap}
  onTransfer={onTransfer}
/>
```

## Props

| Name       | Type   | Required | Default | Description                                                      |
| ---------- | ------ | -------- | ------- | ---------------------------------------------------------------- |
| className  | string | false    |         | names of custom css classes for the container separated by space |
| isEdit     | bool   | true     | false   | flag to check if the view is in edit or read mode                |
| token      | any    | true     |         | token presents in your wallet                                    |
| tokenPrice | number | false    |         | current token price                                              |
| onSwap     | func   | false    |         | function for sending the payload for swapping assets             |
| onTransfer | func   | false    |         | function for sending the payload for transferring assets         |
