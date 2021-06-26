import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './shinyText.module.scss'

const ShinyText = ({ text, animated, hover, strong, className }) => {
  return (
    <span
      className={classNames(
        style.root,
        {
          [style.always]: !hover,
          [style.animated]: !!animated,
          [style.hover]: !!hover,
          [style.strong]: !!strong,
        },
        className
      )}>
      {text}
    </span>
  )
}

export default ShinyText

ShinyText.propTypes = {
  text: T.string.isRequired,
  hover: T.bool,
  animated: T.bool,
  strong: T.bool,
  className: T.string,
}
