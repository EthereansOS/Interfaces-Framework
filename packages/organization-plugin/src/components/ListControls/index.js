import React from 'react'
import { FormControl } from '@dfohub/design-system'

import style from './list-controls.module.scss'

const ListControls = () => {
  return (
    <section className={style.root}>
      <FormControl
        control={
          <select className={style.select}>
            <option>Circ. supply</option>
            <option>Locked supply</option>
            <option>Market cap</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        }
        label="Sort by"
      />
      <FormControl control={<input type="checkbox" />} label="Metadata First" />
    </section>
  )
}

export default ListControls
