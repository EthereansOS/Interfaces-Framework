import React, { useEffect, useState } from 'react'
import {
  LinearProgress,
  Typography,
  Card,
  Button,
} from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  useEthosContext,
  useWeb3,
} from '@ethereansos/interfaces-core'
import PQueue from 'p-queue'
import { Formik, Form } from 'formik'

import { OrganizationPropType } from '../../propTypes'
import { useOrganizationContext } from '../../OrganizationContext'
import { FnParamInputField, FnParamSelectField } from '../shared/FnParamsFields'

import style from './state-list.module.scss'

const queue = new PQueue({ concurrency: 20 })
// the square brackets are used to disable object path formik functionality
// https://formik.org/docs/guides/arrays#avoid-nesting
const generateFieldName = (name) => `['${name}']`

const StateList = ({ organization }) => {
  const [stateAmount, setStateAmount] = useState()
  const [stateList, setStateList] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const { web3 } = useWeb3()
  const { context } = useEthosContext()
  const { isEditMode } = useOrganizationContext()
  const [editingIndex, setEditingIndex] = useState()

  const methods = organization?.stateHolder?.methods

  useEffect(() => {
    const fetchStateList = async () => {
      try {
        setIsFetching(true)
        const amount = await blockchainCall(
          { web3, context },
          methods?.getStateSize
        )
        setStateAmount(amount)

        let list = await blockchainCall({ web3, context }, methods?.toJSON)
        list = JSON.parse(
          list.endsWith(',]')
            ? list.substring(0, list.lastIndexOf(',]')) + ']'
            : list
        )

        const fetchStateDetail = async (state) => {
          const methodName =
            'get' +
            state.type.substring(0, 1).toUpperCase() +
            state.type.substring(1)

          state.value = await blockchainCall(
            { web3, context },
            methods[methodName],
            state.name
          )

          setStateList((l) => [...l, state])
        }

        list.forEach((state) => queue.add(() => fetchStateDetail(state)))
      } catch (e) {
        console.log('Error fetching state list', e)
      } finally {
        setIsFetching(false)
      }
    }

    if (methods?.getStateSize && methods?.toJSON) {
      fetchStateList()
    }
  }, [context, web3, methods])

  return (
    <>
      {stateList.map((state, index) => (
        <Card contentClassName={style.card}>
          <div className={style.nameContainer}>
            <Typography variant="h5">{state.name}</Typography>
            <Typography variant="body2">
              <span role="img" aria-label="floppy">
                &#128190;
              </span>
              {'  '}
              {state.type}
            </Typography>
          </div>

          {isEditMode && (
            <div className={style.changeButtonContainer}>
              <Button
                size="small"
                text="Change"
                onClick={() => setEditingIndex(index)}
                color="secondary"
              />
            </div>
          )}

          {editingIndex === index ? (
            <Formik
              initialValues={{
                [state.name]: state.value.toString(),
              }}
              onSubmit={() => null}
              onReset={() => null}>
              {({ isSubmitting, values }) => (
                <Form>
                  <FnParamInputField
                    name={generateFieldName(state.name)}
                    param={state.type}
                  />
                  <FnParamSelectField
                    name={generateFieldName(state.name)}
                    param={state.type}
                  />

                  <div className={style.submitButtonsContainer}>
                    <Button
                      type="submit"
                      size="small"
                      text="Propose"
                      color="primary"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="reset"
                      size="small"
                      text="Clear"
                      color="primary"
                      disabled={isSubmitting}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Typography className={style.valueContainer} variant="body2">
              {state.value.toString()}
            </Typography>
          )}
        </Card>
      ))}
      {isFetching && <LinearProgress />}
      {stateAmount === 0 && (
        <Typography variant="h2">
          This DFO does not contain any State Element
        </Typography>
      )}
    </>
  )
}

StateList.propTypes = {
  organization: OrganizationPropType,
}

export default StateList
