import React from 'react'
import classnames from 'classnames'
import BaseModal from './BaseModal'
import ModalTitle from './ModalTitle'
import ModalContent from './ModalContent'
import { IconClose } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'
import { useModalState, useModalDispatch } from './ModalContext'
import { useResponsiveValue } from 'vtex.responsive-values'
import { getValidTachyonsTokenNumber } from './utils'

interface Props {
  padding?: number
  title?: string
  showCloseButton?: boolean
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
} as const

const CSS_HANDLES = [
  'container',
  'closeButtonContiner',
  'closeButton',
]

const Modal: React.FC<Props> = props => {
  const {
    title,
    children,
    showCloseButton = true,
    padding: paddingProp = 5,
  } = props

  const handles = useCssHandles(CSS_HANDLES)
  const context = useModalState()
  const dispatch = useModalDispatch()

  const padding = getValidTachyonsTokenNumber(useResponsiveValue(paddingProp))
  const titleClasses = showCloseButton ? `ph${padding}` : `ph${padding} pt${padding}`
  let contentClasses = ''

  if (title || !showCloseButton) {
    contentClasses = `pa${padding}`
  } else if (showCloseButton) {
    contentClasses = `ph${padding} pb${padding}`
  }

  const handleClose = () => {
    if (dispatch) {
      dispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }

  const containerClasses = classnames(handles.container, 'bg-base relative flex flex-column')
  const closeButtonContainerClasses = classnames(handles.closeButtonContainer, 'w-100 flex justify-end')
  const closeButtonClasses = classnames(handles.closeButton, 'ma0 bg-transparent pointer bw0 pa2')

  return (
    <BaseModal open={context.open} onClose={handleClose}>
      <div className={containerClasses} style={styles.root}>
        {showCloseButton && (
          <div className={closeButtonContainerClasses}>
            <button className={closeButtonClasses} onClick={handleClose}>
              <IconClose size={24} type="line" />
            </button>
          </div>
        )}
        {title && (
          <ModalTitle className={titleClasses}>{title}</ModalTitle>
        )}
        <ModalContent className={contentClasses}>
          {children}
        </ModalContent>
      </div>
    </BaseModal>
  )
}

export default Modal
