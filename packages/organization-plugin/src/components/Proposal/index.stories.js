import React from 'react'
import { HashRouter } from 'react-router-dom'

import Proposal from '.'

const item = {
  title: 'Example/Proposal',
  component: Proposal,
}

const results = [
  {
    address: '0xa84c4D056DE9d49C5363d42010A980a657812F97',
    code: 'testCode',
    codeName: 'getMinimumBlockNumberForSurvey',
    replaces: 'replacesExample',
    description:
      'Survey Length updated to 35 blocks<br><br><b>Description</b>:<br>Survey Length<a class="ComEXTLink" href="//dfohub.eth" target="_blank"><b>Discussion Link</b></a><br><br><br><br>',
    checkedTimes: 0,
    endBlock: '10670183',
    leading: false,
    location: '0x49e430a3ae0ecbd7c7e63fa658044fb5db1b4b49',
    replacesCode: 'testCode',
    surveyEnd: true,
  },
  {
    allVotes: 10,
    checkedTimes: 1,
    codeName: 'One Time',
    description:
      'Fixed Inflation Management Functionality<a class="ComEXTLink" href="//discord.gg/34we8bh" target="_blank"><b>Discussion Link</b></a><br><br><br><br>',
    leading: false,
    myVotes: 0,
    replaces: 'replacExample',
    result: true,
    resultBlock: '9745801',
  },
  {
    codeName: 'getMetadataLink',
    replaces: 'replacesExample',
    description:
      'Setting metadata link to http://gateway.ipfs.io/ipfs/Qmcu59PwH9yEpGUKCMDxR3bm35kQPQfggfvKRJxPRwFGJG<br><br><b>Description</b>:<br>DFO Hub - Utilities - Get Metadata Link<br>The metadata located at this link contains all info about the DFO like name, short description, discussion link and many other info.<br>Setting metadata link to http://gateway.ipfs.io/ipfs/Qmcu59PwH9yEpGUKCMDxR3bm35kQPQfggfvKRJxPRwFGJG<br><br>',
  },
]

export const SampleActiveProposal = () => {
  return (
    <HashRouter>
      <Proposal organization={{}} survey={results[0]} />
    </HashRouter>
  )
}
export const SampleProposalHistory = () => {
  return (
    <HashRouter>
      <Proposal organization={{}} survey={results[1]} />
    </HashRouter>
  )
}
export const SampleTooLongDescription = () => {
  return (
    <HashRouter>
      <Proposal organization={{}} survey={results[2]} />
    </HashRouter>
  )
}

export default item
