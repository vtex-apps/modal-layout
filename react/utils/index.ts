import { useLayoutEffect, useEffect, useMemo } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

export const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

type ChainedFunction = (...args: any[]) => void
export type MaybeChainedFunction = ChainedFunction | undefined | null

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}

export function createChainedFunction(...funcs: MaybeChainedFunction[]) {
  return funcs.reduce((acc: ChainedFunction, func) => {
    if (!func || typeof func !== 'function') {
      return acc
    }

    return function chainedFunction(...args: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore 'this' has implicit type any and there is no way to type this here
      acc.apply(this, args)
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      func.apply(this, args)
    }
  }, noop)
}

export function setRef<T>(
  ref: React.Ref<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ;(ref as any).current = value
  }
}

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
