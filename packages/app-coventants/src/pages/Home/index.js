import React from 'react'
import Content from '../../components/Content'
import { Typography } from '@dfohub/design-system'

import style from './home.module.css'

const Home = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/home1.png`

  return (
    <section className={style.root}>
      <Content>
        <img className={style.image} src={image} alt="coventants"></img>
        <Typography className={style.title} variant="h3" color="black">
          Welcome
        </Typography>
        <Typography className={style.text} variant="body2" color="black">
          Wizard, penguin, something else entirely—it does not matter who you
          are. This is a haven for all Ethereans seeking peace and prosperity in
          the DeFi universe.
        </Typography>
        <Typography className={style.text} variant="body2" color="black">
          Here you will find Covenants. Empowered by the Aggregator, these
          contracts free us to create, control and customize our experience like
          never before.
        </Typography>
      </Content>
    </section>
  )
}

export default Home
