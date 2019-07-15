<h1>Multi Language Checkout</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#multi_multi-lang">Multi Language Setup</a></li>
    <li><a href="#multi_browsing">Browsing Hidden Translation Keys</a></li>
    <li><a href="#multi_adding">Adding Your Own Translation Values</a></li>
    <li><a href="#multi_localized">Localized Country and State Names</a></li>
    <li><a href="#multi_stencils-overall">Stencil's Overall Limits on Translation</a></li>
	</ul>
</div>

<a href='#multi_multi-lang' aria-hidden='true' class='block-anchor'  id='multi_multi-lang'><i aria-hidden='true' class='linkify icon'></i></a>

## Multi-Language Setup 

In the Cornerstone theme, both the Optimized One-Page Checkout and the [order confirmation](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/order-confirmation.html) pages contain [Handlebars`{{lang}}`](/stencil-docs/handlebars-syntax-and-helpers/handlebars-helpers-reference/string-helpers/custom-string-helpers#handlebars_lang) statements to facilitate translation. The `{{lang}}` statements enable automatic rendering of their parameters into languages that shoppers have selected in their browser preferences.

In the [default checkout page template (cornerstone/templates/pages/checkout.html)](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/checkout.html), one example that you can directly view is the page header:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">checkout.html</div>
    </div><div class="HubBlock-header-subtitle">{{lang}} statement in page header</div>
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
        <h1 class="is-srOnly">{{lang 'checkout.title'}}</h1>
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

---

<a href='#multi_browsing' aria-hidden='true' class='block-anchor'  id='multi_browsing'><i aria-hidden='true' class='linkify icon'></i></a>

## Browsing Hidden Translation Keys

BigCommerce exposes only part of the checkout page's structure through the local template referenced above. For security purposes – and also to offer all stores new checkout features simultaneously – most checkout content is hidden.

This hidden content includes many more key/value pairs that support translation. However, you can see all the available keys with their default English-language values in the [opt-checkout-en.json.zip file](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/opt-checkout-en.json.zip)

---

<a href='#multi_adding' aria-hidden='true' class='block-anchor'  id='multi_adding'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding Your Own Translation Values

You can provide values for all of checkout's supported translation keys – for all the languages you want to support – even without direct access to the hidden parts of the checkout template. Here is how:

1. Download and unzip a local copy of the [opt-checkout-en.json.zip file](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/opt-checkout-en.json.zip), also linked above in [Browsing Hidden Translation Keys](multi_browsing).

2. Copy and paste the whole file's contents into your theme's `en.json` file and into the `.json` file for each language you want to translate your checkout page's text. To see requirements for naming and deploying these translation files, please this documentation's [Internationalization section](/stencil-docs/internationalization-and-localization/).

3. Replace the keys' values with appropriate phrases in each file's target language.

<a href='#multi_localized' aria-hidden='true' class='block-anchor'  id='multi_localized'><i aria-hidden='true' class='linkify icon'></i></a>

## Localized Country and State Names 

In the Optimized One-Page Checkout page's `Shipping Address` and `Billing Address` fields, BigCommerce currently provides automatic translation of drop-down lists' displayed `Country` and `State` names into 12 supported languages. Here are the steps for enabling this translation:

1. As for the translation options described above, you must enable Optimized One-Page Checkout.

2. Within your `<theme-name>/lang/` subdirectory, you must provide a `xx.json` file with the appropriate two-letter prefix for one or more of the `Supported Languages` in the Naming Requirements table below. (The naming conventions we follow are explained on this page.)

3. We recommend that you populate that file with the checkout-specific keys/values covered above at Adding Your Own Translation Values. This is not strictly necessary to translate the drop-down lists, but it is necessary to provide a consistent translation of the surrounding Address sections. You do not need to provide any keys/values for the Country/State names, whose translations are predefined within the BigCommerce platform.

4. As with the translation options described above, the storefront will automatically display the translated `Country/State` names to visitors who have selected one of the supported languages in their browser's locale preferences.

### Country/State Translation – Naming Requirements

BigCommerce Optimized One-Page Checkout will currently translate displayed `Country/State` names if your Stencil theme includes `.../lang/xx.json` files named as shown below.

| Supported Language | Required Translation File Name |
|------|------|
|  German | `de.json` |
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

---

<a href='#multi_stencils-overall' aria-hidden='true' class='block-anchor'  id='multi_stencils-overall'><i aria-hidden='true' class='linkify icon'></i></a>

## Limits on Translation

* Your theme's content will translate only to the extent that you have created JSON files in your `<theme-name>/lang/` subdirectory for each language that you choose to support, and have included key/value pairs for the parameters (beyond `Country/State`) that you choose to translate.

* Stencil's multi-language capabilities are currently limited to these specific strings that you specify within the theme. The Stencil framework does not currently translate content rendered from a store's database – for example, products' names.

* Within these limitations, if you intend to do business internationally, we recommend that you specify appropriate alternate-language strings for key parts of your storefront, product catalog, and checkout. Doing so will make browsing, purchasing, and payment easier for users in your target market(s). For an overview of all localization options, please see [Localizing Stores](/stencil-docs/internationalization-and-localization/localizing-stores).

---

## Resources

### Sample Apps

* Cornerstone Repository (Bigcommerce Github)


