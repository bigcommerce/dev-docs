# Localizing Stores



A BigCommerce storefront can be customized to display in any one language of your choice. To fully localize a store for a language or region, you will need to customize three areas:


* [**Storefront theme pages.**](#translating-theme-files-via-stencil-cli)Translate static strings by adding translation files for your chosen languages via Stencil CLI.

* [**Checkout.**](#localizing-checkout) Localize checkout by modifying theme files in Stencil CLI and settings in the BigCommerce control panel.

* [**Storefront content.**](#localizing-your-storefront-content) Adjust other localization details in the BigCommerce control panel.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Storefront language support
> Each storefront can only support a single language. To display multiple languages, we recommend setting up a separate store for each language.

</div>
</div>
</div>

## Localizing theme files

Localize your theme by adding translation files via Stencil CLI.

### Translating theme files by Stencil CLI

The bulk of localizing a store is translating content on your theme's page templates. You will need to abstract these templates' literal text strings into `{{lang}}` variables, then provide per-language JSON files that define these variables in corresponding key/value pairs.

### Multiple language strings by BigCommerce

Currently, you cannot edit strings such as "This promotion cannot be applied with the selected currency" in BigCommerce. The language settings for these strings are not defined by the shopper's browser language settings. Rather, you select your storefront's display language using the default language setting found in the control panel's [Store Profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings#locale). This language setting determines the language of your storefront content.


BigCommerce supports these uneditable strings in the following languages:
* [Dutch](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-nl-NL.po)
* English
* [French](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-fr-FR.po)
* [German](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-de-DE.po)
* [Italian](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-it-IT.po)
* [Portuguese (Brazil)](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-pt-BR.po)
* [Swedish](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-sv-SE.po)


You can review these strings by downloading the language files we have made available in the portable object format. We recommend viewing these in a simple text editor or a text editor designed to handle PO files.

## Localizing checkout

Localizing your theme's checkout and order confirmation pages requires customizations within the default checkout page and the order confirmation HTML file. See [Multi-language setup](/stencil-docs/localization/multi-language-checkout) for details.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Checkout localization
> Checkout localization is only available for [Optimized One-Page Checkout](/stencil-docs/customizing-checkout/optimized-one-page-checkout).

</div>
</div>
</div>

## Localizing your storefront content

Localize the control panel and options outside your theme by accessing the [Default Language setting, found in the control panel's Store Profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings#locale). The Store Profile allows localization of the following items:

* [Product catalog](#localizing-the-product-catalog)
* [Currency](#localizing-currency)
* [Date format](#localizing-date-format)
* [Order statuses](#localizing-order-statuses)
* [Blog](#localizing-the-blog)
* [Static web pages](#localizing-static-web-pages)
* [Transactional emails](#managing-transactional-emails)
* [Gift certificates](#managing-gift-certificates)
* [System messages](#managing-system-messages)

### Localizing the product catalog

You must localize the store's product catalog separately from its theme. Each entry within a catalog can be set up in only one language, so you will need to localize a separate version of your catalog for each single-language store.

For an overview of how to populate the store catalog, including options for bulk-importing content that you can localize outside the BigCommerce platform, see [Adding Products](https://support.bigcommerce.com/s/article/Adding-Products-v3).

### Localizing currency
You can configure each store's default currency in the BigCommerce control panel. For details, see [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default).

### Localizing date format
You can set the appropriate date format for your store's language/region in the BigCommerce control panel: **Store Setup** › **Store Settings** › [**Date & Timezone**](http://login.bigcommerce.com/deep-links/manage/settings/store). For details, see [Date & Timezone Settings](https://support.bigcommerce.com/s/article/Store-Settings#date-time).

### Localizing order statuses
You can configure the `order-status` labels displayed on a BigCommerce storefront outside your theme. You can translate each of these strings in the BigCommerce control panel under **Orders** ›
 [**Order Statuses**](http://login.bigcommerce.com/deep-links/manage/orders/order-statuses). For instructions, see [Customizing an Order Status Label](https://support.bigcommerce.com/s/article/Order-Statuses#rename).

### Localizing the blog
Blog entries are managed through the BigCommerce control panel under **Storefront Content** ›
 [**Blog**](https://login.mybigcommerce.com/manage/content/blog). You can add blog content in any language you choose. For details, see [Creating a Blog Post](https://support.bigcommerce.com/s/article/Using-the-Built-In-Blog#creating-post).

### Localizing static web pages
If you create static pages as Stencil custom templates, you can localize their content just like other theme pages' content. However, if you create custom pages in the BigCommerce control panel under **Storefront Content** › [**Web Pages**](http://login.bigcommerce.com/deep-links/manage/content/pages), you must also enter their localized content in the control panel.

### Managing transactional emails

To fully localize a store into a language other than English, disable the sending of BigCommerce native emails. To disable native emails, go to **Storefront** › [**Email Templates**](http://login.bigcommerce.com/deep-links/manage/storefront-manager/email-templates). Uncheck each email type that you prefer to customize.

You can localize transactional emails by using compatible third-party apps such as [CM Commerce](https://www.bigcommerce.com/apps/cm-commerce/).

### Managing gift certificates

To fully localize your store, disable gift certificates in the BigCommerce control panel.

### Managing system messages
You can localize a store's payment and checkout error messages via checkout-js in the BigCommerce control panel. For a list of error messages and supported languages, see [Verbose Error Messages at Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout#verbose).

To customize payment and checkout messages, define these variables in the theme language files. For details, see [Multi-language setup](/stencil-docs/localization/multi-language-checkout#multi-language-setup).


## Resources

### Related articles

* [Translation Keys](/stencil-docs/localization/translation-keys)
* [Restyle Optimized One-Page Checkout](/stencil-docs/customizing-checkout/optimized-one-page-checkout)
* [Multi-Language Checkout](/stencil-docs/localization/multi-language-checkout)
* [Adding Products](https://support.bigcommerce.com/s/article/Adding-Products-v3) (BigCommerce Knowledge Base)
* [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default)(BigCommerce Knowledge Base)

### Additional resources

* [checkout.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html) (BigCommerce GitHub)
* [order-confirmation.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html) (BigCommerce GitHub)
* [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang) (BigCommerce GitHub)

### Language files

* [Dutch](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-nl-NL.po)
* [French](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-fr-FR.po)
* [German](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-de-DE.po)
* [Italian](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-it-IT.po)
* [Portuguese (Brazil)](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-pt-BR.po)
* [Swedish](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/PO/storefront-sv-SE.po)
