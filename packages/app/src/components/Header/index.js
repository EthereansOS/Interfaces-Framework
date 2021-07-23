import React from 'react'
import {
  Typography,
  TextField,
  Container,
  Chip,
  Link,
} from '@dfohub/design-system'
import style from './header.module.css'
import T from 'prop-types'

function Header() {
  return (
    <header className={style.root}>
      <Container className={style.content}>
        <div className={style.leftContainer}>
          <Link to="/">
            <Typography variant="h4" fontFamily="secondary">
              👻 <span className={style.title}>DFO</span>
              hub
            </Typography>
          </Link>

          <TextField
            placeholder="Search by Address"
            className={style.input}
            onChange={() => null}
          />
        </div>

        <div className={style.rightContainer}>
          <Link to="/organizations/new">
            <Chip color="primary" size="small" label="New" />
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Header

Header.propTypes = {
  headerTitle: T.string,
}
