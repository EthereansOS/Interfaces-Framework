import React from 'react'
import { EditField } from '@ethereansos/interfaces-ui'
import { Typography } from '@ethereansos/interfaces-ui'
import classNames from 'classnames'
import T from 'prop-types'

import style from './step.module.scss'

const NewGovernanceRules = ({ values }) => {
  return (
    <div className={classNames(style.content, style.contentStartAlign)}>
      <div className={style.description}>
        <Typography variant="h5">3 of 4 | Governance</Typography>
        <Typography variant="body1">
          Its time to choose the Governance Rules! All Governance Rules can be
          changed anytime via proposals.
        </Typography>
      </div>
      <div className={style.form}>
        <Typography variant="body1" weight="bold" className={style.label}>
          Basic Governance Rules
        </Typography>
        <EditField
          id="surveyLength"
          name="surveyLength"
          label="Survey Length"
          description="Every survey has a length expressed in Blocks. Here you can set the duration of Surveys for this DFO."
          RightInputComponent={<Typography variant="body2">Blocks</Typography>}
          type="number"
        />
        <EditField
          id="surveyMinStake"
          name="surveyMinStake"
          label="Min Staking"
          description="The minimum of Token Staked needed to create a new Proposal."
          RightInputComponent={
            <Typography variant="body2">
              {values.symbol} to Propose Updates
            </Typography>
          }
        />
        <EditField
          id="surveyCommunityStake"
          name="surveyCommunityStake"
          label="DFO Locked Supply"
          description="The amount of Voting Tokens locked in the DFO wallet (For Fixed Inflation, Liquidity Mining, Rewards and other Community Features)."
          RightInputComponent={
            <Typography variant="body2">{values.symbol}</Typography>
          }
        />

        <Typography variant="body1" weight="bold" className={style.label}>
          Advanced Governance Rules
        </Typography>
        <EditField
          id="surveyQuorum"
          name="surveyQuorum"
          label="Survey Quorum"
          description="123The Quorum is minimum token Staken by voters in a survey to reach the success status."
          RightInputComponent={
            <Typography variant="body2">{values.symbol}</Typography>
          }
        />
        <EditField
          id="surveyMaxCap"
          name="surveyMaxCap"
          label="Max Cap"
          description="123Reaching the Max Cap, the proposal passes independently from the Survey Lenght."
          RightInputComponent={
            <Typography variant="body2">{values.symbol}</Typography>
          }
        />
        <EditField
          id="surveySingleReward"
          name="surveySingleReward"
          label="Activity Reward"
          description="The amount of Voting Tokens set as a reward to the issuer for every Accepted Proposal paid automatically by the DFO Wallet."
          RightInputComponent={
            <Typography variant="body2">
              {values.symbol} of staked tokens
            </Typography>
          }
        />
        <Typography variant="body1" weight="bold" className={style.label}>
          Emergency Governance Rules
        </Typography>
        <EditField
          id="emergencySurveyLength"
          name="emergencySurveyLength"
          label="Emergency Length"
          description="Emergency Proposals are designed as a Faster Proposal System for bug fixing. To ensure that users have economic disincentives to use it to fraud the community, we advise setting a High Penalty Fee, because if the Proposal Fails, the Proposer will lose it."
          RightInputComponent={<Typography variant="body2">Blocks</Typography>}
          type="number"
        />
        <EditField
          id="emergencySurveyStaking"
          name="emergencySurveyStaking"
          label="Penalty Fee"
          description="The Fee that Emergency Proposal Issuer must stake to propose it and lost if the Proposal fails."
          RightInputComponent={
            <Typography variant="body2">{values.symbol}</Typography>
          }
          type="number"
        />
      </div>
    </div>
  )
}

export default NewGovernanceRules

NewGovernanceRules.propTypes = {
  values: T.shape({
    symbol: T.string,
  }),
}
