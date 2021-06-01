export async function getAddress({ web3 }) {
  await window.ethereum.enable()
  return (await web3.eth.getAccounts())[0]
}
