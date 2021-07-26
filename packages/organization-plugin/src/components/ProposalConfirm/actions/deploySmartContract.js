import React from 'react'
import T from 'prop-types'
import { TextField, Typography } from '@ethereansos/interfaces-ui'
import {
  createContract,
  generateFunctionalityMetadataLink,
  getSolidityUtilities,
  loadContent,
} from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import style from '../proposal-confirm.module.scss'

const ID = 'deploySmartContract'

const deploySmartContract = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState, setFieldValue, values, isRecovery }) => (
    <>
      <Typography weight="bold" variant="body1">
        Deploying Smart Contract <ActionState state={actionsState} />
      </Typography>
      <div className={style.spacer} />
      {isRecovery && (
        <>
          <Typography variant="body2">
            If you have already deployed this Smart Contract, you can paste here
            the transaction hash, to proceed without needs re-deploy it and pay
            additional ETH fees.
          </Typography>
          <div className={style.spacer} />

          <TextField
            value={values.smartContractTransactionHash || ''}
            name="smartContractTransactionHash"
            id="smartContractTransactionHash"
            placeholder="Transaction hash"
            onChange={(e) => {
              setFieldValue('smartContractTransactionHash', e.target.value)
            }}
          />
        </>
      )}
    </>
  ),
  handler: async ({
    values,
    isRecovery,
    setSubmitting,
    setActionsState,
    web3Context,
    proposalContext,
    setProposalContext,
  }) => {
    setActionsState((s) => ({
      ...s,
      [ID]: ACTION_STATE_LOADING,
    }))

    try {
      if (values.smartContractTransactionHash && isRecovery) {
        const transaction = await web3Context.web3.eth.getTransactionReceipt(
          values.smartContractTransactionHash
        )

        setProposalContext((s) => ({
          ...s,
          functionalityAddress: transaction.contractAddress,
        }))
      } else {
        let selectedContract = proposalContext.selectedContract
        if (
          proposalContext.contractName &&
          proposalContext.functionalitySourceId &&
          proposalContext.selectedSolidityVersion
        ) {
          const code = proposalContext.bypassFunctionalitySourceId
            ? proposalContext.sourceCode
            : await loadContent(
                web3Context,
                proposalContext.functionalitySourceId
              )
          const compiled = await getSolidityUtilities().compile(
            code,
            proposalContext.selectedSolidityVersion,
            200
          )
          selectedContract = compiled[proposalContext.contractName]
        }
        const args = [
          selectedContract.abi,
          selectedContract.bytecode,
          await generateFunctionalityMetadataLink(web3Context, {
            ...proposalContext,
            selectedContract,
          }),
        ]

        proposalContext.constructorArguments &&
          Object.keys(proposalContext.constructorArguments).map((key) =>
            args.push(proposalContext.constructorArguments[key])
          )

        const functionalityAddress = (
          await createContract.apply(null, [web3Context, ...args])
        ).options.address

        setProposalContext((s) => ({
          ...s,
          functionalityAddress,
          selectedContract,
        }))
      }
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

deploySmartContract.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    smartContractTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
}

export default deploySmartContract
