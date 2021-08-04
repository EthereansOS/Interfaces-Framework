import {
  Formik,
  Form,
  FileField,
  Field,
  SnackBar,
} from '@ethereansos/interfaces-ui'
import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useEthosContext, extractComment } from '@ethereansos/interfaces-core'
import { useHistory, useParams } from 'react-router-dom'

import { useOrganizationContext } from '../../OrganizationContext'
import { OrganizationPropType } from '../../propTypes'
import onChainSmartContractValidation from '../ProposalConfirm/actions/onChainSmartContractValidation'
import deploySmartContract from '../ProposalConfirm/actions/deploySmartContract'
import publishProposal from '../ProposalConfirm/actions/publishProposal'

import style from './new-proposal-form.module.scss'
import {
  checkData,
  getContractsFromCode,
  newProposalInitialValues,
} from './newProposalUtils'
import SolidityVersionPicker from './SolidityVersionPicker'
import Sidebar from './Sidebar'

const NewProposalForm = ({ organization }) => {
  const [compiled, setCompiled] = useState(false)
  const context = useEthosContext()
  const { showProposalModal, closeProposalModal } = useOrganizationContext()
  const history = useHistory()
  const params = useParams()
  const [snackContent, setSnackContent] = useState()

  const [contractNames, setContractNames] = useState([])
  const [contractMethods, setContractMethods] = useState([])
  const [codeContracts, setCodeContracts] = useState([])

  // TODO This has no use yet, maps to the old this.contractConstructor
  // const [contractConstructor, setContractConstructor] = useState()

  const onProposalSuccess = () => {
    closeProposalModal()
    history.push(`/organizations/${params.address}/governance/proposals`)
  }

  const validate = (values) => {
    const errors = {}

    errors.functionalityInternal = true
    errors.functionalityNeedsSender = true

    if (
      !Object.keys(codeContracts).length ||
      !values.functionalityMethodSignature
    ) {
      return errors
    }

    const methodSignatureName =
      values.functionalityMethodSignature.split('_')[1]

    errors.functionalityInternal =
      methodSignatureName === 'callOneTime(address)'

    const funct = (
      codeContracts.name ? codeContracts : codeContracts[values.contractName]
    ).abi[values.functionalityMethodSignature.split('_')[0]]

    const isSubmitable =
      funct.stateMutability !== 'view' && funct.stateMutability !== 'pure'

    if (isSubmitable && funct.inputs.length >= 2) {
      errors.functionalityNeedsSender =
        funct.inputs[0].type !== 'address' || funct.inputs[1].type !== 'uint256'
    }
    if (!isSubmitable && funct.inputs.length >= 1) {
      errors.functionalityNeedsSender = funct.inputs[0].type !== 'address'
    }

    return errors
  }

  const compile = async (values, form, optimization) => {
    form.setSubmitting(true)
    setSnackContent({ message: 'compiling', type: 'warning' })

    const comments = extractComment({ context }, values.sourceCode)
    Object.keys(comments).forEach((section) => {
      if (section === 'Description') {
        form.setFieldValue('functionalityDescription', comments[section])
      } else if (section === 'Discussion') {
        form.setFieldValue('functionalityLink', comments[section])
      } else if (section === 'Update') {
        form.setFieldValue('functionalityDescriptionUpdate', comments[section])
      }
    })

    try {
      const { contracts, solidityVersion } = await getContractsFromCode(
        values,
        optimization
      )
      if (solidityVersion) {
        form.setFieldValue('solidityVersion', solidityVersion)
      }
      if (contracts) {
        setCodeContracts(contracts)
        setContractNames([])

        const names = contracts.name
          ? [{ id: contracts.name, label: contracts.name }]
          : Object.keys(contracts)
              .filter((name) => contracts[name].bytecode !== '0x')
              .map((name) => ({ id: name, label: name }))

        setContractNames(names)
        form.setFieldValue('contractName', names?.[0]?.id)
        setCompiled(true)
      } else {
        setContractMethods([])
      }
      setSnackContent()
    } catch (e) {
      setSnackContent({
        message:
          typeof e === 'string'
            ? e
            : e?.message || 'error compiling the contract',
        type: 'error',
      })
      console.log('error compiling the new proposal', e)
    }
    form.setSubmitting(false)
  }

  const publish = async (values, form) => {
    form.setSubmitting(true)
    try {
      const formValues = checkData(
        {
          ...values,
          selectedContract: codeContracts[values.contractName],
        },
        form.errors
      )
      if (!formValues) {
        throw new Error()
      }
      const proposalContext = {
        initialContext: {
          ...formValues,
          element: organization,
          sourceCode: values.sourceCode?.trim?.(),
          functionalityAddress: values.functionalityAddressValue,
        },
        onProposalSuccess,
        title: 'New Proposal',
        steps: [
          onChainSmartContractValidation,
          deploySmartContract,
          publishProposal,
        ],
      }

      // TODO what is this?
      // data.functionalitySourceId = context.view.editor.contentTokenValue;

      showProposalModal(proposalContext)
    } catch (e) {
      setSnackContent({
        message:
          typeof e === 'string'
            ? e
            : e?.message || 'error publishing the contract',
        type: 'error',
      })
      console.log('error publishing the new proposal', e)
    }
    form.setSubmitting(false)
  }

  return (
    <>
      <Formik validate={validate} initialValues={newProposalInitialValues}>
        {({ resetForm, values, setSubmitting, setFieldValue, errors }) => (
          <Form className={style.form}>
            <article className={style.root}>
              <div className={style.leftColumn}>
                <div className={style.toolbar}>
                  <FileField
                    id="sourceCodeFile"
                    name="sourceCodeFile"
                    label="Load from File:"
                  />
                  <SolidityVersionPicker containerClassName={style.select} />
                </div>

                <Field name="sourceCode">
                  {({ field, form }) => (
                    <Editor
                      options={{
                        minimap: {
                          enabled: false,
                        },
                      }}
                      height="600px"
                      language="sol"
                      theme="vs-dark"
                      {...field}
                      onChange={(value) => {
                        setCompiled(false)
                        resetForm()
                        form.setFieldValue('sourceCode', value)
                      }}
                    />
                  )}
                </Field>
              </div>

              <Sidebar
                compile={() =>
                  compile(values, { setSubmitting, setFieldValue, errors }, 200)
                }
                publish={() => publish(values, { setSubmitting, errors })}
                organization={organization}
                compiled={compiled}
                codeContracts={codeContracts}
                contractNames={contractNames}
                setContractMethods={setContractMethods}
                contractMethods={contractMethods}
              />
            </article>
          </Form>
        )}
      </Formik>

      <SnackBar content={snackContent} setContent={setSnackContent} />
    </>
  )
}

export default NewProposalForm

NewProposalForm.propTypes = {
  organization: OrganizationPropType,
}
