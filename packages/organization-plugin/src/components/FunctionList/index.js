import React, { useState, useEffect } from 'react'
import {
  useWeb3,
  useEthosContext,
  loadFunctionalityNames,
  loadFunctionality,
} from '@ethereansos/interfaces-core'
import {
  Card,
  Typography,
  Button,
  Chip,
  Link,
  LinearProgress,
} from '@dfohub/design-system'
import PQueue from 'p-queue'
import { useParams } from 'react-router-dom'

import { OrganizationPropType } from '../../propTypes'
import { useOrganizationContext } from '../../OrganizationContext'

import CardFooter from './CardFooter'
import style from './function-list.module.scss'

const queue = new PQueue({ concurrency: 20 })

function FunctionList({ organization }) {
  const { web3, networkId } = useWeb3()
  const context = useEthosContext()
  const { isEditMode } = useOrganizationContext()
  const params = useParams()

  const [funcNames, setFuncNames] = useState([])
  const [funcsByName, setFuncsByName] = useState({})
  const [selectedFnName, setSelectedFnName] = useState('')
  const [footerType, setFooterType] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        setIsFetching(true)
        const names = await loadFunctionalityNames(
          { web3, context },
          organization
        )
        setFuncNames(names)

        names.forEach((funcName) =>
          queue.add(async () => {
            const func = await loadFunctionality(
              { web3, context, networkId },
              funcName,
              organization
            )
            setFuncsByName((fns) => ({ ...fns, [funcName]: func }))
          })
        )
      } catch (e) {
        console.log('Error fetching functionalities', e)
      } finally {
        setIsFetching(false)
      }
    }

    if (organization?.functionalitiesManager) {
      fetchFunctions()
    }
  }, [organization, context, networkId, web3])

  return (
    <>
      {funcNames.map((name) => (
        <Card
          className={selectedFnName !== name && style.card}
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
              <span
                role="img"
                aria-label="function"
                style={{ marginRight: 12 }}>
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
            {isEditMode && (
              <Link
                to={`/organizations/${params.address}/governance/new-proposal`}>
                <Chip size="small" color="secondary" label="Change" />
              </Link>
            )}
            <Link
              style={{ fontSize: 12 }}
              target="_blank"
              rel="noreferrer"
              href={
                'https://etherscan.io/address/' + funcsByName[name]?.location
              }>
              Contract
            </Link>
          </div>
        </Card>
      ))}
      {isFetching && <LinearProgress />}
    </>
  )
}

export default FunctionList

FunctionList.propTypes = {
  organization: OrganizationPropType,
}
