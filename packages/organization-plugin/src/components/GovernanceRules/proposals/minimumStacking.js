import * as Yup from 'yup'
import {
  fromDecimals,
  toDecimals,
  tokenPercentage,
} from '@ethereansos/interfaces-core'

const minimumStacking = (organization, context) => ({
  id: 'minimumStaking',
  type: 'st',
  title: 'Generation Stake',
  value: fromDecimals(organization.minimumStaking, organization.decimals),
  percentage: tokenPercentage(
    organization.minimumStaking,
    organization.totalSupply
  ),
  unit: organization.symbol,
  description:
    'The minimum number of Voting Tokens staked to create a Proposal.',
  inputLabel: 'Proposal Stake',

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
          'DFO Hub - Utilities - Get Proposal Stake',
          'This functionality provides the amount of voting tokens needed to be staked to make a new proposal',
        ]
      : ['Clearing Proposal Stake'],
  getUpdates: () => [
    `Setting Proposal Stake value to %(minimumStaking)s ${organization.symbol}`,
  ],

  getTemplate: (minimumStaking) =>
    parseInt(toDecimals(minimumStaking, organization.decimals))
      ? JSON.parse(
          JSON.stringify(context.simpleValueProposalTemplate)
            .split('type')
            .join('uint256')
            .split('value')
            .join(toDecimals(minimumStaking, organization.decimals))
        )
      : undefined,

  getProposalInitialValues: (minimumStaking) => {
    minimumStaking = parseInt(toDecimals(minimumStaking, organization.decimals))
    return {
      title: minimumStaking
        ? 'DFO Hub - Utilities - Get Proposal Stake'
        : 'Clearing Proposal Stake',
      functionalityName: minimumStaking ? 'getMinimumStaking' : '',
      functionalityMethodSignature: minimumStaking ? 'getValue()' : '',
      functionalitySubmitable: false,
      functionalityReplace:
        minimumStaking === 0 || parseInt(organization.minimumStaking)
          ? 'getMinimumStaking'
          : '',
      functionalityOutputParameters: minimumStaking ? '["uint256"]' : '',
    }
  },
})

export default minimumStacking
