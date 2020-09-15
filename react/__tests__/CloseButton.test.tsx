import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import CloseButton from '../CloseButton'
import { ModalDispatchContext } from '../components/ModalContext'

describe('<CloseButton />', () => {
  it('should render the close button with the label', () => {
    const { queryByText } = render(<CloseButton label="Hello VTEX" />)

    expect(queryByText('Hello VTEX')).toBeTruthy()
  })

  it('should close the modal when clicked', () => {
    const dispatchSpy = jest.fn()

    const { getByText } = render(
      <ModalDispatchContext.Provider value={dispatchSpy}>
        <CloseButton label="close button" />
      </ModalDispatchContext.Provider>
    )

    const closeButtonLabelEl = getByText('close button')

    fireEvent.click(closeButtonLabelEl, {
      bubbles: true,
      cancelable: true,
    })

    expect(dispatchSpy).toBeCalledTimes(1)
    expect(dispatchSpy).toBeCalledWith({ type: 'CLOSE_MODAL' })
  })
})
