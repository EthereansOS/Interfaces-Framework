import React from 'react'
import T from 'prop-types'
import { Button, Link, Typography } from '@ethereansos/interfaces-ui'

import { ProposalPropTypes } from './propTypes'
import style from './proposal.module.scss'

function Finalize({ survey, handleFinalize }) {
  return (
    <div>
      <Typography variant="body2">
        Sometime Web 3 providers can't estimate correctly the Max Gas needed for
        complex transactions. Finalizing a Proposal, you execute the code in the
        EVM, be sure to add the right Max Gas required for its execution. Do it
        at your own risk.{' '}
        <Link
          className={style.link}
          href="https://blockgeeks.com/guides/ethereum-gas/"
          external>
          More
        </Link>
      </Typography>
      <Button
        size="small"
        text="Finalize"
        value={survey.key}
        onClick={handleFinalize}
        color={'tertiary'}
        className={style.finalizeButton}
      />
    </div>
  )
}

export default Finalize

Finalize.propTypes = {
  survey: ProposalPropTypes,
  handleFinalize: T.func.isRequired,
}
