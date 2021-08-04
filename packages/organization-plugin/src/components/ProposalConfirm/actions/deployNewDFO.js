import React from 'react'
import T from 'prop-types'
import { Typography } from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  newContract,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

import formatDFOLogs from '../../../lib/formatDFOLogs'
import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_ERROR,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import style from '../proposal-confirm.module.scss'

const ID = 'DeployNewDFO'

const DeployNewDFO = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState }) => (
    <>
      <Typography weight="bold" variant="body1">
        Deploy new DFO <ActionState state={actionsState} />
      </Typography>
      <div className={style.spacer} />
    </>
  ),
  handler: async ({
    setSubmitting,
    setActionsState,
    web3Context,
    proposalContext,
    setProposalContext,
    dfoHub,
  }) => {
    setActionsState((s) => ({
      ...s,
      [ID]: ACTION_STATE_LOADING,
    }))
    try {
      const payload = web3Context.web3.eth.abi.encodeParameters(
        [
          'address',
          'uint256',
          'address',
          'address',
          'address',
          'address',
          'address',
          'address',
          'address',
          'string',
        ],
        [
          VOID_ETHEREUM_ADDRESS,
          0,
          proposalContext.votingToken,
          proposalContext.mvdFunctionalityProposalManagerAddress,
          proposalContext.stateHolder,
          proposalContext.functionaltyModelsManagerAddress,
          proposalContext.functionalitiesManagerAddress,
          proposalContext.mvdWalletAddress,
          proposalContext.doubleProxyAddress,
          proposalContext.ensDomain.toLowerCase(),
        ]
      )
      const response = await blockchainCall(
        web3Context,
        dfoHub.dFO.methods.submit,
        'deployDFO',
        payload
      )
      const formattedResponse = formatDFOLogs(
        web3Context,
        response.events.Event,
        'DFODeployed(address_indexed,address_indexed,address,address)'
      ).raw.data[0]

      await newContract(
        web3Context,
        web3Context.context.proxyAbi,
        formattedResponse
      )

      // _this.emit(
      //   "dfo/deploy",
      //   window.newContract(window.context.proxyAbi, data.response)
      // )
      // TODO need to call here the original onDFO method

      setProposalContext((s) => ({
        ...s,
        response: formattedResponse,
      }))
    } catch (e) {
      console.log('deploy newdfo step error', e)
      setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_ERROR }))
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

DeployNewDFO.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    smartContractTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
  proposalContext: T.any,
}

export default DeployNewDFO
