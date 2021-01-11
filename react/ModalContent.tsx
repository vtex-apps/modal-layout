import React, { useRef, useCallback } from 'react'
import type { ReactNode } from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import styles from './styles.css'
import { useModalDispatch } from './components/ModalContext'
import useIntersection from './modules/useIntersection'

const CSS_HANDLES = ['contentContainer'] as const

interface Props {
  children: ReactNode
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ModalContent({ children, classes }: Props) {
  const intersectionRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const dispatch = useModalDispatch()
  const handleIntersection = useCallback(
    (isIntersecting: boolean) => {
      dispatch({
        type: 'SET_END_OF_CONTENT',
        payload: { endOfContent: isIntersecting },
      })
    },
    [dispatch]
  )

  useIntersection({
    sentinelRef,
    intersectionRef,
    callback: handleIntersection,
  })

  return (
    <div
      className={classnames(
        handles.contentContainer,
        styles.contentScroll,
        'overflow-y-auto pa5 relative'
      )}
    >
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
