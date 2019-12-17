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

export enum ScrollMode {
  body = 'body',
  content = 'content',
}

interface Props {
  title?: string
  titleTag: TitleTag
  scroll?: ScrollMode
  blockClass?: string
  showContentDividers: boolean
  fullScreen?: MaybeResponsiveInput<boolean>
  backdrop?: MaybeResponsiveInput<BackdropMode>
  showCloseButton?: MaybeResponsiveInput<boolean>
}

const CSS_HANDLES = [
  'paper',
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
    showContentDividers,
    scroll = ScrollMode.content,
  } = props

  const {
    fullScreen = false,
    showCloseButton = true,
    backdrop = BackdropMode.clickable,
  } = useResponsiveValues(pick(responsiveProps, props))

  const handles = useCssHandles(CSS_HANDLES)
  const { open } = useModalState()
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
  const containerClasses = classnames(handles.container, 'outline-0 h-100', {
    ['overflow-y-auto overflow-x-hidden tc']: scroll === ScrollMode.body,
    ['flex items-center justify-center']: scroll === ScrollMode.content,
  })

  const paperClasses = classnames(handles.paper, 'bg-base relative br2',
    {
      [styles.paperNotFullScreen]: !fullScreen,
      ['dib tl v-mid']: scroll === ScrollMode.body,
      ['h-100']: fullScreen && scroll === ScrollMode.content,
      ['min-h-100']: fullScreen && scroll === ScrollMode.body,
      [`${styles.fullScreenModal} w-100 mw-100 br0`]: fullScreen,
      [styles.paperScrollContent]: !fullScreen && scroll === ScrollMode.content,
      [`${styles.paperScrollContent} flex flex-column`]: scroll === ScrollMode.content,
    }
  )
  const topRowClasses = classnames(handles.topRow, 'flex items-start', {
    ['justify-between']: title,
    ['justify-end']: !title,
  })

  return (
    <BaseModal
      open={open}
      backdrop={backdrop}
      onBackdropClick={handleBackdropClick}
    >
      <div className={containerClasses}>
        <div className={paperClasses} style={styles.root}>
          {(title || showCloseButton) && (
            <div className={topRowClasses}>
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
          <ModalContent dividers={showContentDividers}>
            {children}
          </ModalContent>
        </div>
      </div>
    </BaseModal>
  )
}

export default Modal
