import React from 'react'
import { Typography, Token, Button } from '@dfohub/design-system'
import T from 'prop-types'
import { Formik, Form } from 'formik'

import EditField from '../EditField'

import { validationTransferSchema as validationSchema } from './formSchema'
import style from './balance.module.scss'

const initialValues = {
  amount: 0,
  address: '',
}

const Transfer = ({ onTransferSubmit, token }) => {
  return (
    <div className={style.transfer}>
      <Typography variant="body1" fontFamily="primary">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onTransferSubmit}>
          {({ isValid, errors }) => (
            <Form>
              <Typography variant="body1">Propose to transfer:</Typography>

              <EditField
                id="amount"
                name="amount"
                type="number"
                min="0"
                step={0.000000001}
                RightInputComponent={<Token symbol={token.symbol} />}
              />

              <Typography variant="p">To:</Typography>

              <EditField id="address" name="address" />
              {(errors.amount || errors.token) && (
                <Typography color="secondary" variant="subtitle1">
                  {errors.amount || errors.token}
                </Typography>
              )}
              <Button
                type="submit"
                disabled={!isValid}
                className={style.submitButton}
                text="TRANSFER"
                size="small"
              />
            </Form>
          )}
        </Formik>
      </Typography>
    </div>
  )
}

Transfer.propTypes = {
  onTransferSubmit: T.func.isRequired,
  token: T.object.isRequired,
}

export default Transfer
