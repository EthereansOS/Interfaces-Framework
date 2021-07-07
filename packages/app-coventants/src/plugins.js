import HomePage from './pages/Home'
import FarmPage from './pages/Farm'
import InflationPage from './pages/Inflation'
import WusdPage from './pages/Wusd'
import BazarPage from './pages/Bazar'
import CraftPage from './pages/Craft'
import GrimoirePage from './pages/Grimoire'
import ConvenantsPage from './pages/Covenants'

const initPlugin = ({ addElement }) => {
  addElement('router', {
    index: 10,
    path: '/',
    Component: HomePage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/farm',
    Component: FarmPage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/inflation',
    Component: InflationPage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/wusd',
    Component: WusdPage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/bazar',
    Component: BazarPage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/craft',
    Component: CraftPage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/grimoire',
    Component: GrimoirePage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('router', {
    index: 20,
    path: '/covenants',
    Component: ConvenantsPage,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
    },
  })
  addElement('appMenu', {
    name: 'farm',
    label: 'Farm',
    link: '/farm',
    index: 20,
  })
  addElement('appMenu', {
    name: 'inflation',
    label: 'Inflation',
    link: '/inflation',
    index: 30,
  })
  addElement('appMenu', {
    name: 'wusd',
    label: 'WUSD',
    link: '/wusd',
    index: 40,
  })
  addElement('appMenu', {
    name: 'bazar',
    label: 'Bazar',
    link: '/bazar',
    index: 50,
  })
  addElement('appMenu', {
    name: 'craft',
    label: 'Craft',
    link: '/craft',
    index: 60,
  })
  addElement('appMenu', {
    name: 'grimoire',
    label: 'Grimoire',
    link: '/grimoire',
    index: 70,
  })
  addElement('appMenu', {
    name: 'covenants',
    label: 'Covenants',
    link: '/covenants',
    index: 80,
  })
}

const pluginDefinition = {
  name: 'dfo-plugin',
  init: initPlugin,
}

export default pluginDefinition
