import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import T from 'prop-types'
import { usePlaceholder } from '@dfohub/core'
import { Button, Card } from '@dfohub/design-system'

import styles from './pages.module.scss'
const Create = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'create',
    }))
  }, [setTemplateState])

  let history = useHistory()
  const createButtons = usePlaceholder('itemCreateButtons')
  return (
    <Card primary className={styles.cardButtons}>
      {createButtons.map((button) => (
        <div key={button.id} className={styles.cardSpacer}>
          <Button
            fullWidth
            color="tertiary"
            text={button.text}
            onClick={() => {
              history.push(button.to)
            }}
          />
        </div>
      ))}
    </Card>
  )
}

Create.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Create
