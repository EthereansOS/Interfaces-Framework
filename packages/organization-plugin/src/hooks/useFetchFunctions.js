import { useState, useEffect } from 'react'
import {
  loadFunctionalityNames,
  loadFunctionality,
  useWeb3,
  useEthosContext,
} from '@ethereansos/interfaces-core'
import PQueue from 'p-queue'

const queue = new PQueue({ concurrency: 20 })

const useFetchFunctions = (organization, onlyFunctionNames = false) => {
  const { web3, networkId } = useWeb3()
  const context = useEthosContext()

  const [isFetching, setIsFetching] = useState(false)
  const [funcNames, setFuncNames] = useState([])
  const [funcsByName, setFuncsByName] = useState({})

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        setIsFetching(true)
        const names = await loadFunctionalityNames(
          { web3, context },
          organization
        )
        setFuncNames(names)

        if (!onlyFunctionNames) {
          names.forEach((funcName) =>
            queue.add(async () => {
              const func = await loadFunctionality(
                { web3, context, networkId },
                funcName,
                organization
              )
              setFuncsByName((fns) => ({ ...fns, [funcName]: func }))
            })
          )
        }
      } catch (e) {
        console.log('Error fetching functionalities', e)
      } finally {
        setIsFetching(false)
      }
    }

    if (organization?.functionalitiesManager) {
      fetchFunctions()
    }
  }, [organization, context, networkId, web3, onlyFunctionNames])

  return { isFetching, funcNames, funcsByName }
}

export default useFetchFunctions
