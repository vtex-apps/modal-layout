import React from 'react'
import classnames from 'classnames'

import styles from '../styles.css'

export enum BackdropMode {
  display = 'display',
  clickable = 'clickable',
  none = 'none',
}

interface Props {
  open: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Backdrop: React.FC<Props> = props => {
  const { children, open, onClick } = props

  if (!open) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  const rootClasses = classnames(styles.backdrop, 'o-50 bg-base--inverted')

  return (
    <div className={rootClasses} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Backdrop
