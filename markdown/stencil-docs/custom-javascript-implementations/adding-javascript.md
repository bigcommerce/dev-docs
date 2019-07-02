<h1>Adding Javascript to Your Stencil Theme</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#adding_bundling-and-minification">Bundling and Minification</a></li>
    <li><a href="#adding_development-options">Development Options</a></li>
    <li><a href="#adding_using-npm">Using npm (Node Package Manager)</a></li>
    <li><a href="#adding_placing-modules">Placing Modules in assets/js/</a></li>
    <li><a href="#adding_theme-specific-js">Theme-Specific JavaScript Modules</a></li>
    <li><a href="#adding_mapping-page">Mapping Page Types to JavaScript Modules</a></li>
    <li><a href="#adding_mapping-custom">Mapping Custom Templates to JavaScript Modules</a></li>
    <li><a href="#adding_summary">Summary</a></li>
	</ul>
</div>

<a href='#adding_bundling-and-minification' aria-hidden='true' class='block-anchor'  id='adding_bundling-and-minification'></a>

## Bundling and Minification

A small Web application, such as an ecommerce theme, can include rich user interactions that depend on many small JavaScript and CSS modules. If we were to embed each of the JavaScript modules in a template file with a separate `<script>` tag, the shopper's browser would need to make separate HTTP requests to retrieve each module.
	
In some cases, it would take longer to set up the HTTP request than to download the small JavaScript module – leading to slower load times. On mobile devices, slow load times can be especially frustrating.

### Bundling
To solve this problem, Stencil – like other modern front-end frameworks – bundles all the JavaScript modules into a single file (a bundle), allowing the shopper's browser to make only a single HTTP request. After the browser has downloaded the bundle of JavaScript modules, the browser caches them, speeding up the rest of the shopper's session.

### Minification
Beyond reducing the number of HTTP calls required to fetch all the required JavaScript modules, we can reduce the size of the individual JavaScript modules through minification. JavaScript minification removes white space and comments, shortens variable and function names, removes dead code, and more. The goal, in all cases, is to reduce the amount of bandwidth necessary to transmit the JavaScript module to the browser.



<a href='#adding_development-options' aria-hidden='true' class='block-anchor'  id='adding_development-options'></a>

## Development Options

When you add JavaScript to a theme, use one of the following techniques, so that Stencil will automatically bundle and minify your modules:

* **Using npm:** Add third-party JavaScript modules to your theme with npm where possible.

* **Place Modules in assets/js/:** For a JavaScript module that is not distributed via npm, add this module to your theme by creating a subdirectory within assets/js/ that contains your module.

* **Theme-Specific JavaScript Modules:** Stencil themes include their own custom JavaScript modules for most page types. You can alter these page-type–specific modules by editing the files in assets/js/theme/*.js.

These techniques are outlined in the following sections.



<a href='#adding_using-npm' aria-hidden='true' class='block-anchor'  id='adding_using-npm'></a>

## Using npm (Node Package Manager)

Many third-party JavaScript components are distributed with npm (Node Package Manager). When you use the npm command-line utility to add a JavaScript component to your theme, Stencil will automatically bundle and minify the component. To enable this bundling/minification, run each module's `npm install` command from the root directory of your theme.

### Taking Over from npm

npm facilitates managing third-party JavaScript components by placing each JavaScript component – and any of its dependencies – in the correct directories. However, as a developer, you will still need to edit your theme files to wire up the JavaScript component to expose it on your storefront. You will find several examples of this on the following pages.



<a href='#adding_placing-modules' aria-hidden='true' class='block-anchor'  id='adding_placing-modules'></a>

## Placing Modules in assets/js/

You can freely create subdirectories within `assets/js/`, to contain new JavaScript modules. The constraint is that all JavaScript files in each module must use the `.js` file extension.



<a href='#adding_theme-specific-js' aria-hidden='true' class='block-anchor'  id='adding_theme-specific-js'></a>

## Theme-Specific JavaScript Modules

In your theme's `assets/js/theme/` subdirectory, you will find a tree of JavaScript files. Each file is a JavaScript module. Some modules are for specific page types. Others are common modules that can be used in other modules. Still others are global modules that are available on every page.



<a href='#adding_mapping-page' aria-hidden='true' class='block-anchor'  id='adding_mapping-page'></a>

## Mapping Page Types to JavaScript Modules

To find the mapping from page types to modules in `assets/js/theme/`, examine the `pageClasses` object in the file: `assets/js/app.js`. 

Each `=>import(...)` function within this class maps a page type to the entry module for that page type. 

For example: When the `cart` page type is loaded in the browser, the JavaScript module named `cart` will be loaded.

### Mapping Example in app.js

Below is an excerpt of mappings from the Cornerstone base theme's [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js):

<!--
title: "app.js"
subtitle: ""
lineNumbers: true
-->

```
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

<!--
title: "cart.js"
subtitle: ""
lineNumbers: true
-->

```
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



<a href='#adding_mapping-custom' aria-hidden='true' class='block-anchor'  id='adding_mapping-custom'></a>

## Mapping Custom Templates to JavaScript Modules

If you add [custom page templates](/stencil-docs/template-files/custom-templates/about-custom-templates) to your theme, you can edit the same `assets/js/app.js` file to map each custom template to an appropriate JavaScript module.

<!--
title: "app.js"
subtitle: "map custom templates to js modules"
lineNumbers: true
-->

```js
const customClasses = {};

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

### Injecting Custom Templates

In the theme's [templates/layout/base.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/layout/base.html) template, we've added the line `{{inject 'template' template}}` just above `{{{snippet 'htmlhead'}}}` statement to inject the custom template:

<!--
title: "base.html"
subtitle: "custom template injection"
lineNumbers: true
-->

```html
<head>
      <title>{{ head.title }}</title>
      {{{ head.meta_tags }}}
      {{{ head.config }}}
      [...]

      {{{head.scripts}}}
      {{{head.rsslinks}}}

      {{inject 'themeSettings' theme_settings}}
      {{inject 'genericError' (lang 'common.generic_error')}}
      {{inject 'maintenanceMode' settings.maintenance}}
      {{inject 'urls' urls}}
      {{inject 'template' template}} //injects the custom template
      {{{snippet 'htmlhead'}}}
</head> 
```



<a href='#adding_summary' aria-hidden='true' class='block-anchor'  id='adding_summary'></a>

## Summary

To review the basics of using JavaScript in your Stencil theme:

* Stencil automatically bundles and minifies JavaScript modules to optimize page performance.

* To insert custom JavaScript on a particular page in your theme, edit the JavaScript module that corresponds to the page's type.

* To add files from third-party JavaScript modules to a theme, use npm where possible.

* To add JavaScript modules not distributed via npm, you can create new subdirectories within [assets/js/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js).

* Theme-Specific JavaScript modules are provided in the theme's [assets/js/theme/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js/theme) subdirectory.

* To find the mapping between modules in assets/js/theme/ and page types, examine the PageClasses object contained in [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js).

* You can map JavaScript modules to custom page templates by editing the [assets/js/app.js](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/app.js) file.

