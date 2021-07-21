import * as Yup from 'yup'

const minimumBlockNumberForEmergencySurvey = (organization, context) => ({
  id: 'minimumBlockNumberForEmergencySurvey',
  type: 'em',
  title: 'Length',
  value: organization.minimumBlockNumberForEmergencySurvey,
  percentage: null,
  unit: 'Blocks',
  description: 'The duration of an Emergency Proposal',
  inputLabel: 'Emergency Length',

  validator: Yup.number()
    .min(1, 'Length has to be minimum 1')
    .required("Length can't be empty"),

  getDescriptions: () => ['Emergency Survey Length'],
  getUpdates: () => [
    'Emergency Survey Length updated to %(minimumBlockNumberForEmergencySurvey)s blocks',
  ],

  getTemplate: (minimumBlockNumberForEmergencySurvey) =>
    JSON.parse(
      JSON.stringify(context.simpleValueProposalTemplate)
        .split('getValue()')
        .join('getMinimumBlockNumberForEmergencySurvey()')
        .split('type')
        .join('uint256')
        .split('value')
        .join(minimumBlockNumberForEmergencySurvey)
    ),

  getProposalInitialValues: () => ({
    title: 'Updating Emergency Proposal Length',
    functionalityName: 'getMinimumBlockNumberForEmergencySurvey',
    functionalitySubmitable: false,
    functionalityMethodSignature: 'getMinimumBlockNumberForEmergencySurvey()',
    functionalityReplace: 'getMinimumBlockNumberForEmergencySurvey',
    functionalityOutputParameters: '["uint256"]',
  }),
})

export default minimumBlockNumberForEmergencySurvey
