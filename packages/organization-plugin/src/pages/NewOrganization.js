import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { usePlaceholder } from '@ethereansos/interfaces-core'
import { Formik, Form } from '@ethereansos/interfaces-ui'
import { Button, SnackBar } from '@ethereansos/interfaces-ui'
import { useHistory } from 'react-router-dom'

import StepTemplate from '../components/NewOrganizationSteps/StepTemplate'
import { orgEditInitialValues } from '../components/OrganizationEdit'
import { useOrganizationContext } from '../OrganizationContext'
import dataIntegrityValidation from '../components/ProposalConfirm/actions/dataIntegrityValidation'
import deployVotingToken from '../components/ProposalConfirm/actions/deployVotingToken'
import deployProposalsManager from '../components/ProposalConfirm/actions/deployProposalsManager'
import deployGovernanceRules from '../components/ProposalConfirm/actions/deployGovernanceRules'
import deployMetadata from '../components/ProposalConfirm/actions/deployMetadata'
import DeployNewDFO from '../components/ProposalConfirm/actions/deployNewDFO'

export const stepsIndexes = [10, 20, 30, 40]

const initialValues = {
  ensDomain: '',
  tokenName: '',
  tokenTotalSupply: 0,
  tokenSymbol: '',
  surveyLength: 0,
  surveyMinStake: 0,
  surveyCommunityStake: 0,
  surveyQuorum: 0,
  surveyMaxCap: 0,
  surveySingleReward: 0,
  emergencySurveyLength: 0,
  emergencySurveyStaking: 0,
  ...orgEditInitialValues,
}

const NewOrganization = ({ setTemplateState }) => {
  const organizationNewOrganization = usePlaceholder(
    'organizationNewOrganization'
  )
  const { showProposalModal, closeProposalModal } = useOrganizationContext()
  const history = useHistory()

  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [snackContent, setSnackContent] = useState()

  const onProposalSuccess = () => {
    closeProposalModal()
    // TODO needs to navigate to the new org
    history.push(`/list`)
  }

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'New Organization',
      mainMenu: null,
      mainSubMenu: null,
    }))
  }, [setTemplateState])

  const onSubmit = (values) => {
    // TODO use yup
    switch (stepsIndexes[activeStepIndex]) {
      case stepsIndexes[0]:
        if (values.ensDomain) {
          setActiveStepIndex((idx) => idx + 1)
        } else {
          setSnackContent({ message: 'ENS Domain is mandatory', type: 'error' })
        }
        break
      case stepsIndexes[1]:
        if (
          values.tokenName &&
          values.tokenSymbol &&
          values.tokenTotalSupply > 0
        ) {
          setActiveStepIndex((idx) => idx + 1)
        } else {
          setSnackContent({
            message:
              'Insert a valid Token Name, Insert a valid Token Symbol, Token Total Supply must be greater than 0',
            type: 'error',
          })
        }
        break
      case stepsIndexes[2]:
        if (
          values.surveyLength &&
          values.emergencySurveyLength &&
          values.emergencySurveyStaking > 0 &&
          values.emergencySurveyStaking <= 0.98
        ) {
          setActiveStepIndex((idx) => idx + 1)
        } else {
          setSnackContent({
            message:
              'Survey Length must be a number greater than 0, Emergency Survey Length must be a number greater than 0, Penalty Fee must be a valid, positive number between 0 and 0.98',
            type: 'error',
          })
        }
        break

      case stepsIndexes[3]:
        showProposalModal({
          title: '',
          onProposalSuccess,
          initialContext: values,
          steps: [
            dataIntegrityValidation,
            deployVotingToken,
            deployProposalsManager,
            deployGovernanceRules,
            deployMetadata,
            DeployNewDFO,
          ],
        })
        break
      default:
    }
  }

  const onBack = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((idx) => idx - 1)
    }
  }

  return (
    <article>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            {organizationNewOrganization.map(
              ({ Component, key, index }) =>
                stepsIndexes[activeStepIndex] === index && (
                  <StepTemplate
                    Content={<Component values={values} />}
                    key={key}
                  />
                )
            )}
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              {activeStepIndex > 0 && (
                <Button
                  size="small"
                  text="Back"
                  color="tertiary"
                  onClick={onBack}
                />
              )}

              <Button size="small" color="primary" text="Next" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
      <SnackBar content={snackContent} setContent={setSnackContent} />
    </article>
  )
}

NewOrganization.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default NewOrganization
