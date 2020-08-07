# Page Builder Overview

<div class="otp" id="no-index">

### On This Page
- [Tabs and sections](#tabs-and-sections)
- [Array type](#array-type)
- [Hidden settings](#hidden-settings)
- [Schema settings](#schema-settings)
- [Resources](#resources)

</div>
Page Builder allows store owners to customize the different theme style elements like colors, text sizes, and more. They can use the built-in Page Builder tool in the control panel to drag and drop content like images, videos, and blocks of custom HTML. 

Developers can build user interfaces for their custom [widgets](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview) within the BigCommerce Page Builder platform using pre-configured schema. While BigCommerce provides the setting, logic, and design, the widget author provides information about the various settings that make up the widget. BigCommerce uses the same mechanism for all platform-provided widgets.

The following sections outline settings that can be passed as JSON into the `schema` property of a `POST` or `PUT` request to the `content\widget-template` endpoint of the Widgets API. For a step-by-step tutorial on creating widget templates, see [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-tutorial).

## Tabs and sections
Within the `schema` property, settings are grouped into `tabs` and `sections`.

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

## Array type
Arrays allow for building collections of elements within the widget. Array elements live at the top level of the `schema`. Each element in the array can contain an entire schema internally.

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
Hidden settings can be used to set up controls which have no user interface drawn in Page Builder. Hidden settings live at the top level of the schema because they are not grouped into any other tabs or arrays. You can use them in advanced widgets that have complex interactions in the preview pane i.e. inline editing).

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

## Schema settings
There are many common fields between schema settings including the following.

|Setting|Description|
|---|---|
|`type`|The type of setting component to display. You can view the list of elements below to discover which are available to use.|
|`label`|The user friendly message to inform the user how this setting will be used.|
|`id`|The variable name where the setting value will be available in the widget template.|
|`default`|The default value to use when rendering the widget for the first time.|
|`typeMeta`|Additional information needed based on the selected setting type.|
|`conditional`|Can be added on each setting to control whether it should be displayed to the user while editing in Page Builder. This does not clear the value in the setting, just controls the display of the setting. Take a look at the regex Input for an example on using conditional.|

For examples of different schema settings you can use in your custom widget template, see our [Schema Settings](https://developer.bigcommerce.com/stencil-docs/page-builder/schema-settings) page.

## Resources
- [Widgets Code Samples](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-code-samples)
- [Third-party Widgets](https://developer.bigcommerce.com/stencil-docs/page-builder/third-party-widgets)