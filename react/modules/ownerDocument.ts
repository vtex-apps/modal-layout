type NodeType = HTMLElement | Document | null | undefined
export default function ownerDocument(node: NodeType) {
  return (node && node.ownerDocument) || window.document
}
