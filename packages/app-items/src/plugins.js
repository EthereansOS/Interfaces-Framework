import HomePage from './pages/Home'

const initPlugin = ({ addElement }) => {
  addElement('router', {
    index: 10,
    path: '/',
    Component: HomePage,
    exact: true,
    requireConnection: false,
    templateProps: {
      selected: 'create',
      hideHeader: true,
    },
  })
}

const pluginDefinition = {
  name: 'dfo-plugin',
  init: initPlugin,
}

export default pluginDefinition
