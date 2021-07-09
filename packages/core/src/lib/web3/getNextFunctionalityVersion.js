import blockchainCall from './blockchainCall'
import { newContract } from './contracts'

async function getNextFunctionalityVersion(
  { web3, context },
  data,
  codeName,
  replaces
) {
  let version = 0
  if (replaces && codeName) {
    try {
      const functionalityLocation = (
        await blockchainCall(
          { web3, context },
          data.element.functionalitiesManager.methods.getFunctionalityData,
          data.replaces
        )
      )[0]

      const metadataLink = await blockchainCall(
        { web3, context },
        newContract({ web3 }, context.IFunctionalityAbi, functionalityLocation)
          .methods.getMetadataLink
      )

      const metadata = await (await fetch(metadataLink)).json()
      version = Number(metadata.version) + 1
    } catch (e) {}
  }
  return version
}

export default getNextFunctionalityVersion
