# Table

This component displays a table

## Usage

```jsx
<Table columns={[{field: 'avatar', renderCell: (params) => <img src={params.value}>}]} rows={[{avatar: 'https://myavatar.jpg'}]} />
```

## Props

| Name    | Type                                                               | Required | Default | Description                                                   |
| ------- | ------------------------------------------------------------------ | -------- | ------- | ------------------------------------------------------------- |
| rows    | [{id: number or string, x: ''}]                                    | yes      |         | The rows of the table matching the columns' fields properties |
| columns | [{field: 'x', headerName: 'X', renderCell?: (row)=> ReactElement}] | yes      |         | The columns of the table                                      |
