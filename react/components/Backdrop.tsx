import React from 'react'
import type { TransitionProps } from 'react-transition-group/Transition'
import type { CssHandlesTypes } from 'vtex.css-handles'

import Fade from './Animations/Fade'
import styles from '../styles.css'

export type BackdropMode = 'display' | 'clickable' | 'none'

export const CSS_HANDLES = ['backdropContainer', 'backdrop'] as const

interface Props {
  open: boolean
  transitionDuration?: TransitionProps['timeout']
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  classes: CssHandlesTypes.CssHandles<typeof CSS_HANDLES>
}

const Backdrop: React.FC<Props> = (props) => {
  const { children, open, onClick, transitionDuration, classes } = props
  const nodeRef = React.useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Fade in={open} timeout={transitionDuration} ref={nodeRef}>
      <div
        className={`${classes.backdropContainer} ${styles.backdropContainer}`}
        data-testid="modal-backdrop-container"
      >
        <div
          role="presentation"
          onClick={handleClick}
          className={`${classes.backdrop} bg-base--inverted o-50 h-100`}
        >
          {children}
        </div>
      </div>
    </Fade>
  )
}

export default React.memo(Backdrop)
