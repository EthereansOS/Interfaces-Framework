import * as Yup from 'yup'
import {
  fromDecimals,
  toDecimals,
  tokenPercentage,
} from '@ethereansos/interfaces-core'

const quorum = (organization, context) => ({
  id: 'quorum',
  type: 'st',
  title: 'Quorum',
  value: fromDecimals(organization.quorum, organization.decimals),
  percentage: tokenPercentage(organization.quorum, organization.totalSupply),
  unit: organization.symbol,
  description:
    'The minimum number of Voting Tokens staked by voters to reach the a positive result.',
  inputLabel: 'Quorum',

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
          'DFO Hub - Utilities - Get Quorum',
          'This functionality returns the quorum value needed to accept a Survey',
        ]
      : ['Clearing quorum'],

  getUpdates: () => [
    `Setting quorum value to %(quorum)s ${organization.symbol}`,
  ],

  getTemplate: (quorum) =>
    parseInt(toDecimals(quorum, organization.decimals))
      ? JSON.parse(
          JSON.stringify(context.simpleValueProposalTemplate)
            .split('type')
            .join('uint256')
            .split('value')
            .join(toDecimals(quorum, organization.decimals))
        )
      : undefined,

  getProposalInitialValues: (quorum) => {
    quorum = parseInt(toDecimals(quorum, organization.decimals))
    return {
      title: quorum ? 'DFO Hub - Utilities - Get Quorum' : 'Clearing quorum',
      functionalityName: quorum ? 'getQuorum' : '',
      functionalityMethodSignature: quorum ? 'getValue()' : '',
      functionalitySubmitable: false,
      functionalityReplace:
        quorum === 0 || parseInt(organization.quorum) ? 'getQuorum' : '',
      functionalityOutputParameters: quorum ? '["uint256"]' : '',
    }
  },
})

export default quorum
