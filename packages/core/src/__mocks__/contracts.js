import * as context from '../../test-data/context.json'

const createContractMethod = (stateMutability, returnedAddress) => {
  // we need to call apply on this
  return function () {
    const fun = function (opts) {
      return returnedAddress
    }
    fun._method = { stateMutability }
    return fun
  }
}

const contracts = {
  [context.uniSwapV2RouterAddress]: {
    methods: {
      // We cannot use a jest.fn here because this is invoked with apply
      WETH: createContractMethod(
        'view',
        '0xc778417E063141139Fce010982780140Aa0cD5Ab'
      ),
    },
  },
  '0x5a7902D397b84Aacb54Fef4b6A38d94146A7bb9a': {
    methods: {
      getToken: createContractMethod(
        'view',
        '0x5873Fae0Eb15C27C5724ddd10651e8E3901C89F2'
      ),
    },
    options: [],
  },

  '0x5873Fae0Eb15C27C5724ddd10651e8E3901C89F2': {
    // Voting Token
    methods: {
      name: createContractMethod('view', 'TEST'),
    },
  },
}

export default contracts
