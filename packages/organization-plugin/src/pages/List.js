import React, { useEffect } from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from '@dfohub/design-system'
import { useWeb3 } from '@dfohub/core'

const List = ({ setTemplateState }) => {
  const { list, updateInfo, loadList } = useWeb3()

  useEffect(() => {
    const run = async () => {
      if (list && Object.keys(list).length) {
        for (const key of Object.keys(list)) {
          const el = list[key]
          if (el.updating || el.updated) {
            continue
          }
          await updateInfo(el)
        }
      }
    }
    run()
  }, [list, updateInfo])

  useEffect(() => {
    loadList()
  }, [])

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'LIST',
      mainMenu: null,
      mainSubMenu: null,
    }))
  }, [setTemplateState])

  return (
    <Card>
      <ul>
        {Object.keys(list).map((key) => {
          const item = list[key]
          return (
            <li key={item.key}>
              Icon: <img src={item.icon} alt="logo" />
              <br />
              Name: {item.name}
              <br />
              Functions: {item.functionalitiesAmount}
              <br />
              Start block: {item.startBlock}
              <br />
              ENS: {(item.ens && item.ens.toLowerCase() + '.') || ''}dfohub.eth
              <br />
              Token: {item.symbol}
              <br />
              Address: {item.dFO.options.address.substring(0, 9) + '...'}
              <Link to={`/organizations/${item.dFO.options.address}`}>
                View
              </Link>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

List.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default List
