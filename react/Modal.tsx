import React from 'react'
import { pick } from 'ramda'
import classnames from 'classnames'
import styles from './components/styles.css'
import { IconClose } from 'vtex.store-icons'
import BaseModal from './components/BaseModal'
import { useCssHandles } from 'vtex.css-handles'
import { BackdropMode } from './components/Backdrop'
import ModalContent from './components/ModalContent'
import ModalTitle, { TitleTag } from './components/ModalTitle'
import { getValidTachyonsTokenNumber } from './modules/tachyonsToken'
import { useModalState, useModalDispatch } from './components/ModalContext'
import { useResponsiveValue, ResponsiveInput } from 'vtex.responsive-values'

interface Props {
  titleTag: TitleTag
  blockClass?: string
  title?: string | ResponsiveInput<string>
  titlePadding?: number | ResponsiveInput<number>
  contentPadding?: number | ResponsiveInput<number>
  showCloseButton?: boolean | ResponsiveInput<boolean>
  backdrop?: BackdropMode | ResponsiveInput<BackdropMode>
}

const CSS_HANDLES = [
  'topRow',
  'container',
  'closeButton',
]

const responsiveProps = [
  'backdrop',
  'titlePadding',
  'contentPadding',
  'showCloseButton',
] as const

const Modal: React.FC<Props> = props => {
  const {
    title,
    titleTag,
    children,
  } = props

  const {
    showCloseButton = true,
    backdrop = BackdropMode.clickable,
    titlePadding: titlePaddingProp = 5,
    contentPadding: contentPaddingProp = 5,
  } = useResponsiveValue(pick(responsiveProps, props))

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

  const titlePadding = getValidTachyonsTokenNumber(titlePaddingProp)
  const contentPadding = getValidTachyonsTokenNumber(contentPaddingProp)

  const titleClasses = showCloseButton ? `ph${titlePadding}` : `ph${titlePadding} pt${titlePadding}`
  let contentClasses = ''

  if (title || !showCloseButton) {
    contentClasses = `pa${contentPadding}`
  } else if (showCloseButton) {
    contentClasses = `ph${contentPadding} pb${contentPadding}`
  }

  const containerClasses = classnames(styles.containerCenter, handles.container, 'bg-base relative flex flex-column')

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
              <ModalTitle className={titleClasses} tag={titleTag}>
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
        <ModalContent className={contentClasses}>
          {children}
        </ModalContent>
      </div>
    </BaseModal>
  )
}

export default Modal
