# ConnectWidget

This component shows a container with some information about web3 and the button to connect to Ethereum.

## Usage

```jsx
<ConnectWidget
  logo="/assets/img/ghostload.gif"
  title="DFOhub"
  onClickConnect={handleConnectFromHomePage}
  connectionStatus={connectionStatus}
/>
```

## Props

| Name             | Type     | Required | Default | Description                                                                          |
| ---------------- | -------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| logo             | string   |          |         | url of the logo                                                                      |
| title            | string   |          |         | title shown                                                                          |
| className        | string   |          |         | names of custom css classes for the container separated by space                     |
| onClickConnect   | function | required |         | onClick handler that should start the connection to Ethereum                         |
| connectionStatus | string   | required |         | the state of the connection, as returned by the `useWeb3` hook in the `core` package |
