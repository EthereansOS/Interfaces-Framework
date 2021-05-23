import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@dfohub/design-system'

const HomePage = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({ ...s, headerTitle: 'HOME' }))
  }, [setTemplateState])
  return (
    <Card>
      <Link to="/list">Organization list</Link>
    </Card>
  )
}

export default HomePage
