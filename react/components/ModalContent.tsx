import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  className?: string
}

const CSS_HANDLES = [
  'contentContainer'
]

const ModalContent: React.FC<Props> = props => {
  const { className = '', children } = props
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.contentContainer} ${className} ph5 pb5 pt5`}>
      {children}
    </div>
  )
}

export default ModalContent
