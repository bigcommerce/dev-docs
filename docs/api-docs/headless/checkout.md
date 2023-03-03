# Creating Checkouts



This section covers checkout options available to headless storefronts.

## Redirecting to the BigCommerce checkout

You can redirect a customer to the BigCommerce hosted checkout page when creating a cart by appending the `include=redirect_urls` query parameter to the request URL of the [Create a Cart](/api-reference/store-management/carts/cart/createacart) endpoint.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts?include=redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

The `redirect_urls` object returned in the response will contain `cart_url`, `checkout_url`, and `embedded_checkout_url` parameters. You can use the `checkout_url` URL to redirect the customer to the BigCommerce hosted checkout page.

For example:

```json
"redirect_urls": {
    "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=1687e279-6813-44a8-aee7-1cbe4c01297c&token=cb6d14d60b724cd844b3f21ccaaaa69d66f3fdb327baea08dfb176c15e0dcc4f",
    "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=1687e279-6813-44a8-aee7-1cbe4c01297c&token=cb6d14d60b724cd844b3f21ccaaaa69d66f3fdb327baea08dfb176c15e0dcc4f",
    "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=1687e279-6813-44a8-aee7-1cbe4c01297c&token=cb6d14d60b724cd844b3f21ccaaaa69d66f3fdb327baea08dfb176c15e0dcc4f"
}
```

It is important to note that when you use the hosted checkout option the shoppers are able to navigate to other pages of your store. The following are some of the methods to prevent this.

1. Use the [Sites and Routes API](/api-reference/store-management/sites) to create redirects from BigCommerce hosted pages back to the non-BigCommerce storefront (recommended).
2. Hide non-essential pages by removing the back links on cart and checkout pages.
3. Add a JavaScript redirect on all pages (except `/checkout`) that redirects to the non-BigCommerce storefront.
4. Wrap all content in the theme's layouts in a conditional that only renders the BigCommerce storefront if certain conditions are met (an admin customer group, for example), and redirect to the non-BigCommerce storefront otherwise.
5. Replace all content in theme layout files with a redirect to the non-BigCommerce storefront.

## Embedding the BigCommerce checkout

Embedded Checkout lets you embed the BigCommerce hosted checkout into your headless storefront using an iFrame. It relies on the [embedCheckout](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/README.md#embedcheckout) method of the Checkout SDK to display BigCommerce's PCI compliant [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US) on non-native storefronts. 

For a sequence of API calls required to create an Embedded Checkout, refer to the [Embedded Checkout tutorial](/api-docs/storefronts/embedded-checkout/embedded-checkout-tutorial). 

For a list of supported payment gateways, see [Compatible payment gateways](/api-docs/store-management/payment-processing#compatible-payment-gateways).

## Using the Checkouts API

If you need complete control over the checkout page, you can use the [Checkouts API](/api-reference/store-management/checkouts) to build a custom checkout experience. 

The Checkouts API allows you to move the cart to checkout and turn it into an order.

## Next steps

- [Learn how to create an Embedded Checkout](/api-docs/storefronts/embedded-checkout/embedded-checkout-tutorial)
- [Learn how to log in a customer](/api-docs/storefronts/guide/customers)

## Resources

- [Restyle Optimized One-Page Checkout](/stencil-docs/customizing-checkout/optimized-one-page-checkout)
- [Checkout JS repo](https://github.com/bigcommerce/checkout-js)
- [Checkout SDK Quickstart](/stencil-docs/customizing-checkout/checkout-sdk-quickstart)
