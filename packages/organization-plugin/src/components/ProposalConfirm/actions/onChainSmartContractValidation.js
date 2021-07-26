import React from 'react'
import T from 'prop-types'
import { TextField, Typography } from '@dfohub/design-system'
import {
  mint,
  split,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import style from '../proposal-confirm.module.scss'

const ID = 'onChainSmartContractValidation'

const onChainSmartContractValidation = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState, setFieldValue, values, isRecovery }) => (
    <>
      <section className={style.validation}>
        <input
          type="checkbox"
          onChange={(e) => {
            setFieldValue(
              'onChainSmartContractValidation',
              !values.onChainSmartContractValidation
            )
          }}
          checked={values.onChainSmartContractValidation}
        />
        <Typography variant="body1">
          On-Chain Smart Contract Validation{' '}
          <ActionState state={actionsState} />
        </Typography>
      </section>
      {isRecovery && (
        <>
          <Typography variant="body2">
            If you have already deployed this Smart Contract, you can paste here
            the transaction hash, to proceed without needs re-deploy it and pay
            additional ETH fees.
          </Typography>
          <div className={style.spacer} />
          <TextField
            value={values.validationTransactionHash || ''}
            name="validationTransactionHash"
            id="validationTransactionHash"
            placeholder="Transaction hash"
            onChange={(e) => {
              setFieldValue('validationTransactionHash', e.target.value)
            }}
          />
        </>
      )}
      <div className={style.spacer} />

      <Typography variant="body2">
        Deploying a Smart Contract validation, the code will be save in the
        Ethereum Blockchain via base64. This action is expensive, but in some
        cases very important.
      </Typography>
    </>
  ),
  handler: async ({
    values,
    isRecovery,
    setActionsState,
    web3Context,
    proposalContext,
    setProposalContext,
  }) => {
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_LOADING }))

    try {
      if (!values.onChainSmartContractValidation) {
        setProposalContext((s) => ({
          ...s,
          functionalitySourceId: '0',
          functionalitySourceLocation: VOID_ETHEREUM_ADDRESS,
          bypassFunctionalitySourceId: true,
        }))
      } else {
        let functionalitySourceId
        if (values.validationTransactionHash && isRecovery) {
          const transaction = await web3Context.web3.eth.getTransactionReceipt(
            values.validationTransactionHash
          )

          const ocelotMintedEvent = web3Context.web3.utils.sha3(
            'Minted(uint256,uint256,uint256)'
          )
          const ocelotFinalizedEvent = web3Context.web3.utils.sha3(
            'Finalized(uint256,uint256)'
          )
          for (var log of transaction.logs) {
            if (
              log.topics[0] === ocelotMintedEvent ||
              log.topics[0] === ocelotFinalizedEvent
            ) {
              functionalitySourceId = web3Context.web3.eth.abi.decodeParameter(
                'uint256',
                log.topics[1]
              )
              proposalContext.editor &&
                proposalContext.editor.contentTokenInput &&
                (proposalContext.editor.contentTokenInput.value =
                  proposalContext.functionalitySourceId)
              break
            }
          }
        } else {
          functionalitySourceId = await mint(
            web3Context,
            split(web3Context, proposalContext.sourceCode),
            undefined,
            true
          )
        }

        setProposalContext((s) => ({
          ...s,
          functionalitySourceId,
        }))
      }
    } catch (e) {
      console.log(e)
    }

    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

onChainSmartContractValidation.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    onChainSmartContractValidation: T.bool,
    validationTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
}

export default onChainSmartContractValidation
