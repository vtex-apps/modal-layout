import React from 'react'
import ModalTrigger from './components/ModalTrigger'
import { ModalContextProvider } from './components/ModalContext'

const ModalTriggerWrapper: React.FC<{}> = props => {
  return (
    <ModalContextProvider>
      <ModalTrigger {...props} />
    </ModalContextProvider>
  )
}

export default ModalTriggerWrapper
