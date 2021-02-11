# Available APIs

<div class="otp" id="no-index">

### On this page
- [Storefront APIs](#storefront-apis)
- [Management APIs](#management-apis)
- [Provider APIs](#provider-apis)
- [Deprecations and sunsets](#deprecations-and-sunsets)

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

## Deprecations and sunsets

### Deprecations

The following endpoints are deprecated.

| Endpoints | Replacements |
|-|-|
|`/v2/brands`| [V3 Brands](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/brands/getbrands)|
|`/v2/categories`| [V3 Categories](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/category/getcategories)|
|`/v2/customers`| [V3 Customers](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api)|
|`/v2/options`| [V3 Options](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-options), [V3 Modifiers](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-modifiers) |
|`/v2/option_sets`|[V3 Options](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-options), [V3 Variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants)|
|`/v2/products `| [V3 Products](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts)|
|`/v2/redirects`|[V3 Redirects](https://developer.bigcommerce.com/api-reference/storefront/redirects)|



<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Deprecated endpoints are no longer supported by BigCommerce; their use is discouraged.
> * In V3, `options` and `modifiers` attach directly to products. Use `options` and `modifiers` together to access the contents of the former V2 `options` response.
> * `option_sets` endpoint is intentionally not available in the V3 API. See [Difference between V2 and V3 Catalog APIs](https://developer.bigcommerce.com/api-docs/store-management/catalog/v2-vs-v3#difference-between-v2-and-v3-catalog-apis) for more information.

</div>
</div>
</div>

### Sunsets

The following operations are scheduled to be removed.

| Operation | Endpoints | Sunset | Replacement |
|-|-|-|-|
| `DELETE Collection` | `/v2/customers`| May 10, 2020| [`DELETE /v3/customers`](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/customers/customersdelete)|
| `DELETE Collection` | `/v2/option_sets`| May 10, 2020| None; can still be deleted individually by ID.|
| `DELETE Collection` | `/v2/products`| May 10, 2020| [`DELETE /v3/catalog/products`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/deleteproducts)|

The following properties are scheduled to be removed.

| Property | Endpoints | Sunset | Replacement |
|-|-|-|-|
|`is_activated`| [Channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/listchannels) | May, 10, 2020 | `status` |

[Learn more about V2 vs V3 API](https://developer.bigcommerce.com/api-docs/store-management/catalog/v2-vs-v3).