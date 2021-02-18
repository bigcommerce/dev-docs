# Adding Javascript to Your Stencil Theme

<div class="otp" id="no-index">

### On this page

- [Bundling and minification](#bundling-and-minification)
- [Development options](#development-options)
- [Using npm](#using-npm)
- [Page types and Javascript API](#page-types-and-javascript-api)
- [JavaScript template context injection](#javascript-template-context-injection)
- [Placing modules in assets/js/](#placing-modules-in-assetsjs)
- [Theme-specific JavaScript modules](#theme-specific-javascript-modules)
- [Mapping page types to JavaScript modules](#mapping-page-types-to-javascript-modules)
- [Mapping custom templates to JavaScript modules](#mapping-custom-templates-to-javascript-modules)
- [Summary](#summary)

</div>

## Bundling and minification

A small web application, such as a theme, can include rich user interactions that depend on many small JavaScript and CSS modules. If we were to embed each of the JavaScript modules in a template file with a separate `<script>` tag, the shopper's browser would need to make separate HTTP requests to retrieve each module.

In some cases, it would take longer to set up the HTTP request than to download the small JavaScript module, leading to slower load times. On mobile devices, slow load times can be especially frustrating.

### Bundling

To solve this problem, Stencil, like other modern front-end frameworks, bundles all the JavaScript modules into a single file (a bundle), allowing the shopper's browser to make only a single HTTP request. After the browser has downloaded the bundle of JavaScript modules, the browser caches them, speeding up the rest of the shopper's session.

### Minification

Beyond reducing the number of HTTP calls required to fetch all the required JavaScript modules, we can reduce the size of the individual JavaScript modules through minification. JavaScript minification removes white space and comments, shortens variable and function names, removes dead code, and more. The goal, in all cases, is to reduce the amount of bandwidth necessary to transmit the JavaScript module to the browser.

## Development options

When you add JavaScript to a theme, use one of the following techniques, so that Stencil will automatically bundle and minify your modules.

* **Using npm:** Add third-party JavaScript modules to your theme with npm where possible.
* **Place modules in assets/js/:** For a JavaScript module that is not distributed via npm, add this module to your theme by creating a subdirectory within assets/js/ that contains your module.
* **Theme-specific JavaScript modules:** Stencil themes include their own custom JavaScript modules for most page types. You can alter these page-type–specific modules by editing the files in assets/js/theme/*.js.

These techniques are outlined in the following sections.

## Using npm

Many third-party JavaScript components are distributed with npm. When you use the npm command-line utility to add a JavaScript component to your theme, Stencil will automatically bundle and minify the component. To enable this bundling and minification, run each module's `npm install` command from the root directory of your theme.

### Taking over from npm

The npm package manager facilitates the management of third-party JavaScript components by placing each JavaScript component in the correct directories. However, as a developer, you will still need to edit your theme files to wire up the JavaScript component to expose it on your storefront. You will find several examples of this on the following pages.

## Page types and Javascript API

Stencil themes include an API for running JavaScript on a per-page basis. To properly write JavaScript for your theme, you will have the following page types available to you:

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

These page types correspond to the pages within your theme. Each of these page types maps to an ES6 module that extends the base `PageManager` abstract class

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

> ### Note
> * Page types correspond to the HTML pages in [templates/pages/](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages).

</div>
</div>
</div>

## JavaScript template context injection

Occasionally, you might need to use dynamic data from the template context within your theme's client-side application code. Two helpers are provided to help achieve this.

The `inject` helper allows you to compose a JSON object with a subset of the template context to be sent to the browser:

`{{inject "stringBasedKey" contextValue}}`

To retrieve the parsable JSON object, call `{{jsContext}}` after all of the `{{inject}}` calls.

For example, to set up the product name in your client-side app, you can do this if you're in the context of a product:

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

## Placing modules in assets/js/

You can freely create subdirectories within `assets/js/`, to contain new JavaScript modules. The constraint is that all JavaScript files in each module must use the `.js` file extension.

## Theme-specific JavaScript modules

In your theme's `assets/js/theme/` subdirectory, you will find a tree of JavaScript files. Each file is a JavaScript module. Some modules are for specific page types. Others are common modules that can be used in other modules. Still others are global modules that are available on every page.

## Mapping page types to JavaScript modules

To find the mapping from page types to modules in `assets/js/theme/`, examine the `pageClasses` object in the file: `assets/js/app.js`.

Each `=>import(...)` function within this class maps a page type to the entry module for that page type. For example, when the `cart` page type is loaded in the browser, the JavaScript module named `cart` will be loaded.

### Mapping example in app.js

Below is an excerpt of mappings from the Cornerstone base theme's [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js).

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

### Mapping example in cart.js

Inside the `cart` module ([assets/js/theme/cart.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)), other modules are imported, and custom JavaScript methods for the cart module are created for the `Cart` class.

Below is an excerpt from Cornerstone's `assets/js/theme/cart.js` file.

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

## Mapping custom templates to JavaScript modules

If you add [custom page templates](/stencil-docs/storefront-customization/custom-templates/) to your theme, you can edit the same `assets/js/app.js` file to map each custom template to an appropriate JavaScript module.

In the following example, we will map a custom JavaScript file, `assets/js/themes/custom.js` to a custom product page file `templates/pages/custom/product/customProd.html`.

```js
import PageManager from "./page-manager";

export default class Custom extends PageManager {
    onReady(){
        alert("Hello world!");
    }
}
```

This is a basic module that creates a class called `Custom` which extends the PageManager class.

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

In order to successully map your custom module to a custom template file, that file must do the following:
* Inject the custom template
* Load webpack
* Load the main theme bundle
* Load stencilBootstrap

It is a good idea to pull in `{{>layout/base}}` to your custom template file because of these requirements.

Finally, use the customClasses function in `assets/js/app.js` to map the custom page file to your custom template. Your app.js file should look like this:

```js
const customClasses = {
    'pages/custom/product/customProd': () => import('./theme/custom'), // Mac/Linux
    'pages\\custom\\product\\customProd': () => import('./theme/custom'), // Windows
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

## Summary

To review the basics of using JavaScript in your Stencil theme:

* Stencil automatically bundles and minifies JavaScript modules to optimize page performance.
* To insert custom JavaScript on a particular page in your theme, edit the JavaScript module that corresponds to the page's type.
* To add files from third-party JavaScript modules to a theme, use npm where possible.
* To add JavaScript modules not distributed via npm, you can create new subdirectories within [assets/js/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js).
* Theme-Specific JavaScript modules are provided in the theme's [assets/js/theme/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js/theme) subdirectory.
* To find the mapping between modules in assets/js/theme/ and page types, examine the PageClasses object contained in [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js).
* You can map JavaScript modules to custom page templates by editing the [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js) file.
