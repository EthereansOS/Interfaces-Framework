import React, { useState } from 'react'
import classNames from 'classnames'
import Card from '@dfohub/design-system/src/Card'
import Typography from '@dfohub/design-system/src/Typography'
import Token from '@dfohub/design-system/src/Token'
import Button from '@dfohub/design-system/src/Button'
import T from 'prop-types'
import { VOID_ETHEREUM_ADDRESS } from '@dfohub/core/src/lib/constants'

import Swap from './swap'
import Transfer from './transfer'
import style from './wallet.module.scss'

const Wallet = ({
  className,
  isEdit = false,
  token,
  tokenPrice,
  onSwap,
  onTransfer,
}) => {
  const [isSwap, setIsSwap] = useState(false)
  const [isTransfer, setIsTransfer] = useState(false)

  return (
    <Card className={classNames(style.root, className)}>
      <div className={style.token}>
        <Token address={token.address} showIcon showSymbol />
        {/* TODO: extend / make component with other type of tokens */}
        {token.address === VOID_ETHEREUM_ADDRESS && tokenPrice !== 0 && (
          <Typography variant="body1" fontFamily="primary">
            (${tokenPrice})
          </Typography>
        )}
      </div>
      <Typography variant="h5" weight="bold" fontFamily="primary">
        {token.amount}
      </Typography>
      {isEdit && (
        <div className={style.actions}>
          <Button
            text="SWAP"
            size="small"
            color={isSwap ? 'secondary' : 'primary'}
            onClick={() => {
              setIsTransfer(false)
              setIsSwap(true)
            }}></Button>
          <Button
            text="TRANSFER"
            size="small"
            color={isTransfer ? 'secondary' : 'primary'}
            onClick={() => {
              setIsSwap(false)
              setIsTransfer(true)
            }}></Button>
        </div>
      )}
      {isSwap && <Swap onSwap={onSwap} token={token} />}
      {isTransfer && <Transfer onTransfer={onTransfer} token={token} />}
    </Card>
  )
}

Wallet.propTypes = {
  className: T.string,
  isEdit: T.bool.isRequired,
  token: T.any.isRequired,
  tokenPrice: T.number,
  onSwap: T.func,
  onTransfer: T.func,
}

export default Wallet
