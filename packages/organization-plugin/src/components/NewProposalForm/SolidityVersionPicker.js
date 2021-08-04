import React, { useEffect, useState } from 'react'
import { getSolidityUtilities } from '@ethereansos/interfaces-core'

import SelectField from '../shared/SelectField'

const SolidityVersionPicker = (props) => {
  const [versions, setVersions] = useState([])

  useEffect(() => {
    const fetchSolidityVersions = async () => {
      try {
        const SolidityUtilities = await getSolidityUtilities()
        if (!SolidityUtilities) {
          throw new Error("couldn't get solidity utilities")
        }

        const compilers = await SolidityUtilities.getCompilers()
        console.log('compilers', compilers)
        if (!compilers?.releases) {
          throw new Error("couldn't get solidity compilers")
        }

        setVersions(
          Object.keys(compilers.releases).map((compiler) => ({
            id: compilers.releases[compiler],
            label: compiler,
          }))
        )
      } catch (e) {
        throw e
      }
    }

    fetchSolidityVersions()
  }, [])

  return (
    <SelectField
      name="solidityVersion"
      placeholder="Select solidity v."
      options={versions}
      {...props}
    />
  )
}

export default SolidityVersionPicker
