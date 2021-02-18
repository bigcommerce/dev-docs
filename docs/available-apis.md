# Available APIs

<div class="otp" id="no-index">

### On this page
- [Storefront APIs](#storefront-apis)
- [Management APIs](#management-apis)
- [Provider APIs](#provider-apis)
- [Resources](#resources)

</div>

## Storefront APIs

### REST

Manage a shopper's cart and checkout and fetch order data via client-side JavaScript on BigCommerce [Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) powered storefronts.

[Learn more about storefront APIs](https://developer.bigcommerce.com/api-docs/storefront/overview).

### GraphQL

Use GraphQL to query data for headless storefronts and BigCommerce [Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) powered storefronts.

[Learn more about the GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)

### Add to cart URLs

Append query string parameters to product and `/cart.php` URLs to pre-select a SKU or add a product to cart. Use these parameters to build custom add to cart links and forms on BigCommerce hosted storefronts and remote sites (such as WordPress, blog posts, and social media).

[Learn more about add to cart URLs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/add-to-cart-url).

### Current Customer

Identify logged-in customers securely via JavaScript.

[Learn more about the current customer API](https://developer.bigcommerce.com/api-docs/customers/current-customer-api).

### Customer Login SSO

Enable single sign-on for shoppers on BigCommerce hosted storefronts.

[Learn more about the customer login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

## Management APIs

### V2 REST API

Mananage store resources from server-side code.

Some **V2** resources are not yet exposed in the **V3 API**; however, for resources that are accessible via both APIs, the **V3 API** is recommended; it contains performance optimizations and [other improvements](#v3-rest-api).

### V3 REST API

Mananage store resources from server-side code.

Interactions with the **V3** API are very similar to that of the **V2** API; however, the **V3** API introduces a number of improvements:
* Most tasks can be performed with fewer API calls (for example, a product with variants and custom fields can be created in a single request)
* Each **V3** resource includes a `meta` object, simplifying pagination
* **V3** Brands, Categories, Products, and Product Variants expose a [metafields](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-metafields/createproductmetafield) resource for use by developers to store custom data.
* **V3** API is optimized for performance (in general, data can be sent, received, and processed faster via **V3**, relative to **V2**).

[Learn more about the V3 API](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api).

## Provider APIs

Implement endpoints consumed by BigCommerce for custom integrations (ex: custom shipping carrier rates via `/rates`).

[Learn more about the Shipping Provider API](https://developer.bigcommerce.com/api-docs/store-management/shipping/shipping-provider-api).

## Resources

- [Deprecations and Sunsets](https://developer.bigcommerce.com/api-docs/getting-started/deprecations-and-sunsets)
- [Difference between V2 and V3 Catalog REST APIs](https://developer.bigcommerce.com/api-docs/store-management/catalog/v2-vs-v3)