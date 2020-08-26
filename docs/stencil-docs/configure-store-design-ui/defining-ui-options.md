# Defining UI Options

<div class="otp" id="no-index">

### On this page
- [Enabling Page Builder options](#enabling-page-builder-options)
- [Best practices](#best-practices)
- [How .json entries govern page builder's UI](#how-json-entries-govern-page-builders-ui)
- [Page Builder data types](#page-builder-data-types)
- [Page Builder data structure in `schema.json`](#page-builder-data-structure-in-schemajson)
- [Troubleshooting](#troubleshooting)

</div>

You are free to decide which properties of your theme to make editable in Page Builder, and in which order to display them. Page Builder can expose any set of properties as long as your `schema.json` declares them using the data types that Page Builder supports.

## Enabling Page Builder options

To provide merchants with Page Builder customization options, you must declare those options in the theme's `schema.json file`. You must also include those settings in your theme's `config.json` file, templates, and Sass/CSS files. The basic division of labor is as follows:
* `schema.json` is an array of objects, declaring which theme settings are editable in Page Builder. These objects also declare all possible values to display in Page Builder's GUI.
* `config.json` assigns (and updates) a default value for each of the editable settings.
* Each `schema.json` entry has an id element that maps it to its corresponding config.json entry. The id value identifies the relevant config.json key name.
* For front-matter properties to be editable, your theme's Handlebars template must call certain Handlebars helpers to transform the config.json entries into JavaScript values.
* For fonts to be editable, a Sass stylesheet must call certain custom Sass functions to transform the `config.json` font entries into CSS values.
* For styles to be editable, a Sass stylesheet must call certain custom Handlebars helpers to transform the `config.json` entries into CSS values.

As users select options within the Page Builder UI (and save their selections), Stencil will automatically rewrite `config.json` to record new defaults for the theme.

### File management requirements

See Stencil's default Cornerstone theme for examples that fulfill all of the above requirements. However, remember these hard requirements:

* For any theme setting (such as a Sass variable or a front-matter value) to be merchant-customizable, that setting (and it's values) must be present in `schema.json`. You must manually provide these declarations, according to the structure described here.
* Also, each key that you create in `schema.json` must have a corresponding `config.json` key whose name matches its id value. This `config.json` key sets the default value (even if that is an empty string). A `schema.json` setting without an `id`-matched `config.json` key will not appear to users in the Page Builder GUI.

## Best practices

Please follow these guidelines to head off errors upon theme upload, and to avoid possible loss of customizations made via the Page Builder GUI at runtime:

* Single-Instance restriction per storefront: We strongly recommend opening only one instance of Page Builder, at a time, against each storefront. This is because there is currently no synchronization mechanism to reconcile configuration changes made by multiple Page Builder instances. So `schema.json` will record the last changes made by any instance, but changes saved earlier by other instances might be lost.
* Single-storefront restriction per editor: In the current release, users can have only one storefront at a time open in Page Builder (a workaround is to open an "Incognito"/private-browsing window on an additional storefront, to bypass the cookie that imposes this restriction).
* File name, Location, and structure: Your theme's `schema.json` file must be named `schema.json`, must reside in the root of your theme directory and must be valid JSON.
* File size: The maximum size for a `schema.json` file is 64 KB. Exceeding this limit will trigger an error upon uploading the theme to BigCommerce (other than this size constraint, there is no limit on the number of keys and values that you can place in a theme's `schema.json`).

## How .json entries govern page builder's UI

Your entries in the `schema.json` and `config.json` directly shape users' options in Page Builder:
* Theme variations always appear at the top of the Page Builder panel. These variations are defined only in `config.json`, and their definition order in that file governs their display order in Page Builder.
* Merchants must select one variation to edit, at a time, in Page Builder. The selections that they make in the remainder of Page Builder's UI will apply to only that selected variation.
* Page Builder's remaining sequence of top-level (section) headings corresponds directly to the sequence of top-level (section) objects that you declare in `schema.json`

The options displayed within these expandable Section headings correspond directly to the keys/values that you nest within `schema.json`'s corresponding Section objects.

In all, the structure that you give your theme's `config.json` and `schema.json` files directly governs the UI that Page Builder exposes to merchants. So these files provide your UI design tools.

## Page Builder data types

Page Builder supports these data types:
* color
* font
* select [drop-down list]
* checkbox
* imageDimension
* text

Within `schema.json`, each object's data type is declared in a statement like the one highlighted here:

```json
 {
  "type": "color",
  "label": "Text Color",
  "id": "body-font-color"
},
```

### Types versus "heading"lLabels

Within `schema.json`, you will also see `"type": "heading"` statements like the one below.

```json
{
    "name": "Colors",
    "settings": [
      {
        "type": "heading",
        "content": "General"
      },
      {
        "type": "color",
        "label": "Text Color",
        "id": "body-font-color"
      },
    {...}
     ]
}
```

These `"type": "heading"` statements do not reference data types. Rather, they declare display captions for the Page Builder UI's subcategories – the middle level nested within the section headings, but outside the individual options from which merchants can select (inner options are designated by `"label": <label-text>` statements).

## Page Builder data structure in `schema.json`

The `schema.json` nesting structure that you just saw maps directly to the Page Builder UI displayed to merchants: Below the `variations` section (whose data are imported from `config.json`), the order and nesting of options in Page Builder's UI directly matches the order and nesting of your `schema.json` entries.

## Troubleshooting

You may experience an issue when setting up the Page Builder UI. For any unexpected behavior that you encounter while developing your Stencil theme, we recommend that you check the terminal window where you started Stencil CLI. In some cases, the terminal will provide a verbose error message specifying where to look for problems. For less-detailed error messages, see the below list of potential issues and diagnostic suggestions.

### Empty drop-down list in Page Builder panel

* **Symptom:** A drop-down list’s outline appears below its configured label. However, the list appears to be empty.
* **Likely Cause:** A default value specified in the theme’s config.json file is not enumerated in the schema.json file.
* **Resolution:** Update schema.json to include the config.json value.

### Configured control missing from Page Builder panel
* **Symptom:** A control that you have configured within schema.json is completely absent from the Page Builder UI.
* **Likely Cause:** The specified “type” is one of: text, text area, radio [button], or image (Page Builder does not currently support these data types).
* **Resolution:** Display the user option via one of the supported data types: color, font, select [drop-down list], or checkbox.

### Theme changes not saved from Page Builder UI
* **Symptom:** Changes saved in a browser’s Page Builder panel are not reflected in the storefront.
* **Likely Cause:** Check whether Page Builder to customize the same storefront.
* **Resolution:** We strongly recommend opening only one instance of Page Builder, at a time, per storefront. BigCommerce currently provides no synchronization mechanism for configuration changes from multiple Page Builder instances. So the storefront’s schema.json will record the last changes made by any instance – but changes saved earlier by other instances might be lost.
