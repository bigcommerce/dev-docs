<!-- Dev Center URL: https://developer.bigcommerce.com/api-docs/channels/guide/building-channel-apps -->

# Building Channel Apps

<div class="otp" id="no-index">

## On this page

  - [Getting started](#getting-started)
  - [Beginning development](#beginning-development)
  - [Gathering materials](#gathering-materials)
  - [Creating a channel](#creating-a-channel)
  - [Getting catalog data](#getting-catalog-data)
  - [Creating listings](#creating-listings)
  - [Importing and exporting sales](#importing-and-exporting-sales)
  - [Managing orders and inventory](#managing-orders-and-inventory)
  - [Syncing gift card balances](#syncing-gift-card-balances)
  - [B2B and wholesale integration](#b2b-and-wholesale-integration)
  - [Handling notifications](#handling-notifications)
  - [Developing the UI](#developing-the-ui)
  - [Next steps](#next-steps)
  - [Related resources](#related-resources)

</div>

Using BigCommerce's [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference), developers can create channel apps that integrate with point-of-sale devices, [headless storefronts](https://developer.bigcommerce.com/api-docs/storefronts/developers-guide-headless), online marketplaces, marketing platforms, and social networking sites. BigCommerce lists all approved channel apps on the [Apps Marketplace](https://www.bigcommerce.com/apps/) and markets channel apps developed by [select partners](https://www.bigcommerce.com/partners/) in [Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager).

This article is a comprehensive guide on the foundations of integrating [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference) into [single-click apps](https://developer.bigcommerce.com/api-docs/apps/guide/types). For a high-level overview of channels on BigCommerce, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/channels-overview).

## Getting started

Here are a few things you will need to create channel apps.

1. [Store / Dev Sandbox](https://www.bigcommerce.com/essentials/free-trial/) (required to test app installation)
2. [Developer Portal Account](https://devtools.bigcommerce.com/) (required to register apps)
3. [BigCommerce partnership](https://partners.bigcommerce.com/English/) (required to publish apps)
4. [Familiarity with building apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
5. [High-level understanding of channels](https://developer.bigcommerce.com/api-docs/channels/channels-overview)

## Beginning development

### Extend an existing app

If you would like to integrate [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference) into an existing app, see [Extending Existing Apps](https://developer.bigcommerce.com/api-docs/channels/guide/extending-existing-apps) or [Building Storefront Channels](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront) for detailed instructions.

### Developing a new app

If you would like to start development on a new app that integrates Channels Toolkit, and this is your first time developing a BigCommerce app, see [Building Apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro) for an in-depth BigCommerce app development guide.

## Gathering materials

The BigCommerce APIs, webhooks, and UI components needed to build a channel app vary depending on the [type of channel](https://developer.bigcommerce.com/api-docs/channels/guide/overview#types-of-channels), functionality, and where the app is marketed (Channel Manager vs. App Marketplace).

### APIs and webhooks

The APIs that you integrate with and how you use them (read-only vs. modify) will determine what BigCommerce scopes your app requests when installed by a merchant and what endpoints you'll need to integrate with.

BigCommerce provides webhooks for third-party developers, enabling them to respond, in near real-time, to events that occur within the BigCommerce system. Depending on the frequency of updates that your channel app needs to manage, you can choose to either poll the API endpoints or integrate with webhooks. We recommended the latter choice if changes happen frequently or have downstream impacts, such as inventory changes that could impact a merchant's SLA with a marketplace.

[See a list of required and recommended endpoints and their OAuth scopes](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference#endpoints).

### UI components

BigCommerce provides publicly available UI components and design guidelines to third parties via [BigDesign](https://developer.bigcommerce.com/big-design/). BigDesign enables developers to create apps embedded directly within the BigCommerce control panel, as the UX and UI look and feel native to BigCommerce.

These components can dramatically accelerate the development process by providing dynamic, responsive, and accessible UI components that are fully functional. The UI components you need to build your channel app will vary depending on the app's type and functionality.

[See a list of required and recommended UI components](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference#ui-components).

## Creating a channel

After receiving the [`POST` response](https://developer.bigcommerce.com/api-docs/apps/guide/auth#receiving-the-post-response) at the end of the [single-click app OAuth flow](https://developer.bigcommerce.com/api-docs/apps/guide/auth#receiving-the-post-response), create a channel on the merchant's store. This allows merchants to assign product listings to the storefront and configure storefront specific settings. To create a channel, send a `POST` request to [`/stores/{{STORE_HASH}}/v3/channels`](https://developer.bigcommerce.com/api-reference/store-management/channels/channels/createchannel).

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Example POS Channel",
  "type": "pos",
  "platform": "custom",
  "external_id": "",
  "status": "connected",
  "is_listable_from_ui": true,
  "is_visible": true,
  "config_meta": {
    "app": {
      "id": 112233,
      "sections": [
        {
          "title": "Overview",
          "query_path": "overview"
        }
      ]
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

Once created, channels show up in the product list within the control panel so the merchant can choose which products should be available on it. The orders list is updated to include a filter to show which orders came in from the channel. The value of the `name` property is displayed to the merchant in the control panel.

[View reference documentation for the Create a Channel request](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> **Note**
>
> - You can find the app ID in the URL when editing the app in [DevTools](https://devtools.bigcommerce.com/). For more information, see [Finding an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id).

</div>
</div>
</div>

## Getting catalog data

The leading feature merchants expect from channel apps is a seamless method to sync product data between BigCommerce and an external channel, like a point-of-sale system.

At a high level, this portion of the integration should perform the following:

1. **Capture and compare** by pulling products from both BigCommerce and the external channel, then looping through and compare to see if any matches are found. The comparison is made against a unique identifier that can be found in both systems. It is typically best to index using product **SKU** or **UPC**, if possible.
2. **Update or create** by updating an existing product if a match is found in step 1. If no match is found, create a product.

There are several workflows to get products to or from BigCommerce and the external channel. Depending on the channel and the desired functionality, you may use one or more of these in your app.

In general, you should support at least import and export functionality. Depending on where the merchant's catalog lives, they will need to import or export their catalog. Typically, if a merchant started selling on BigCommerce, they will export their catalog to the external channel. If they start selling on the external channel, they will import their catalog to BigCommerce. The option to choose between import and export should be provided to the merchant, so they have full control of how they share their products between BigCommerce and the external channel.

### Importing

To import products to BigCommerce, `GET` the products from the external channel then `POST` them to BigCommerce via `/stores/{{STORE_HASH}}/catalog/products`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/endpoint
X-Auth-Token: {{ACCESS_TOKEN}}
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

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/createproduct#requestrunner)

Variants can be added via the same request used to create the product or later after the product is created by a `POST` request to the [Product Variant](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/createvariant) endpoint (the former is recommended for bulk variant creation).

### Exporting

To export catalog data from BigCommerce to an external channel, you will need to get all products and variants from BigCommerce. To do so, send a `GET` request to `/stores/{{STORE_HASH}}/v3/catalog/products?include=variants`:

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products?include=variants
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts#requestrunner)

[Filters](https://developer.bigcommerce.com/api-docs/getting-started/filtering) can be used in this call to retrieve subsets of the merchant's catalog. Also, keep in mind that you will more than likely need to handle pagination to retrieve all products in a merchant's catalog.

To support these workflows from a UI perspective, you may need to include the following components (please see the [sample channel app](https://github.com/bigcommerce/channels-app) for a visual on how this functions):

- Panel
- Table
- Progress Bar
- Typography
- Button
- Spinner

For an in-depth guide to using V3 Catalog endpoints, see [Catalog Overview](https://developer.bigcommerce.com/api-docs/catalog/products-overview). For a complete API reference including request schemas and property descriptions, see [Catalog](https://developer.bigcommerce.com/api-reference/catalog/catalog-api).

## Creating listings

Whether importing or exporting the catalog, you will need to create listings for products shared between the channel and BigCommerce. Any products imported to BigCommerce or exported to the channel must have a corresponding listing to support the listing being managed separately from the base catalog product.

To [create channel listings](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-listings/createchannellistings), send a `POST` request to `/v3/channels/{{CHANNEL_ID}}/listings`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels/{{CHANNEL_ID}}/listings
X-Auth-Token: {{ACCESS_TOKEN}}
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

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-listings/updatechannellistings#requestrunner)

## Importing and exporting sales

### Customer and order imports

Importing customer and order data allows the merchant to import the sales history from an external channel (such as a point of sale system) into BigCommerce. In BigCommerce, orders map to specific customers. Customer and order exports allow the merchant to export the sales history from BigCommerce into the external channel.

To import or export customer and order data, integrate the following endpoints:

- [`/v3/customers`](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)
- [`/v2/orders`](https://developer.bigcommerce.com/api-reference/orders/orders-api)

To attribute orders to a specific sales channel, be sure to set the `channel_id` property when creating the order in BigCommerce.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2//v2/orders
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "billing_address": {...},
  "products": [...],
  "channel_id": {{CHANNEL_ID}}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> **Note**
>
> - If the external channel does not have a concept of customers, an order can be created with a `customer_id` of `0` (this value is used for "guest" shoppers).

</div>
</div>
</div>

## Managing orders and inventory

To ensure that BigCommerce merchants are able to continue using their existing catalog and eCommerce workflows, in addition to enabling other downstream eCommerce functionality, we require channel apps sync order and inventory information back to BigCommerce and ensure the following use cases are supported:

- Creating orders as they are made on the external channel
- Updating orders as changes are made on the external channel
- Reading orders, via API or webhooks, to push any necessary changes/updates made by the merchant in the BigCommerce control panel to the external channel
- Reading inventory levels via the Products API or webhooks to get up-to-date inventory levels for the channel. This is critical, because orders that impact available inventory can come from other channels including the main storefront. 


To do this, integrate the following endpoints:

- [`/v3/catalog/products`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct)
- [`/v2/orders`](https://developer.bigcommerce.com/api-reference/orders/orders-api)

To attribute orders to a specific sales channel, be sure to set the `channel_id` property when creating the order in BigCommerce.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2//v2/orders
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "billing_address": {...},
  "products": [...],
  "channel_id": {{CHANNEL_ID}}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
>
> - If the external channel does not have a concept of customers, an order can be created with a `customer_id` of `0`, the value used for guest shoppers.
> - BigCommerce automatically updates inventory after an order is created; inventory levels are retrievable via the [Products API](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts).

</div>
</div>
</div>

## Syncing gift card balances

[Gift certificate](https://developer.bigcommerce.com/api-reference/marketing/marketing-api/gift-certificates/) endpoints can be leveraged to sync BigCommerce gift certificates with gift cards purchased in store. When a gift card is used in person, the associated gift certificate in BigCommerce should be updated by changing the certificate's `balance` value.

The same general process should take place when the gift certificate is used online. The remaining balance should be updated for the associated gift card in the external channel.

## B2B and wholesale integration

### Customer groups

This feature allows merchants to organize their customer base into groups with specific rules that affect the customer's shopping experience. Common use cases for these rules include:

- Custom product pricing
- Discounts for all products within a specific category
- Hiding specific products or categories from view

To leverage customer groups in your app, integrate the following endpoints:

- [`/v2/customer_groups`](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-groups)

### Price lists

[Price lists](https://developer.bigcommerce.com/api-reference/store-management/price-lists) are used to create variant-level price overrides that can be assigned to specific [customer groups](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-groups). To make use of price lists, integrate the following endpoints:

- [`{base url}/v3/pricelists`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists)
- [`{base url}/v3/pricelists/{pricelist id}/records`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-records)
- [`{base url}/v3/pricelists/assignments`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-assignments)

## Handling notifications

This functionality is not supported yet, so notifications will likely need to be handled in the app itself. Eventually, we will require certain notifications to be surfaced to BigCommerce, so that they can be displayed in the merchant's control panel.

## Developing the UI

Channel apps are embedded in the BigCommerce control panel. As such, they need to look and feel native to the rest of the BigCommerce user interface. To assist developers in the rapid creation of frontends that meet required design standards, we have developed a library of publicly available React components. For more information, see the [BigDesign Developer Playground](https://developer.bigcommerce.com/big-design/).

## Next steps

- [Learn about channel app best practices](https://developer.bigcommerce.com/api-docs/channels/guide/channel-app-best-practices).

## Related resources

### Articles

- [Becoming a Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
- [Introduction to Building Apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- [Developer's Guide to Building Headless Storefronts](https://developer.bigcommerce.com/api-docs/storefronts/developers-guide-headless)
- [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)
- [Channel app approval requirements](https://developer.bigcommerce.com/api-docs/channels/guide/channel-app-requirements)
- [BigDesign Component Library](https://developer.bigcommerce.com/big-design/?path=/story/badge--overview)
- [Extending Existing Apps with Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/tutorials/extend-existing-apps)
- [Building Storefront Channels](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront)
