import { useEffect, useRef } from 'react'

export const useIsUnmounted = () => {
  const unmounted = useRef(false)

  useEffect(() => {
    unmounted.current = false

    return () => {
      unmounted.current = true
    }
  }, [])

  return unmounted
}
