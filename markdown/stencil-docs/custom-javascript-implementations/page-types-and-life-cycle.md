<h1>Page Types and Life Cycle</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#page-types_stencil-utils">stencil-utils Library</a></li>
    <li><a href="#page-types_javascript-api">JavaScript API</a></li>
    <li><a href="#page-types_callback">Callback Methods</a></li>
    <li><a href="#page-types_javascript">JavaScript Template Context Injection</a></li>
	</ul>
</div>

<a href='#page-types_stencil-utils' aria-hidden='true' class='block-anchor'  id='page-types_stencil-utils'><i aria-hidden='true' class='linkify icon'></i></a>

## stencil-utils Library

[stencil-utils](/stencil-docs/adding-event-hooks-to-your-theme/stencil-utils-api-reference) is our supporting library for events and remote interactions.



---

<a href='#page-types_javascript-api' aria-hidden='true' class='block-anchor'  id='page-types_javascript-api'><i aria-hidden='true' class='linkify icon'></i></a>

## Page Types

Stencil themes include an API for running JavaScript on a per-page basis.

To properly write JavaScript for your theme, you will have the following page types available to you:

* `pages/account/addresses`
* `pages/account/add-address`
* `pages/account/add-return`
* `pages/account/add-wishlist`
* `pages/account/recent-items`
* `pages/account/download-item`
* `pages/account/edit`
* `pages/account/return-saved`
* `pages/account/returns`
* `pages/auth/login`
* `pages/auth/account-created`
* `pages/auth/create-account`
* `pages/auth/new-password`
* `pages/blog`
* `pages/blog-post`
* `pages/brand`
* `pages/brands`
* `pages/cart`
* `pages/category`
* `pages/compare`
* `pages/errors`
* `pages/gift-certificate/purchase`
* `pages/gift-certificate/balance`
* `pages/gift-certificate/redeem`
* `global`
* `pages/home`
* `pages/order-complete`
* `pages/page`
* `pages/product`
* `pages/search`
* `pages/sitemap`
* `pages/subscribed`
* `pages/account/wishlist-details`
* `pages/account/wishlists`
* `pages/order-confirmation`
* `pages/checkout`

These page types correspond to the pages within your theme. Each of these page types maps to an ES6 module that extends the base `PageManager` abstract class:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">pages/blog extending the page PageManager class</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "pages/blog extending the page PageManager class"
subtitle: ""
lineNumbers: true
-->

```js
export default class Blog extends PageManager {
        constructor() {
            //Setup code goes here – attach to internals, and use internals as you would 'this'
        }
    }
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> 1. Notice the page types correspond to the html pages in [cornerstone/templates/pages/](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages)

</div>
</div>
</div>

---

<a href='#page-types_javascript' aria-hidden='true' class='block-anchor'  id='page-types_javascript'><i aria-hidden='true' class='linkify icon'></i></a>

## JavaScript Template Context Injection

Occasionally, you might need to use dynamic data from the template context within your theme's client-side application code. Two helpers are provided to help achieve this.

The `inject` helper allows you to compose a json object with a subset of the template context to be sent to the browser:

`{{inject "stringBasedKey" contextValue}}`

To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{inject}}` calls.

For example, to set up the product name in your client-side app, you can do this if you're in the context of a product:

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
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}}); //jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into your JavaScript

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

You can compose your JSON object across multiple pages, to create a different set of client-side data depending on the currently loaded template context.

Stencil's Cornerstone base theme makes the `jsContext` available as `this.context`, both on the active page scoped and on global `PageManager` objects.

