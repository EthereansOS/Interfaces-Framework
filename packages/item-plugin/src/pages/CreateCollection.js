import React, { useEffect } from 'react'
import T from 'prop-types'

import CreateCollection from '../components/CreateCollection'

const Create = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'create',
    }))
  }, [setTemplateState])

  return <CreateCollection />
}

Create.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Create
