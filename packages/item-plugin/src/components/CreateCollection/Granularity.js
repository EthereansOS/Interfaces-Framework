import React from 'react'
import T from 'prop-types'
import { Formik, Form } from '@dfohub/components'
import { Button, FormControl, Typography } from '@dfohub/design-system'

const Granularity = ({ onNext, onBack, values }) => {
  const handleSubmit = (props) => {
    onNext(props, 'metadata')
  }

  return (
    <section>
      <Formik
        initialValues={{
          hasDecimals: values.hasDecimals || false,
        }}
        onSubmit={handleSubmit}>
        {({ isValid, setFieldValue, values }) => (
          <Form>
            <Typography variant="h3">Granularity</Typography>
            <FormControl
              control={
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFieldValue('hasDecimals', !values.hasDecimals)
                  }}
                  checked={values.hasDecimals}
                />
              }
              label="Decimals"
            />
            <Typography variant="body2">
              By selecting this option, all of the Items in this Collection will
              have 18 decimals in both implementations (Recommended only if you
              need decimals in the NFT implementation too. For example to
              realize special functions like in-game consumable items)
            </Typography>
            <Button
              color="tertiary"
              onClick={() => onBack({}, 'host')}
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

Granularity.propTypes = {
  onNext: T.func,
  onBack: T.func,
  values: T.object,
}

export default Granularity
