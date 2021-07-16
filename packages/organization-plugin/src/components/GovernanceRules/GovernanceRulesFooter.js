import React from 'react'
import { Typography, Button, TextField } from '@dfohub/design-system'
import T from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useOrganizationContext } from '../../OrganizationContext'

import style from './governance-rules-footer.module.scss'

function GovernanceRulesFooter({ selectedRule, onSetProposal }) {
  const { isEditMode } = useOrganizationContext()
  const onSubmit = async (values, { setSubmitting }) => {
    await onSetProposal(selectedRule.id, values[selectedRule.id])
    setSubmitting(false)
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
      </div>
    )
  )
}

export default GovernanceRulesFooter

GovernanceRulesFooter.propTypes = {
  selectedRule: T.object,
  onSetProposal: T.func,
}
