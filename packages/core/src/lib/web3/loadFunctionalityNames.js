import blockchainCall from './blockchainCall'

async function loadFunctionalityNames({ web3, context }, element) {
  var functionalityNames = await blockchainCall(
    { web3, context },
    element.functionalitiesManager.methods.functionalityNames
  )
  functionalityNames = JSON.parse(
    (functionalityNames.endsWith(',]')
      ? functionalityNames.substring(0, functionalityNames.lastIndexOf(',]')) +
        ']'
      : functionalityNames
    ).trim()
  )
  return functionalityNames
}

export default loadFunctionalityNames
