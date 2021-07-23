import React from 'react'
import { EditField } from '@dfohub/components'
import { Typography } from '@dfohub/design-system'

import style from './step.module.scss'

const NewVotingToken = () => {
  return (
    <div className={style.content}>
      <div className={style.description}>
        <Typography variant="h5">2 of 4 | Voting Token</Typography>
        <Typography variant="body1">
          The Voting Token of a DFO is an ERC20 Token. The Voting Token is the
          key to rule the DFO functionalities and its assets. If you lose your
          voting tokens, there is no way to be part of the future DFO's
          decisions.
        </Typography>
      </div>
      <div className={style.form}>
        <EditField id="name" name="name" label="Name" />
        <EditField id="symbol" name="symbol" label="Symbol" />
        <EditField id="supply" name="supply" label="Supply" type="number" />
        {/* TODO */}
        <Typography variant="body1" weight="bold" className={style.label}>
          Generation Fee: 1.5% (0)
        </Typography>
      </div>
    </div>
  )
}

export default NewVotingToken
