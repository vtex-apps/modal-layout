import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import Button from './components/Button'
import { useModalDispatch } from './components/ModalContext'

interface Props {
  label?: string
}

const CSS_HANDLES = ['closeButton', 'closeButtonLabel'] as const

function CloseButton(props: Props) {
  const { label } = props
  const handles = useCssHandles(CSS_HANDLES)
  const dispatch = useModalDispatch()

  const handleClick = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' })
  }, [dispatch])

  const classes = {
    button: handles.closeButton,
    label: handles.closeButtonLabel,
  }
  return (
    <Button classes={classes} onClick={handleClick}>
      {label ?? (
        <FormattedMessage id="store/modal-layout.close-button.default-label" />
      )}
    </Button>
  )
}

export default CloseButton
