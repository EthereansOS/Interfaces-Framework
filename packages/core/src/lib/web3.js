import initConnectionFn from './web3/initConnection'

export const CONNECTING = 'connecting'
export const UPDATING = 'updating'
export const NOT_CONNECTED = 'not_connected'
export const CONNECTED = 'connected'

function initWeb3(context, setState) {
  let web3
  let networkId
  let web3ForLogs
  // This is a map with all the contracts
  let proxyChangedTopic
  let uniswapV2Factory = null
  let uniswapV2Router = null
  let wethAddress = null
  let walletAddress = null
  let walletAvatar = null

  function onEthereumUpdate(newConnection, afterInitListFn) {
    return new Promise(async function (resolve) {
      setState((s) => ({
        ...s,
        connectionStatus: newConnection ? CONNECTING : UPDATING,
      }))

      let newState = await initConnectionFn(
        {
          web3,
          web3ForLogs,
          networkId,
          proxyChangedTopic,
          uniswapV2Factory,
          uniswapV2Router,
          wethAddress,
          walletAddress,
          walletAvatar,
          context,
        },
        onEthereumUpdate
      )

      for (const afterInitFn of afterInitListFn || []) {
        const result = await afterInitFn({ ...newState, context })
        newState = { ...newState, ...result }
      }

      web3 = newState.web3
      networkId = newState.networkId
      web3ForLogs = newState.web3ForLogs
      proxyChangedTopic = newState.proxyChangedTopic
      uniswapV2Factory = newState.uniswapV2Factory
      uniswapV2Router = newState.uniswapV2Router
      wethAddress = newState.wethAddress
      walletAddress = newState.walletAddress
      walletAvatar = newState.walletAvatar

      setState((s = {}) => ({
        ...s,
        ...newState,
        connectionStatus: CONNECTED,
      }))
      return resolve(newState.web3)
    })
  }

  async function connect(afterInitListFn) {
    const result = await onEthereumUpdate(true, afterInitListFn)
    return result
  }

  return {
    onEthereumUpdate,
    connect,
  }
}

export default initWeb3
