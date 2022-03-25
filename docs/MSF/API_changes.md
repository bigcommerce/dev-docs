# MSF API Changes

## Cart & Checkout

The Cart & Checkout APIs experience no schema changes as part of this release. However, it is important to set the correct `channel_id` for the Channel you are servicing when creating a Cart.

If you use [cart redirect URLs](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl) or [Embedded Checkout](https://developer.bigcommerce.com/api-docs/cart-and-checkout/embedded-checkout/embedded-checkout-overview), the URLs for these should automatically reference the appropriate Site when requested.

## Categories

[Categories API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories)

Previously, a store had a collection of Categories, which were organized in a tree structure. This collection of categories has been migrated into the store's first Category Tree, and you have an opportunity to create additional Trees, which can be assigned to Channels.

![categories-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/HfM2xB4ksa4)

Previously, a store had a collection of Categories, which were organized in a tree structure. This collection of categories has been migrated into the store's first Category Tree, and you have an opportunity to create additional Trees, which can be assigned to Channels.

If you need to understand the category structure that is being used by a particular storefront, or manage these data, you must first identify which Tree is tied to that storefront Site's Channel, via its `channel_id` on the Trees endpoint. You may use the Channel ID filter for this, e.g. `GET /catalog/trees?channel_id:in=1,2,3,4`.

A temporary restriction is in place in which a Tree may only be assigned to a maximum of 1 Channel. This will be relaxed in a future release, to allow sharing of a common Tree among several Channels.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct Category Tree for a given shopper, in real-time.

## Channels

[Channels API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/channels)

A **Channel** is a place where the merchant sells products. This could be a storefront website, a marketplace such as Amazon or eBay, a POS system, a marketing feed, or a "Custom" channel which may not fit into one of these types. Merchants create new Channels when they wish to sell in a new context. Channels are useful to organize a merchant's complex business, and can be used to attach many other objects which are related to a particular shopper's experience on the Channel. 

![channels-sites-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/6uMX12RVuT8)

A channel is defined by:

- A name, which is merchant-defined and not exposed publicly (used for organization)
- A `type`, which may be `storefront`, `marketing`, `pos`, `marketplace` or `custom`
- A `platform`, which indicates on which platform the channel is primarily experienced by a shopper.

Consider the [Channels API documentation](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) for more information on valid combinations of `type` and `platform`.

A Stencil storefront (meaning a storefront served directly by BigCommerce) will have a type of `storefront` and a platform of `bigcommerce`.

Each BigCommerce store is provisioned with 1 Channel from the moment of its creation, intended for its first Stencil storefront. The ID of this Channel will be `1` on all BigCommerce stores. This "default channel" may also be used with certain features for backwards compatibility when a more specific Channel cannot be determined. For example, orders created using the V2 Orders API, if they do not supply a specific Channel ID at the moment of creation, will be assumed to be orders for Channel ID `1`.

The default Channel (ID `1`) cannot be deleted.

When upgrading your application to support multi-channel functionality, it may make sense to provide merchants with an opportunity to configure how your app behaves differently for each Channel on which they sell. It may also be the case that your application is only relevant to certain Channel types (for example, the `storefront` type, or only `storefront` type Channels on the `bigcommerce` platform), so it's a good idea to fetch the list of Channels immediately after your app's installation to understand if your application is compatible with the merchant's current Channels and surface this information appropriately to users.

## Customers

[Customers API documentation](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)

Each Customer account has an `origin_channel_id` indicating the Channel on which it was created. The uniqueness constraint on email addresses has been modified to require email addresses to be unique within each Channel, instead of the entire Store. This means a given email address can exist on two different Channels, with two different Customer IDs.


## Orders

[Orders API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/order-transactions)

The V2 Orders API experiences no schema changes as a result of this release. However, for applications that deal with order management, it becomes crucial to note the `channel_id` of the Order, and make it easy for users of your application sort, categorize, and filter Orders on the basis of Channel.

Similarly, it's important to make sure you provide the appropriate channel-specific information to shoppers if your application is shopper-facing and deals with Orders. For example, if you send emails to customers based on new Orders, you'll want to make sure that you look up the correct store information based on its Channel and/or Site to make sure store information, URLs, links, and so forth in your email reflect the correct storefront.

## Price Lists

[Price List Assignments API documentation](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists-assignments/getlistofpricelistassignments)

Previously, Price Lists could only be assigned to a Customer Group, using the V2 Customer Groups API.

Now, Price Lists can be assigned to a Channel, a Customer Group, or a combination of a Channel and Customer Group. Only one Price List can be active at any given time, however, and the weighting of which Price List is evaluated like this:

- If a Price List Assignment is found matching the shopper's current Customer Group AND Channel, it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Customer Group only (with no Channel as part of the assignment), it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Channel only (with no Customer Group as part of the assignment), it will be used, otherwise...
- The catalog default pricing will be used.

If your application manages pricing via Price Lists, it is recommended to move to the new V3 Price List Assignments API in order to fully understand the state of pricing on a store.

If your application simply needs to know what the price will be for a given shopper, you can instead consider using the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to fetch the shopper-view data in real time.

## Products

[Channel Assigments API documentation](https://developer.bigcommerce.com/api-reference/store-management/catalog)

Products must be "assigned" to a Channel in order to be sold on that Channel. For native Stencil storefronts, if a product is not assigned to the storefront's Channel, it will be hidden from that channel's storefront.

![products-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/Djh2L6UFyPg)

If your application provides a selling Channel to merchants (e.g. a 3rd-party marketplace integration), it is recommended to check the products assigned to your Channel to understand which products have been marked as available to be sold on your Channel by the merchant. You may also want to consult the [Channel Listings API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channel-listings/listchannellistings) for extended product information relevant to your Channel.

Products can be assigned to Channels in two ways:

**1. Explicitly creating the Assignment via the Channel Assignments endpoint**

Using the [Channel Assignments API](https://developer.bigcommerce.com/api-reference/store-management/catalog), you can directly assign Products to Channels. This will allow those Products to be sold on the Channel, although it won't make them easily discoverable on Storefront-type Channels via Categories. For Storefronts, it's recommended to assign the products to Categories as well (see below).

**2. Assigning the product to a Category whose Tree is assigned to the Channel**

As a convenience, Channel Assignments will be created for products when you assign them to one of the Channel's Categories (connected via to the Channel via a Tree). BigCommerce makes an assumption that products being assigned to categories within a Channel are for sale within that channel. If this is not the case, the assignment can be reversed with the Channel Assignments API.

Assignments will not be removed by the removal of Products from Categories. To remove Channel Assignments, you must use the Channel Assignments API.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct product availability & data for a given shopper, in real-time.

## Store Settings

[Settings API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/settings)

BigCommerce's Settings APIs allow management of the store's configuration, which allows you to control many of the same settings that are available in the BigCommerce Control Panel.

These Settings APIs can be used to simplify the setup of new stores and new selling Channels, as well as automating changes to configuration in an ongoing capacity. They could furthermore build tools that are more efficient than the BigCommerce control panel for managing configuration for particular use cases.

They are also useful for app developers to understand the current state of a store's confguration, for applications that wish to respect a merchant's existing settings.

As an example, knowing the store or Channel settings related to the display of pricing (inclusive or exclusive of tax) can be useful for an application that also displays pricing, or perhaps sends emails containing pricing.

Unlike many of BigCommerce's APIs, Settings APIs usually don't involve a large collection of objects that can be created, deleted, and paginated. Instead, these APIs deal with a static set of allowed configuration keys for a particular area of the platform. They can be configured either on a **global** level or as a **contextual override** for a particular Channel.

### Global vs Contextual settings

![settings-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/vyW8mSdPW54)

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

### The cumulative effect of Global and Channel settings

For any "touch point" a shopper has with a particular Channel - whether that's viewing the storefront, or when a transactional email sends, when a merchant is printing a packing slip to put into a package being shipped, or any other place where shopper-facing information is displayed - any Channel-specific settings will be overlaid over the existing Global settings to determine the final state of the shopping experience.

The shopper-facing experience is represented via the Stencil storefront platform as well as the GraphQL Storefront API. If your application is mostly concerned with the shopper-facing "final product" of a particular Channel's configuration, consider using the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to simplify your integration. As all Storefront API requests are run in the context of a particular Channel, all relevant configuration is automatically applied to the data returned in a Storefront API response. The "Settings APIs" discussed in this article are primarily for use cases related to the **management** or **administration** of store settings.

## Storefront & Content

### Scripts

Scripts are associated with a particular Site. Any Scripts that were created previously have been assigned to the default Site (which has an id of `1000` on each store). If you do not supply a `site_id` when creating a Script, it will be assigned to the default Site. In order to support multi-storefront stores, you should explicitly assign Scripts to the appropriate Site on which they are intended to render. If you want the exact same Script to show up on several Sites, you must create the Script on each site.

![scripts-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/ERuNPsqZmNI)


[Scripts API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/scripts)

From a UX perspective, you may wish to prompt merchants who are setting up your app to pick one or more storefront Sites on which your app's storefront functionality should be installed. It is also adviseable to provide a way to remove your Scripts from each Site, or install them on new Sites the merchant creates as they expand their business.

### Pages

Pages are associated with a particular Site. Any Pages that were created previously have been assigned to the default Site (which has an id of `1000` on each store).

![pages-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/BvlyeHi9vig)


[Pages API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/store-content/pages/getallpages)

A new V3 Pages API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. This new V3 Pages API has `site_id` as a required parameter.

If your application reads Pages-related data, be sure to filter by the appropriate `site_id` when dealing with a particular Site. Similarly, when writing new Pages, be sure to provide the correct `site_id`.

### Widgets

Widget Templates, Widgets, and Placements are all associated with a particular Site. Any previously existing objects have been assigned to the default Site (which has an id of `1000` on each store).

Going forward, it is recommended to interact directly with the appropriate `site_id` for the storefront you are managing content for using the filters supplied on each endpoint, and be sure to write the correct `site_id` when creating new objects.

### 301 Redirects

![redirects-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/IB0KeC0AUG4)

[Redirects API documentation](https://developer.bigcommerce.com/api-reference/store-management/redirects)

Redirects are associated with a particular Site. Any Redirects that were created previously have been assigned to the default Site (which has an id of `1000` on each store).

A new V3 Redirects API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. This new V3 Redirects API has `site_id` as a required paramter.

If your application reads Redirects-related data, be sure to filter by the appropriate `site_id` when dealing with a particular Site. Similarly, when writing in new Redirects, be sure to provide the correct `site_id`.

### Themes

Previously, the Theme `/activate` endpoint would accept a `variation_id` and a `which` value.

To support application of stores to different storefront Sites, you must now _instead_ supply a `site_id` and `configuration_id` to indicate exactly which storefront you wish to apply a Theme to, and which set of theme settings (Configurations) should be used.

![themes-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/JkCLW3yRbaY)

[Themes API documentation](https://developer.bigcommerce.com/api-reference/store-management/themes)

To understand which Theme is active for a particular Site, you can check the `/v3/sites/ID/active-theme` endpoint.

Themes themselves have remained "global" to the store, but each Theme now exposes a list of Configurations which are any sets of theme settings which have been created for the Theme. Each Theme has a default set of settings, but additional settings can be created by using the Page Builder feature in the BigCommerce control panel, or by creating new Configurations with the public API.

Instead of downloading Themes by using the `/themes/{uuid}/actions/download` endpoint to create a download job, you can instead download the Theme (with its default Configuration) by simply using the `download_url` on the `/themes` collection GET endpoint. This download does not require any processing so it's much faster, but will only contain the default Configuration inside the theme. You can then merge the theme files with any Configuration of your choosing from the `/v3/themes/{uuid}/configurations` endpoint.

**Note:** Since each Theme can define its own Configuration, the JSON response on the Theme Configurations endpoint may differ for each Theme. The Configuration will be a valid JSON object, and will match the theme's Schema. A `/v3/themes/{uuid}/configurations/validate` endpoint can be used to test a potential configuration against the theme's Schema to validate it.

## Subscribers

[Subscribers API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/subscribers)

Each Subscriber now has an `origin_channel_id` property which indicates on which the Channel on which each Subscriber signaled intent to receive a newsletter. If not supplied, will default to 1, but should be supplied with every request explicitly.

If your application deals with Subscribers, be sure to check the `origin_channel_id` to understand exactly where the Subscriber signed up. If you are integrating with a email marketing system, you may want to allow the merchant to pick which email lists will be used for which Channels.

The Subscriber webhooks will also be augmented with an `origin_channel_id` so new subscriptions can be added to the appropriate email list for each storefront.