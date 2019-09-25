<h1>Checkout SDK Quickstart</h1>

<div class="otp" id="no-index">
<h3> On This Page </h3>
	<ul>
    <li><a href="#getting-started_prerequisites">Prerequisites</a></li>
    <li><a href="#getting-started_installing">Installing the Checkout JS SDK</a></li>
    <li><a href="#getting-started_creating">Creating a checkout.js File</a></li>
    <li><a href="#getting-started_mapping">Mapping the checkout.js File to the Checkout Page Type</a></li>
    <li><a href="#getting-started_preparing">Preparing the checkout.html Template File</a></li>
    <li><a href="#getting-started_logging">Logging the Checkout Object</a></li>
    <li><a href="#getting-started_next-steps">Next Steps</a></li>
</ul>
</div>

The Checkout JS SDK is a JavaScript library of methods for performing actions related to checkout. It includes methods for logging in a customer, adding addresses to the checkout object, and surfacing the shipping and payment methods that a merchant has configured. It’s everything you need to build your own custom checkout page on BigCommerce.

We have provided a [sample checkout app](https://github.com/bigcommerce/checkout-sdk-js-example) built in React; the React sample app is a great place to get started if you prefer to build within a framework. However, because the SDK is built in vanilla JS, it’s framework agnostic. To illustrate that point, this tutorial will walk through the first steps for building a custom checkout directly into the theme files using vanilla JS. At the end of the tutorial, you will have installed the Checkout SDK, created a new JavaScript module for your custom checkout, and console logged the checkout object.

---

<a href='#getting-started_prerequisites' aria-hidden='true' class='block-anchor'  id='getting-started_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites
* This tutorial uses [Cornerstone](https://github.com/bigcommerce/cornerstone). Your theme may differ.
* Theme should be setup for [local development](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil).


---

<a href='#getting-started_installing' aria-hidden='true' class='block-anchor'  id='getting-started_installing'><i aria-hidden='true' class='linkify icon'></i></a>

## Installing the Checkout JS SDK

1. Open your terminal and navigate to your theme’s directory.

For example, `cd cornerstone`

2. Run the following command:

`npm install --save @bigcommerce/checkout-sdk`


---

<a href='#getting-started_creating' aria-hidden='true' class='block-anchor'  id='getting-started_creating'><i aria-hidden='true' class='linkify icon'></i></a>

## Creating a <span class="fn">checkout.js</span> file

1. In your text editor, open your theme and create a new file in the <span class="fp">assets/js/theme</span> directory.

2. Save the file as checkout.js. You can name your checkout JavaScript file anything you like, but the subsequent steps of this tutorial will assume the filename checkout.js.

3. Add the following to your <span class="fn">checkout.js</span> file:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">checkout.js</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "checkout.js"
subtitle: ""
lineNumbers: true
-->

```js
import PageManager from './page-manager';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

const service = createCheckoutService();

export default class Checkout extends PageManager {
	async onReady() {
		const state = await service.loadCheckout();
console.log(state.data.getCheckout());
	}
}
```

Importing and extending the PageManager abstract class sets the page context for the <span class="fn">checkout.js</span> module. We also `import { createCheckoutService }` from the Checkout SDK.

The async keyword ensures that `onReady()` returns a Promise; the await keyword waits until the Promise resolves to load the checkout. Async/await is supported in nearly all modern browsers, but if you need to support older browsers like IE, you will require the [Promise polyfill](https://github.com/stefanpenner/es6-promise).

4. Save the file.

---

<a href='#getting-started_mapping' aria-hidden='true' class='block-anchor'  id='getting-started_mapping'><i aria-hidden='true' class='linkify icon'></i></a>

## Mapping the <span class="fn">checkout.js</span> file to the checkout page type

1. Open the <span class="fp">assets/js/app.js</span> file in your text editor.

2. Add the following to map your <span class="fn">checkout.js</span> file to the checkout page type:

`checkout: () => import('./theme/checkout'),`

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

```js
...
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
		checkout: () => import('./theme/checkout'),
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
...
```

3. Save the file.

---

<a href='#getting-started_preparing' aria-hidden='true' class='block-anchor'  id='getting-started_preparing'><i aria-hidden='true' class='linkify icon'></i></a>

## Preparing the <span class="fn">checkout.html</span> template file

1. Open the <span class="fn">checkout.html</span> file in your text editor.
2. Comment out the following statement:

 `{{{ checkout.checkout_content }}}`

`<!--{{{ checkout.checkout_content }}}-->`

3. On the next line, add the following:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">checkout.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "checkout.html"
subtitle: ""
lineNumbers: true
-->

```html
<script>window.__webpack_public_path__ = "{{cdn 'assets/dist/'}}";</script>
<script src="{{cdn 'assets/dist/theme-bundle.main.js'}}"></script>

<script>
    window.stencilBootstrap("{{page_type}}", {{jsContext}}).load();
</script>
```

4. Save the file.

---

<a href='#getting-started_logging' aria-hidden='true' class='block-anchor'  id='getting-started_logging'><i aria-hidden='true' class='linkify icon'></i></a>

## Logging the Checkout Object

1. Navigate to the storefront and open your browser console.
2. Add an item to your cart and proceed to the checkout page. The checkout page will be blank below the header.
3. Note the checkout object logged to the console.


---

<a href='#getting-started_next-steps' aria-hidden='true' class='block-anchor'  id='getting-started_next-steps'><i aria-hidden='true' class='linkify icon'></i></a>

## Next Steps

Build out your custom checkout page by entering your HTML into the `checkout.html` file and JavaScript into checkout.js. For detailed documentation on all of the Checkout SDK library methods visit the [SDK GitHub repository](https://github.com/bigcommerce/checkout-sdk-js).

---

## Resources

### Sample Apps
* [Checkout SDK Sample App](https://github.com/bigcommerce/checkout-sdk-js-example) (BigCommerce GitHub)
* [Checkout SDK Source Code](https://github.com/bigcommerce/checkout-sdk-js) (BigCommerce GitHub)

## Related Articles
* [Authorizing and Initializing the CLI](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil)

## Additonal Resources
* [Promise Polyfill]( https://github.com/stefanpenner/es6-promise) (GitHub)
