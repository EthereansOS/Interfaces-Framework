import React, { useEffect } from 'react'
import T from 'prop-types'

const Farm = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'farm',
    }))
  }, [setTemplateState])

  return <div>Farm</div>
}

Farm.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Farm
