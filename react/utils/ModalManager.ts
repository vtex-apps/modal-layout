import { RefObject } from 'react'

export type ModalRef = RefObject<HTMLDivElement>
type OnClose = () => void

/**
 * Class used to manage the open modals and to close
 * them when the route change with the 'CLOSE_MODAL'
 * action
 */
export default class ModalManager {
  modals: RefObject<HTMLDivElement>[]
  closeMethods: OnClose[]

  constructor() {
    this.modals = []
    this.closeMethods = []

    if (window && window.addEventListener) {
      window.addEventListener('popstate', e => {
        if (this.closeMethods.length > 0) {
          e.stopPropagation()
          this.closeMethods[this.closeMethods.length - 1]()
          this.removeTopModal()
        }
      })
    }
  }

  add(modal: ModalRef, onClose: OnClose) {
    if (this.modals.indexOf(modal) !== -1) {
      return
    }
    this.modals.push(modal)
    this.closeMethods.push(onClose)
  }

  remove(modal: ModalRef) {
    const modalIndex = this.modals.indexOf(modal)
    if (modalIndex === -1) {
      return
    }
    this.modals.splice(modalIndex, 1)
    this.closeMethods.splice(modalIndex, 1)
  }

  removeTopModal() {
    if (this.modals.length === 0) {
      return
    }

    this.modals.splice(this.modals.length - 1, 1)
    this.closeMethods.splice(this.closeMethods.length - 1, 1)
  }
}
