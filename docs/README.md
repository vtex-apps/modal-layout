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
  "modal-layout#preview-shelf": {
    "props": {
      "title": "This is the title of the product preview",
      "blockClass": "klynger"
    },
    "children": [
      "all-my-children-elements-of-modal",
      "product-images"
    ]
  }
}
```

### Modal

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `title` | `string`| The title of the modal | `undefined` |
| `showCloseButton`| `boolean`| If it should show the close button | `true` |
| `backdrop`| `BackdropMode` |  | `'clickable'` |
| `titleTag` | TitleTag | Which tag the title element should render | `'h3'` |

#### BackdropMode

| Value | Description |
| --- | --- |
| `'display'` | It will render the `Backdrop`, but if you click it won't do anything |
| `'clickable'` | It will render the `Backdrop` and if you click it it will close the modal. | 
| `'none'` | It won't render the `Backdrop`. |

#### TitleTag

| Value |
| --- |
| `'h1'` |
| `'h2'` |
| `'h3'` |
| `'h4'` |
| `'h5'` |
| `'h6'` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `triggerContainer` |
| `container` |
| `closeButtonContainer` |
| `closeButton` |
| `title` |
| `contentContainer` |
| `backdrop` |
