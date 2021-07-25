import { useEffect, useState } from 'react'
import {
  loadOffchainWallets,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

export default function useFetchWallets({ web3, context, networkId }) {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const wallets = await loadOffchainWallets({ web3, context, networkId })
        const walletsTokens = Object.values(wallets).flatMap((token) => token)
        const tokens = [
          {
            address: VOID_ETHEREUM_ADDRESS,
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: '18',
            logo: 'assets/img/eth-logo.png',
          },
          ...walletsTokens,
        ]

        setTokens(tokens)
      } catch (e) {
        console.log('Error fetching wallets', e)
      }
    }

    fetchWallets()
  }, [context, networkId, web3])

  return tokens
}
