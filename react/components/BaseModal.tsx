import React from 'react'
import { pick } from 'ramda'
import Backdrop from './Backdrop'
import Portal, { ContainerType } from './Portal'
import { useResponsiveValue, ResponsiveInput } from 'vtex.responsive-values'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean
  keepMounted?: boolean
  container?: ContainerType
  hideBackdrop?: boolean | ResponsiveInput<boolean>
  backdropInvisible?: boolean | ResponsiveInput<boolean>
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
    children,
    container,
    open = true,
    onBackdropClick,
    keepMounted = false,
    ...rest
  } = props

  const {
    hideBackdrop = false,
    backdropInvisible = false,
  } = useResponsiveValue(pick(['hideBackdrop', 'backdropInvisible'], props))

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
      <div {...rest} style={styles.container} onClick={handleClick} role="presentation">
        {hideBackdrop ? null : (
          <Backdrop open={open} onClick={onBackdropClick} invisible={backdropInvisible} />
        )}
        {children}
      </div>
    </Portal>
  )
}

export default BaseModal
