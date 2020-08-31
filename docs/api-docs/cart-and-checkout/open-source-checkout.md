# Packaging and Installing a Custom Checkout
### On this page

<div class="otp" id="no-index">
- [Prerequisites](#prerequisites)
- [](#)
</div>
You can create unique shopping experiences that fit with the look and feel of a store's brand using custom checkouts. This article will outline how to package a custom checkout file, and then install custom checkouts via the control panel.

This article will address using both [Open Source Checkout]() and [Checkout SDK]() powered checkouts.

## Prerequisites
- To use custom checkouts, a store should be using [Optimized One Page Checkout]()
- Custom checkouts must have a single JS loader file. This loader file should be responsible for:
    * Loading all the required assets, including CSS files.
    * Running the app.
>**Note**
>If the custom checkout is powered by Open Source UCO, the loader file functionality comes out of the box.

## 

(1.A) Loader file for Checkout SDK powered checkouts
Once the “Custom Checkout” option is selected in Control Panel > Checkout Settings, some properties will be attached to the window object (window.checkoutConfig) in the checkout page. Properties are:

* containerId: ID of the HTML component where the checkout app should be loaded.
* orderId: if present, it means we should render an order confirmation page for the given order Id.
* checkoutId: if present, the ID of the active checkout. You cant have both orderId and checkoutId
