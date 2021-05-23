import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'
import { Button, Typography } from '@dfohub/design-system'
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
    {logo ? <img src={logo} alt="logo" /> : null}
    <Typography variant="h1" color="primary">
      {title}
    </Typography>
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

ConnectWidget.propTypes = {
  logo: T.string,
  connectionStatus: T.string.isRequired,
  onClickConnect: T.func.isRequired,
  title: T.string,
  className: T.string,
}

export default ConnectWidget
