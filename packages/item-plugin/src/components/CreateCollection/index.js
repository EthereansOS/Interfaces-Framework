import React, { useState } from 'react'
import { Card } from '@ethereansos/interfaces-ui'

import styles from './create-collection.module.scss'
import Start from './Start'
import Host from './Host'
import Granularity from './Granularity'
import Metadata from './Metadata'

const components = {
  start: Start,
  host: Host,
  granularity: Granularity,
  metadata: Metadata,
}

const CreateCollection = () => {
  const [current, setCurrent] = useState('metadata')
  const [values, setValues] = useState({
    name: 'alpha',
    symbol: 'SYM',
    host: 'smart-contract',
  })

  const onNext = (values, step) => {
    setValues((s) => ({ ...s, ...values }))
    setCurrent(step)
  }

  const onBack = (values, step) => {
    setCurrent(step)
  }

  const Component = components[current]
  return (
    <Card className={styles.card}>
      <Component onNext={onNext} onBack={onBack} values={values} />
    </Card>
  )
}

export default CreateCollection
