import React from 'react'
import { render, fireEvent, act } from '@vtex/test-tools/react'

import Backdrop from '../components/Backdrop'

describe('<Backdrop />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Backdrop open />)

    expect(asFragment).toMatchSnapshot()
  })

  it('should have visibility hidden and opacity 0 if open === false', () => {
    const { getByTestId } = render(<Backdrop open={false} />)

    const container = getByTestId('modal-backdrop-container')

    expect(container.style.getPropertyValue('opacity')).toBe('0')
    expect(container.style.getPropertyValue('visibility')).toBe('hidden')
  })

  it('should call onClick when backdrop is clicked', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Backdrop open onClick={spy} />)

    const backdropElement = getByTestId('modal-backdrop-container').firstChild
    act(() => {
      if (backdropElement) {
        fireEvent.click(backdropElement, { bubbles: true, cancelable: true })
      }
    })
    expect(spy).toBeCalledTimes(1)
  })

  it('should have a role="presentation"', () => {
    const spy = jest.fn()
    const { queryByRole } = render(<Backdrop open onClick={spy} />)

    const container = queryByRole('presentation')
    expect(container).toBeTruthy()
  })
})
