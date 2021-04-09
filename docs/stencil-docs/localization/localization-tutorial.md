# Localization Tutorial
<div class="otp" id="no-index">

### On this page
- [Getting started](#getting-started)
- [Creating translation keys](#creating-new-translation-keys)
- [Update browser settings](#updating-browser-settings)
- [Resources](#resources)

</div>

You have the option of localizing your theme for desired target languages. This tutorial describes the case of localizing a storefront for multiple languages. The translated values are displayed depending on the language selected in your browser. By the end of this tutorial, you should be familiar enough to localize headers, footers, buttons, payment methods, or any part of your theme.

This article assumes you have familiarity with the following concepts:

* [Installing Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil)
* [Creating a Stencil CLI Token](https://support.bigcommerce.com/s/article/Store-API-Accounts)
* [Downloading and Uploading Custom Themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload)
* [Serving a live preview](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/live-previewing-a-theme#serving-a-live-preview)

### Prerequisites

* For this tutorial, you will need to use Stencil CLI and use [Browsersyn](https://github.com/bigcommerce/browser-sync) to serve up a live preview of a theme in development.

## Getting started
1. Within the Stencil theme, go to the top-level `/lang` subdirectory. You will save your language files here. Each language requires its own JSON file. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->
> **NOTE:** The `/lang` subdirectory includes the `/en.json` file. Both files must be present for a Stencil theme to work.

</div>
</div>
</div>

2. Use the `en.json` file to prepare your language file. Copy over the necessary key-value pairs and update the values.

```json
 ar.json                                           fr.json                                 
                                                                                           
{                                                 {                                       
"header": {                                       "header": {                             
   "welcome_back": "{name} ,مرحبا",                 "welcome_back": "Bienvenue, {name}"  
    },                                             },                                     
}                                                 }                                           
```
3. Name your translation file based on the [BCP 47 specification](https://tools.ietf.org/html/bcp47) of language and region codes.

## Creating translation keys

Perform the following steps to create new key-value pairs and invoke a defined translation key.

1. Add a key-value pair to a language file.
  
  For example, in en.json, add `powered_by`.

```html
"footer": {
        "title": "Footer Start",
        "brands": "Popular Brands",
        "navigate": "Site Navigate",
        "info": "Info",
        "categories": "Categories",
        "call_us": "Call us at {phone_number}",
        "powered_by": "Powered by"
    },
```
2. You can use the handlebars `lang` directive in the appropriate file to show a translated string.

```html
{{lang "translation.key" optionalVariable="someValue"}}
```
For this example, update footer.html as shown below.

```html
{{#if theme_settings.show_powered_by}}
  {{lang 'footer.powered_by'}} BigCommerce
```

## Update browser settings

Follow the steps below to update your language browser to display the translation on the storefront.

1. In your browser, go to **Settings** > **Advanced**.
2. Select languages.
3. Expand the language dialog and click **Add languages**.
4. Select the language and click **Add**.
5. Drag the newly selected language to the top of the list.
6. Refresh your browser to see the translations.

## Resources
* [Translation Keys](https://developer.bigcommerce.com/stencil-docs/localization/translation-keys)
* [Customizing a Theme - lang directory Video Demo (YouTube)](https://www.youtube.com/embed/ygiRGfSrmnA)
* [JSON translation file (BigCommerce GitHub)](https://github.com/bigcommerce/cornerstone/tree/master/lang)
* [Handlebars helpers reference](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#string-helpers)
