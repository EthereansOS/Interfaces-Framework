import React, { useEffect, useState } from 'react'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'
import {
  blockchainCall,
  tokenPercentage,
  useEthosContext,
  useWeb3,
} from '@dfohub/core'
import { useLocation } from 'react-router-dom'

import Section from '../shared/Section'
import { OrganizationPropType } from '../../propTypes'

import style from './rules-and-funds.module.scss'

function RulesAndFunds({ organization }) {
  const { web3 } = useWeb3()
  const context = useEthosContext()
  const [blocks, setBlocks] = useState()
  const location = useLocation()

  useEffect(() => {
    const fetchBlocks = async () => {
      const blocksCall = await blockchainCall(
        { web3, context },
        organization.dFO.methods.read,
        'getMinimumBlockNumberForSurvey',
        '0x'
      )
      console.log(blocksCall)

      setBlocks(web3.eth.abi.decodeParameters(['uint256'], blocksCall)[0])
    }

    fetchBlocks()
  }, [context, organization.dFO.methods.read, web3])

  return (
    <Card>
      <Typography
        variant="h2"
        color="primary"
        fontFamily="secondary"
        className={style.cardTitle}>
        Rules and funds
      </Typography>

      <div className={style.content}>
        <Section category="🏰 Regular Proposals:">
          <Typography variant="body2">
            Length: <strong>{blocks || 'NA'}</strong> Blocks
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
          <Link to={`${location?.pathname}/defi/wallet`}>
            <Chip className={style.chip} size="small" label="View all" />
          </Link>
        </Section>
        <Section category="🖨 Fixed Inflation:">
          {/* TODO */}
          <Link to={`${location?.pathname}/defi/farming`}>
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
            <Link to={`${location?.pathname}/governance/rules`}>
              <Chip className={style.chip} size="small" label="View all" />
            </Link>
          </div>
        </Section>
        <Section category="🦄 Liquidity Mining:">
          {/* TODO */}
          <Link to={`${location?.pathname}/defi/farming`}>
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
