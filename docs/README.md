📢 Use this project, [contribute](https://github.com/vtex-apps/modal-layout) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Modal Layout

The Modal Layout app provides blocks that can help you create modals in your store.

![image](https://user-images.githubusercontent.com/8517023/73455440-da778f00-434e-11ea-9d38-e31b2576b670.png)

## Configuration

1. Add the modal layout's app to your theme's dependencies in the `manifest.json`:

```jsonc
{
  "dependencies": {
    "vtex.modal-layout": "0.x"
  }
}
```

Now, you are able to use all blocks exported by the `modal-layout` app. Check out the full list below:

| Block name | Description | 
| --------  | ------------ | 
| `modal-trigger` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Its child block defines how the Modal content will be triggered. | 
| `modal-layout` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Defines how the Modal content will be rendered. |

2. Add the `modal-trigger` block in any store template of your choosing. In the example below, it will be added to the Home page: 

```jsonc
{
  "store.home": {
    "children": [
      "modal-trigger#example"
    ]
  },
```

3. Declare the `modal-trigger` block using its prop and configuring children blocks for it. The `modal-trigger`'s first children must be a block of your choosing to trigger the Modal content. Then, a sibling block called `modal-layout` will be needed to effectively define how the Modal content should be rendered. For example:

```jsonc
{
  "store.home": {
    "children": [
      "modal-trigger#example"
    ]
  },
   "modal-trigger#example": {
    "children": [
      "rich-text#example",
      "modal-layout#example"
    ]
  },
  "rich-text#example": {
    "props": {
      "text": "Click me"
    }
  },
  "modal-layout#example": {
    "children": [
      "rich-text#modal-content"
    ]
  },
  "rich-text#modal-content": {
    "props": {
      "text": "Hello"
    }
  }
}
```


In the example above, the [Rich Text](https://vtex.io/docs/components/all/vtex.rich-text/) block renders the `Click me` text that will trigger the Modal content when clicked on. The modal content, in turn, is defined by the `modal-layout` block. According to the example above, the Modal content triggered by the `Click me` Rich Text would be a `Hello` Rich text. 

- **`modal-trigger`** 

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `trigger` | `Enum` | Whether the Modal content should be triggered by user click ( `click`), when the page is fully loaded (`load`) or when the page is fully loaded but the modal will appears just once per session (`load-session`) | `'click'` |

- **`modal-actions`**

This is just a block to establish some semantics and it just renders its children. You should use it to keep the actions of the modal inside, like the `modal-actions.close` or any other action that you want to put in it.

- **`modal-actions.close`**

A simple button that closes the modal when you click on it, might be useful when you have a form or a dialog to give the user some information.

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `label` | `string` | The button text | english -> `Cancel`, spanish -> `Cancelar`, portugues -> `Cancelar` |

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


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/BeatrizMiranda"><img src="https://avatars2.githubusercontent.com/u/28959326?v=4" width="100px;" alt=""/><br /><sub><b>Beatriz Miranda</b></sub></a><br /><a href="https://github.com/vtex-apps/modal-layout/commits?author=BeatrizMiranda" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!