import checkMandatoryFunctionalityProposalConstraints from './checkMandatoryFunctionalityProposalConstraints'

describe('checkMandatoryFunctionalityProposalConstraints', () => {
  test('With no abi and noMetadata set to true returns no error', async () => {
    const abi = []
    const isOneTime = true
    const noMetadata = true
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([])
  })

  test('With no abi and noMetadata set to false returns 2 error', async () => {
    const abi = []
    const isOneTime = true
    const noMetadata = false
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([
      "Microservices must have a constructor with a string variable called 'metadataLink' as first parameter",
      'Missing mandatory function getMetadataLink() public view returns(string memory)',
    ])
  })

  test('With valid abi and noMetadata set to false it should return no errors', async () => {
    const abi = [
      {
        type: 'constructor',
        inputs: [{ type: 'string', name: 'metadataLink' }],
      },
      {
        type: 'function',
        name: 'getMetadataLink',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'string' }],
      },
      {
        type: 'function',
        name: 'onStart',
        stateMutability: 'anotherMutability',
        inputs: [{ type: 'address' }, { type: 'address' }],
        outputs: [],
      },
      {
        type: 'function',
        name: 'onStop',
        stateMutability: 'anotherMutability',
        inputs: [{ type: 'address' }],
        outputs: [],
      },
    ]
    const isOneTime = false
    const noMetadata = false
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([])
  })

  test('With non valid constructor it should return an error', async () => {
    const abi = [
      {
        type: 'constructor',
        inputs: [{ type: 'string', name: 'nonvalidname' }],
      },
      {
        type: 'function',
        name: 'getMetadataLink',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'string' }],
      },
      {
        type: 'function',
        name: 'onStart',
        stateMutability: 'anotherMutability',
        inputs: [{ type: 'address' }, { type: 'address' }],
        outputs: [],
      },
      {
        type: 'function',
        name: 'onStop',
        stateMutability: 'anotherMutability',
        inputs: [{ type: 'address' }],
        outputs: [],
      },
    ]
    const isOneTime = false
    const noMetadata = false
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([
      "Microservices must have a constructor with a string variable called 'metadataLink' as first parameter",
    ])
  })

  test('With non valid getMetadataLink it should return an error', async () => {
    const abi = [
      {
        type: 'constructor',
        inputs: [{ type: 'string', name: 'metadataLink' }],
      },
      {
        type: 'function',
        name: 'getMetadataLink',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'number' }],
      },
      {
        type: 'function',
        name: 'onStart',
        stateMutability: 'anotherMutability',
        inputs: [{ type: 'address' }, { type: 'address' }],
        outputs: [],
      },
      {
        type: 'function',
        name: 'onStop',
        stateMutability: 'anotherMutability',
        inputs: [{ type: 'address' }],
        outputs: [],
      },
    ]

    const isOneTime = false
    const noMetadata = false
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([
      'Missing mandatory function getMetadataLink() public view returns(string memory)',
    ])
  })

  test('With non valid onStart or onStop it should return an error', async () => {
    const abi = [
      {
        type: 'constructor',
        inputs: [{ type: 'string', name: 'metadataLink' }],
      },
      {
        type: 'function',
        name: 'getMetadataLink',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'string' }],
      },
      {
        type: 'function',
        name: 'onStart',
        stateMutability: 'pure',
        inputs: [{ type: 'address' }, { type: 'address' }],
        outputs: [],
      },
      {
        type: 'function',
        name: 'onStop',
        stateMutability: 'pure',
        inputs: [{ type: 'address' }],
        outputs: [],
      },
    ]

    const isOneTime = false
    const noMetadata = false
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([
      'Missing mandatory function onStart(address,address) public',
      'Missing mandatory function onStop(address) public',
    ])
  })

  test('With non valid onStart or onStop but with oneTime it should return no error', async () => {
    const abi = [
      {
        type: 'constructor',
        inputs: [{ type: 'string', name: 'metadataLink' }],
      },
      {
        type: 'function',
        name: 'getMetadataLink',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'string' }],
      },
      {
        type: 'function',
        name: 'onStart',
        stateMutability: 'pure',
        inputs: [{ type: 'address' }, { type: 'address' }],
        outputs: [],
      },
      {
        type: 'function',
        name: 'onStop',
        stateMutability: 'pure',
        inputs: [{ type: 'address' }],
        outputs: [],
      },
    ]

    const isOneTime = true
    const noMetadata = false
    const errors = checkMandatoryFunctionalityProposalConstraints(
      abi,
      isOneTime,
      noMetadata
    )

    expect(errors).toEqual([])
  })
})
