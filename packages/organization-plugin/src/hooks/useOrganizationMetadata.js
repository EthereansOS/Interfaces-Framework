import { useEffect, useState } from 'react'

const useOrganizationMetadata = (metadataLink) => {
  const [metadata, setMetadata] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(metadataLink)
        setMetadata(await res.json())
      } catch (e) {
        setError(e)
        console.log('Error fetching org metadata', e)
      }
    }

    fetchMetadata()
  }, [metadataLink])

  return { metadata, error }
}

export default useOrganizationMetadata
