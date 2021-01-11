import React, { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { usePixelEventCallback } from 'vtex.pixel-manager'
import type { PixelEventTypes } from 'vtex.pixel-manager'

import {
  useModalDispatch,
  ModalContextProvider,
} from './components/ModalContext'

const CSS_HANDLES = ['triggerContainer'] as const

type TriggerMode = 'click' | 'load' | 'load-session' | 'event'

interface Props {
  trigger?: TriggerMode
  customPixelEventId?: string
  customPixelEventName?: PixelEventTypes.PixelData['event']
  children: ReactNode
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ModalTrigger(props: Props) {
  const {
    children,
    trigger = 'click',
    customPixelEventId,
    customPixelEventName,
    classes,
  } = props

  const dispatch = useModalDispatch()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const [openOnLoad, setOpenOnLoad] = useState(false)

  usePixelEventCallback({
    eventId: customPixelEventId,
    eventName: customPixelEventName,
    handler: () => {
      dispatch({ type: 'OPEN_MODAL' })
    },
  })

  useEffect(() => {
    if (openOnLoad || !dispatch) {
      return
    }

    if (trigger === 'load-session') {
      if (sessionStorage.getItem('hasOpenedModal') === 'true') {
        return
      }

      sessionStorage.setItem('hasOpenedModal', 'true')
    }

    if (trigger !== 'load-session' && trigger !== 'load') {
      return
    }

    dispatch({ type: 'OPEN_MODAL' })
    setOpenOnLoad(true)
  }, [trigger, dispatch, openOnLoad])

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

  if (trigger === 'click') {
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

function EnhancedModalTrigger(props: Props) {
  return (
    <ModalContextProvider>
      <ModalTrigger {...props}>{props.children}</ModalTrigger>
    </ModalContextProvider>
  )
}

export default EnhancedModalTrigger
