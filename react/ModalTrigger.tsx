import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import {
  useModalDispatch,
  ModalContextProvider,
} from './components/ModalContext'

const CSS_HANDLES = ['triggerContainer']

enum TriggerMode {
  click = 'click',
  load = 'load',
}

interface Props {
  trigger?: TriggerMode
}

const ModalTrigger: React.FC<Props> = props => {
  const { children, trigger = TriggerMode.click } = props
  const dispatch = useModalDispatch()
  const handles = useCssHandles(CSS_HANDLES)
  const [openOnLoad, setOpenOnLoad] = useState(false)

  const handleModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dispatch) {
      dispatch({ type: 'OPEN_MODAL' })
    }
  }

  useEffect(() => {
    if (!openOnLoad && trigger === TriggerMode.load && dispatch) {
      dispatch({ type: 'OPEN_MODAL' })
      setOpenOnLoad(true)
    }
  }, [trigger, dispatch, openOnLoad])

  if (trigger === TriggerMode.click) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        tabIndex={0}
        role="button"
        onClick={handleModalOpen}
        className={`${handles.triggerContainer} bg-transparent pa0 outline-0 bw0`}
      >
        {children}
      </div>
    )
  }

  return <>{children}</>
}

const EnhancedModalTrigger: React.FC = props => {
  return (
    <ModalContextProvider>
      <ModalTrigger {...props} />
    </ModalContextProvider>
  )
}

export default EnhancedModalTrigger
