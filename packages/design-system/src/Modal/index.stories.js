import React, { useState } from 'react'

import Modal from '.'

const item = {
  title: 'Example/Modal',
  component: Modal,
}

export const SampleModal = () => {
  const [state, setState] = useState(false)

  const open = () => setState(true)
  const close = () => setState(false)

  return (
    <>
      <button onClick={open}>Open me</button>
      <Modal visible={state}>
        <button onClick={close}>Close me</button>
      </Modal>
    </>
  )
}

export default item
