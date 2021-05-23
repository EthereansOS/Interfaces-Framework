import React from 'react'
import { Button, Typography, TextField, Container } from '@dfohub/design-system'
import style from './header.module.css'
import T from 'prop-types'

function Header() {
  return (
    <header className={style.root}>
      <Container className={style.content}>
        <div className={style.leftContainer}>
          <Typography variant="h4">
            👻 <span className={style.title}>DFO</span>
            hub
          </Typography>
          <TextField
            placeholder="Search by Address"
            className={style.input}
            onChange={() => null}
          />
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
  headerTitle: T.string,
}
