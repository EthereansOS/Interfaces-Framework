import Overview from './pages/Overview'
import DappState from './pages/DappState'
import DappFunctions from './pages/DappFunctions'
import DeFiWallet from './pages/DeFiWallet'
import DeFiFarming from './pages/DeFiFarming'
import DeFiToken from './pages/DeFiToken'
import Governance from './pages/Governance'
import OrganizationInfo from './components/OrganizationInfo'
import DecentralizedApplication from './components/DecentralizedApplication'
import RulesAndFunds from './components/RulesAndFunds'
import List from './pages/List'
import { OrganizationContextProvider } from './OrganizationContext'
import EditMetadata from './pages/EditMetadata'

const initPlugin = ({ addElement }) => {
  addElement('globalContexts', {
    name: 'OrganizationContextProvider',
    Component: OrganizationContextProvider,
    index: 10,
  })

  addElement('organizationMenu', {
    name: 'overview',
    label: 'Overview',
    link: '/organizations/{{address}}',
    index: 10,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address',
    Component: Overview,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'overview',
      showMenu: true,
      showSubMenu: false,
      showBeforeMenu: true,
    },
  })

  addElement('organizationMenu', {
    name: 'dapp',
    label: 'Dapp',
    link: '/organizations/{{address}}/dapp/functions',
    index: 20,
  })

  addElement('organizationSubMenuDapp', {
    name: 'functions',
    label: 'Functions',
    link: '/organizations/{{address}}/dapp/functions',
    index: 10,
  })

  addElement('organizationSubMenuDapp', {
    name: 'state',
    label: 'State',
    link: '/organizations/{{address}}/dapp/state',
    index: 20,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/dapp/state',
    Component: DappState,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'dapp/state',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('router', {
    index: 25,
    path: '/organizations/:address/dapp/functions',
    Component: DappFunctions,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'dapp/functions',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('organizationMenu', {
    name: 'defi',
    label: 'DeFi',
    link: '/organizations/{{address}}/defi/wallet',
    index: 20,
  })
  addElement('organizationSubMenuDeFi', {
    name: 'wallet',
    label: 'Wallet',
    link: '/organizations/{{address}}/defi/wallet',
    index: 10,
  })
  addElement('organizationSubMenuDeFi', {
    name: 'token',
    label: 'Token',
    link: '/organizations/{{address}}/defi/token',
    index: 20,
  })
  addElement('organizationSubMenuDeFi', {
    name: 'farming',
    label: 'Farming',
    link: '/organizations/{{address}}/defi/farming',
    index: 30,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/defi/wallet',
    Component: DeFiWallet,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'defi/wallet',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('router', {
    index: 25,
    path: '/organizations/:address/defi/token',
    Component: DeFiToken,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'defi/token',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('router', {
    index: 30,
    path: '/organizations/:address/defi/farming',
    Component: DeFiFarming,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'defi/farming',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('organizationMenu', {
    name: 'governance',
    label: 'Governance',
    link: '/organizations/{{address}}/governance',
    index: 35,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/governance',
    Component: Governance,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'governance',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('organizationOverview', {
    key: 'organizationInfo',
    index: 10,
    Component: OrganizationInfo,
  })

  addElement('organizationOverview', {
    key: 'decentralizedApplication',
    index: 20,
    Component: DecentralizedApplication,
  })

  addElement('organizationOverview', {
    key: 'rulesAndFunds',
    index: 30,
    Component: RulesAndFunds,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/edit',
    Component: EditMetadata,
    exact: true,
    requireConnection: true,
    templateProps: {
      showBeforeMenu: true,
    },
  })

  addElement('router', {
    index: 20,
    path: '/list',
    Component: List,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'list',
      showMenu: false,
      showSubMenu: false,
      showBeforeMenu: false,
    },
  })
}

const pluginDefinition = {
  name: 'dfo-organization-plugin',
  init: initPlugin,
}

export default pluginDefinition
