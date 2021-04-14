# Localization Tutorial
<div class="otp" id="no-index">

### On this page
- [Getting started](#getting-started)
- [Creating translation keys](#creating-translation-keys)
- [Updating browser settings](#updating-browser-settings)
- [Resources](#resources)

</div>

You have the option of localizing your theme for desired target languages. This tutorial describes the case of localizing a storefront for multiple languages. The translated values are displayed depending on the language selected in your browser. By the end of this tutorial, you should be familiar enough to localize headers, footers, buttons, payment methods, or any part of your theme.

### Prerequisites

For this tutorial, you will need to use Stencil CLI and use [Browsersync](https://github.com/bigcommerce/browser-sync) to serve up a live preview of a theme in development.

This article assumes you have familiarity with the following concepts:

* [Installing Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil)
* [Creating a Stencil CLI Token](https://support.bigcommerce.com/s/article/Store-API-Accounts)
* [Downloading and Uploading Custom Themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload)
* [Serving a live preview](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/live-previewing-a-theme#serving-a-live-preview)


## Getting started
1. After downloading and extracting your Stencil theme, open the folder containing your theme files and navigate to the `/lang` subfolder. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->
> **NOTE:** The `/lang` subfolder includes the `en.json` file. The `en.json` file and your language file must be present for a localized Stencil theme to work. Each language requires its own JSON file. 

</div>
</div>
</div>

2. Use the `en.json` file and copy over the necessary key-value pairs. Update the values to create your language files.

 ar.json
```json                                                                                           
{                                                                                       
"header": {                                                                   
   "welcome_back": "{name} ,مرحبا",
   "skip_to_main": "تخطي إلى المحتوى الرئيسي"
    },                                                                                 
}                                                                                          
```

fr.json
```json
{
"header": {
  "welcome_back": "Bienvenue, {name}",
  "skip_to_main": "aller au contenu principal"
   },
 }
```
3. Name your translation file based on the [BCP 47 specification](https://tools.ietf.org/html/bcp47) of language and region codes.

## Creating translation keys

Perform the following steps to create new key-value pairs and invoke a defined translation key.

1. Add a key-value pair to a language file.
  
  For example, in `en.json`, add `new_hours`.

```json
"header": {
        "welcome_back": "Welcome back, {name}",
        "skip_to_main": "Skip to main content",
        "new_hours": "Summer hours: {hours}"
    },

```
In `ar.json`, add `new_hours` and the Arabic translation.

```json
"header": {
        "welcome_back": "{name}, أهلا وسهلا!",
        "skip_to_main": "تخطي إلى المحتوى الرئيسي",
        "new_hours": "{hours}: ساعات الصيف"
    },

```
In `fr.json`, add `new_hours` and the French translation.

```json
"header": {
        "welcome_back": "Bienvenue, {name}",
        "skip_to_main": "aller au contenu principal",
        "new_hours": "heures d'ouverture: {hours}"
    },

```

2. You can use the handlebars `lang` directive in the appropriate file to show a translated string.

For this example, update `Cornerstone-5.3.0/templates/components/common/header.html` using the code below. Add the code after the `{{/if}}` tag and before the `<header>` tag.

```html
{{/if}} 
{{> components/common/alert/alert-success (lang 'header.new_hours' hours="8 AM to 5 PM Central" ) }}
<header class="header" role="banner">
```

## Update browser settings

Follow the steps below to update your language browser to display the translation on the storefront.

**NOTE:** These steps are for the Chrome internet browser. Other browsers my look and act differently. We suggest previewing your site to ensure the localization is working.

1. In your browser, go to **Settings** > **Advanced**.
2. Select languages.
3. Expand the language dialog and click **Add languages**.
4. Select the language and click **Add**.
5. Drag the newly selected language to the top of the list.
6. Refresh your browser to see the translations.

## Resources
* [Translation Keys](https://developer.bigcommerce.com/stencil-docs/localization/translation-keys)
* [Customizing a Theme - lang directory Video Demo (YouTube)](https://www.youtube.com/watch?v=ygiRGfSrmnA)
* [JSON translation files (BigCommerce GitHub)](https://github.com/bigcommerce/cornerstone/tree/master/lang)
* [Handlebars helpers reference](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#string-helpers)
