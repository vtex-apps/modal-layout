type NodeType = HTMLElement | Document | null | undefined
export default function ownerDocument(node: NodeType) {
  return node?.ownerDocument ?? window.document
}
