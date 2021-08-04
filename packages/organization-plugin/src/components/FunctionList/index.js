import React, { useState } from 'react'
import {
  Card,
  Typography,
  Button,
  Chip,
  LinearProgress,
} from '@ethereansos/interfaces-ui'
import { useHistory, useParams } from 'react-router-dom'
import { VOID_ETHEREUM_ADDRESS } from '@ethereansos/interfaces-core'

import { OrganizationPropType } from '../../propTypes'
import { useOrganizationContext } from '../../OrganizationContext'
import Link from '../shared/Link'
import useFetchFunctions from '../../hooks/useFetchFunctions'
import publishProposal from '../ProposalConfirm/actions/publishProposal'
import sendingInitial from '../ProposalConfirm/actions/sendingInitial'

import CardFooter from './CardFooter'
import style from './function-list.module.scss'

function FunctionList({ organization }) {
  const { isEditMode, showProposalModal, closeProposalModal } =
    useOrganizationContext()
  const params = useParams()
  const history = useHistory()
  const { funcNames, isFetching, funcsByName } = useFetchFunctions(organization)

  const [selectedFnName, setSelectedFnName] = useState('')
  const [footerType, setFooterType] = useState('')

  const onProposalSuccess = () => {
    closeProposalModal()
    history.push(`/organizations/${params.address}/governance/proposals`)
  }

  const onDelete = (fnName) => {
    showProposalModal({
      steps:
        !isNaN(parseInt(organization.minimumStaking)) &&
        parseInt(organization.minimumStaking) > 0
          ? [publishProposal, sendingInitial]
          : [publishProposal],
      initialContext: {
        element: organization,
        firstAddress: VOID_ETHEREUM_ADDRESS,
        functionalityReplace: fnName,
      },
      title: `Propose to delete functionality "${fnName}"`,
      onProposalSuccess,
    })
  }

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
              <>
                <Link
                  to={`/organizations/${params.address}/governance/new-proposal`}>
                  <Chip size="small" color="secondary" label="Change" />
                </Link>
                {name !== 'getMinimumBlockNumberForSurvey' &&
                  name !== 'getMinimumBlockNumberForEmergencySurvey' &&
                  name !== 'getEmergencySurveyStaking' &&
                  name !== 'checkSurveyResult' && (
                    <Button
                      text="Delete"
                      onClick={() => onDelete(name)}
                      size="small"
                      color="secondary"
                    />
                  )}
              </>
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
