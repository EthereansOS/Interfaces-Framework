import proposalLength from './proposals/proposalLength'
import quorum from './proposals/quorum'
import minimumStacking from './proposals/minimumStacking'
import surveySingleReward from './proposals/surveySingleReward'
import votesHardCap from './proposals/votesHardCap'
import minimumBlockNumberForEmergencySurvey from './proposals/minimumBlockNumberForEmergencySurvey'
import emergencySurveyStaking from './proposals/emergencySurveyStaking'

const getProposals = (organization, context) => [
  proposalLength(organization, context),
  quorum(organization, context),
  minimumStacking(organization, context),
  votesHardCap(organization, context),
  surveySingleReward(organization, context),
  minimumBlockNumberForEmergencySurvey(organization, context),
  emergencySurveyStaking(organization, context),
]

export default getProposals
