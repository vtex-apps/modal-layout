import type React from 'react'
import { useState, forwardRef } from 'react'
import ReactDOM from 'react-dom'

import setRef from '../modules/setRef'
import useEnhancedEffect from '../modules/useEnhancedEffect'

export type ContainerType =
  | React.ReactInstance
  | (() => React.ReactInstance | null)
  | null

interface Props {
  children: React.ReactNode
  container?: ContainerType
}

export function getContainer(container?: ContainerType) {
  container = typeof container === 'function' ? container() : container

  if (!container) {
    return undefined
  }

  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container) as Element | null
}

const Portal = forwardRef(function Portal(props: Props, ref) {
  const { children, container } = props
  const [mountNode, setMountNode] = useState<Element | null>(null)

  useEnhancedEffect(() => {
    setMountNode(getContainer(container) ?? document.body)
  }, [container])

  useEnhancedEffect(() => {
    if (mountNode) {
      setRef(ref, mountNode)

      return () => {
        setRef(ref, null)
      }
    }

    return undefined
  }, [ref, mountNode])

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
})

export default Portal
