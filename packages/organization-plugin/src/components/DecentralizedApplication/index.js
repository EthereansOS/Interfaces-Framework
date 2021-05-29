import React from 'react'
import T from 'prop-types'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'

import Section from '../shared/Section'

import style from './decentralized-app.module.scss'

function DecentralizedApplication({ ticker, name, supply, links }) {
  return (
    <Card as="article">
      <Typography variant="h2" color="primary" className={style.cardTitle}>
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

          <Typography variant="body2">
            Ticker: <strong>{ticker || 'N/A'}</strong>
          </Typography>
          <Typography variant="body2">
            Name: <strong>{name || 'N/A'}</strong>
          </Typography>
          <Typography variant="body2">
            Supply: <strong>{supply || 'N/A'}</strong>
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
            <Link to="/list">
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
          <Section category="🔮 ENS:">
            <Link href="dfohub.eth">dfohub.eth</Link>
          </Section>
          <Section category="🛠 DFO Link:">
            <Link to="/list">
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
          <Section category="👨🏻‍💻 Wallet:">
            <Link to="/list">
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
          <Section category="📲 Front-end:">
            <Link to="/list">
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
          <Section category="🛠 Functions:">
            <Link to="/list">
              <Chip className={style.chip} size="small" label="💎 Etherscan" />
            </Link>
          </Section>
        </div>
      </div>
    </Card>
  )
}

export default DecentralizedApplication

DecentralizedApplication.propTypes = {
  ticker: T.string,
  name: T.string,
  supply: T.string,
  links: T.arrayOf(
    T.shape({
      label: T.string.isRequired,
      href: T.string,
      to: T.string,
    })
  ),
}

DecentralizedApplication.defaultProps = {
  links: [],
}
