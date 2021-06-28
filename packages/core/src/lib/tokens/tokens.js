import Label from '../../../../design-system/src/Select/label'

import IconEth from './eth.png'
import IconGeneric from './generic.png'

// TODO: define the value shape to send with the select
export const TOKENS = [
  {
    symbol: 'ETH',
    image: <img src={IconEth} alt="ethereum"></img>,
    label: <Label tokenName="Ethereum" tokenImage={IconEth} />,
    value: 'ethereum',
  },
  {
    symbol: 'TOK',
    image: <img src={IconGeneric} alt="token"></img>,
    label: <Label tokenName="Token" tokenImage={IconGeneric} />,
    value: 'token',
  },
]
