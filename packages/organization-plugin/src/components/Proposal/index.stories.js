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
    code: `/* Description:
    * Survey Length
    */
   /* Update:
    * Survey Length updated to 36 blocks
    */
   pragma solidity ^0.7.0;
   
   contract DFOHubGeneratedProposal {
   
       string private _metadataLink;
   
       constructor(string memory metadataLink) {
           _metadataLink = metadataLink;
       }
   
       function getMetadataLink() public view returns(string memory) {
           return _metadataLink;
       }
   
       function onStart(address newSurvey, address oldSurvey) public {
       }
   
       function onStop(address newSurvey) public {
       }
   
       function getMinimumBlockNumberForSurvey() public view returns(uint256) {
           return 36;
       }
   }`,
    codeName: 'getMinimumBlockNumberForSurvey',
    replaces: 'replacesExample',
    description:
      'Survey Length updated to 35 blocks<br><br><b>Description</b>:<br>Survey Length<a class="ComEXTLink" href="//dfohub.eth" target="_blank"><b>Discussion Link</b></a><br><br><br><br>',
    checkedTimes: 0,
    endBlock: 10670183,
    leading: false,
    location: '0x49e430a3ae0ecbd7c7e63fa658044fb5db1b4b49',
    replacesCode: `/* Description:
    * Survey Length
    */
   /* Update:
    * Survey Length updated to 37 blocks
    */
   pragma solidity ^0.8.0;
   
   contract DFOHubGeneratedProposal {
   
       string private _metadataLink;
   
       constructor(string memory metadataLink) {
           _metadataLink = metadataLink;
       }
   
       function getMetadataLink() public view returns(string memory) {
           return _metadataLink;
       }
   
       function onStart(address newSurvey, address oldSurvey) public {
       }
   
       function onStop(address newSurvey) public {
       }
   
       function getMinimumBlockNumberForSurvey() public view returns(uint256) {
           return 37;
       }
   }`,
    surveyEnd: false,
  },
  {
    accepted: '6',
    allVotes: '10',
    checkedTimes: 1,
    code: 'test code',
    codeName: 'One Time',
    description:
      'Fixed Inflation Management Functionality<a class="ComEXTLink" href="//discord.gg/34we8bh" target="_blank"><b>Discussion Link</b></a><br><br><br><br>',
    leading: false,
    myVotes: '0',
    refused: '4',
    replaces: 'replacExample',
    result: true,
    resultBlock: 9745801,
    surveyEnd: true,
  },
  {
    codeName: 'getMetadataLink',
    replaces: 'replacesExample',
    description:
      'Setting metadata link to http://gateway.ipfs.io/ipfs/Qmcu59PwH9yEpGUKCMDxR3bm35kQPQfggfvKRJxPRwFGJG<br><br><b>Description</b>:<br>DFO Hub - Utilities - Get Metadata Link<br>The metadata located at this link contains all info about the DFO like name, short description, discussion link and many other info.<br>Setting metadata link to http://gateway.ipfs.io/ipfs/Qmcu59PwH9yEpGUKCMDxR3bm35kQPQfggfvKRJxPRwFGJG<br><br>',
  },
  {
    address: '0xa84c4D056DE9d49C5363d42010A980a657812F97',
    codeName: 'getMinimumBlockNumberForSurvey',
    replaces: 'replacesExample',
    description:
      'Survey Length updated to 35 blocks<br><br><b>Description</b>:<br>Survey Length<a class="ComEXTLink" href="//dfohub.eth" target="_blank"><b>Discussion Link</b></a><br><br><br><br>',
    checkedTimes: 0,
    endBlock: 10670183,
    leading: false,
    location: '0x49e430a3ae0ecbd7c7e63fa658044fb5db1b4b49',
    replacesCode: `/* Description:
    * Survey Length
    */
   /* Update:
    * Survey Length updated to 37 blocks
    */
   pragma solidity ^0.8.0;
   
   contract DFOHubGeneratedProposal {
   
       string private _metadataLink;
   
       constructor(string memory metadataLink) {
           _metadataLink = metadataLink;
       }
   
       function getMetadataLink() public view returns(string memory) {
           return _metadataLink;
       }
   
       function onStart(address newSurvey, address oldSurvey) public {
       }
   
       function onStop(address newSurvey) public {
       }
   
       function getMinimumBlockNumberForSurvey() public view returns(uint256) {
           return 37;
       }
   }`,
    surveyEnd: true,
  },
]

const loadDiff = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const finalizeProposal = () => {}

const etherscanURL = 'https://etherscan.io/'

export const SampleActiveProposal = () => {
  return (
    <HashRouter>
      <Proposal
        organization={{}}
        survey={results[0]}
        loadDiff={loadDiff}
        finalizeProposal={finalizeProposal}
        etherscanURL={etherscanURL}
      />
    </HashRouter>
  )
}
export const SampleProposalHistory = () => {
  return (
    <HashRouter>
      <Proposal
        organization={{}}
        survey={results[1]}
        loadDiff={loadDiff}
        finalizeProposal={finalizeProposal}
        etherscanURL={etherscanURL}
      />
    </HashRouter>
  )
}
export const SampleTooLongDescription = () => {
  return (
    <HashRouter>
      <Proposal
        organization={{}}
        survey={results[2]}
        loadDiff={loadDiff}
        finalizeProposal={finalizeProposal}
        etherscanURL={etherscanURL}
      />
    </HashRouter>
  )
}

export const SampleNoDiffCode = () => {
  return (
    <HashRouter>
      <Proposal
        organization={{}}
        survey={results[3]}
        loadDiff={loadDiff}
        finalizeProposal={finalizeProposal}
        etherscanURL={etherscanURL}
      />
    </HashRouter>
  )
}

export default item
