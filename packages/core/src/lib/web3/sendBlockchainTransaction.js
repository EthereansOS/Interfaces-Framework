import getSendingOptions from './getSendingOptions'

const sleep = (timeout) => new Promise((res) => setTimeout(res, timeout))
const MAX_TRANSACTION_CHECKS_RETRY = 100

const handleTransactionError = function handleTransactionError(e, reject) {
  e !== undefined &&
    e !== null &&
    (e.message || e).indexOf('not mined within') === -1 &&
    reject(e)
}

const sendBlockchainTransaction = function sendBlockchainTransaction(
  { web3, context },
  value,
  transaction
) {
  return new Promise(async function (resolve, reject) {
    try {
      const transactionPromise = transaction.send
        ? transaction.send(
            await getSendingOptions({ web3 }, transaction, value),
            (e) => handleTransactionError(e, reject)
          )
        : transaction

      let time = MAX_TRANSACTION_CHECKS_RETRY

      transactionPromise.on('transactionHash', async (transactionHash) => {
        while (time--) {
          const receipt = await web3.eth.getTransactionReceipt(transactionHash)
          if (
            !receipt ||
            !receipt.blockNumber ||
            (await web3.eth.getBlockNumber()) <
              receipt.blockNumber + (context.transactionConfirmations || 0)
          ) {
            await sleep(context.transactionConfirmationsTimeoutMillis)
          } else {
            const res = await transactionPromise
            return resolve(res)
          }
        }
        reject('expired')
      })
    } catch (e) {
      return handleTransactionError(e, reject)
    }
  })
}

export default sendBlockchainTransaction
