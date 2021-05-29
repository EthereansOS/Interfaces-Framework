import React from 'react'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'

import Section from '../shared/Section'

import style from './rules-and-funds.module.scss'

function RulesAndFunds() {
  return (
    <Card as="article">
      <Typography variant="h2" color="primary" className={style.cardTitle}>
        Rules and funds
      </Typography>

      <div className={style.content}>
        <Section category="🏰 Regular Proposals:">
          <Link to="/list">
            <Chip className={style.chip} size="small" label="💎 Etherscan" />
          </Link>
        </Section>
        <Section category="🧮 Assets:">
          <Link href="dfohub.eth">dfohub.eth</Link>
        </Section>
        <Section category="🖨 Fixed Inflation:">
          <Link to="/list">
            <Chip className={style.chip} size="small" label="💎 Etherscan" />
          </Link>
        </Section>
        <Section category="🚨 Emergency Proposals:">
          <div>
            <Typography variant="body2">
              Length: <strong>19</strong> Blocks
            </Typography>
            <Link to="/list">
              <Chip className={style.chip} size="small" label="View all" />
            </Link>
          </div>
        </Section>
        <Section category="🦄 Liquidity Mining:">
          <Link to="/list">
            <Chip className={style.chip} size="small" label="💎 Etherscan" />
          </Link>
        </Section>
      </div>
    </Card>
  )
}

export default RulesAndFunds

RulesAndFunds.propTypes = {}
