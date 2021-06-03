import React, { useEffect } from 'react'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'

const EditMetadata = ({ setTemplateState }) => {
  const { organizationHeader, organization } = useOrganizationContext()

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
