import React from 'react'
import { EditField } from '@ethereansos/interfaces-ui'
import { Typography } from '@ethereansos/interfaces-ui'

import style from './step.module.scss'

const NewSubdomain = () => {
  return (
    <div className={style.content}>
      <div className={style.description}>
        <Typography variant="h5">1 of 4 | Subdomain</Typography>
        <Typography variant="body1">
          Fist of all, Redeem your ENS subdomain. The .dfohub.eth subdomain will
          redirect users to the DFO's front-end persistently as long as the
          ethereum network exists.
        </Typography>
      </div>
      <div className={style.form}>
        <EditField
          id="subdomain"
          name="subdomain"
          label="Subdomain"
          RightInputComponent={
            <Typography variant="body1">.dfohub.eth</Typography>
          }
        />
      </div>
    </div>
  )
}

export default NewSubdomain
