import * as Yup from 'yup'
import { fromDecimals, tokenPercentage } from '@dfohub/core'

const emergencySurveyStaking = (organization, context) => ({
  id: 'emergencySurveyStaking',
  type: 'em',
  title: 'Penalty fee',
  value: fromDecimals(
    organization.emergencySurveyStaking,
    organization.decimals
  ),
  percentage: tokenPercentage(
    organization.emergencySurveyStaking,
    organization.totalSupply
  ),
  unit: organization.symbol,
  description:
    'The Fee that Emergency Proposal Issuer must stake to propose it. This stake will be lost if the Proposal fails.',
  inputLabel: 'Emergency Penalty',

  validator: Yup.number()
    .min(0, 'You must specify a number greater or equal than 0')
    .max(
      organization.totalSupply,
      'Specified amount exceedes Total Voting Token Supply'
    )
    .required("The specified amount can't be empty"),

  getDescriptions: () => ['Emergency Survey Staking'],
  getUpdates: () => [
    `Setting quorum value to %(emergencySurveyStaking)s Voting Tokens`,
  ],

  getTemplate: (emergencySurveyStaking) =>
    JSON.parse(
      JSON.stringify(context.simpleValueProposalTemplate)
        .split('getValue()')
        .join('getEmergencySurveyStaking()')
        .split('type')
        .join('uint256')
        .split('value')
        .join(emergencySurveyStaking)
    ),

  getProposalInitialValues: () => {
    return {
      title: 'Updating Emergency Proposal Stake',
      functionalityName: 'getEmergencySurveyStaking',
      functionalitySubmitable: false,
      functionalityMethodSignature: 'getEmergencySurveyStaking()',
      functionalityReplace: 'getEmergencySurveyStaking',
      functionalityOutputParameters: '["uint256"]',
    }
  },
})

export default emergencySurveyStaking
