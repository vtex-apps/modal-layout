import React, { useEffect } from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import {
  useResponsiveValues,
  MaybeResponsiveInput,
} from 'vtex.responsive-values'
import { useRuntime } from 'vtex.render-runtime'

import pick from './modules/pick'
import styles from './styles.css'
import BaseModal from './BaseModal'
import Fade from './components/Animations/Fade'
import { BackdropMode } from './components/Backdrop'
import { useModalState, useModalDispatch } from './components/ModalContext'

export type ScrollMode = 'body' | 'content'

interface Props {
  scroll?: ScrollMode
  blockClass?: string
  children?: React.ReactNode
  disableEscapeKeyDown?: boolean
  fullScreen?: MaybeResponsiveInput<boolean>
  backdrop?: MaybeResponsiveInput<BackdropMode>
  closeModalWhenUrlChange?: boolean
}

const CSS_HANDLES = ['paper', 'topRow', 'container', 'closeButton'] as const

const responsiveProps = ['backdrop', 'fullScreen', 'showCloseButton'] as const

function Modal(props: Props) {
  const {
    children,
    scroll = 'content',
    disableEscapeKeyDown = false,
    closeModalWhenUrlChange = false,
  } = props

  const { fullScreen = false, backdrop = 'clickable' } = useResponsiveValues(
    pick(responsiveProps, props)
  )

  const handles = useCssHandles(CSS_HANDLES)
  const { open } = useModalState()
  const dispatch = useModalDispatch()
  const { history } = useRuntime()

  if (!history?.location?.pathname) {
    return null
  }

  const {
    location: { pathname },
  } = history

  const handleClose = () => {
    if (dispatch) {
      dispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (closeModalWhenUrlChange === true) {
      dispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }, [pathname, dispatch, closeModalWhenUrlChange])

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Prevent clicking inside the modal and closing it
    // this way it will close only if you click in the backdrop
    if (e.target !== e.currentTarget) {
      return
    }

    if (backdrop === 'clickable') {
      handleClose()
    }
  }

  const containerClasses = classnames(handles.container, 'outline-0 h-100', {
    'overflow-y-auto overflow-x-hidden tc': scroll === 'body',
    'flex items-center justify-center': scroll === 'content',
  })

  const paperClasses = classnames(handles.paper, 'bg-base relative br2', {
    [styles.paperNotFullScreen]: !fullScreen,
    'dib tl v-mid': scroll === 'body',
    'h-100': fullScreen && scroll === 'content',
    'min-h-100': fullScreen && scroll === 'body',
    [`${styles.fullScreenModal} w-100 mw-100 br0`]: fullScreen,
    [styles.paperScrollContent]: !fullScreen && scroll === 'content',
    [`${styles.paperScrollContent} flex flex-column`]: scroll === 'content',
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
