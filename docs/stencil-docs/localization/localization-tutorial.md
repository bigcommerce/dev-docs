# Localization Tutorial
<div class="otp" id="no-index">

### On this page
- [Adding a language file](#adding-a-language-file)
- [Creating translation keys](#creating-translation-keys)
- [Updating browser settings](#updating-browser-settings)
- [Related resources](#related-resources)

</div>

You can localize your Stencil theme for your desired target language. This tutorial describes how to localize a storefront in Spanish. By following this method, you can display a specific language based on the language selected in the viewer's browser. By the end of this tutorial, you will have the tools to localize most areas of your theme.

### Prerequisites

In this tutorial, we will use Stencil CLI and [Browsersync](https://github.com/bigcommerce/browser-sync) to serve up a live preview of a theme in development.

To complete this tutorial, you should be familiar with the following concepts:

* [Installing Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil)
* [Creating a Stencil CLI Token](https://support.bigcommerce.com/s/article/Store-API-Accounts)
* [Downloading and uploading custom themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload)
* [Serving a live preview](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/live-previewing-a-theme#serving-a-live-preview)


## Adding a language file
1. After downloading and extracting your Stencil theme, open the folder containing your theme files and navigate to the `/lang` subfolder. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->
### Note

The `/lang` subfolder includes the `en.json` file and example language files. The `en.json` file and your language file must be present for a localized Stencil theme to work. Each language requires its own JSON file. 

</div>
</div>
</div>

2. Name your translation file `es.json` and save it in the `/lang` subfolder. Translation files are named based on the [BCP 47 specification](https://tools.ietf.org/html/bcp47) of language and region codes.

3. Copy the desired key-value pairs from the `en.json` file and paste them into your newly-created `es.json` file. Update the values to create your language file.

en.json
```json
{
"header": {
  "welcome_back": "Welcome back, {name}",
  "skip_to_main": "Skip to main content"
   },
 }
```

es.json
```json
{
"header": {
  "welcome_back": "Bienvenidos, {name}",
  "skip_to_main": "Saltar a la principal"
   },
 }
```


## Creating translation keys

Perform the following steps to create new key-value pairs and invoke a defined translation key.

1. Add a key-value pair to a language file.
  
  In `en.json`, add `new_hours` key and corresponding information for the value.

```json
"header": {
        "welcome_back": "Welcome back, {name}",
        "skip_to_main": "Skip to main content",
        "new_hours": "Summer hours: {hours}"
    },

```
In `es.json`, add the same `new_hours` key and the Spanish translation of the value.

```json
"header": {
        "welcome_back": "Bienvenidos, {name}",
        "skip_to_main": "Saltar a la principal",
        "new_hours": "Horario de verano: {hours}"
    },

```
2. Use the Handlebars `lang` directive in the appropriate file to show a translated string.

For this example, update `/templates/components/common/header.html` using the code below. Add the code after the `{{/if}}` tag and before the `<header>` tag.

```html
{{/if}} 
{{> components/common/alert/alert-success (lang 'header.new_hours' hours="8 AM to 5 PM Central" ) }}
<header class="header" role="banner">
```

## Updating browser settings

Update your language browser to display the translation on the storefront. The following steps are for the Chrome browser.

1. In your browser, go to **Settings** > **Advanced**.
2. Select **Languages**.
3. Expand the language dialog and click **Add languages**.
4. Select your desired language and click **Add**.
5. Drag the newly selected language to the top of the list.
6. Refresh your browser to see the translations.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->
### Note

Other browsers may look and act differently. We suggest previewing your site to ensure the localization is working as expected.

</div>
</div>
</div>

## Related resources
* [Translation Keys](https://developer.bigcommerce.com/stencil-docs/localization/translation-keys)
* [Customizing a Theme - lang directory Video Demo (YouTube)](https://www.youtube.com/watch?v=ygiRGfSrmnA)
* [JSON translation files (BigCommerce GitHub)](https://github.com/bigcommerce/cornerstone/tree/master/lang)
* [Handlebars helpers reference](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#string-helpers)
