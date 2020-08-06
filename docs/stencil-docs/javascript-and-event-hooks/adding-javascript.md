# Adding Javascript to Your Stencil Theme

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#adding_bundling-and-minification">Bundling and Minification</a></li>
    <li><a href="#adding_development-options">Development Options</a></li>
    <li><a href="#adding_using-npm">Using npm (Node Package Manager)</a></li>
    <li><a href="#adding_page-types">Page Types and Javascript API</a></li>
    <li><a href="#adding_page-template-injection">JavaScript Template Context Injection</a></li>
    <li><a href="#adding_placing-modules">Placing Modules in assets/js/</a></li>
    <li><a href="#adding_theme-specific-js">Theme-Specific JavaScript Modules</a></li>
    <li><a href="#adding_mapping-page">Mapping Page Types to JavaScript Modules</a></li>
    <li><a href="#adding_mapping-custom">Mapping Custom Templates to JavaScript Modules</a></li>
    <li><a href="#adding_summary">Summary</a></li>
	</ul>
</div>

<a href='#adding_bundling-and-minification' aria-hidden='true' class='block-anchor'  id='adding_bundling-and-minification'><i aria-hidden='true' class='linkify icon'></i></a>

## Bundling and Minification

A small Web application, such as an ecommerce theme, can include rich user interactions that depend on many small JavaScript and CSS modules. If we were to embed each of the JavaScript modules in a template file with a separate `<script>` tag, the shopper's browser would need to make separate HTTP requests to retrieve each module.
	
In some cases, it would take longer to set up the HTTP request than to download the small JavaScript module – leading to slower load times. On mobile devices, slow load times can be especially frustrating.

### Bundling
To solve this problem, Stencil – like other modern front-end frameworks – bundles all the JavaScript modules into a single file (a bundle), allowing the shopper's browser to make only a single HTTP request. After the browser has downloaded the bundle of JavaScript modules, the browser caches them, speeding up the rest of the shopper's session.

### Minification
Beyond reducing the number of HTTP calls required to fetch all the required JavaScript modules, we can reduce the size of the individual JavaScript modules through minification. JavaScript minification removes white space and comments, shortens variable and function names, removes dead code, and more. The goal, in all cases, is to reduce the amount of bandwidth necessary to transmit the JavaScript module to the browser.

---

<a href='#adding_development-options' aria-hidden='true' class='block-anchor'  id='adding_development-options'><i aria-hidden='true' class='linkify icon'></i></a>

## Development Options

When you add JavaScript to a theme, use one of the following techniques, so that Stencil will automatically bundle and minify your modules:

* **Using npm:** Add third-party JavaScript modules to your theme with npm where possible.

* **Place Modules in assets/js/:** For a JavaScript module that is not distributed via npm, add this module to your theme by creating a subdirectory within assets/js/ that contains your module.

* **Theme-Specific JavaScript Modules:** Stencil themes include their own custom JavaScript modules for most page types. You can alter these page-type–specific modules by editing the files in assets/js/theme/*.js.

These techniques are outlined in the following sections.

---

<a href='#adding_using-npm' aria-hidden='true' class='block-anchor'  id='adding_using-npm'><i aria-hidden='true' class='linkify icon'></i></a>

## Using npm (Node Package Manager)

Many third-party JavaScript components are distributed with npm (Node Package Manager). When you use the npm command-line utility to add a JavaScript component to your theme, Stencil will automatically bundle and minify the component. To enable this bundling/minification, run each module's `npm install` command from the root directory of your theme.

### Taking Over from npm

npm facilitates managing third-party JavaScript components by placing each JavaScript component – and any of its dependencies – in the correct directories. However, as a developer, you will still need to edit your theme files to wire up the JavaScript component to expose it on your storefront. You will find several examples of this on the following pages.

---

<a href='#adding_development-options' aria-hidden='true' class='block-anchor'  id='adding_development-options'><i aria-hidden='true' class='linkify icon'></i></a>

## Page Types and Javascript API

<a href='#adding_page-types' aria-hidden='true' class='block-anchor'  id='page-types_stencil-utils'><i aria-hidden='true' class='linkify icon'></i></a>

Stencil themes include [an API](/api-reference/) for running JavaScript on a per-page basis.

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
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->

Notice the page types correspond to the html pages in [cornerstone/templates/pages/](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages).

</div>
</div>
</div>

---

<a href='#adding_page-template-injection' aria-hidden='true' class='block-anchor'  id='page-types_javascript'><i aria-hidden='true' class='linkify icon'></i></a>

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


---

<a href='#adding_placing-modules' aria-hidden='true' class='block-anchor'  id='adding_placing-modules'><i aria-hidden='true' class='linkify icon'></i></a>

## Placing Modules in assets/js/

You can freely create subdirectories within `assets/js/`, to contain new JavaScript modules. The constraint is that all JavaScript files in each module must use the `.js` file extension.

---

<a href='#adding_theme-specific-js' aria-hidden='true' class='block-anchor'  id='adding_theme-specific-js'><i aria-hidden='true' class='linkify icon'></i></a>

## Theme-Specific JavaScript Modules

In your theme's `assets/js/theme/` subdirectory, you will find a tree of JavaScript files. Each file is a JavaScript module. Some modules are for specific page types. Others are common modules that can be used in other modules. Still others are global modules that are available on every page.

---

<a href='#adding_mapping-page' aria-hidden='true' class='block-anchor'  id='adding_mapping-page'><i aria-hidden='true' class='linkify icon'></i></a>

## Mapping Page Types to JavaScript Modules

To find the mapping from page types to modules in `assets/js/theme/`, examine the `pageClasses` object in the file: `assets/js/app.js`. 

Each `=>import(...)` function within this class maps a page type to the entry module for that page type. 

For example: When the `cart` page type is loaded in the browser, the JavaScript module named `cart` will be loaded.

### Mapping Example in app.js

Below is an excerpt of mappings from the Cornerstone base theme's [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js):

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">app.js</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "app.js"
subtitle: ""
lineNumbers: true
-->

```javascript
import Global from './theme/global';

const getAccount = () => import('./theme/account');
const getLogin = () => import('./theme/auth');
const noop = null;

const pageClasses = {
    account_orderstatus: getAccount,
    account_order: getAccount,
    account_addressbook: getAccount,
    shippingaddressform: getAccount,
    account_new_return: getAccount,
    'add-wishlist': () => import('./theme/wishlist'),
    account_recentitems: getAccount,
    account_downloaditem: getAccount,
    editaccount: getAccount,
    account_inbox: getAccount,
    account_saved_return: getAccount,
    account_returns: getAccount,
    account_paymentmethods: getAccount,
    account_addpaymentmethod: getAccount,
    account_editpaymentmethod: getAccount,
    login: getLogin,
    createaccount_thanks: getLogin,
    createaccount: getLogin,
    getnewpassword: getLogin,
    forgotpassword: getLogin,
    blog: noop,
    blog_post: noop,
    brand: () => import('./theme/brand'),
    brands: noop,
    cart: () => import('./theme/cart'),
    category: () => import('./theme/category'),
    compare: () => import('./theme/compare'),
    page_contact_form: () => import('./theme/contact-us'),
    error: noop,
    404: noop,
    giftcertificates: () => import('./theme/gift-certificate'),
    giftcertificates_balance: () => import('./theme/gift-certificate'),
    giftcertificates_redeem: () => import('./theme/gift-certificate'),
    default: noop,
    page: noop,
    product: () => import('./theme/product'),
    amp_product_options: () => import('./theme/product'),
    search: () => import('./theme/search'),
    rss: noop,
    sitemap: noop,
    newsletter_subscribe: noop,
    wishlist: () => import('./theme/wishlist'),
    wishlists: () => import('./theme/wishlist'),
};
```

### Mapping Example in cart.js

Inside the `cart` module ([assets/js/theme/cart.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)), other modules are imported, and custom JavaScript methods for the cart module are created for the `Cart` class.

Here is an excerpt from Cornerstone's `assets/js/theme/cart.js` file:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">cart.js</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "cart.js"
subtitle: ""
lineNumbers: true
-->

```javascript
import PageManager from './page-manager';
import _ from 'lodash';
import giftCertCheck from './common/gift-certificate-validator';
import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from './cart/shipping-estimator';
import { defaultModal } from './global/modal';
import swal from './global/sweet-alert';

export default class Cart extends PageManager {
    onReady() {
        this.$cartContent = $('[data-cart-content]');
        this.$cartMessages = $('[data-cart-status]');
        this.$cartTotals = $('[data-cart-totals]');
        this.$overlay = $('[data-cart] .loadingOverlay')
            .hide(); // TODO: temporary until roper pulls in his cart components

        this.bindEvents();
    }
  
		cartUpdate($target) {
        const itemId = $target.data('cartItemid');
        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return swal({
                text: minError,
                type: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            return swal({
                text: maxError,
                type: 'error',
            });
        }
```

---

<a href='#adding_mapping-custom' aria-hidden='true' class='block-anchor'  id='adding_mapping-custom'><i aria-hidden='true' class='linkify icon'></i></a>

## Mapping Custom Templates to JavaScript Modules

If you add [custom page templates](/stencil-docs/storefront-customization/custom-templates/) to your theme, you can edit the same `assets/js/app.js` file to map each custom template to an appropriate JavaScript module.

In the following example, we will map a custom JavaScript file, `assets/js/themes/custom.js` to a custom product page file `templates/pages/custom/product/customProd.html`.


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Custom JS file</div>
    </div><div class="HubBlock-header-subtitle">assets/js/themes/custom.js</div>
</div>

<!--
title: "Custom product page file"
subtitle: "assets/js/themes/custom.js"
lineNumbers: true
-->


```js
import PageManager from "./page-manager";

export default class Custom extends PageManager  {

    onReady(){
        alert("Hello world!");
    }
}

```

This is a basic module that creates a class called Custom which extends the PageManager class. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Custom product page template file</div>
    </div><div class="HubBlock-header-subtitle">templates/pages/custom/product/customProd.html</div>
</div>

<!--
title: "Custom product page template file"
subtitle: "templates/pages/custom/product/customProd.html"
lineNumbers: true
-->
```html
{{~inject 'template' template}}
    <h2>Hello World!</h2>
    <body>
    Some custom content!
    <body>
    <script>window.__webpack_public_path__ = "{{cdn 'assets/dist/'}}";</script>
    <script src="{{cdn 'assets/dist/theme-bundle.main.js'}}"></script>
    <script>window.stencilBootstrap("{{page_type}}", {{jsContext}}).load();</script>
```

In order to successully map your custom module to a custom template file, that file must
* Inject the custom template 
* Load webpack 
* Load the main theme bundle
* Load stencilBootstrap

It is a good idea to pull in `{{>layout/base}}` to your custom template file because of these requirements.

Finally, use the customClasses function in `assets/js/app.js` to map the custom page file to your custom template. Your app.js file should look like this:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Mapping custom templates to JS modules</div>
    </div><div class="HubBlock-header-subtitle">assets/app.js</div>
</div>

<!--
title: "app.js"
subtitle: "Mapping custom templates to JS modules"
lineNumbers: true
-->

```js
const customClasses = {
    'pages/custom/product/customProd': () => import('./theme/custom')
};
/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param pageType String
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {
    const context = JSON.parse(contextJSON || '{}');

    return {
        load() {
            $(() => {
                // Load globals
                if (loadGlobal) {
                    Global.load(context);
                }

                const importPromises = [];

                // Find the appropriate page loader based on pageType
                const pageClassImporter = pageClasses[pageType];
                if (typeof pageClassImporter === 'function') {
                    importPromises.push(pageClassImporter());
                }

                // See if there is a page class default for a custom template
                const customTemplateImporter = customClasses[context.template];
                if (typeof customTemplateImporter === 'function') {
                    importPromises.push(customTemplateImporter());
                }

                // Wait for imports to resolve, then call load() on them
                Promise.all(importPromises).then(imports => {
                    imports.forEach(imported => {
                        imported.default.load(context);
                    });
                });
            });
        },
    };
};
```
---

<a href='#adding_summary' aria-hidden='true' class='block-anchor'  id='adding_summary'><i aria-hidden='true' class='linkify icon'></i></a>

## Summary

To review the basics of using JavaScript in your Stencil theme:

* Stencil automatically bundles and minifies JavaScript modules to optimize page performance.

* To insert custom JavaScript on a particular page in your theme, edit the JavaScript module that corresponds to the page's type.

* To add files from third-party JavaScript modules to a theme, use npm where possible.

* To add JavaScript modules not distributed via npm, you can create new subdirectories within [assets/js/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js).

* Theme-Specific JavaScript modules are provided in the theme's [assets/js/theme/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js/theme) subdirectory.

* To find the mapping between modules in assets/js/theme/ and page types, examine the PageClasses object contained in [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js).

* You can map JavaScript modules to custom page templates by editing the [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js) file.
