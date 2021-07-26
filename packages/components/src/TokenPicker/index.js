import React, { useMemo } from 'react'
import { Select } from '@dfohub/design-system'
import T from 'prop-types'
import {
  useLoadUniswapPairs,
  useEthosContext,
  useWeb3,
} from '@ethereansos/interfaces-core'
import { useField, useFormikContext } from 'formik'

import style from './token-picker.module.scss'

const TokenPicker = ({ tokenAddress, id, name }) => {
  const { networkId, web3, web3ForLogs } = useWeb3()
  const context = useEthosContext()

  const [{ onChange, ...field }] = useField({ id, name })
  const { setFieldValue } = useFormikContext()

  const uniswapPairs = useLoadUniswapPairs(
    { web3, context, networkId, web3ForLogs },
    tokenAddress,
    undefined
  )

  const options = useMemo(
    () =>
      uniswapPairs.map((pair) => ({
        id: pair.address,
        label: `${pair.name} ${pair.symbol}`,
      })),
    [uniswapPairs]
  )

  return (
    <Select
      id="token"
      name="token"
      options={options}
      valueKey="token"
      containerClassName={style.root}
      {...field}
      onSelect={(id, value) => {
        setFieldValue(id, value)
      }}
    />
  )
}

TokenPicker.propTypes = {
  tokenAddress: T.string,
  id: T.string,
  name: T.string,
}

export default TokenPicker
