import React from 'react'
import { Formik, Form } from 'formik'

import ColorField from '.'

const item = {
  title: 'Example/ColorField',
  component: ColorField,
}

export const SampleColorField = () => (
  <Formik
    initialValues={{
      color: '#cc0000',
    }}>
    {({ isValid }) => (
      <Form>
        <ColorField
          label="DFO Logo:"
          id="color"
          name="color"
          description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
        />
      </Form>
    )}
  </Formik>
)

export default item
