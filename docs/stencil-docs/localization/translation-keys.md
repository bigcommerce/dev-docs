# Translation Keys

<div class="otp" id="no-index">

### On this page

- [Translating a theme](#translating-a-theme)
- [Required subdirectory](#required-subdirectory)
- [The schema](#the-schema)
- [Localization file structure](#localization-file-structure)
- [Invoking a translation key](#invoking-a-translation-key)
- [Localization example](#localization-example)
- [Resources](#resources)

</div> 

Translation keys exist in JSON files and are invoked based on the user's browser language. With a Stencil theme, you can define multiple translations for each theme based on a predefined schema.

BigCommerce does not provide translations for the theme’s content. However, you have the option of localizing your themes for desired target languages based on the provided schema. Theme developers are not required to localize or translate a theme in order to make it work.

## Translating a theme

To translate a theme, create a JSON file for each language you choose to support and include key-value pairs for the text blocks you want to translate. The translated values will be displayed to visitors who have selected the corresponding language in their browser's local preferences.

Stencil automatically detects the `Accept-Language` request HTTP header from the visitor's browser. If a Stencil theme does not contain a JSON file matching any of the visitor's preferred browser languages, the theme will revert to the values in the default English-language JSON file.

Stencil's multi-language capabilities are limited to the particular key-value pairs you specify in the theme. Stencil themes do not translate content rendered from a store's catalog database (for example, the name of a product).

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

### Full support for multiple languages
> If you want to fully support multiple languages, we recommend you set up a separate storefront for each language. This will enable you to completely customize your content, including your product catalog, for each target audience.

</div>
</div>
</div>

## Required subdirectory

Within each Stencil theme, a top level `/lang/` subdirectory is reserved for localization and internationalization. For a theme to function properly, both the `/lang/` subdirectory and the `/lang/en.json` file, which contains the English-language defaults, must be present.

You can localize a theme by providing other appropriate JSON translation files in the `/lang` subdirectory. In these files, you would define key-value pairs corresponding to the text blocks in your theme's templates. 

One JSON file is required for each language that you want to support. These can include non-U.S. versions of English, each with their own spellings.

## The schema

Name your translation files based on the [BCP 47 specification](https://tools.ietf.org/html/bcp47) of language tags and region codes. For an overview of how these language tags are constructed, see [Language tags in HTML and XML](http://www.w3.org/International/articles/language-tags/).

You can find a list of code subtags in the [IANA Language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry). These subtags are primitives that you can combine to create file name prefixes for individual regions. Here are some examples:

| Localization file name | Corresponding regional language variant | Subtags used |
| ----------- | ----------- | ----------- |
| `en.json` | English (default file)| en (English) |
| `en-US.json` | American English | en (English) + US (United States) |
| `en-AU.json` | Australian English | en (English) + AU (Australia) |
| `fr.json` | French | en (French) |
| `fr-CA.json` | Canadian French | fr (French) + CA (Canada) |

For more examples of frequently-used codes, see [ISO 639-2 Codes for the Representation of Names of Languages](http://www.loc.gov/standards/iso639-2/php/code_list.php).

## Localization file structure

The JSON translation files are structured as key-value pairs. Here is an example from Cornerstone’s `en.json` file: 

`"welcome_back": "Welcome back, {name}"`

* `"welcome_back"` - An arbitrary key name for a welcome message. 
* `"Welcome back, {name}"` - The value assigned for English-language stores.

If you design your theme’s storefront pages to refer to this message by its generic key name `"welcome_back"`, they can pass its localized value in other languages, as that value is defined in each language’s JSON file.

Key-value pairs are grouped into objects, for example:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Objects with translation key-value pairs</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Objects with translation key-value pairs"
subtitle: ""
lineNumbers: true
-->

```json
{
  "header": {
    "welcome_back": "Welcome back, {name}"
    },
  "prelaunch": {
    "coming_soon": "Coming Soon",
    "intro": "This store will be launching shortly. Please visit again!"
    },
  "cart": {
    "items": "{NUM, plural, =0{(0 items)} one {(# item)} other {(# items)}}",
    "label": "Your Cart ({quantity, plural, one {# item} other {# items}})",
    "is_empty": "Your cart is empty",
    "coupon_code": "Coupon Code",
    "discount": "Discount",
    "gift_certificate": "Gift Certificate",
    "freeshipping": "Free Shipping",
    "shipping_peritem": "Per Item Shipping",
    "shipping_estimator": {
      "add_info": "Add Info",
      "select_a_country": "Country",
      "select_a_state": "State/province",
      "estimate_shipping": "Estimate Shipping",
      }
    },
  //...
}

```

## Invoking a translation key

Once keys and values are defined in the [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang), you can invoke dynamic translation strings using the custom `{{lang}}` [Handlebars string helper](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#string-helpers). 

To invoke a defined translation key, follow this generic format:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Syntax to invoke a defined translation key</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Syntax to invoke a defined translation key"
subtitle: ""
lineNumbers: true
-->

```html
{{lang "translation.key" optionalVariable="someValue"}}
```

In a non-internationalized theme, a storefront page might include a string like this:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Non-internationalized theme example</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Non-internationalized theme example"
subtitle: ""
lineNumbers: true
-->

```html
<a href="{{ urls.account }}">Welcome Back <span>{{ customer.name }}</span></a>
```

The corresponding internationalized version would substitute the text with the fully dynamic `{{ lang }}` Handlebars helper as shown below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
<a href="{{ urls.account }}">{{ lang "header.welcome_back" name=customer.name }}</a>

```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### File permissions required

> Be sure to give any new translation files default access permissions of `644 (rw-r--r--)`. Without these permissions, running your theme locally will fail with multiple error messages. Bundling your theme will also fail, blocking its upload to a store.

</div>
</div>
</div>

<a id="basis_localization-example"></a>

## Localization example

Below is an example based on the Cornerstone’s `templates/components/cart/shipping-estimator.html` file. Here, each highlighted `{{lang...}}` statement abstracts the message indicated by its English-language key to enable internationalization of that message:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
<div class="shipping-estimator" style="display: none;">
    <form class="estimator-form">
      <button class="shipping-estimate-hide">{{lang 'cancel'}}</button>
      <select name="shipping-country">
      <option>{{lang 'cart.shipping_estimator.select_a_country'}}</option>
      {{#each countries}}
          <option value="{{id}}" {{#if selected}}selected="selected"{{/if}}>
                {{name}}
          </option>
      {{/each}}
      </select>
      <select name="shipping-state">
      <option>{{lang 'cart.shipping_estimator.select_a_state'}}</option>
      {{#each states}}
          <option value="{{id}}" {{#if selected}}selected="selected"{{/if}}>
              {{name}}
          </option>
      {{/each}}
      </select>
      <input type="text" name="shipping-zip" value="{{selected_zip}}">
      <button class="shipping-estimate-submit">{{lang 'cart.shipping_estimator.estimate_shipping'}}
      </button>
    </form>
    <div class="shipping-quotes"></div>
</div>

```

In the example below, the default theme’s `lang/en.json` file includes matches and value definitions for each of the translation keys.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
  "header": {
    "welcome_back": "Welcome back, {name}",
    "skip_to_main": "Skip to main content"
    },
  "cart": {
    "continue_shopping": "Click here to continue shopping",
      //...
    "label": "Your Cart ({quantity, plural, one {# item} other {# items}})",
    "is_empty": "Your cart is empty",
    "coupon_code": "Coupon Code",
    "discount": "Discount",
    "gift_certificate": "Gift Certificate",
    "freeshipping": "Free Shipping",
    "reconfigure_product": "Configure '{name}'",
    "shipping_peritem": "Per Item Shipping",
    },
  "common": {
    "currency": "Select Currency: {code}",
    "newsletter_signup": "Register for our newsletter",
    "form_submit": "Submit",
    "required": "Required",
    "optional": "Optional",
    "email_address": "Email Address",
    "sign_up": "Register",
    "login": "Sign in",
    "logout": "Sign out",
    "cart": "Cart",
    "search": "Search",
    "paginator": {
        "page_of": "Page {current} of {total}"
      },
    //...
    },
}
```

Translation files for other languages would use a similar format to define key-value pairs in their respective languages.

## Resources

### Additional resources

* [Customizing a Theme - lang directory Video Demo](https://www.youtube.com/embed/ygiRGfSrmnA) (YouTube)
* [Handlebars String Helpers](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#string-helpers)
* [JSON translation file](https://github.com/bigcommerce/cornerstone/tree/master/lang) (BigCommerce GitHub)
