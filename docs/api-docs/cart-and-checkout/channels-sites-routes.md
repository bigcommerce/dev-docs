# Channels, Sites and Routes APIs



<a id="channels-sites-routes-how"></a>

## How They Work

BigCommerce's [Channels, Sites and Routes APIs](#) let developers build integrations between BigCommerce and external sales channels. These external channels include a variety of types, including Point of Sale (POS), marketplaces, marketing, CMS platforms, and social platforms.

With Channels, Sites and Routes APIs, developers can quickly create an app that provides merchants with the ability to manage the full experience of selling a product on both BigCommerce and an external platform, from listing products to receiving orders to shipping. They also provide the ability to build apps that help merchants optimize their selling across other services, such as re-pricers and other related services.

Through these integrations, merchants can easily expand where they sell their product catalog online, helping broaden shopper reach with greater merchandising opportunities.

<a id="channels-listings"></a>

## Channels and Listings

The `/channels/` endpoint allows the creation of an external platform on which you can list products beyond the BigCommerce Storefront. Each Channel represents an external platform, site or CMS. Each channel defines which external platform will appear in the store UI.

The `/channels/{channelId}/listings` endpoint represents an individual product per channel, allowing you to override its fields with different values, whether necessary for merchandising, external channel requirements, enabling a different language, or more.

<a id="sites-routes"></a>

## Sites and Routes

The endpoint for `/channels/{channel_id}/site` lets you define the external URI for each sales Channel.

The `/sites/{site_id}/routes` endpoints define redirect URLs for the default URLs that would redirect back to parts of your BigCommerce store. If you don’t add a route for a certain type of entity / entities, we will default to the BigCommerce storefront URL instead.

<a id="channel-manager-vs-app-marketplace"></a>

## Channel Manager vs. App Marketplace

The BigCommerce Channel Manager and App Marketplace are the two places where channel apps can be discovered and installed by merchants. While there are similar requirements for building an app that will be marketed in either of these two locations, there are unique benefits, requirements, and considerations for apps that are made available in the Channel Manager. 

<a id="channels-sites-routes-app"></a>

## What Do I Need to Build a Channel App?

The BigCommerce APIs, webhooks, UI components, and patterns that you need to make your channel app will vary depending on the type of channel, functionality, and where the app lives (Channel Manager in the Control Panel vs. App Marketplace). 

**APIs and Webhooks**

The APIs that you integrate with and how you use them (read only vs. modify) will determine which BigCommerce scopes your app requests when it is installed by a merchant and which endpoints you’ll need to query. 

BigCommerce provides webhooks for 3rd-party developers, enabling them to respond in near real-time to events that occur within the BigCommerce system. Depending on the frequency of updates your channel app needs to manage, you can choose to either poll the API endpoints or integrate with webhooks — this is recommended if changes happen frequently or have downstream impacts, such as inventory changes that could impact a merchant’s SLA with a marketplace. 

**Required APIs**

These APIs are required to build a functioning BigCommerce channel app:
* Catalog: Products ([API docs](/api-docs/store-management/catalog/catalog-overview), [API reference](/api-reference/catalog/catalog-api), [webhooks](/api-docs/store-management/webhooks/webhook-events#products))
* [Catalog: Channel & Listings](# add here)
* Orders: Orders API ([API docs](/api-docs/orders/orders-api-overview), [API reference](/api-reference/orders/orders-api), [webhooks](/api-docs/store-management/webhooks/webhook-events#orders))

**Recommended APIs**

These APIs are not always required, but highly recommended for app developers based on certain use cases:
* Catalog: Price Lists ([API docs](/api-docs/catalog/price-list-overview), [API reference](/api-reference/catalog/pricelists-api))
* Store Management: Shipping ([API docs](/api-docs/store-management/shipping/shipping-overview), [API reference](/api-reference/store-management/shipping-api)) 
* Store Management: Store Information ([API reference](/api-docs/store-management/webhooks/webhook-events#customer), [webhooks](/api-docs/store-management/webhooks/webhook-events#store))
* Customers & Subscribers: Customers ([API docs](/api-docs/customers/customers-subscribers-overview), [v2 API reference](/api-reference/customer-subscribers/customers-api), [v3 API Reference](/api-reference/customer-subscribers/v3-customers-api), [webhooks](/api-docs/store-management/webhooks/webhook-events#customer))
* Cart & Checkout: Server to Server Cart ([API Docs](/api-docs/cart-and-checkout/cart-and-checkout-overview), [API Reference](/api-reference/cart-checkout/server-server-cart-api))
* Cart & Checkout: Server to Server Checkout ([API Docs](/api-docs/cart-and-checkout/cart-and-checkout-overview), [API Reference](/api-reference/cart-checkout/server-server-checkout-api))
* Cart & Checkout: Checkout SDK ([API Docs](/api-docs/cart-and-checkout/checkout-sdk), [GitHub](https://github.com/bigcommerce/checkout-sdk-js))

### Features/ Requirements

|  | Channel Manager | App Marketplace |
|-|-|-|
| Preferred app placement & discovery in the control panel | Yes | No |
| Required to use BigCommerce’s Big Design  UI components | Yes | No|
| Must be express-installable app | Yes | No |
| Must build and submit app according to BigCommerce requirements | Yes | Yes |

### Preferred App Placement in the Control Panel

Currently, certain channel apps, including native BigCommerce apps and specific partner apps, can be found in a merchant’s BigCommerce control panel in the “Channel Manager” section. Partners can work with the BigCommerce team to get strategic placement in this section, enabling merchants to see their specific channel first. Additionally, this discovery takes place in the control panel, which is deeply integrated into all merchants’ day to day workflow; whereas those found in the App Marketplace must be found by searching within the App Marketplace, which is not natively found in the control panel.

### BigDesign

In order to make an app feel and look native to BigCommerce, our Big Design UI components must be used, as they conform to our design and style guidelines. Any app that is in the channel manager must use these in order to maintain consistency with the BigCommerce control panel.

### Must be an Express-Installable App

An express installable app means that all scopes and permissions will be automatically granted to the app when the merchant chooses to install it. This enables a much more seamless installation process, as the merchant has to click fewer times to install the app.

### Must Meet App Requirements

Any app, whether it is in the App Marketplace or channel manager, must meet BigCommerce’s [app requirements](/api-docs/partner/app-store-approval-requirements).
