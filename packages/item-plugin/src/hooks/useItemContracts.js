import { useEffect, useState } from 'react'
import {
  useInit,
  useWeb3,
  WEB3_CONNECTED,
  newContract,
  getNetworkElement,
  blockchainCall,
} from '@dfohub/core'

const CONTRACT_STATUS_NEW = 'CONTRACT_STATUS_NEW'
const CONTRACT_STATUS_ON_INIT = 'CONTRACT_STATUS_ON_INIT'
const CONTRACT_STATUS_INIT = 'CONTRACT_STATUS_INIT'

const useItemContracts = () => {
  const { connectionStatus, web3, networkId } = useWeb3()
  const { context } = useInit()
  const [status, setStatus] = useState(CONTRACT_STATUS_NEW)
  const [contracts, setContracts] = useState({})

  useEffect(() => {
    async function run() {
      if (status !== CONTRACT_STATUS_NEW) return
      if (connectionStatus === WEB3_CONNECTED) {
        setStatus(CONTRACT_STATUS_ON_INIT)

        let currentEthItemKnowledgeBase
        let currentEthItemFactory
        let currentEthItemERC20Wrapper
        let ENSController

        const ethItemOrchestrator = newContract(
          { web3 },
          context.ethItemOrchestratorABI,
          getNetworkElement(
            { context, networkId },
            'ethItemOrchestratorAddress'
          )
        )

        try {
          currentEthItemKnowledgeBase = newContract(
            { web3 },
            context.KnowledgeBaseABI,
            await blockchainCall(
              { context, web3 },
              ethItemOrchestrator.methods.knowledgeBase
            )
          )
        } catch (e) {
          console.log('currentEthItemKnowledgeBase not loaded', e)
        }

        try {
          currentEthItemFactory = newContract(
            { web3 },
            context.IEthItemFactoryABI,
            await blockchainCall(
              { context, web3 },
              ethItemOrchestrator.methods.factory
            )
          )
        } catch (e) {
          console.log('currentEthItemFactory not loaded', e)
        }
        try {
          currentEthItemERC20Wrapper = newContract(
            { web3 },
            context.W20ABI,
            await blockchainCall(
              { context, web3 },
              currentEthItemKnowledgeBase.methods.erc20Wrapper
            )
          )
        } catch (e) {
          console.log('currentEthItemERC20Wrapper not loaded', e)
        }
        try {
          ENSController = newContract(
            { web3 },
            context.ENSABI,
            context.ENSControllerAddres
          )
        } catch (e) {
          console.log('ENSController not loaded', e)
        }

        setContracts({
          currentEthItemKnowledgeBase,
          currentEthItemFactory,
          currentEthItemERC20Wrapper,
          ENSController,
          ethItemOrchestrator,
        })

        setStatus(CONTRACT_STATUS_INIT)
      }
    }

    run()
  }, [connectionStatus, web3, context, networkId, status])
  return {
    contracts,
    contractStatus: status,
    CONTRACT_STATUS_ON_INIT,
    CONTRACT_STATUS_INIT,
    CONTRACT_STATUS_NEW,
  }
}

export default useItemContracts
