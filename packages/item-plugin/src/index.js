import { loadMetadatas } from '@dfohub/core'

import Create from './pages/Create'
import Explore from './pages/Explore'
import Wrap from './pages/Wrap'
import Transfer from './pages/Transfer'
import Farm from './pages/Farm'
import { ItemContextProvider } from './ItemContext'
import loadExcludingCollections from './lib/loadExcludingCollections'
import loadEthItemElementImages from './lib/loadEthItemElementImages'

const initPlugin = ({ addElement }) => {
  addElement('globalContexts', {
    name: 'ItemContextProvider',
    Component: ItemContextProvider,
    index: 10,
  })

  addElement('router', {
    index: 10,
    path: '/explore',
    Component: Explore,
    exact: true,
    requireConnection: true,
  })
  addElement('router', {
    index: 20,
    path: '/create',
    Component: Create,
    exact: true,
    requireConnection: true,
  })
  addElement('router', {
    index: 30,
    path: '/wrap',
    Component: Wrap,
    exact: true,
    requireConnection: true,
  })
  addElement('router', {
    index: 30,
    path: '/transfer',
    Component: Transfer,
    exact: true,
    requireConnection: true,
  })
  addElement('router', {
    index: 30,
    path: '/farm',
    Component: Farm,
    exact: true,
    requireConnection: true,
  })

  addElement('appMenu', {
    name: 'explore',
    label: 'Explore',
    link: '/explore',
    index: 10,
  })

  addElement('appMenu', {
    name: 'create',
    label: 'Create',
    link: '/create',
    index: 20,
  })

  addElement('appMenu', {
    name: 'wrap',
    label: 'Wrap',
    link: '/wrap',
    index: 30,
  })

  addElement('appMenu', {
    name: 'transfer',
    label: 'Transfer',
    link: '/transfer',
    index: 40,
  })

  addElement('appMenu', {
    name: 'farm',
    label: 'Farm',
    link: '/farm',
    index: 50,
  })

  addElement('web3/afterInit', {
    fn: loadExcludingCollections,
    index: 10,
  })
  addElement('web3/afterInit', {
    fn: loadEthItemElementImages,
    index: 20,
  })
  addElement('web3/afterInit', {
    fn: loadMetadatas,
    index: 30,
  })
}

const pluginDefinition = {
  name: 'item-plugin',
  init: initPlugin,
}

export default pluginDefinition
