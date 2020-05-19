import React, { createContext, useReducer, useContext } from 'react'

interface State {
  open: boolean
  endOfContent: boolean
}

const DEFAULT_STATE = {
  open: false,
  endOfContent: false,
}

interface OpenAction {
  type: 'OPEN_MODAL'
}

interface CloseAction {
  type: 'CLOSE_MODAL'
}

interface SetEndOfContentAction {
  type: 'SET_END_OF_CONTENT'
  payload: { endOfContent: boolean }
}

type Action = OpenAction | CloseAction | SetEndOfContentAction
export type Dispatch = (action: Action) => void

const ModalStateContext = createContext<State>(DEFAULT_STATE)
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ModalDispatchContext = createContext<Dispatch>(() => {})

// eslint-disable-next-line @typescript-eslint/default-param-last
function modalContextReducer(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        open: true,
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        open: false,
      }

    case 'SET_END_OF_CONTENT':
      return {
        ...state,
        endOfContent: action.payload.endOfContent,
      }

    default:
      return state
  }
}

export const ModalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(modalContextReducer, DEFAULT_STATE)

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  )
}

export function useModalDispatch() {
  const context = useContext(ModalDispatchContext)
  return context
}

export function useModalState() {
  const context = useContext(ModalStateContext)
  if (typeof context === 'undefined') {
    throw Error('useModalState must be used within a ModalStateContext')
  }

  return context
}
