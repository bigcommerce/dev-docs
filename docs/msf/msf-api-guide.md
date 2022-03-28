# Guide to Using APIs in a Multi-Storefront Environment

## Channels

[Channels API reference documentation](/api-reference/store-management/channels)

A **channel** is a place where a merchant's store sells products. Storefront websites, marketplaces like Amazon and eBay, point-of-sale systems, and marketing feeds are all sales channels. A custom channel may not fit into any one of these types. A merchant creates a new channel to sell in a new context. Channels can help to organize a merchant's complex business by allowing them to sell to many customers in many places from a single catalog in one BigCommerce store. In a transactional context, channel objects link together a variety of other objects that describe a particular shopper's experience on a sales channel. 

![channels-sites-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/channels-sites-diagram.webp)

A channel is defined by the following:

* A `name`, which is merchant-defined for internal convenience and not exposed to shoppers
* A `type`, which may be one of the following:
  * `storefront`, 
  * `marketing`, 
  * `pos`, 
  * `marketplace`
  * `custom`
* A `platform`, which indicates the platform on which shoppers primarily use the channel

Consult the [Channels API documentation](/api-reference/cart-checkout/channels-listings-api/channels/createchannel) for more information on valid combinations of `type` and `platform`. For example, a BigCommerce-hosted Stencil storefront has a type of `storefront` and a platform of `bigcommerce`.

Each BigCommerce store is provisioned with one channel out of the box, intended for its first Stencil storefront. The ID of this channel is `1` for all BigCommerce stores. This channel may also be referred to as the "default channel", and it cannot be deleted. 

<!-- theme: info -->
> #### Backwards compatibility
> In some cases when a more specific channel cannot be associated with an interaction, channel `1` may be used for backwards compatibility. For example, orders created using the Orders V2 API that do not specify a channel ID will be associated with channel `1`.

To learn more about upgrading your application to support multi-channel sales, see [Multi-Storefront App Compatibility](/api-docs/apps/multi-storefront).

## Cart and Checkout

When your integration creates a cart or checkout, make sure it specifies the `channel_id` for the storefront or other channel the shopper is using. 

If the cart is associated with the shopper's channel and the relationship between a storefront's channel and site has been properly configured with the [sites API](/api-reference/store-management/sites/sites/post-site), both [cart redirect URLs](/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl) and [embedded checkout URLs](/api-docs/cart-and-checkout/embedded-checkout/embedded-checkout-overview) will refer the shopper to the correct site. 

## Categories

[Categories API reference documentation](/api-reference/store-management/catalog/category/getcategories)

Previously, a store had a collection of categories that were organized in a tree structure. This collection of categories has been abstracted from the store and converted into the store's first **category tree**. You can create multiple category trees, each of which you can assign to a storefront or other sales channel.

![categories-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/categories-diagram.webp)

To access the category structure used by a particular storefront, you must first identify which tree is tied to that storefront channel. You can do so by sending a request to the following endpoint. Include the `channel_id:in` query parameter, which accepts one or more Channel IDs as a comma-separated list. 

```http title="Example request: Get category tree for channel 3"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/trees?channel_id:in=3
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
``` 

<!-- theme: info -->
> #### Note
> Currently, a tree may only be assigned to a maximum of one channel. BigCommerce's roadmap includes relaxing this restriction in the future so that several channels can share a common tree.

If your application interacts with shoppers, you may be able to use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to get the active category tree for shopper's channel in real time.

## Customers

[Customers API documentation](/api-reference/store-management/customers-v3)

Each customer account has an `origin_channel_id` that references the channel on which it was created. Email addresses must be unique within each **channel**, rather than within the store. This means that a single email address can exist two (or more) times in one store: associated with two Customer IDs on two different channels.

## Orders

[Orders API reference documentation](/api-reference/store-management/order-transactions)

For applications that deal with order management, it is now crucial to include the `channel_id` as part of the order object. Among other benefits, linking each order to a channel will make it easier to sort, categorize, and filter orders by the storefront or other sales channel in which they were placed. You will also avoid accidentally having [an order associated with the default channel](#backwards-compatibility), which may confuse shoppers by exposing store configuration details that do not apply to their channel.

Similarly, it's important to provide the appropriate channel-specific information to shoppers if your application is shopper-facing and deals with orders. For example, if your app sends order confirmation emails to customers, you'll need to ensure that any store information, URLs, and links in your email reflect the correct storefront or other sales channel. For more details, see the use case considerations at the end of [Managing Store Configuration](/api-docs/store-management/settings#the-cumulative-effect-of-global-and-channel-specific-settings).

## Price lists

[Price List Assignments API documentation](/api-reference/catalog/pricelists-api/price-lists-assignments/getlistofpricelistassignments)

Previously, price lists assignments were made with the V2 Customer Groups API. Price lists could only be assigned to customer groups.

The V3 Price List Assignments API allows you to assign price lists to channels, customer groups, or the combination of a channel and customer group. Only one Price List can apply at any given time, so BigCommerce determines which Price List to apply using the following logic:

* If a price list assignment is found that matches both the shopper's active channel **AND** their current customer group, it will be used; otherwise,
* If a price list assignment is found that both does not specify a channel **AND** matches the shopper's current customer group, it will be used; otherwise,
* If a price list assignment is found that both matches the shopper's current channel **AND** does not specify a customer group, it will be used; otherwise,
* The catalog default pricing will be used.

If your implementation uses price lists to manage pricing, we recommend that you start using the V3 Price List Assignments API so that your app fully understands and can reason about the pricing state for the customers, orders, and channels on the merchant's store.

If your use case is primarily concerned with what the price will be for a given shopper, consider using the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to fetch data about the shopper's view in real time.

## Products

[Channel Assignments API documentation]() 

<!-- theme: info -->
> #### The cardinal rule of multi-channel sales
> Products must be explicitly assigned to a channel to be sold on that channel.

It is important to understand the difference between assigning a product to a category and assigning a product to a channel. Adding a product to a category allows you to merchandise the product and develop a store's taxonomy of products, categories, and category trees, but it does not make the product available within a channel. A product must be explicitly assigned to a channel to be sold on that channel. For native Stencil storefronts, if a product is not assigned to the storefront's channel, it will be hidden from that channel's storefront.

![products-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/products-diagram.webp)

If your app provides merchants with a selling channel, such as an integration with a third-party marketplace, we recommend that you check the merchant's catalog to determine their existing channel assignments. This will help your app understand and communicate with the merchant about which products the integration's channel is currently permitted to offer for sale. For extended product information relevant to your channel, consult the [Channel Listings API](/api-reference/store-management/channels/channel-listings/listchannellistings).

If your application interacts with shoppers, you can use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to get the correct product availability and data for a given shopper in real time.

### The nuances of channel assignments

Use the [Channel Assignments API]() to create and manage product assignments for [storefronts and other sales channels](#channels).

A product assigned to a storefront channel can be sold on that channel, discovered in search, and accessed by direct link, unless that storefront's settings otherwise disable direct links. 

Removing a product from a channel will make that product unavailable on the given channel. The product will remain categorized, but it will not be available using category filters, search, or its direct link.

Removing a product from a category does not remove it from the channel. Revoke channel assignments with the Channel Assignments API.

Removing a product from one or all of a channel's categories without revoking the channel assignment will remove the product from the category views and filters, but shoppers will still be able to access the product using search or its direct link. This may be useful for sales campaigns that send shoppers a direct link to purchase a specific product.

## Storefront and Content

### Scripts

Scripts are associated with a particular site. Any scripts that were created previously have been assigned to the default site (which has an id of `1000` on each store). If you do not supply a `site_id` when creating a script, it will be assigned to the default site. To support multi-storefront stores, you should explicitly assign scripts to the appropriate site on which they are intended to render. If you want the exact same script to show up on several sites, you must create the script on each site.

![scripts-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/scripts-diagram.webp)


[Scripts API reference documentation](/api-reference/store-management/scripts)

From the UX perspective, you may wish to prompt merchants who are setting up your app to pick one or more storefront sites on which your app's storefront functionality should be installed. It is also adviseable to provide a way to remove your scripts from each site, or install them on new sites the merchants create as they expand their business.

### Pages

Pages are associated with a particular site. Any pages that were created previously have been assigned to the default site (which has an id of `1000` on each store).

![pages-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/pages-diagram.webp)

[Pages API reference documentation](/api-reference/store-management/pages/pages/getpages)

The new V3 Pages API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. The V3 Pages API has `site_id` as a required parameter.

If your application reads pages-related data, be sure to filter by the appropriate `site_id` when dealing with a particular site. Similarly, when writing new pages, be sure to provide the correct `site_id`.

### Widgets

Widget templates, widgets, and placements are all associated with a particular site. Any previously existing objects have been assigned to the default site (which has an id of `1000` on each store).

Going forward, it is recommended to interact directly with the appropriate `site_id` for the storefront you are managing content for using the filters supplied on each endpoint. When creating new objects, be sure to write the correct `site_id`.

### 301 Redirects

![redirects-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/redirects-diagram.webp)

[Redirects API documentation](/api-reference/store-management/redirects)

Redirects are associated with a particular Ssite. Any redirects that were created previously have been assigned to the default site (which has an id of `1000` on each store).

The new V3 Redirects API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. The V3 Redirects API has `site_id` as a required paramter.

If your application reads redirects-related data, be sure to filter by the appropriate `site_id` when dealing with a particular site. Similarly, when writing in new redirects, be sure to provide the correct `site_id`.

### Themes

Previously, the `/themes/actions/activate` endpoint would accept a `variation_id` and a `which` value.

To support application of stores to different storefront sites, you must now _instead_ supply a `site_id` and `configuration_id` to indicate exactly which storefront you wish to apply a theme to, and which set of theme settings (configurations) should be used.

![themes-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/themes-diagram.webp)
[Themes API documentation](/api-reference/store-management/themes)

To understand which theme is active for a particular site, you can check the `/v3/sites/ID/active-theme` endpoint.

Themes themselves have remained "global" to the store, but each theme now exposes a list of configuration settings. Each Theme has a default set of settings, but additional settings can be created by using the Page Builder feature in the BigCommerce control panel or by creating new configurations with the public API.

Instead of downloading themes by using the `/themes/{uuid}/actions/download` endpoint to create a download job, you can download the theme (with its default configuration) by using the `download_url` on the `/themes` collection `GET` endpoint. This download does not require any processing so it's much faster, but will only contain the default configuration inside the theme. You can then merge the theme files with any configuration of your choosing from the `/v3/themes/{uuid}/configurations` endpoint.

**Note:** Since each theme can define its own configuration, the JSON response on the Theme Configurations endpoint may differ for each theme. The configuration will be a valid JSON object, and will match the theme's schema. A `/v3/themes/{uuid}/configurations/validate` endpoint can be used to test a potential configuration against the theme's schema to validate it.

### Subscribers

[Publicly accessible Subscribers API documentation](https://developer.bigcommerce.com/api-reference/store-management/subscribers)

Each subscriber now has an `origin_channel_id` property that indicates the channel on which that subscriber signaled intent to receive a newsletter. If not supplied, `origin_channel_id` will default to 1, although it should be supplied with every request explicitly.

If your application deals with subscribers, be sure to check the `origin_channel_id` to understand exactly where the subscriber signed up. If you are integrating with an email marketing system, you may want to allow the merchant to pick which email lists will be used for which channels.

The subscriber webhooks will also be augmented with an `origin_channel_id` so new subscriptions can be added to the appropriate email list for each storefront.
