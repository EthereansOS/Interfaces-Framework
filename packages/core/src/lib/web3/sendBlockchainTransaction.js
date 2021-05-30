import getSendingOptions from './getSendingOptions'

const sendBlockchainTransaction = function sendBlockchainTransaction(
  web3,
  context,
  value,
  transaction
) {
  return new Promise(async function (resolve, reject) {
    const handleTransactionError = function handleTransactionError(e) {
      e !== undefined &&
        e !== null &&
        (e.message || e).indexOf('not mined within') === -1 &&
        reject(e)
    }
    try {
      ;(transaction = transaction.send
        ? transaction.send(
            await getSendingOptions(web3, transaction, value),
            handleTransactionError
          )
        : transaction)
        .on('transactionHash', (transactionHash) => {
          // TODO implement publish to transaction/start
          // $.publish('transaction/start')
          const stop = function () {
            // TODO implement unsubscribe to transaction/stop
            // $.unsubscribe('transaction/stop', stop)
            handleTransactionError('stopped')
          }
          // TODO implement subscribe to transaction/stop
          // $.subscribe('transaction/stop', stop)
          const timeout = async function () {
            const receipt = await web3.eth.getTransactionReceipt(
              transactionHash
            )
            if (
              !receipt ||
              !receipt.blockNumber ||
              (await web3.eth.getBlockNumber()) <
                receipt.blockNumber + (context.transactionConfirmations || 0)
            ) {
              return setTimeout(
                timeout,
                context.transactionConfirmationsTimeoutMillis
              )
            }
            // TODO implement unsubscribe to transaction/stop
            // $.unsubscribe('transaction/stop', stop)
            return transaction.then(resolve)
          }
          setTimeout(timeout)
        })
        .catch(handleTransactionError)
    } catch (e) {
      return handleTransactionError(e)
    }
  })
}

export default sendBlockchainTransaction
