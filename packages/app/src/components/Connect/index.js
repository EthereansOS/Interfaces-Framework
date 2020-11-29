import { useEffect } from 'react'
import { useWeb3, webs3States, usePrevious } from '@dfohub/core'
import { ConnectWidget } from '@dfohub/components'
import { Container, Button, Heading } from '@dfohub/design-system'

function Connect({ children }) {
  const { connect, connectionStatus } = useWeb3()

  const previousConnectionStatus = usePrevious(connectionStatus)

  useEffect(
    (props) => {
      console.log('previousConnectionStatus')
      console.log(previousConnectionStatus)
      console.log(connectionStatus)
    },
    [connectionStatus]
  )

  const hadleLoginSuccess = (result) => {
    console.log('result')
    console.log(result)
    // console.log('info', getInfo())
  }

  const handleConnectFromHomePage = () => {
    connect(0)
  }

  return connectionStatus === webs3States.CONNECTED ? (
    children
  ) : (
    <Container>
      <ConnectWidget
        logo="/assets/img/ghostload.gif"
        title="DFOhub"
        onClickConnect={handleConnectFromHomePage}
        connectionStatus={connectionStatus}
      />
    </Container>
  )
}

export default Connect
