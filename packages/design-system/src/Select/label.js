import React from 'react'
import classNames from 'classnames'
import T from 'prop-types'

import Typography from '../Typography'

import style from './select.module.scss'

const Label = ({ tokenName, tokenImage }) => (
  <div className={classNames(style.label)}>
    <img src={tokenImage} alt={tokenName} className={classNames(style.image)} />
    <Typography fontFamily="primary" variant="p" color="primary">
      {tokenName}
    </Typography>
  </div>
)

Label.propTypes = {
  tokenName: T.string.isRequired,
  tokenImage: T.any.isRequired,
}

export default Label
