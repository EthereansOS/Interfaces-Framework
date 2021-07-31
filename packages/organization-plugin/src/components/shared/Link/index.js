import React from 'react'
import { Link as RLink } from 'react-router-dom'
import T from 'prop-types'
import { Link as UILink } from '@ethereansos/interfaces-ui'

const Link = (props) => {
  return (
    <UILink {...props} RLink={RLink}>
      {props.children}
    </UILink>
  )
}

export default Link

Link.propTypes = {
  children: T.node,
}
