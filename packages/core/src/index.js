export * from './context/GlobalContexts'
export * from './hooks/usePlugins'
export * from './hooks/usePrevious'
export * from './hooks/useIsUnmounted'
export * from './hooks/useLoadUniswapPairs'
export * from './hooks/useInit'
export * from './context/Web3Context'
export * from './lib/web3/index'
export * from './lib/constants'

export { default as web3Utils } from 'web3-utils'
export { default as useEthosContext } from './hooks/useEthosContext'
export { default as ethosEvents } from './lib/ethosEvents'
export { default as tokenPercentage } from './lib/tokenPercentage'
export { default as formatString } from './lib/formatString'
export { default as stringToLines } from './lib/stringToLines'

export {
  CONNECTED as WEB3_CONNECTED,
  CONNECTING as WEB3_CONNECTING,
  NOT_CONNECTED as WEB3_NOT_CONNECTED,
  UPDATING as WEB3_UPDATING,
} from './lib/web3'
