import React from 'react'
import { Button, TextField, Typography, Tooltip } from '@dfohub/design-system'
import T from 'prop-types'
import { Formik, Form } from 'formik'

import EditField from '../shared/EditField'

import style from './organization-edit.module.scss'

const initialValues = {
  bio: '',
  dfoName: '',
  dfoLogo: '',
  tokenLogo: '',
  chatLink: '',
  repoLink: '',
  explainerLink: '',
  roadmapLink: '',
  externalLink: '',
  externalEnsLink: '',
}

function OrganizationEdit({ onClose }) {
  return (
    <section className={style.root}>
      <Button onClick={onClose} text="Back" />
      <Typography color="primary">Propose Metadata Change</Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO
          console.log(values)
          setSubmitting(false)
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Typography weight="bold" variant="body1">
              BIO:
            </Typography>
            <TextField
              name="bio"
              className={style.inputContainer}
              isMultiline
            />
            <Tooltip className={style.tooltip}>
              <Typography variant="body2">
                A brief description of the organization
              </Typography>
            </Tooltip>

            <EditField
              name="dfoName"
              label="DFO Name:"
              value="test"
              description="The name of the organization"
            />

            <EditField
              name="dfoLogo"
              label="DFO Logo:"
              value="test"
              description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
            />

            <EditField
              name="tokenLogo"
              label="Token Logo:"
              value="test"
              description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
            />

            <EditField
              name="chatLink"
              label="Chat Link:"
              value="test"
              description="A link to the official community of the organization (ex. Riot, Discord, Telegram)"
            />

            <EditField
              name="repoLink"
              label="Repo Link:"
              value="test"
              description="A link to the official R&D repository"
            />

            <EditField
              name="explainerLink"
              label="Explainer link:"
              value="test"
              description="A link to an external source that explain the plan of the organization"
            />

            <EditField
              name="roadmapLink"
              label="Roadmap link:"
              value="test"
              description="A link to an external source that provide the roadmap of the project"
            />

            <EditField
              name="externalLink"
              label="External link:"
              value="test"
              description="A link to an external webpage to use the application (if any)"
            />

            <EditField
              name="externalEnsLink"
              label="External ENS link:"
              value="test"
              description="A link to an external ENS webpage to use the application (if any)"
            />

            <Button
              type="submit"
              size="large"
              text="Propose"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default OrganizationEdit

OrganizationEdit.propTypes = {
  onClose: T.func.isRequired,
}
