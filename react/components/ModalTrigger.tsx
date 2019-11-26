import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { useModalDispatch } from './ModalContext'

const CSS_HANDLES = ['container']

const ModalTrigger: React.FC<{}> = props => {
  const { children } = props
  const handles = useCssHandles(CSS_HANDLES)
  const containerClasses = classnames(handles.container, 'bg-transparent pa0 ma0 outline-0 bw0')
  const dispatch = useModalDispatch()
  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dispatch) {
      dispatch({ type: 'OPEN_MODAL' })
    }
  }

  return (
    <button
      role="button"
      onClick={handleModalOpen}
      className={containerClasses}
      >
      {children}
    </button>
  )
}

export default ModalTrigger
