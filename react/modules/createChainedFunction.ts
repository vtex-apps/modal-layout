type ChainedFunction = (...args: any[]) => void
export type MaybeChainedFunction = ChainedFunction | undefined | null

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}

export default function createChainedFunction(
  ...funcs: MaybeChainedFunction[]
) {
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
