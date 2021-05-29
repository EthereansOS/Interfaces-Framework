import React from 'react'
import T from 'prop-types'
import { Link } from '@dfohub/design-system'

import style from './table-link.module.css'

const TableLink = ({ value }) => (
  <Link className={style.root} href={`https://${value}`} external>
    {value}
  </Link>
)

export default TableLink

TableLink.propTypes = {
  value: T.string,
}
