import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import {
  useModalDispatch,
  ModalContextProvider,
} from './components/ModalContext'

const CSS_HANDLES = ['triggerContainer']

const ModalTrigger: React.FC<{}> = ({ children }) => {
  const dispatch = useModalDispatch()
  const handles = useCssHandles(CSS_HANDLES)

  const handleModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dispatch) {
      dispatch({ type: 'OPEN_MODAL' })
    }
  }

  return (
    <div
      role="button"
      onClick={handleModalOpen}
      className={`${handles.triggerContainer} bg-transparent pa0 outline-0 bw0`}
    >
      {children}
    </div>
  )
}

const EnhancedModalTrigger: React.FC<{}> = props => {
  return (
    <ModalContextProvider>
      <ModalTrigger {...props} />
    </ModalContextProvider>
  )
}

export default EnhancedModalTrigger
