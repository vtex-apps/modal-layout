import { PixelData } from 'vtex.pixel-manager/react/PixelContext'
import { usePixelEventCallback } from 'vtex.pixel-manager'
import { useProduct } from 'vtex.product-context'

import { useModalDispatch } from '../components/ModalContext'
import { CartItem } from '../typings/event-data-interfaces'

interface Params {
  customPixelEventId?: string
  customPixelEventName?: PixelData['event']
  shouldCompareProductContext?: boolean
}

export default function usePixelBasedOnContext(params: Params) {
  const productContext = useProduct()
  const dispatch = useModalDispatch()
  const {
    customPixelEventId,
    customPixelEventName,
    shouldCompareProductContext = false,
  } = params

  const handleCustomEvent = (e?: MessageEvent) => {
    if (shouldCompareProductContext) {
      const selectedSkuId = productContext?.selectedItem?.itemId ?? ''

      switch (e?.data?.event) {
        case 'addToCart': {
          const cartItemSkuIds: string[] = e?.data?.items.map(
            (cartItem: CartItem) => cartItem?.skuId
          )

          if (cartItemSkuIds?.includes(selectedSkuId)) {
            dispatch({ type: 'OPEN_MODAL' })
          }

          return
        }

        default: {
          dispatch({ type: 'OPEN_MODAL' })
        }
      }
    } else {
      dispatch({ type: 'OPEN_MODAL' })
    }
  }

  usePixelEventCallback({
    eventId: customPixelEventId,
    eventName: customPixelEventName,
    handler: handleCustomEvent,
  })
}
