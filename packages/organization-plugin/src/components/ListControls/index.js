import React from 'react'
import { FormControl } from '@dfohub/design-system'
import T from 'prop-types'

import style from './list-controls.module.scss'

const ListControls = ({ filters, setFilters }) => {
  return (
    <section className={style.root}>
      <FormControl
        control={
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/398
          // eslint-disable-next-line jsx-a11y/no-onchange
          <select
            className={style.select}
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortBy: e.target.value }))
            }>
            <option value="circSupply">Circ. supply</option>
            <option value="lockSupply">Locked supply</option>
            <option value="markCap">Market cap</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        }
        label="Sort by"
      />
      <FormControl
        control={
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters((f) => ({ ...f, metadataFirst: e.target.checked }))
            }
            checked={filters.metadataFirst}
          />
        }
        label="Metadata First"
      />
    </section>
  )
}

export default ListControls

ListControls.propTypes = {
  filters: T.shape({
    metadataFirst: T.bool,
    sortBy: T.oneOf([
      'circSupply',
      'lockSupply',
      'markCap',
      'newest',
      'oldest',
    ]),
  }).isRequired,
  setFilters: T.func.isRequired,
}
