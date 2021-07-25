import React from 'react'
import { Button, Typography, Container } from '@dfohub/design-system'
import { Link } from 'react-router-dom'
import {
  useWeb3,
  fromDecimals,
  formatLink,
  useEthosContext,
} from '@ethereansos/interfaces-core'

import { useOrganizationContext } from '../../OrganizationContext'
import { OrganizationPropType } from '../../propTypes'

import style from './organizationHeader.module.scss'

const OrganizationHeader = ({ organization }) => {
  const { isEditMode, setEditMode, setViewMode } = useOrganizationContext()
  const { walletAddress, walletAvatar } = useWeb3()
  const context = useEthosContext()

  const metadata = organization?.metadata || {}

  return (
    <header className={style.root}>
      <Container className={style.content}>
        <section className={style.leftContainer}>
          <img
            src={
              metadata?.brandUri
                ? formatLink({ context }, metadata?.brandUri)
                : organization?.icon
            }
            className={style.logo}
            alt="logo"
          />
          <Typography variant="h4" className={style.title}>
            {organization?.name}
          </Typography>
        </section>

        <section className={style.balance}>
          <figure>
            <img src={walletAvatar} alt="wallet" />
          </figure>

          <Typography variant="body2">
            {walletAddress}
            <br />
            <b>
              Balance:{' '}
              {fromDecimals(organization.myBalanceOf, organization.decimals)}{' '}
              {organization.symbol}
            </b>
          </Typography>
        </section>

        <section className={style.rightContainer}>
          <Button
            size="small"
            text={isEditMode ? 'View mode' : 'Edit mode'}
            onClick={() => (isEditMode ? setViewMode() : setEditMode())}
          />
          <Link className={style.closeButton} to="/list">
            ☒
          </Link>
        </section>
      </Container>
    </header>
  )
}

OrganizationHeader.propTypes = {
  organization: OrganizationPropType.isRequired,
}

export default OrganizationHeader
