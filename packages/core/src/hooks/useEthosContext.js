import { useInit } from './useInit'

const useEthosContext = () => {
  const { context } = useInit()
  return context
}

export default useEthosContext
