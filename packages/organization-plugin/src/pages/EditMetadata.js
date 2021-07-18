import React, { useEffect } from 'react'
import T from 'prop-types'
import { useParams } from 'react-router-dom'

import useOrganization from '../hooks/useOrganization'

const EditMetadata = ({ setTemplateState }) => {
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization Edit',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return <div>edit metadata</div>
}

EditMetadata.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default EditMetadata
