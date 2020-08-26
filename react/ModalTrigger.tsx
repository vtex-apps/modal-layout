import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { usePixelEventCallback } from 'vtex.pixel-manager'

import {
  useModalDispatch,
  ModalContextProvider,
} from './components/ModalContext'

const CSS_HANDLES = ['triggerContainer'] as const

enum TriggerMode {
  click = 'click',
  load = 'load',
  loadSession = 'load-session',
  event = 'event',
}

interface Props {
  trigger?: TriggerMode
  customEventId?: string
}

const ModalTrigger: React.FC<Props> = props => {
  const { children, trigger = TriggerMode.click, customEventId } = props
  const dispatch = useModalDispatch()
  const handles = useCssHandles(CSS_HANDLES)
  const [openOnLoad, setOpenOnLoad] = useState(false)

  usePixelEventCallback(customEventId, () => {
    dispatch({ type: 'OPEN_MODAL' })
  })

  const handleModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dispatch) {
      dispatch({ type: 'OPEN_MODAL' })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    e.stopPropagation()
    if (dispatch) {
      dispatch({ type: 'OPEN_MODAL' })
    }
  }

  useEffect(() => {
    if (!openOnLoad && dispatch) {
      if (
        trigger === TriggerMode.loadSession &&
        sessionStorage.getItem('hasOpenedModal')
      ) {
        return
      }
      if (trigger === TriggerMode.loadSession || trigger === TriggerMode.load) {
        dispatch({ type: 'OPEN_MODAL' })
        setOpenOnLoad(true)
      }
    }
    if (!sessionStorage.getItem('hasOpenedModal')) {
      sessionStorage.setItem('hasOpenedModal', 'true')
    }
  }, [trigger, dispatch, openOnLoad])

  if (trigger === TriggerMode.click) {
    return (
      <div
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
        onClick={handleModalOpen}
        className={`${handles.triggerContainer} bg-transparent pa0 bw0 dib`}
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
