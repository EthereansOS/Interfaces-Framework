import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { usePlaceholder } from '@ethereansos/interfaces-core'
import { Formik, Form } from '@ethereansos/interfaces-ui'
import { Button, SnackBar } from '@ethereansos/interfaces-ui'

import StepTemplate from '../components/NewOrganizationSteps/StepTemplate'
import { orgEditInitialValues } from '../components/OrganizationEdit'

export const stepsIndexes = [10, 20, 30, 40]

const initialValues = {
  subdomain: '',
  name: '',
  supply: 0,
  symbol: '',
  surveyLength: 0,
  minStaking: '',
  lockedSupply: '',
  surveyQuorum: '',
  maxCap: '',
  activityReward: '',
  emergencyLength: 0,
  penaltyFee: 0,
  ...orgEditInitialValues,
}

const NewOrganization = ({ setTemplateState }) => {
  const organizationNewOrganization = usePlaceholder(
    'organizationNewOrganization'
  )
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [snackContent, setSnackContent] = useState()

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'New Organization',
      mainMenu: null,
      mainSubMenu: null,
    }))
  }, [setTemplateState])

  const onSubmit = (values) => {
    switch (stepsIndexes[activeStepIndex]) {
      case stepsIndexes[0]:
        if (values.subdomain) {
          setActiveStepIndex((idx) => idx + 1)
        } else {
          setSnackContent({ message: 'ENS Domain is mandatory', type: 'error' })
        }
        break
      case stepsIndexes[1]:
        if (values.name && values.symbol && values.supply > 0) {
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
          values.emergencyLength &&
          values.penaltyFee > 0
        ) {
          setActiveStepIndex((idx) => idx + 1)
        } else {
          setSnackContent({
            message:
              'Survey Length must be a number greater than 0, Emergency Survey Length must be a number greater than 0, Penalty Fee must be a valid, positive number between 0 and 197',
            type: 'error',
          })
        }
        break

      case stepsIndexes[3]:
        // TODO generate and compile contract ecc.
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
