import React, { useEffect } from 'react'
import Portal, { ContainerType } from './Portal'
import Backdrop, { BackdropMode } from './Backdrop'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean
  keepMounted?: boolean
  backdrop?: BackdropMode
  container?: ContainerType
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

const BaseModal: React.FC<Props> = props => {
  const {
    open,
    backdrop,
    children,
    container,
    onBackdropClick,
    keepMounted = false,
    ...rest
  } = props

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [open])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (rest.onClick) {
      rest.onClick(e)
    }
  }

  if (!keepMounted && !open) {
    return null
  }

  return (
    <Portal container={container}>
      <div
        {...rest}
        role="presentation"
        onClick={handleClick}
        style={styles.container}
      >
        {children}
        {backdrop === BackdropMode.none ? null : (
          <Backdrop open={open} onClick={onBackdropClick} />
        )}
      </div>
    </Portal>
  )
}

export default BaseModal
