# Store Design Overview

<div class="otp" id="no-index">

### On This Page
- [Configuration Files](#configuration-files)
- [Managing Keys between Versions](#managing-keys-between-versions)
- [Persistent Settings Storage](#persistent-settings-storage)
- [Theme Upgrades and Settings](#theme-upgrades-and-settings)
- [Resources](#resources)

</div> 

[Store Design](https://support.bigcommerce.com/s/article/Store-Design) is a browser-based tool that enables BigCommerce merchants to rapidly modify and customize a storefront's look and feel without writing any code. A merchant using Store Design can customize a storefront theme by modifying characteristics from a variety of menu options such as **Styles, Colors, Typography, Buttons**, and more. 

As a theme developer, you can configure your own settings for Store Design. Your configuration determines the theme's customizable aspects. For example, by customizing the configuration of Store Design, you can modify how merchants can customize colors, fonts, display of page features, and number of products to display per feature.

## Configuration Files

Each theme contains two related JSON files of key-value pairs: <span class="fn">config.json</span> and <span class="fn">schema.json.</span> These files' keys provide the following features:

Keys that you include in <span class="fn">schema.json</span> – together with their corresponding <span class="fn">config.json</span> default values – define the settings that merchants can customize through Store Design's graphical interface.
Other <span class="fn">config.json</span> keys contain metadata about the theme, such as the theme's name, version, and resource controls.
Keys located in <span class="fn">config.json</span>'s `variations` object define variations of the theme. For example, a theme might have a "Light" variation and a "Bold" variation, each with different typography and colors. Each theme can include as many variations as you like.
Keys located under both files' `settings` objects define the theme's look, feel, and functionality.

For documentation on the principal keys included in Stencil's reference Cornerstone theme, see this section's [config.json Metadata](/stencil-docs/stencil-theme-editor/config-json-metadata) and [schema.json Metadata](/stencil-docs/stencil-theme-editor/schema-json-metadata) entries. For an introduction to the graphical editor, see
[Store Design Overview](/stencil-docs/stencil-theme-editor/stencil-theme-editor-overview).

## Managing Keys between Versions

To make sure revisions to your theme are backward-compatibile, we generally recommend that you manage keys in both your <span class="fn">config.json</span> and <span class="fn">schema.json</span> files in an additive way. Specific recommendations:

Adding new keys is generally fine. (However, each key in <span class="fn">schema.json</span> must have a matching default in <span class="fn">config.json</span>.)

* Use caution in deleting any key. Doing so can break your new theme version's backward compatibility.
* We do not recommend renaming keys. Instead, we recommend introducing a new key, while maintaining the old key until it is no longer in use by anyone using an older version of your theme.
* Each object within your <span class="fn">config.json</span> › `variations` object defines one theme variation. If you are adapting an existing theme and consciously want to remove one or more variations, you can do so by removing the corresponding key(s).

## Persistent Settings Storage

When store administrators use Store Design to customize your theme for their store, the store's resulting configuration settings are saved to a separate configuration service at BigCommerce.

## Theme Upgrades and Settings

When a merchant upgrades your theme to a newer version, all key-value pairs that were saved to the BigCommerce configuration service are carried forward. For example, assume this customization/upgrade scenario:

You release your Star Glow theme, version 1. This theme's <span class="fn">config.json</span> includes a key named `logo_size`, establishing a default value of 100x250. The combination of the key and the value compose a `logo_size` setting.
The merchant uses Store Design to change the `logo_size` setting to 175x275. This customized setting is stored in the BigCommerce configuration service.
You release Star Glow, version 1.1. In this theme revision, you have changed the `logo_size` to 300x300.
When the merchant applies Star Glow version 1.1 to their store, their custom `logo_size` setting of 175x275 remains in effect.
If you the merchant creates a second store and applies Star Glow version 1.1 to it, that store has no custom `logo_size` setting – so it will default to the new theme version's 300x300 value.

## Resources

### Related Articles
* [Store Design](https://support.bigcommerce.com/s/article/Store-Design) (BigCommerce Knowledge Base)
