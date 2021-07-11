import React from 'react'
import {
  Typography,
  Token,
  TextField,
  Select,
  Button,
} from '@dfohub/design-system'
import { useFormik } from 'formik'
import T from 'prop-types'

import { validationSwapSchema as validationSchema } from './formSchema'
import style from './balance.module.scss'

const Swap = ({ onSwap, token }) => {
  const formik = useFormik({
    initialValues: {
      amount: 0.0,
      token: null,
    },
    validationSchema,
    onSubmit: (values) => {
      onSwap(values)
    },
  })

  const hasError = formik.errors.amount || formik.errors.token

  return (
    <div className={style.swap}>
      <Typography variant="body1" fontFamily="primary">
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="body1">Propose to swap:</Typography>
          <div className={style.amount}>
            <TextField
              type="number"
              name="amount"
              min="0"
              step={0.000000001} // TODO: recommended steps here? Considering we talk about cryptos
              isRounded
              value={formik.values.amount}
              className={style.amountInput}
              onChange={formik.handleChange}
            />
            <Token symbol={token.symbol} />
          </div>
          <Typography variant="body1">For:</Typography>
          <Select
            name="token"
            options={[]} // TODO we gotta fetch the tokens for the select
            onSelect={formik.setFieldValue}
            value={formik.values.token}
            valueKey="token"
            containerClassName={style.select}
          />
          {hasError ? (
            <Typography color="secondary" variant="subtitle1">
              {formik.errors.amount || formik.errors.token}
            </Typography>
          ) : null}
          <Button
            type="submit"
            disabled={hasError}
            className={style.submitButton}
            text="SWAP"
            size="small"></Button>
        </form>
      </Typography>
    </div>
  )
}

Swap.propTypes = {
  onSwap: T.func.isRequired,
  token: T.object.isRequired,
}

export default Swap
