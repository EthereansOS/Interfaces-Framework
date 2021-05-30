import T from 'prop-types'

export const OrganizationPropType = T.shape({
  name: T.string,
  icon: T.string,
  metadataLink: T.string,
  totalSupply: T.string,
  symbol: T.string,
  ensComplete: T.string,
  walletAddress: T.string,
})
