import generateAndCompileContract from './generateAndCompileContract'

function sendGeneratedProposal(
  { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
  element,
  ctx,
  template,
  lines,
  descriptions,
  updates,
  prefixedLines,
  postFixedLines
) {
  const initialContext = {
    element,
    functionalityName: '',
    functionalitySubmitable: true,
    functionalityMethodSignature: 'callOneTime(address)',
    functionalityReplace: '',
    functionalityInternal: false,
    functionalityNeedsSender: false,
    emergency: false,
    template,
    lines,
    descriptions,
    updates,
    prefixedLines,
    postFixedLines,
    sequentialOps: template && [
      {
        name: 'Generating Smart Contract proposal',
        async call(data) {
          const generatedAndCompiled = await generateAndCompileContract(
            data.template,
            data.lines,
            data.descriptions,
            data.updates,
            data.prefixedLines,
            data.postFixedLines
          )
          data.sourceCode = generatedAndCompiled.sourceCode
          data.selectedContract = generatedAndCompiled.selectedContract
        },
      },
    ],
  }
  const newCtx = ctx || {}
  // TODO is this neccessary?
  Object.keys(newCtx).map((key) => (initialContext[key] = newCtx[key]))
  // showProposalLoader(
  //   { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
  //   initialContext
  // )

  // TODO verify how this return values is used
  return initialContext
}

export default sendGeneratedProposal
