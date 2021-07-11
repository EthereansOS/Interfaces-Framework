import React from 'react'
import classNames from 'classnames'
import T from 'prop-types'

import Typography from '../Typography/'

import style from './token.module.scss'

const Token = ({ className, symbol, logo }) => {
  return (
    <div className={classNames(style.root, className)}>
      {logo && <img src={`${process.env.PUBLIC_URL}/${logo}`} alt="token" />}
      {symbol && (
        <Typography variant="h6" fontFamily="primary">
          {symbol}
        </Typography>
      )}
    </div>
  )
}

Token.propTypes = {
  className: T.string,
  logo: T.string,
  symbol: T.string,
}

export default Token
