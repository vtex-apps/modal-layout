import React, { useCallback } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage, defineMessages } from 'react-intl'

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

defineMessages({
  title: {
    id: 'admin/editor.modal-layout.close-button.title',
  },
  labelTitle: {
    id: 'admin/editor.modal-layout.close-button.label.title',
  },
  labelDescription: {
    id: 'admin/editor.modal-layout.close-button.label.description',
  },
})

CloseButton.schema = {
  title: 'admin/editor.modal-layout.close-button.title',
}

export default CloseButton
