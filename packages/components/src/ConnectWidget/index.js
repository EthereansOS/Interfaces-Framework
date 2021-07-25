import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'
import { Button, Typography } from '@dfohub/design-system'
import { webs3States } from '@ethereansos/interfaces-core'

import style from './connect-widget.module.scss'

const ConnectWidget = ({
  logo,
  connectionStatus,
  onClickConnect,
  title,
  rotateLogo,
  className,
}) => (
  <div className={classNames(style['root'], className)}>
    {logo ? (
      <img
        src={logo}
        alt="logo"
        className={classNames({ [style.rotateLogo]: !!rotateLogo })}
      />
    ) : null}
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
        <Typography variant="body2" align="center">
          You need a{' '}
          <a href="https://etherscan.io/directory/Wallet">Web3 Enabler</a> to
          use this Dapp - If you have problems connecting, refresh the page.
        </Typography>
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
  rotateLogo: T.bool,
}

export default ConnectWidget
