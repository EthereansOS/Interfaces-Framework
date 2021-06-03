import React, { useState } from 'react'
import {
  Card,
  Typography,
  Chip,
  Link,
  Button,
  Modal,
} from '@dfohub/design-system'

import Section from '../shared/Section'
import useOrganizationMetadata from '../../hooks/useOrganizationMetadata'
import { OrganizationPropType } from '../../propTypes'
import { useOrganizationContext } from '../../OrganizationContext'
import OrganizationEdit from '../OrganizationEdit'

import style from './organization-info.module.scss'

function OrganizationInfo({ organization }) {
  const { metadata } = useOrganizationMetadata(organization?.metadataLink)
  const { isEditMode } = useOrganizationContext()
  const [organizationEditVisible, setOrganizationEditVisible] = useState(false)

  const openEditModal = () => {
    setOrganizationEditVisible(true)
  }

  const closeEditModal = () => {
    setOrganizationEditVisible(false)
  }

  return (
    <Card as="article">
      <div className={style.cardHeader}>
        <Typography fontFamily="secondary" variant="h2" color="primary">
          Organization Info
        </Typography>
        {isEditMode && (
          <Button size="small" text="Change" onClick={openEditModal} />
        )}
      </div>

      <div className={style.content}>
        <img src={organization?.icon} className={style.logo} alt="org logo" />
        <div className={style.bioWrapper}>
          <Typography variant="h5">bio</Typography>
          <Typography variant="body2">{metadata?.shortDescription}</Typography>
        </div>
        <div className={style.links}>
          <Section category="More">
            {metadata?.wpUri && (
              <Link href={metadata?.wpUri} external>
                <Chip className={style.chip} size="small" label="Explainer" />
              </Link>
            )}
            {metadata?.roadmapUri && (
              <Link href={metadata.roadmapUri} external>
                <Chip className={style.chip} size="small" label="Roadmap" />
              </Link>
            )}
            {metadata?.repoUri && (
              <Link href={metadata?.repoUri} external>
                <Chip className={style.chip} size="small" label="Ext. repo" />
              </Link>
            )}
            {metadata?.discussionUri && (
              <Link href={metadata?.discussionUri} external>
                <Chip className={style.chip} size="small" label="Discussion" />
              </Link>
            )}
          </Section>
          <Section category="Secure Domain">
            {metadata?.externalENS && (
              <Link href={`//${metadata.externalDNS}`} external>
                <Chip className={style.chip} size="small" label="ENS Link" />
              </Link>
            )}
          </Section>
          <Section category="External Domains">
            {metadata?.externalDNS && (
              <Link href={`//${metadata.externalDNS}`} external>
                <Chip className={style.chip} size="small" label="DNS Link" />
              </Link>
            )}
            {metadata?.externalENS && (
              <Link href={`//${metadata?.externalENS}`} external>
                <Chip className={style.chip} size="small" label="ENS Link" />
              </Link>
            )}
          </Section>
        </div>
      </div>

      <Modal visible={organizationEditVisible}>
        <OrganizationEdit onClose={closeEditModal} />
      </Modal>
    </Card>
  )
}

export default OrganizationInfo

OrganizationInfo.propTypes = {
  organization: OrganizationPropType,
}
