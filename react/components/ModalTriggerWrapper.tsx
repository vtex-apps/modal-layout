import React from 'react'
import ModalTrigger from './ModalTrigger'
import { ModalContextProvider } from './ModalContext'

const ModalTriggerWrapper: React.FC<{}> = props => {
  return (
    <ModalContextProvider>
      <ModalTrigger {...props} />
    </ModalContextProvider>
  )
}

export default ModalTriggerWrapper
