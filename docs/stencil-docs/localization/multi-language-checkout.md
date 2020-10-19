# Multi-Language Checkout


<div class="otp" id="no-index">

### On this page
- [Multi-language setup](#multi-language-setup)
- [Browsing hidden translation keys](#browsing-hidden-translation-keys)
- [Adding your own translation values](#adding-your-own-translation-values)
- [Localized country and state names](#localized-country-and-state-names)
- [Limits on translation](#limits-on-translation)
- [Resources](#resources)

</div>

## Multi-language setup

In the Stencil's Cornerstone theme, the [Optimized Checkout](https://github.com/bigcommerce/cornerstone/blob/master/assets/scss/optimized-checkout.scss) SCSS file and the [Order Confirmation](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html) HTML file both contain Handlebars `{{lang}}` statements. These `{{lang}}` statements facilitate translation by enabling automatic rendering of their parameters into languages that shoppers have selected in their browser preferences.

The following example shows how to use the `{{lang}}` statement in the header of the [default checkout page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html): 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">{{lang}} statement in page header</div>
</div>

<!--
title: "checkout.html"
subtitle: "{{lang}} statement in page header"
lineNumbers: true
-->

```html
{{#partial "head"}}

{{{ checkout.checkout_head }}}
{{{ stylesheet '/assets/css/optimized-checkout.css' }}}
{{ getFontsCollection }}

<script type="text/javascript">
    window.language = {{{langJson 'optimized_checkout'}}};
</script>

{{{head.scripts}}}

{{/partial}}

{{#partial "page"}}
<header class="checkoutHeader optimizedCheckout-header">
    <div class="checkoutHeader-content">
        <h1 class="is-srOnly">{{lang 'checkout.title'}}
        <h2 class="checkoutHeader-heading">
            <a class="checkoutHeader-link" href="{{urls.home}}">
                {{#if checkout.header_image}}
                    <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/>
                {{ else }}
                    <span class="header-logo-text">{{settings.store_logo.title}}</span>
                {{/if}}
            </a>
        </h2>
    </div>
</header>

{{{ checkout.checkout_content }}}

{{{ footer.scripts }}}

{{/partial}}

{{> layout/empty}}
```

## Browsing hidden translation keys
BigCommerce exposes only part of the checkout page's structure through the local checkout template. For security purposes, and to offer all stores new checkout features simultaneously, most checkout content is hidden.

This hidden content includes additional key-value pairs that support translation. You can see all the available keys with their default English-language values in the [Optimized Checkout](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/opt-checkout-en.json.zip) JSON file.

## Adding your own translation values

You can provide values for checkout translation keys even without direct access to the hidden parts of the checkout template. Here is how:

1. Download [checkout-en.json](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/json/checkout-en.json) (github).
2. Copy and paste the file's contents into your theme's `en.json` file.
3. Copy and paste the file's contents the `lang.json` of the other languages you support; for naming requirements, see [Translation Keys](https://developer.bigcommerce.com/stencil-docs/localization/translation-keys#the-schema).
4. Replace the values with appropriate phrases in each file's target language.

## Localized country and state names

BigCommerce's Optimized One-Page Checkout will currently translate displayed **Country/State** names into 12 supported languages. To enable this translation, follow these steps:

1. Enable Optimized One-Page Checkout.
2. Inside your `lang` subdirectory, provide an `xx.json` file with the appropriate two-letter prefix for one or more of the supported languages. For a complete list of supported languages, see the table below.

=======

BigCommerce exposes only part of the checkout page's structure through the local checkout template. For security purposes, and to offer all stores new checkout features simultaneously, most checkout content is hidden.

This hidden content includes additional key-value pairs that support translation. You can see all the available keys with their default English-language values in the [Optimized Checkout](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/opt-checkout-en.json.zip) JSON file.

## Adding your own translation values

You can provide values for all of the checkout's supported translation keys (for all the languages you want to support) even without direct access to the hidden parts of the checkout template. Here is how:

1. Download and unzip a local copy of the [Optimized Checkout](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/opt-checkout-en.json.zip) ZIP file.

2. Copy and paste the file's contents into your theme's `en.json` file and into separate JSON files for each language you want to support. For requirements for naming and deploying these translation files, see [The Schema](https://developer.bigcommerce.com/stencil-docs/localization/translation-keys#the-schema).

3. Replace the values with appropriate phrases in each file's target language.

## Localized country and state names

BigCommerce's Optimized One-Page Checkout will currently translate displayed **Country/State** names into 12 supported languages. To enable this translation, follow these steps:

1. Enable Optimized One-Page Checkout.

2. Inside your `lang` subdirectory, provide an `xx.json` file with the appropriate two-letter prefix for one or more of the supported languages. For a complete list of supported languages, see the table below. 

>>>>>>> master

| Supported Language | Required Translation File Name |
|-|-|
| German | `de.json` |
| Spanish | `es.json` |
| French | `fr.json` |
| Hindi | `hi.json` |
| Italian | `it.json` |
| Japanese | `ja.json` |
| Korean | `ko.json` |
| Dutch | `nl.json` |
| Punjabi | `pa.json` |
| Tamil | `ta.json` |
| Chinese Simplified | `zh-TW.json` |
| Chinese Traditional | `zh.json` |

3. We recommend that you populate your JSON file with the checkout-specific keys-values covered in [Adding your own translation values](#adding-your-own-translation-values). It is not mandatory to translate the drop-down lists, but it is necessary to provide a consistent translation of the surrounding **Address** sections. You do not need to provide any keys-values for the **Country/State** names, whose translations already exist within the BigCommerce platform.
<<<<<<< HEAD
4. As with the translation options described above, the storefront will automatically display the translated **Country/State** names to visitors who have selected one of the supported languages in their browser's locale preferences.

## Limits on translation

* The translation of your theme's content consists of the language JSON files in your `lang` subdirectory and the key-value pairs for the parameters (beyond **Country/State**) that you choose to translate.
* Stencil's multi-language capabilities are limited to the strings that you specify within the theme. The Stencil framework does not currently translate content rendered from a store's database; for example, products' names.
=======


4. As with the translation options described above, the storefront will automatically display the translated **Country/State** names to visitors who have selected one of the supported languages in their browser's locale preferences.

## Limits on translation

* The translation of your theme's content consists of the language JSON files in your `lang` subdirectory and the key-value pairs for the parameters (beyond **Country/State**) that you choose to translate. 


* Stencil's multi-language capabilities are limited to the strings that you specify within the theme. The Stencil framework does not currently translate content rendered from a store's database; for example, products' names.

>>>>>>> master
* Within these limitations, if you intend to do business internationally, we recommend that you specify appropriate alternate-language strings for key parts of your storefront, product catalog, and checkout. Doing so will make browsing, purchasing, and payment easier for users in your target market(s). For an overview of all localization options, see [Localizing Stores](https://developer.bigcommerce.com/stencil-docs/localization/localizing-stores).

## Resources

### Additional resources

* [Cornerstone Repository](https://github.com/bigcommerce/cornerstone) (Bigcommerce GitHub)
