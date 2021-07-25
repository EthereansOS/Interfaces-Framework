import * as Yup from 'yup'
import { fromDecimals, toDecimals } from '@ethereansos/interfaces-core'

const surveySingleReward = (organization, context) => ({
  id: 'surveySingleReward',
  type: 'st',
  title: 'Proposal Reward',
  value: fromDecimals(organization.surveySingleReward, organization.decimals),
  percentage: null,
  unit: organization.symbol,
  description:
    'The number of Voting Tokens as a reward to the issuer for every single Successful Proposal.',
  inputLabel: 'Dev Incentives',

  validator: Yup.number()
    .min(0, 'You must specify a number greater or equal than 0')
    .max(
      organization.totalSupply,
      'Specified amount exceedes Total Voting Token Supply'
    )
    .required("The specified amount can't be empty"),

  getDescriptions: (value) =>
    value
      ? [
          'DFO Hub - Utilities - Get Dev Incentives',
          'This functionality provides the amount of voting tokens needed to be staked to make a new proposal',
        ]
      : ['Clearing Dev Incentive'],

  getUpdates: () => [
    `Setting Dev Incentives value to %(surveySingleReward)s ${organization.symbol}`,
  ],

  getTemplate: (surveySingleReward) =>
    parseInt(toDecimals(surveySingleReward, organization.decimals))
      ? JSON.parse(
          JSON.stringify(context.simpleValueProposalTemplate)
            .split('type')
            .join('uint256')
            .split('value')
            .join(surveySingleReward)
        )
      : undefined,

  getProposalInitialValues: (surveySingleReward) => {
    surveySingleReward = parseInt(
      toDecimals(surveySingleReward, organization.decimals)
    )
    return {
      title: surveySingleReward
        ? 'DFO Hub - Utilities - Get Dev Incentives'
        : 'Clearing Dev Incentives',
      functionalityName: surveySingleReward ? 'getSurveySingleReward' : '',
      functionalityMethodSignature: surveySingleReward ? 'getValue()' : '',
      functionalitySubmitable: false,
      functionalityReplace:
        surveySingleReward === 0 || parseInt(organization.surveySingleReward)
          ? 'getSurveySingleReward'
          : '',
      functionalityOutputParameters: surveySingleReward ? '["uint256"]' : '',
    }
  },
})

export default surveySingleReward
