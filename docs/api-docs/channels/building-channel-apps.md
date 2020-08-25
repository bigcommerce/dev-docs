# Building Channel Apps

<div class="otp" id="no-index">

### On this Page
- [Getting Started](#getting-started)
- [Determining Channel Type](#determining-channel-type)
- [Gathering Materials](#gathering-materials)
- [Creating a Channel](#creating-a-channel)
- [Getting Catalog Data](#getting-catalog-data)
- [Creating Listings](#creating-listings)
- [Importing and Exporting Sales](#importing-and-exporting-sales)
- [Managing Orders and Inventory](#managing-orders-and-inventory)
- [Syncing Gift Card Balances](#syncing-gift-card-balances)
- [B2B and Wholesale Integration](#b2b-and-wholesale-integration)
- [Handling Notifications](#handling-notifications)
- [Developing the UI](#developing-the-ui)
- [App Installation](#app-installation)
- [Releasing Your App](#releasing-your-app)
- [Resources](#resources)

</div>

Channel Apps allow merchants to connect to, manage, and sell on external sales channels, like point-of-sale devices, online marketplaces, marketing platforms, and social networking sites. Using BigCommerce’s [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference), developers can create channel apps that integrate with virtually any platform. Once published and approved, these apps are listed on [BigCommerce's App Marketplace](https://www.bigcommerce.com/apps/) for merchants to install. Additionally, approved apps developed by [select partners](https://www.bigcommerce.com/partners/) are listed within the Channel Manager in every BigCommerce store's control panel.

This article is a comprehensive guide on the foundations of building apps on BigCommerce for any type of channel. For a high-level overview of Channels on BigCommerce, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/channels-overview).

### Prerequisites
* A BigCommerce Store, trial, or sandbox
* Familiarity with [BigCommerce API Environment](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api)
* Familiarity [API Authentication on BigCommerce](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* Familiarity with [Building an App on BigCommerce](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* Familiarity creating Apps in [DevTools](https://devtools.bigcommerce.com/)
* High-level understanding of [Channels on BigCommerce](https://developer.bigcommerce.com/api-docs/channels/channels-overview)

## Getting Started

This article assumes you're familiar with how to:
* interact with BigCommerce's API environment
* create apps using DevTools
* building apps on BigCommerce
* generate app API credentials

If this is your first time developing with BigCommerce APIs, it might be helpful to checkout our API [Quick Start](https://developer.bigcommerce.com/api-docs/getting-started/making-requests) before beginning this guide.

### OAuth Scopes

Channel apps require the following OAuth Scopes:

|UI Name|Parameter|Enables|
|-|-|-|
|Orders Modify|`store_v2_orders`|Creating orders in BigCommerce placed on external channel|
|Channels Settings Modify|`store_channel_settings`|Creating channels that reference external platforms|
|Channels Listings Modify|`store_channel_listings`|Creating and reading product listing information|
|Products read-only|`store_v2_products_read_only`|Reading product information, including price lists|


If you include recommended or extended functionality, you may need the following scopes:


|UI Name|Parameter|Enables|
|-|-|-|
|Customers Modify|`store_v2_customers`|Creating and reading customers, customer groups, etc|
|Carts Modify|`store_cart`|creating carts and requesting secure redirect links to checkout|

## Determining Channel Type
How you build your channel app will depend on what kind of platform or channel you are building for and the functionality that is required or desired.

* **Storefront** - A platform that enables merchants to power an online storefront outside of BigCommerce for selling their products. This is also used for internal BigCommerce storefronts (Ex: WordPress).
* **Point-of-sale (POS)** - A physical system used by merchants to process transactions, maintain their product catalog, track customers, and more (Ex: Square).
* **Marketplace** - A platform on which merchants list their catalog and sell their products, with transactions processed by the marketplace platform (Ex: Amazon).
* **Marketing** - A platform on which merchants communicate their brand and products with their shopper base, seeking to drive discovery and conversion. These channels do not support checkout directly (Ex: Instagram).

For additional examples and information on types of channels, see Channel Types in [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/channels-overview#types-of-channels).

## Gathering Materials
The BigCommerce APIs, webhooks, UI components, and patterns that you need to make your channel app will vary depending on the type of channel, functionality, and where the app lives (Channel Manager vs. App Marketplace).

### APIs & Webhooks
The APIs that you integrate with and how you use them (read only vs. modify) will determine what BigCommerce scopes your app requests when it is installed by a merchant and what endpoints you’ll need to integrate with. The associated scopes are listed in the following section.

BigCommerce provides webhooks for third-party developers, enabling them to respond, in near real-time, to events that occur within the BigCommerce system. Depending on the frequency of updates that your channel app needs to manage, you can choose to either poll the API endpoints or integrate with webhooks. We recommended the latter choice if changes happen frequently or have downstream impacts, such as inventory changes that could impact a merchant’s SLA with a marketplace.

**Required for Channel Apps:**
| Endpoint | Description |
|-|-|
|[Channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)|Create and manage product listings for multiple storefronts and sales channels|
|[Listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)|Create and manage product listings for multiple storefronts and sales channels|
|[Orders](https://developer.bigcommerce.com/api-reference/store-management/orders)|Get and manage order data|
|[Products](https://developer.bigcommerce.com/api-reference/catalog/catalog-api)|Manage products, options, variants, and modifiers|

**Recommended for Channel Apps:**
| Endpoint | Description |
|-|-|
|[Price Lists](https://developer.bigcommerce.com/api-reference/store-management/price-lists)|Control variant-level pricing by channel, customer group, etc|
|[Store Information](https://developer.bigcommerce.com/api-reference/store-management/store-information-api)|Get store metadata|
|[Shipping](https://developer.bigcommerce.com/api-reference/store-management/shipping-api)|Manage how products are shipped|
|[Webhooks](https://developer.bigcommerce.com/api-reference/webhooks)|Get notified when specific events occur in a BigCommerce store|
|[Routes](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)|Create and manage page routes for headless storefronts|
|[Sites](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)|Create and manage sites associated with a channel|

**Extended Functionality:**
| Endpoint | Description |
|-|-|
|[Carts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)|Create and manage carts|
|[Checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)|Create and manage checkouts|
|[Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)|Create and Manage Customers, Customer Addresses, and Customer Attributes.|
|[Currencies](https://developer.bigcommerce.com/api-reference/store-management/currency-api)|Manage accepted currencies and their display|
|[Coupons](https://developer.bigcommerce.com/api-reference/store-management/marketing)|Manage coupons|
|[Gift Certificates](https://developer.bigcommerce.com/api-reference/store-management/marketing)|Manage gift certificates|
|[Customer Login](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)|Use SSO to login customers|
|[Current Customer](https://developer.bigcommerce.com/api-docs/customers/current-customer-api)|Securely identify current customer|
|[Order Payment Actions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)|Authorize, capture, and void order payments|
|[Order Transactions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)|Get order payment transaction data|

### UI Components
BigCommerce provides publicly available UI components and design guidelines to third parties via [Big Design](https://developer.bigcommerce.com/big-design/). This enables developers to create apps that can be embedded directly within the BigCommerce control panel, as the UX and UI look and feel native to BigCommerce.

These components can dramatically accelerate the development process by providing dynamic, responsive, and accessible UI components that are fully functional. The UI components you need to build your channel app will vary depending on the type and functionality offered by the app.

**UI components that should be used for any channel app:**
* Typography
* Tabs
* Panel
* Link
* Icons
* Button
* Spinner
* Lozenge
* Dropdown
* Table
* Box

**Highly recommended components:**
* Alerts
* Form
* Input
* Tooltip

### Patterns
Patterns are high-level functionality and user flows that an app provides, which are built on top of the BigCommerce APIs and UI components. This will vary depending on the type of channel app. However, there are some generic patterns that any channel app should include.

**Onboarding**

User flows that enable a merchant to connect their BC store to an external channel, inclusive of creating an account on the external channel if needed.
  * Channel configuration
  * Settings

**Catalog Management**

User flows that enable a merchant to manage their product catalog data between their BC store and external channels, inclusive of product, inventory, and pricing information.
  * Import
  * Export
  * Product listing
  * Inventory

**Order Management**

User flows that enable a merchant to manage orders between their BC store and external channels.
  * Orders
  * Shipping

**Notifications**

User flows that enable a merchant to easily find and manage important notifications related to their channel, inclusive of errors, warnings, and general helpful notifications, such as pending channel updates or changes.

## Creating a Channel
Once a merchant installs the app in BigCommerce, they'll be redirected to the app's callback URL. At this time, create a channel so that it's registered to the merchant's store -- this makes it possible for the app to pull catalog and listing data for the channel via the API and allows the merchant to list products to this channel from their BigCommerce control panel.

To add channel to a store, send a POST request to `/stores/{{STORE_HASH}}/v3/channels`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

[{
    "type": "type of channel",
    "platform": "sales channel platform",
    "name": "name of the sales channel", // Name displayed to merchant
    "external_id": "",
    "status": "connected”,
    "app": {
      "id": 123,                         // ID of the app
      "sections": [{
        "title": "Overview",             // Label displayed to merchant in nav bar
        "query_path": "overview"         // query param passed app iframe
       }, {
       "title": "Settings",
       "query_path": "settings"
      }]
    }
}]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

Once created, channels show up in the product list within the control panel so the merchant can choose which products should be available on it. The orders list is updated to include a filter to show which orders came in from the channel. The value of the `name` property is displayed to the merchant in the control panel.

For a complete reference, see [Channels API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * You can find the app ID in the URL when editing the app in [DevTools](https://devtools.bigcommerce.com/). For more information, see [Finding an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id).

</div>
</div>
</div>


## Getting Catalog Data
The main feature merchants expect from channel apps is a seamless method to sync product data between BigCommerce and an external channel, like a point-of-sale system.

At a high level, this portion of the integration should:
1. **Capture and compare** by pulling products from both BigCommerce and the external channel, then looping through and compare to see if any matches are found. The comparison is done against a unique identifier that can be found in both systems (its typically best to index using product **SKU** or **UPC**, if possible).
2. **Update or create** by updating an existing product if a match is found in step 1. If no match is found, create a product.

There are several workflows to get products to or from BigCommerce and the external channel. Depending on the channel and the desired functionality, you may make use of one or more of these in your app.

In general, you should support at least import and export functionality. Depending on where the merchant's catalog lives, they will need to import or export their catalog. Typically, if a merchant started selling on BigCommerce, they will export their catalog to the external channel. If they start selling on the external channel, they will import their catalog to BigCommerce. The option to choose between import and export should be provided to the merchant, so they can have full control of how they share their products between BigCommerce and the external channel.

### Importing
To import products to BigCommerce, `GET` the products from the external channel then `POST` them to BigCommerce via `/stores/{{STORE_HASH}}/catalog/products`:

POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products

To import a product into BigCommerce, `POST` to `/stores/{{STORE_HASH}}/v3/catalog/products`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/endpoint
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  {
  "name": "Coffee Mug",
  "price": "10.00",
  "categories": [
    23,
    21
  ],
  "weight": 4,
  "type": "physical"
}
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/**createproduct**#requestrunner)

Variants can be added via the same request used to create the product or later after the product is created, by a `POST` request to the [Product Variant endpoint](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/createvariant) (the former is recommended for bulk variant creation).

For an in-depth guide to using V3 Catalog endpoints, see [Catalog Overview](https://developer.bigcommerce.com/api-docs/catalog/products-overview). For a complete API reference (including request schemas and property descriptions), see: [API Reference > Catalog](https://developer.bigcommerce.com/api-reference/catalog/catalog-api).

### Exporting
In order to export catalog data from BigCommerce to an external channel, you will need to `GET` all products and variants from BigCommerce. To do so, send a `GET` request to `/stores/{{STORE_HASH}}/v3/catalog/products?include=variants`:

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products?include=variants
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts#requestrunner)

Filters can be used in this call to retrieve subsets of the merchant’s catalog. Also, keep in mind that you will more than likely need to handle pagination to retrieve all products in a merchant’s catalog.

In order to support these workflows from a UI perspective, you will likely need to include the following components (please see the [sample channel app](https://github.com/bigcommerce/channels-app) for a visual on how this functions):
* Panel
* Table
* Progress Bar
* Typography
* Button
* Spinner

For an in-depth guide to using V3 Catalog endpoints, see [Catalog Overview](https://developer.bigcommerce.com/api-docs/catalog/products-overview). For a complete API reference (including request schemas and property descriptions), see: [API Reference > Catalog](https://developer.bigcommerce.com/api-reference/catalog/catalog-api).

## Creating Listings
Whether importing or exporting the catalog, you will need to create listings for products that are shared between the channel and BigCommerce. Any products that are imported to BigCommerce or exported to the channel must have a corresponding listing -- this is to support the listing being managed separately from the base catalog product.

To create listings, `POST` to `/stores/{{STORE_HASH}}/v3/channels/{{CHANNEL_ID}}/listings`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels/{{CHANNEL_ID}}/listings
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

[
  {
    "product_id": 117,
    "state": "active",
    "name": "baseball hat",
    "description": "Baseball hat with your favorite team's name.",
    "external_id": "listing1",
    "variants": [
      {
        "variant_id": 82,
        "name": "blue baseball bat",
        "product_id": 117,
        "state": "disabled",
        "external_id": "Var1"
      },
      {
        "variant_id": 83,
        "product_id": 117,
        "state": "active",
        "external_id": "Var2"
      }
    ]
  }
]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channel-listings/createchannellistings#requestrunner)

For a complete channels reference (including request schemas and property descriptions), see: [API Reference > Channels and Listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api).

## Importing and Exporting Sales

### Customer and Order Imports
Importing customer and order data allows the merchant to import the sales history from an external channel (such as a point of sale system) into BigCommerce. In BigCommerce, orders map to specific customers. Customer and order exports allow the merchant to export the sales history from BigCommerce into the external channel.

To import or export customer and order data, integrate the following endpoints:

* [`/v3/customers`](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)
* [`/v2/orders`](https://developer.bigcommerce.com/api-reference/orders/orders-api)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * If the external channel does not have a concept of customers, an order can be created with a `customer_id` of `0` (this value is used for "guest" shoppers).

</div>
</div>
</div>

## Managing Orders and Inventory
In order to ensure that BigCommerce merchants are able to continue using their existing catalog and eCommerce workflows, in addition to enabling other downstream eCommerce functionality, we require channel apps sync order and inventory information back to BigCommerce.

In order to do this, integrate the following endpoints:

* [`/v3/catalog/products`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct)
* [`/v2/orders`](https://developer.bigcommerce.com/api-reference/orders/orders-api)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

Ensure the following use cases are supported:
* Creating orders as they are made on the external channel
* Updating orders as changes are made on the external channel
* Reading orders, via API or webhooks, to push any necessary changes / updates made by the merchant in the BigCommerce control panel to the external channel
* Reading inventory levels, via the products API or webhooks, to get up-to-date inventory levels for the channel. This is critical, as orders can come from other channels including their main storefront that impact inventory available to the channels your app supports.

If the external channel does not have a concept of customers, an order can be created with a `customer_id` of `0`, the value  used for guest shoppers.

When orders are written to the BigCommerce API, via an external channel or BigCommerce itself, inventory is automatically updated and will be accessible via the Products API.

</div>
</div>
</div>

## Syncing Gift Card Balances
[Gift certificate](https://developer.bigcommerce.com/api-reference/marketing/marketing-api/gift-certificates/) endpoints can be leveraged to sync BigCommerce gift certificates with gift cards purchased in store. When a gift card is used in person, the associated gift certificate in BigCommerce should be updated by changing the certificate's `balance` value.

The same general process should take place when the gift certificate is used online. The remaining balance should be updated for the associated gift card in the external channel.

## B2B and Wholesale Integration

### Customer Groups

This feature allows a merchant to organize their customer base into groups with specific rules that affect the customer's shopping experience. Common use cases for these rules include:
* Custom product pricing
* Discounts for all products within a specific category
* Hiding specific products or categories from view

To leverage customer groups in your app, integrate the following endpoints:
* [`/v2/customer_groups`](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-groups)

### Price Lists
Price Lists are used to create variant-level price overrides that can be assigned to specific Customer Groups. To make us of price lists, integrate the following endpoints:
* [`{base url}/v3/pricelists`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists)
* [`{base url}/v3/pricelists/{pricelist id}/records`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-records)
* [`{base url}/v3/pricelists/assignments`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-assignments)

## Handling Notifications
This functionality is not supported as of yet, so notifications will likely need to be handled in the app itself. Eventually, we will require certain notifications to be surfaced to BigCommerce, so that they can be displayed in the merchant’s control panel.

## Developing the UI
Channel apps are embedded in the BigCommerce control panel. As such, it is important for them to look and feel native to the rest of the BigCommerce user interface. To assist developers in the rapid creation of frontends that meet required design standards, we have developed a library of publicly available React components. For more information, see the [BigDesign Developer Playground](https://developer.bigcommerce.com/big-design/).

## App Installation
A single-click app is listed in the BigCommerce App Marketplace, and is available for all BigCommerce merchants to install. "Single-Click" refers specifically to the installation process whereby the application connects to the external channel via the [Single-Click App Auth Flow](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_oauth-summary) instead of a manual process where a merchant would need to generate and input authentication credentials into the app's user interface.

## Releasing Your App
Listing apps on the BigCommerce App Marketplace is reserved for Technology Partners. To apply for the program, submit a [partner application](https://partners.bigcommerce.com/English/register_email.aspx).

For a general list of app requirements, see [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements).

## Resources

### Channels
* [Channels Toolkit Reference](https://developer.bigcommerce.com/api-docs/channels-toolkit-reference)
* [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/channels-overview)
* [Channels Sample App](https://github.com/bigcommerce/channels-app)
* [Big Design Component Library](https://developer.bigcommerce.com/big-design/?path=/story/badge--overview)
* [Channel App Best Practices](https://developer.bigcommerce.com/api-docs/getting-started/best-practices)
* [Sell Everywhere with Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager)
* [Becoming a Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)

### Building Apps
* [Types of Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps)
* [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* [Building an App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY5OTcxNTEwMyw0NjE3NjM5NCw3MzA5OT
gxMTZdfQ==
-->
