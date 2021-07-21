import * as Yup from 'yup'

const proposalLength = (organization, context) => ({
  id: 'proposalLength',
  type: 'st',
  title: 'Length',
  value: organization.blocks,
  percentage: null,
  unit: 'Blocks',
  description: 'The duration of a Proposal',
  inputLabel: 'Proposal Length',

  validator: Yup.number()
    .min(1, 'Length has to be minimum 1')
    .required("Length can't be empty"),

  getDescriptions: () => ['Survey Length'],
  getUpdates: () => ['Survey Length updated to %(proposalLength)s blocks'],

  getTemplate: (proposalLength) =>
    JSON.parse(
      JSON.stringify(context.simpleValueProposalTemplate)
        .split('getValue()')
        .join('getMinimumBlockNumberForSurvey()')
        .split('type')
        .join('uint256')
        .split('value')
        .join(proposalLength)
    ),

  getProposalInitialValues: () => ({
    functionalityName: 'getMinimumBlockNumberForSurvey',
    functionalitySubmitable: false,
    functionalityMethodSignature: 'getMinimumBlockNumberForSurvey()',
    functionalityReplace: 'getMinimumBlockNumberForSurvey',
    functionalityOutputParameters: '["uint256"]',
  }),
})

export default proposalLength
