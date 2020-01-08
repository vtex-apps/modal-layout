import React, { useState, useRef } from 'react'

import styles from '../styles.css'
import TrapFocus from './TrapFocus'
import Portal, { ContainerType } from './Portal'
import Backdrop, { BackdropMode } from './Backdrop'
import ModalManager from '../utils/ModalManager'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  open: boolean
  onClose: () => void
  backdrop?: BackdropMode
  container?: ContainerType
  disableEscapeKeyDown?: boolean
  children: React.ReactElement
  onBackdropClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const inlineStyles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    zIndex: 1300,
  },
} as const

const manager = new ModalManager()

const hashRegex = /#$/

export default function BaseModal(props: Props) {
  const {
    open,
    onClose,
    backdrop,
    children,
    container,
    onBackdropClick,
    disableEscapeKeyDown = false,
    ...rest
  } = props

  const [exited, setExited] = useState(true)
  const [prevOpen, setPrevOpen] = useState(open)
  const modalRef = useRef<HTMLDivElement>(null)

  if (open !== prevOpen) {
    setPrevOpen(open)

    if (open) {
      document.body.classList.add(styles.hiddenBody)
    } else {
      document.body.classList.remove(styles.hiddenBody)
    }

    if (window) {
      if (open) {
        window.history.pushState({ type: 'OPEN_MODAL' }, 'open modal', '#')
        manager.add(modalRef, onClose)
      } else {
        window.history.replaceState(
          { type: 'CLOSE_MODAL' },
          'close modal',
          window.location.href.replace(hashRegex, '')
        )
      }
    }
  }

  const handleExited = () => {
    setExited(true)
  }

  const handleEnter = () => {
    setExited(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (rest.onClick) {
      rest.onClick(e)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Escape' || disableEscapeKeyDown) {
      return
    }
    e.stopPropagation()
    onClose()

    if (rest.onKeyDown) {
      rest.onKeyDown(e)
    }
  }

  if (!open && exited) {
    return null
  }

  const childProps: Record<string, any> = {}
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1'
  }

  childProps.onEnter = handleEnter
  childProps.onExited = handleExited

  return (
    <Portal container={container}>
      <div
        {...rest}
        ref={modalRef}
        role="presentation"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={inlineStyles.container}
      >
        <TrapFocus open={open}>
          {React.cloneElement(children, childProps)}
        </TrapFocus>
        {backdrop !== BackdropMode.none && (
          <Backdrop open={open} onClick={onBackdropClick} />
        )}
      </div>
    </Portal>
  )
}
