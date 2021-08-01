import { Link, Typography } from '@ethereansos/interfaces-ui'
import React from 'react'
import T from 'prop-types'

import { ProposalPropTypes } from './propTypes'
import style from './proposal.module.scss'

function ProposalRightLinks({ survey, etherscanURL }) {
  return (
    <Typography variant="body2" className={style.linksContainer}>
      <Link
        className={style.link}
        href={etherscanURL + 'address/' + survey.address}
        external>
        Proposal
      </Link>{' '}
      <Link
        className={style.link}
        href={etherscanURL + 'address/' + survey.location}
        external>
        Contract
      </Link>
    </Typography>
  )
}

export default ProposalRightLinks

ProposalRightLinks.propTypes = {
  survey: ProposalPropTypes,
  etherscanURL: T.string,
}
