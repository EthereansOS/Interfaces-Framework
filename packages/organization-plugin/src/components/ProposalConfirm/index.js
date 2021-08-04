import React, { useState } from 'react'
import { Button, Typography, Chip } from '@ethereansos/interfaces-ui'
import T from 'prop-types'
import { Formik, Form } from '@ethereansos/interfaces-ui'
import { useEthosContext, useWeb3 } from '@ethereansos/interfaces-core'

import useOrganizations from '../../hooks/useOrganizations'

import style from './proposal-confirm.module.scss'
import generateSmartContractProposal from './actions/generateSmartContractProposal'
import onChainSmartContractValidation from './actions/onChainSmartContractValidation'
import deploySmartContract from './actions/deploySmartContract'
import publishProposal from './actions/publishProposal'

const initialValues = {}

const defaultSteps = [
  generateSmartContractProposal,
  onChainSmartContractValidation,
  deploySmartContract,
  publishProposal,
]

function ProposalConfirm({
  onClose,
  title,
  initialContext,
  onProposalSuccess,
  steps,
}) {
  const web3Context = useWeb3()
  const ethosContext = useEthosContext()
  const [isRecovery, setIsRecovery] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [proposalContext, setProposalContext] = useState(initialContext)
  const [submitLabel, setSubmitLabel] = useState()
  const { dfoHub } = useOrganizations()

  const [actionsState, setActionsState] = useState(
    steps.reduce((acc, next) => {
      acc[next.id] = next.initialActionState
      return acc
    }, {})
  )

  return (
    <section className={style.root}>
      <Chip color="secondary">
        Before leaving this page, make all the transactions listed. Otherwise
        the entire operation will not be completed successfully
      </Chip>
      <Typography variant="h1">{title}</Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const handler = steps[currentStep].handler
            await handler({
              values,
              isRecovery,
              setSubmitting,
              setActionsState,
              proposalContext,
              setProposalContext,
              setSubmitLabel,
              web3Context: { ...web3Context, context: ethosContext },
              dfoHub,
            })
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1)
              setSubmitLabel()
            } else {
              onProposalSuccess()
            }
          } catch (e) {
            // TODO use snackbar to display errors maybe?
            console.log('proposal step errored out', e)
          }
          setSubmitting(false)
        }}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            {steps.map(({ Component, id }) => (
              <>
                <Component
                  setSubmitLabel={setSubmitLabel}
                  key={id}
                  actionsState={actionsState[id]}
                  isRecovery={isRecovery}
                  setFieldValue={setFieldValue}
                  values={values}
                  proposalContext={proposalContext}
                />
                <div className={style.sectionSeparator} />
              </>
            ))}

            <section className={style.buttonGroups}>
              <Button
                onClick={onClose}
                text="Cancel"
                color="secondary"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                text={
                  submitLabel
                    ? submitLabel
                    : currentStep === 0
                    ? 'Propose'
                    : currentStep === steps.length - 1
                    ? 'Publish'
                    : 'Next'
                }
                disabled={isSubmitting || !dfoHub}
              />
              {currentStep === 0 && (
                <Button
                  color="tertiary"
                  text="Resume"
                  disabled={isSubmitting}
                  onClick={() => setIsRecovery(!isRecovery)}
                />
              )}
            </section>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default ProposalConfirm

ProposalConfirm.defaultProps = {
  steps: defaultSteps,
}

ProposalConfirm.propTypes = {
  onClose: T.func.isRequired,
  onProposalSuccess: T.func.isRequired,
  title: T.string.isRequired,
  initialContext: T.object.isRequired,
  steps: T.arrayOf(
    T.shape({
      handler: T.func.isRequired,
      Component: T.func.isRequired,
    })
  ),
}
