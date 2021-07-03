import { useEffect } from 'react'
import { useEthosContext } from '@dfohub/core'

import { useItemContext } from '../ItemContext'

const useCategories = () => {
  const context = useEthosContext()
  const { categories, setCategories } = useItemContext()

  useEffect(() => {
    if (context) {
      let tempCategories = Object.values(context.ethItemFactoryEvents)
      tempCategories = tempCategories
        .filter((item, pos) => tempCategories.indexOf(item) === pos)
        .map((it) => it.split('ABI').join('').split('W').join('Wrapped '))
      tempCategories.push('fLPs')
      return setCategories(tempCategories)
    }
  }, [context, setCategories])

  return {
    categories,
  }
}

export default useCategories
