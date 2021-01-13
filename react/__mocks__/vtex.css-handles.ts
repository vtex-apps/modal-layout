export function useCssHandles(input: string[]) {
  const acc: Record<string, string> = {}

  input.forEach((value) => {
    acc[value] = value
  })

  return {
    handles: acc,
    withModifiers: (base: string, modifier: string) => {
      return modifier ? `${base}--${modifier}` : input
    },
  }
}
