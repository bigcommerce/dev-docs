<h1>Localizing Stores</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#localizing_translating-theme-files">Translating Theme via Stencil CLI</a></li>
    <li><a href="#localizing_localizing-checkout">Localizing Checkout</a></li>
    <li><a href="#localizing_localizing-control-panel">Localizing Control Panel Content</a></li>
	</ul>
</div>

<a href='#localizing_localization-touchpoints' aria-hidden='true' class='block-anchor'  id='localizing_localization-touchpoints'><i aria-hidden='true' class='linkify icon'></i></a>

A BigCommerce storefront can be customized to display in any one language of your choice. To fully localize a store into a language/region other than U.S. English, you will need to customize three areas:

1. [Storefront theme pages](#localizing_translating-theme-files)

_Translate static strings. This requires adding translation files for your chosen non-English languages, via Stencil CLI._

2. [Checkout](#localizing_localizing-checkout) 
 
_Localizing checkout requires modifications both to theme files (in Stencil CLI) and to settings in the BigCommerce control panel._

3. [Control Panel](#localizing_localizing-control-panel)

_Adjust other localization details via the BigCommerce Control Panel._

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Storefront Language Support
> Each storefront can only support a single language. If you want to support displaying multiple languages, we recommend setting up a separate store for each language.

</div>
</div>
</div>

---

<a href='#localizing_translating-theme-files' aria-hidden='true' class='block-anchor'  id='localizing_translating-theme-files'><i aria-hidden='true' class='linkify icon'></i></a>

## Translating Theme via Stencil CLI

The bulk of localizing a store is translating content on your theme's page templates. You will need to abstract these templates' literal text strings into `{{lang}}` variables, then provide per-language JSON files that define these variables in corresponding key/value pairs.

---

<a href='#localizing_localizing-checkout' aria-hidden='true' class='block-anchor'  id='localizing_localizing-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## Localizing Checkout

Localizing your theme's checkout and order confirmation pages requires customizations within:

* the corresponding templates ([checkout.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html) and [order-confirmation.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html)) 
* each [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang) 
* the [BigCommerce control panel](http://login.bigcommerce.com/deep-links/manage/)

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Checkout Localization
> Checkout localization is only available for [Optimized One-Page Checkout](/stencil-docs/template-files/customize-stencil-checkout/optimized-one-page-checkout#optimized_enable)

</div>
</div>
</div>

---

<a href='#localizing_localizing-control-panel' aria-hidden='true' class='block-anchor'  id='localizing_localizing-control-panel'><i aria-hidden='true' class='linkify icon'></i></a>

## Localizing Control Panel Content

The remaining localization options reside outside your theme and are accessible through the BigCommerce control panel:

* [Product Catalog](#product-catalog)
* [Currency](#currency)
* [Date Format](#date-format)
* [Order Statuses](#order-statuses)
* [Blog](#blog)
* [Static Web Pages](#static-web-pages)
* [Transactional Emails](#transactional-emails)
* [Gift Certificates](#gift-certificates)

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Transactional Emails or Gift Certificates Translation
> The BigCommerce platform does not currently support translation of Transactional Emails or Gift Certificates into languages other than English, so instead we have provided a best practice for each.

</div>
</div>
</div>

### <div id="product-catalog">Localizing the Product Catalog</div>

You must localize the store's product catalog separately from its theme. Each entry within a catalog can be set up in only one language, so you will want to localize a separate version of your catalog for each single-language store.

For an overview of populating the store catalog – including options for bulk-importing content that you can localize outside the BigCommerce platform – see [Adding Products](https://support.bigcommerce.com/s/article/Adding-Products) (BigCommerce Support).

### <div id="currency">Localizing Currency</div>
Each store's default currency is configured in the BigCommerce control panel. For details, see [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default) (BigCommerce Support).

### <div id="date-format">Localizing Date Format</div>
You can set the appropriate date format for your store's language/region in the BigCommerce control panel (under [**Store Setup**›
 **Store Settings** ›
 **Date & Timezone**](http://login.bigcommerce.com/deep-links/manage/settings/store). For details, see [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default) (BigCommerce Support).

### <div id="order-statuses">Localizing Order Statuses</div>

The `order-status` labels displayed on a BigCommerce storefront are configured outside your theme. You can translate each of these strings via the BigCommerce control panel under [**Orders** ›
 **Order Statuses**](http://login.bigcommerce.com/deep-links/manage/orders/order-statuses). For instructions, see [Renaming an Order Status Label](https://support.bigcommerce.com/s/article/Order-Statuses#rename) (BigCommerce Support).

### <div id="blog">Localizing the Blog</div>
Blog entries are managed through the BigCommerce control panel under [**Storefront Content** ›
 **Blog**](https://nik.mybigcommerce.com/manage/content/blog). You can add blog content in any language you choose. For details, see [Creating a Blog Post](https://support.bigcommerce.com/s/article/Using-the-Built-In-Blog#creating-post) (BigCommerce Support).

### <div id="static-web-pages">Localizing Static Web Pages</div>
If you create static pages as Stencil custom templates, you can localize their content just like other theme pages' content. However, if you create custom pages via the BigCommerce control panel (under [Storefront Content › Web Pages](http://login.bigcommerce.com/deep-links/manage/content/pages)), you must also enter their localized content via the control panel. 

### <div id="transactional-emails">Managing Transactional Emails</div>

BigCommerce does not currently provide native support for localizing transactional emails such as Order Confirmation or status updates. To fully localize a store into a language other than English, the simplest solution is to disable the sending of BigCommerce native emails.

To disable native emails, go to [Storefront › Email Templates](http://login.bigcommerce.com/deep-links//manage/storefront-manager/email-templates). Uncheck each email type that you prefer to customize. If you would like to localize transactional emails, see our Partner Apps, such as [Conversio](https://www.bigcommerce.com/apps/conversio/), for more details.

### <div id="gift-certificates">Managing Gift Certificates</div>

The BigCommerce platform does not currently support translation of gift certificates into languages other than English. To fully localize your store, you can choose to disable gift certificates via the BigCommerce control panel.

---

## Resources

### Related Articles

 * [Basis for Internationalization](/stencil-docs/internationalization-and-localization/basis-for-internationalization)
* [Optimized One-Page Checkout](/stencil-docs/template-files/customize-stencil-checkout/optimized-one-page-checkout#optimized_enable)
* [Enabling Optimized One-Page Checkout](/stencil-docs/template-files/customize-stencil-checkout/optimized-one-page-checkout#optimized_enable)
* [Currency-Conversion Options](/stencil-docs/template-files/customize-stencil-checkout/currency-conversion) 
* [Multi-Language Checkout](/stencil-docs/template-files/customize-stencil-checkout/multi-language-checkout)
* [Adding Products](https://support.bigcommerce.com/s/article/Adding-Products) (BigCommerce Knowledge Base)
* [Changing Your Default Currency](https://support.bigcommerce.com/s/article/Managing-Currencies#default)(BigCommerce Knowledge Base)

### Additional Resources

* [checkout.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html) (BigCommerce Github)
* [order-confirmation.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html) (BigCommerce Github)
* [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang) (BigCommerce Github)

