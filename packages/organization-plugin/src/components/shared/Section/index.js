import React from 'react'
import T from 'prop-types'
import { Typography } from '@dfohub/design-system'

import style from './section.module.scss'

const Section = ({ category, children, column, className, badge }) => (
  <div className={className}>
    <Typography variant="h5" className={style.title}>
      {category} {badge}
    </Typography>
    <div
      className={style.categoryWrapper}
      style={column && { flexDirection: 'column', alignItems: 'flex-start' }}>
      {children}
    </div>
  </div>
)

export default Section

Section.propTypes = {
  badge: T.node,
  children: T.node,
  category: T.string,
  column: T.bool,
  className: T.string,
}
