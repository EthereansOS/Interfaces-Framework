import React, { useContext, useState, useCallback } from 'react'
import T from 'prop-types'

import useItemContracts from './hooks/useItemContracts'

const ItemContext = React.createContext('item-collections')

export const ItemContextProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [items, setItems] = useState()
  const {
    contracts,
    contractStatus,
    CONTRACT_STATUS_INIT,
    CONTRACT_STATUS_ON_INIT,
    CONTRACT_STATUS_NEW,
  } = useItemContracts()
  const [itemsLoading, setItemsLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const setEditMode = useCallback(() => setIsEditMode(true), [setIsEditMode])
  const setViewMode = useCallback(() => setIsEditMode(false), [setIsEditMode])

  const contextValue = {
    isEditMode,
    setEditMode,
    setViewMode,
    setItems,
    items,
    itemsLoading,
    setItemsLoading,
    categories,
    setCategories,
    contracts,
    contractStatus,
    CONTRACT_STATUS_INIT,
    CONTRACT_STATUS_ON_INIT,
    CONTRACT_STATUS_NEW,
  }

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  )
}

ItemContextProvider.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}

export const useItemContext = () => {
  const context = useContext(ItemContext)
  if (context === null) {
    console.warn('The ItemContext should be used inside a ItemContextProvider')
  }
  return context
}
