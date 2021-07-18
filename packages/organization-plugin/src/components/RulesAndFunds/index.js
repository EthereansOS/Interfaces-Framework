import React, { useEffect, useState } from 'react'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'
import {
  blockchainCall,
  fromDecimals,
  tokenPercentage,
  useEthosContext,
  useWeb3,
} from '@dfohub/core'
import { useLocation } from 'react-router-dom'

import Section from '../shared/Section'
import { OrganizationPropType } from '../../propTypes'
import useOrganizations from '../../hooks/useOrganizations'

import style from './rules-and-funds.module.scss'

function RulesAndFunds({ organization }) {
  const { web3 } = useWeb3()
  const context = useEthosContext()
  const location = useLocation()
  const { dfoHub } = useOrganizations()

  const [blocks, setBlocks] = useState()
  const [inflationStatus, setInflationStatus] = useState()
  const [liquidityStatus, setLiquidityStatus] = useState()

  useEffect(() => {
    const fetchBlocks = async () => {
      const blocksCall = await blockchainCall(
        { web3, context },
        organization.dFO.methods.read,
        'getMinimumBlockNumberForSurvey',
        '0x'
      )

      setBlocks(web3.eth.abi.decodeParameters(['uint256'], blocksCall)[0])
    }

    fetchBlocks()
  }, [context, organization.dFO.methods.read, web3])

  useEffect(() => {
    const fetchInflationAndLiquidityStatus = async () => {
      const inflation = await blockchainCall(
        { web3, context },
        organization.stateHolder.methods.getUint256,
        'fixedInflation.transfers.length'
      )
      let liquidity = 'Loading'

      try {
        let json = await blockchainCall(
          { web3, context },
          organization.stateHolder.methods.toJSON
        )

        json = JSON.parse(
          json.endsWith(',]')
            ? json.substring(0, json.lastIndexOf(',]')) + ']'
            : json
        )
        for (let i in json) {
          const element = json[i]
          const methodName =
            'get' +
            element.type.substring(0, 1).toUpperCase() +
            element.type.substring(1)
          element.value = await blockchainCall(
            { web3, context },
            organization.stateHolder.methods[methodName],
            element.name
          )
          if (
            element.name.indexOf('staking.transfer.authorized.') === 0 &&
            element.value
          ) {
            liquidity = 'Active'
          }

          if (inflation === 'Active' && liquidity === 'Active') {
            break
          }
        }
      } catch (e) {
        console.log('error fetching liquidity', e)
      }

      setInflationStatus(inflation > 0 ? 'Active' : 'Not set')
      setLiquidityStatus(liquidity)
    }

    if (organization?.stateHolder) {
      fetchInflationAndLiquidityStatus()
    }
  }, [context, organization.stateHolder, web3])

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
            <strong>
              {tokenPercentage(
                organization?.communityTokens,
                organization?.totalSupply
              )}
            </strong>{' '}
            (
            <strong>
              {fromDecimals(
                organization?.communityTokens,
                organization?.decimals
              )}
            </strong>{' '}
            {organization?.symbol})
            <br /> <strong>
              {fromDecimals(organization?.walletETH, 18)}
            </strong>{' '}
            ETH
            <br />
            <strong>{fromDecimals(organization?.walletUSDC, 6)}</strong> USDC
            <br />
            <strong>{fromDecimals(organization?.walletDAI, 18)}</strong> DAI
            {organization.key !== 'DFO' && (
              <>
                <br />
                <strong>
                  {fromDecimals(organization?.walletBUIDL, dfoHub?.decimals)}
                </strong>{' '}
                BUIDL
              </>
            )}
          </Typography>
          <Link to={`${location?.pathname}/defi/wallet`}>
            <Chip className={style.chip} size="small" label="View all" />
          </Link>
        </Section>
        <Section column category="🖨 Fixed Inflation:">
          {inflationStatus && (
            <Typography variant="body2">{inflationStatus}</Typography>
          )}
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
        <Section column category="🦄 Liquidity Mining:">
          {liquidityStatus && (
            <Typography variant="body2">{liquidityStatus}</Typography>
          )}
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
