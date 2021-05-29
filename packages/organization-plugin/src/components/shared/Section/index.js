import React from 'react'
import T from 'prop-types'
import { Typography } from '@dfohub/design-system'

import style from './section.module.css'

const Section = ({ category, children }) => (
  <div>
    <Typography variant="h5" className={style.title}>
      {category}
    </Typography>
    <div className={style.categoryWrapper}>{children}</div>
  </div>
)

export default Section

Section.propTypes = {
  children: T.node,
  category: T.string,
}
