import React from 'react'
import Editor from '@monaco-editor/react'
import { Typography } from '@dfohub/design-system'
import T from 'prop-types'

import useFetchFrontendCode from '../../hooks/useFetchFrontendCode'
import useOrganization from '../../hooks/useOrganization'

import style from './code-footer.module.scss'

const Layer = ({ title, code }) => {
  return (
    <article className={style.layer}>
      <Typography variant="h6">{title}</Typography>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          readOnly: true,
        }}
        height="400px"
        language="html"
        theme="vs-dark"
        value={code.toString()}
        className={style.editor}
      />
    </article>
  )
}

const CodeFooter = () => {
  const { organization } = useOrganization()
  const { distributedCode, decentralizedCode } = useFetchFrontendCode(
    organization.index,
    organization.link
  )

  return (
    <section className={style.footer}>
      <Layer title="Distributed Layer" code={distributedCode} />
      <Layer title="Decentralized Layer" code={decentralizedCode} />
    </section>
  )
}

export default CodeFooter

Layer.propTypes = {
  title: T.string.isRequired,
  code: T.string,
}
