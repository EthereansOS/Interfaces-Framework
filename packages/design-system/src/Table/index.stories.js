import React from 'react'

import Table from '.'

const item = {
  title: 'Example/Table',
  component: Table,
}

export const SampleTable = () => {
  const cols = [{ field: 'flour', headerName: 'Flour' }]
  const rows = [{ id: 1, flour: '100g' }]

  return <Table columns={cols} rows={rows} />
}
export const TableRenderCell = () => {
  const cols = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: (props) => (
        <img style={{ maxHeight: 60 }} src={props.row.avatar} alt="avatar" />
      ),
    },
    { field: 'flour', headerName: 'Flour' },
  ]
  const rows = [
    { id: 1, flour: 'flour' },
    {
      id: 2,
      avatar:
        'https://static.boredpanda.com/blog/wp-content/uploads/2020/06/Artist-shows-alternative-versions-of-famous-logos-in-different-styles-5ed4ac823b564__880.jpg',
      flour: 'flour',
    },
  ]

  return <Table columns={cols} rows={rows} />
}

export default item
