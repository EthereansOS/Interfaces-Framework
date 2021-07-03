import getSolidityUtilities from './getSolidityUtilities'
async function getSupportedSolidityVersion() {
  var supportedSolidityVersion = '0.7.0'
  return [
    supportedSolidityVersion,
    (await getSolidityUtilities().getCompilers()).releases[
      supportedSolidityVersion
    ],
  ]
}

export default getSupportedSolidityVersion
