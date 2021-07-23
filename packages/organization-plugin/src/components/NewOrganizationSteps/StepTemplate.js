import React from 'react'
import T from 'prop-types'
import { Typography } from '@dfohub/design-system'

import style from './step-template.module.scss'

const StepTemplate = ({ Content, contentClassName }) => {
  return (
    <>
      <Typography className={style.title}>
        <Typography variant="h1" as="span">
          Incorporate a new{' '}
        </Typography>
        <Typography variant="h1" as="span" color="primary">
          Decentralized Flexible Organization
        </Typography>
      </Typography>
      {Content && Content}
    </>
  )
}

export default StepTemplate

StepTemplate.propTypes = {
  Content: T.node,
  contentClassName: T.string,
}
