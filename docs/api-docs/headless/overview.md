# Introduction to Headless Commerce

<div class="otp" id="no-index">

### On this page
- [Ways to implement headless commerce](#ways-to-implement-headless-commerce)
- [Sample integration](#sample-integration)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

This is the first article in a comprehensive developer's guide to using BigCommerce as a commerce back-end for headless storefronts. If you are not familiar with headless commerce as a concept, start by reviewing our whitepaper, [A New Era of Ecommerce: Headless Commerce](https://www.bigcommerce.com/new-era-headless-caas/), or the Help Center's [Headless Commerce Guide](https://support.bigcommerce.com/s/article/The-Headless-Approach).

## Ways to implement headless commerce

If you are looking to build a headless storefront powered by a BigCommerce backend without starting from scratch, BigCommerce offers multiple starter apps and pre-built solutions to choose from. For headless storefront solutions and tools, see [Headless Integrations](https://developer.bigcommerce.com/tools-resources#headless-integrations).

If you need to build a custom solution, BigCommerce has APIs and [SDKs](https://developer.bigcommerce.com/tools-resources#sdks) available to support your headless architecture.

### Custom solutions

* [Create storefront channels with the Channels API](https://developer.bigcommerce.com/api-docs/channels/quick-start).
* [Manage sites and routes for headless storefronts with the sites and routes API](https://developer.bigcommerce.com/api-reference/store-management/sites).
* [Manage 301 redirects for one or more storefronts with Redirects V3 API](https://developer.bigcommerce.com/api-reference/store-management/redirects)
* [Create storefront specific product listings with the Channels API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api).
* [Query storefront data with GraphQL](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview).
* [Use customer impersonation tokens to query data specific to the shopper](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#customer-impersonation-tokens).
* [Create carts with the Server-to-Server Carts API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api).
* [Fetch and display abandoned cart information using the Abandoned Carts API](https://developer.bigcommerce.com/api-reference/cart-checkout/s2s-abandoned-carts).
* [Create and manage shopper wishlists with the Wislists API](https://developer.bigcommerce.com/api-reference/store-management/wishlists)
* [Manage product data with the Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api).
* [Embed BigCommerce's checkout in an iFrame with Embedded Checkout](https://developer.bigcommerce.com/api-docs/storefronts/embedded-checkout/embedded-checkout-overview).
* [Redirect to BigCommerce's hosted checkout using the Server-to-Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)
* [Create custom BigCommerce hosted checkout pages from scratch using Checkout SDK](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/checkout-sdk-quickstart).
* [Create a custom BigCommerce hosted checkout from a fork of BigCommerce's Checkout-JS](https://github.com/bigcommerce/checkout-js).
* [Build a custom checkout experience from scratch using the Server-to-Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api).
* [Restyle the BigCommerce hosted checkout](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/optimized-one-page-checkout).
* [Process payments using the Payments API](https://developer.bigcommerce.com/api-reference/payments/payments-process-payments).
* [Manage orders with Orders V2 and V3 APIs](https://developer.bigcommerce.com/api-docs/store-management/orders).
* [Use webhooks to get notified when specific events occur in BigCommerce](https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview).

## Sample integration

In the diagram below, the storefront is where the shopper interacts with products through a UI. With headless commerce, the storefront can be a CMS or an app. The application makes API calls to BigCommerce to perform specific actions and return data either to display to the shopper or to pass it along to another system. BigCommerce is creating the order and processing payments, so you don't need to worry about building the infrastructure.

![Sample Headless Integration](https://storage.googleapis.com/bigcommerce-production-dev-center/images/developers-guide-to-headless-01.png "Sample Headless Integration")

|Entity|Description|
|-|-|
|**Storefront**|The front end presentation layer where a shopper interacts with products. In a headless architecture, the storefront might be a CMS, native mobile app, kiosk, static site, or any other front end solution you can imagine. The BigCommerce WordPress plugin is built using an existing CMS and injecting a stores catalog. Any CMS that accepts custom integrations can be used. Another option is to build a storefront from scratch using a framework such as [Gatsby](https://www.bigcommerce.com/blog/flexible-headless-commerce-solutions/#overview-of-bigcommerce-for-react-gatsby).|
|**Application**|Solution built by a developer to control the requests and responses from the BigCommerce APIs. In addition to handling essential ecommerce tasks like requesting product information or sending the request to process a payment, the application layer can also handle the logic for custom functionality, like presenting discount codes based on a shopper's history or pre-filling details on the checkout page. |
|**BigCommerce**|BigCommerce will respond to the application with the requested data to power the backend ecommerce functionality. It can handle processing payments, storing customer data, retrieving the catalog and order information.|

## Next steps

- [Learn how to create a channel and a channel site](https://developer.bigcommerce.com/api-docs/storefronts/guide/channels)

## Resources

- [BigCommerce Doubles Down on Headless Commerce with BloomReach, Sitecore, Adobe Experience Manager, and More](https://www.bigcommerce.com/blog/flexible-headless-commerce-solutions/)
- [Launching your store](https://support.bigcommerce.com/s/article/Launching-Your-Store)
- [Matter Makes Waves with a Headless Build using BigCommerce for WordPress](https://medium.com/bigcommerce-developer-blog/matter-makes-waves-with-a-headless-build-using-bigcommerce-for-wordpress-a572bad4bdf8)
- [Multisite Ecommerce with WordPress and BigCommerce](https://medium.com/bigcommerce-developer-blog/multi-site-ecommerce-with-wordpress-and-bigcommerce-40dee194f8a)
- [New Era in Headless CaaS](https://www.bigcommerce.com/new-era-headless-caas/)