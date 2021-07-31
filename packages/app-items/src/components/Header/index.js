import React from 'react'
import {
  Button,
  TextField,
  Container,
  Link,
  ShinyText,
} from '@ethereansos/interfaces-ui'
import style from './header.module.css'
import T from 'prop-types'
import { Link as RLink } from 'react-router-dom'

import Menu from '../Menu'
function Header(props) {
  return (
    <header className={style.root}>
      <Container className={style.content}>
        <div className={style.leftContainer}>
          <div className={style.titleBlock}>
            <Link RLink={RLink} to="/">
              <span className={style.logo}>
                <img src="assets/css/special/logoS.png" alt="items-logo" />
              </span>
            </Link>{' '}
            <Link RLink={RLink} to="/">
              <ShinyText className={style.title} text="ETHITEM" />
            </Link>
          </div>
          <Menu menuName={'appMenu'} selected={props.selected} />
          <div>
            <TextField
              placeholder="Search by Address"
              className={style.input}
              onChange={() => null}
            />
          </div>
        </div>
        <div className={style.rightContainer}>
          <Button size="small" text="New" onClick={() => null} />
        </div>
      </Container>
    </header>
  )
}

export default Header

Header.propTypes = {
  selected: T.string,
}
