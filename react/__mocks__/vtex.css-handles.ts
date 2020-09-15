export function useCssHandles(input: string[]) {
  const acc: Record<string, string> = {}

  input.forEach(value => {
    acc[value] = value
  })

  return acc
}

export const applyModifiers = (input: string, modifier: string) => {
  return modifier ? `${input}--${modifier}` : input
}
