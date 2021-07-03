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
      const metadata = await (
        await fetch(
          await blockchainCall(
            { web3, context },
            newContract(
              { web3 },
              context.IFunctionalityAbi,
              functionalityLocation
            ).methods.getMetadataLink
          )
        )
      ).json()
      version = 1 + metadata.version
    } catch (e) {}
  }
  return version
}

export default getNextFunctionalityVersion
