# API Reference



## BigCommerce APIs at a glance
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

**Additional Information:** [About our APIs](/api-docs/getting-started/about-our-api) | [Authentication](/api-docs/getting-started/authentication) | [API Status Codes](/api-docs/getting-started/api-status-codes)

## V2 REST API

BigCommerce's **V2 REST API** exposes many endpoints developers can use to programmatically interact with store resources (including webhooks). Some **V2 API** resources are not yet exposed in the **V3 API**; however, for resources that are accessible via both APIs, the **V3 API** is recommended, as it contains performance optimizations as well as a number of [other improvements](#v3-rest-api).

**Server**: `api.bigcommerce.com/stores/{store_hash}/v2`

|  Resources | Description | Endpoint |
| --- | --- | --- |
|  [Banners](/api-reference/store-management/marketing/banners) | Create / manage banners | `/banners` |
|  [Blog Posts](/api-reference/store-management/store-content/blog-posts) | Create / manage blog posts | `/blog/posts` |
|  [Blog Tags](/api-reference/store-management/store-content/blog-tags) | Create / manage blog tags | `/blog/tags` |
|  [Coupons](/api-reference/store-management/marketing/coupons) | Create / manage coupons | `/coupons` |
|  [Currencies](/api-reference/store-management/currency-api/currencies) | Create / manage currencies | `/currencies` |
|  [Customer Addresses](/api-reference/store-management/customers-v2/customer-addresses) | Create / manage customer addresses | `/customers/{id}/addresses` |
|  [Customer Groups](/api-reference/store-management/customers-v2/customer-groups) | Create / manage customer groups | `/customer_groups` |
|  [Customers](/api-reference/store-management/customers-v2/customers) | Create / manage customers | `/customers` |
|  [Customers Validate Password](/api-reference/store-management/customers-v2/customer-passwords) | Validate customer passwords | `/customers/{id}/validate` |
|  [Countries](/api-reference/store-management/geography-api/countries) | List of states, provinces, and countries | `/countries` |
|  [Gift Certificates](/api-reference/store-management/marketing/gift-certificates) | Create / manage gift certificates | `/gift_certificates` |
|  [Orders](/api-reference/store-management/orders) | Create / manage orders | `/orders` |
|  [Pages](/api-reference/store-management/store-content/pages) | Create / manage content pages | `/pages` |
|  [Payment Methods](/api-reference/payments/payment-methods-api/payment-methods) | Create / manage enabled payment methods | `/payments/methods` |
|  [Redirects](/api-reference/store-management/store-content/redirects) | Create / manage URL redirects | `/redirects` |
|  [Shipping Carriers](/api-reference/store-management/shipping-api/shipping-carrier) | Create / manage shipping carriers | `/shipping/carrier/connection` |
|  [Shipping Methods](/api-reference/store-management/shipping-api/shipping-method) | Create / manage shipping methods | `/shipping` |
|  [Shipping Zones](/api-reference/store-management/shipping-api/shipping-zones) | Create / manage shipping Zones | `/shipping` |
|  [Store Information](/api-reference/store-management/store-information-api/store-information) | Create / manage metadata | `/store` |
|  [Tax Class](/api-reference/store-management/tax-classes-api) | Get available tax classes | `/tax_classes` |
|  [Time Zone](/api-reference/store-management/store-information-api/time-zone) | Get system timestamp | `/time` |

## V3 REST API

Like the **V2 API**, BigCommerce's **V3 REST API** exposes many endpoints developers can use to programmatically interact with store resources (including [server-to-server carts](/api-reference/cart-checkout/server-server-cart-api) and [checkouts](/api-reference/cart-checkout/storefront-checkout-api) for using BigCommerce headlessly). Interactions with the **V3** API are very similar to that of the **V2** API; however, the **V3** API introduces a number of improvements:
* Most tasks can be performed with fewer API calls (for example, a product with variants and custom fields can be created in a single request)
* Each **V3** resource includes a `meta` object, simplifying pagination
* **V3** Brands, Categories, Products, and Product Variants expose a [metafields](/api-reference/catalog/catalog-api/product-metafields/createproductmetafield) resource for use by developers to store custom data.
* **V3** API is optimized for performance (in general, data can be sent, received, and processed faster via **V3**, relative to **V2**).

**Server**: `api.bigcommerce.com/stores/{store_hash}/v3`

|  Resource | Description | Endpoint |
| --- | --- | --- |
|  [Brand Images](/api-reference/catalog/catalog-api/brand-images) | Create and manage brand images | `/catalog/brands/{id}/images` |
|  [Brand Metafields](/api-reference/catalog/catalog-api/brand-metafields) | Create and manage brand metafields | `/catalog/brands/{id}/metafields` |
|  [Brands](/api-reference/catalog/catalog-api/brands) | Create and manage brands | `/catalog/brands` |
|  [Carts](/api-reference/cart-checkout/server-server-cart-api) | Create and manage store carts headlessly | `/carts` |
|  [Categories](/api-reference/catalog/catalog-api/category) | Create and manage categories | `/catalog/categories` |
|  [Category Images](/api-reference/catalog/catalog-api/category-images) | Create and manage category images | `/catalog/categories/{id}/images` |
|  [Category Metafields](/api-reference/catalog/catalog-api/category-metafields) | Create and manage category metafields | `/catalog/categories/{id}/metafields` |
|  [Channels](/api-reference/store-management/channels/channels) | Create and manage catalog listings and channels | `/channels` |
|  [Checkouts](/api-reference/cart-checkout/server-server-checkout-api) | Create checkouts headlessly | `/checkouts` |
|  [Customer Addresses](/api-reference/store-management/customers-v3/customer-addresses) | Create and manage customer addresses | `/customers/addresses` |
|  [Customer Attribute Values](/api-reference/store-management/customers-v3/customer-attribute-values) | Create and manage customer attribute values | `/customers/attribute-values` |
|  [Customer Attributes](/api-reference/store-management/customers-v3/customer-attributes) | Create and manage customer attributes | `/customers/attributes` |
|  [Customer Form Field Values](/api-reference/store-management/customers-v3/customer-form-fields) | Create and manage customer form field values | `/customers/form-field-values` |
|  [Customers](/api-reference/store-management/customers-v3/customers) | Create and manage customers and their addresses | `/customers` |
|  [Order Transactions](/api-reference/store-management/order-transactions) | View order payment information | `/orders/{id}/transactions` |
|  [Payment Processing Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods) | Get order payment methods for processing | `/payments/methods` |
|  [Payment Processing Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token) | Get an access token for payment processing | `/payments/accsess_tokens` |
|  [Price List Records](/api-reference/store-management/price-lists/price-lists-records) | Create and manage price list records | `/pricelists/records` |
|  [Price Lists](/api-reference/store-management/price-lists/price-lists) | Create and manage catalog pricing variations | `/pricelists` |
|  [Products](/api-reference/catalog/catalog-api/products) | Create and manage products | `/catalog/products` |
|  [Product Bulk Pricing Rules](/api-reference/catalog/catalog-api/product-bulk-pricing-rules) | Create and manage product bulk pricing rules | `/catalog/products/{id}/bulk-pricing-rules` |
|  [Product Complex Rules](/api-reference/catalog/catalog-api/product-complex-rules) | Create and manage product complex rules | `/catalog/products/{id}/complex-rules` |
|  [Product Custom Fields](/api-reference/catalog/catalog-api/product-custom-fields) | Create and manage product custom fields | `/catalog/products/{id}/custom-fields` |
|  [Product Images](/api-reference/catalog/catalog-api/product-images) | Create and manage product images | `/catalog/products/{id}/images` |
|  [Product Metafields](/api-reference/catalog/catalog-api/product-metafields) | Create and manage product meta fields | `/catalog/products/{id}/metafields` |
|  [Product Modifier Images](/api-reference/catalog/catalog-api/product-modifier-images) | Create and manage product modifier images | `/catalog/products/{id}/modifiers/{id}/images` |
|  [Product Modifier Values](/api-reference/catalog/catalog-api/product-modifier-values) | Create and manage product modifier values | `/catalog/products/{id}/modifers/{id}/values` |
|  [Product Modifiers](/api-reference/catalog/catalog-api/product-modifiers) | Create and manage product modifiers | `/catalog/products/{id}/modifiers` |
|  [Product Reviews](/api-reference/catalog/catalog-api/product-reviews) | Create and manage product reviews | `/catalog/products/{id}/reviews` |
|  [Product Variant Metafields](/api-reference/catalog/catalog-api/product-variants-metafields) | Create and manage product meta fields | `/catalog/products/{id}/variants/{id}/metafields` |
|  [Product Option Values](/api-reference/catalog/catalog-api/product-option-values) | Create and manage product variant option values | `/catalog/products/{id}/options/{id}/values` |
|  [Product Options](/api-reference/catalog/catalog-api/product-options) | Create and manage product variant options | `/catalog/products/{id}/options` |
|  [Product Variants](/api-reference/catalog/catalog-api/product-variants) | Create and manage product variants | `/catalog/products/{id}/variants` |
|  [Product Videos](/api-reference/catalog/catalog-api/product-videos) | Create and manage product videos | `/catalog/products/{id}/videos` |
|  [Redirects](/api-reference/storefront/redirects) | Manage 301 Redirects for Storefronts | `/storefront/redirects` |
|  [Scripts](/api-reference/store-management/scripts) | Add client-side code to a store | `/content/scripts` |
|  [Sites](/api-reference/cart-checkout/sites-routes-api) | Manage sites and routing for headless storefronts | `/sites` |
|  [Storefront API Token](/api-reference/store-management/tokens/api-token/createtoken) | Create Auth Tokens for use with Storefront APIs | `/api-token` |
|  [Storefront Customer Impersonation Token](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation) | Create a storefront API token for customer impersonation | `/api-token-customer-impersonation` |
|  [Subscribers](/api-reference/store-management/subscribers) | Create and manage store newsletter subscribers | `/customers/subscribers` |
|  [Themes](/api-reference/store-management/themes) | Create and manage store theme's | `/themes` |
|  [Variants](/api-reference/catalog/catalog-api/variants) | Get and update all variants | `/catalog/variants` |
|  [Webhooks](/api-reference/webhooks) | Manage store Webhooks | `/hooks` |
|  [Widgets](/api-reference/store-management/widgets) | Create and manage store widgets | `/content/widgets` |
|  [Widgets Placements](/api-reference/store-management/widgets/placement) | Place, move, and remove store widgets | `/content/placements` |
|  [Widgets Regions](/api-reference/store-management/widgets/regions) | Get list of regions widgets can be placed for a specified template file | `/content/regions` |
|  [Widgets Templates](/api-reference/store-management/widgets/widget-template) | Create and manage widget templates | `/content/widget-templates` |
|  [Wishlist](/api-reference/cart-checkout/wishlists) | Create and manage customer wishlists | `/wishlists` |

**Additional Information:** [About our APIs](/api-docs/getting-started/about-our-api) | [Authentication](/api-docs/getting-started/authentication) | [API Status Codes](/api-docs/getting-started/api-status-codes)

## Webhooks

**Webhooks** allow app developers to be notified when specific events occur. Webhooks are managed via the **V2 API** and are listed separately here for visibility.

**Server**: `api.bigcommerce.com/stores/{store_hash}/v2`

|  Resource | Description | Endpoint |
| --- | --- | --- |
|  [Webhooks](/api-reference/webhooks) | Manage store Webhooks | `/hooks` |

**Additional Information**: [Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks)

## Payment Processing API

Using the Payment Processing API, developers can programmatically process payments through a BigCommerce store's payment gateway.

**Server**: `payments.bigcommerce.com/stores/{store_hash}`

|  Resource               | Description                              | Endpoint                            |
|-------------------------|------------------------------------------|-------------------------------------|
|  [Payment Processing](/api-reference/payments/payments-process-payments) | Process payments on orders and checkouts | `payments.bigcommerce.com/payments` |

In addition to the payment processing API's `/payments` endpoint, there are two **v3** API endpoints related to payment processing. The first (`/v3/payments/access_tokens`) is required to retrieve a payment access token for authenticating requests against `payments.bigcommerce.com`. Requests to the second endpoint (`/v3/payments/methods`) are optional, and can be used to retrieve an order's accepted payment methods, when necessary.

| Request                                   | Endpoint                                                                    |
|-------------------------------------------|-----------------------------------------------------------------------------|
| [Create the payment token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)              | `api.bigcommerce.com/stores/{store_hash}}/v3/payments/access_tokens` |
| [Get order accepted payment methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)    | `api.bigcommerce.com/stores/{store_hash}/v3/payments/methods`        |

**Additional Information:** [Payment Processing API Overview](/api-docs/payments/payments-api-overview)

## Storefront API

BigCommerce's **Storefront API** is a client API that exposes storefront data to stencil themes. The Storefront API can be used to manage a shopper's cart and checkout and fetch order data via client-side JavaScript.

**Server**: `{store_domain}/api/storefront`

|  Resource                                                                                                        | Description                               | Endpoint                            |
|------------------------------------------------------------------------------------------------------------------|-------------------------------------------|-------------------------------------|
| [Storefront Carts](/api-reference/cart-checkout/storefront-cart-api)            | Create and get carts                      | `/carts`             |
| [Storefront Checkouts](/api-reference/cart-checkout/storefront-checkout-api)    | Create and get checkouts on the front-end | `/checkouts`         |
| [Storefront Orders](/api-reference/cart-checkout/storefront-orders)             | Get order data after order is placed      | `/orders`            |

**Additional Information:** [Storefront Cart and Checkout Overview](/api-docs/cart-and-checkout/cart-and-checkout-overview) | [Working with Storefront APIs](/api-docs/cart-and-checkout/working-sf-apis) |

## Storefront GraphQL API

BigCommerce’s **GraphQL Storefront API** makes it possible to query storefront data from within a Stencil theme or remote site. This means information previously only available on the back-end via Stencil’s template logic can now be accessed via front-end JavaScript. Additionally, by leveraging the power of GraphQL, data for multiple resources can be returned from a single API call, which simplifies integration and increases performance so that developers can focus on building delightful shopper experiences.

**Server**: `{store_domain}/graphql`

| Reference Documentation |
|-------------------------|
| [GraphQL PlayGround](/graphql-playground)  |
| [GraphQL Explorer](/graphql-explorer)    |

**Additional Information:** [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview)

## Customer Login API

The **Customer Login API** enables single sign-on (SSO). It allows apps to programmatically log in a storefront customer via `/login/token/{token}`, where`{token}` is a JSON Web Token (`JWT`) containing the parameters for the customer login request, signed by the application’s `OAuth` **client secret**.

**Server**: `{store_domain}`

|  Resource | Description | Endpoint|
|-|-|-|
| [Customer Login](/api-docs/storefront/customer-login-api)| Use JWT & SSO to login a customer| `/login/token/{token}` |

**Additional Information**: [Customers & Subscribers Overview](/api-docs/customers/customers-subscribers-overview)

## Current Customer API

Apps that interact dynamically with a BigCommerce storefront and convey information specific to a particular logged-in customer must confirm the customer's identity within the insecure environment of the customer's browser.

To address this need, BigCommerce provides a Current Customer endpoint accessibly via client-side JavaScript. This endpoint returns a `JWT` with identifying details about the customer. The information is signed with an `OAuth` **client secret**.

**Server**: `{store_domain}`

|  Resource | Description | Endpoint|
|-|-|-|
| [Current Customer](/api-docs/customers/current-customer-api)| Securely identify customer on the front-end  | `/customer/current.jwt?app_client_id=`|

**Additional Information**: [Customers & Subscribers Overview](/api-docs/customers/customers-subscribers-overview)


## Provider APIs

Provider API references describe endpoints, responses, and requests that can be implemented by partners and consumed by BigCommerce for the purpose of creating custom integrations (ex: custom shipping carrier rates via `/rates`).

**Server**: `{providers_server}`

| Provider API | Description |
|-|-|
|[Shipping Provider API](/api-reference/store-management/shipping-provider-api)|Allows third parties to integrate their own shipping carriers into the BigCommerce checkout and control panel.|

**Additional Information:** [Shipping Provider API Overview](/api-docs/store-management/shipping/shipping-provider-api)


## Add to cart URLs

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


**Additional Information:**
[Add to Cart URLs Overview](/api-docs/cart-and-checkout/add-to-cart-url)

## API spec files

| API | Download|
|-|-|
| Storefront Token | <a class="cursor-pointer" href="/api-reference/cart-checkout/storefront-api-token/BigCommerce_Storefront_Token_API.oas2.json" target="_blank" download="BigCommerce_Storefront_Token_API.oas2.json">BigCommerce_Storefront_Token_API.oas2.json</a>|
|Storefront Carts |<a class="cursor-pointer" href="/api-reference/cart-checkout/storefront-cart-api/BigCommerce_Storefront_Cart_API.oas2.json" target="_blank" download="BigCommerce_Storefront_Cart_API.oas2.json">BigCommerce_Storefront_Cart_API.oas2.json</a> |
| Storefront Checkouts |<a class="cursor-pointer" href="/api-reference/cart-checkout/storefront-checkout-api /BigCommerce_Storefront_Checkouts_2.oas2.json" target="_blank" download="BigCommerce_Storefront_Checkouts_2.oas2.json">BigCommerce_Storefront_Checkouts_2.oas2.json</a> |
|Storefront Orders |<a class="cursor-pointer" href="/api-reference/cart-checkout/storefront-orders/BigCommerce_Storefront_Orders_API.oas2.json" target="_blank" download="BigCommerce_Storefront_Orders_API.oas2.json">BigCommerce_Storefront_Orders_API.oas2.json</a> |
| Server-to-Server Carts |<a class="cursor-pointer" href="/api-reference/cart-checkout/server-server-cart-api/BigCommerce_Server_to_Server_Cart_API.oas2.json" target="_blank" download="BigCommerce_Server_to_Server_Cart_API.oas2.json">BigCommerce_Server_to_Server_Cart_API.oas2.json</a> |
|Server-to-Server Checkouts |<a class="cursor-pointer" href="/api-reference/cart-checkout/server-server-checkout-api/BigCommerce_Server_to_Server_Checkout_API.oas2.json" target="_blank" download="BigCommerce_Server_to_Server_Checkout_API.oas2.json">BigCommerce_Channels_Listings_API.oas2.json</a> |
| Channels and Listings |<a class="cursor-pointer" href="/api-reference/cart-checkout/channels-listings-api/BigCommerce_Channels_Listings_API.oas2.json" target="_blank" download="BigCommerce_Storefront_Checkouts_2.oas2.json">BigCommerce_Channels_Listings_API.oas2.json</a> |
|Sites and Routes|<a class="cursor-pointer" href="/api-reference/cart-checkout/sites-routes-api/BigCommerce_Channels_Listings_API.oas2.json.json" target="_blank" download="BigCommerce_Channels_Listings_API.oas2.json.json">BigCommerce_Channels_Listings_API.oas2.json</a> |
| Wishlists |<a class="cursor-pointer" href="/api-reference/cart-checkout/wishlists/BigCommerce_Channels_Listings_API.oas2.json" target="_blank" download="BigCommerce_Channels_Listings_API.oas2.json">BigCommerce_Channels_Listings_API.oas2.json</a> |
|Payment Processing Token and Methods| <a class="cursor-pointer" href="/api-reference/payments/payments-create-payment-token-api/BigCommerce_Payments_API.oas2.json" target="_blank" download="BigCommerce_Payments_API.oas2.json">BigCommerce_Payments_API.oas2.json</a> |
| Enabled Store Payment Methods |<a class="cursor-pointer" href="/api-reference/payments/payment-methods-api/BigCommerce_Enabled_Payment_Methods_API.oas2.json" target="_blank" download="BigCommerce_Enabled_Payment_Methods_API.oas2.json">BigCommerce_Enabled_Payment_Methods_API.oas2.json/a> |
|Process Payment |<a class="cursor-pointer" href="/api-reference/payments/payments-process-payments/BigCommerce_Process_Payment_API.oas2.json" target="_blank" download="BigCommerce_Process_Payment_API.oas2.json">BigCommerce_Process_Payment_API.oas2.json</a> |
|Geography |<a class="cursor-pointer" href="/api-reference/store-management/geography-api/BigCommerce_Geography_API.oas2.json" target="_blank" download="BigCommerce_Geography_API.oas2.json">BigCommerce_Geography_API.oas2.json</a> |
|Currencies |<a class="cursor-pointer" href="/api-reference/store-management/currency-api/BigCommerce_Currency_API.oas2.json" target="_blank" download="BigCommerce_Currency_API.oas2.json">BigCommerce_Currency_API.oas2.json</a> |
|Marketing |<a class="cursor-pointer" href="/api-reference/store-management/marketing/BigCommerce_Marketing_API.oas2.json" target="_blank" download="BigCommerce_Marketing_API.oas2.json">BigCommerce_Marketing_API.oas2.json</a> |
|Orders V3 |<a class="cursor-pointer" href="/api-reference/store-management/order-transactions/BigCommerce_Order_Transactions_API.oas2.json" target="_blank" download="BBigCommerce_Order_Transactions_API.oas2.json">BigCommerce_Order_Transactions_API.oas2.json</a> |
|Orders V2 |<a class="cursor-pointer" href="/api-reference/store-management/orders/BigCommerce_Order_Transactions_API.oas2.json" target="_blank" download="BigCommerce_Order_Transactions_API.oas2.json">BigCommerce_Order_Transactions_API.oas2.json</a> |
|Payment Methods |<a class="cursor-pointer" href="/api-reference/store-management/payment-methods/BigCommerce_Payments_API.oas2.json" target="_blank" download="BigCommerce_Payments_API.oas2.json">BigCommerce_Payments_API.oas2.json</a> |
|Price Lists |<a class="cursor-pointer" href="/api-reference/store-management/price-lists/BigCommerce_Price_Lists_API.oas2.json" target="_blank" download="BigCommerce_Price_Lists_API.oas2.json">BigCommerce_Price_Lists_API.oas2.json</a> |
|Scripts |<a class="cursor-pointer" href="//api-reference/store-management/scripts/BigCommerce_Scripts_API.oas2.json" target="_blank" download="BigCommerce_Scripts_API.oas2.json">BigCommerce_Scripts_API.oas2.json</a> |
|Shipping |<a class="cursor-pointer" href="/api-reference/store-management/shipping-api/BigCommerce_Shipping_API.oas2.json" target="_blank" download="BigCommerce_Shipping_API.oas2.json">BigCommerce_Shipping_API.oas2.json</a> |
|Shipping Provider |<a class="cursor-pointer" href="/api-reference/store-management/shipping-provider-api/BigCommerce_Shipping_Provider_API.oas2.json" target="_blank" download="BigCommerce_Shipping_Provider_API.oas2.json">BigCommerce_Shipping_Provider_API.oas2.json</a> |
|Store Content |<a class="cursor-pointer" href="/api-reference/store-management/store-content/BigCommerce_Store_Content_API.oas2.json" target="_blank" download="BigCommerce_Store_Content_API.oas2.json">BigCommerce_Store_Content_API.oas2.json</a> |
|Store Information |<a class="cursor-pointer" href="/api-reference/store-management/store-information-api/BigCommerce_Store_Information_API.oas2.json" target="_blank" download="BigCommerce_Store_Information_API.oas2.json">BigCommerce_Store_Information_API.oas2.json</a> |
|Subscribers |<a class="cursor-pointer" href="/api-reference/store-management/subscribers/BigCommerce_Subscribers_API.oas2.json" target="_blank" download="BigCommerce_Subscribers_API.oas2.json">BigCommerce_Subscribers_API.oas2.json</a> |
|Tax Class |<a class="cursor-pointer" href="/api-reference/cart-checkout/storefront-api-token/BigCommerce_Tax_Class_API.oas2.json" target="_blank" download="BigCommerce_Tax_Class_API.oas2.json">BigCommerce_Tax_Class_API.oas2.json</a> |
|Themes |<a class="cursor-pointer" href="/api-reference/store-management/themes/BigCommerce_Themes_API.oas2.json" target="_blank" download="BigCommerce_Themes_API.oas2.json">BigCommerce_Themes_API.oas2.json</a> |
|Widgets |<a class="cursor-pointer" href="/api-reference/store-management/widgets/BigCommerce_Widgets_API.oas2.json" target="_blank" download="BigCommerce_Widgets_API.oas2.json">BigCommerce_Widgets_API.oas2.json</a> |
|Shipping Provider |<a class="cursor-pointer" href="/api-reference/providers/shipping-provider-api/BigCommerce_Shipping_Provider_API.oas2.json" target="_blank" download="BigCommerce_Shipping_Provider_API.oas2.json">BigCommerce_Shipping_Provider_API.oas2.json</a> |
|Catalog |<a class="cursor-pointer" href="/api-reference/catalog/catalog-api/BigCommerce_Catalog_API.oas2.json" target="_blank" download="BigCommerce_Catalog_API.oas2.json">BigCommerce_Catalog_API.oas2.json</a> |
|Customers V3 |<a class="cursor-pointer" href="/api-reference/customer-subscribers/v3-customers-api/BigCommerce_Customers_V3_API.oas2.json" target="_blank" download="BigCommerce_Customers_V3_API.oas2.json">BigCommerce_Customers_V3_API.oas2.json</a> |
|Customers V2 |<a class="cursor-pointer" href="/api-reference/customer-subscribers/customers-api/BigCommerce_Customers_API.oas2.json" target="_blank" download="BigCommerce_Customers_API.oas2.json">BigCommerce_Customers_API.oas2.json</a> |
|Subscribers |<a class="cursor-pointer" href="/api-reference/customer-subscribers/subscribers-api/BigCommerce_Subscribers_API.oas2.json" target="_blank" download="BigCommerce_Subscribers_API.oas2.json">BigCommerce_Subscribers_API.oas2.json</a> |
|Wishlists |<a class="cursor-pointer" href="/api-reference/customer-subscribers/wishlist-api/BigCommerce_Wishlist_API.oas2.json" target="_blank" download="BigCommerce_Wishlist_API.oas2.json">BigCommerce_Wishlist_API.oas2.json</a> |
|Store Content |<a class="cursor-pointer" href="/api-reference/marketing/store-content-api/BigCommerce_Store_Content_API.oas2.json" target="_blank" download="BigCommerce_Store_Content_API.oas2.json">BigCommerce_Store_Content_API.oas2.json</a> |
|Current Customers |<a class="cursor-pointer" href="/api-reference/storefront/current-customers/BigCommerce_Current_Customer.oas2.json" target="_blank" download="BigCommerce_Current_Customer.oas2.json">BigCommerce_Current_Customer.oas2.json</a> |
|Storefront Subscriptions |<a class="cursor-pointer" href="/api-reference/storefront/storefront-subscriptions/BigCommerce_Storefront_Token_API.oas2.json" target="_blank" download="BigCommerce_Storefront_Checkouts_2.oas2.json">BigCommerce_Storefront_Checkouts_2.oas2.json</a> |
|Order Transactions |<a class="cursor-pointer" href="/api-reference/orders/orders-transactions-api/BigCommerce_Order_Transactions_API.oas2.json" target="_blank" download="BigCommerce_Order_Transactions_API.oas2.json">BigCommerce_Order_Transactions_API.oas2.json</a> |



## Deprecations and sunsets

This section contains a continuously updated list of deprecated and sunset BigCommerce API endpoints and suggested alternatives.

### Deprecations

Deprecated endpoints are no longer supported by BigCommerce and their use is discouraged. New or substitute endpoints should be used instead.

### Sunsets

Sunset endpoints will be phased out and removed from the API. Once sunset, the endpoints will no longer be available.

### V2 API

**Deprecated V2 API Endpoints and V3 API Alternatives**

|Endpoint|Alternative |
|-|-|
|`/v2/brands`| [`/v3/catalog/brands`](/api-reference/catalog/catalog-api/brands/getbrands)|
|`/v2/categories`| [`/v3/catalog/categories`](/api-reference/catalog/catalog-api/category/getcategories)|
|`/v2/customers`| [`/v3/customers`](/api-reference/customer-subscribers/v3-customers-api)|
|`/v2/options`| In V3, `options` and `modifiers` are attached directly to the product. Use `options` and `modifiers` together to access the contents of the former V2 `options` response.|
|`/v2/option_sets`| `option_sets` endpoint is intentionally not available in the V3 API. See [V2 vs V3 Catalog APIs](/legacy/v2-products/v2-v3) for more information.|
|`/v2/products `| [`/v3/catalog/products`](/api-reference/catalog/catalog-api/products/getproducts)|
|`/v2/redirects/`|[`/v3/storefront/redirects`](/api-reference/storefront/redirects)|

**V2 Sunsets**

|Endpoint|Date of Deactivation| Alternative |
|-|-|-|
|`DELETE /v2/customers`| May 10, 2020| [`DELETE /v3/customers`](/api-reference/customer-subscribers/v3-customers-api/customers/customersdelete)|
|`DELETE /v2/option_sets`| May 10, 2020| No equivalent available. However, `option_sets` can still be deleted individually by their ID.|
|`DELETE /v2/products`| May 10, 2020| [`DELETE /v3/catalog/products`](/api-reference/catalog/catalog-api/products/deleteproducts)|

**V2 DELETE Sunsets**
> These changes **ONLY** affect the “collection delete” capability which deletes the collection of objects from the system. The “single object” version of these endpoints, such as `DELETE /v2/products/123`, will continue to function normally.

**V3 Sunsets**
|Endpoint|Date of Deactivation| Alternative |
|-|-|-|
|Channels API `is_activated` property| May, 10, 2020|[Channels API](/api-reference/store-management/channels/channels/listchannels) `status` property


**Additional Information:** [V2 versus V3 API](/legacy/v2-products/v2-v3#Whats-not-in-V3)
