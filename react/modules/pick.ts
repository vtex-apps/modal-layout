// mock function from ramda

type PickFnType = <T, K extends string>(
  names: readonly K[],
  obj: T
) => Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>

const pick: PickFnType = (names, obj) => {
  const result: any = {}
  names.forEach(name => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    result[name] = obj[name]
  })

  return result
}

export default pick
