import React from 'react'
import { render, fireEvent, act } from '@vtex/test-tools/react'

import BaseModal from '../BaseModal'
import { BackdropMode } from '../components/Backdrop'

describe('<BaseModal />', () => {
  it('should match snapshot', () => {
    const onClose = jest.fn()
    const { asFragment } = render(
      <BaseModal open onClose={onClose}>
        <div>Hello VTEX</div>
      </BaseModal>
    )

    expect(asFragment).toMatchSnapshot()
  })

  it('should render the modal with the children', () => {
    const onClose = jest.fn()
    const { queryByTestId } = render(
      <BaseModal open onClose={onClose}>
        <div data-testid="base-modal-child">Hello VTEX</div>
      </BaseModal>
    )

    expect(queryByTestId('base-modal-child')).toBeTruthy()
  })

  it('should not render its children if a prop open is false', () => {
    const { queryByTestId } = render(
      <BaseModal open={false} onClose={() => {}}>
        <div data-testid="base-modal-child">Hello VTEX</div>
      </BaseModal>
    )

    expect(queryByTestId('base-modal-child')).toBeNull()
  })

  it('should call onClose if Esc is pressed', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(
      <BaseModal open onClose={onClose}>
        <div data-testid="base-modal-child">Hello VTEX</div>
      </BaseModal>
    )

    act(() => {
      fireEvent.keyDown(getByTestId('base-modal-child'), {
        key: 'Escape',
        code: 27,
      })
    })

    expect(onClose).toBeCalledTimes(1)
  })

  it("shouldn't call onClose if disableEscapeKeyDown", () => {
    const onClose = jest.fn()
    const { getByTestId } = render(
      <BaseModal open onClose={onClose} disableEscapeKeyDown>
        <div data-testid="base-modal-child">Hello VTEX</div>
      </BaseModal>
    )

    act(() => {
      fireEvent.keyDown(getByTestId('base-modal-child'), {
        key: 'Escape',
        code: 27,
      })
    })

    expect(onClose).not.toBeCalled()
  })

  it('should have role="presentation"', () => {
    const onClose = jest.fn()
    const { queryByRole } = render(
      <BaseModal open onClose={onClose} backdrop={BackdropMode.none}>
        <div>Hello VTEX</div>
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
        <BaseModal open onClick={onClick} onClose={onClose}>
          <div>Hello VTEX</div>
        </BaseModal>
      </div>
    )

    const baseModal = getByTestId('base-modal')

    act(() => {
      fireEvent.click(baseModal, {
        bubbles: true,
        cancelable: true,
      })
    })

    expect(onClick).toBeCalledTimes(1)
    expect(outsideClick).not.toBeCalled()
  })
})
