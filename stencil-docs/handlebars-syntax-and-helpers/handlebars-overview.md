<h1>Handlebars.js Overview</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_handlebars-js">Handlebars.js</a></li>
    <li><a href="#handlebars_template">Template Logic</a></li>
    <li><a href="#handlebars_stencil">Stencil Handlebars Resources</a></li>
    <li><a href="#handlebars_rendering">Rendering Special Characters</a></li>
	</ul>
</div>

<a href='#handlebars_handlebars-js' aria-hidden='true' class='block-anchor'  id='handlebars_handlebars-js'></a>

## Handlebars.js

[Handlebars.js](https://handlebarsjs.com/) is a minimal templating language, offering helpers that allow you to create dynamic and robust templates for any BigCommerce storefront. Alongside the standard helpers offered by Handlebars.js, BigCommerce has added a variety of custom helpers available for use. For example, in [Array Helpers](/stencil-docs/handlebars-syntax-and-helpers/handlebars-helpers-reference/array-helpers) you will see two types of helpers: Standard Array Helpers, which are the existing Handlebars.js helpers, and Custom Array Helpers, which are BigCommerce's extension of the helpers.

A Handlebars template looks just like a regular HTML page, with the addition of Handlebars expressions for all dynamic logic that you embed into the page.

A Handlebars expression begins with: ``{{`` and ends with: ``}}``.

Here is a basic example that accesses the title and body variables:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
<div class="entry">
  <h1>{{ title }}</h1>
  <div class="body">
    {{ body }}
  </div>
</div>
```

In production, Handlebars statements run on the server side, generating HTML received by the shopper's browser.

You can view a [full reference page of all the handlebars helpers available to Stencil here](/stencil-docs/handlebars-syntax-and-helpers/handlebars-helpers-reference/handlebars-full), or explore them using navigation on the left hand side.

For a thorough overview of how to use Handlebars inside your templates, review the [Handlebars documentation](http://handlebarsjs.com/) (Handlebars).

<a href='#handlebars_template' aria-hidden='true' class='block-anchor'  id='handlebars_template'></a>

## Template Logic

With Handlebars, it’s easy to embed logic right into your templates. Handlebars has [built-in helpers](http://handlebarsjs.com/builtin_helpers.html) for widely used functions.

<a href='#handlebars_stencil' aria-hidden='true' class='block-anchor'  id='handlebars_stencil'></a>

## Stencil Handlebars Resources

For a comprehensive reference to the Stencil data objects that you can manipulate via Handlebars statements, see the [Stencil Object Model Reference](/stencil-docs/stencil-object-model-reference).

<a href='#handlebars_rendering' aria-hidden='true' class='block-anchor'  id='handlebars_rendering'></a>

## Rendering Special Characters

By default, Handlebars HTML-escapes values returned by a standard Handlebars `{{expression}}`. So, if a Handlebars expression includes special characters, the character codes will render literally on the storefront as HTML entities as opposed to producing the character itself.

Assume that the HTML title referenced by the`` Handlebars expression contains an ampersand and a straight apostrophe. When this helper renders on the storefront, you will see the character codes `&amp;` and `&#039;` displayed literally on the storefront, instead of the intended characters `&` and `'`. Similar display errors will be triggered by apostrophes, quotation marks, primes, and other extended characters. The workaround is to place the Handlebars variable in triple braces, i.e. `{}`. [Handlebars documentation](https://handlebarsjs.com/) refers to this technique as a "triple-stash."

