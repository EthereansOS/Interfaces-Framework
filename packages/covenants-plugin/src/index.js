import FarmDapp from './pages/Farm'
import InflationDapp from './pages/Inflation'
import WusdDapp from './pages/Wusd'
import BazarDapp from './pages/Bazar'
import CraftDapp from './pages/Craft'

const initPlugin = ({ addElement }) => {
  addElement('router', {
    index: 20,
    path: '/farm/dapp',
    Component: FarmDapp,
    exact: true,
    requireConnection: true,
    templateProps: {
      menuName: 'appMenu',
      isDapp: true,
    },
  })
  addElement('router', {
    index: 20,
    path: '/inflation/dapp',
    Component: InflationDapp,
    exact: true,
    requireConnection: true,
    templateProps: {
      menuName: 'appMenu',
      isDapp: true,
    },
  })
  addElement('router', {
    index: 20,
    path: '/wusd/dapp',
    Component: WusdDapp,
    exact: true,
    requireConnection: true,
    templateProps: {
      menuName: 'appMenu',
      isDapp: true,
    },
  })
  addElement('router', {
    index: 20,
    path: '/bazar/dapp',
    Component: BazarDapp,
    exact: true,
    requireConnection: true,
    templateProps: {
      menuName: 'appMenu',
      isDapp: true,
    },
  })
  addElement('router', {
    index: 20,
    path: '/craft/dapp',
    Component: CraftDapp,
    exact: true,
    requireConnection: true,
    templateProps: {
      menuName: 'appMenu',
      isDapp: true,
    },
  })

  addElement('appMenu', {
    name: 'farm',
    label: 'Farm',
    link: '/farm',
    dappLink: '/farm/dapp',
    index: 20,
  })
  addElement('appMenu', {
    name: 'inflation',
    label: 'Inflation',
    link: '/inflation',
    dappLink: '/inflation/dapp',
    index: 30,
  })
  addElement('appMenu', {
    name: 'wusd',
    label: 'WUSD',
    link: '/wusd',
    dappLink: '/wusd/dapp',
    index: 40,
  })
  addElement('appMenu', {
    name: 'bazar',
    label: 'Bazar',
    link: '/bazar',
    dappLink: '/bazar/dapp',
    index: 50,
  })
  addElement('appMenu', {
    name: 'craft',
    label: 'Craft',
    link: '/craft',
    dappLink: '/craft/dapp',
    index: 60,
  })
  addElement('appMenu', {
    name: 'grimoire',
    label: 'Grimoire',
    link: '/grimoire',
    dappLink: '/grimoire',
    index: 70,
  })
  addElement('appMenu', {
    name: 'covenants',
    label: 'Covenants',
    link: '/covenants',
    dappLink: '/covenants',
    index: 80,
  })
}

const covenantsPlugin = {
  name: 'covenants-plugin',
  init: initPlugin,
}

export default covenantsPlugin
