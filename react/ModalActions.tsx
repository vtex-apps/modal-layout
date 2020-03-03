import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  children: React.ReactNode
}

const CSS_HANDLES = ['actionsContainer', 'actionsContentWrapper']

export default function ModalActions(props: Props) {
  const { children } = props
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.actionsContainer}>
      <div className={handles.actionsContentWrapper}>{children}</div>
    </div>
  )
}
