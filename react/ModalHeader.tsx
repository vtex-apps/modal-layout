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
}

const CSS_HANDLES = [
  'headerContainer',
  'closeButton',
  'headerContent',
  'closeButtonContainer',
]

export default React.memo(function ModalHeader(props: Props) {
  const { children, showCloseButton: showCloseButtonProp = true } = props

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
    'flex items-start bb b--muted-3 flex-shrink-0 flex-grow-0',
    {
      ['justify-between']: hasChildren,
      ['justify-end']: !hasChildren,
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
            <IconClose size={32} type="line" />
          </button>
        </div>
      )}
    </div>
  )
})
