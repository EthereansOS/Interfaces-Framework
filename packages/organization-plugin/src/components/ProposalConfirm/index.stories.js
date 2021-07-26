import React from 'react'
import { action } from '@storybook/addon-actions'
import { Modal } from '@ethereansos/interfaces-ui'

import ProposalConfirm from '.'

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))
const item = {
  title: 'Example/ProposalConfirm',
  component: ProposalConfirm,
}

export const SampleProposalConfirm = () => (
  <Modal visible={true}>
    <ProposalConfirm
      onClose={() => false}
      proposal={{ title: 'Length' }}
      onPrepareProposal={async (values) => {
        await delay()
        action('onPrepareProposal')(values)
      }}
      onContractValidation={async (values) => {
        await delay()
        action('onContractValidation')(values)
      }}
      onContractDeploy={async (values) => {
        await delay()
        action('onContractDeploy')(values)
      }}
      onPublishProposal={async (values) => {
        await delay()
        action('onPublishProposal')(values)
      }}
    />
  </Modal>
)

export default item
