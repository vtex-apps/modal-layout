import React from 'react'
import Portal, { ContainerType } from './Portal'
import Backdrop from './Backdrop'

interface Props {
  open: boolean
  onClose: () => void
  keepMounted?: boolean
  hideBackdrop?: boolean
  container: ContainerType
  backdropInvisible?: boolean
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

const BaseModal: React.FC<Props> = props => {
  const {
    open = true,
    onClose,
    children,
    container,
    keepMounted = false,
    hideBackdrop = false,
    backdropInvisible = false,
  } = props

  if (!keepMounted && !open) {
    return null
  }

  return (
    <Portal container={container}>
      <div style={styles.container} role="presentation">
        {hideBackdrop ? null : (
          <Backdrop open={open} onClick={onClose} invisible={backdropInvisible} />
        )}
        {children}
      </div>
    </Portal>
  )
}

export default BaseModal
