import React from 'react'
import { pick } from 'ramda'
import classnames from 'classnames'
import { IconClose } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'
import { useResponsiveValues, MaybeResponsiveInput } from 'vtex.responsive-values'

import styles from './styles.css'
import BaseModal from './components/BaseModal'
import { BackdropMode } from './components/Backdrop'
import ModalContent from './components/ModalContent'
import ModalTitle, { TitleTag } from './components/ModalTitle'
import { useModalState, useModalDispatch } from './components/ModalContext'

interface Props {
  title?: string
  titleTag: TitleTag
  blockClass?: string
  fullScreen?: MaybeResponsiveInput<boolean>
  backdrop?: MaybeResponsiveInput<BackdropMode>
  showCloseButton?: MaybeResponsiveInput<boolean>
}

const CSS_HANDLES = [
  'topRow',
  'container',
  'closeButton',
]

const responsiveProps = [
  'backdrop',
  'fullScreen',
  'showCloseButton',
] as const

const Modal: React.FC<Props> = props => {
  const {
    title,
    titleTag,
    children,
  } = props

  const {
    fullScreen = false,
    showCloseButton = true,
    backdrop = BackdropMode.clickable,
  } = useResponsiveValues(pick(responsiveProps, props))

  const handles = useCssHandles(CSS_HANDLES)
  const context = useModalState()
  const dispatch = useModalDispatch()

  const handleClose = () => {
    if (dispatch) {
      dispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }

  const handleBackdropClick = () => {
    if (backdrop === BackdropMode.clickable) {
      handleClose()
    }
  }

  const containerClasses = classnames(
    styles.containerCenter,
    handles.container,
    'bg-base relative flex flex-column',
    {
      [`${styles.fullScreenModal} w-100 mw-100 h-100 br0`]: fullScreen,
    }
  )

  return (
    <BaseModal
      open={context.open}
      backdrop={backdrop}
      onBackdropClick={handleBackdropClick}
    >
      <div className={containerClasses} style={styles.root}>
        {(title || showCloseButton) && (
          <div className={`${handles.topRow} flex justify-between items-start`}>
            {title && (
              <ModalTitle className={showCloseButton ? '' : 'pr5'} tag={titleTag}>
                {title}
              </ModalTitle>
            )}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className={`${handles.closeButton} ma0 bg-transparent pointer bw0 pa2`}
              >
                <IconClose size={24} type="line" />
              </button>
            )}
          </div>
        )}
        <ModalContent>
          {children}
        </ModalContent>
      </div>
    </BaseModal>
  )
}

export default Modal
