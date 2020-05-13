import React from 'react'
import classnames from 'classnames'
import { IconClose } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'
import {
  useResponsiveValue,
  MaybeResponsiveInput,
} from 'vtex.responsive-values'

import styles from './styles.css'
import { useModalDispatch } from './components/ModalContext'

interface Props {
  children?: React.ReactNode
  showCloseButton?: MaybeResponsiveInput<boolean>
  iconCloseSize?: number
}

const CSS_HANDLES = [
  'headerContainer',
  'closeButton',
  'headerContent',
  'closeButtonContainer',
] as const

export default React.memo(function ModalHeader(props: Props) {
  const {
    children,
    iconCloseSize = 32,
    showCloseButton: showCloseButtonProp = true,
  } = props

  const showCloseButton = useResponsiveValue(showCloseButtonProp)
  const handles = useCssHandles(CSS_HANDLES)
  const dispatch = useModalDispatch()

  const handleClose = () => {
    if (dispatch) {
      dispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }

  const hasChildren = Boolean(children)
  const headerContainerClasses = classnames(
    styles.headerContainer,
    handles.headerContainer,
    'flex items-start bb b--muted-3 flex-shrink-0 flex-grow-0 z-5',
    {
      'justify-between': hasChildren,
      'justify-end': !hasChildren,
    }
  )

  return (
    <div className={headerContainerClasses}>
      {hasChildren && <div className={handles.headerContent}>{children}</div>}
      {showCloseButton && (
        <div className={handles.closeButtonContainer}>
          <button
            onClick={handleClose}
            className={`${handles.closeButton} ma0 bg-transparent pointer bw0 pa3`}
          >
            <IconClose size={iconCloseSize} type="line" />
          </button>
        </div>
      )}
    </div>
  )
})
