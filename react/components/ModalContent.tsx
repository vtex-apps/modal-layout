import React from 'react'
import styles from '../styles.css'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  className?: string
  dividers?: boolean
}

const CSS_HANDLES = [
  'contentContainer'
]

const ModalContent: React.FC<Props> = props => {
  const {
    children,
    dividers = false,
    className = '',
  } = props
  const handles = useCssHandles(CSS_HANDLES)

  const classes = classnames(
    handles.contentContainer,
    styles.contentScroll,
    className,
    'overflow-y-auto',
    {
      ['ph5 pb5 pt5']: !dividers,
      ['pv5 ph7 bt bb b--muted-3']: dividers,
    }
  )

  return (
    <div className={classes}>
      {/* {[... new Array(50)].map(() => children)} */}
      {children}
    </div>
  )
}

export default ModalContent
