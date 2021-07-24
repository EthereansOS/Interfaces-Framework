import { Button, Link, Typography } from '@dfohub/design-system'
import React from 'react'
import T from 'prop-types'

import { OrganizationPropType } from '../../propTypes'

import { ProposalPropTypes } from './propTypes'
import Finalize from './Finalize'

function ProposalRunning({
  organization,
  survey,
  percAccepted,
  percRefused,
  etherscanURL,
  symbol,
  handleCode,
}) {
  const handleVote = (e) => {
    return
  }

  return (
    <div>
      <Typography variant="body1">
        Leading:{' '}
        {survey.leading && (
          <span role="img" aria-label="leading">
            &#9989;
          </span>
        )}
        {!survey.leading && (
          <span role="img" aria-label="not leading">
            &#9940;
          </span>
        )}
      </Typography>
      <Typography variant="body1">
        End Block:{' '}
        <Link href={etherscanURL + 'block/' + survey.endBlock} external>
          {survey.endBlock}
        </Link>
      </Typography>
      {!survey.surveyEnd && (
        <div>
          <Button
            size="small"
            text="Vote"
            value={survey.key}
            onClick={handleVote}
            color={'tertiary'}
          />
        </div>
      )}
      {(survey.code || survey.replacesCode) && (
        <div>
          <Button
            size="small"
            text="Code"
            value={survey.key}
            onClick={handleCode}
            color={'tertiary'}
          />
        </div>
      )}
      <br />
      <br />
      <Link href={etherscanURL + 'address/' + survey.address} external>
        Proposal
      </Link>{' '}
      <Link href={etherscanURL + 'address/' + survey.location} external>
        Contract
      </Link>
      {survey.surveyEnd && !survey.terminated && <Finalize key={survey.key} />}
    </div>
  )
}

export default ProposalRunning

ProposalRunning.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  percAccepted: T.string,
  percRefused: T.string,
  etherscanURL: T.string,
  symbol: T.string,
  handleCode: T.func,
}
