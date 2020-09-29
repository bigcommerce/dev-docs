# Checkout SDK Quickstart

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Installing the Checkout JS SDK](#installing-the-checkout-js-sdk)
- [Creating a checkout-loader.js file](#creating-a-checkoutjs-file)
- [Installing your custom checkout](#installing-custom-checkout)
- [Logging the Checkout Object](#logging-the-checkout-object)
- [Resources](#resources)



</div> 

The Checkout JS SDK is a JavaScript library of methods for performing actions related to checkout. It includes methods for logging in a customer, adding addresses to the checkout object, and surfacing the shipping and payment methods that a merchant has configured. It’s everything you need to build your own custom checkout page on BigCommerce.

The [sample checkout app](https://github.com/bigcommerce/checkout-sdk-js-example) we provide, built in React, is a great place to get started if you prefer to build within a framework. However, the SDK is framework agnostic because it's built with VanillaJS. 

To illustrate this point, this tutorial will walk through the first steps of building a custom checkout directly into the control panel. At the end of the tutorial, you will have installed the Checkout SDK, created a new JavaScript module for your custom checkout, and console logged the checkout object.


## Prerequisites
* This tutorial uses [Cornerstone](https://github.com/bigcommerce/cornerstone). Your theme may differ.
* Theme should be setup for [local development](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil).

## Installing the Checkout JS SDK

1. Open your terminal and navigate to your theme’s directory.

For example, `cd cornerstone`

2. Run the following command:

`npm install --save @bigcommerce/checkout-sdk`

## Creating a <span class = "fn">checkout-loader.js</span> file

In your text editor, create a file called checkout-loader.js with the following content:

```var script = document.createElement('script');
script.onload = function () {
    checkoutKitLoader.load('checkout-sdk')
        .then(function (module) {
            var checkoutService = module.createCheckoutService();
            return checkoutService.loadCheckout(window.checkoutConfig.checkoutId);
        })
        .then(function (state) {
            console.log('Checkout SDK Quickstart', state.data.getCheckout());
            document.getElementById(window.checkoutConfig.containerId).innerHTML = 'Checkout ID: ' + state.data.getCheckout().id;
        });
};
script.src = 'https://checkout-sdk.bigcommerce.com/v1/loader.js';
document.head.appendChild(script);
```

## Installing your custom checkout
For information on installing the checkout file generated in the previous step, see [Installing Custom Checkouts](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/installing-custom-checkouts#prerequisites). 

On the checkout page, you will see the script, the checkout ID on the screen, and in the developer console, you will see the entire available checkout object.

## Logging the Checkout Object

1. Navigate to the storefront and open your browser console.
2. Add an item to your cart and proceed to the checkout page. The checkout page will be blank below the header.
3. Note the checkout object logged to the console.


## Resources

### Sample apps
* [Checkout SDK Sample App](https://github.com/bigcommerce/checkout-sdk-js-example) (BigCommerce GitHub)
* [Checkout SDK Source Code](https://github.com/bigcommerce/checkout-sdk-js) (BigCommerce GitHub)

## Related articles
* [Authorizing and Initializing the CLI](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil)
