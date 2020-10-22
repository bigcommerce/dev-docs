# Theme Styles Configuration

<div class="otp" id="no-index">

### On this page
- [Enabling Page Builder Theme Styles options](#enabling-page-builder-theme-styles-options)
- [How .json entries govern Page Builder's UI](#how-json-entries-govern-page-builders-ui)
- [Theme Styles data types](#theme-styles-data-types)
- [Theme Styles data structure in schema.json](#theme-styles-data-structure-in-schemajson)
- [Best practices](#best-practices)
- [Managing keys between versions](#managing-keys-between-versions)
- [Persistent settings storage](#persistent-settings-storage)
- [Theme upgrades and settings](#theme-upgrades-and-settings)
- [Troubleshooting](#troubleshooting)

</div>

## Enabling Page Builder Theme Styles options

Each theme contains two related JSON files: `config.json` and `schema.json`. To provide merchants with Theme Styles customization options, you must declare those options in the theme's `schema.json` file. Additionally, you must include those settings in your theme's `config.json` file, templates, and Sass/CSS files. 

As users select and save options within the Page Builder UI, Stencil will automatically rewrite the theme's `config.json` file to record new defaults.

The basic division of labor is as follows:
* `schema.json` is an array of objects, declaring which theme settings are editable in Theme Styles. These objects also declare all possible values to display in Page Builder UI.
* `config.json` contains metadata about the theme, such as its name, version, and resource controls.
* `config.json` assigns and updates a default value for each of the editable settings.
* Each `schema.json` entry has an ID element that maps it to its corresponding `config.json` entry. The ID value identifies the relevant `config.json` key name.
* Keys located in both configuration files'`settings` define the theme's look, feel, and functionality.
* Keys located in the `variations` object of `config.json` define variations of the theme. There is no limit to the number of variations each theme can include.
* For front-matter properties to be editable, your theme's Handlebars template must call certain Handlebars helpers to transform the `config.json` entries into JavaScript values.
* For fonts to be editable, a Sass stylesheet must call certain custom Sass functions to transform the `config.json` font entries into CSS values.
* For styles to be editable, a Sass stylesheet must call certain custom Handlebars helpers to transform the `config.json` entries into CSS values.

For documentation on the Cornerstone theme's principal keys, see Cornerstone's [config.json Metadata](https://github.com/bigcommerce/cornerstone/blob/master/config.json) and [schema.json Metadata](https://github.com/bigcommerce/cornerstone/blob/master/schema.json) entries. 

### File management requirements

For any theme setting to be merchant-customizable, that setting and its values must be present in `schema.json`. You must provide these declarations manually.

Each key that you create in `schema.json` must have a corresponding `config.json` key whose name matches its ID value. This `config.json` key sets the default value even if that is an empty string. A `schema.json` setting without an `id`-matched `config.json` key will not appear to users in the Page Builder UI.

## How .json entries govern Page Builder's UI

Your entries in the `schema.json` and `config.json` directly shape users' options in Theme Styles:
* Theme variations always appear at the top of the Theme Styles panel. These variations are defined only in `config.json`, and their definition order in that file governs their display order in Theme Styles.
* Merchants must select one variation to edit at a time. The selections that they make in the remainder of Page Builder's UI will apply only to that selected variation.
* Theme Styles remaining sequence of top-level section headings corresponds directly to the top-level section objects that you declare in `schema.json`. The options displayed within these expandable section headings correspond directly to the key-value pairs that you nest within `schema.json`'s corresponding section objects.

In all, the structure that you give your theme's `config.json` and `schema.json` files directly governs the UI that Page Builder exposes to merchants. 

## Theme Styles data types

You are free to decide which properties of your theme to make editable in Theme Styles and in which order to display them. Theme Styles can expose any set of properties as long as your `schema.json` declares them using the data types that Theme Styles supports.

Theme Styles supports the following data types:
* color
* font
* select (drop-down list)
* checkbox
* imageDimension
* text

Within `schema.json`, you can declare each object's data type in a statement like the one highlighted here:

```json
 {
    "type": "color",
    "label": "Text Color",
    "id": "body-font-color"
 },
```

### Types versus "heading" labels

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

These `"type": "heading"` statements do not reference data types. Rather, they declare display captions for the Page Builder UI's subcategories – the middle level nested within the section headings, but outside the individual options from which merchants can select. Inner options are designated by `"label": <label-text>` statements.

## Theme Styles data structure in `schema.json` 

The `schema.json` nesting structure maps directly to the Page Builder UI displayed to merchants. Below the `variations` section, which contains data imported from `config.json`, the order and nesting of Page Builder's UI options directly match the order and nesting of your `schema.json` entries.

## Best practices

To prevent errors upon theme upload and avoid possible loss of customizations made through the Page Builder UI at runtime, please follow these guidelines:

* **Single-instance restriction per storefront.** We strongly recommend opening only one instance of Theme Styles at a time against each storefront. We recommend this because there is currently no synchronization mechanism to reconcile configuration changes made by multiple Theme Styles instances. The `schema.json` file will record the last changes made by any instance, but changes saved earlier by other instances might be lost.
* **Single-storefront restriction per editor.** In the current release, users can have only one storefront open in Theme Styles at a time. To bypass the cookie that imposes this restriction, a workaround is to open an "Incognito"/private-browsing window on an additional storefront.
* **File name, location, and structure.** Your theme's `schema.json` file must be named `schema.json`. It must reside in the root of your theme directory and must be valid JSON.
* **File size.** The maximum size for a `schema.json` file is 64 KB. Exceeding this limit will trigger an error upon uploading the theme to BigCommerce. Apart from this size constraint, there is no limit on the number of keys and values that you can place in a theme's `schema.json`.

## Managing keys between versions

To make sure revisions to your theme are backward-compatible, we recommend managing keys in your `config.json` and `schema.json` files in an additive way. For specific recommendations, see the following table:

| Action | Recommendation |
| ----------- | ----------- | 
| Adding a new key | Adding new keys is generally acceptable. However, each key in `schema.json` must have a matching default in `config.json`. |
 Deleting a key | Use caution when deleting a key. Doing so can break your new theme version's backward compatibility. | 
 Renaming a key | We do not recommend renaming keys. Instead, we recommend introducing a new key while maintaining the old key until there is no longer a need to use an older version of your theme.|
 Removing a variation| Each object within your `config.json` file's `variations` object defines one theme variation. If you adapt an existing theme and consciously want to remove one or more variations, you can remove the corresponding key(s). |

## Persistent settings storage

When store administrators use Theme Styles to customize your store's theme, they save the store's resulting configuration settings to a separate configuration service at BigCommerce.

## Theme upgrades and settings

When a merchant upgrades your theme to a newer version, they carry forward all key-value pairs saved to the BigCommerce configuration service. For example, assume this customization/upgrade scenario:

You release your Star Glow theme, version 1.0. This theme's `config.json` includes a key named `logo_size`, establishing a default value of 100 x 250px. The combination of the key and the value composes a `logo_size` setting.
The merchant uses Page Builder to change the `logo_size` setting to 175 x 275px and stores this customized setting in the BigCommerce configuration service.
You release Star Glow, version 1.1. In this theme revision, you have changed the `logo_size` to 300 x 300px.
When the merchant applies Star Glow version 1.1 to their store, their custom `logo_size` setting of 175 x 275px remains in effect.
If the merchant creates a second store and applies Star Glow version 1.1 to it, that store will not have a custom `logo_size` setting and will default to the new theme version's 300 x 300px value.

## Troubleshooting

You may experience an issue when setting up the Page Builder UI. We recommend that you check the terminal window where you started Stencil CLI for any unexpected behavior that you encounter while developing your Stencil theme. In some cases, the terminal will provide a lengthy error message specifying where to look for problems. For less-detailed error messages, see the below list of potential issues and diagnostic suggestions.

### Empty drop-down list in Theme Styles panel

* **Symptom:** A drop-down list's outline appears below its configured label. However, the list appears to be empty.
* **Likely Cause:** The `schema.json` file does not list a default value specified in the theme's `config.json` file.
* **Resolution:** Update `schema.json` to include the `config.json` value.

### Configured control missing from Theme Styles panel

* **Symptom:** A control that you have configured within `schema.json` is completely absent from the Page Builder UI.
* **Likely Cause:** The specified data type is one of the following: text, text area, radio [button], or image. Theme Styles does not currently support these data types.
* **Resolution:** Display the user option using one of the supported data types: color, font, select (drop-down list), or checkbox.

### Theme changes not saved from Page Builder UI

* **Symptom:** The storefront does not reflect changes saved in a browser's Theme Styles panel.
* **Likely Cause:** Check whether Theme Styles can customize the same storefront.
* **Resolution:** We strongly recommend opening only one instance of Theme Styles at a time per storefront. BigCommerce currently provides no synchronization mechanism for configuration changes from multiple Theme Styles instances. So the storefront’s `schema.json` will record the last changes made by any instance, but changes saved earlier by other instances might be lost.
