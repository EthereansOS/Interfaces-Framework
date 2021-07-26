import React from 'react'
import {
  Button,
  Typography,
  Formik,
  Form,
  EditField,
} from '@ethereansos/interfaces-ui'
import * as Yup from 'yup'
import T from 'prop-types'

const StartSchema = Yup.object().shape({
  name: Yup.string().required('mmm... Your Collection deserves a name'),
  symbol: Yup.string().required(
    'The Collection symbol is important! Dont forget it'
  ),
})

const Start = ({ onNext, values = {} }) => {
  const handleSubmit = (props) => {
    onNext(props, 'host')
  }

  return (
    <section>
      <Formik
        initialValues={{
          name: values.name || '',
          symbol: values.symbol || '',
        }}
        validationSchema={StartSchema}
        onSubmit={handleSubmit}>
        {({ isValid }) => (
          <Form>
            <Typography variant="h3">Let’s Start With the Basics</Typography>
            <EditField id="name" name="name" label="Name" />
            <EditField id="symbol" name="symbol" label="Symbol" />
            <Button
              color="tertiary"
              disabled={!isValid}
              text="Next"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </section>
  )
}

Start.propTypes = {
  onNext: T.func,
  values: T.object,
}

export default Start
