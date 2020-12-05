import ListPage from './pages/ListPage'

const initPlugin = ({ addElement }) => {
  addElement('menu', {
    name: 'list',
    label: 'List',
    link: '/list',
    index: 30,
  })
  addElement('router', {
    index: 20,
    path: '/list',
    Component: ListPage,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'list',
      showMenu: true,
    },
  })
}

const pluginDefinition = {
  name: 'list-page-plugin',
  init: initPlugin,
}

export default pluginDefinition
