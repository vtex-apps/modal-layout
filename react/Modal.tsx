import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import {
  useResponsiveValues,
  MaybeResponsiveInput,
} from 'vtex.responsive-values'

import pick from './modules/pick'
import styles from './styles.css'
import BaseModal from './BaseModal'
import Fade from './components/Animations/Fade'
import { BackdropMode } from './components/Backdrop'
import { useModalState, useModalDispatch } from './components/ModalContext'

export enum ScrollMode {
  body = 'body',
  content = 'content',
}

interface Props {
  scroll?: ScrollMode
  blockClass?: string
  children?: React.ReactNode
  disableEscapeKeyDown?: boolean
  fullScreen?: MaybeResponsiveInput<boolean>
  backdrop?: MaybeResponsiveInput<BackdropMode>
}

const CSS_HANDLES = ['paper', 'topRow', 'container', 'closeButton'] as const

const responsiveProps = ['backdrop', 'fullScreen', 'showCloseButton'] as const

function Modal(props: Props) {
  const {
    children,
    scroll = ScrollMode.content,
    disableEscapeKeyDown = false,
  } = props

  const {
    fullScreen = false,
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Prevent clicking inside the modal and closing it
    // this way it will close only if you click in the backdrop
    if (e.target !== e.currentTarget) {
      return
    }

    if (backdrop === BackdropMode.clickable) {
      handleClose()
    }
  }

  const containerClasses = classnames(handles.container, 'outline-0 h-100', {
    'overflow-y-auto overflow-x-hidden tc': scroll === ScrollMode.body,
    'flex items-center justify-center': scroll === ScrollMode.content,
  })

  const paperClasses = classnames(handles.paper, 'bg-base relative br2', {
    [styles.paperNotFullScreen]: !fullScreen,
    'dib tl v-mid': scroll === ScrollMode.body,
    'h-100': fullScreen && scroll === ScrollMode.content,
    'min-h-100': fullScreen && scroll === ScrollMode.body,
    [`${styles.fullScreenModal} w-100 mw-100 br0`]: fullScreen,
    [styles.paperScrollContent]: !fullScreen && scroll === ScrollMode.content,
    [`${styles.paperScrollContent} flex flex-column`]:
      scroll === ScrollMode.content,
  })

  return (
    <BaseModal
      open={open}
      backdrop={backdrop}
      onClose={handleClose}
      onBackdropClick={handleBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <Fade in={open}>
        {
          /* click-events-have-key-events is disabled because this will be handled by BaseModal */
          /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
          <div
            tabIndex={-1}
            className={containerClasses}
            onClick={handleBackdropClick}
          >
            <div className={paperClasses}>{children}</div>
          </div>
        }
      </Fade>
    </BaseModal>
  )
}

const ModalRef = React.memo(Modal)

export default ModalRef
