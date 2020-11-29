import React from 'react'

import classNames from 'classnames'
import { Button, Heading } from '@dfohub/design-system'
import { webs3States } from '@dfohub/core'

import style from './connect-widget.module.scss'

const ConnectWidget = ({
  logo,
  connectionStatus,
  onClickConnect,
  title,
  className,
}) => (
  <div className={classNames(style['root'], className)}>
    <img src={logo} alt="logo" />
    <Heading variant="h1" color="primary">
      {title}
    </Heading>
    <br />
    {connectionStatus === webs3States.CONNECTED && <div>Connected</div>}
    {connectionStatus === webs3States.CONNECTING && <div>Connecting</div>}
    {connectionStatus === webs3States.NOT_CONNECTED && (
      <>
        <Button onClick={onClickConnect} text="Connect" variant="primary" />
        <br />
        <p>
          Connect to the{' '}
          <a href="https://etherscan.io/directory/Wallet">Web3</a> to enter
        </p>
      </>
    )}
  </div>
)

export default ConnectWidget
