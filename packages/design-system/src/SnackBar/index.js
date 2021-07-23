import React, { useEffect } from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import Typography from '../Typography'
import Link from '../Link'

import style from './snack-bar.module.scss'

const SnackBar = ({ content, setContent, timeout }) => {
  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(() => {
        setContent()
      }, timeout)

      return () => {
        clearInterval(timeoutId)
      }
    }
  }, [setContent, timeout])

  if (!content) {
    return null
  }

  return (
    <div className={classNames(style.root, style[content.type])}>
      <Typography variant="body1">{content.message}</Typography>
      <Link onClick={() => setContent()}>Close</Link>
    </div>
  )
}

export default SnackBar

SnackBar.propTypes = {
  timeout: T.number,
  setContent: T.func.isRequired,
  content: T.shape({
    type: T.oneOf(['error', 'warning', 'success']),
    message: T.string,
  }),
}
