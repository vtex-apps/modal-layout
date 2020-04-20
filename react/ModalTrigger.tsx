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
}

interface Props {
  trigger?: TriggerMode
  openPerSection?: boolean
}

const ModalTrigger: React.FC<Props> = props => {
  const {
    children,
    trigger = TriggerMode.click,
    openPerSection = false,
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
      expiresDate.setDate(expiresDate.getDate() + 10)
      setCookie('openOneTime', true, { expires: expiresDate })
    }
    if (!openOnLoad && trigger === TriggerMode.load && dispatch) {
      if (openPerSection && cookies.openOneTime) {
        return
      }
      dispatch({ type: 'OPEN_MODAL' })
      setOpenOnLoad(true)
    }
  }, [
    trigger,
    dispatch,
    openOnLoad,
    openPerSection,
    setCookie,
    cookies.openOneTime,
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
