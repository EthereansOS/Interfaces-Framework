import React from 'react'
import { Button, TextField, Typography, Tooltip } from '@dfohub/design-system'
import T from 'prop-types'
import { Formik, Form } from 'formik'

import EditField from '../shared/EditField'
import { OrganizationPropType } from '../../propTypes'

import style from './organization-edit.module.scss'

const initialValues = {
  shortDescription: '',
  name: '',
  brandUri: '',
  logoUri: '',
  discussionUri: 'https://discord.com/invite/66tafq3',
  repoUri: 'https://github.com/b-u-i-d-l/dfo-hub',
  wpUri: 'https://www.dfohub.com/protocol',
  roadmapUri: 'https://www.dfohub.com/protocol',
  externalDNS: 'dfohub.com',
  externalENS: 'dfohub.eth',
}

function OrganizationEdit({ onClose, organization }) {
  console.log('ASD', organization?.metadata)

  return (
    <section className={style.root}>
      <Button onClick={onClose} text="Back" />
      <Typography color="primary">Propose Metadata Change</Typography>

      <Formik
        initialValues={organization?.metadata || initialValues}
        enableReinitialize
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
              name="shortDescription"
              className={style.inputContainer}
              isMultiline
            />
            <Tooltip className={style.tooltip}>
              <Typography variant="body2">
                A brief description of the organization
              </Typography>
            </Tooltip>

            <EditField
              name="name"
              label="DFO Name:"
              value="test"
              description="The name of the organization"
            />

            <EditField
              name="brandUri"
              label="DFO Logo:"
              value="test"
              description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
            />

            <EditField
              name="logoUri"
              label="Token Logo:"
              value="test"
              description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
            />

            <EditField
              name="discussionUri"
              label="Chat Link:"
              value="test"
              description="A link to the official community of the organization (ex. Riot, Discord, Telegram)"
            />

            <EditField
              name="repoUri"
              label="Repo Link:"
              value="test"
              description="A link to the official R&D repository"
            />

            <EditField
              name="wpUri"
              label="Explainer link:"
              value="test"
              description="A link to an external source that explain the plan of the organization"
            />

            <EditField
              name="roadmapUri"
              label="Roadmap link:"
              value="test"
              description="A link to an external source that provide the roadmap of the project"
            />

            <EditField
              name="externalDNS"
              label="External link:"
              value="test"
              description="A link to an external webpage to use the application (if any)"
            />

            <EditField
              name="externalENS"
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
  organization: OrganizationPropType,
}
