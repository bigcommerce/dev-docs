# Embedded Checkout Overview

<div class="otp" id="no-index">

### On this page
- [How it works](#how-it-works)
- [Channels, Sites, and Routes APIs](#channels-sites-and-routes-apis)
- [BigCommerce Checkout SDK](#bigcommerce-checkout-sdk)
- [Logged-In customers](#logged-in-customers)
- [FAQ](#faq)

</div>

The [Checkout SDK's`embedded-checkout` sub-module](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/README.md#embedcheckout) can be used to embed [BigCommerce's Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout) into non-native storefronts like WordPress. You can see this in action within the BigCommerce for WordPress plugin, which uses the same process described here as a checkout option for merchants. For more information about the plugin, see [BigCommerce for Wordpress](https://developer.bigcommerce.com/bigcommerce-for-wordpress/getting-started/introduction).

## How it works

Embedded Checkout uses an HTML `<iframe>` to display BigCommerce's PCI compliant Optimized One-Page Checkout on non-BigCommerce web pages.

If your channel site doesn't match the URL from which you're making a request to a BigCommerce store, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

## Channels, Sites, and Routes APIs

You will need to use the [Channels, Sites, and Routes](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) APIs to embed checkout on an external site. The Channels API allows you to create and manage sales channel listings across a merchant's product catalog. A channel can be a marketplace, like Amazon, or an external storefront, like a WordPress site. The Sites and Routes APIs let you set an external storefront domain and define the paths for important pages, like the home page, cart page, or checkout page. The Sites and Routes APIs allow you to link back to the proper URL from invoice emails and storefront links.

## BigCommerce Checkout SDK

Embedded Checkout requires the BigCommerce Checkout SDK to invoke a method to render the checkout in your site. Learn more about the [Checkout SDK](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk).

## Logged-In customers

The [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api) allows you to manage customers in two steps. First, you need to pass the `customer_id` when creating the cart. Second, you need to log in the customer, so the session is active when the checkout loads.

## FAQ

### How do I resolve Embedded Checkout 403 "Cannot start checkout session with an empty cart" Errors?

For Embedded Checkout to work correctly for shoppers using a browser with restricted privacy settings (like Apple's Safari), your checkout page must be served from the same domain as your BigCommerce storefront. For example, if your headless storefront is `www.mystore.com`, then your BigCommerce store's domain should be `checkout.mystore.com`. For more information on making Embedded Checkout on a headless WordPress storefront compatible with Safari, see [BigCommerce for WordPress](https://support.bigcommerce.com/s/article/BigCommerce-for-WordPress-Checkout#safari) in the Help Center.
