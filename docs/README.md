📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Modal Layout

This repository provides blocks that can help you create modals in a store.

This `Quickview` text is a button that you can click and open the `modal-layout`
![image](https://user-images.githubusercontent.com/8517023/73455563-13afff00-434f-11ea-970a-6ae8a18df54f.png)

![image](https://user-images.githubusercontent.com/8517023/73455440-da778f00-434e-11ea-9d38-e31b2576b670.png)

## Configuration

1. Import the modal layout's app to your theme's dependencies in the `manifest.json`, for example:

```jsonc
{
  "dependencies": {
    "vtex.modal-layout": "0.x"
  }
}
```

2. Now you can use the two blocks exported by vtex.modal-layout. Notice that you need to configure your own modal-layout and pass it as a child of modal-trigger.

```jsonc
{
  "product-summary.shelf": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "add-to-cart-button"
    ]
  },
  "modal-trigger#quickview": {
    "children": [
      "modal-layout#quickview",
      "rich-text#quickview"
    ],
    "props": {
      "blockClass": "quickview"
    }
  },
  "rich-text#quickview": {
    "props": {
      "text": "Quickview",
      "blockClass": "quickview"
    }
  },
  "modal-layout#quickview": {
    "props": {
      "blockClass": "quickview",
      "fullScreen": {
        "phone": true,
        "desktop": false,
        "tablet": false
      }
    },
    "children": [
      "flex-layout.row#quickview-main-row"
    ]
  },
  "flex-layout.row#quickview-main-row": {
    "children": [
      "flex-layout.col#quickview-product-images",
      "flex-layout.col#quickview-product-information"
    ],
    "props": {
      "colGap": 4
    }
  },
  "flex-layout.col#quickview-product-images": {
    "children": [
      "product-images"
    ],
    "props": {
      "rowGap": 0,
      "width": "calc(50% - 0.375rem)"
    }
  },
  "flex-layout.col#quickview-product-information": {
    "children": [
      "vtex.store-components:product-name",
      "product-rating-summary",
      "product-price#quickview-price",
      "product-separator",
      "product-identifier.product",
      "product-summary-sku-selector#quickview",
      "link.product#quickview"
    ],
    "props": {
      "preventVerticalStretch": true,
      "rowGap": 0,
      "width": "calc(50% - 0.375rem)"
    }
  },
  "product-price#quickview-price": {
    "props": {
      "showInstallments": true,
      "showSavings": true
    }
  },
  "link.product#quickview": {
    "props": {
      "href": "/{slug}/p",
      "label": "More details >",
      "blockClass": "quickview"
    }
  },
  "product-summary-sku-selector#quickview": {
    "props": {
      "blockClass": "quickview"
    }
  },
  "stack-layout#prodsum": {
    "children": [
      "product-summary-image",
      "product-bookmark",
      "product-summary-specification-badges",
      "modal-trigger#quickview"
    ],
    "props": {
      "blockClass": "shelf-summary"
    }
  },
}
```

### Modal

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `scroll` | `ScrollMode` | Where the component should scroll if the content is bigger than the screen (see `ScrollMode` options bellow) | `'content'` |
| `backdrop`| `ResponsiveValue<BackdropMode> | BackdropMode` | How the backdrop should be rendered | `'clickable'` |
| `fullScreen` | `ResponsiveValue<boolean> | boolean` | If the modal should be in full screen | `false` |
| `disableEscapeKeyDown` | `boolean` | If if should disable closing the modal when you press `Esc` | `false` |

You can learn more about `ResponsiveValue` in the documentation of [responsive-values](https://vtex.io/docs/app/vtex.responsive-values).

### ModalTrigger
| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `trigger` | `TriggerMode` | Which kind of event should trigger the modal | `'click'` |

#### TriggerMode

| Value | Description |
| --- | --- |
| `'click'` | Will open the modal when the user clicks the `ModalTrigger` |
| `'load'` | Will open the modal when the window is loaded |

#### ScrollMode

| Value | Description |
| --- | --- |
| `'body'` | The size of the modal will be bigger than the screen if the content is bigger and it will scroll the body |
| `'content'` | The max height of the modal will be the size of the screen and the scroll will be inside the content |

#### BackdropMode

| Value | Description |
| --- | --- |
| `'display'` | It will render the `Backdrop`, but if you click it won't do anything |
| `'clickable'` | It will render the `Backdrop` and if you click it it will close the modal. | 
| `'none'` | It won't render the `Backdrop`. |

### ModalHeader

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `showCloseButton`| `ResponsiveValue<boolean> | boolean`| If it should show the close button | `true` |
| `iconCloseSize` | `number` | The size of the close icon in px | `32` |

### ModalContent

The `modal-content` block doesn't receive any prop

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `backdropContainer` |
| `backdrop` |
| `closeButtonContainer` |
| `closeButton` |
| `container` |
| `contentContainer` |
| `headerContainer` |
| `headerContent` |
| `triggerContainer` |
