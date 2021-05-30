import React from 'react'
import T from 'prop-types'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'

import Section from '../shared/Section'
import useOrganizationMetadata from '../../hooks/useOrganizationMetadata'
import { OrganizationPropType } from '../../propTypes'

import style from './organization-info.module.scss'

function OrganizationInfo({ organization }) {
  const { metadata } = useOrganizationMetadata(organization?.metadataLink)

  return (
    <Card as="article">
      <Typography
        fontFamily="secondary"
        variant="h2"
        color="primary"
        className={style.cardTitle}>
        Organization Info
      </Typography>
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
    </Card>
  )
}

export default OrganizationInfo

OrganizationInfo.propTypes = {
  organization: OrganizationPropType,
}
