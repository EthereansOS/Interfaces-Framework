import React from 'react'
import { Typography, Token, TextField, Button } from '@dfohub/design-system'
import T from 'prop-types'
import { useWeb3, VOID_ETHEREUM_ADDRESS } from '@dfohub/core'
import { Formik, Form, Field } from 'formik'

import TokenPicker from '../TokenPicker'

import { validationSwapSchema as validationSchema } from './formSchema'
import style from './balance.module.scss'

const initialValues = {
  amount: 0.001,
  token: null,
}

const Swap = ({ token, onSwapSubmit }) => {
  const { wethAddress } = useWeb3()

  return (
    <div className={style.swap}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSwapSubmit}>
        {({ isValid, errors }) => (
          <Form>
            <Typography variant="body1">Propose to swap:</Typography>
            <div className={style.amount}>
              <Field name="amount">
                {({ field }) => (
                  <TextField
                    type="number"
                    min="0"
                    step={0.000000001} // TODO: recommended steps here? Considering we talk about cryptos
                    isRounded
                    {...field}
                    className={style.amountInput}
                  />
                )}
              </Field>

              <Token symbol={token.symbol} />
            </div>
            <Typography variant="body1">For:</Typography>

            <TokenPicker
              id="token"
              name="token"
              tokenAddress={
                token.address === VOID_ETHEREUM_ADDRESS
                  ? wethAddress
                  : token.address
              }
            />
            {errors.amount || errors.token ? (
              <Typography color="secondary" variant="subtitle1">
                {errors.amount || errors.token}
              </Typography>
            ) : null}
            <Button
              type="submit"
              disabled={!isValid}
              className={style.submitButton}
              text="SWAP"
              size="small"></Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

Swap.propTypes = {
  onSwap: T.func.isRequired,
  token: T.object.isRequired,
  organization: T.object,
  onSwapSubmit: T.func,
}

export default Swap
