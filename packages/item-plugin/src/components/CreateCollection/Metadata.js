import React, { useState } from 'react'
import {
  Formik,
  Form,
  EditField,
  FileField,
  ColorField,
  Yup,
} from '@dfohub/components'
import { Button, Select, Typography } from '@dfohub/design-system'
import T from 'prop-types'

const MetadataSchemaBasic = Yup.object().shape({
  description: Yup.string().required(`Description is mandatory`),
  background_color: Yup.string().required(`Background color is mandatory`),
  discussionUri: Yup.string().isValidUrl(`Discussion Link must be a valid URL`),
  externalDNS: Yup.string().isValidUrl(`DNS Link must be a valid URL`),
  externalENS: Yup.string().isValidUrl(`ENS Link must be a valid URL`),
  repoUri: Yup.string().isValidUrl(`Repo Link must be a valid URL`),
  image: Yup.mixed()
    .imageMaxWidth(2000)
    .imageMaxMBSize(0.1)
    .required('mmm... Your Collection deserves a name'),
})

const MetadataSchemaCustom = Yup.object().shape({
  description: Yup.string().required(`Description is mandatory`),
  background_color: Yup.string().required(`Background color is mandatory`),
  discussionUri: Yup.string().isValidUrl(`Discussion Link must be a valid URL`),
})
const metadataTypeOptions = [
  { id: 'basic', label: 'Basic' },
  { id: 'custom', label: 'Custom' },
]

const MetadataBasic = () => {
  return (
    <>
      <EditField
        id="description"
        name="description"
        label="Description *"
        description="A description of the collection"
        isMultiline
        rows="4"
      />
      <EditField
        id="discussionUri"
        name="discussionUri"
        label="Discussion Link"
        description="A link to a social hub and/or discussion channel for the collection (if any)"
      />
      <EditField
        id="externalDNS"
        name="externalDNS"
        label="DNS Link"
        description="A link to the official website of this project (if any)"
      />
      <EditField
        id="externalENS"
        name="externalENS"
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
        id="image"
        name="image"
        label="Cover (Regular) * "
        description="The cover img must be .png or .gif and at max 5mb length, due to users experience in IPFS download speed limitations (recommended size 350 x 350)"
      />
      <FileField
        id="image_data"
        name="image_data"
        label="Cover (High Quality)"
        description="No limitations for the HQ version of the image"
      />
      <ColorField
        id="background_color"
        name="background_color"
        label="Background Color *"
        description="The background color behind your cover used in most dApps, if not fixed with their standard image sizes"
      />
      <FileField
        id="licence_url"
        name="licence_url"
        label="Licence File"
        accept=".pdf,.html,.md,.txt"
        description="A file that represents the legal licence of all of ITEMs in the collection (if any). Accepted file types: .pdf, .html, .md, .txt"
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
  const [type, setType] = useState('basic')
  const handleSubmit = (props) => {
    onNext(props, 'granularity')
  }

  return (
    <section>
      <Formik
        validateOnChange={false}
        initialValues={{
          metadataType: values.metadataType || 'basic',
          metadataBackgroundColor: values.metadataBackgroundColor || '#c00',
        }}
        validationSchema={
          type === 'basic' ? MetadataSchemaBasic : MetadataSchemaCustom
        }
        onSubmit={handleSubmit}>
        {({ isValid, setFieldValue, values }) => (
          <Form>
            <Typography variant="h3">Metadata</Typography>
            <Select
              id="metadataType"
              options={metadataTypeOptions} // TODO we gotta fetch the tokens for the select
              onSelect={(id, value) => {
                setType(value)
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
