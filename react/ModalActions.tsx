import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import classnames from 'classnames'

import { useModalState } from './components/ModalContext'

const CSS_HANDLES = [
  'actionsContainer',
  'actionsContentWrapper',
  'actionsContainerEndOfContent',
] as const

interface Props {
  children: React.ReactNode
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

export default function ModalActions({ children, classes }: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
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
