import './index.css'
import { onEthereumUpdate, getInfo } from './web3Scripts'

function Connect() {
  const hadleLoginSuccess = (result) => {
    console.log('result')
    console.log(result)
    console.log('info', getInfo())
  }

  const handleConnectFromHomePage = () => {
    // window.connectFromHomepage = async function(button) {
    //   button.innerHTML = '<spa class="loaderMinimino"></span>';
    //   button.className = '';
    console.log('PROVO IL LOGIN')
    onEthereumUpdate(0).then(hadleLoginSuccess)
    // };
  }
  return (
    <article className="NoWeb3">
      <h1>
        <img src="assets/img/ghostload.gif" alt="ghostload" />
      </h1>
      <section className="DisclamerWeb3">
        <h2>DFOhub</h2>
      </section>
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
    </article>
  )
}

export default Connect
