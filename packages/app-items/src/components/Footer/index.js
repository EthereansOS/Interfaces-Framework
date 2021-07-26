import React from 'react'
import {
  Typography,
  Container,
  Link,
  ShinyText,
} from '@ethereansos/interfaces-ui'
import style from './footer.module.css'

function Footer() {
  return (
    <footer className={style.root}>
      <Container className={style.content}>
        <section className={style.linkList}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/EthereansOS/">
            Github
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.ethos.wiki/items/">
            Documentation
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://dapp.dfohub.com/?addr=0x7cB2Aa86fC0F3dA708783168BFd25B80F045d183">
            ETHITEM Governance
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://covenants.eth.link/#/farm/dapp/0x0074f1D1D1F0086F46EA102380635fCC460c212b">
            Farm ARTE
          </a>
          <a target="_blank" rel="noreferrer" href="https://ethos.eth.link/">
            EthOS
          </a>
          <Link to="explore" data-section="explore">
            Explore Items
          </Link>
          <Link to="wrap" data-section="wrap">
            Wrap to Items
          </Link>
          <Link to="create" data-section="create">
            Create Items
          </Link>
          <Link to="farm" data-section="farm">
            Farm Items
          </Link>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://whereismydragon.eth.link"
            className={style.brandized}>
            <ShinyText text="Where is my dragon?" animated />
          </a>
        </section>
        <section className={style.disclaimer}>
          <Typography variant="body1" className={style.disclaimerText}>
            ITEMS is a permissionless R&amp;D protocol on top of Ethereum by the
            EthOS team. Use it at your own risk!
          </Typography>
        </section>
        <img
          className={style.image}
          src="assets/img/footer.png"
          alt="footerimage"
        />
      </Container>
    </footer>
  )
}

export default Footer
