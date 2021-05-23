import Overview from './pages/Overview'
import Dapp from './pages/Dapp'
import DeFi from './pages/DeFi'
import Governance from './pages/Governance'
import OrganizationInfo from './components/OrganizationInfo'
import DecentralizedApplication from './components/DecentralizedApplication'
import RulesAndFunds from './components/RulesAndFunds'
import List from './pages/List'

const initPlugin = ({ addElement }) => {
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
    },
  })

  addElement('organizationMenu', {
    name: 'dapp',
    label: 'Dapp',
    link: '/organizations/{{address}}/dapp',
    index: 20,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/dapp',
    Component: Dapp,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'dapp',
      showMenu: true,
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
      showMenu: true,
    },
  })
}

const pluginDefinition = {
  name: 'dfo-organization-plugin',
  init: initPlugin,
}

export default pluginDefinition
