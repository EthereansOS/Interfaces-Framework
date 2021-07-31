import React, { useState } from 'react'
import T from 'prop-types'
import { Card, Typography } from '@ethereansos/interfaces-ui'

import { OrganizationPropType } from '../../propTypes'
import Section from '../shared/Section'
import Link from '../shared/Link'

import { ProposalPropTypes } from './propTypes'
import style from './proposal.module.scss'
import ProposalRunning from './ProposalRunning'
import ProposalTerminated from './ProposalTerminated'

function Proposal(props) {
  const { survey } = props

  const etherscanURL = props.etherscanURL

  const symbol = 'buidl'
  const descriptionMaxLength = 300
  const description = survey.description || ''
  const length =
    description.length > descriptionMaxLength
      ? descriptionMaxLength
      : description.length

  const [isMore, setIsMore] = useState(length < description.length)

  const toggleIsMore = (e) => {
    e.preventDefault()
    setIsMore(!isMore)
  }

  const handleCode = (e) => {
    props.loadProposalCode(survey)
  }

  let percAccepted = (parseInt(survey.accepted) / survey.allVotes) * 100
  percAccepted = (isNaN(percAccepted) ? 0 : percAccepted) + '%'
  let percRefused = (parseInt(survey.refused) / survey.allVotes) * 100
  percRefused = (isNaN(percRefused) ? 0 : percRefused) + '%'

  return (
    <Card contentClassName={style.cardContent}>
      <Section
        category={
          <span className={style.title}>
            <strong>
              {survey.emergency && (
                <span role="img" aria-label="emergency">
                  &#x1F6A8;{'\u00a0'}
                </span>
              )}
              {!survey.codeName
                ? !survey.replaces
                  ? 'One Time'
                  : 'Kill'
                : survey.replaces
                ? 'Edit'
                : 'Add New'}
              {(survey.codeName || survey.replaces) && [
                <span> | </span>,
                <span>{survey.codeName || survey.replaces}</span>,
              ]}
            </strong>
          </span>
        }
        className={style.bioSection}>
        <div className={style.content}>
          <Typography variant="body1">
            <span
              dangerouslySetInnerHTML={{
                __html: description.substring(
                  0,
                  isMore ? length : description.length
                ),
              }}
              className={style.contentDescription}
            />
            {length < description.length && (
              <>
                {isMore ? '... ' : ' '}
                <Link
                  href="."
                  onClick={toggleIsMore}
                  rel="noreferrer"
                  className={style.moreLink}>
                  {isMore ? 'More' : 'Less'}
                </Link>
              </>
            )}
          </Typography>
        </div>
      </Section>
      <Section>
        {survey.checkedTimes > 0 ? (
          <ProposalTerminated
            {...props}
            percAccepted={percAccepted}
            percRefused={percRefused}
            etherscanURL={etherscanURL}
            symbol={symbol}
            handleCode={handleCode}
          />
        ) : (
          <ProposalRunning
            {...props}
            percAccepted={percAccepted}
            percRefused={percRefused}
            etherscanURL={etherscanURL}
            symbol={symbol}
            handleCode={handleCode}
            finalizeProposal={props.finalizeProposal}
          />
        )}
      </Section>
    </Card>
  )
}

export default Proposal

Proposal.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  loadProposalCode: T.func.isRequired,
  finalizeProposal: T.func.isRequired,
  etherscanURL: T.string.isRequired,
}
