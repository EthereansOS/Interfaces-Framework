import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { Card, Typography } from '@dfohub/design-system'

import useItems from '../hooks/useItems'
import useCategories from '../hooks/useCategories'
import CategoryBar from '../components/CategoryBar'
import ItemListElement from '../components/ItemListElement'

import pageStyle from './pages.module.scss'

const disclaimers = {
  Native:
    'Native ITEMs are collections of objects on top of Ethereum built as ITEMs natively. The ITEM Standard makes these objects interoperable across all of the Ethereum Network using both the ERC20 Interface and the ERC1155 Interface. Native ITEMs can also perform complex behaviors specified optionally via their Extension. These extra capabilities are up to the developers writing the Extension logic. For more Info, read the ITEM Documentation.',
  'Wrapped 1155':
    "Wrapped ERC1155 ITEMs are ERC1155 NFTs Wrapped into the ITEM Standard. Wrapped ERC1155, retain all the capabilities of the default ITEM standard, but lose any extra ones while wrapped. For example, once wrapped, The NFT can't be used in a specific Game, if any until unwrapped (if not explicitly programmed in the application), but can still be used like any ITEM as an interoperable Object in every DeFi application via its Interoperable Interface (ERC20).",
  'Wrapped 721':
    "Wrapped ERC721 ITEMs are ERC721 NFTs Wrapped into the ITEM Standard. Wrapped ERC721, retain all the capabilities of the default ITEM standard, but lose any extra ones while wrapped. For example, once wrapped, The NFT can't be used in a specific Game, if any until unwrapped (if not explicitly programmed in the application), but can still be used like any ITEM as an interoperable Object in every DeFi application via its Interoperable Interface (ERC20).",
  'Wrapped 20':
    'Wrapped ERC20 ITEMs are ERC20 Tokens Wrapped into the ITEM Standard. Wrapped ERC20, retain all the capabilities of the default ITEM standard, but lose any extra ones while wrapped. For example, once wrapped, A DAO or DFO governance token cannot interact with the DAO or DFO (until unwrapped, if not explicitly programmed) but can still be used like any ITEM using a gas-efficient method like BatchTransfer.',
  fLPs: 'Covenants Farming LP Tokens Collection are Native ITEMs minted for Locked Setups. The Liquidity Pool stored in Locked Setups remains liquid to the owner via the fLP token. These tokens correspond 1:1 with the quantity of LP tokens locked and can be redeemed anytime after the end block of a Locked Farming Setup.',
}

const Explore = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      selected: 'explore',
    }))
  }, [setTemplateState])

  const { items } = useItems()
  const { categories } = useCategories()

  const [category, setCategory] = useState(categories ? categories[0] : null)

  useEffect(() => {
    categories && setCategory(categories[0])
  }, [categories, setCategory])

  return (
    <div className={pageStyle.root}>
      <div className={pageStyle.navigator}>
        {category && (
          <CategoryBar
            categories={categories}
            selected={category}
            onClick={setCategory}
          />
        )}
      </div>
      {disclaimers[category] && (
        <Card
          className={pageStyle.disclaimer}
          contentClassName={pageStyle.disclaimerContent}>
          <Typography variant={'body2'}>{disclaimers[category]}</Typography>
        </Card>
      )}
      <div className={pageStyle.itemList}>
        {items?.map((item, index) => (
          <div className={pageStyle.itemContainer} key={item.key}>
            <ItemListElement
              {...item}
              tabIndex={categories?.length + index}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

Explore.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Explore
