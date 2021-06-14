import React, { useState } from 'react'
import {
  Typography,
  Button,
  FormControl,
  TextField,
} from '@dfohub/design-system'
import Editor from '@monaco-editor/react'

import useFetchFrontendCode from '../../hooks/useFetchFrontendCode'
import useOrganization from '../../hooks/useOrganization'

import style from './change-code-footer.module.scss'

const ChangeCodeFooter = () => {
  const { organization } = useOrganization()
  const [editorVisible, setEditorVisible] = useState()
  const [chosenLayer, setChosenLayer] = useState()
  const { distributedCode, decentralizedCode } = useFetchFrontendCode(
    organization.index,
    organization.link
  )

  const setDecentralizedLayer = (e) => {
    setChosenLayer(e.target.checked ? 'decentralized' : undefined)
  }

  const setDistributedLayer = (e) => {
    setChosenLayer(e.target.checked ? 'distributed' : undefined)
  }

  const toggleDistributedCodeEditor = () =>
    setEditorVisible((v) =>
      v === 'decentralized' || v === undefined ? 'distributed' : undefined
    )

  const toggleDecentralizedCodeEditor = () =>
    setEditorVisible((v) =>
      v === 'distributed' || v === undefined ? 'decentralized' : undefined
    )

  return (
    <section className={style.footer}>
      <header className={style.footerHeader}>
        <Typography variant="body1">
          DFOs Front-End is designed to work in two layers, the "Distributed
          Layer" and the "Decentralized Layer." The Distributed Layer is a
          version of the Front-End deployed via IPFS or Swarn, for fast and free
          updates. The Decentralized Layer is a version of the Front-End via
          On-Chain files, expensive but critical to making a DFO Censorship
          Resistant. The ENS automatically redirects users to the Distributed
          Layer and if it's Censored to the Decentralized Layer.
        </Typography>
        <div className={style.inputsContainer}>
          <div className={style.footerRowContainer}>
            <Button
              size="small"
              text="Code"
              onClick={toggleDistributedCodeEditor}
            />
            <FormControl
              control={
                <input
                  type="checkbox"
                  checked={chosenLayer === 'distributed'}
                  onChange={setDistributedLayer}
                />
              }
              label="Distributed Layer"
            />
            <TextField
              placeholder="URL"
              disabled={chosenLayer !== 'distributed'}
            />
          </div>
          <div className={style.footerRowContainer}>
            <Button
              size="small"
              text="Code"
              onClick={toggleDecentralizedCodeEditor}
            />
            <FormControl
              control={
                <input
                  type="checkbox"
                  checked={chosenLayer === 'decentralized'}
                  onChange={setDecentralizedLayer}
                />
              }
              label="Decentralized layer"
            />
            <FormControl
              style={{ padding: 0 }}
              control={
                <input
                  type="file"
                  style={{ maxWidth: 120 }}
                  disabled={chosenLayer !== 'decentralized'}
                />
              }
            />
          </div>
        </div>
      </header>

      {editorVisible && (
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
            readOnly: true,
          }}
          height="600px"
          language="html"
          theme="vs-dark"
          value={
            editorVisible === 'decentralized'
              ? decentralizedCode
              : distributedCode
          }
          className={style.editor}
        />
      )}

      <Button
        className={style.submit}
        size="small"
        text="Propose"
        color="secondary"
        onClick={() => null}
      />
    </section>
  )
}

export default ChangeCodeFooter
