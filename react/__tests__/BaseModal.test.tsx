import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import BaseModal from '../BaseModal'
import Fade from '../components/Animations/Fade'

const handles = {
  modal: 'modal',
  backdropContainer: 'backdropContainer',
  backdrop: 'backdrop',
}

describe('<BaseModal />', () => {
  it('should render the modal with the children', () => {
    const onClose = jest.fn()
    const { queryByText, queryByRole } = render(
      <BaseModal open onClose={onClose} backdrop="none" handles={handles}>
        <Fade in>
          <div>Hello VTEX</div>
        </Fade>
      </BaseModal>
    )

    expect(queryByText('Hello VTEX')).toBeTruthy()
    expect(queryByRole('presentation')).toBeTruthy()
  })

  it("shouldn't render anything if open is false", () => {
    const { queryByText, queryByRole } = render(
      <BaseModal open={false} onClose={() => {}} handles={handles}>
        <Fade in>
          <div>Hello VTEX</div>
        </Fade>
      </BaseModal>
    )

    expect(queryByText('Hello VTEX')).toBeNull()
    expect(queryByRole('presentation')).toBeNull()
  })

  it('should call onClose if Esc is pressed', () => {
    const onClose = jest.fn()
    const { getByRole } = render(
      <BaseModal open onClose={onClose} backdrop="none" handles={handles}>
        <Fade in>
          <div>Hello VTEX</div>
        </Fade>
      </BaseModal>
    )

    fireEvent.keyDown(getByRole('presentation'), {
      key: 'Escape',
      code: 27,
    })

    expect(onClose).toBeCalledTimes(1)
  })

  it("shouldn't call onClose if disableEscapeKeyDown", () => {
    const onClose = jest.fn()
    const { getByTestId } = render(
      <BaseModal open onClose={onClose} disableEscapeKeyDown handles={handles}>
        <Fade in>
          <div data-testid="base-modal-child">Hello VTEX</div>
        </Fade>
      </BaseModal>
    )

    fireEvent.keyDown(getByTestId('base-modal-child'), {
      key: 'Escape',
      code: 27,
    })

    expect(onClose).not.toBeCalled()
  })

  it('should have role="presentation"', () => {
    const onClose = jest.fn()
    const { queryByRole } = render(
      <BaseModal open onClose={onClose} backdrop="none" handles={handles}>
        <Fade in>
          <div>Hello VTEX</div>
        </Fade>
      </BaseModal>
    )

    expect(queryByRole('presentation')).toBeTruthy()
  })

  it('should not propagate click events to outside of the modal', () => {
    const onClose = jest.fn()
    const outsideClick = jest.fn()
    const onClick = jest.fn()

    const { getByTestId } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={outsideClick}>
        <BaseModal open onClick={onClick} onClose={onClose} handles={handles}>
          <Fade in>
            <div>Hello VTEX</div>
          </Fade>
        </BaseModal>
      </div>
    )

    const baseModal = getByTestId('base-modal')

    fireEvent.click(baseModal, {
      bubbles: true,
      cancelable: true,
    })

    expect(onClick).toBeCalledTimes(1)
    expect(outsideClick).not.toBeCalled()
  })
})
