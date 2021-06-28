import React from 'react'
import classNames from 'classnames'
import T from 'prop-types'

import Typography from '../Typography/'
import { VOID_ETHEREUM_ADDRESS } from '../../../core/src/lib/constants'
import { TOKENS } from '../../../core/src/lib/tokens/tokens'

import style from './token.module.scss'

const Token = ({
  className,
  address = 'generic',
  showIcon = false,
  showSymbol = false,
}) => {
  // TODO: give extended logic for other tokens
  const iconSwitch = (address) => {
    switch (address) {
      case VOID_ETHEREUM_ADDRESS:
        return {
          symbol: TOKENS.find((t) => t.symbol === 'ETH').symbol,
          image: TOKENS.find((t) => t.symbol === 'ETH').image,
        }
      default:
        return {
          symbol: TOKENS.find((t) => t.symbol === 'TOK').symbol,
          image: TOKENS.find((t) => t.symbol === 'TOK').image,
        }
    }
  }

  return (
    <div className={classNames(style.root, className)}>
      {showIcon && iconSwitch(address).image}
      <Typography variant="h6" fontFamily="primary">
        {showSymbol && iconSwitch(address).symbol}
      </Typography>
    </div>
  )
}

Token.propTypes = {
  className: T.string,
  address: T.string.isRequired,
  showSymbol: T.bool,
}

export default Token
