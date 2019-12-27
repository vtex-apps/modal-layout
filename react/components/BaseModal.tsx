import React, { useEffect, useState } from 'react'

import Portal, { ContainerType } from './Portal'
import Backdrop, { BackdropMode } from './Backdrop'
import TrapFocus from './TrapFocus'

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

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    zIndex: 1300,
  },
} as const

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

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [open])

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
        role="presentation"
        onClick={handleClick}
        style={styles.container}
        onKeyDown={handleKeyDown}
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
