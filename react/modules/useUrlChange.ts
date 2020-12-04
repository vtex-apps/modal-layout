import { useCallback, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Listener } from 'history'

type Params = {
  fn: Listener
  skip: boolean
}

export const useUrlChange = ({ fn, skip }: Params, deps: unknown[]) => {
  const { history } = useRuntime()

  // Lint is not getting it
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useCallback(fn, deps)

  useEffect(() => {
    if (skip) return

    // cancel method is returned to be executed whenever our deps change
    return history?.listen(memoizedCallback)
  }, [skip, memoizedCallback, history])
}
