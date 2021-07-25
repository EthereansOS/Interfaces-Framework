import Home from './pages/Home'
import Farm from './pages/Farm'
import Inflation from './pages/Inflation'
import Wusd from './pages/Wusd'
import Bazar from './pages/Bazar'
import Craft from './pages/Craft'
import Grimoire from './pages/Grimoire'
import Convenants from './pages/Covenants'

const initPlugin = ({ addElement }) => {
  addElement('router', {
    index: 10,
    path: '/',
    Component: Home,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/farm',
    Component: Farm,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/inflation',
    Component: Inflation,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/wusd',
    Component: Wusd,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/bazar',
    Component: Bazar,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/craft',
    Component: Craft,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/grimoire',
    Component: Grimoire,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
  addElement('router', {
    index: 20,
    path: '/covenants',
    Component: Convenants,
    exact: true,
    requireConnection: false,
    templateProps: {
      menuName: 'appMenu',
      isDapp: false,
    },
  })
}

const appPlugin = {
  name: 'app-plugin',
  init: initPlugin,
}

export default appPlugin
