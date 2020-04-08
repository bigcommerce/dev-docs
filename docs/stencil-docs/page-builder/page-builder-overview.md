# Page Builder Overview

<div class="otp" id="no-index">

- [Tabs and Sections](#tabs-and-sections)
- [Array Type](#array-type)
- [Hidden Settings](#hidden-settings)
- [Schema Settings](#schema-settings)

</div>

Page Builder allows store owners to customize the different style elements of a theme like colors, text sizes, and more. They can use the built-in Page Builder tool in the Control Panel to drag and drop content like images, videos, banners, carousels, buttons, and blocks of custom HTML. 

Developers can build user interfaces for their custom widgets within the BigCommerce Page Builder platform using `schema.json` files. While BigCommerce provides the setting, logic, and design, the widget author provides information about the various settings that make up the widget. This is the exact mechanism BigCommerce uses for all platform-provided widgets as well.

The following sections outline settings found in the `schema.json` files.

## Tabs and Sections
Within the `schema.json` file, edit settings are grouped into _tabs_ and _sections_.

### Tabs
Tabs are a part of the Page Builder schema structure. The schema requires using a single root-level tab to contain all visible sections.

>**Note**
>
>Sections render in the same order they are listed within a tab.

**Tab schema example**
```json
[{
  "type": "tab",
  "label": "Content",
  "sections": [...]
}]
```

### Sections
Sections are groups of related settings. Each section will have a title that the user can collapse. Section labels are optional, but are not collapsible without a label.

Settings render in the same order they are listed within a section.

**Section schema example**
```json
[{
  "type": "tab",
  "label": "Content",
  "sections": {
    "label": "Text",
    "settings": [...]
  }
}]
```

## Array Type
Arrays allow for building collections of elements within the widget. Array elements live at the top level of the schema document. Each element in the array can contain an entire schema internally.

Elements in the list have settings defined by the array’s schema, which can be built using tabs, sections, and settings.

**Array schema example**
```json
{
  "type": "array",
  "label": "Carousel",
  "id": "slides",
  "defaultCount": 2,
  "entryLabel": "Slide",
  "thumbnail": "imageUrl",
  "schema": [
    {
      "type": "tab",
      "label": "Content",
      "sections": [
        ...
        {
          "type": "imageManager",
          "id": "imageUrl",
          "default": {
            "src": "https://example.com/example.png",
            "type": "IMAGE_MANAGER"
          }
        },
        ...
      ]
    }
  ]
}

```
>**Note**
>
>- Each element in the list can have tab and sections included.
>- The `defaultCount` attribute is the number of elements in the list to display by default.
>- The `thumbnail` attribute is used to display an image stored at the specified attribute name.
>- You can use the `entryLabel` attribute to set a name for each element in the list.

## Hidden Settings
Hidden settings can be used to set up controls which have no user interface drawn in Page Builder. Hidden settings live at the top level of the schema since they are not grouped into any other tabs or arrays. You can use them in advanced widgets that have complex interactions in the preview pane (such as inline editing).

**Hidden settings schema example**
```json
{
  "type": "hidden",
  "settings": [
    {
      "id": "title",
      "default": "Sample title text"
    },
    {
      "id": "subtitle",
      "default": "Description text goes here"
    }
  ]
}
```

## Schema Settings
There are many common fields between schema settings including the following:

|Setting|Description|
|---|---|
|`type`|The type of setting component to display. You can view the list of elements below to discover which are available to use.|
|`label`|The user friendly message to inform the user how this setting will be used.|
|`id`|The variable name where the setting value will be available in the widget template.|
|`default`|The default value to use when rendering the widget for the first time. Make sure to set sensible defaults to make your widget easier to use.|
|`typeMeta`|Additional information needed based on the selected setting type.|
|`conditional`|Can be added on each setting to control whether it should be displayed to the user while editing in store design. This does not clear the value in the setting, just controls the display of the setting. Take a look at the regexInput for an example on using conditional.|

For examples of different schema settings you can use in your custom widget template, see our [Schema Settings](https://developer.bigcommerce.com/stencil-docs/page-builder/schema-settings) page.
