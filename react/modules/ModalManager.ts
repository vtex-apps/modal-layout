import { RefObject } from 'react'

import ownerDocument from './ownerDocument'
import ownerWindow from './ownerWindow'
import getScrollbarSize from './getScrollbarSize'
import styles from '../styles.css'

export type ModalRef = RefObject<HTMLDivElement | null>
type ProcedureFn = () => void
type OnClose = ProcedureFn

export interface ContainerInfo {
  container: HTMLElement
  modals: ModalRef[]
  restore: ProcedureFn | null
}

function getPaddingRight(node: HTMLElement) {
  return parseInt(window.getComputedStyle(node).paddingRight, 10) || 0
}

function isOverflowing(container: HTMLElement) {
  const doc = ownerDocument(container)

  if (doc.body === container) {
    return ownerWindow(doc).innerWidth > doc.documentElement.clientWidth
  }

  return container.scrollHeight > container.clientHeight
}

const hashRegex = /#$/

interface RestoreStyle {
  value: string
  el: HTMLElement
  key: string
}

type FindIndexOfCallback = (item: ContainerInfo) => boolean
function findIndexOf(
  containerInfo: ContainerInfo[],
  callback: FindIndexOfCallback
) {
  let idx = -1
  containerInfo.some((item, index) => {
    if (callback(item)) {
      idx = index
      return true
    }
    return false
  })
  return idx
}

function handleContainer(containerInfo: ContainerInfo) {
  const { container } = containerInfo
  const restoreStyle: RestoreStyle[] = []

  if (isOverflowing(container)) {
    const scrollbarSize = getScrollbarSize()

    restoreStyle.push({
      value: container.style.paddingRight,
      key: 'padding-right',
      el: container,
    })

    container.style.paddingRight = `${getPaddingRight(container) +
      scrollbarSize}px`
  }

  // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
  const parent = container.parentElement
  const scrollContainer =
    parent?.nodeName === 'HTML' &&
    window.getComputedStyle(parent).overflowY === 'scroll'
      ? parent
      : container
  restoreStyle.push({
    value: scrollContainer.style.overflow,
    key: 'overflow',
    el: scrollContainer,
  })
  scrollContainer.style.overflow = 'hidden'

  const restore = () => {
    restoreStyle.forEach(({ value, el, key }) => {
      if (value) {
        el.style.setProperty(key, value)
      } else {
        el.style.removeProperty(key)
      }
    })
  }

  return restore
}

/**
 * Class used to manage the open modals and to close
 * them when the route change with the 'CLOSE_MODAL'
 * action
 */
export default class ModalManager {
  modals: ModalRef[]
  containers: ContainerInfo[]
  closeMethods: OnClose[]

  constructor() {
    this.modals = []
    this.closeMethods = []
    this.containers = []

    if (window && window.addEventListener) {
      window.addEventListener('popstate', e => {
        // If this event if fired with a modal open it will close it
        if (this.closeMethods.length > 0) {
          e.stopPropagation()
          this.closeMethods[this.closeMethods.length - 1]()
          this.removeTopModal()
        }
      })
    }
  }

  add(modal: ModalRef, container: HTMLElement, onClose: OnClose) {
    let modalIndex = this.modals.indexOf(modal)
    if (modalIndex !== -1) {
      return modalIndex
    }

    modalIndex = this.modals.length
    this.modals.push(modal)
    this.closeMethods.push(onClose)
    const containerIndex = findIndexOf(
      this.containers,
      item => item.container === container
    )
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal)
      return modalIndex
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
    })

    return modalIndex
  }

  mount(modal: ModalRef) {
    const containerIndex = findIndexOf(
      this.containers,
      item => item.modals.indexOf(modal) !== -1
    )
    const containerInfo = this.containers[containerIndex]

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo)
    }

    // If this is the first modal to be opened, it has to push to the state
    if (this.modals.length === 1) {
      window?.history.pushState({ type: 'OPEN_MODAL' }, 'open modal', '#')
    }

    containerInfo.container?.classList.add(styles.hiddenContainer)
  }

  remove(modal: ModalRef) {
    const modalIndex = this.modals.indexOf(modal)
    if (modalIndex === -1) {
      return
    }

    const containerIndex = findIndexOf(
      this.containers,
      item => item.modals.indexOf(modal) !== -1
    )
    const containerInfo = this.containers[containerIndex]

    this.modals.splice(modalIndex, 1)
    this.closeMethods.splice(modalIndex, 1)
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1)

    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore()
      }

      this.containers.splice(containerIndex, 1)
    }

    if (this.modals.length === 0) {
      containerInfo.container?.classList.remove(styles.hiddenContainer)

      window?.history.replaceState(
        { type: 'CLOSE_MODAL' },
        'close modal',
        window.location.href.replace(hashRegex, '')
      )
    }

    return modalIndex
  }

  removeTopModal() {
    if (this.modals.length === 0) {
      return -1
    }

    return this.remove(this.modals[this.modals.length - 1])
  }

  isTopModal(modal: ModalRef) {
    return (
      this.modals.length > 0 && this.modals[this.modals.length - 1] === modal
    )
  }
}
