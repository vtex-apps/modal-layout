# Modal Layout

WIP

:construction: :construction: :construction:

*Do not use this repository until it has a stable version*


## Blocks API

The API for `modal-layout` and `modal-trigger` are very similar to `flex-layout`.

```jsonc
{
  "modal-layout": {
    "component": "Modal",
    "composition": "children",
    "allowed": "*"
 },
  "modal-trigger": {
    "component": "ModalTrigger",
    "composition": "children",
    "allowed": "*"
  }
}

```

Notice that you could use _any_ array of blocks as `children`, given that they are allowed by the `block` that is directly above your `modal-layout`.

## Configuration

This props should be edited at your theme's `blocks.json`:

### Modal

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `title` | `string`| The title of the modal | `undefined` |
| `showCloseButton`| `boolean`| If it should show the close button | `true` |
| `backdrop`| `BackdropMode` |  | `'clickable'` |
| `titlePadding` | `number` | Number of a tachyons class (from 0 to 11) to apply a tachyons class with paddings | `5` |
| `contentPadding` | `number` | Same as the `titlePadding`, but of the content | `5` |
| `titleTag` | TitleTag | Which tag the title element should render | `'h3'`

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

## Styles API

This apps provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
{
  "builders": {
    "styles": "1.x"
  }
}
```

2. Create a file called `vtex.modal-layout.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

## CSS Handles

Below, we describe the namespaces that are defined by `modal-layout`.

| Handles |
| --- |
| `triggerContainer` |
| `container` |
| `closeButtonContainer` |
| `closeButton` |
| `title` |
| `contentContainer` |
| `backdrop` |
