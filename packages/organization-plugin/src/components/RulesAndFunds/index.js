import React from 'react'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'

import Section from '../shared/Section'
import { tokenPercentage } from '../../utils'
import { OrganizationPropType } from '../../propTypes'

import style from './rules-and-funds.module.scss'

function RulesAndFunds({ organization }) {
  return (
    <Card as="article">
      <Typography
        variant="h2"
        color="primary"
        fontFamily="secondary"
        className={style.cardTitle}>
        Rules and funds
      </Typography>

      <div className={style.content}>
        <Section category="🏰 Regular Proposals:">
          {/* TODO */}
          <Typography variant="body2">
            Length: <strong>NA</strong> Blocks
          </Typography>
        </Section>
        <Section category="🧮 Assets:" className={style.assets} column>
          <Typography variant="body2" className={style.assetsText}>
            {/* TODO */}
            <strong>
              {tokenPercentage(
                organization?.communityTokens,
                organization?.totalSupply
              )}
            </strong>{' '}
            (<strong>{organization?.communityTokens}</strong>{' '}
            {organization?.symbol})
            <br /> <strong>{organization?.walletETH}</strong> ETH
            <br />
            <strong>{organization?.walletUSDC}</strong> USDC
            <br />
            <strong>{organization?.walletDAI}</strong> DAI
          </Typography>
          <Link to="/defi/wallet">
            <Chip className={style.chip} size="small" label="View all" />
          </Link>
        </Section>
        <Section category="🖨 Fixed Inflation:">
          {/* TODO */}
          <Link to="/defi/farming">
            <Chip className={style.chip} size="small" label="More" />
          </Link>
        </Section>
        <Section category="🚨 Emergency Proposals:">
          <div>
            <Typography variant="body2">
              Length:{' '}
              <strong>
                {organization?.minimumBlockNumberForEmergencySurvey}
              </strong>{' '}
              Blocks
            </Typography>
            <Link to="/governance/rules">
              <Chip className={style.chip} size="small" label="View all" />
            </Link>
          </div>
        </Section>
        <Section category="🦄 Liquidity Mining:">
          {/* TODO */}
          <Link to="/defi/farming">
            <Chip className={style.chip} size="small" label="More" />
          </Link>
        </Section>
      </div>
    </Card>
  )
}

export default RulesAndFunds

RulesAndFunds.propTypes = {
  organization: OrganizationPropType,
}
