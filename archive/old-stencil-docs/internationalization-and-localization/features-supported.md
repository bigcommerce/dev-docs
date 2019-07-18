<h1>Features Supported</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#implementation_automatic-language-detection">Automatic Language Detection</a></li>
    <li><a href="#implementation_cascading-translations">Cascading Translations</a></li>
		<li><a href="#implementation_nested-plurality">Nested Plurality and Gender Support</a></li>
	</ul>
</div>

<a href='#implementation_automatic-language-detection' aria-hidden='true' class='block-anchor'  id='implementation_automatic-language-detection'><i aria-hidden='true' class='linkify icon'></i></a>

## Automatic Language Detection

The Stencil framework can automatically detect a localized language, based on the active shopper’s `"Accept‑Language"` header.

---

<a href='#implementation_cascading-translations' aria-hidden='true' class='block-anchor'  id='implementation_cascading-translations'><i aria-hidden='true' class='linkify icon'></i></a>

## Cascading Translations

Cascading works as follows: Assume that a Quebec/French-Canadian customer visits a storefront built with both `fr.json` and `fr‑CA.json` localization files. The framework places the `fr‑CA` locale "on top of" the base `fr locale`. Therefore, any strings missing from the `fr‑CA.json` file will “fall back” to definitions in the base `fr.json file`, providing at least approximate translations. This cascading works generally across languages and locales.

---

<a href='#implementation_nested-plurality' aria-hidden='true' class='block-anchor'  id='implementation_nested-plurality'><i aria-hidden='true' class='linkify icon'></i></a>

## Nested Plurality and Gender Support
The framework allows you to code conditional plurality for strings within each translation file. For example, your code within an English-language file could overload a single message to display in each of the following forms – depending on the actual value of its two numeric variables:

* "There are 3 items in 2 categories"
* "There is 1 item in 2 categories"
* "There are 2 items in 1 category"

Here is the markup that would handle the first three words in each example above, assuming appropriate parameters were inserted in the translation files:

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
<h2 class="modal-header-title">
   {{lang 'cart.added_to_cart.what_next' num_products=cart.quantity}} [...]
</h2>
```

Similarly, the framework supports per-language conditional coding of appropriate genders for pronouns and nouns.

