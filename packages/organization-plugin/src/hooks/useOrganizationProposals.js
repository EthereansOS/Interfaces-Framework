import { useCallback, useEffect, useState } from 'react'
import {
  useEthosContext,
  useWeb3,
  blockchainCall,
  getLogs,
  VOID_ETHEREUM_ADDRESS,
} from '@dfohub/core'
import PQueue from 'p-queue'

import loadSurvey from '../lib/loadSurvey'
import loadSurveyCode from '../lib/loadSurveyCode'

const queue = new PQueue({ concurrency: 20 })

// THIS VALUE LIMIT THE NUMBER OF PROPOSALS LOADED
let MAX_ITERATION = 5
let max = 20

const useOrganizationProposals = (organization) => {
  const context = useEthosContext()

  const { networkId, web3, web3ForLogs, walletAddress } = useWeb3()

  const [state, setState] = useState({
    listLoaded: false,
    listLoading: false,
    proposals: [],
  })

  const loadProposalCode = async (proposal) => {
    if (proposal.codeLoaded) return

    const survey = await loadSurveyCode(
      {
        context,
        web3,
        web3ForLogs,
        networkId,
        walletAddress,
      },
      organization,
      proposal
    )

    setState((s) => ({
      ...s,
      proposals: s.proposals.map((itemProposal) =>
        itemProposal.key === proposal.key
          ? {
              ...itemProposal,
              ...survey,
              codeLoaded: true,
            }
          : itemProposal
      ),
    }))
  }

  // To build the list we need details that can't be fetched altogether
  // so here we extract further details for each list items
  // be careful adding stuff here
  const loadOrganizationProposalDetails = useCallback(
    async (proposals) => {
      if (!proposals.length) return

      const currentBlock = parseInt(await web3.eth.getBlockNumber())
      const fetchDetails = async (proposal) => {
        var address = web3.eth.abi.decodeParameter('address', proposal.data)
        if (!address || address === VOID_ETHEREUM_ADDRESS) {
          return
        }
        const key = proposal.blockNumber + '_' + proposal.id

        const survey = await loadSurvey(
          {
            context,
            web3,
            web3ForLogs,
            networkId,
            walletAddress,
          },
          organization,
          {
            key,
            raisedBy: proposal.address.toLowerCase(),
            address,
            startBlock: proposal.blockNumber,
          },
          currentBlock
        )

        setState((s) => ({
          ...s,
          proposals: s.proposals.map((proposal) =>
            proposal.key === key
              ? {
                  ...proposal,
                  ...survey,
                  updating: false,
                  detailsLoaded: true,
                }
              : proposal
          ),
        }))
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
          !proposal.detailsLoaded && queue.add(() => fetchDetails(proposal))
      )
    },
    [web3, web3ForLogs, context, networkId, walletAddress, organization]
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
        let fromBlock = currentBlock - context.blockLimit
        fromBlock =
          fromBlock < organization.startBlock
            ? organization.startBlock
            : fromBlock

        const list = await getLogs(
          { web3, web3ForLogs, context, networkId },
          {
            address: organization.dFO.options.allAddresses,
            topics: [context.proposalTopic],
            fromBlock: fromBlock,
            toBlock: currentBlock,
          }
        )

        console.log('Found', list.length, 'proposals')
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

        console.log('MAX:', max)
        if (max-- > 0) {
          console.log('Load From Block:', fromBlock)
          return loadProposals(organization, fromBlock)
        }
      } catch (e) {
        console.error(e)
      }
    },
    [setState, context, networkId, web3, web3ForLogs]
  )

  const loadOrganizationProposal = useCallback(
    async (organization) => {
      max = MAX_ITERATION
      setState((s) => ({ ...s, listLoading: true }))

      context.proposalTopic = web3.utils.sha3('Proposal(address)')
      context.proposalCheckedTopic = web3.utils.sha3('ProposalCheck(address)')
      context.proposalSetTopic = web3.utils.sha3('ProposalSet(address,bool)')
      context.blockLimit = 140000

      const myBalance = await blockchainCall(
        { web3, context },
        organization.token.methods.balanceOf,
        walletAddress
      )

      setState((s) => ({ ...s, myBalance }))

      const currentBlock = parseInt(await web3.eth.getBlockNumber())

      await loadProposals(organization, currentBlock)
    },
    [loadProposals, walletAddress, web3, context]
  )

  return {
    proposals: state.proposals || [],
    loadOrganizationProposal,
    loadProposalCode,
    listLoading: state.listLoading,
    listLoaded: state.listLoaded,
    dfoHub: state.dfoHub,
  }
}

export default useOrganizationProposals
