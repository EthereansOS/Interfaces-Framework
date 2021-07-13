import React from 'react'
import { Formik, Form, EditField } from '@dfohub/components'
import { Button, Select, Typography } from '@dfohub/design-system'
import * as Yup from 'yup'
import style from '@dfohub/components/src/Balance/balance.module.scss'
import T from 'prop-types'

const HostSchema = Yup.object().shape({
  host: Yup.string().required('mmm... Your Collection deserves a name'),
  hostAddress: Yup.string().when('host', {
    is: 'wallet',
    then: Yup.string().required('Must enter address'),
  }),
})

const hostOptions = [
  { id: 'smart-contract', label: 'Smart Contract' },
  { id: 'wallet', label: 'Wallet' },
]

const Host = ({ onNext, onBack, values }) => {
  const handleSubmit = (props) => {
    onNext(props, 'granularity')
  }

  return (
    <section>
      <Formik
        initialValues={{
          host: values.host || '',
        }}
        validationSchema={HostSchema}
        onSubmit={handleSubmit}>
        {({ isValid, setFieldValue, values }) => (
          <Form>
            <Typography variant="h3">Who Is the Host?</Typography>
            <Typography variant="body2">
              The host of the collection has the ability to mint ITEMs and
              update the Metadata info. It can be a wallet, or a smart contract
              with custom rules, which you can deploy during this setup.More
              info
            </Typography>
            <Select
              id="host"
              options={hostOptions} // TODO we gotta fetch the tokens for the select
              onSelect={(id, value) => {
                console.log('PASSO D Q')
                console.log(value)
                setFieldValue(id, value)
              }}
              value={values.host}
              containerClassName={style.select}
            />
            {values.host === 'wallet' && (
              <EditField id="hostAddress" name="hostAddress" label="Address" />
            )}
            <Button
              color="tertiary"
              onClick={() => onBack({}, 'start')}
              text="Back"
              type="button"
            />
            <Button
              disabled={!isValid}
              color="tertiary"
              type="submit"
              text="Next"
            />
          </Form>
        )}
      </Formik>
    </section>
  )
}

Host.propTypes = {
  onNext: T.func,
  onBack: T.func,
  values: T.object,
}

export default Host
