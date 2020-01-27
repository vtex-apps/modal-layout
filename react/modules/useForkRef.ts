import { useMemo } from 'react'

import setRef from './setRef'

export function useForkRef<T>(
  refA: React.Ref<T>,
  refB: React.Ref<T>
): React.Ref<T> {
  return useMemo(() => {
    if (!refA && !refB) {
      return null
    }

    return refValue => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}
