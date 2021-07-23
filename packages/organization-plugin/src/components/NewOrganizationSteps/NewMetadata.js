import React from 'react'
import { Typography } from '@dfohub/design-system'
import classNames from 'classnames'

import OrgEditFields from '../OrganizationEdit/OrgEditFields'

import style from './step.module.scss'

const NewMetadata = () => {
  return (
    <div className={classNames(style.content, style.contentStartAlign)}>
      <div className={style.description}>
        <Typography variant="h5">4 of 4 | Metadata</Typography>
        <Typography variant="body1">
          What this brand new DFO is about?
        </Typography>
      </div>
      <div className={style.form}>
        <OrgEditFields />
      </div>
    </div>
  )
}

export default NewMetadata
