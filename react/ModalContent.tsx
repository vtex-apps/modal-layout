import React, { useRef } from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'
import { useModalDispatch } from './components/ModalContext'
import useIntersection from './modules/useIntersection'

const CSS_HANDLES = ['contentContainer']

const ModalContent: React.FC = props => {
  const { children } = props
  const intersectionRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const handles = useCssHandles(CSS_HANDLES)
  const dispatch = useModalDispatch()
  useIntersection({ intersectionRef, dispatch, sentinelRef })

  const classes = classnames(
    handles.contentContainer,
    styles.contentScroll,
    'overflow-y-auto pa5 relative'
  )

  return (
    <div className={classes}>
      {children}
      <div
        className="absolute bottom-0 right-0"
        style={{ height: 1, width: 1 }}
        ref={sentinelRef}
      />
    </div>
  )
}

export default ModalContent
