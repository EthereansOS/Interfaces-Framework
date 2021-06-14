import { useWeb3 } from '@dfohub/core'
import { useEffect, useState } from 'react'

const errMessage = 'An error occured while fetching the code'

const useFetchFrontendCode = (organizationIndex, organizationLink) => {
  const { loadContent } = useWeb3()
  const [distributedCode, setDistributedCode] = useState('')
  const [decentralizedCode, setDecentralizedCode] = useState('')

  useEffect(() => {
    const fetchDecCode = async () => {
      try {
        const decCode = await loadContent(organizationIndex)
        setDecentralizedCode(decCode)
      } catch (e) {
        console.log(e)
        setDecentralizedCode(errMessage)
      }
    }

    if (organizationIndex) {
      fetchDecCode()
    }
  }, [loadContent, organizationIndex])

  useEffect(() => {
    const fetchDistrCode = async () => {
      try {
        const distrCode = await (
          await fetch(organizationLink, { mode: 'no-cors' })
        ).json()
        setDistributedCode(distrCode)
      } catch (e) {
        setDistributedCode(errMessage)
      }
    }

    if (organizationLink) {
      fetchDistrCode()
    }
  }, [loadContent, organizationLink])

  return { distributedCode, decentralizedCode }
}

export default useFetchFrontendCode
