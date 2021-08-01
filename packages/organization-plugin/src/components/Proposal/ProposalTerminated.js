import { Button, Typography } from '@ethereansos/interfaces-ui'
import React from 'react'
import T from 'prop-types'

import { OrganizationPropType } from '../../propTypes'
import Link from '../shared/Link'

import { ProposalPropTypes } from './propTypes'
import style from './proposal.module.scss'
import Finalize from './Finalize'
import Code from './Code'
import ProposalRightLinks from './ProposalRightLinks'

function ProposalTerminated({
  organization,
  survey,
  etherscanURL,
  unit,
  handleCode,
  showCode,
  handleInfo,
  showInfo,
  handleFinalize,
}) {
  const handleWithdraw = () => {
    return
  }

  return (
    <div className={style.rightContent}>
      <Typography variant="body1" className={style.leading}>
        {(survey.result || survey.leading) && (
          <span>
            <span role="img" aria-label="accepted">
              &#9989;
            </span>{' '}
            Accepted
          </span>
        )}
        {!survey.result && !survey.leading && (
          <span>
            <span role="img" aria-label="refused">
              &#9940;
            </span>{' '}
            Refused
          </span>
        )}
      </Typography>
      <Typography variant="body1" className={style.block}>
        {!survey.resultBlock && 'Last Checked '}Block:{' '}
        <Link
          className={style.blockLink}
          href={
            etherscanURL +
            'block/' +
            (survey.resultBlock || survey.lastCheckedBlock)
          }
          external>
          {survey.resultBlock || survey.lastCheckedBlock}
        </Link>
      </Typography>
      <Typography variant="body1" className={style.totalContainer}>
        Total Votes: {survey.allVotes} {unit}
      </Typography>
      {!survey.withdrawed && (
        <Typography variant="body1" className={style.totalContainer}>
          To Withdraw: {survey.myVotes} {unit}
        </Typography>
      )}
      <div className={style.spaceContainer} />
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
        !survey.terminationData && (
          <Finalize survey={survey} handleFinalize={handleFinalize} />
        )}
      <div className={style.buttonsContainer}>
        <Button
          size="small"
          text="Info"
          value={survey.key}
          onClick={handleInfo}
          color={showInfo ? 'primary' : 'tertiary'}
          className={style.leftButton}
        />
        {(survey.code || survey.replacesCode) && (
          <Code survey={survey} handleCode={handleCode} showCode={showCode} />
        )}
      </div>
      <ProposalRightLinks survey={survey} etherscanURL={etherscanURL} />
    </div>
  )
}

export default ProposalTerminated

ProposalTerminated.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  handleFinalize: T.func.isRequired,
  etherscanURL: T.string,
  unit: T.string,
  handleCode: T.func,
  showCode: T.bool,
  handleInfo: T.func,
  showInfo: T.bool,
}
