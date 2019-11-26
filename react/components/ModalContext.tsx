import React, { createContext, useReducer, useContext } from 'react'

interface State {
  open: boolean
}

const DEFAULT_STATE = {
  open: false,
}

function mergeStates(state?: Partial<State>) {
  return {
    ...DEFAULT_STATE,
    ...state,
  }
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
    case 'OPEN_MODAL': {

      return {
        ...state,
        open: true,
      }
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

interface ModalContextProviderProps {
  initialState?: Partial<State>
}

export const ModalContextProvider: React.FC<ModalContextProviderProps> = props => {
  const { children, initialState } = props
  const [state, dispatch] = useReducer(modalContextReducer, mergeStates(initialState))

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
  // if (typeof context === 'undefined') {
  //   throw Error('useModalDispatch must be used within a ModalContextProvider')
  // }

  return context
}

export function useModalState() {
  const context = useContext(ModalStateContext)
  if (typeof context === 'undefined') {
    throw Error('useModalState must be used within a ModalStateContext')
  }

  return context
}
