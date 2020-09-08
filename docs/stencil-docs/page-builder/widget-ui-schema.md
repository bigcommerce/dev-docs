# Widget UI Schema

<div class="otp" id="no-index">

### On this page
- [Tabs and sections](#tabs-and-sections)
- [Array type](#array-type)
- [Hidden settings](#hidden-settings)
- [Schema settings fields](#schema-settings-fields)
- [Resources](#resources)

</div>

This document outlines the different schema settings you can use in your custom widget template. For a tutorial on creating widget templates, see [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/store-management/widgets/tutorial). 

## Tabs and sections
Within the `schema` property of the **Create a Widget Template** endpoint, settings are grouped into `tabs` and `sections`.

### Tabs
Tabs are a part of the Page Builder schema structure. The schema requires using a single root-level `tab` to contain all visible sections.

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
Sections are groups of related settings. Each section will have a title that the user can collapse. Section labels are optional but are not collapsible without a label.

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

## Array type
Arrays allow for building collections of elements within the widget. Array elements live at the top level of the schema. Each element in the array can contain an entire schema internally.

Elements in the list have settings defined by the array’s schema, which you can build using tabs, sections, and settings.

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
>- Each element in the list can have tabs and sections included.
>- The `defaultCount` attribute is the number of elements in the list to display by default.
>- The `thumbnail` attribute is used to display an image stored at the specified attribute name.
>- You can use the `entryLabel` attribute to set a name for each element in the list.

## Hidden settings
You can use hidden settings to set up controls which have no user interface drawn in Page Builder. Hidden settings live at the schema's top level because they are not grouped into any other tabs or arrays. You can use them in advanced widgets with complex interactions in the preview pane, such as inline editing.

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

## Schema settings fields
The following table contains fields common between schema settings.

|Setting|Description|
|---|---|
|`type`|The type of setting component to display. You can view the list of elements below to discover which are available to use.|
|`label`|The user-friendly message to inform the user how they can use this setting.|
|`id`|The variable name where the setting value will be available in the widget template.|
|`default`|The default value to use when rendering the widget for the first time.|
|`typeMeta`|Additional information needed based on the selected setting type.|
|`conditional`|It can be added to each setting to control whether it should be displayed to the user while editing in Page Builder. This does not clear the value in the setting, just controls the display of the setting. Take a look at the regex Input for an example of using `conditional`.|

For examples of different schema settings you can use in your custom widget template, see [Widget UI Input Types](https://developer.bigcommerce.com/stencil-docs/page-builder/schema-settings).

## Resources
- [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
- [Widgets Code Samples](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-code-samples)
- [Widget UI Input Types](https://developer.bigcommerce.com/stencil-docs/page-builder/schema-settings)
- [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/store-management/widgets/tutorial)