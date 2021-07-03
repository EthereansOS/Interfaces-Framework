import {
  VOID_ETHEREUM_ADDRESS,
  web3Utils,
  getSolidityUtilities,
  loadContent,
  blockchainCall,
  generateFunctionalityMetadataLink,
  getNetworkElement,
  hasEthereumAddress,
  fromDecimals,
  createContract,
  newContract,
  mint,
  split,
  numberToString,
} from '@dfohub/core'

const ocelotMintedEvent = web3Utils.sha3('Minted(uint256,uint256,uint256)')
const ocelotFinalizedEvent = web3Utils.sha3('Finalized(uint256,uint256)')

async function showProposalLoader(
  { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
  initialContext
) {
  var sequentialOps = initialContext.sequentialOps || []
  delete initialContext.sequentialOps

  !initialContext.functionalitySourceId &&
    (initialContext.sourceCode || initialContext.template) &&
    sequentialOps.push({
      name: 'On-Chain Smart Contract Validation',
      description:
        'Deploying a Smart Contract validation, the code will be save in the Ethereum Blockchain via base64. This action is expensive, but in some cases very important.',
      async call(data, bypass) {
        if (bypass) {
          data.functionalitySourceId = '0'
          data.functionalitySourceLocation = VOID_ETHEREUM_ADDRESS
          data.bypassFunctionalitySourceId = true
          return
        }
        data.functionalitySourceId = await mint(
          { web3, context, networkId, ethosEvents },
          split({ context }, data.sourceCode),
          undefined,
          true
        )
        data.editor &&
          data.editor.contentTokenInput &&
          (data.editor.contentTokenInput.value = data.functionalitySourceId)
      },
      bypassable: true,
      async onTransaction(data, transaction) {
        for (var log of transaction.logs) {
          if (
            log.topics[0] === ocelotMintedEvent ||
            log.topics[0] === ocelotFinalizedEvent
          ) {
            data.functionalitySourceId = web3.eth.abi.decodeParameter(
              'uint256',
              log.topics[1]
            )
            data.editor &&
              data.editor.contentTokenInput &&
              (data.editor.contentTokenInput.value = data.functionalitySourceId)
            break
          }
        }
      },
    })
  !initialContext.functionalityAddress &&
    (initialContext.selectedContract ||
      initialContext.template ||
      initialContext.functionalitySourceId ||
      initialContext.sourceCode) &&
    sequentialOps.push({
      name: 'Deploying Smart Contract',
      async call(data) {
        if (
          data.contractName &&
          data.functionalitySourceId &&
          data.selectedSolidityVersion
        ) {
          var code = data.bypassFunctionalitySourceId
            ? data.sourceCode
            : await loadContent(
                { web3, context, networkId },
                data.functionalitySourceId
              )
          var compiled = await getSolidityUtilities().compile(
            code,
            data.selectedSolidityVersion,
            200
          )
          data.selectedContract = compiled[data.contractName]
        }
        var args = [
          data.selectedContract.abi,
          data.selectedContract.bytecode,
          await generateFunctionalityMetadataLink(
            { web3, context, ipfsHttpClient },
            data
          ),
        ]
        data.constructorArguments &&
          Object.keys(data.constructorArguments).map((key) =>
            args.push(data.constructorArguments[key])
          )
        data.functionalityAddress = (
          await createContract.apply(null, [{ web3, context }, ...args])
        ).options.address
        data.editor &&
          data.editor.functionalityAddress &&
          (data.editor.functionalityAddress.value = data.functionalityAddress)
      },
      async onTransaction(data, transaction) {
        data.functionalityAddress = transaction.contractAddress
        data.editor &&
          data.editor.functionalityAddress &&
          (data.editor.functionalityAddress.value = data.functionalityAddress)
      },
    })
  if (initialContext.emergency) {
    var approved = parseInt(
      await blockchainCall(
        { web3, context },
        initialContext.element.token.methods.allowance,
        walletAddress,
        initialContext.element.dFO.options.address
      )
    )
    approved < parseInt(initialContext.element.emergencySurveyStaking) &&
      sequentialOps.push({
        name:
          'Approving ' +
          fromDecimals(
            initialContext.element.emergencySurveyStaking,
            initialContext.element.decimals
          ) +
          ' ' +
          initialContext.element.symbol +
          ' for Emergency Staking',
        async call(data) {
          var approved = parseInt(
            await blockchainCall(
              { web3, context },
              data.element.token.methods.allowance,
              walletAddress,
              data.element.dFO.options.address
            )
          )
          if (approved >= parseInt(data.element.emergencySurveyStaking)) {
            return
          }
          await blockchainCall(
            { web3, context },
            data.element.token.methods.approve,
            initialContext.element.dFO.options.address,
            data.element.emergencySurveyStaking
          )
        },
      })
  }
  sequentialOps.push({
    name: 'Publishing Proposal...',
    async call(data) {
      data.transaction = await blockchainCall(
        { web3, context },
        data.element.dFO.methods.newProposal,
        data.functionalityName || '',
        data.emergency || false,
        getNetworkElement({ context, networkId }, 'defaultOcelotTokenAddress'),
        isNaN(data.functionalitySourceId) ? 0 : data.functionalitySourceId,
        hasEthereumAddress(data.functionalityAddress)
          ? data.functionalityAddress
          : VOID_ETHEREUM_ADDRESS,
        data.functionalitySubmitable ||
          data.functionalityMethodSignature === 'callOneTime(address)',
        data.functionalityMethodSignature || '',
        data.functionalityOutputParameters || '',
        data.functionalityInternal || false,
        data.functionalityNeedsSender || false,
        data.functionalityReplace || ''
      )
      if (!parseInt(data.element.minimumStaking)) {
        ethosEvents.publish('loader/toggle', false)
        ethosEvents.publish('message', 'Proposal Sent!', 'info')
        ethosEvents.publish('section/change', 'Proposals')
      }
    },
    actionName: 'Publish',
  })
  !isNaN(parseInt(initialContext.element.minimumStaking)) &&
    parseInt(initialContext.element.minimumStaking) > 0 &&
    sequentialOps.push({
      name:
        'Sending Initial ' +
        fromDecimals(
          initialContext.element.minimumStaking,
          initialContext.element.decimals
        ) +
        ' ' +
        initialContext.element.symbol +
        ' for Staking',
      async call(data) {
        await blockchainCall(
          { web3, context },
          newContract(
            {
              web3,
            },
            context.propsalAbi,
            data.transaction.events.Proposal.returnValues.proposal
          ).methods.accept,
          numberToString(data.element.minimumStaking)
        )
        ethosEvents.publish('loader/toggle', false)
        ethosEvents.publish('message', 'Proposal Sent!', 'info')
        ethosEvents.publish('section/change', 'Proposals')
      },
      actionName: 'Accept',
    })

  // This is probably not required
  ethosEvents.publish('loader/toggle', [true, sequentialOps, initialContext])
}

export default showProposalLoader
