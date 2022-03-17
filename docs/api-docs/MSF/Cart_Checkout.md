# Cart & Checkout

The Cart & Checkout APIs experience no schema changes as part of this release. However, it is important to set the correct `channel_id` for the Channel you are servicing when creating a Cart.

If you use [cart redirect URLs](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl) or [Embedded Checkout](https://developer.bigcommerce.com/api-docs/cart-and-checkout/embedded-checkout/embedded-checkout-overview), the URLs for these should automatically reference the appropriate Site when requested.
