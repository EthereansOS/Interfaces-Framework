import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Typography, Button } from '@dfohub/design-system'
import T from 'prop-types'
import { useInit, useWeb3 } from '@dfohub/core'
import { Formik, Form } from 'formik'

import { OrganizationPropType } from '../../propTypes'
import organizationFunctionCall from '../../lib/organizationFunctionCall'

import { FnParamInputField, FnParamSelectField } from './FnParamsFields'
import style from './card-footer.module.scss'

const CardFooter = ({ selectedFnName, name, footerType, fn, organization }) => {
  const { web3 } = useWeb3()
  const { context } = useInit()
  const [queryResponse, setQueryResponse] = useState()

  const initialValues = fn.inputParameters.reduce((acc, el, i) => {
    if (!fn.needsSender || i > (fn.submitable ? 1 : 0)) {
      acc['attr_' + i] = ''
    }
    return acc
  }, {})

  const onSubmit = async (values, { setSubmitting }) => {
    const submitType = fn.submitable ? 'submit' : 'read'
    const args = fn.submitable ? Object.values(values) : []

    setSubmitting(true)
    const res = await organizationFunctionCall(
      { web3, context },
      organization,
      submitType,
      fn.codeName,
      fn.inputParameters,
      args,
      fn.returnAbiParametersArray,
      fn.needsSender
    )
    setQueryResponse(res)
    setSubmitting(false)
  }

  if (footerType === 'code' && selectedFnName === name) {
    return (
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          readOnly: true,
        }}
        height="400px"
        language="sol"
        theme="vs-dark"
        value={fn.code}
      />
    )
  }

  if (footerType === 'query' && selectedFnName === name) {
    if (fn.isInternal || !fn.methodSignature) {
      return (
        <div className={style.queryContainer}>
          <Typography variant="body1">Internal</Typography>
        </div>
      )
    }

    return (
      <div className={style.queryContainer}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, values }) => (
            <Form>
              {fn.submitable ? (
                <>
                  <div className={style.queryHeader}>
                    <Typography variant="body1">
                      {fn.methodSignature}
                    </Typography>
                    <div>
                      {fn.inputParameters.map(
                        (param, i) =>
                          (!fn.needsSender || i > (fn.submitable ? 1 : 0)) && (
                            <>
                              <FnParamInputField
                                name={`attr_${i}`}
                                param={param}
                              />
                              <FnParamSelectField
                                name={`attr_${i}`}
                                param={param}
                              />
                            </>
                          )
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="small"
                    text="Submit"
                    color="tertiary"
                  />
                </>
              ) : (
                <div className={style.queryHeader}>
                  <Typography variant="body1">{fn.methodSignature}</Typography>
                  <Button
                    type="submit"
                    size="small"
                    text="Read"
                    disabled={isSubmitting}
                    color="tertiary"
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
        <Typography variant="body1">{queryResponse}</Typography>
      </div>
    )
  }

  return null
}

export default CardFooter

CardFooter.propTypes = {
  selectedFnName: T.string,
  name: T.string,
  footerType: T.oneOf(['code', 'query']),
  fn: T.shape({
    submitable: T.bool,
    methodSignature: T.string,
    code: T.string,
    codeName: T.string,
    isInternal: T.bool,
    inputParameters: T.any,
    returnAbiParametersArray: T.any,
    needsSender: T.bool,
  }),
  organization: OrganizationPropType,
}
