import './index.css'
import ghostImage from './ghostload.gif'
import { useWeb3, webs3States } from '@dfohub/core'

function Connect() {
  const { connect, connectionStatus } = useWeb3()

  const hadleLoginSuccess = (result) => {
    console.log('result')
    console.log(result)
    // console.log('info', getInfo())
  }

  const handleConnectFromHomePage = () => {
    // window.connectFromHomepage = async function(button) {
    //   button.innerHTML = '<spa class="loaderMinimino"></span>';
    //   button.className = '';
    // console.log('PROVO IL LOGIN')
    connect(0).then(hadleLoginSuccess)
    // };
  }
  return (
    <article className="NoWeb3">
      <h1>
        <img src={ghostImage} alt="ghostload" />
      </h1>
      <section className="DisclamerWeb3">
        <h2>DFOhub</h2>
      </section>

      {connectionStatus === webs3States.CONNECTED && <div>Connected</div>}
      {connectionStatus === webs3States.CONNECTING && <div>Connecting</div>}
      {connectionStatus === webs3States.NOT_CONNECTED && (
        <section>
          <br />
          <button className="ConnectButton" onClick={handleConnectFromHomePage}>
            Connect
          </button>
          <br />
          <p>
            Connect to the{' '}
            <a href="https://etherscan.io/directory/Wallet">Web3</a> to enter
          </p>
        </section>
      )}
    </article>
  )
}

export default Connect
