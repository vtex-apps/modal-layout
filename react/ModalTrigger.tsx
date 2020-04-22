import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useCookies } from 'react-cookie'

import {
  useModalDispatch,
  ModalContextProvider,
} from './components/ModalContext'

const CSS_HANDLES = ['triggerContainer']

enum TriggerMode {
  click = 'click',
  load = 'load',
  loadPerSection = 'load-per-section',
}

interface Props {
  trigger?: TriggerMode
  hoursExpireCookie?: number
}

const ModalTrigger: React.FC<Props> = props => {
  const {
    children,
    trigger = TriggerMode.click,
    hoursExpireCookie = 10,
  } = props
  const dispatch = useModalDispatch()
  const handles = useCssHandles(CSS_HANDLES)
  const [openOnLoad, setOpenOnLoad] = useState(false)
  const [cookies, setCookie] = useCookies(['openOneTime'])

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
    if (!cookies.openOneTime) {
      const expiresDate = new Date()
      expiresDate.setHours(expiresDate.getHours() + hoursExpireCookie)
      setCookie('openOneTime', true, { expires: expiresDate })
    }
    if (!openOnLoad && dispatch) {
      if (trigger === TriggerMode.loadPerSection && cookies.openOneTime) {
        return
      }
      if (
        trigger === TriggerMode.loadPerSection ||
        trigger === TriggerMode.load
      ) {
        dispatch({ type: 'OPEN_MODAL' })
        setOpenOnLoad(true)
      }
    }
  }, [
    trigger,
    dispatch,
    openOnLoad,
    setCookie,
    cookies.openOneTime,
    hoursExpireCookie,
  ])

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
