# Questions
* Will BigDesign and the sample app be available for this?

https://design.bigcommerce.com/components
https://developer.bigcommerce.com/big-design/


# Channels SDK

---

The Channel SDK is a set of [APIs](#channel-listings-api), [UI components, patterns](#big-design-ui-components), and [app frameworks](#app-framework) that provides developers with the ability to build integrations between BigCommerce and external sales channels. These external channels include a variety of types, including Point of Sale (POS), marketplaces, marketing, and social, and platforms, such as Facebook, Amazon, eBay, and CMS platforms, like WordPress.

Through these integrations, merchants can easily expand where they sell their product catalog online, driving increased revenue through expanded brand recognition, broader shopper reach, and greater merchandising opportunities.

With the Channel SDK, developers can quickly create an app that provides merchants with the ability to manage the full experience of selling a product on both BigCommerce and an external platform, from listing products to receiving orders to shipping. It also provides the ability to build apps that help merchants optimize their selling across channels, such as re-pricers, and other related services.

---

## Channels SDK Components

<a id="big-design-ui-components"></a>

### Big Design UI components

These reusable components are built to be compatible with BigCommerce design guidelines & color palette, fully flexible, responsive, and accessible. They enable you to create an app that looks and feels native to BigCommerce, which ultimately is less disruptive to a merchant’s workflow, as they are familiar with the experience and navigating much of the app’s functionality. The UI components can be used for any app, not just Channels.

<a id="channel-listings-api"></a>

### Channel & Listing API

These API endpoints allow product data to be managed for specific channels and product listings, rather than just at the BigCommerce product catalog level. This includes overriding fields with different values, whether necessary for merchandising, external channel requirements, enabling a different language, or more.


<a id="app-framework"></a>

## App Framework

Some text here

---

## Building a Channel App

How you build your channel app will depend on what kind of platform / channel you are building for and the functionality that is required or desired. The key, high level steps you need to take are:

1. <a href="#type-of-app">Determine what kind of app you’ll be building</a>
2. <a href="#needed-components">Decide what APIs, patterns, and UI components you’ll need</a>
3. <a href="#building-the-app">Build the app</a>

---

<a id="type-of-app"></a>

## Type of App

Each type of channel app will differ in how it’s built due to the different functionality and requirements needed as a result of:

* What type of channel it is?
* Will the app be in BigCommerce’s Channel Manager or the app marketplace?

The Channel SDK and BigCommerce support a variety of different types of channels, including (but not limited to):

(CM): indicates integration lives in Channel Manager

**External Storefronts**

A platform that enables merchants to power an online storefront outside of BigCommerce for selling their products. Some examples of external storefronts include: 
* [Wordpress](https://wordpress.org/plugins/bigcommerce/)
* [Bloomreach](https://www.bigcommerce.com/solutions/bloomreach/) 
* [Acquia](https://www.bigcommerce.com/acquia/)
* [Drupal](https://www.bigcommerce.com/solutions/drupal/)


**Point of Sale (POS)**

A physical system used by merchants to process transactions, maintain their product catalog, track customers, and more. Examples of ecommerce POS providers include: 
* [Clover](https://www.bigcommerce.com/apps/clover/) - in open beta
* [Hike](https://www.bigcommerce.com/apps/hike-pos)
* [Lightspeed](https://www.bigcommerce.com/apps/lightspeed-retail-pos-connector-by-kosmos-esync/)

**Marketplaces**

A platform on which 3rd parties (merchants) list their catalog and sell their products, with transactions processed by the marketplace platform. Some examples of marketplaces include: 
* Amazon (CM)
* [eBay](https://www.bigcommerce.com/apps/inkfrog-open) (CM)
* Facebook Marketplace (CM)
* Walmart
* Wish

**Marketing**

A platform on which merchants communicate their brand and products with their shopper base, seeking to drive discovery and conversion. Some examples of marketing platforms include: 

* [Google Shopping](https://www.bigcommerce.com/apps/google-shopping-by-sales-orders/) 
* [Facebook Ads](https://www.bigcommerce.com/apps/facebook-ads-by-sales-orders/)

---

<a id="needed-components"></a>

## What Do I Need to Build My App?

The BigCommerce APIs, webhooks, UI components, and patterns that you need to make your channel app will vary depending on the type of channel, functionality, and where the app lives (Channel Manager vs. App Marketplace). 

### APIs and Webhooks
The APIs that you integrate with and how you use them (read only vs. modify) will determine what BigCommerce scopes your app requests when it is installed by a merchant and what endpoints you’ll need to integrate with. 

BigCommerce provides webhooks for 3rd party developers, enabling them to respond in near real-time to events that occur within the BigCommerce system. Depending on the frequency of updates that your channel app needs to manage, you can choose to either poll the API endpoints or integrate with webhooks (recommended if changes happen frequently or have downstream impacts, such as inventory changes that could impact a merchant’s SLA with a marketplace). 

**Required**

These APIs are required to build a functioning BigCommerce channel app:
* Catalog: Products ([API docs](https://developer.bigcommerce.com/api-docs/catalog/products-overview), [API reference](https://developer.bigcommerce.com/api-reference/catalog/catalog-api), [webhooks](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_products))
* Catalog: Channel & Listings 
* Orders: Orders API ([API docs](https://developer.bigcommerce.com/api-docs/orders/orders-api-overview), [API reference](https://developer.bigcommerce.com/api-reference/orders/orders-api), [webhooks](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders))

**Recommended**

These APIs are not always required, but highly recommended for app developers based on certain use cases:
* Catalog: Price Lists ([API docs](https://developer.bigcommerce.com/api-docs/catalog/price-list-overview), [API reference](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api))
* Store Management: Shipping ([API docs](https://developer.bigcommerce.com/api-docs/store-management/shipping/shipping-overview), [API reference](https://developer.bigcommerce.com/api-reference/store-management/shipping-api)) 
* Store Management: Store Information ([API reference](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_customer), [webhooks](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_store))
* Customers & Subscribers: Customers ([API docs](https://developer.bigcommerce.com/api-docs/customers/customers-subscribers-overview), [v2 API reference](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api), [v3 API Reference](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api), [webhooks](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_customer))
    

**Extended Functionality**

These APIs are recommended to build extended functionality for a BigCommerce channel app based on use cases:
    
* Cart & Checkout: Server to Server Cart ([API Docs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/cart-and-checkout-overview), [API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api))
* Cart & Checkout: Server to Server Checkout ([API Docs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/cart-and-checkout-overview), [API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api))
* Cart & Checkout: Checkout SDK ([API Docs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk), [Github](https://github.com/bigcommerce/checkout-sdk-js))
* Customers & Subscribers: Customer Login ([API Docs](https://developer.bigcommerce.com/api-docs/customers/customer-login-api), [PHP App]( https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421), [Ruby](https://github.com/bigcommerce/bigcommerce-api-ruby/blob/master/examples/customers/customer_login.rb), [Python App](https://github.com/bigcommerce/bigcommerce-api-python/blob/master/bigcommerce/customer_login_token.py))


### UI Componenets

BigCommerce provides publicly available UI components and design guidelines via [Big Design](https://developer.bigcommerce.com/big-design/). This will enable developers to create apps that can be embedded directly within the BigCommerce control panel, as the UX / UI looks and feels native to BigCommerce. Additionally, these components can dramatically accelerate the development process by providing dynamic, responsive, and accessible UI components that are fully functional.

The UI components you will need to build your channel app will vary depending on the type and functionality offered by the app (which can be found in the section: Instructions for Specific Types of Channels). UI components that should be used for any channel app:

* [Typography](https://developer.bigcommerce.com/big-design/typography)
* [Tabs](https://developer.bigcommerce.com/big-design/tabs)
* [Panel](https://developer.bigcommerce.com/big-design/panel)
* [Link](https://developer.bigcommerce.com/big-design/link)
* [Icons](https://developer.bigcommerce.com/big-design/icons)
* [Button](https://developer.bigcommerce.com/big-design/button)
* [Dropdown](https://developer.bigcommerce.com/big-design/dropdown)
* [Box](https://developer.bigcommerce.com/big-design/box)

**Highly recommended components also include:**

* [Form](https://developer.bigcommerce.com/big-design/form)
* [Input](https://developer.bigcommerce.com/big-design/form/input)
* [Tooltip](https://developer.bigcommerce.com/big-design/tooltip)


### Patterns

Patterns refers to high level functionality and user flows that an app provides, which are built on top of the BigCommerce APIs and UI components. This will vary as well depending on the type of channel app; however, there are some generic patterns that any channel app should include.

**Onboarding**

User flows that enable a merchant to connect their BC store to an external channel, inclusive of creating an account on the external channel if needed.

* Channel configuration
* Settings

**Catalog Management** 

User flows that enable a merchant to manage their product catalog data between their BC store and external channels, inclusive of product, inventory, and pricing information.

* Import 
* Export
* Per product listing
* Inventory

**Order Management**

User flows that enable a merchant to manage orders between their BC store and external channels.

* Orders
* Shipping

**Notifications**

User flows that enable a merchant to easily find and manage important notifications related to their channel, inclusive of errors, warnings, and general helpful notifications, such as pending channel updates or changes. 

---


<a id="building-the-app"></a>

## Building the App

This section includes detailed steps on how to build a channel app within the BigCommerce ecosystem.

### Prerequisites
The following [OAuth Scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_oauth-scopes) are required:
* Orders: Modify
* Channel Settings: Modify
* Channel Listings: Modify
* Products: Read Only

### Create a Channel Listing

Once a merchant installs the app from within BigCommerce, it’ll redirect to your [callback URL](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_recieving-get-request). At this time, you will need to create a channel so that it is registered to the merchant’s store. This will enable you to later pull catalog and listing data for that specific channel via the API and allow the merchant to list products to this channel from within the BigCommerce control panel.


`/POST https://api.bigcommerce.com/stores/{store_hash}/v3/channels`

```json
{
    "type": "marketplace",
    "platform": "facebook",
    "name": "Facebook Marketplace",
    "is_enabled": true
}
```

**Response**
```json
        {
            "id": 18113,
            "name": "Facebook Marketplace",
            "platform": "facebook",
            "type": "marketplace",
            "date_created": "2019-06-27T15:12:07Z",
            "date_modified": "2019-06-27T15:12:07Z",
            "external_id": "",
            "is_enabled": true
        }
```

You’ll get an id for the channel back within the response, which will be used as the `channel_id` in future requests. 

After you create a channel, it shows up in the product list within the store control panel so the merchant can choose which products should be available on it and the orders section is updated to include a filter to show which orders came in from the channel.

The channel name is what is shown as the ‘human-readable name’ in the UI:





---

## Channel Manager vs. App Marketplace

The BigCommerce Channel Manager and App Marketplace are the two places where channel apps can be discovered and installed by merchants. While there are similar requirements for building an app that will be marketed in either of these two locations, there are unique benefits, requirements, and considerations for apps that are made available in the Channel Manager. 

| Features/ Requirements | Channel Manager | App Marketplace |
| ---| ---| ---|
| Preferred app placement & discovery in the control panel | Yes | No |
| Required to use BigCommerce’s Big Design  UI components | Yes | No|
| Must be express-installable app | Yes | No |
| Must build and submit app according to BigCommerce requirements | Yes | Yes |

### Preferred App Placement in the Control Panel

Currently, certain channel apps, including native BigCommerce apps and specific partner apps, can be found in a merchant’s BigCommerce control panel in the “Channel Manager” section. Partners can work with the BigCommerce team to get strategic placement in this section, enabling merchants to see their specific channel first. Additionally, this discovery takes place in the control panel, which is deeply integrated into all merchants’ day to day workflow; whereas those found in the app marketplace must be found by searching within the app marketplace, which is not natively found in the control panel.

### Must Use Big Design Components

In order to make an app feel and look native to BigCommerce, our Big Design UI components must be used, as they conform to our design and style guidelines. Any app that is in the channel manager must use these in order to maintain consistency with the BigCommerce control panel.

### Must be an Express-Installable App

An express installable app means that all scopes and permissions will be automatically granted to the app when the merchant chooses to install it. This enables a much more seamless installation process, as the merchant has to click fewer times to install the app.

### Must Meet App Requirements

Any app, whether it is in the app marketplace or channel manager,must meet BigCommerce’s [app requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements).



