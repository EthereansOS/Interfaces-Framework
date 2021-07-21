import React, { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  Tooltip,
  Modal,
} from '@dfohub/design-system'
import T from 'prop-types'
import { Formik, Form, Field } from 'formik'
import { useEthosContext, useWeb3 } from '@dfohub/core'
import { useHistory, useParams } from 'react-router-dom'

import EditField from '../shared/EditField'
import { OrganizationPropType } from '../../propTypes'
import proposeNewMetadataLink from '../../lib/proposeNewMetadataLink'
import ProposalConfirm from '../ProposalConfirm'

import style from './organization-edit.module.scss'

const initialValues = {
  shortDescription: '',
  name: '',
  brandUri: '',
  logoUri: '',
  discussionUri: '',
  repoUri: '',
  wpUri: '',
  roadmapUri: '',
  externalDNS: '',
  externalENS: '',
}

function OrganizationEdit({ onClose, organization }) {
  const { web3, networkId, ipfsHttpClient, walletAddress, ethosEvents } =
    useWeb3()
  const context = useEthosContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [proposalContext, setProposalContext] = useState({})
  let history = useHistory()
  let params = useParams()

  const handleModalClose = () => {
    setProposalContext({})
    setModalOpen(false)
  }

  const handleProposalSuccess = () => {
    history.push(`/organizations/${params.address}/governance/proposals`)
  }

  return (
    <section className={style.root}>
      <Button className={style.backButton} onClick={onClose} text="Back" />
      <Typography color="primary">Propose Metadata Change</Typography>

      <Formik
        initialValues={organization?.metadata || initialValues}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const ctx = await proposeNewMetadataLink(
              {
                web3,
                context,
                networkId,
                ipfsHttpClient,
                walletAddress,
                ethosEvents,
              },
              organization,
              values
            )
            setProposalContext(ctx)
            setModalOpen(true)
          } catch (e) {
            console.log('error proposing metadata link', e)
          } finally {
            setSubmitting(false)
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Field name="shortDescription">
              {({ field }) => (
                <>
                  <Typography weight="bold" variant="body1">
                    BIO:
                  </Typography>
                  <TextField
                    className={style.inputContainer}
                    isMultiline
                    {...field}
                  />
                  <Tooltip className={style.tooltip}>
                    <Typography variant="body2">
                      A brief description of the organization
                    </Typography>
                  </Tooltip>
                </>
              )}
            </Field>

            <EditField
              name="name"
              label="DFO Name:"
              value="test"
              description="The name of the organization"
            />

            <EditField
              name="brandUri"
              label="DFO Logo:"
              value="test"
              description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
            />

            <EditField
              name="logoUri"
              label="Token Logo:"
              value="test"
              description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
            />

            <EditField
              name="discussionUri"
              label="Chat Link:"
              value="test"
              description="A link to the official community of the organization (ex. Riot, Discord, Telegram)"
            />

            <EditField
              name="repoUri"
              label="Repo Link:"
              value="test"
              description="A link to the official R&D repository"
            />

            <EditField
              name="wpUri"
              label="Explainer link:"
              value="test"
              description="A link to an external source that explain the plan of the organization"
            />

            <EditField
              name="roadmapUri"
              label="Roadmap link:"
              value="test"
              description="A link to an external source that provide the roadmap of the project"
            />

            <EditField
              name="externalDNS"
              label="External link:"
              value="test"
              description="A link to an external webpage to use the application (if any)"
            />

            <EditField
              name="externalENS"
              label="External ENS link:"
              value="test"
              description="A link to an external ENS webpage to use the application (if any)"
            />

            <Button
              className={style.proposeButton}
              type="submit"
              size="small"
              text="Propose"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>

      {modalOpen && (
        <Modal visible>
          <ProposalConfirm
            initialContext={proposalContext}
            title={proposalContext.title}
            onClose={handleModalClose}
            onProposalSuccess={handleProposalSuccess}
          />
        </Modal>
      )}
    </section>
  )
}

export default OrganizationEdit

OrganizationEdit.propTypes = {
  onClose: T.func.isRequired,
  organization: OrganizationPropType,
}
