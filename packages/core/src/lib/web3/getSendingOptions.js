import { getAddress } from './getAddress'

function getSendingOptions({ web3 }, transaction, value) {
  return new Promise(async function (resolve, reject) {
    let walletAddress
    if (transaction) {
      walletAddress = await getAddress({ web3 })
      const from = walletAddress
      const nonce = await web3.eth.getTransactionCount(from)
      // TODO I can't find the code that sets window.bypassEstimation in the production code, so I guess is always undefined
      // return window.bypassEstimation
      return undefined
        ? resolve({
            nonce,
            from,
            // TODO I can't find the code that sets window.gasLimit in the production code, so I guess is always undefined
            // gas: window.gasLimit || '7900000',
            gas: '7900000',
            value,
            walletAddress,
          })
        : transaction.estimateGas(
            {
              nonce,
              from,
              gasPrice: web3.utils.toWei('13', 'gwei'),
              value,
              gas: '7900000',
              gasLimit: '7900000',
            },
            function (error, gas) {
              if (error) {
                return reject(error.message || error)
              }
              return resolve({
                nonce,
                from,
                // TODO I can't find the code that sets window.gasLimit in the production code, so I guess is always undefined
                // gas: gas || window.gasLimit || '7900000',
                gas: gas || '7900000',
                value,
                walletAddress,
              })
            }
          )
    }
    return resolve({
      from: walletAddress || null,
      // TODO I can't find the code that sets window.gasLimit in the production code, so I guess is always undefined
      // gas: window.gasLimit || '99999999',
      gas: '99999999',
      walletAddress,
    })
  })
}

export default getSendingOptions
