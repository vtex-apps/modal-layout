import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { useEnhancedEffect } from '../utils'

export type ContainerType =
  | React.ReactInstance
  | (() => React.ReactInstance | null)
  | null

interface Props {
  container?: ContainerType
}

function getContainer(container?: ContainerType) {
  container = typeof container === 'function' ? container() : container
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container) as Element | null
}

const Portal: React.FC<Props> = props => {
  const { children, container } = props
  const [mountNode, setMountNode] = useState<Element | null>(null)

  useEnhancedEffect(() => {
    setMountNode(getContainer(container) || document.body)
  }, [container])

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
}

export default Portal
