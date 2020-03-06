import { useCallback, useEffect } from 'react'

interface Params {
  intersectionRef: React.MutableRefObject<IntersectionObserver | null>
  sentinelRef: React.RefObject<HTMLDivElement | null>
  callback: (isIntersecting: boolean) => void
}

export default function useIntersection(params: Params) {
  const { callback, intersectionRef, sentinelRef } = params
  const handleIntersection: IntersectionObserverCallback = useCallback(
    entries => {
      if (entries[0]) {
        callback(entries[0].isIntersecting)
      }
    },
    [callback]
  )

  useEffect(() => {
    // If we are in IE11 this might break if we don't check
    if (IntersectionObserver) {
      intersectionRef.current = new IntersectionObserver(handleIntersection)
      if (sentinelRef.current) {
        intersectionRef.current.observe(sentinelRef.current)
      }
    }

    return () => {
      if (intersectionRef.current) {
        intersectionRef.current.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleIntersection])
}
