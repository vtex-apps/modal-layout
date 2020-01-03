📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Modal Layout

WIP

:construction: :construction: :construction:

*Do not use this repository until it has a stable version*


## Configuration

1. Import the modal layout's app to your theme's dependencies in the `manifest.json`, for example:

```jsonc
{
  "vtex.modal-layout": "0.x"
}
```

2. Now you can use the two blocks that the `modal-layout` app export. You have to create your `modal-layout` block and put him as a child of the `modal-trigger` block:

```jsonc
{
  "modal-trigger#preview-shelf": {
    "children": [
      "modal-layout#preview-shelf",
      "product-summary-buy-button"
    ]
  },
  "rich-text#modal-title": {
    "props": {
      "text": "## Preview modal title",
      "blockClass": "myModalTitle"
    }
  },
  "modal-header": {
    "children": [
      "rich-text#modal-title"
    ]
  },
  "modal-content": {
    "children": [
      "all-my-children-elements-of-modal",
      "product-images"
    ]
  },
  "modal-layout#preview-shelf": {
    "children": [
      "modal-header",
      "modal-content"
    ]
  }
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

### ModalContent

The `modal-content` block doesn't receive any prop

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `triggerContainer` |
| `container` |
| `contentContainer` |
| `headerContainer` |
| `headerContent` |
| `closeButtonContainer` |
| `closeButton` |
| `backdropContainer` |
| `backdrop` |
