import { useCallback, useEffect } from 'react'

import { Dispatch } from '../components/ModalContext'

interface Params {
  dispatch: Dispatch
  intersectionRef: React.MutableRefObject<IntersectionObserver | null>
  sentinelRef: React.RefObject<HTMLDivElement | null>
}

export default function useIntersection(params: Params) {
  const { dispatch, intersectionRef, sentinelRef } = params
  const handleIntersection: IntersectionObserverCallback = useCallback(
    entries => {
      if (entries[0]) {
        dispatch({
          type: 'SET_END_OF_CONTENT',
          payload: { endOfContent: entries[0].isIntersecting },
        })
      }
    },
    [dispatch]
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
