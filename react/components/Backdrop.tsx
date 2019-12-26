import React from 'react'
import { TransitionProps } from 'react-transition-group/Transition'

import styles from '../styles.css'
import Fade from './Animations/Fade'

export enum BackdropMode {
  display = 'display',
  clickable = 'clickable',
  none = 'none',
}

interface Props {
  open: boolean
  transitionDuration?: TransitionProps['timeout']
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Backdrop: React.FC<Props> = props => {
  const { children, open, onClick, transitionDuration } = props

  if (!open) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Fade in={open} timeout={transitionDuration}>
      <div className={styles.backdropContainer}>
        <div
          role="presentation"
          onClick={handleClick}
          className="bg-base--inverted o-50 h-100"
        >
          {children}
        </div>
      </div>
    </Fade>
  )
}

export default Backdrop
