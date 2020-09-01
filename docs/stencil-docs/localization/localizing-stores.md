# Localizing Stores

<div class="otp" id="no-index">

### On This Page
- [Translating theme files via Stencil CLI](#translating-theme-files-via-stencil-cli)
- [Localizing checkout](#localizing-checkout)
- [Localizing control panel content](#localizing-control-panel-content)
- [Resources](#resources)

</div>

A BigCommerce storefront can be customized to display in any one language of your choice. To fully localize a store into a language/region other than U.S. English, you will need to customize three areas:

* [**Storefront theme pages.**](#translating-theme-files-via-stencil-cli)Translate static strings by adding translation files for your chosen non-English languages via Stencil CLI.

* [**Checkout.**](#localizing-checkout) Localize checkout by modifying theme files in Stencil CLI and settings in the BigCommerce control panel.

* [**Control panel.**](#localizing-control-panel-content) Adjust other localization details in the BigCommerce control panel.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Storefront language support
> Each storefront can only support a single language. To display multiple languages, we recommend setting up a separate store for each language.

</div>
</div>
</div>

## Translating theme files via Stencil CLI

The bulk of localizing a store is translating content on your theme's page templates. You will need to abstract these templates' literal text strings into `{{lang}}` variables, then provide per-language JSON files that define these variables in corresponding key/value pairs.

## Localizing checkout

Localizing your theme's checkout and order confirmation pages requires customizations within:

* the corresponding templates ([checkout.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html) and [order-confirmation.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html))
* each [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang)
* the [BigCommerce control panel](http://login.bigcommerce.com/deep-links/manage/)

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Checkout localization
> Checkout localization is only available for [Optimized One-Page Checkout](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/optimized-one-page-checkout).

</div>
</div>
</div>

## Localizing control panel content

The remaining localization options reside outside your theme and are accessible through the BigCommerce control panel:

* [Product catalog](#product-catalog)
* [Currency](#currency)
* [Date format](#date-format)
* [Order statuses](#order-statuses)
* [Blog](#blog)
* [Static web pages](#static-web-pages)
* [Transactional emails](#transactional-emails)
* [Gift certificates](#gift-certificates)

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Transactional emails or gift certificates translation
> The BigCommerce platform does not currently support translation of transactional emails or gift certificates into languages other than English, so instead we have provided a best practice for each.

</div>
</div>
</div>

### Localizing the product catalog

You must localize the store's product catalog separately from its theme. Each entry within a catalog can be set up in only one language, so you will need to localize a separate version of your catalog for each single-language store.

For an overview of how to populate the store catalog, including options for bulk-importing content that you can localize outside the BigCommerce platform, see [Adding Products](https://support.bigcommerce.com/s/article/Adding-Products-v3).

### Localizing currency
Each store's default currency is configured in the BigCommerce control panel. For details, see [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default).

### Localizing date format
You can set the appropriate date format for your store's language/region in the BigCommerce control panel: **Store Setup** › **Store Settings** › [**Date & Timezone**](http://login.bigcommerce.com/deep-links/manage/settings/store). For details, see [Date & Timezone Settings](https://support.bigcommerce.com/s/article/Store-Settings#date-time).

### Localizing order statuses
The `order-status` labels displayed on a BigCommerce storefront are configured outside your theme. You can translate each of these strings in the BigCommerce control panel under **Orders** ›
 [**Order Statuses**](http://login.bigcommerce.com/deep-links/manage/orders/order-statuses). For instructions, see [Customizing an Order Status Label](https://support.bigcommerce.com/s/article/Order-Statuses#rename).

### Localizing the blog
Blog entries are managed through the BigCommerce control panel under **Storefront Content** ›
 [**Blog**](https://login.mybigcommerce.com/manage/content/blog). You can add blog content in any language you choose. For details, see [Creating a Blog Post](https://support.bigcommerce.com/s/article/Using-the-Built-In-Blog#creating-post).

### Localizing static web pages
If you create static pages as Stencil custom templates, you can localize their content just like other theme pages' content. However, if you create custom pages in the BigCommerce control panel under **Storefront Content** › [**Web Pages**](http://login.bigcommerce.com/deep-links/manage/content/pages), you must also enter their localized content in the control panel.

### Managing transactional emails

BigCommerce does not currently provide native support for localizing transactional emails such as order confirmation or status updates. To fully localize a store into a language other than English, disable the sending of BigCommerce native emails.

To disable native emails, go to **Storefront** › [**Email Templates**](http://login.bigcommerce.com/deep-links//manage/storefront-manager/email-templates). Uncheck each email type that you prefer to customize. If you would like to localize transactional emails, see our Partner Apps, such as [CM Commerce](https://www.bigcommerce.com/apps/cm-commerce/), for more details.

### Managing gift certificates

The BigCommerce platform does not currently support translation of gift certificates into languages other than English. To fully localize your store, disable gift certificates in the BigCommerce control panel.


## Resources

### Related Articles

* [Translation Keys](https://developer.bigcommerce.com/stencil-docs/localization/translation-keys)
* [Restyle Optimized One-Page Checkout](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/optimized-one-page-checkout)
* [Multi-Language Checkout](https://developer.bigcommerce.com/stencil-docs/localization/multi-language-checkout)
* [Adding Products](https://support.bigcommerce.com/s/article/Adding-Products-v3) (BigCommerce Knowledge Base)
* [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default)(BigCommerce Knowledge Base)

### Additional Resources

* [checkout.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html) (BigCommerce GitHub)
* [order-confirmation.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html) (BigCommerce GitHub)
* [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang) (BigCommerce GitHub)
