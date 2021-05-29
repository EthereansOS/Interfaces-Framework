import React from 'react'
import T from 'prop-types'
import { Card, Typography, Chip, Link } from '@dfohub/design-system'

import Section from '../shared/Section'

import style from './organization-info.module.scss'

function OrganizationInfo({ bio, logo, content }) {
  const contentCategories = content && Object.keys(content)

  return (
    <Card as="article">
      <Typography variant="h2" color="primary" className={style.cardTitle}>
        Organization Info
      </Typography>
      <div className={style.content}>
        <img src={logo} className={style.logo} alt="org logo" />
        <div className={style.bioWrapper}>
          <Typography variant="h5">bio</Typography>
          <Typography variant="body2">{bio}</Typography>
        </div>
        {contentCategories?.length > 0 && (
          <div className={style.links}>
            {contentCategories.map((cat, i) => (
              <Section key={i} category={cat}>
                {content[cat].map(({ to, label, href }, i) => (
                  <Link href={href} to={to} key={i} external>
                    <Chip className={style.chip} size="small" label={label} />
                  </Link>
                ))}
              </Section>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default OrganizationInfo

OrganizationInfo.propTypes = {
  bio: T.string,
  avatar: T.string,
  logo: T.string,
  content: T.shape({
    [T.string]: T.arrayOf({
      label: T.string.isRequired,
      href: T.string,
      to: T.string,
    }),
  }),
}
