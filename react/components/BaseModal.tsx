import React from 'react'
import Portal, { ContainerType } from './Portal'
import Backdrop from './Backdrop'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean
  onClose: () => void
  keepMounted?: boolean
  hideBackdrop?: boolean
  container?: ContainerType
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
    ...rest
  } = props

  if (!keepMounted && !open) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (rest.onClick) {
      rest.onClick(e)
    }
  }

  return (
    <Portal container={container}>
      <div {...rest} style={styles.container} onClick={handleClick} role="presentation">
        {hideBackdrop ? null : (
          <Backdrop open={open} onClick={onClose} invisible={backdropInvisible} />
        )}
        {children}
      </div>
    </Portal>
  )
}

export default BaseModal
