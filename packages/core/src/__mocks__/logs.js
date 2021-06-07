import * as context from '../../test-data/context.json'

// https://ropsten.etherscan.io/tx/0xd7d12d630c5f2003a529d4dd0cc3609b8c10f3a8ddcfc841315f7ab70cd8e010
const dfoLogs = [
  {
    address: context.dfoAddressRopsten,
    blockHash:
      '0xaceb2774906ff8534f3555a3ae895265256c40f7ee7c3c783419b8d0b23fcd2f',
    blockNumber: 8011751,
    data: '0x',
    logIndex: 2,
    removed: false,
    topics: [
      '0xf0cd76016a4ee33fe62814f8afd5492f47062ea7615bcc094f2f6fe71b62d1c4',
      '0x000000000000000000000000d5023937a70fa695a09c3f704b293aa71143e2f4',
    ],
    transactionHash:
      '0x938b3e6b2f23fff17ea2de75e23248677ee3a4f0395a5b72fef88e0f355abd91',
    transactionIndex: 0,
    id: 'log_9dba5429',
  },
  {
    address: '0xD5023937a70fA695A09C3f704B293aA71143E2f4',
    blockHash:
      '0x13f43a5dc864d099e71db50c5e4f1996e22c880e6ac8435b73e1825228a4e3b0',
    blockNumber: 8011840,
    data: '0x',
    logIndex: 1,
    removed: false,
    topics: [
      '0xf0cd76016a4ee33fe62814f8afd5492f47062ea7615bcc094f2f6fe71b62d1c4',
      '0x000000000000000000000000b1809ab46e1fded6664bd7aeb514584a82fbf923',
    ],
    transactionHash:
      '0xda935b9af98a9f47620061e8ff46e9f56c444992087c75d080d3a677e4995938',
    transactionIndex: 0,
    id: 'log_bb3e6d6b',
  },
  {
    address: '0xb1809Ab46e1fDeD6664bD7AEb514584A82fbf923',
    blockHash:
      '0x5f967e38a787d5b43e67ba8d0dff019fcf16450dd6b81bf6fa181a572cc6fc1e',
    blockNumber: 8154656,
    data: '0x',
    logIndex: 7,
    removed: false,
    topics: [
      '0xf0cd76016a4ee33fe62814f8afd5492f47062ea7615bcc094f2f6fe71b62d1c4',
      '0x000000000000000000000000088f86764106768860eaec4e218649633c21e5cf',
    ],
    transactionHash:
      '0xc891286d4f6cf68f0440b5c53ab8ae3801710010a6f19cbe40cb039379f288e5',
    transactionIndex: 0,
    id: 'log_e0ea26d8',
  },
  {
    address: '0x088f86764106768860eAEC4E218649633C21e5cF',
    blockHash:
      '0xabef4a9cfb31456f26df6bcb8ad57a7ca24bb99dbc44a91ae0664e27dbfd1209',
    blockNumber: 8287056,
    data: '0x',
    logIndex: 1,
    removed: false,
    topics: [
      '0xf0cd76016a4ee33fe62814f8afd5492f47062ea7615bcc094f2f6fe71b62d1c4',
      '0x000000000000000000000000bc10e5fa6f34799041ae8a320050b1ca833de784',
    ],
    transactionHash:
      '0xd29d73ddac7531588cd20cd25d85238c843683e01211e5d91e329f08a135894e',
    transactionIndex: 0,
    id: 'log_a34ce339',
  },
  {
    address: '0xbc10e5Fa6F34799041ae8a320050B1cA833de784',
    blockHash:
      '0x91dad9cd2200f20a0ed5209e7090b44c9148113bcc1258f7bd2271643e677a7c',
    blockNumber: 8292616,
    data: '0x',
    logIndex: 3,
    removed: false,
    topics: [
      '0xf0cd76016a4ee33fe62814f8afd5492f47062ea7615bcc094f2f6fe71b62d1c4',
      '0x0000000000000000000000005a7902d397b84aacb54fef4b6a38d94146a7bb9a',
    ],
    transactionHash:
      '0xed7184248a137611558e309f843fcdad7c383f53a5cbd37c20778d28c1b0728c',
    transactionIndex: 0,
    id: 'log_691964f4',
  },
]

const allLogs = [...dfoLogs]

const logs = allLogs.reduce((acc, log) => {
  const prev = acc[log.address] || []
  acc[log.address] = [...prev, log]
  return acc
}, {})

export default logs
