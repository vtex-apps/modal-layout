export default function setRef<T>(
  ref: React.Ref<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ref as any).current = value
  }
}
