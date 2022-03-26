# MSF API Changes

## Cart & Checkout A

The Cart & Checkout APIs experience no schema changes as part of this release. However, it is important to set the correct `channel_id` for the Channel you are servicing when creating a Cart.

If you use [cart redirect URLs](/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl) or [Embedded Checkout](/api-docs/cart-and-checkout/embedded-checkout/embedded-checkout-overview), the URLs for these should automatically reference the appropriate Site when requested.

# Cart and Checkout B

The Cart and Checkout APIs will not experience any schema changes as part of this release. However, it is important to set the correct `channel_id` for the channel you are servicing when creating a cart.

If you use [cart redirect URLs](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl) or [Embedded Checkout](https://developer.bigcommerce.com/api-docs/storefronts/embedded-checkout/embedded-checkout-overview), the URLs for these should automatically reference the appropriate site when requested.

## Categories A

[Categories API reference documentation](/api-reference/store-management/catalog/category/getcategories)

Previously, a store had a collection of Categories, which were organized in a tree structure. This collection of categories has been migrated into the store's first Category Tree, and you have an opportunity to create additional Trees, which can be assigned to Channels.

![categories-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/categories-diagram.webp)

Previously, a store had a collection of Categories, which were organized in a tree structure. This collection of categories has been migrated into the store's first Category Tree, and you have an opportunity to create additional Trees, which can be assigned to Channels.

If you need to understand the category structure that is being used by a particular storefront, or manage these data, you must first identify which Tree is tied to that storefront Site's Channel, via its `channel_id` on the Trees endpoint. You may use the Channel ID filter for this, e.g. `GET /catalog/trees?channel_id:in=1,2,3,4`.

A temporary restriction is in place in which a Tree may only be assigned to a maximum of 1 Channel. This will be relaxed in a future release, to allow sharing of a common Tree among several Channels.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct Category Tree for a given shopper, in real-time.

# Categories B

[Publicly accessible Categories API documentation](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories)

Previously, a store had a collection of categories organized in a tree structure. This collection of categories has been migrated into the store's first category tree, enabling you to create additional trees that can be assigned to channels.

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/categories-diagram.png?c=1">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/categories-diagram.png?c=1">
</a>

To access the category structure used by a particular storefront, you must first identify which tree is tied to that storefront channel. You can do so by passing a Channel ID as a query parameter in a `GET` request to `/catalog/trees`. For example, `GET /catalog/trees?channel_id:in=1`.

A temporary restriction is in place in which a tree may only be assigned to a maximum of one channel. This will be relaxed in a future release to allow sharing of a common tree among several channels.

If your application interacts with shoppers, you may be able to use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to get the correct category tree for a given shopper in real-time.

## Channels A

[Channels API reference documentation](/api-reference/store-management/channels)

A **Channel** is a place where the merchant sells products. This could be a storefront website, a marketplace such as Amazon or eBay, a POS system, a marketing feed, or a "Custom" channel which may not fit into one of these types. Merchants create new Channels when they wish to sell in a new context. Channels are useful to organize a merchant's complex business, and can be used to attach many other objects which are related to a particular shopper's experience on the Channel. 

![channels-sites-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/channels-sites-diagram.webp)

A channel is defined by:

- A name, which is merchant-defined and not exposed publicly (used for organization)
- A `type`, which may be `storefront`, `marketing`, `pos`, `marketplace` or `custom`
- A `platform`, which indicates on which platform the channel is primarily experienced by a shopper.

Consider the [Channels API documentation](/api-reference/cart-checkout/channels-listings-api/channels/createchannel) for more information on valid combinations of `type` and `platform`.

A Stencil storefront (meaning a storefront served directly by BigCommerce) will have a type of `storefront` and a platform of `bigcommerce`.

Each BigCommerce store is provisioned with 1 Channel from the moment of its creation, intended for its first Stencil storefront. The ID of this Channel will be `1` on all BigCommerce stores. This "default channel" may also be used with certain features for backwards compatibility when a more specific Channel cannot be determined. For example, orders created using the V2 Orders API, if they do not supply a specific Channel ID at the moment of creation, will be assumed to be orders for Channel ID `1`.

The default Channel (ID `1`) cannot be deleted.

When upgrading your application to support multi-channel functionality, it may make sense to provide merchants with an opportunity to configure how your app behaves differently for each Channel on which they sell. It may also be the case that your application is only relevant to certain Channel types (for example, the `storefront` type, or only `storefront` type Channels on the `bigcommerce` platform), so it's a good idea to fetch the list of Channels immediately after your app's installation to understand if your application is compatible with the merchant's current Channels and surface this information appropriately to users.

# Channels B

[Publicly accessible Channels API documentation](https://developer.bigcommerce.com/api-reference/store-management/channels)

A **channel** is a place where merchants sell products. This could be a storefront website, a marketplace such as Amazon or eBay, a POS system, a marketing feed, or a "custom" channel which may not fit into one of these types. Merchants create new channels when they wish to sell in a new context. Channels are useful to organize a merchant's complex business and can be used to attach other objects related to a particular shopper's experience on the channel. 

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/channels-sites-diagram.png?c=1">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/channels-sites-diagram.png?c=1">
</a>

A channel is defined by:

- A name, which is merchant-defined and not exposed publicly (used for organization).
- A `type`, which may be `storefront`, `marketing`, `pos`, `marketplace` or `custom`.
- A `platform`, which indicates on which platform the channel is primarily experienced by a shopper.

For more information on valid combinations of `type` and `platform`, see the [publicly accessible Channels API documentation](https://developer.bigcommerce.com/api-reference/store-management/channels/channels/createchannel).

A Stencil storefront (meaning a storefront served directly by BigCommerce) will have a type of `storefront` and a platform of `bigcommerce`.

Each BigCommerce store is provisioned with one channel from the moment of its creation, intended for its first Stencil storefront. The ID of this channel will be `1` on all BigCommerce stores. This "default channel" may also be used with certain features for backwards compatibility when a more specific channel cannot be determined. For example, orders created using the V2 Orders API, if they do not supply a specific channel ID at the moment of creation, will be assumed to be orders for channel ID `1`.

The default Channel (ID `1`) cannot be deleted.

When upgrading your application to support multi-channel functionality, it may be a good idea to provide merchants with an opportunity to configure how your app behaves for each of their channels. Applications that are only relevant to certain channel types (for example, the `storefront` type or only `storefront` type channels on the `bigcommerce` platform), may need to fetch the list of channels immediately after installation to verify compatibility with the merchant's current channels and surface this information appropriately to the users.



## Customers A

[Customers API documentation](/api-reference/store-management/customers-v3)

Each Customer account has an `origin_channel_id` indicating the Channel on which it was created. The uniqueness constraint on email addresses has been modified to require email addresses to be unique within each Channel, instead of the entire Store. This means a given email address can exist on two different Channels, with two different Customer IDs.


# Customers B

[Publicly accessible Customers API documentation](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)

Each Customer account has an `origin_channel_id` indicating the channel on which it was created. The uniqueness constraint on email addresses has been modified to require email addresses to be unique within each channel instead of the entire store. This means that a given email address can exist on two different channels, with two different customer IDs.

## Orders A

[Orders API reference documentation](/api-reference/store-management/order-transactions)

The V2 Orders API experiences no schema changes as a result of this release. However, for applications that deal with order management, it becomes crucial to note the `channel_id` of the Order, and make it easy for users of your application sort, categorize, and filter Orders on the basis of Channel.

Similarly, it's important to make sure you provide the appropriate channel-specific information to shoppers if your application is shopper-facing and deals with Orders. For example, if you send emails to customers based on new Orders, you'll want to make sure that you look up the correct store information based on its Channel and/or Site to make sure store information, URLs, links, and so forth in your email reflect the correct storefront.

# Orders B

[Publicly accessible Orders API documentation](https://developer.bigcommerce.com/api-reference/store-management/order-transactions)

The V2 Orders API experiences no schema changes as a result of this release. However, for applications that deal with order management, it becomes crucial to note the `channel_id` of the order, and make it easy for users of your application to sort, categorize, and filter orders on the basis of channel.

Similarly, it's important to provide the appropriate channel-specific information to shoppers if your application is shopper-facing and deals with orders. For example, if you send emails to customers based on new orders, you'll need to access the correct store information based on its channel and/or site to make sure store information, URLs, and links in your email reflect the correct storefront.

## Price Lists A

[Price List Assignments API documentation](/api-reference/catalog/pricelists-api/price-lists-assignments/getlistofpricelistassignments)

Previously, Price Lists could only be assigned to a Customer Group, using the V2 Customer Groups API.

Now, Price Lists can be assigned to a Channel, a Customer Group, or a combination of a Channel and Customer Group. Only one Price List can be active at any given time, however, and the weighting of which Price List is evaluated like this:

- If a Price List Assignment is found matching the shopper's current Customer Group AND Channel, it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Customer Group only (with no Channel as part of the assignment), it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Channel only (with no Customer Group as part of the assignment), it will be used, otherwise...
- The catalog default pricing will be used.

If your application manages pricing via Price Lists, it is recommended to move to the new V3 Price List Assignments API in order to fully understand the state of pricing on a store.

If your application simply needs to know what the price will be for a given shopper, you can instead consider using the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to fetch the shopper-view data in real time.

# Price Lists B

[Publicly accessible Price List Assignments API documentation](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-assignments/getlistofpricelistassignments)

Previously, Price Lists could only be assigned to a Customer Group, using the V2 Customer Groups API.

Now, Price Lists can be assigned to a Channel, a Customer Group, or a combination of a Channel and Customer Group. Only one Price List can be active at any given time, however, and the weighting of which Price List is evaluated like this:

- If a Price List Assignment is found matching the shopper's current Customer Group **AND** Channel, it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Customer Group only (with no Channel as part of the assignment), it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Channel only (with no Customer Group as part of the assignment), it will be used, otherwise...
- The catalog default pricing will be used.

If your application manages pricing via Price Lists, it is recommended to move to the new V3 Price List Assignments API in order to fully understand the state of pricing on a store.

If your application simply needs to know what the price will be for a given shopper, you can instead use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to fetch the shopper-view data in real time.

## Products A

[Channel Assignments API documentation](/api-reference/store-management/catalog)

Products must be "assigned" to a Channel in order to be sold on that Channel. For native Stencil storefronts, if a product is not assigned to the storefront's Channel, it will be hidden from that channel's storefront.

![products-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/products-diagram.webp)

If your application provides a selling Channel to merchants (e.g. a 3rd-party marketplace integration), it is recommended to check the products assigned to your Channel to understand which products have been marked as available to be sold on your Channel by the merchant. You may also want to consult the [Channel Listings API](/api-reference/cart-checkout/channels-listings-api/channel-listings/listchannellistings) for extended product information relevant to your Channel.

Products can be assigned to Channels in two ways:

**1. Explicitly creating the Assignment via the Channel Assignments endpoint**

Using the [Channel Assignments API](/api-reference/store-management/catalog), you can directly assign Products to Channels. This will allow those Products to be sold on the Channel, although it won't make them easily discoverable on Storefront-type Channels via Categories. For Storefronts, it's recommended to assign the products to Categories as well (see below).

**2. Assigning the product to a Category whose Tree is assigned to the Channel**

As a convenience, Channel Assignments will be created for products when you assign them to one of the Channel's Categories (connected via to the Channel via a Tree). BigCommerce makes an assumption that products being assigned to categories within a Channel are for sale within that channel. If this is not the case, the assignment can be reversed with the Channel Assignments API.

Assignments will not be removed by the removal of Products from Categories. To remove Channel Assignments, you must use the Channel Assignments API.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct product availability & data for a given shopper, in real-time.

# Products B

[Publicly accessible Products API documentation](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts)

It is important to understand the difference between assigning a product to a category and assigning a product to a channel. Adding a product to a category allows you to merchandise the product and create a store's taxonomy, but it does not automatically make the product available within a channel. A product must be assigned to a channel to be sold on that channel. For native Stencil storefronts, if a product is not assigned to the storefront's channel, it will be hidden from that channel's storefront.

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/products-diagram.png?c=1">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/products-diagram.png?c=1">
</a>

If you have an application that provides a selling channel to merchants (for example, a 3rd-party marketplace integration), it is recommended to check the existing channel assignments to understand which products can be sold on your channel. For extended product information relevant to your channel, consult the [Channel Listings API](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-listings/listchannellistings).

**Creating channel assignments**

Using the [Channel Assignments API](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/reference/products_assignments.yaml/paths/~1catalog~1products~1channel-assignments/put), you can create and manage product assignments across storefront channels (Stencil and headless) and 3P channels (marketing, marketplaces, etc.).

Products assigned to a storefront channel can be sold on that channel and are discoverable in search and via a direct link. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Assigning a product to a category does not automatically assign it to a channel. For a product to be available within a channel, you need to create a channel assignment.
> * Removing a product from a channel will make that product unavailable on the given channel. The product will not be available in categories, via search, or a direct link but it will remain categorized.
> * Removing a product from one or all of the channel's categories without revoking the channel assignment, will remove the product from the categories but shoppers will still be able to access the product via search or a direct link. This is useful for running sales campaigns for specific products where shoppers get a direct link to purchase a product through an email ad.
> * Assignments are not removed by the removal of products from categories. To remove channel assignments, use the Channel Assignments API.

</div>
</div>
</div>

If your application interacts with shoppers, you may be able to use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct product availability and data for a given shopper in real time.
## Store Settings A

[Settings API reference documentation](/api-reference/store-management/settings)

BigCommerce's Settings APIs allow management of the store's configuration, which allows you to control many of the same settings that are available in the BigCommerce Control Panel.

These Settings APIs can be used to simplify the setup of new stores and new selling Channels, as well as automating changes to configuration in an ongoing capacity. They could furthermore build tools that are more efficient than the BigCommerce control panel for managing configuration for particular use cases.

They are also useful for app developers to understand the current state of a store's configuration, for applications that wish to respect a merchant's existing settings.

As an example, knowing the store or Channel settings related to the display of pricing (inclusive or exclusive of tax) can be useful for an application that also displays pricing, or perhaps sends emails containing pricing.

Unlike many of BigCommerce's APIs, Settings APIs usually don't involve a large collection of objects that can be created, deleted, and paginated. Instead, these APIs deal with a static set of allowed configuration keys for a particular area of the platform. They can be configured either on a **global** level or as a **contextual override** for a particular Channel.

# Store Settings B

[Publicly accessible Settings API documentation](https://developer.bigcommerce.com/api-reference/store-management/settings)

BigCommerce's Settings APIs allow management of the store's configuration, which allows you to control many of the same settings that are available in the BigCommerce Control Panel.

These Settings APIs can be used to simplify the setup of new stores and new selling Channels, as well as automating changes to configuration in an ongoing capacity. They could furthermore build tools that are more efficient than the BigCommerce control panel for managing configuration for particular use cases.

They are also useful for app developers to understand the current state of a store's confguration, for applications that wish to respect a merchant's existing settings.

As an example, knowing the store or Channel settings related to the display of pricing (inclusive or exclusive of tax) can be useful for an application that also displays pricing, or perhaps sends emails containing pricing.

Unlike many of BigCommerce's APIs, Settings APIs usually don't involve a large collection of objects that can be created, deleted, and paginated. Instead, these APIs deal with a static set of allowed configuration keys for a particular area of the platform. They can be configured either on a **global** level or as a **contextual override** for a particular Channel.



### Global vs Contextual settings A

![settings-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/settings-diagram.webp)

Most BigCommerce stores only sell on a single Channel, typically a single storefront website. When these stores are configuring their settings, they're modifying the "global" versions of those settings, which are used to affect the behavior of their single Channel.

However, when a store starts taking advantage of multi-channel or multi-storefront functionality, they often want to configure settings differently for each selling Channel.

Therefore, the existing settings are treated as the defaults for any new Channels, but the merchant has an opportunity to override many of the settings as appropriate for a particular Channel.

In the Settings APIs, this functionality is represented via URL parameters which allow interacting with the different layers of configuration.

For example, a GET request to the Store Profile endpoint may look like this:

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_phone": "+1 123-456-7890",
    "store_name": "My Default Store Name",
    "store_address": "123 Default St"
  },
  "meta": {}
}
```

As no query parameters were supplied, this data returned is the **global default** version of this configuration. All available configuration keys are always returned on the global level.

This global configuration will be used for all Channels that have not provided a channel-specific version of these settings.

To see if a Channel-specific setting exists, you can request this setting in the context of a particular channel:


```http
GET /v3/settings/profile?channel_id=122
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {},
  "meta": {}
}
```

The empty `data` object in the response indicates that no channel-specific data exists. Therefore, all of this channel's Store Profile settings are coming from the global defaults. If the global defaults were to change (for example, a change to the Store Name), that data would also take effect on this channel.

Let's consider another case:

```http
GET /v3/settings/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_name": "My Channel-Specific Name for Channel 123",
  },
  "meta": {}
}
```

In this case, I see that the Store Name has been overridden for Channel 123. Therefore, this is the name that will appear to any shoppers interacting with this Channel. If the store name were to change at the global level, this channel's name would not change.

One more case:

```http
GET /v3/settings/profile?channel_id=124
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_phone": "+1 555-555-555",
    "store_name": "My Channel-Specific Name For Channel 124",
    "store_address": "124 Channel St"
  },
  "meta": {}
}
```

In this case, I see that all fields of the Store Profile have been overridden on this channel, so none of the global default settings are being used.

The global settings or the channel-specific settings can be updated with a `PUT` (supporting partial update, similar to `PATCH`):

```http
PUT /v3/settings/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "The new global store name",
}
```


```http
PUT /v3/settings/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "A different Channel-Specific Name for Channel 123",
}
```

If you wish to "un-override" a channel's settings and return that channel to the global defaults, simply use the `DELETE` method, and pass the keys that should be cleared in addition to the channel ID as URL parameters:

```http
DELETE /v3/settings/profile?channel_id=124&keys=store_name,store_address
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

Note that **global** settings cannot be deleted, only updated.

## Global vs Contextual settings B

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/settings-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/settings-diagram.png">
</a>


Most BigCommerce stores only sell on a single Channel, typically a single storefront website. When these stores are configuring their settings, they're modifying the "global" versions of those settings, which are used to affect the behavior of their single Channel.

However, when a store starts taking advantage of multi-channel or multi-storefront functionality, they often want to configure settings differently for each selling Channel.

Therefore, the existing settings are treated as the defaults for any new Channels, but the merchant has an opportunity to override many of the settings as appropriate for a particular Channel.

In the Settings APIs, this functionality is represented via URL parameters which allow interacting with the different layers of configuration.

For example, a GET request to the Store Profile endpoint may look like this:

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/store/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_phone": "+1 123-456-7890",
    "store_name": "My Default Store Name",
    "store_address": "123 Default St"
  },
  "meta": {}
}
```

As no query parameters were supplied, this data returned is the **global default** version of this configuration. All available configuration keys are always returned on the global level.

This global configuration will be used for all Channels that have not provided a channel-specific version of these settings.

To see if a Channel-specific setting exists, you can request this setting in the context of a particular channel:


```http
GET /v3/settings/store/profile?channel_id=122
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {},
  "meta": {}
}
```

The empty `data` object in the response indicates that no channel-specific data exists. Therefore, all of this channel's Store Profile settings are coming from the global defaults. If the global defaults were to change (for example, a change to the Store Name), that data would also take effect on this channel.

Let's consider another case:

```http
GET /v3/settings/store/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_name": "My Channel-Specific Name for Channel 123",
  },
  "meta": {}
}
```

In this case, I see that the Store Name has been overridden for Channel 123. Therefore, this is the name that will appear to any shoppers interacting with this Channel. If the store name were to change at the global level, this channel's name would not change.

One more case:

```http
GET /v3/settings/store/profile?channel_id=124
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_phone": "+1 555-555-555",
    "store_name": "My Channel-Specific Name For Channel 124",
    "store_address": "124 Channel St"
  },
  "meta": {}
}
```

In this case, I see that all fields of the Store Profile have been overridden on this channel, so none of the global default settings are being used.

The global settings or the channel-specific settings can be updated with a `PUT` (supporting partial update, similar to `PATCH`):

```http
PUT /v3/settings/store/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "The new global store name",
}
```


```http
PUT /v3/settings/store/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "A different Channel-Specific Name for Channel 123",
}
```

If you wish to "un-override" a channel's settings and return that channel to the global defaults, simply use the `DELETE` method, and pass the keys that should be cleared in addition to the channel ID as URL parameters:

```http
DELETE /v3/settings/store/profile?channel_id=124&keys=store_name,store_address
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

Note that **global** settings cannot be deleted, only updated.


### The cumulative effect of Global and Channel settings A

For any "touch point" a shopper has with a particular Channel - whether that's viewing the storefront, or when a transactional email sends, when a merchant is printing a packing slip to put into a package being shipped, or any other place where shopper-facing information is displayed - any Channel-specific settings will be overlaid over the existing Global settings to determine the final state of the shopping experience.

The shopper-facing experience is represented via the Stencil storefront platform as well as the GraphQL Storefront API. If your application is mostly concerned with the shopper-facing "final product" of a particular Channel's configuration, consider using the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to simplify your integration. As all Storefront API requests are run in the context of a particular Channel, all relevant configuration is automatically applied to the data returned in a Storefront API response. The "Settings APIs" discussed in this article are primarily for use cases related to the **management** or **administration** of store settings.

## The cumulative effect of Global and Channel settings B

For any "touch point" a shopper has with a particular Channel - whether that's viewing the storefront, or when a transactional email sends, when a merchant is printing a packing slip to put into a package being shipped, or any other place where shopper-facing information is displayed - any Channel-specific settings will be overlaid over the existing Global settings to determine the final state of the shopping experience.

The shopper-facing experience is represented via the Stencil storefront platform as well as the GraphQL Storefront API. If your application is mostly concerned with the shopper-facing "final product" of a particular Channel's configuration, consider using the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to simplify your integration. As all Storefront API requests are run in the context of a particular Channel, all relevant configuration is automatically applied to the data returned in a Storefront API response. The "Settings APIs" discussed in this article are primarily for use cases related to the **management** or **administration** of store settings.


## Storefront & Content A

### Scripts A

Scripts are associated with a particular Site. Any Scripts that were created previously have been assigned to the default Site (which has an id of `1000` on each store). If you do not supply a `site_id` when creating a Script, it will be assigned to the default Site. In order to support multi-storefront stores, you should explicitly assign Scripts to the appropriate Site on which they are intended to render. If you want the exact same Script to show up on several Sites, you must create the Script on each site.

![scripts-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/scripts-diagram.webp)


[Scripts API reference documentation](/api-reference/store-management/scripts)

From a UX perspective, you may wish to prompt merchants who are setting up your app to pick one or more storefront Sites on which your app's storefront functionality should be installed. It is also advisable to provide a way to remove your Scripts from each Site, or install them on new Sites the merchant creates as they expand their business.

### Pages A

Pages are associated with a particular Site. Any Pages that were created previously have been assigned to the default Site (which has an id of `1000` on each store).

![pages-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/pages-diagram.webp)


[Pages API reference documentation](/api-reference/store-management/pages/pages/getpages)

A new V3 Pages API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. This new V3 Pages API has `site_id` as a required parameter.

If your application reads Pages-related data, be sure to filter by the appropriate `site_id` when dealing with a particular Site. Similarly, when writing new Pages, be sure to provide the correct `site_id`.

### Widgets A

Widget Templates, Widgets, and Placements are all associated with a particular Site. Any previously existing objects have been assigned to the default Site (which has an id of `1000` on each store).

Going forward, it is recommended to interact directly with the appropriate `site_id` for the storefront you are managing content for using the filters supplied on each endpoint, and be sure to write the correct `site_id` when creating new objects.

### 301 Redirects A

![redirects-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/redirects-diagram.webp)

[Redirects API documentation](/api-reference/store-management/redirects)

Redirects are associated with a particular Site. Any Redirects that were created previously have been assigned to the default Site (which has an id of `1000` on each store).

A new V3 Redirects API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. This new V3 Redirects API has `site_id` as a required parameter.

If your application reads Redirects-related data, be sure to filter by the appropriate `site_id` when dealing with a particular Site. Similarly, when writing in new Redirects, be sure to provide the correct `site_id`.

### Themes A

Previously, the Theme `/activate` endpoint would accept a `variation_id` and a `which` value.

To support application of stores to different storefront Sites, you must now _instead_ supply a `site_id` and `configuration_id` to indicate exactly which storefront you wish to apply a Theme to, and which set of theme settings (Configurations) should be used.

![themes-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/themes-diagram.webp)

[Themes API documentation](/api-reference/store-management/themes)

To understand which Theme is active for a particular Site, you can check the `/v3/sites/ID/active-theme` endpoint.

Themes themselves have remained "global" to the store, but each Theme now exposes a list of Configurations which are any sets of theme settings which have been created for the Theme. Each Theme has a default set of settings, but additional settings can be created by using the Page Builder feature in the BigCommerce control panel, or by creating new Configurations with the public API.

Instead of downloading Themes by using the `/themes/{uuid}/actions/download` endpoint to create a download job, you can instead download the Theme (with its default Configuration) by simply using the `download_url` on the `/themes` collection GET endpoint. This download does not require any processing so it's much faster, but will only contain the default Configuration inside the theme. You can then merge the theme files with any Configuration of your choosing from the `/v3/themes/{uuid}/configurations` endpoint.

**Note:** Since each Theme can define its own Configuration, the JSON response on the Theme Configurations endpoint may differ for each Theme. The Configuration will be a valid JSON object, and will match the theme's Schema. A `/v3/themes/{uuid}/configurations/validate` endpoint can be used to test a potential configuration against the theme's Schema to validate it.

# Storefront and Content B

## Scripts B

Scripts are associated with a particular site. Any scripts that were created previously have been assigned to the default site (which has an id of `1000` on each store). If you do not supply a `site_id` when creating a script, it will be assigned to the default site. To support multi-storefront stores, you should explicitly assign scripts to the appropriate site on which they are intended to render. If you want the exact same script to show up on several sites, you must create the script on each site.

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/scripts-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/scripts-diagram.png">
</a>

[Publicly accessible Scripts API documentation](https://developer.bigcommerce.com/api-reference/store-management/scripts)

From the UX perspective, you may wish to prompt merchants who are setting up your app to pick one or more storefront sites on which your app's storefront functionality should be installed. It is also adviseable to provide a way to remove your scripts from each site, or install them on new sites the merchants create as they expand their business.

## Pages B

Pages are associated with a particular site. Any pages that were created previously have been assigned to the default site (which has an id of `1000` on each store).

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/pages-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/pages-diagram.png">
</a>

[Publicly accessible Pages API documentation](https://developer.bigcommerce.com/api-reference/store-management/store-content/pages/getallpages)

The new V3 Pages API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. The V3 Pages API has `site_id` as a required parameter.

If your application reads pages-related data, be sure to filter by the appropriate `site_id` when dealing with a particular site. Similarly, when writing new pages, be sure to provide the correct `site_id`.

## Widgets B

Widget templates, widgets, and placements are all associated with a particular site. Any previously existing objects have been assigned to the default site (which has an id of `1000` on each store).

Going forward, it is recommended to interact directly with the appropriate `site_id` for the storefront you are managing content for using the filters supplied on each endpoint. When creating new objects, be sure to write the correct `site_id`.

## 301 Redirects B

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/redirects-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/redirects-diagram.png">
</a>

[Publicly accessible Redirects API documentation](https://developer.bigcommerce.com/api-reference/store-management/redirects)

Redirects are associated with a particular Ssite. Any redirects that were created previously have been assigned to the default site (which has an id of `1000` on each store).

The new V3 Redirects API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. The V3 Redirects API has `site_id` as a required paramter.

If your application reads redirects-related data, be sure to filter by the appropriate `site_id` when dealing with a particular site. Similarly, when writing in new redirects, be sure to provide the correct `site_id`.

## Themes B

Previously, the `/themes/actions/activate` endpoint would accept a `variation_id` and a `which` value.

To support application of stores to different storefront sites, you must now _instead_ supply a `site_id` and `configuration_id` to indicate exactly which storefront you wish to apply a theme to, and which set of theme settings (configurations) should be used.

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/themes-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/themes-diagram.png">
</a>

[Publicly accessible Themes API documentation](https://developer.bigcommerce.com/api-reference/store-management/themes)

To understand which theme is active for a particular site, you can check the `/v3/sites/ID/active-theme` endpoint.

Themes themselves have remained "global" to the store, but each theme now exposes a list of configuration settings. Each Theme has a default set of settings, but additional settings can be created by using the Page Builder feature in the BigCommerce control panel or by creating new configurations with the public API.

Instead of downloading themes by using the `/themes/{uuid}/actions/download` endpoint to create a download job, you can download the theme (with its default configuration) by using the `download_url` on the `/themes` collection `GET` endpoint. This download does not require any processing so it's much faster, but will only contain the default configuration inside the theme. You can then merge the theme files with any configuration of your choosing from the `/v3/themes/{uuid}/configurations` endpoint.

**Note:** Since each theme can define its own configuration, the JSON response on the Theme Configurations endpoint may differ for each theme. The configuration will be a valid JSON object, and will match the theme's schema. A `/v3/themes/{uuid}/configurations/validate` endpoint can be used to test a potential configuration against the theme's schema to validate it.





## Subscribers A

[Subscribers API reference documentation](/api-reference/store-management/subscribers)

Each Subscriber now has an `origin_channel_id` property which indicates on which the Channel on which each Subscriber signaled intent to receive a newsletter. If not supplied, will default to 1, but should be supplied with every request explicitly.

If your application deals with Subscribers, be sure to check the `origin_channel_id` to understand exactly where the Subscriber signed up. If you are integrating with an email marketing system, you may want to allow the merchant to pick which email lists will be used for which Channels.

The Subscriber webhooks will also be augmented with an `origin_channel_id` so new subscriptions can be added to the appropriate email list for each storefront.

# Subscribers B

[Publicly accessible Subscribers API documentation](https://developer.bigcommerce.com/api-reference/store-management/subscribers)

Each subscriber now has an `origin_channel_id` property that indicates the channel on which that subscriber signaled intent to receive a newsletter. If not supplied, `origin_channel_id` will default to 1, although it should be supplied with every request explicitly.

If your application deals with subscribers, be sure to check the `origin_channel_id` to understand exactly where the subscriber signed up. If you are integrating with an email marketing system, you may want to allow the merchant to pick which email lists will be used for which channels.

The subscriber webhooks will also be augmented with an `origin_channel_id` so new subscriptions can be added to the appropriate email list for each storefront.
