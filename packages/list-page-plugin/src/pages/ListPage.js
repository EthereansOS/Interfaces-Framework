import React, { useEffect } from 'react'
import { Card } from '@dfohub/design-system'
import { useWeb3 } from '@dfohub/core'

const ListPage = ({ setTemplateState }) => {
  const { list, updateInfo } = useWeb3()

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
    setTemplateState((s) => ({ ...s, headerTitle: 'LIST' }))
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
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default ListPage
