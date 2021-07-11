import React, { useState } from 'react'
import { Card, Typography, Chip, Link, Button } from '@dfohub/design-system'
import { useLocation } from 'react-router-dom'

import Section from '../shared/Section'
import { OrganizationPropType } from '../../propTypes'
import { useOrganizationContext } from '../../OrganizationContext'

import style from './decentralized-app.module.scss'
import ChangeCodeFooter from './ChangeCodeFooter'
import CodeFooter from './CodeFooter'

function DecentralizedApplication({ organization }) {
  const { isEditMode } = useOrganizationContext()
  const location = useLocation()

  const links = [
    {
      label: 'View',
      to: `${location?.pathname}/defi/token`,
    },
    {
      label: '💎 Etherscan',
      href: `//ropsten.etherscan.io/token/${organization?.walletAddress}`,
    },
    {
      label: '🦄 Info',
      href: `//info.uniswap.org/token/${organization?.walletAddress}`,
    },
    {
      label: '🦄 Swap',
      href: `//app.uniswap.org/#/swap?inputCurrency=${organization?.walletAddress}&outputCurrency={1}`,
    },
    {
      label: '🐧 Swap',
      href: `//penguinswap.eth.link/#/swap?inputCurrency=${organization?.walletAddress}&outputCurrency={1}`,
    },
  ]

  const [CardFooter, setCardFooter] = useState()

  const openCodeFooter = () =>
    setCardFooter((s) =>
      s === ChangeCodeFooter || s === undefined ? CodeFooter : undefined
    )

  const openChangeCodeFooter = () =>
    setCardFooter((s) =>
      s === CodeFooter || s === undefined ? ChangeCodeFooter : undefined
    )

  return (
    <Card
      className={style.root}
      footerClassName={CardFooter === CodeFooter ? style.codeFooter : undefined}
      Footer={CardFooter && <CardFooter organization={organization} />}>
      <Typography
        variant="h2"
        color="primary"
        fontFamily="secondary"
        className={style.cardTitle}>
        Decentralized application
      </Typography>
      <div style={{ display: 'flex' }}>
        <div className={style.description}>
          <Typography variant="h5">
            <span aria-label="man with raising hand" role="img">
              🙋
            </span>{' '}
            Voting Token
          </Typography>

          <Typography variant="body2" className={style.descriptionText}>
            Ticker: <strong>{organization?.symbol || 'N/A'}</strong>
            <br />
            Name: <strong>{organization?.name || 'N/A'}</strong>
            {/* TODO format totalSupply big number according to organization.decimals */}
            <br /> Supply: <strong>{organization?.totalSupply || 'N/A'}</strong>
          </Typography>

          <div className={style.categoryWrapper}>
            {links.map(({ href, label, to }, i) => {
              return (
                <Link key={i} href={href} to={to} external>
                  <Chip
                    color="secondary"
                    className={style.chip}
                    size="small"
                    label={label}
                  />
                </Link>
              )
            })}
          </div>
        </div>
        <div className={style.content}>
          <Section category="🤖 Core:">
            <Link
              href={`//ropsten.etherscan.io/address/${organization?.walletAddress}`}
              external>
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
          <Section category="🔮 ENS:">
            <Link href={organization?.ensComplete} external>
              {organization?.ensComplete}
            </Link>
          </Section>
          <Section category="🛠 DFO Link:">
            <Link to="/list">
              <Chip className={style.chip} size="small" label="View" />
            </Link>
          </Section>
          <Section category="👨🏻‍💻 Wallet:" column>
            <Link to={`${location?.pathname}/defi/wallet`}>
              <Chip className={style.chip} size="small" label="View" />
            </Link>
            <Link
              href={`ropsten.etherscan.io/tokenHoldings?a=${organization?.walletAddress}`}
              external>
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
          <Section category="📲 Front-end:">
            <Button
              className={style.chip}
              size="small"
              text="Code"
              onClick={openCodeFooter}
            />

            {isEditMode && (
              <Button
                size="small"
                text="Change"
                onClick={openChangeCodeFooter}
              />
            )}
          </Section>
          <Section category="🛠 Functions" column>
            <Typography variant="h5">
              {organization?.functionalitiesAmount}
            </Typography>
            <Link to={`${location?.pathname}/dapp/functions`}>
              <Chip className={style.chip} size="small" label="View" />
            </Link>
          </Section>
        </div>
      </div>
    </Card>
  )
}

export default DecentralizedApplication

DecentralizedApplication.propTypes = {
  organization: OrganizationPropType,
}
