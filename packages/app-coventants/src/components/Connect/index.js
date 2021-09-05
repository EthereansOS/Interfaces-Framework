import { useEffect } from 'react'
import {
  useWeb3,
  webs3States,
  usePrevious,
  useEthosContext,
} from '@ethereansos/interfaces-core'
import { ConnectWidget, Container } from '@ethereansos/interfaces-ui'
import style from './connect.module.css'

const Connect = ({ children }) => {
  const { connect, connectionStatus } = useWeb3()
  const context = useEthosContext()
  const previousConnectionStatus = usePrevious(connectionStatus)

  useEffect(() => {
    if (
      connectionStatus === webs3States.CONNECTED &&
      previousConnectionStatus === webs3States.CONNECTING
    ) {
      console.log('Connected')
    }
  }, [connectionStatus, previousConnectionStatus])

  return connectionStatus === webs3States.CONNECTED ? (
    children
  ) : (
    <Container className={style.root}>
      <ConnectWidget
        title="Welcome Etherean"
        connect={connect}
        connectionStatus={connectionStatus}
        connectors={context.connectors}
      />
    </Container>
  )
}

export default Connect
