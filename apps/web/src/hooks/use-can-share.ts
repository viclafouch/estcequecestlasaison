import * as React from 'react'

export function useCanShare() {
  const [canShare, setCanShare] = React.useState(false)

  React.useEffect(() => {
    setCanShare(typeof navigator.share === 'function')
  }, [])

  return canShare
}
