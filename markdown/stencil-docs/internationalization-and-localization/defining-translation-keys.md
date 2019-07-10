<h1>Defining Translation Keys</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#basis_what-translates">What Does and Doesn't Translate</a></li>
    <li><a href="#basis_required">Required Subdirectory</a></li>
    <li><a href="#basis_schema">The Schema</a></li>
    <li><a href="#basis_localization-file">Localization File Structure</a></li>
	</ul>
</div>

<a href='#basis_what-translates' aria-hidden='true' class='block-anchor'  id='basis_what-translates'><i aria-hidden='true' class='linkify icon'></i></a>

## What Does and Doesn't Translate

The Stencil framework allows you to define multiple translations for each theme based on a predefined schema. Theme developers are not required to localize a theme in order to make it work. BigCommerce does not provide translations for the theme’s content, however, you have the option of localizing your themes for desired target languages, based on the provided schema.

* In order for theme translation to occur, you must create a JSON file for each language you choose to support and include key/value pairs for the text blocks/parameters that you choose to translate. The following pages provide details for these steps.

* The translated values will be displayed to visitors who have selected the corresponding language in their browser's locale preferences. The Stencil framework automatically detects the Accept-Language request HTTP header from the visitor's browser.

* Where a Stencil theme contains no JSON file matching any of the visitor's preferred languages, it will fall back to the values in the default English-language JSON file.

* Stencil's multi-language capabilities are currently limited to these particular strings that you specify within the theme. The Stencil framework does not currently translate content rendered from a store's catalog database – for example, products' names.

* If you want to fully support multiple languages, we recommend that you set up a separate storefront for each language. This will enable you to thoroughly customize all of your content (including your product catalog) for each target audience.

---

<a href='#basis_required' aria-hidden='true' class='block-anchor'  id='basis_required'><i aria-hidden='true' class='linkify icon'></i></a>

## Required Subdirectory

Within each theme, a top level `/lang/` subdirectory is reserved for internationalization. This `.../lang/` subdirectory, with its contained en.json file (which contains English-language defaults), must be present in order for a Stencil theme to function.

You can localize a theme by providing other appropriate .json translation files in the `.../lang/` subdirectory. One file is required for each language that you want to support. (These can include non-U.S. versions of English, each with their own spellings.)

Within these files, you would define key values corresponding to the text blocks in your theme's templates that you choose to abstract into translatable keys.


---

<a href='#basis_schema' aria-hidden='true' class='block-anchor'  id='basis_schema'><i aria-hidden='true' class='linkify icon'></i></a>

## The Schema

Name your translation files based on the <a href="https://tools.ietf.org/html/bcp47">BCP47 specification</a> of language and region codes. For a summary of how these codes are designed, see the World Wide Web Consortium’s <a href="http://www.w3.org/International/articles/language-tags/">overview</a>.<br>

 <br>

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

The `.json` translation files have a straightforward structure of key-value pairs. Here is an example, from Stencil’s default `en.json` file:

`"welcome_back": "Welcome back, {name}"`

Above, `"welcome_back"` is an arbitrary key name for a welcome message. The string `"Welcome back, {name}"` is its assigned value for English-language stores.

If you design your theme’s storefront pages to refer to this message by its generic key name `"welcome_back"`, they can pass its localized value in other languages, as that value is defined in each language’s `.json` file.
Key-value pairs are grouped into objects, as you can see in this longer example below:

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

