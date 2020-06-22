import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { TransitionProps } from 'react-transition-group/Transition'

import Fade from './Animations/Fade'
import styles from '../styles.css'

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

export const CSS_HANDLES = ['backdropContainer', 'backdrop'] as const

const Backdrop: React.FC<Props> = props => {
  const { children, open, onClick, transitionDuration } = props
  const handles = useCssHandles(CSS_HANDLES)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Fade in={open} timeout={transitionDuration}>
      <div
        className={`${handles.backdropContainer} ${styles.backdropContainer}`}
        data-testid="modal-backdrop-container"
      >
        <div
          role="presentation"
          onClick={handleClick}
          className={`${handles.backdrop} bg-base--inverted o-50 h-100`}
        >
          {children}
        </div>
      </div>
    </Fade>
  )
}

export default React.memo(Backdrop)
