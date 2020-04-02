- [BigCommerce APIs at a Glance](#bigcommerce-apis-at-a-glance)
- [V2 REST API](#v2-rest-api)
- [V3 REST API](#v3-rest-api)
- [Webhooks](#webhooks)
- [Payment Processing API](#payment-processing-api)
- [Storefront API](#storefront-api)
- [Storefront GraphQL API](#storefront-graphql-api)
- [Customer Login API](#customer-login-api)
- [Current Customer API](#current-customer-api)
- [Provider APIs](#provider-apis)
- [Add to Cart URLs](#add-to-cart-urls)
- [Deprecated BigCommerce APIs](#deprecated-bigcommerce-apis)

## BigCommerce APIs at a Glance
|API|Server|Description|
|-|-|-|
|[V2 REST](#v2-rest-api)|`api.bigcommerce.com/stores/{store_hash}/v2/`| Exposes many resources (including webhooks); some not yet accessibly via `v3` API |
|[V3 REST](#v3-rest-api)|`api.bigcommerce.com/stores/{store_hash}/v3/`| Exposes many resources (including carts and checkouts for headless implementations)|
|[Webhooks](#webhooks)|`api.bigcommerce.com/stores/{store_hash}/v2/hooks`| Webhooks are managed via the `v2` API and are listed separately here for visibility |
|[Payment Processing](#payment-processing-api)|`payments.bigcommerce.com/stores/`| Exposes `/payments` endpoint for processing order payments|
|[Storefront](#storefront-api)|`{store_domain}/api/storefront/`| Client API that exposes storefront data to stencil themes|
|[Storefront GraphQL API](#storefront-graphql-api)|`{store_domain}/graphql`| Client API for fetching storefront data via GraphQL queries |
|[Customer Login](#customer-login-api)|`{store_domain}/login/token/`| Client API that enables single sign-on (SSO) for customer logins |
|[Current Customer](#current-customer-api)|`{store_domain}/customer/current.jwt`| Client API for confirming a customer's identity in the browser|
|[Providers](#provider-apis)|`{provider_server}`|Implemented by partners and consumed by BigCommerce for custom integrations |
|[Add to Cart URLs](#add-to-cart-urls)|`{store_domain}`| Query string params that can be used to pre-select SKUs and add to cart|

**Additional Information:** [About our APIs](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api) | [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication) | [API Status Codes](https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes)

## V2 REST API

BigCommerce's **V2 REST API** exposes many endpoints developers can use to programmatically interact with store resources (including webhooks). Some **V2 API** resources are not yet exposed in the **V3 API**; however, for resources that are accessible via both APIs, the **V3 API** is recommended, as it contains performance optimizations as well as a number of [other improvements](#v3-rest-api).

**Server**: `api.bigcommerce.com/stores/{store_hash}/v2`

|  Resources | Description | Endpoint |
| --- | --- | --- |
|  [Banners](https://developer.bigcommerce.com/api-reference/store-management/marketing/banners) | Create / manage banners | `/banners` |
|  [Blog Posts](https://developer.bigcommerce.com/api-reference/store-management/store-content/blog-posts) | Create / manage blog posts | `/blog/posts` |
|  [Blog Tags](https://developer.bigcommerce.com/api-reference/store-management/store-content/blog-tags) | Create / manage blog tags | `/blog/tags` |
|  [Coupons](https://developer.bigcommerce.com/api-reference/store-management/marketing/coupons) | Create / manage coupons | `/coupons` |
|  [Currencies](https://developer.bigcommerce.com/api-reference/store-management/currency-api/currencies) | Create / manage currencies | `/currencies` |
|  [Customer Addresses](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-addresses) | Create / manage customer addresses | `/customers/{id}/addresses` |
|  [Customer Groups](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-groups) | Create / manage customer groups | `/customer_groups` |
|  [Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customers) | Create / manage customers | `/customers` |
|  [Customers Validate Password](developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-passwords) | Validate customer passwords | `/customers/{id}/validate` |
|  [Countries](https://developer.bigcommerce.com/api-reference/store-management/geography-api/countries) | List of states, provinces, and countries | `/countries` |
|  [Gift Certificates](https://developer.bigcommerce.com/api-reference/store-management/marketing/gift-certificates) | Create / manage gift certificates | `/gift_certificates` |
|  [Orders](https://developer.bigcommerce.com/api-reference/store-management/orders) | Create / manage orders | `/orders` |
|  [Pages](https://developer.bigcommerce.com/api-reference/store-management/store-content/pages) | Create / manage content pages | `/pages` |
|  [Payment Methods](https://developer.bigcommerce.com/api-reference/payments/payment-methods-api/payment-methods) | Create / manage enabled payment methods | `/payments/methods` |
|  [Redirects](https://developer.bigcommerce.com/api-reference/store-management/store-content/redirects) | Create / manage URL redirects | `/redirects` |
|  [Shipping Carriers](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-carrier) | Create / manage shipping carriers | `/shipping/carrier/connection` |
|  [Shipping Methods](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-method) | Create / manage shipping methods | `/shipping` |
|  [Shipping Zones](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-zones) | Create / manage shipping Zones | `/shipping` |
|  [Store Information](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/store-information-reference) | Create / manage metadata | `/store` |
|  [Tax Class](https://developer.bigcommerce.com/api-reference/store-management/tax-classes-api) | Get available tax classes | `/tax_classes` |
|  [Time Zone](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/time-zone) | Get system timestamp | `/time` |

## V3 REST API

Like the **V2 API**, BigCommerce's **V3 REST API** exposes many endpoints developers can use to programmatically interact with store resources (including [server-to-server carts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) and [checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api) for using BigCommerce headlessly). Interactions with the **V3** API are very similar to that of the **V2** API; however, the **V3** API introduces a number of improvements: 
* Most tasks can be performed with fewer API calls (for example, a product with variants and custom fields can be created in a single request)
* Each **V3** resource includes a `meta` object, simplifying pagination
* **V3** Brands, Categories, Products, and Product Variants expose a [metafields](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-metafields/createproductmetafield) resource for use by developers to store custom data.
* **V3** API is optimized for performance (in general, data can be sent, received, and processed faster via **V3**, relative to **V2**). 

**Server**: `api.bigcommerce.com/stores/{store_hash}/v3`

|  Resource | Description | Endpoint |
| --- | --- | --- |
|  [Brand Images](https://developer.bigcommerce.com/api-reference/store-management/catalog/brand-images) | Create and manage brand images | `/catalog/brands/{id}/images` |
|  [Brand Metafields](https://developer.bigcommerce.com/api-reference/store-management/catalog/brand-metafields) | Create and manage brand metafields | `/catalog/brands/{id}/metafields` |
|  [Brands](https://developer.bigcommerce.com/api-reference/store-management/catalog/brands) | Create and manage brands | `/catalog/brands` |
|  [Carts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) | Create an manage store carts headlessly | `/carts` |
|  [Categories](https://developer.bigcommerce.com/api-reference/store-management/catalog/category) | Create and manage categories | `/catalog/categories` |
|  [Category Images](https://developer.bigcommerce.com/api-reference/store-management/catalog/category-images) | Create and manage category images | `/catalog/categories/{id}/images` |
|  [Category Metafields](https://developer.bigcommerce.com/api-reference/store-management/catalog/category-metafields) | Create and manage category metafields | `/catalog/categories/{id}/metafields` |
|  [Channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels) | Create and manage catalog listings and channels | `/channels` |
|  [Checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api) | Create checkouts headlessly | `/checkouts` |
|  [Customer Addresses](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-addresses) | Create and manage customer attributes | `/customers/attributes` |
|  [Customer Attribute Values](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-attribute-values) | Create and manage customer attribute values | `/customers/attribute-values` |
|  [Customer Attributes](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-attributes) | Create and manage customer attributes | `/customers/attributes` |
|  [Customer Form Field Values](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-form-fields) | Create an manage customer form field values | `/customers/form-field-values` |
|  [Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customers) | Create and manage customers and their addresses | `/customers` |
|  [Order Transactions](https://developer.bigcommerce.com/api-reference/store-management/order-transactions) | View order payment information | `/orders/{id}/transactions` |
|  [Payment Processing Methods](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api/payment-methods) | Get order payment methods for processing | `/payments/methods` |
|  [Payment Processing Token](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api/payment-access-token) | Get an access token for payment processing | `/payments/accsess_tokens` |
|  [Price List Records](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-records) | Create and manage price list records | `/pricelists/records` |
|  [Price Lists](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists) | Create and manage catalog pricing variations | `/pricelists` |
|  [Products](https://developer.bigcommerce.com/api-reference/store-management/catalog/products) | Create and manage products | `/catalog/products` |
|  [Product Bulk Pricing Rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-bulk-pricing-rules) | Create and manage product bulk pricing rules | `/catalog/products/{id}/buld-pricing-rules` |
|  [Product Complex Rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules) | Create and manage product complex rules | `/catalog/products/{id}/complex-rules` |
|  [Product Custom Fields](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-custom-fields) | Create and manage product custom fields | `/catalog/products/{id}/custom-fields` |
|  [Product Images](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-images) | Create and manage product images | `/catalog/products/{id}/images` |
|  [Product Metafields](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-metafields) | Create and manage product meta fields | `/catalog/products/{id}/metafields` |
|  [Product Modifier Images](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifier-images) | Create and manage product modifier images | `/catalog/products/{id}/modifiers/{id}/images` |
|  [Product Modifier Values](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifier-values) | Create and manage product modifier values | `/catalog/products/{id}/modifers/{id}/values` |
|  [Product Modifiers](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers) | Create and manage product modifiers | `/catalog/products/{id}/modifiers` |
|  [Product Reviews](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-reviews) | Create and manage product reviews | `/catalog/products/{id}/reviews` |
|  [Product Variant Metafields](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-variants-metafields) | Create and manage product meta fields | `/catalog/products/{id}/variants/{id}/metafields` |
|  [Product Option Values](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-option-values) | Create and manage product variant option values | `/catalog/products/{id}/options/{id}/values` |
|  [Product Options](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-options) | Create and manage product variant options | `/catalog/products/{id}/options` |
|  [Product Variants](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-variants) | Create and manage product variants | `/catalog/products/{id}/variants` |
|  [Product Videos](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-videos) | Create and manage product videos | `/catalog/products/{id}/videos` |
|  [Scripts](https://developer.bigcommerce.com/api-reference/store-management/scripts) | Add client-side code to a store | `/content/scripts` |
|  [Sites](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) | Manage sites and routing for headless storefronts | `/sites` |
|  [Storefront API Token](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-api-token/api-token) | Create Auth Tokens for use with Storefront APIs | `/api-token` |
|  [Storefront Customer Impersonation Token](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-api-token/customer-impersonation-token) | Create a storefront API token for customer impersonation | `/api-token-customer-impersonation` |
|  [Subscribers](https://developer.bigcommerce.com/api-reference/store-management/subscribers) | Create and manage store newsletter subscribers | `/customers/subscribers` |
|  [Themes](https://developer.bigcommerce.com/api-reference/store-management/themes) | Create and manage store theme's | `/themes` |
|  [Variants](https://developer.bigcommerce.com/api-reference/store-management/catalog/variants) | Get and update all variants | `/catalog/variants` |
|  [Webhooks](https://developer.bigcommerce.com/api-reference/webhooks) | Manage store Webhooks | `/hooks` |
|  [Widgets](https://developer.bigcommerce.com/api-reference/store-management/widgets) | Create and manage store widgets | `/content/widgets` |
|  [Widgets Placements](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement) | Place, move, and remove store widgets | `/content/placements` |
|  [Widgets Regions](https://developer.bigcommerce.com/api-reference/store-management/widgets/regions) | Get list of regions widgets can be placed for a specified template file | `/content/regions` |
|  [Widgets Templates](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template) | Create and manage widget templates | `/content/widget-templates` |
|  [Wishlist](https://developer.bigcommerce.com/api-reference/cart-checkout/wishlists) | Create and manage customer wishlists | `/wishlists` |

**Additional Information:** [About our APIs](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api) | [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication) | [API Status Codes](https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes)

## Webhooks

**Webhooks** allow app developers to be notified when specific events occur. Webhooks are managed via the **V2 API** and are listed separately here for visibility.

**Server**: `api.bigcommerce.com/stores/{store_hash}/v2`

|  Resource | Description | Endpoint |
| --- | --- | --- |
|  [Webhooks](https://developer.bigcommerce.com/api-reference/webhooks) | Manage store Webhooks | `/hooks` |

**Additional Information**: [Webhooks Overview](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/about-webhooks)

## Payment Processing API

Using the Payment Processing API, developers can programmatically process payments through a BigCommerce store's payment gateway.

**Server**: `payments.bigcommerce.com/stores/{store_hash}`

|  Resource               | Description                              | Endpoint                            |
|-------------------------|------------------------------------------|-------------------------------------|
|  [Payment Processing](https://developer.bigcommerce.com/api-reference/payments/payments-process-payments) | Process payments on orders and checkouts | `payments.bigcommerce.com/payments` |

In addition to the payment processing API's `/payments` endpoint, there are two **v3** API endpoints related to payment processing. The first (`/v3/payments/access_tokens`) is required to retrieve a payment access token for authenticating requests against `payments.bigcommerce.com`. Requests to the second endpoint (`/v3/payments/methods`) are optional, and can be used to retrieve an order's accepted payment methods, when necessary.

| Request                                   | Endpoint                                                                    |
|-------------------------------------------|-----------------------------------------------------------------------------|
| [Create the payment token](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)              | `api.bigcommerce.com/stores/{store_hash}}/v3/payments/access_tokens` |
| [Get order accepted payment methods](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)    | `api.bigcommerce.com/stores/{store_hash}/v3/payments/methods`        | 

**Additional Information:** [Payment Processing API Overview](https://developer.bigcommerce.com/api-docs/payments/payments-api-overview)

## Storefront API

BigCommerce's **Storefront API** is a client API that exposes storefront data to stencil themes. The Storefront API can be used to manage a shopper's cart and checkout and fetch order data via client-side JavaScript.

**Server**: `{store_domain}/api/storefront`

|  Resource                                                                                                        | Description                               | Endpoint                            |
|------------------------------------------------------------------------------------------------------------------|-------------------------------------------|-------------------------------------|
| [Storefront Carts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api)            | Create and get carts                      | `/carts`             |
| [Storefront Checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api)    | Create and get checkouts on the front-end | `/checkouts`         |
| [Storefront Orders](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-orders)             | Get order data after order is placed      | `/orders`            |

**Additional Information:** [Storefront Cart and Checkout Overview](https://developer.bigcommerce.com/api-docs/cart-and-checkout/cart-and-checkout-overview) | [Working with Storefront APIs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis) | 

## Storefront GraphQL API

BigCommerce’s **GraphQL Storefront API** makes it possible to query storefront data from within a Stencil theme or remote site. This means information previously only available on the back-end via Stencil’s template logic can now be accessed via front-end JavaScript. Additionally, by leveraging the power of GraphQL, data for multiple resources can be returned from a single API call, which simplifies integration and increases performance so that developers can focus on building delightful shopper experiences.

**Server**: `{store_domain}/graphql`

| Reference Documentation |
|-------------------------|
| [GraphQL PlayGround](https://developer.bigcommerce.com/graphql-playground)  |
| [GraphQL Explorer](https://developer.bigcommerce.com/graphql-explorer)    |

**Additional Information:** [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)

## Customer Login API

The **Customer Login API** enables single sign-on (SSO). It allows apps to programmatically log in a storefront customer via `/login/token/{token}`, where`{token}` is a JSON Web Token (`JWT`) containing the parameters for the customer login request, signed by the application’s `OAuth` **client secret**.

**Server**: `{store_domain}`

|  Resource | Description | Endpoint|
|-|-|-|
| [Customer Login](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)| Use JWT & SSO to login a customer| `/login/token/{token}` |

**Additional Information**: [Customers & Subscribers Overview](https://developer.bigcommerce.com/api-docs/customers/customers-subscribers-overview)

## Current Customer API

Apps that interact dynamically with a BigCommerce storefront and convey information specific to a particular logged-in customer must confirm the customer's identity within the insecure environment of the customer's browser.

To address this need, BigCommerce provides a Current Customer endpoint accessibly via client-side JavaScript. This endpoint returns a `JWT` with identifying details about the customer. The information is signed with an `OAuth` **client secret**.

**Server**: `{store_domain}`

|  Resource | Description | Endpoint|
|-|-|-|
| [Current Customer](https://developer.bigcommerce.com/api-docs/customers/current-customer-api)| Securely identify customer on the front-end  | `/customer/current.jwt?app_client_id=`|

**Additional Information**: [Customers & Subscribers Overview](https://developer.bigcommerce.com/api-docs/customers/customers-subscribers-overview)


## Provider APIs

Provider API references describe endpoints, responses, and requests that can be implemented by partners and consumed by BigCommerce for the purpose of creating custom integrations (ex: custom shipping carrier rates via `/rates`).

**Server**: `{providers_server}`

| Provider API | Description |
|-|-|
|[Shipping Provider API](https://developer.bigcommerce.com/api-reference/store-management/shipping-provider-api)|Allows third parties to integrate their own shipping carriers into the BigCommerce checkout and control panel.|

**Additional Information:** [Shipping Provider API Overview](https://developer.bigcommerce.com/api-docs/store-management/shipping/shipping-provider-api)


## Add to Cart URLs

Query string parameters can be appended to BigCommerce product and `/cart.php` URLs in order to pre-select an SKU or add a product to cart. These parameters make it possible to build custom add to cart links and forms for use on BigCommerce storefronts and remote sites (such as WordPress, blog posts, and social media).

**Server**: `{store_domain}`

| **Type**| **Parameter** | **Description**                                     | **Example**                                                 |
|--|-|--|-|
| string  | `action=`     | `add` or  `buy`; `buy` goes directly to checkout    | `/cart.php?action=add&product_id=123`                       |
| string  | `couponcode=` | coupon code to apply to the cart                    | `/cart.php?action=add&product_id=123&couponcode=10off100`   |
| int     | `product_id=` | product id to add to the cart                       | `/cart.php?action=add&product_id=123`                       |
| int     | `qty=`        | quantity to add to the cart                         | `/cart.php?action=add&product_id=123&qty=3`                 |
| string  | `sku=`        | SKU to add to the cart (or select on product page)  | `/cart.php?action=add&sku=xlredtshirt`                      |
| string  | `source=`     | source of the sale for analytics; can be any string | `/cart.php?action=buy&sku=xlredtshirt&source=emailcampaign` |


**Additional Information:** [Add to Cart URLs Overview](https://developer.bigcommerce.com/api-docs/cart-and-checkout/add-to-cart-url)


## Deprecated BigCommerce APIs

Due to changes in the APIs, certain endpoints are no longer supported and should not be used. This section contains a continuously updated list of deprecated BigCommerce API endpoints and suggested alternatives.  

### Deprecated V2 API Endpoints and V3 API Alternatives

Listed below are all of the deprecated V2 API endpoints and V3 equivalents. 

|V2 API Endpoint|V3 API Alternative |
|-|-|
|`/v2/brands`| `/v3/catalog/brands`|
|`/v2/categories`| `/v3/catalog/categories`|
|`/v2/customers`| `/v3/customers`|
|`/v2/options`| In V3, `options` belong to each product. Use the `options` subresource on the product instead. |
|`/v2/option_sets`| `option_sets` endpoint is not available in the V3 API. However, `option_sets` can still be deleted individually by their ID.|

**Additional Information:** [V2 versus V3 API](https://developer.bigcommerce.com/legacy/v2-products/v2-v3#Whats-not-in-V3) 
