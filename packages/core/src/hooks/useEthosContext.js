import { useInit } from './useInit'

/**
 * @typedef {Object} EthosContext
 */

/**
 * Returns the Ethos application context
 * @return {EthosContext}
 */
const useEthosContext = () => {
  const { context } = useInit()
  return context
}

export default useEthosContext
