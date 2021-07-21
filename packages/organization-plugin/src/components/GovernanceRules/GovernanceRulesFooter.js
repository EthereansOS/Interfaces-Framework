import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Typography, Button, TextField, Modal } from '@dfohub/design-system'
import T from 'prop-types'
import { numberToString } from '@dfohub/core'
import { sprintf } from 'sprintf-js'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useOrganizationContext } from '../../OrganizationContext'
import ProposalConfirm from '../ProposalConfirm'

import style from './governance-rules-footer.module.scss'

const getInitialContext = (
  element,
  template,
  lines,
  descriptions,
  updates,
  prefixedLines,
  postFixedLines
) => ({
  element,
  functionalityName: '',
  functionalitySubmitable: true,
  functionalityMethodSignature: 'callOneTime(address)',
  functionalityInternal: false,
  functionalityNeedsSender: false,
  functionalityReplace: '',
  emergency: false,
  template,
  lines,
  descriptions,
  updates,
  prefixedLines,
  postFixedLines,
})

function GovernanceRulesFooter({ selectedRule, organization }) {
  let history = useHistory()
  let params = useParams()

  const { isEditMode } = useOrganizationContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [proposalContext, setProposalContext] = useState({})

  const handleModalClose = () => {
    setProposalContext({})
    setModalOpen(false)
  }

  const onSubmit = async (values, { setSubmitting }) => {
    const template = selectedRule.getTemplate(values[selectedRule.id])
    const ctx = {
      ...getInitialContext(
        organization,
        template,
        selectedRule.lines,
        selectedRule.getDescriptions(values[selectedRule.id]).map((value) =>
          sprintf(value, {
            [selectedRule.id]: numberToString(values[selectedRule.id]),
          })
        ),
        selectedRule.getUpdates(values[selectedRule.id]).map((value) =>
          sprintf(value, {
            [selectedRule.id]: numberToString(values[selectedRule.id]),
          })
        )
      ),
      ...selectedRule.getProposalInitialValues(values[selectedRule.id]),
    }

    setProposalContext(ctx)
    setModalOpen(true)
    setSubmitting(false)
  }

  const handleProposalSuccess = () => {
    history.push(`/organizations/${params.address}/governance/proposals`)
  }

  return (
    isEditMode &&
    selectedRule && (
      <div className={style.changeFooter}>
        <Formik
          initialValues={{ [selectedRule.id]: selectedRule.value }}
          validationSchema={Yup.object().shape({
            [selectedRule.id]: Yup.number()
              .min(0, selectedRule.inputLabel + ' has to be minimum 0')
              .required(selectedRule.inputLabel + " can't be empty"),
          })}
          enableReinitialize
          onSubmit={onSubmit}>
          {({ isSubmitting, values, errors, setFieldValue }) => (
            <Form>
              <div className={style.formContentContainer}>
                <Typography
                  variant="body2"
                  className={style.descriptionContainer}>
                  {selectedRule.description}
                </Typography>
                <div>
                  <div className={style.fieldContainer}>
                    <strong>
                      <label htmlFor={selectedRule.id}>
                        {selectedRule.inputLabel}
                      </label>
                    </strong>
                    <TextField
                      type="number"
                      value={values[selectedRule.id] || ''}
                      name={selectedRule.id}
                      id={selectedRule.id}
                      onChange={(e) => {
                        setFieldValue(selectedRule.id, e.target.value)
                      }}
                    />
                  </div>
                  {errors[selectedRule.id] && (
                    <Typography
                      color="secondary"
                      variant="subtitle1"
                      className={style.fieldError}>
                      {errors[selectedRule.id]}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={style.submitContainer}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="small"
                  text="Propose"
                  color="primary"
                />
              </div>
            </Form>
          )}
        </Formik>
        {modalOpen && (
          <Modal visible>
            <ProposalConfirm
              initialContext={proposalContext}
              title={`Updating Proposal ${selectedRule.title}`}
              onClose={handleModalClose}
              onProposalSuccess={handleProposalSuccess}
            />
          </Modal>
        )}
      </div>
    )
  )
}

export default GovernanceRulesFooter

GovernanceRulesFooter.propTypes = {
  selectedRule: T.object,
  organization: T.object.isRequired,
  onSetProposal: T.func,
}
