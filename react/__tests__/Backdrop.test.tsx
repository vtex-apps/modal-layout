import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

// eslint-disable-next-line jest/no-mocks-import
import { findCSSHandles } from '../__mocks__/testUtils'
import Backdrop, { CSS_HANDLES } from '../components/Backdrop'

const handles = {
  backdropContainer: 'backdropContainer',
  backdrop: 'backdrop',
}

describe('<Backdrop />', () => {
  it('should render', () => {
    const { baseElement } = render(<Backdrop open handles={handles} />)

    expect(baseElement).toBeTruthy()
  })

  it('should find all declared handles', () => {
    const { container } = render(<Backdrop open handles={handles} />)

    const foundHandles = findCSSHandles(container, CSS_HANDLES)

    expect(foundHandles).toEqual(CSS_HANDLES)
  })

  it('should have visibility hidden and opacity 0 if open === false', () => {
    const { getByTestId } = render(<Backdrop open={false} handles={handles} />)

    const container = getByTestId('modal-backdrop-container')

    expect(container.style.getPropertyValue('opacity')).toBe('0')
    expect(container.style.getPropertyValue('visibility')).toBe('hidden')
  })

  it('should call onClick when backdrop is clicked', () => {
    const spy = jest.fn()
    const { getByRole } = render(
      <Backdrop open onClick={spy} handles={handles} />
    )

    const backdropElement = getByRole('presentation')

    fireEvent.click(backdropElement, { bubbles: true, cancelable: true })

    expect(spy).toBeCalledTimes(1)
  })

  it('should have a role="presentation"', () => {
    const spy = jest.fn()
    const { queryByRole } = render(
      <Backdrop open onClick={spy} handles={handles} />
    )

    const container = queryByRole('presentation')

    expect(container).toBeTruthy()
  })
})
