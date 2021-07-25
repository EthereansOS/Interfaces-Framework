import React from 'react'
import { Typography, Card } from '@dfohub/design-system'
import Content from '../../components/Content'

import style from './covenants.module.css'

const Covenants = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/covenants1.png`

  return (
    <section className={style.root}>
      <Content styles={style.covenants}>
        <div className={style.links}>
          <img className={style.image} src={image} alt="bazar"></img>
          <Card>
            <Typography className={style.supported} variant="h6" color="white">
              Supported AMMs
            </Typography>
            <Typography className={style.swap} variant="body2">
              <a href="https://uniswap.org/">Uniswap V2</a>
              <a href="https://balancer.fi/">Balancer V1</a>
              <a href="https://mooniswap.info/home">MooniSwap V1</a>
              <a href="https://sushi.com/">SushiSwap V1</a>
            </Typography>
          </Card>
        </div>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            The Aggregator
          </Typography>
          <Typography className={style.text} variant="body2" color="black">
            At the heart of every Covenant is the Aggregator. By liberating
            on-chain AMM aggregation, it allows any wallet, DAPP, DFO, DAO or
            customized smart contract to farm, inflate, multi-swap, arbitrage,
            craft liquidity, collateralize stablecoins and more across multiple
            AMMs at the same time.
          </Typography>
          <div className={style.governance}>
            <Typography className={style.title} variant="h6" color="black">
              Governance
            </Typography>
            <Typography variant="body2">
              <a href="https://dapp.dfohub.com/?addr=0xeFAa6370A2ebdC47B12DBfB5a07F91A3182B5684">
                Covenants DFO
              </a>
              <a href="https://etherscan.io/tokenHoldings?a=0x7ab2263e529A3D06745b32Dc35a22391d7e9f9B7">
                Covenants Treasury
              </a>
              <a href="https://etherscan.io/token/0x9E78b8274e1D6a76a0dBbf90418894DF27cBCEb5">
                UniFi Token
              </a>
              <a href="https://covenants.eth.link/#/farm/dapp/0x37Bc927d6aa94F1d3E4441CF7368e4C3df72241B">
                Farm UniFi
              </a>
              <a href="https://covenants.eth.link/#/inflation/dapp/0xBCc4b93914142891b20568B3c50ed050570C5124">
                UniFi Inflation
              </a>
            </Typography>
          </div>
          <div>
            <Typography className={style.title} variant="h6" color="black">
              More
            </Typography>
            <Typography variant="body2">
              <a href="https://ethereansos.eth.link/">Eth OS</a>
              <a href="https://etherscan.io/tokenHoldings?a=0x7ab2263e529A3D06745b32Dc35a22391d7e9f9B7">
                Covenants Treasury
              </a>
              <a href="https://ethereansos.eth.link/organizations.html">
                OnChain Organizations
              </a>
              <a href="https://ethereansos.eth.link/equities.html">
                Programmable Equities
              </a>
              <a href="https://github.com/ethereansos">GitHub</a>
              <a href="https://etherscan.io/address/0x6bc8530fecc0001b9fc0bf5daa17873e847616ed">
                Farm Factory
              </a>
              <a href="https://etherscan.io/address/0x285427916a9d2e991039A8F1611F575D0a6cf237">
                Inflation Factory
              </a>
              <a href="https://etherscan.io/address/0xc6749132243dA6B174BF502E7a85f5cEdD74A753d">
                WUSD Factory
              </a>
              <a href="https://etherscan.io/address/0x3a6a5fcce56fa57eeb4b24aeb8d13a2e3197b333">
                Index Factory
              </a>
              <a href="https://etherscan.io/address/0x81391d117a03A6368005e447197739D06550D4CD">
                Aggregator Factory
              </a>
            </Typography>
          </div>
        </div>
      </Content>
    </section>
  )
}

export default Covenants
