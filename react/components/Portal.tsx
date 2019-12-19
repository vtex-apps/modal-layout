import ReactDOM from 'react-dom'
import { canUseDOM } from 'vtex.render-runtime'
import React, { useLayoutEffect, useEffect, useState } from 'react'

export type ContainerType =
  | React.ReactInstance
  | (() => React.ReactInstance | null)
  | null

interface Props {
  container?: ContainerType
}

function getContainer(container?: ContainerType) {
  container = typeof container === 'function' ? container() : container
  return ReactDOM.findDOMNode(container) as Element | null
}

const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

const Portal: React.FC<Props> = props => {
  const { children, container } = props
  const [mountNode, setMountNode] = useState<Element | null>(null)

  useEnhancedEffect(() => {
    setMountNode(getContainer(container) || document.body)
  }, [container])

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
}

export default Portal
