import React, { useEffect } from 'react'
import T from 'prop-types'

const Wrap = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'wrap',
    }))
  }, [setTemplateState])

  return <div>Wrap</div>
}

Wrap.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Wrap
