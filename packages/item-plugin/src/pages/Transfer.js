import React, { useEffect } from 'react'
import T from 'prop-types'

const Transfer = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'transfer',
    }))
  }, [setTemplateState])

  return <div>Transfer</div>
}

Transfer.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Transfer
