import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import classnames from 'classnames'

import { useModalState } from './components/ModalContext'

interface Props {
  children: React.ReactNode
}

const CSS_HANDLES = [
  'actionsContainer',
  'actionsContentWrapper',
  'actionsContainerEndOfContent',
] as const

export default function ModalActions(props: Props) {
  const { children } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { endOfContent } = useModalState()
  const containerClasses = classnames(handles.actionsContainer, {
    [handles.actionsContainerEndOfContent]: endOfContent,
  })

  return (
    <div className={containerClasses}>
      <div className={handles.actionsContentWrapper}>{children}</div>
    </div>
  )
}
