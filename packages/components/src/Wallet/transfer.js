import React from 'react'
import Typography from '@dfohub/design-system/src/Typography'
import Token from '@dfohub/design-system/src/Token'
import TextField from '@dfohub/design-system/src/TextField'
import Button from '@dfohub/design-system/src/Button'
import { useFormik } from 'formik'
import T from 'prop-types'

import { validationTransferSchema as validationSchema } from './formSchema'
import style from './wallet.module.scss'

const Transfer = ({ onTransfer, token }) => {
  const formik = useFormik({
    initialValues: {
      amount: 0.0,
      address: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onTransfer(values)
    },
  })

  const hasError = formik.errors.amount || formik.errors.address

  return (
    <div className={style.transfer}>
      <Typography variant="body1" fontFamily="primary">
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="p">Propose to transfer:</Typography>
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
            <Token address={token.address} showSymbol />
          </div>
          <Typography variant="p">To:</Typography>
          <TextField
            type="text"
            name="address"
            isRounded
            value={formik.values.address}
            className={style.addressInput}
            onChange={formik.handleChange}
          />
          {hasError ? (
            <Typography color="secondary" variant="subtitle1">
              {formik.errors.amount || formik.errors.address}
            </Typography>
          ) : null}
          <Button
            type="submit"
            disabled={hasError || !formik.values.address}
            className={style.submitButton}
            text="TRANSFER"
            size="small"></Button>
        </form>
      </Typography>
    </div>
  )
}

Transfer.propTypes = {
  onTransfer: T.func.isRequired,
  token: T.object.isRequired,
}

export default Transfer
