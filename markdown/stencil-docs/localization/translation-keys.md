<h1>Translation Keys</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#basis_required">Translating a Theme</a></li>
    <li><a href="#basis_required">Required Subdirectory</a></li>
    <li><a href="#basis_schema">The Schema</a></li>
    <li><a href="#basis_localization-file">Localization File Structure</a></li>
    <li><a href="#invoking_translation">Invoking a Translation Key</a></li>
    <li><a href="#implementation_cornerstone-localization-example">Localization Example</a></li>
	</ul>
</div>

Translation keys exist in JSON files and are invoked based on the user's browser language. With a Stencil theme, you can define multiple translations for each theme based on a predefined schema. 

BigCommerce does not provide translations for the theme’s content, however, you have the option of localizing your themes for desired target languages, based on the provided schema. Theme developers are not required to localize or translate a theme in order to make it work.


---

<a href='#basis_what-translates' aria-hidden='true' class='block-anchor'  id='basis_what-translates'><i aria-hidden='true' class='linkify icon'></i></a>

## Translating a Theme

In order to translate a theme, you must create a JSON file for each language you choose to support and include key-value pairs for the text blocks that you choose to translate. The translated values will be displayed to visitors who have selected the corresponding language in their browser's locale preferences. 

Stencil automatically detects the `Accept-Language` request HTTP header from the visitor's browser. If a Stencil theme does not contain a JSON file matching any of the visitor's preferred browser languages, the theme will fall back to the values in the default English-language JSON file. 

Stencil's multi-language capabilities are limited to the particular key-value pairs you specify in the theme. Stencil themes do not translate content rendered from a store's catalog database (i.e. the name of a product).



<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Full Support for Multiple Languages
> If you want to fully support multiple languages, we recommend you set up a separate storefront for each language. This will enable you to completely customize your content (including your product catalog) for each target audience.

</div>
</div>
</div>

---

<a href='#basis_required' aria-hidden='true' class='block-anchor'  id='basis_required'><i aria-hidden='true' class='linkify icon'></i></a>

## Required Subdirectory

Within each Stencil theme, a top level <span class="fp">/lang/</span> subdirectory is reserved for localization and internationalization. This <span class="fp">/lang/</span> subdirectory, as well as the <span class="fp">/lang/en.json</span> (which contains English-language defaults), must be present in order for a Stencil theme to properly function.

You can localize a theme by providing other appropriate <span class="fn">.json</span> translation files in the <span class="fp">/lang/</span> subdirectory. One JSON file is required for each language that you want to support. (These can include non-U.S. versions of English, each with their own spellings.)

In these files, you would define key and values corresponding to the text blocks in your theme's templates that you choose to translate.


---

<a href='#basis_schema' aria-hidden='true' class='block-anchor'  id='basis_schema'><i aria-hidden='true' class='linkify icon'></i></a>

## The Schema

Name your translation files based on the <a href="https://tools.ietf.org/html/bcp47">BCP47 specification</a> of language and region codes. For a summary of how these codes are designed, see the World Wide Web Consortium’s <a href="http://www.w3.org/International/articles/language-tags/">overview</a>.

You can find a list of code subtags in the <a href="http://www.iana.org/assignments/language-subtag-registry">IANA Language Subtag Registry</a>. These subtags are primitives that you can combine to create file names’ prefixes for individual regions. Here are some examples:

<table>
		<tr>
    <th>Localization file name</th>
    <th>Corresponding regional language variant</th>
    <th>Subtags used</th>
  </tr>
  <tr>
    <td>en.json</td>
    <td>English (default file)</td>
    <td>en (English)</td>
  </tr>
  <tr>
    <td>en-US.json</td>
    <td>American English</td>
    <td>en (English) + US (United States)</td>
  </tr>
  <tr>
    <td>en-AU.json</td>
    <td>Australian English</td>
    <td>en (English) + AU (Australia)</td>
  </tr>
  <tr>
    <td>fr.json</td>
    <td>French</td>
    <td>en (French)</td>
  </tr>
  <tr>
    <td class="">fr-CA.json</td>
    <td class="">Canadian French</td>
    <td class="">fr (French) + CA (Canada)</td>
  </tr>
</table>


For more examples of frequently-used codes, see the following linked table’s "LCID string" (middle) column: <a href="http://www.science.co.il/Language/Locale-codes.asp">http://www.science.co.il/Language/Locale-codes.asp</a>.

---

<a href='#basis_localization-file' aria-hidden='true' class='block-anchor'  id='basis_localization-file'><i aria-hidden='true' class='linkify icon'></i></a>

## Localization File Structure

The <span class="fp">.json</span> translation files have a straightforward structure of key-value pairs. Here is an example, from Cornerstone's <span class="fn">en.json</span> file:

`"welcome_back": "Welcome back, {name}"`

Above, `"welcome_back"` is an arbitrary key name for a welcome message. The string `"Welcome back, {name}"` is its assigned value for English-language stores.

If you design your theme’s storefront pages to refer to this message by its generic key name `"welcome_back"`, they can pass its localized value in other languages, as that value is defined in each language’s <span class="fn">.json</span> file.

Key-value pairs are grouped into objects, as you can see in this longer example below:

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

```js
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
    "label": "Cart",
    "is_empty": "Your cart is empty",
     "coupon_code": "Coupon Code",
    "gift_certificate": "Gift Certificate",
    "freeshipping": "Free Shipping",
    "shipping_peritem": "Per Item Shipping",
    "shipping_estimator": {
        "add_info": "Add Info",
        "select_a_country": "Select a Country",
        "select_a_state": "Select a State",
        "estimate_shipping": "Estimate Shipping"
    }
   },
}
```

---

## Invoking a Translation Key

Once keys and values are defined in the [.json translation files](https://github.com/bigcommerce/cornerstone/tree/master/lang), you can invoke dynamic translation strings using the the [custom `{{lang}}` Handlebars helper](/stencil-docs/handlebars-syntax-and-helpers/handlebars-helpers-reference/string-helpers/custom-string-helpers#handlebars_lang). To invoke a defined translation key, you would follow this generic format:

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

```
{{lang "translation.key" optionalVariable=”someValue”}}
```

Here is how this works. In a non-internationalized theme, a storefront page might include a string like this:

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

```
<a href="{{ urls.account }}">Welcome Back <span>{{ customer.name }}</span></a>
```

The corresponding internationalized version would substitute the text with the fully dynamic `{{ lang }}` Handlebars helper shown below:

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

### File Permissions Required
> Be sure to set permission 644 (rw-r–r–) on any new translation files that you add. Without these permissions, running your theme locally will fail, with multiple error messages. Bundling your theme will also fail, blocking its upload to a store.

</div>
</div>
</div>

---

## Cornerstone Localization Example

Here is an example based on
<span class="fp">cornerstone/templates/components/cart/shipping-estimator.html</span> within Cornerstone.

In the excerpt below, each highlighted `{{lang...}}` statement is a Handlebars helper. Each of the statements abstracts the message indicated by its (English-language) key name to enable internationalization of that message:

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

In the excerpts below, you can see that the default theme’s <span class="fp">/lang/en.json</span> file includes matches, and value definitions, for each of the translation keys in the Handlebars helpers above. 

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

```js
{
  "header": {
        "welcome_back": "Welcome back, {name}"
  },
  ...
      "label": "Cart",
        "is_empty": "Your cart is empty",
        "coupon_code": "Coupon Code",
        "gift_certificate": "Gift Certificate",
        "freeshipping": "Free Shipping",
        "shipping_peritem": "Per Item Shipping",
      "shipping_estimator": {
            "add_info": "Add Info",
          "select_a_country": "Select a Country",
          "select_a_state": "Select a State",
          "estimate_shipping": "Estimate Shipping"
      }
  },
  "common": {
        "currency_converter": "Currency Converter",
        "newsletter_signup": "Sign up for our newsletter",
        "form_submit": "Submit",
        "required": "Required",
        "email_address": "Email Address",
      "edit": "Edit",
      "no": "No",
      "yes": "Yes",
      "cancel": "Cancel",
      "share": "Share",
      "delete": "Delete",
      "public": "Public",
        "private": "Private",
        "view_all": "View All",
        "paginator": {
            "page_of": "Page {current} of {total}"
      },
      ...
```

Translation files for other languages would use the same format to define these keys’ values in their respective languages.

---

## Resources 

### Additional Resources

* [Customizing a Theme - lang directory Video Demo](https://www.youtube.com/embed/ygiRGfSrmnA) (Youtube)


