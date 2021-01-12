export function findCSSHandles(
  container: HTMLElement,
  handles: readonly string[]
) {
  const foundNodes = handles
    .map((handle) => {
      const foundNodesInner = container.getElementsByClassName(handle)

      return foundNodesInner.length > 0 ? handle : ''
    })
    .filter((result) => result !== '')

  return foundNodes
}
