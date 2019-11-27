import React, { createContext, useReducer, useContext } from 'react'

interface State {
  open: boolean
}

const DEFAULT_STATE = {
  open: false,
}

interface OpenAction {
  type: 'OPEN_MODAL'
}

interface CloseAction {
  type: 'CLOSE_MODAL'
}

type Action = OpenAction | CloseAction
type Dispatch = (action: Action) => void

const ModalStateContext = createContext<State>(DEFAULT_STATE)
const ModalDispatchContext = createContext<Dispatch | undefined>(undefined)

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

    default:
      return state
  }
}

export const ModalContextProvider: React.FC<{}> = ({ children }) => {
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
