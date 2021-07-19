export const VOID_ETHEREUM_ADDRESS =
  '0x0000000000000000000000000000000000000000'
export const VOID_ETHEREUM_ADDRESS_EXTENDED =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

export const BLOCK_SEARCH_SIZE = 40000
export const DFO_DEPLOYED_EVENT = 'DFODeployed(address_indexed,address)'
export const NEW_DFO_DEPLOYED_EVENT =
  'DFODeployed(address_indexed,address_indexed,address,address)'
export const BASE64_REGEXP = new RegExp('data:([\\S]+)\\/([\\S]+);base64', 'gs')
export const URL_REGEXP = new RegExp(
  '(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
  'gs'
)
