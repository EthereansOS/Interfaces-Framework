import React from 'react'
import { Button, Typography } from '@dfohub/design-system'
import T from 'prop-types'
import { useEthosContext, useWeb3 } from '@dfohub/core'
import { Formik, Form } from '@dfohub/components'
import { useHistory, useParams } from 'react-router-dom'

import { OrganizationPropType } from '../../propTypes'
import proposeNewMetadataLink from '../../lib/proposeNewMetadataLink'
import { useOrganizationContext } from '../../OrganizationContext'

import style from './organization-edit.module.scss'
import OrgEditFields from './OrgEditFields'

export const orgEditInitialValues = {
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
  const { web3, ipfsHttpClient } = useWeb3()
  const context = useEthosContext()
  const { showProposalModal } = useOrganizationContext()
  const history = useHistory()
  const params = useParams()

  const onProposalSuccess = () => {
    history.push(`/organizations/${params.address}/governance/proposals`)
  }

  return (
    <section className={style.root}>
      <Button className={style.backButton} onClick={onClose} text="Back" />
      <Typography color="primary">Propose Metadata Change</Typography>

      <Formik
        initialValues={organization?.metadata || orgEditInitialValues}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const ctx = await proposeNewMetadataLink(
              {
                web3,
                context,
                ipfsHttpClient,
              },
              organization,
              values
            )
            showProposalModal({
              initialContext: ctx,
              title: ctx.title,
              onProposalSuccess,
            })
          } catch (e) {
            console.log('error proposing metadata link', e)
          } finally {
            setSubmitting(false)
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <OrgEditFields />

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
    </section>
  )
}

export default OrganizationEdit

OrganizationEdit.propTypes = {
  onClose: T.func.isRequired,
  organization: OrganizationPropType,
}
