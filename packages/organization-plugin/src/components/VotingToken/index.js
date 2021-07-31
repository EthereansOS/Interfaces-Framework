import React, { useEffect, useState } from 'react'
import { Card, Chip, Typography } from '@ethereansos/interfaces-ui'
import {
  formatLink,
  fromDecimals,
  getNetworkElement,
  useEthosContext,
  useWeb3,
  formatString,
} from '@ethereansos/interfaces-core'

import { OrganizationPropType } from '../../propTypes'
import loadLogo from '../../lib/loadLogo'
import Link from '../shared/Link'

import style from './voting-token.module.scss'

const VotingToken = ({ organization }) => {
  const context = useEthosContext()
  const { networkId } = useWeb3()
  const [logo, setLogo] = useState()
  const tokenOptionsAddress = organization?.token?.options?.address

  const etherscanTokenLink =
    getNetworkElement({ context, networkId }, 'etherscanURL') +
    'token/' +
    tokenOptionsAddress
  const etherscanHolderLink =
    getNetworkElement({ context, networkId }, 'etherscanURL') +
    'token/tokenholderchart/' +
    tokenOptionsAddress

  useEffect(() => {
    const fetchLogo = async () => {
      const res = await loadLogo({ context }, tokenOptionsAddress)
      setLogo(res)
    }

    const orgLogo =
      organization.logo || organization.logoUri || organization.logoURI

    if (orgLogo) {
      setLogo(orgLogo)
    } else {
      fetchLogo()
    }
  }, [context, organization, tokenOptionsAddress])

  return (
    <Card
      contentClassName={style.root}
      Header={
        <Typography color="primary" variant="h2" fontFamily="secondary">
          Voting Token
        </Typography>
      }>
      <article>
        <img
          src={
            organization.logoUri
              ? formatLink({ context }, organization.logoUri)
              : logo
          }
          alt="logo"
        />
      </article>
      <article>
        <Typography variant="body1">
          Name:{' '}
          {organization.name && (
            <Link href={etherscanTokenLink} external>
              {organization.name}
            </Link>
          )}
        </Typography>
        <Typography variant="body1">
          Ticker:{' '}
          {organization.symbol && (
            <Link href={etherscanTokenLink} external>
              {organization.symbol}
            </Link>
          )}
        </Typography>
      </article>
      <article>
        <Typography variant="body1">Voting Power: +1</Typography>
      </article>
      <article>
        <Typography variant="body1">
          Existing Supply:{' '}
          {organization.totalSupply && organization.symbol && (
            <Link href={etherscanHolderLink} external>
              {fromDecimals(organization.totalSupply, organization.decimals)}
            </Link>
          )}
        </Typography>
        <Typography variant="body1">
          DFO Wallet Supply:
          {organization.balanceOf && organization.symbol && (
            <Link href={etherscanHolderLink} external>
              {fromDecimals(
                organization.communityTokens,
                organization.decimals
              )}
            </Link>
          )}
        </Typography>
      </article>
      <article className={style.linksContainer}>
        <Link href={`${context.uniSwapInfoURL}${tokenOptionsAddress}`} external>
          <Chip size="small" label="🦄 Info" />
        </Link>
        <Link
          href={formatString(
            context.uniSwapSwapURLTemplate,
            tokenOptionsAddress
          )}
          external>
          <Chip size="small" label="🦄 Swap" />
        </Link>
        <Link
          href={formatString(
            context.penSwapSwapURLTemplate,
            tokenOptionsAddress
          )}
          external>
          <Chip size="small" label="🐧 Swap" />
        </Link>
        <Link
          href={`${getNetworkElement(
            { context, networkId },
            'etherscanURL'
          )}token/${tokenOptionsAddress}`}
          external>
          <Chip size="small" label="💎 Info" />
        </Link>
        <Link
          href={`${getNetworkElement(
            { context, networkId },
            'etherscanURL'
          )}address/${tokenOptionsAddress}#code`}
          external>
          <Chip size="small" label="💎 Contract" />
        </Link>
      </article>
    </Card>
  )
}

export default VotingToken

VotingToken.propTypes = {
  organization: OrganizationPropType,
}
