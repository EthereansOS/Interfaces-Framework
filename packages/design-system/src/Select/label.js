import React from 'react'
import classNames from 'classnames'
import T from 'prop-types'

import Typography from '../Typography'

import style from './select.module.scss'

const Label = ({ text, image }) => (
  <div className={classNames(style.label)}>
    {image && (
      <img src={image} alt={text} className={classNames(style.image)} />
    )}
    <Typography fontFamily="primary" variant="p" color="primary">
      {text}
    </Typography>
  </div>
)

Label.propTypes = {
  text: T.string.isRequired,
  image: T.any,
}

export default Label
