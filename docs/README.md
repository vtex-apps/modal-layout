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
| `backdropInvisible` | `boolean` | If the Backdrop should have a transparent background (but if you click in the backdrop it still gonna close the modal) | `false` |
| `hideBackdrop`| `boolean` | If you pass `true` it will not render the backdrop, which means that you won't see it and you can't click it to close the modal | `false`
| `titlePadding` | `number` | Number of a tachyons class (from 0 to 11) to apply a tachyons class with paddings | `5` |
| `contentPadding` | `number` | Same as the `titlePadding`, but fo the content | `5` |
| `closeOnBackdropClick`| `boolean` | If it should close the modal when you click the `Backdrop`| `true` |

## Styles API

This apps provides some CSS calsses as an API for style customization.

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

## CSS namespaces

Below, we describe the namespaces that are defined by `modal-layout`.

| Class name |
| --- |
| `container` |
| `closeButtonContiner` |
| `closeButton` |
| `title` |
| `contentContainer` |
| `backdrop` |
