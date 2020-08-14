# Embedded Checkout Overview 

<div class="otp" id="no-index">

### On this page
- [How it works](#how-it-works)
- [Channels, Sites, and Routes APIs](#channels-sites-and-routes-apis)
- [BigCommerce Checkout SDK](#bigcommerce-checkout-sdk)
- [Logged-In customers](#logged-in-customers)

</div>

Embedded Checkout lets you place BigCommerce’s checkout onto any website. Customers can check out on an external storefront while their order information syncs simultaneously to the BigCommerce Control Panel. You can see this in action within the BigCommerce for WordPress plugin, which uses the same process described here as a checkout option for merchants. View more information about the plugin in the article [BigCommerce for Wordpress](https://developer.bigcommerce.com/bigcommerce-for-wordpress/getting-started/introduction).

<a id="how-it-works"></a>

## How it works

Embedded Checkout uses an HTML `<iframe>` to display BigCommerce's PCI compliant Optimized One-Page Checkout on non-BigCommerce web pages.

If your channel site doesn't match the URL from which you're making a request to a BigCommerce store, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

<a id="channels-sites-and-routes-apis"></a>

## Channels, Sites, and Routes APIs

You will need to use the [Channels, Sites, and Routes](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) APIs to embed checkout on an external site. The Channels API allows you to create and manage sales channel listings across a merchant's product catalog. A channel can be a marketplace, like Amazon, or an external storefront, like a WordPress site. The Sites and Routes APIs let you set an external storefront domain and define the paths for important pages, like the home page, cart page, or checkout page. The Sites and Routes APIs allow you to link back to the proper URL from invoice emails and storefront links.

<a id="bigcommerce-checkout-sdk"></a>

## BigCommerce Checkout SDK

Embedded Checkout requires the BigCommerce Checkout SDK to invoke a method to render the checkout in your site. Learn more about the [Checkout SDK](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk).

<a id="embedded-logged-in-customers"></a>

## Logged-In customers

The [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api) allows you to manage customers in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer, so the session is active when the checkout loads.
