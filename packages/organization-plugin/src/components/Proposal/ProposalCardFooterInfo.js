import React from 'react'
import { Typography } from '@ethereansos/interfaces-ui'
import T from 'prop-types'

import Section from '../shared/Section'

import { ProposalPropTypes } from './propTypes'
import style from './proposal-card-footer-info.module.scss'

function ProposalCardFooterInfo({ survey, percAccepted, percRefused, unit }) {
  return (
    <Section category={<strong>Results by Token:</strong>}>
      <div className={style.content}>
        <div>
          <span role="img" aria-label="accepted">
            &#9989;
          </span>
        </div>
        <div
          className={style.progressbarAccepted}
          style={{ width: percAccepted }}>
          <span>
            <strong>{percAccepted}</strong>
          </span>
        </div>
        <div></div>
        <Typography variant="body2">
          {survey.accepted} {unit}
        </Typography>
        <div>
          <span role="img" aria-label="refused">
            &#9940;
          </span>
        </div>
        <div
          className={style.progressbarRefused}
          style={{ width: percRefused }}>
          <span>
            <strong>{percRefused}</strong>
          </span>
        </div>
        <div></div>
        <Typography variant="body2">
          {survey.refused} {unit}
        </Typography>
      </div>
    </Section>
  )
}

export default ProposalCardFooterInfo

ProposalCardFooterInfo.propTypes = {
  survey: ProposalPropTypes,
  percAccepted: T.string.isRequired,
  percRefused: T.string.isRequired,
  unit: T.string,
}
