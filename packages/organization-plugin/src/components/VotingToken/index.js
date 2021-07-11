import React, { useEffect, useState } from 'react'
import { Card, Chip, Link, Typography } from '@dfohub/design-system'
import {
  formatLink,
  fromDecimals,
  getNetworkElement,
  useEthosContext,
  useWeb3,
  formatString,
} from '@dfohub/core'

import { OrganizationPropType } from '../../propTypes'
import loadLogo from '../../lib/loadLogo'

import style from './voting-token.module.scss'

const VotingToken = ({ organization }) => {
  const context = useEthosContext()
  const { networkId } = useWeb3()
  const [logo, setLogo] = useState()
  const etherscanTokenLink =
    getNetworkElement({ context, networkId }, 'etherscanURL') +
    'token/' +
    organization.token.options.address
  const etherscanHolderLink =
    getNetworkElement({ context, networkId }, 'etherscanURL') +
    'token/tokenholderchart/' +
    organization.token.options.address

  useEffect(() => {
    const fetchLogo = async () => {
      const res = await loadLogo(
        { context },
        organization.token.options.address
      )
      setLogo(res)
    }

    const orgLogo =
      organization.logo || organization.logoUri || organization.logoURI

    if (orgLogo) {
      setLogo(orgLogo)
    } else {
      fetchLogo()
    }
  }, [context, organization])

  return (
    <Card
      contentClassName={style.root}
      Header={
        <Typography color="primary" variant="h2">
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
        <Link
          href={`${context.uniSwapInfoURL}${organization.token.options.address}`}
          external>
          <Chip size="small" label="🦄 Info" />
        </Link>
        <Link
          href={formatString(
            context.uniSwapSwapURLTemplate,
            organization.token.options.address
          )}
          external>
          <Chip size="small" label="🦄 Swap" />
        </Link>
        <Link
          href={formatString(
            context.penSwapSwapURLTemplate,
            organization.token.options.address
          )}
          external>
          <Chip size="small" label="🐧 Swap" />
        </Link>
        <Link
          href={`${getNetworkElement(
            { context, networkId },
            'etherscanURL'
          )}token/${organization.token.options.address}`}
          external>
          <Chip size="small" label="💎 Info" />
        </Link>
        <Link
          href={`${getNetworkElement(
            { context, networkId },
            'etherscanURL'
          )}address/${organization.token.options.address}#code`}
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
