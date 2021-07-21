import * as Yup from 'yup'
import { fromDecimals, toDecimals, tokenPercentage } from '@dfohub/core'

const votesHardCap = (organization, context) => ({
  id: 'votesHardCap',
  type: 'st',
  title: 'Hard Cap',
  value: fromDecimals(organization.votesHardCap, organization.decimals),
  percentage: tokenPercentage(
    organization.votesHardCap,
    organization.totalSupply
  ),
  unit: organization.symbol,
  description:
    'If a proposal reaches a fixed number of voting tokens (example the 90% of the total Token supply) for “Approve” or “Disapprove” it, the proposal automatically ends, independently from the duration rule.',
  inputLabel: 'Hard Cap',

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
          'DFO Hub - Utilities - Get Votes Hard Cap',
          'If a proposal reaches a fixed number of voting tokens (example the 90% of the total Token supply) for "Approve" or "Disapprove" it, the proposal automatically ends, independently from the duration rule.',
        ]
      : ['Clearing Votes Hard Cap'],
  getUpdates: () => [
    `Setting Votes Hard Cap value to %(votesHardCap)s ${organization.symbol}`,
  ],

  getTemplate: (votesHardCap) =>
    parseInt(toDecimals(votesHardCap, organization.decimals))
      ? JSON.parse(
          JSON.stringify(context.simpleValueProposalTemplate)
            .split('getValue()')
            .join('getVotesHardCap()')
            .split('type')
            .join('uint256')
            .split('value')
            .join(toDecimals(votesHardCap, organization.decimals))
        )
      : undefined,

  getProposalInitialValues: (votesHardCap) => {
    votesHardCap = parseInt(toDecimals(votesHardCap, organization.decimals))
    return {
      title: votesHardCap
        ? 'DFO Hub - Utilities - Get Votes Hard Cap'
        : 'Clearing Votes Hard Cap',
      functionalityName: votesHardCap ? 'getMinimumStaking' : '',
      functionalityMethodSignature: votesHardCap ? 'getValue()' : '',
      functionalitySubmitable: false,
      functionalityReplace:
        votesHardCap === 0 || parseInt(organization.minimumStaking)
          ? 'getMinimumStaking'
          : '',
      functionalityOutputParameters: votesHardCap ? '["uint256"]' : '',
    }
  },
})

export default votesHardCap
