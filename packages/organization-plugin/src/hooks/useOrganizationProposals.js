import { useCallback, useEffect, useState } from 'react'
import {
  useWeb3,
  blockchainCall,
  getLogs,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'
import PQueue from 'p-queue'

import loadSurvey from '../lib/loadSurvey'
import loadSurveyCode from '../lib/loadSurveyCode'
import tryLoadDiff from '../lib/tryLoadDiff'

const queue = new PQueue({ concurrency: 20 })

// THIS VALUE LIMIT THE NUMBER OF PROPOSALS LOADED
let MAX_ITERATION = 5
let max = 20

const useOrganizationProposals = (organization) => {
  const web3Context = useWeb3()

  const [state, setState] = useState({
    listLoaded: false,
    listLoading: false,
    proposals: [],
  })

  const updateProposal = (updateKey, newData) =>
    setState((s) => ({
      ...s,
      proposals: s.proposals.map((itemProposal) =>
        itemProposal.key === updateKey
          ? {
              ...itemProposal,
              ...newData,
            }
          : itemProposal
      ),
    }))

  const loadProposalCode = async (proposal) => {
    if (proposal.codeLoaded) return

    const survey = await loadSurveyCode(web3Context, organization, proposal)

    updateProposal(proposal.key, {
      ...survey,
      codeLoaded: true,
    })
  }

  const finalizeProposal = async (proposal) => {
    await blockchainCall(web3Context, proposal.contract.methods.terminate)

    await loadOrganizationProposalDetails([proposal], true)
  }

  const loadDiff = async (proposal) => {
    if (proposal.codeLoaded) return

    const survey = await tryLoadDiff(web3Context, organization, proposal)

    updateProposal(proposal.key, {
      ...survey,
      diffLoaded: true,
    })
  }

  // To build the list we need details that can't be fetched altogether
  // so here we extract further details for each list items
  // be careful adding stuff here
  const loadOrganizationProposalDetails = useCallback(
    async (proposals, forceLoad) => {
      if (!proposals.length) return

      const currentBlock = parseInt(await web3Context.web3.eth.getBlockNumber())
      const fetchDetails = async (proposal) => {
        var address = web3Context.web3.eth.abi.decodeParameter(
          'address',
          proposal.data
        )
        if (!address || address === VOID_ETHEREUM_ADDRESS) {
          return
        }
        const key = proposal.blockNumber + '_' + proposal.id

        const survey = await loadSurvey(
          web3Context,
          organization,
          {
            key,
            raisedBy: proposal.address.toLowerCase(),
            address,
            startBlock: proposal.blockNumber,
          },
          currentBlock
        )

        updateProposal(key, {
          ...survey,
          updating: false,
          detailsLoaded: true,
        })
      }

      setState((s) => ({
        ...s,
        proposals: s.proposals.map((proposal) =>
          proposals.find(
            (currentProposal) => currentProposal.key === proposal.key
          )
            ? {
                ...proposal,
                updating: true,
              }
            : proposal
        ),
      }))

      proposals.forEach(
        (proposal) =>
          (!proposal.detailsLoaded || forceLoad) &&
          queue.add(() => fetchDetails(proposal))
      )
    },
    [web3Context, organization]
  )

  useEffect(() => {
    if (state.proposals.length)
      return loadOrganizationProposalDetails(
        Object.values(state.proposals).filter(
          (element) => !element.detailsLoaded && !element.updating
        )
      )
  }, [state.proposals, loadOrganizationProposalDetails])

  const loadProposals = useCallback(
    async (organization, currentBlock) => {
      if (currentBlock <= organization.startBlock) {
        setState((s) => ({ ...s, listLoading: false, listLoaded: true }))
        return
      }

      try {
        let fromBlock = currentBlock - web3Context.context.blockLimit
        fromBlock =
          fromBlock < organization.startBlock
            ? organization.startBlock
            : fromBlock

        const list = await getLogs(web3Context, {
          address: organization.dFO.options.allAddresses,
          topics: [web3Context.context.proposalTopic],
          fromBlock: fromBlock,
          toBlock: currentBlock,
        })

        setState((s) => ({
          ...s,
          proposals: [
            ...s.proposals,
            ...list.map((proposal) => ({
              ...proposal,
              key: proposal.blockNumber + '_' + proposal.id,
              detailsLoaded: false,
              updating: false,
            })),
          ],
        }))

        if (max-- > 0) {
          console.log('Load From Block:', fromBlock)
          return loadProposals(organization, fromBlock)
        }
      } catch (e) {
        console.error(e)
      }
    },
    [setState, web3Context]
  )

  const loadOrganizationProposal = useCallback(
    async (organization) => {
      max = MAX_ITERATION
      setState((s) => ({ ...s, listLoading: true }))

      web3Context.context.proposalTopic =
        web3Context.web3.utils.sha3('Proposal(address)')
      web3Context.context.proposalCheckedTopic = web3Context.web3.utils.sha3(
        'ProposalCheck(address)'
      )
      web3Context.context.proposalSetTopic = web3Context.web3.utils.sha3(
        'ProposalSet(address,bool)'
      )
      web3Context.context.blockLimit = 140000

      const myBalance = await blockchainCall(
        web3Context,
        organization.token.methods.balanceOf,
        web3Context.walletAddress
      )

      setState((s) => ({ ...s, myBalance }))

      const currentBlock = parseInt(await web3Context.web3.eth.getBlockNumber())

      await loadProposals(organization, currentBlock)
    },
    [loadProposals, web3Context]
  )

  return {
    proposals: state.proposals || [],
    loadOrganizationProposal,
    loadProposalCode,
    loadDiff,
    finalizeProposal,
    listLoading: state.listLoading,
    listLoaded: state.listLoaded,
    dfoHub: state.dfoHub,
  }
}

export default useOrganizationProposals
