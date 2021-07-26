import React from 'react'
import { TextField, Typography, Tooltip } from '@ethereansos/interfaces-ui'
import { EditField, Field } from '@ethereansos/interfaces-ui'

import style from './organization-edit.module.scss'

const OrgEditFields = () => {
  return (
    <>
      <Field name="shortDescription">
        {({ field }) => (
          <>
            <Typography weight="bold" variant="body1">
              BIO:
            </Typography>
            <TextField
              className={style.inputContainer}
              isMultiline
              {...field}
            />
            <Tooltip className={style.tooltip}>
              <Typography variant="body2">
                A brief description of the organization
              </Typography>
            </Tooltip>
          </>
        )}
      </Field>

      <EditField
        id="name"
        name="name"
        label="DFO Name:"
        description="The name of the organization"
      />

      <EditField
        id="brandUri"
        name="brandUri"
        label="DFO Logo:"
        description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
      />

      <EditField
        id="logoUri"
        name="logoUri"
        label="Token Logo:"
        description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
      />

      <EditField
        id="discussionUri"
        name="discussionUri"
        label="Chat Link:"
        description="A link to the official community of the organization (ex. Riot, Discord, Telegram)"
      />

      <EditField
        id="repoUri"
        name="repoUri"
        label="Repo Link:"
        description="A link to the official R&D repository"
      />

      <EditField
        id="wpUri"
        name="wpUri"
        label="Explainer link:"
        description="A link to an external source that explain the plan of the organization"
      />

      <EditField
        id="roadmapUri"
        name="roadmapUri"
        label="Roadmap link:"
        description="A link to an external source that provide the roadmap of the project"
      />

      <EditField
        id="externalDNS"
        name="externalDNS"
        label="External link:"
        description="A link to an external webpage to use the application (if any)"
      />

      <EditField
        id="externalENS"
        name="externalENS"
        label="External ENS link:"
        description="A link to an external ENS webpage to use the application (if any)"
      />
    </>
  )
}

export default OrgEditFields
