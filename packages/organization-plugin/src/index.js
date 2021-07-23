import Overview from './pages/Overview'
import DappState from './pages/DappState'
import DappFunctions from './pages/DappFunctions'
import DeFiWallet from './pages/DeFiWallet'
import DeFiFarming from './pages/DeFiFarming'
import DeFiToken from './pages/DeFiToken'
import GovernanceRulesPage from './pages/GovernanceRules'
import GovernanceProposals from './pages/GovernanceProposals'
import GovernanceNewProposal from './pages/GovernanceNewProposal'
import OrganizationInfo from './components/OrganizationInfo'
import DecentralizedApplication from './components/DecentralizedApplication'
import RulesAndFunds from './components/RulesAndFunds'
import GovernanceRules from './components/GovernanceRules'
import List from './pages/List'
import { OrganizationContextProvider } from './OrganizationContext'
import FunctionList from './components/FunctionList'
import StateList from './components/StateList'
import VotingToken from './components/VotingToken'
import DexLiquidity from './components/DexLiquidity'
import BalanceList from './components/BalanceList'
import NewOrganization from './pages/NewOrganization'
import NewSubdomain from './components/NewOrganizationSteps/NewSubdomain'
import NewVotingToken from './components/NewOrganizationSteps/NewVotingToken'
import NewGovernanceRules from './components/NewOrganizationSteps/NewGovernanceRules'
import NewMetadata from './components/NewOrganizationSteps/NewMetadata'

const initPlugin = ({ addElement }) => {
  addElement('globalContexts', {
    name: 'OrganizationContextProvider',
    Component: OrganizationContextProvider,
    index: 10,
  })

  addElement('router', {
    index: 0,
    path: '/organizations/new',
    Component: NewOrganization,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'new',
      showMenu: false,
      showSubMenu: false,
      showBeforeMenu: false,
    },
  })

  addElement('organizationNewOrganization', {
    key: 'subdomain',
    index: 10,
    Component: NewSubdomain,
  })

  addElement('organizationNewOrganization', {
    key: 'newOrganization',
    index: 20,
    Component: NewVotingToken,
  })

  addElement('organizationNewOrganization', {
    key: 'newOrganization',
    index: 30,
    Component: NewGovernanceRules,
  })

  addElement('organizationNewOrganization', {
    key: 'newOrganization',
    index: 40,
    Component: NewMetadata,
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
    link: '/organizations/{{address}}/governance/rules',
    index: 35,
  })
  addElement('organizationSubMenuGovernance', {
    name: 'rules',
    label: 'Rules',
    link: '/organizations/{{address}}/governance/rules',
    index: 10,
  })
  addElement('organizationSubMenuGovernance', {
    name: 'proposals',
    label: 'Proposals',
    link: '/organizations/{{address}}/governance/proposals',
    index: 20,
  })
  addElement('organizationSubMenuGovernance', {
    name: 'newProposals',
    label: 'New Proposal',
    link: '/organizations/{{address}}/governance/new-proposals',
    index: 30,
  })

  addElement('router', {
    index: 20,
    path: '/organizations/:address/governance/rules',
    Component: GovernanceRulesPage,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'governance/rules',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('router', {
    index: 25,
    path: '/organizations/:address/governance/proposals',
    Component: GovernanceProposals,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'governance/proposals',
      showMenu: true,
      showSubMenu: true,
      showBeforeMenu: true,
    },
  })

  addElement('router', {
    index: 30,
    path: '/organizations/:address/governance/new-proposals',
    Component: GovernanceNewProposal,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'governance/newProposals',
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

  addElement('organizationGovernanceRules', {
    key: 'governanceRules',
    index: 10,
    Component: GovernanceRules,
  })

  addElement('organizationDappFunctions', {
    key: 'functionList',
    index: 10,
    Component: FunctionList,
  })

  addElement('organizationDappState', {
    key: 'statelist',
    index: 10,
    Component: StateList,
  })

  addElement('organizationDeFiToken', {
    key: 'votingToken',
    index: 10,
    Component: VotingToken,
  })

  addElement('organizationDeFiToken', {
    key: 'dexLiquidity',
    index: 20,
    Component: DexLiquidity,
  })

  addElement('organizationDeFiWallet', {
    key: 'balanceList',
    index: 20,
    Component: BalanceList,
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
