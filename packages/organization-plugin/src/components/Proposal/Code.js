import React from 'react'
import T from 'prop-types'
import { Button } from '@ethereansos/interfaces-ui'

import { ProposalPropTypes } from './propTypes'

function Code({ survey, handleCode, showCode }) {
  return (
    <div>
      <Button
        size="small"
        text="Code"
        value={survey.key}
        onClick={handleCode}
        color={showCode ? 'primary' : 'tertiary'}
      />
    </div>
  )
}

export default Code

Code.propTypes = {
  survey: ProposalPropTypes,
  handleCode: T.func.isRequired,
  showCode: T.bool,
}
