import React from 'react'
import T from 'prop-types'
import Editor, { DiffEditor } from '@monaco-editor/react'
import { CircularProgress } from '@ethereansos/interfaces-ui'

import { ProposalPropTypes } from './propTypes'
import style from './proposal.module.scss'

function ProposalCardFooterCode({ survey, loadingCode }) {
  const commons = {
    options: {
      minimap: {
        enabled: false,
      },
      readOnly: true,
    },
    height: '400px',
    language: 'sol',
    theme: 'vs-dark',
  }
  return loadingCode ? (
    <div className={style.loadingCode}>
      <CircularProgress />
    </div>
  ) : survey.replacesCode && survey.code ? (
    <DiffEditor
      {...commons}
      original={survey.replacesCode}
      modified={survey.code}
    />
  ) : survey.replacesCode || survey.code ? (
    <Editor {...commons} value={survey.replacesCode || survey.code} />
  ) : null
}

export default ProposalCardFooterCode

ProposalCardFooterCode.propTypes = {
  survey: ProposalPropTypes,
  loadingCode: T.bool,
}
