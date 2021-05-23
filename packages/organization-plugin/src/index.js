import Overview from './pages/Overview'
import DappState from './pages/DappState'
import DappFunctions from './pages/DappFunctions'
import DeFi from './pages/DeFi'
import Governance from './pages/Governance'
import OrganizationInfo from './components/OrganizationInfo'
import DecentralizedApplication from './components/DecentralizedApplication'
import RulesAndFunds from './components/RulesAndFunds'
import List from './pages/List'
import { OrganizationContextProvider } from './OrganizationContext'

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
    link: '/organizations/{{address}}/defi',
    index: 30,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/defi',
    Component: DeFi,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'defi',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('organizationMenu', {
    name: 'governance',
    label: 'Governance',
    link: '/organizations/{{address}}/governance',
    index: 30,
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
