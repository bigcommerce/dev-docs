# Store Design Overview

<div class="otp" id="no-index">

### On This Page
- [Configuration files](#configuration-files)
- [Managing keys between versions](#managing-keys-between-versions)
- [Persistent settings storage](#persistent-settings-storage)
- [Theme upgrades and settings](#theme-upgrades-and-settings)
- [Resources](#resources)

</div>

The [Store Design](https://support.bigcommerce.com/s/article/Store-Design) UI in a store's control panel allows merchants to customize theme styles, colors, fonts, and buttons without writing code. This article describes how developers can add settings to this UI by modifying theme configuration files.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Store Design's new name is [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview); it now supports widget configuration.

</div>
</div>
</div>

## Configuration files

There are two main configuration files for theme UI settings.

|Filename | Description
|-|-|
|`schema.json`|defines theme UI settings|
|`config.json`|sets default values for theme UI settings|

To add a setting to the UI, define it in [`schema.json`](https://github.com/bigcommerce/cornerstone/blob/master/schema.json).

```json
[
  {
    "name": "i18n.Global",
    "settings": [
      {
        "type": "color",
        "label": "i18n.BannerBackground",
        "id": "color-primary"
      }
    ]
  }
]
```

Then, set it's default value in [`config.json`](https://github.com/bigcommerce/cornerstone/blob/master/config.json).

```json
{
    "settings": {
        "color-primary": "#ff957f"
    }
}

```

[Learn more about defining UI options](https://developer.bigcommerce.com/stencil-docs/configure-store-design-ui/defining-ui-options).

## Managing keys between versions

We recommend developer do the following to ensure changes to theme settings are backward compatible:
* Use caution when removing setting definitions in `schema.json`; doing so can break the theme's backward compatibility.
* Avoid renaming settings in `schema.json`; add a new setting instead.

## Persistent settings storage

BigCommerce's configuration service stores setting values configured in the UI whenever a user saves and uses those values when rendering the theme on the storefront.

## Theme upgrades and settings

Existing settings saved to the configuration service persist across theme version updates. Here's an example scenaio:

1. You release theme `v1.0`; it defines a `logo_size` setting with a default value of `100x250`.
2. In the UI, a user changes `logo_size` to `175x275`;
3. You release theme `v1.1` which changes `logo_size` default value to `300x300`.
4. When the merchant applies theme `v1.1`, the value of `175x275` saved to the configuration service remains in effect.
5. The merchant creates a new store and applies theme `v1.1` to it; that store's `logo_size` defaults to `300x300`.

## Resources

### Related articles
* [Defining Global Styles](https://developer.bigcommerce.com/stencil-docs/configure-store-design-ui/defining-global-styles)
* [Defining UI Options](https://developer.bigcommerce.com/stencil-docs/configure-store-design-ui/defining-ui-options)
* [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview)
* [Store Design](https://support.bigcommerce.com/s/article/Store-Design) (Help Center)