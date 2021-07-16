import React from 'react'
import { Card, Typography, Button } from '@dfohub/design-system'
import T from 'prop-types'

import { useOrganizationContext } from '../../OrganizationContext'

import style from './governance-rules-rule.module.scss'

function Rule({
  id,
  title,
  value,
  percentage,
  unit,
  description,
  handleChange,
  isInfoMode,
  selectedRule,
}) {
  const { isEditMode } = useOrganizationContext()

  return (
    <div>
      <Typography variant="body2" className={style.contentText}>
        {title}:{' '}
        {percentage && (
          <span>
            <strong>{percentage}% </strong> (
          </span>
        )}
        <strong>{value}</strong> {unit}
        {percentage && ')'}
        {isEditMode && (
          <Button
            size="small"
            text="Change"
            value={id}
            onClick={handleChange}
            className={style.editButton}
            color={
              selectedRule && selectedRule.id === id ? 'secondary' : 'primary'
            }
          />
        )}
      </Typography>
      {isInfoMode && (
        <Card
          className={style.infoCard}
          contentClassName={style.infoCardContent}>
          <Typography variant="body2">{description}</Typography>
        </Card>
      )}
    </div>
  )
}

export default Rule
Rule.propTypes = {
  id: T.string.isRequired,
  title: T.string,
  value: T.string,
  percentage: T.string,
  unit: T.string,
  description: T.string,
  handleChange: T.func.isRequired,
  isInfoMode: T.bool,
  selectedRule: T.object,
}
