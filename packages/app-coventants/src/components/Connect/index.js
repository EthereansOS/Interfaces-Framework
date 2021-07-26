import { useEffect } from 'react'
import { useWeb3, webs3States, usePrevious } from '@ethereansos/interfaces-core'
import { ConnectWidget, Container } from '@ethereansos/interfaces-ui'
import style from './connect.module.css'

const Connect = ({ children }) => {
  const { connect, connectionStatus } = useWeb3()
  const previousConnectionStatus = usePrevious(connectionStatus)

  useEffect(() => {
    if (
      connectionStatus === webs3States.CONNECTED &&
      previousConnectionStatus === webs3States.CONNECTING
    ) {
      console.log('Connected')
    }
  }, [connectionStatus, previousConnectionStatus])

  const handleConnectFromHomePage = () => connect(0)

  return connectionStatus === webs3States.CONNECTED ? (
    children
  ) : (
    <Container className={style.root}>
      <ConnectWidget
        title="Welcome Etherean"
        onClickConnect={handleConnectFromHomePage}
        connectionStatus={connectionStatus}
      />
    </Container>
  )
}

export default Connect
