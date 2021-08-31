import { useEffect } from 'react'
import { useWeb3, webs3States, usePrevious } from '@ethereansos/interfaces-core'
import { ConnectWidget, Container } from '@ethereansos/interfaces-ui'

function Connect({ children }) {
  const { connect, connectionStatus } = useWeb3()

  const previousConnectionStatus = usePrevious(connectionStatus)

  useEffect(
    (props) => {
      if (
        connectionStatus === webs3States.CONNECTED &&
        previousConnectionStatus === webs3States.CONNECTING
      ) {
        console.log('Connnected')
      }
    },
    [connectionStatus, previousConnectionStatus]
  )

  return connectionStatus === webs3States.CONNECTED ? (
    children
  ) : (
    <Container>
      <ConnectWidget
        logo={`${process.env.PUBLIC_URL}/assets/img/loadMonolith.png`}
        title="Welcome Etherean"
        rotateLogo
        connect={connect}
        connectionStatus={connectionStatus}
      />
    </Container>
  )
}

export default Connect
