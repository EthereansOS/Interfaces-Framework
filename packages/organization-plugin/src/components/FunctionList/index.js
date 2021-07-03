import React, { useState, useEffect } from 'react'
import { useWeb3 } from '@dfohub/core'
import { Card, Typography, Button, Link } from '@dfohub/design-system'
import pLimit from 'p-limit'

import { OrganizationPropType } from '../../propTypes'

import CardFooter from './CardFooter'
import style from './function-list.module.scss'

const limit = pLimit(10)
function FunctionList({ organization }) {
  const { loadFunctionalityNames, loadFunctionality } = useWeb3()

  const [funcNames, setFuncNames] = useState([])
  const [funcsByName, setFuncsByName] = useState({})
  const [selectedFnName, setSelectedFnName] = useState('')
  const [footerType, setFooterType] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const names = await loadFunctionalityNames(organization)
        setFuncNames(names)

        Promise.all(
          names.map((funcName) =>
            limit(async () => {
              const func = await loadFunctionality(funcName, organization)
              setFuncsByName((fns) => ({ ...fns, [funcName]: func }))
            })
          )
        )
      } catch (e) {
        console.log('Error fetching functionalities', e)
      }
    }

    if (organization?.functionalitiesManager) {
      fetch()
    }
  }, [organization])

  return funcNames.map((name) => (
    <Card
      className={style.card}
      footerClassName={style.codeFooter}
      contentClassName={style.cardContentContainer}
      Footer={
        funcsByName[name] && (
          <CardFooter
            footerType={footerType}
            selectedFnName={selectedFnName}
            name={name}
            fn={funcsByName[name]}
            organization={organization}
          />
        )
      }>
      <div className={style.titleContainer}>
        <Typography variant="h4">
          <span role="img" aria-label="function" style={{ marginRight: 12 }}>
            🛠️
          </span>
        </Typography>
        <Typography variant="h5" color="primary" className={style.title}>
          {name}
        </Typography>
      </div>

      <div
        className={style.descriptionContainer}
        dangerouslySetInnerHTML={{ __html: funcsByName[name]?.description }}
      />
      <div className={style.actionsContainer}>
        <Button
          size="small"
          text="Code"
          onClick={() => {
            setSelectedFnName(name)
            setFooterType('code')
          }}
          color="tertiary"
        />
        <Button
          size="small"
          text="Query"
          onClick={() => {
            setSelectedFnName(name)
            setFooterType('query')
          }}
          color="tertiary"
        />
        <Link
          style={{ fontSize: 12 }}
          target="_blank"
          rel="noreferrer"
          href={'https://etherscan.io/address/' + funcsByName[name]?.location}>
          Contract
        </Link>
      </div>
    </Card>
  ))
}

export default FunctionList

FunctionList.propTypes = {
  organization: OrganizationPropType,
}