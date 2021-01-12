import React from 'react'
import type { PropsWithChildren } from 'react'
import classnames from 'classnames'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'
import type { ResponsiveValuesTypes } from 'vtex.responsive-values'
import { useResponsiveValues } from 'vtex.responsive-values'

import styles from './styles.css'
import BaseModal, { CSS_HANDLES as BaseModalCssHandles } from './BaseModal'
import Fade from './components/Animations/Fade'
import type { BackdropMode } from './components/Backdrop'
import { useModalState, useModalDispatch } from './components/ModalContext'
import { useUrlChange } from './modules/useUrlChange'

export type ScrollMode = 'body' | 'content'

const CSS_HANDLES = [
  'modal',
  'paper',
  'topRow',
  'container',
  'closeButton',
  ...BaseModalCssHandles,
] as const

interface Props {
  scroll?: ScrollMode
  blockClass?: string
  disableEscapeKeyDown?: boolean
  fullScreen?: ResponsiveValuesTypes.ResponsiveValue<boolean>
  backdrop?: ResponsiveValuesTypes.ResponsiveValue<BackdropMode>
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function Modal(props: PropsWithChildren<Props>) {
  const {
    children,
    classes,
    scroll = 'content',
    disableEscapeKeyDown = false,
  } = props

  const { fullScreen = false, backdrop = 'clickable' } = useResponsiveValues({
    backdrop: props.backdrop,
    fullScreen: props.fullScreen,
  })

  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { open } = useModalState()
  const dispatch = useModalDispatch()

  const handleClose = () => {
    if (dispatch) {
      dispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }

  // Close modal when url changes
  useUrlChange(
    {
      fn: () => {
        dispatch({
          type: 'CLOSE_MODAL',
        })
      },
      skip: !open,
    },
    [open, dispatch]
  )

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
      handles={handles}
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
