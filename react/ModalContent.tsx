import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'

const CSS_HANDLES = ['contentContainer']

const ModalContent: React.FC = props => {
  const { children } = props
  const handles = useCssHandles(CSS_HANDLES)

  const classes = classnames(
    handles.contentContainer,
    styles.contentScroll,
    'overflow-y-auto pa5'
  )

  return <div className={classes}>{children}</div>
}

export default ModalContent
