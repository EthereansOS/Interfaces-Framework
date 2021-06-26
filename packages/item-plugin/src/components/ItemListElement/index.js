import React from 'react'
import T from 'prop-types'
import { Typography } from '@dfohub/design-system'

import style from './itemListElement.module.scss'

const ItemListElement = ({
  name,
  address,
  symbol,
  description,
  image,
  tabIndex,
  onClick,
}) => (
  <div
    tabIndex={tabIndex}
    role="button"
    className={style.root}
    onClick={() => onClick(address)}
    onKeyDown={() => onClick(address)}>
    <div className={style.image}>
      <img
        src={image || '/assets/img/native-collection.png'}
        alt={name}
        width="100px"
        height="100px"
      />
    </div>
    <div>
      <Typography variant="h3" className={style.title}>
        {name} (<span className={style.symbol}>{symbol}</span>)
      </Typography>
      <Typography variant={'body2'}>{description}</Typography>
    </div>
  </div>
)

export default ItemListElement

ItemListElement.propTypes = {
  name: T.string,
  address: T.string,
  symbol: T.string,
  description: T.string,
  image: T.string,
  tabIndex: T.number,
  onClick: T.func.isRequired,
}
