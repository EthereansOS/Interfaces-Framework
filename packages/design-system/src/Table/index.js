import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import Typography from '../Typography/'

import style from './table.module.scss'

function Table({ columns: cols, rows, tableClassName }) {
  return (
    <table className={classNames(style.root, tableClassName)}>
      <thead>
        <tr>
          {cols.map((c) => (
            <th style={{ flex: c.flex }} key={c.field}>
              {c.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            {cols.map((c) => (
              <td key={c.field} style={{ flex: c.flex }}>
                {c.renderCell && r[c.field] ? (
                  <c.renderCell row={r} value={r[c.field]} />
                ) : (
                  <Typography variant="body1">{r[c.field]}</Typography>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  tableClassName: T.string,
  rows: T.arrayOf(
    T.shape({
      id: T.oneOfType([T.string, T.number]),
    })
  ).isRequired,
  columns: T.arrayOf(
    T.shape({
      field: T.string,
      headerName: T.string,
      renderCell: T.func,
      flex: T.number,
    })
  ).isRequired,
}

export default Table
