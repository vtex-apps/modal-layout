import {
  TransitionActions,
  TransitionProps as _TransitionProps,
} from 'react-transition-group/Transition'

import {
  easing as easingFunctions,
  duration as transitionDuration,
} from './transitions'

export type TransitionHandlerKeys = 'onEnter' | 'onExit'

export type TransitionKeys = 'in' | 'timeout' | TransitionHandlerKeys

export type TransitionProps = TransitionActions &
  Partial<Pick<_TransitionProps, TransitionKeys>>

interface TransitionPropsOptions {
  mode: 'enter' | 'exit' | 'appear'
}

interface TransitionCreationOptions {
  duration: number | string
  easing: string
  delay: number | string
}

export function getTransitionProps(
  props: TransitionProps,
  options?: TransitionPropsOptions
) {
  const { timeout } = props

  let duration: number | string | undefined = 0

  if (typeof timeout === 'number') {
    duration = timeout
  } else if (typeof timeout === 'object' && options && timeout[options.mode]) {
    duration = timeout[options.mode]
  }

  return {
    duration,
  }
}

export const formatMs = (milliseconds: number) =>
  `${Math.round(milliseconds)}ms`

export function createTransition(
  props: string | string[] = ['all'],
  options: Partial<TransitionCreationOptions> = {}
) {
  const {
    delay = 0,
    easing = easingFunctions.easeInOut,
    duration = transitionDuration.standard,
  } = options

  return (Array.isArray(props) ? props : [props])
    .map(
      animatedProp =>
        `${animatedProp} ${
          typeof duration === 'string' ? duration : formatMs(duration)
        } ${easing} ${typeof delay === 'string' ? delay : formatMs(delay)}`
    )
    .join(',')
}
