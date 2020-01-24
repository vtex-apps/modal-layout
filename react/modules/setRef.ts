export default function setRef<T>(
  ref: React.Ref<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ;(ref as any).current = value
  }
}
