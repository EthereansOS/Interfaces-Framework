import React from 'react'
import { Button, Typography, Container } from '@dfohub/design-system'
import { Link } from 'react-router-dom'

import { useOrganizationContext } from '../../OrganizationContext'
import { OrganizationPropType } from '../../propTypes'

import style from './organizationHeader.module.scss'

const OrganizationHeader = ({ organization }) => {
  const { isEditMode, setEditMode, setViewMode } = useOrganizationContext()

  return (
    <header className={style.root}>
      <Container className={style.content}>
        <div className={style.leftContainer}>
          <img src={organization.icon} className={style.logo} alt="logo" />
          <Typography variant="h4" className={style.title}>
            {organization?.name}
          </Typography>
        </div>

        <div className={style.rightContainer}>
          <Button
            size="small"
            text={isEditMode ? 'View mode' : 'Edit mode'}
            onClick={() => (isEditMode ? setViewMode() : setEditMode())}
          />
          <Link className={style.closeButton} to="/list">
            ☒
          </Link>
        </div>
      </Container>
    </header>
  )
}

OrganizationHeader.propTypes = {
  organization: OrganizationPropType.isRequired,
}

export default OrganizationHeader
