import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface Props {
  tag?: TitleTag
  className?: string
}

const CSS_HANDLES = ['title']

const ModalTitle: React.FC<Props> = props => {
  const {
    className,
    children,
    tag: Tag = 'h3',
  } = props

  const handles = useCssHandles(CSS_HANDLES)

  const tagClasses = `${handles.title} t-heading-3 ma0 pa5 ${className}`
  
  return (
    <Tag className={tagClasses}>
      {children}
    </Tag>
  )
}

export default ModalTitle
