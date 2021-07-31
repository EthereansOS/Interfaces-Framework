import { Button, Typography } from '@ethereansos/interfaces-ui'
import React from 'react'
import T from 'prop-types'

import { OrganizationPropType } from '../../propTypes'
import Link from '../shared/Link'

import { ProposalPropTypes } from './propTypes'
import Finalize from './Finalize'

function ProposalTerminated({
  organization,
  survey,
  percAccepted,
  percRefused,
  etherscanURL,
  symbol,
  handleCode,
}) {
  const handleWithdraw = (e) => {
    return
  }

  const handleInfo = (e) => {
    return
  }

  return (
    <div>
      <Typography variant="h6">
        {(survey.result || survey.leading) && (
          <span role="img" aria-label="accepted">
            &#9989; Accepted
          </span>
        )}
        {!survey.result && !survey.leading && (
          <span role="img" aria-label="refused">
            &#9940; Refused
          </span>
        )}
      </Typography>
      <Typography variant="body1">
        {!survey.resultBlock && 'Last Checked '}Block:{' '}
        <Link
          href={
            etherscanURL +
            'block/' +
            (survey.resultBlock || survey.lastCheckedBlock)
          }
          external>
          {survey.resultBlock || survey.lastCheckedBlock}
        </Link>
      </Typography>
      <Typography variant="body1">
        Total Votes: {survey.allVotes} {symbol}
      </Typography>
      {!survey.withdrawed && (
        <Typography variant="body1">
          To Withdraw: {survey.myVotes} {symbol}
        </Typography>
      )}
      {survey.terminationData && parseInt(survey.myVotes) > 0 && (
        <Button
          size="small"
          text="Withdraw All"
          value={survey.key}
          onClick={handleWithdraw}
          color={'tertiary'}
        />
      )}
      {(survey.surveyEnd || survey.hardCapReached) &&
        !survey.terminationData && <Finalize key={survey.key} />}
      <Button
        size="small"
        text="Info"
        value={survey.key}
        onClick={handleInfo}
        color={'tertiary'}
      />
      {(survey.code || survey.replacesCode) && (
        <Button
          size="small"
          text="Code"
          value={survey.key}
          onClick={handleCode}
          color={'tertiary'}
        />
      )}
    </div>
  )
}

export default ProposalTerminated

ProposalTerminated.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  percAccepted: T.string,
  percRefused: T.string,
  etherscanURL: T.string,
  symbol: T.string,
  handleCode: T.func,
}
