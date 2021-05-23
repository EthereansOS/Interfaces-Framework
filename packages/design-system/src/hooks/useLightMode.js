import { useEffect, useState } from 'react'

function useLightMode() {
  const [enabled, setEnabledState] = useState(false)

  useEffect(() => {
    const className = 'light-mode'
    const element = window.document.body
    if (enabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }, [enabled])

  return [enabled, setEnabledState]
}

export default useLightMode
