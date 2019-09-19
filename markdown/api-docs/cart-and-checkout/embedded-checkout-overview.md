<h1>Embedded Checkout Overview</h1>
<div class="otp" id="no-index">
### On This Page

* [iFrame](#cart-checkout_iFrame)
* [Channels, Sites and Routes](#cart-checkout_channels-sites-routes)
* [BigCommerce Checkout SDK](#cart-checkout_embed-checkout-sdk)
* [Logged-In Customers](#cart-checkout_logged-in-customers)

</div>

Embedded Checkout lets you place BigCommerce’s checkout onto any website. Customers can check out on an external storefront while their order information syncs simultaneously to the BigCommerce Control Panel. You can see this in action within the BigCommerce for WordPress plugin, which uses the same process described here as a checkout option for merchants. View more information about the plugin in the article [BigCommerce for Wordpress](https://developer.bigcommerce.com/bigcommerce-for-wordpress/getting-started/introduction).

<a href='#cart-checkout_iframe' aria-hidden='true' class='block-anchor'  id='cart-checkout_iframe'><i aria-hidden='true' class='linkify icon'></i></a>

## How it Works

Embedded Checkout uses an HTML `<iframe>` to display a BigCommerce's PCI compliant Optimized One-Page Checkout on non-BigCommerce web pages.

If your channel site doesn't match the URL from which you're making a request to a BigCommerce, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

<a href='#cart-checkout_channels-sites-routes' aria-hidden='true' class='block-anchor'  id='cart-checkout_channels-sites-routes'><i aria-hidden='true' class='linkify icon'></i></a>

## Channels, Sites and Routes APIs

You will need to use the [Channels, Sites and Routes](#) APIs to embed checkout on an external site. The Channels API allows you to create and manage sales channel listings across a merchant's product catalog. A channel can be a marketplace, like Amazon, or an external storefront, like a WordPress site. The Sites and Routes APIs let you set an external storefront domain and define the paths for important pages, like the home page, cart page, or checkout page. The site and routes are used to link back to the proper URL from invoice emails and storefront links.

<a href='#cart-checkout_embed-checkout-sdk' aria-hidden='true' class='block-anchor'  id='cart-checkout_embed-checkout-sdk'><i aria-hidden='true' class='linkify icon'></i></a>

## BigCommerce Checkout SDK

Embedded Checkout requires the BigCommerce Checkout SDK to invoke a method that can render the checkout in your app. Learn more about the [Checkout SDK](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk).

<a href='#embedded-checkout_prerequisites' aria-hidden='true' class='block-anchor'  id='embedded-checkout_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Logged-In Customers

Customers are handled in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer so the session is active when the checkout loads. This is done through the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

