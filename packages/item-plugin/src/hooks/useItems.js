import { useCallback, useEffect } from 'react'
import { useInit, useWeb3 } from '@dfohub/core'
import { WEB3_CONNECTED } from '@dfohub/core'

import loadItems from '../lib/loadItems'
import { useItemContext } from '../ItemContext'

const useItems = () => {
  const { connectionStatus, web3, web3ForLogs, networkId, walletAddress } =
    useWeb3()
  const { context } = useInit()

  const {
    items,
    setItems,
    itemsLoading,
    setItemsLoading,
    contracts,
    contractStatus,
    CONTRACT_STATUS_INIT,
  } = useItemContext()

  const addItems = useCallback(
    (items) => {
      setItems((s) => {
        return [...(s || []), ...items]
      })
    },
    [setItems]
  )

  const updateItem = useCallback(
    (itemToUpdate, info) => {
      setItems((s) => {
        return s.map((item) =>
          item.key === itemToUpdate.key ? { ...item, ...info } : item
        )
      })
    },
    [setItems]
  )

  useEffect(() => {
    async function run() {
      if (itemsLoading || items) {
        return
      }
      if (
        connectionStatus === WEB3_CONNECTED &&
        contractStatus === CONTRACT_STATUS_INIT
      ) {
        setItemsLoading(true)
        await loadItems({
          web3,
          web3ForLogs,
          context,
          contracts,
          networkId,
          walletAddress,
          addItems,
          updateItem,
        })
        setItemsLoading(false)
      }
    }

    run()
  }, [
    CONTRACT_STATUS_INIT,
    addItems,
    connectionStatus,
    context,
    contractStatus,
    contracts,
    items,
    itemsLoading,
    networkId,
    setItemsLoading,
    updateItem,
    walletAddress,
    web3,
    web3ForLogs,
  ])

  return {
    items: items || [],
  }
}

export default useItems
