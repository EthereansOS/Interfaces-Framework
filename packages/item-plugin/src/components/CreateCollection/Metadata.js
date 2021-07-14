import React from 'react'
import {
  Formik,
  Form,
  EditField,
  FileField,
  ColorField,
} from '@dfohub/components'
import { Button, Select, Typography } from '@dfohub/design-system'
import * as Yup from 'yup'
import T from 'prop-types'

const MetadataSchema = Yup.object().shape({
  // host: Yup.string().required('mmm... Your Collection deserves a name'),
  // hostAddress: Yup.string().when('host', {
  //   is: 'wallet',
  //   then: Yup.string().required('Must enter address'),
  // }),
})

const metadataTypeOptions = [
  { id: 'basic', label: 'Basic' },
  { id: 'custom', label: 'Custom' },
]

const MetadataBasic = () => {
  return (
    <>
      <EditField
        id="metadataDescription"
        name="metadataDescription"
        label="Description *"
        description="A description of the collection"
        isMultiline
        rows="4"
      />
      <EditField
        id="metadataDiscussionLink"
        name="metadataDiscussionLink"
        label="Discussion Link"
        description="A link to a social hub and/or discussion channel for the collection (if any)"
      />
      <EditField
        id="metadataDnsLink"
        name="metadataDnsLink"
        label="DNS Link"
        description="A link to the official website of this project (if any)"
      />
      <EditField
        id="metadataEnsLink"
        name="metadataEnsLink"
        label="ENS Link"
        description="An ENS link to the official website of this project (if any)"
      />
      <EditField
        id="metadataRepoLink"
        name="metadataRepoLink"
        label="Repo Link"
        description="A link to the official repo of this project (if any)"
      />
      <FileField
        id="metadataCoverRegular"
        name="metadataCoverRegular"
        label="Cover (Regular) * "
        description="The cover img must be .png or .gif and at max 5mb length, due to users experience in IPFS download speed limitations (recommended size 350 x 350)"
      />
      <FileField
        id="metadataCoverHigh"
        name="metadataCoverHigh"
        label="Cover (High Quality)"
        description="No limitations for the HQ version of the image"
      />
      <FileField
        id="metadataLicence"
        name="metadataLicence"
        label="Licence File"
        accept=".pdf,.html,.md,.txt"
        description="A file that represents the legal licence of all of ITEMs in the collection (if any). Accepted file types: .pdf, .html, .md, .txt"
      />
      <ColorField
        id="metadataBackgroundColor"
        name="metadataBackgroundColor"
        label="Background Color *"
        description="The background color behind your cover used in most dApps, if not fixed with their standard image sizes"
      />
    </>
  )
}

const MetadataCustom = () => {
  return (
    <>
      <EditField
        id="metadata-link"
        name="metadata-link"
        label="Metadata Link"
      />
      <Typography variant="body2">
        The metadata file is a JSON standard file containing all of the info and
        links to the file of the ITEM. Here You can find a step by step guide to
        build your json file correctly. | Link must be expressed in
        ipfs://ipfs/0000000000..
      </Typography>
    </>
  )
}

const Metadata = ({ onNext, onBack, values }) => {
  const handleSubmit = (props) => {
    onNext(props, 'granularity')
  }

  return (
    <section>
      <Formik
        initialValues={{
          metadataType: values.metadataType || 'basic',
          metadataBackgroundColor: values.metadataBackgroundColor || '#c00',
        }}
        validationSchema={MetadataSchema}
        onSubmit={handleSubmit}>
        {({ isValid, setFieldValue, values }) => (
          <Form>
            <Typography variant="h3">Metadata</Typography>
            <Select
              id="metadataType"
              options={metadataTypeOptions} // TODO we gotta fetch the tokens for the select
              onSelect={(id, value) => {
                setFieldValue(id, value)
              }}
              value={values.metadataType}
            />
            {values.metadataType === 'basic' && <MetadataBasic />}
            {values.metadataType === 'custom' && <MetadataCustom />}
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

Metadata.propTypes = {
  onNext: T.func,
  onBack: T.func,
  values: T.object,
}

export default Metadata
