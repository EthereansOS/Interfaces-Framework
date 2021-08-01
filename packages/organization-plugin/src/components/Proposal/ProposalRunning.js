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

function ProposalRunning({
  organization,
  survey,
  etherscanURL,
  unit,
  handleCode,
  showCode,
  handleFinalize,
}) {
  const handleVote = (e) => {
    return
  }

  return (
    <div className={style.rightContent}>
      <Typography variant="body1" className={style.leading}>
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
      <Typography variant="body1" className={style.block}>
        End Block:{' '}
        <Link
          className={style.blockLink}
          href={etherscanURL + 'block/' + survey.endBlock}
          external>
          {survey.endBlock}
        </Link>
      </Typography>
      <div className={style.buttonsContainer}>
        {!survey.surveyEnd && (
          <div>
            <Button
              size="small"
              text="Vote"
              value={survey.key}
              onClick={handleVote}
              color={'tertiary'}
              className={style.leftButton}
            />
          </div>
        )}
        {(survey.code || survey.replacesCode) && (
          <Code survey={survey} handleCode={handleCode} showCode={showCode} />
        )}
      </div>
      <div className={style.spaceContainer} />
      <ProposalRightLinks survey={survey} etherscanURL={etherscanURL} />
      {survey.surveyEnd && !survey.terminated && (
        <Finalize survey={survey} handleFinalize={handleFinalize} />
      )}
    </div>
  )
}

export default ProposalRunning

ProposalRunning.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  handleFinalize: T.func.isRequired,
  etherscanURL: T.string,
  unit: T.string,
  handleCode: T.func,
  showCode: T.bool,
}
