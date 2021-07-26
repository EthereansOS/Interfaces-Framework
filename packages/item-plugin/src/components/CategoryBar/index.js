import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'
import { ShinyText } from '@ethereansos/interfaces-ui'

import style from './categoryBar.module.scss'

const CategoryBar = ({ categories, selected, onClick }) => (
  <div className={style.root}>
    {categories.map((category, index) => (
      <div
        tabIndex={index}
        key={category}
        onClick={() => onClick(category)}
        onKeyDown={() => onClick(category)}
        role="button"
        className={classNames(style.item, {
          [style.selected]: selected === category,
        })}>
        <ShinyText
          text={category}
          hover={selected !== category}
          animated={selected !== category}
          strong
        />
      </div>
    ))}
  </div>
)

export default CategoryBar

CategoryBar.propTypes = {
  categories: T.arrayOf(T.string),
  selected: T.string,
  onClick: T.func.isRequired,
}
