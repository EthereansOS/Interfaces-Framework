import React, { useEffect } from 'react'
import T from 'prop-types'

const Create = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'create',
    }))
  }, [setTemplateState])

  return <div>CREATE Item</div>
}

Create.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Create
