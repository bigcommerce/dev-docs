# Multi-Storefront API Guide

## Cart and Checkout

When your integration creates a cart or checkout, make sure it specifies the `channel_id` for the storefront or other channel the shopper is using. 

If the cart is associated with the shopper's channel and the relationship between a storefront's channel and site has been properly configured with the [Sites API](/api-reference/store-management/sites/sites/post-site), both [cart redirect URLs](/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl) and [embedded checkout URLs](/api-docs/storefronts/embedded-checkout/embedded-checkout-overview) will refer the shopper to the correct site. 

## Categories

[Categories API reference documentation](/api-reference/store-management/catalog/category/getcategories)

Previously, a store had a collection of categories that were organized in a tree structure. This collection of categories has been abstracted from the store and converted into the store's first **category tree**. You can create multiple category trees, each of which you can assign to a storefront or other sales channel.

![categories-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/categories-diagram.webp)

To access the category structure used by a particular storefront, you must first identify which tree is tied to that storefront channel. You can do so by sending a request to the following endpoint. Include the `channel_id:in` query parameter, which accepts one or more channel IDs as a comma-separated list. 

```http title="Example request: Get category tree for channel 3"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/trees?channel_id:in=3
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
``` 

<!-- theme: info -->
> #### Note
> Currently, a tree may only be assigned to a maximum of one channel. BigCommerce's roadmap includes relaxing this restriction in the future so that several channels can share a common tree.

If your application interacts with shoppers, you may be able to use the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to get the active category tree for shopper's channel in real time.

## Customers

[Customers API documentation](/api-reference/store-management/customers-v3)

Each customer account has an `origin_channel_id` that references the channel on which it was created. Email addresses must be unique within each **channel**, rather than within the store. This means that a single email address can exist two (or more) times in one store: associated with two Customer IDs on two different channels.

## Orders

[Orders API reference documentation](/api-reference/store-management/order-transactions)

For applications that deal with order management, it is now crucial to include the `channel_id` as part of the order object. Among other benefits, linking each order to a channel will make it easier to sort, categorize, and filter orders by the storefront or other sales channel in which they were placed. You will also avoid accidentally having [an order associated with the default channel](/api-docs/multi-storefront/overview#backwards-compatibility), which may confuse shoppers by exposing store configuration details that do not apply to their channel.

Similarly, if your application is shopper-facing and deals with orders, it's important to provide the appropriate channel-specific information to shoppers. For example, if your app sends order confirmation emails to customers, you'll need to ensure that any store information, URLs, and links in your email reflect the correct storefront or other sales channel. For more details, see the use case considerations at the end of [Managing Store Configuration](/api-docs/store-management/settings#the-cumulative-effect-of-global-and-channel-specific-settings).

## Price lists

[Price List Assignments API documentation](/api-reference/catalog/pricelists-api/price-lists-assignments/getlistofpricelistassignments)

Previously, price lists assignments were made with the V2 Customer Groups API. Price lists could only be assigned to customer groups.

The V3 Price List Assignments API allows you to assign price lists to channels, customer groups, or the combination of a channel and customer group. Only one price list can apply at any given time, so BigCommerce determines which price list to apply using the following logic:

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

If your app provides merchants with a sales channel, such as an integration with a third-party marketplace, we recommend that you check the merchant's catalog to determine their existing channel assignments. This will help your app understand and communicate with the merchant about which products the integration's channel is currently permitted to offer for sale. For extended product information relevant to your channel, consult the [Channel Listings API](/api-reference/store-management/channels/channel-listings/listchannellistings).

If your application interacts with shoppers, you can use the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to get the correct product availability and data for a given shopper in real time.

### The nuances of channel assignments

Use the [Channel Assignments API](/api-reference/store-management/catalog/products-channel-assignments/getproductchannelassignments) to create and manage product assignments for [storefronts and other sales channels](/api-docs/multi-storefront/overview#channels).

A product assigned to a storefront channel can be sold on that channel, discovered in search, and accessed by direct link, unless that storefront's settings otherwise disable direct links. 

Removing a product from a channel will make that product unavailable on the given channel. The product will remain categorized, but it will not be available using category filters, search, or direct link.

Removing a product from a category does not remove it from the channel. Use the [Channel Assignments API](/api-reference/store-management/catalog/products-channel-assignments/getproductchannelassignments) to revoke channel assignments.

Removing a product from one or all of a channel's categories without revoking the channel assignment will remove the product from the category views and filters, but shoppers will still be able to access the product by search or direct link. This may be useful for sales campaigns that send shoppers a direct link to purchase a specific product.

## Storefront and Content

### Scripts

Scripts are associated with a particular site. Any scripts that were created previously have been assigned to the default site, the ID of which is `1000` for each merchant store. If you do not supply a `site_id` when you create a script, it will be assigned to the default site. To support multi-storefront stores, you should explicitly assign scripts to the site on which you intended them to render. If you want a particular script to show up on several sites, you must create that script separately on each site.

![scripts-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/scripts-diagram.webp)

[Scripts API reference documentation](/api-reference/store-management/scripts)

From a UX perspective, you may wish to make it clear to merchants who are setting up your app that they must explicitly select one or more storefront sites on which to install your app's storefront functionality. You should also provide ways to remove your scripts from each site and install your scripts on any new sites the merchant creates in the future.

### Pages

Pages are associated with a particular site. Any pages that were created previously have been assigned to the default site, the ID of which is `1000` for each merchant store.

![pages-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/pages-diagram.webp)

[Pages API reference documentation](/api-reference/store-management/pages/pages/getpages)

The new V3 Pages API services multi-storefront use cases and provides several of the efficiency benefits that V3 APIs offer in comparison with their V2 equivalents. The V3 Pages API has `site_id` as a required parameter.

If your application reads pages-related data, be sure to filter by the appropriate `site_id` when dealing with a particular site. Similarly, when writing new pages, be sure to provide the correct `site_id`.

### Widgets

Widget templates, widgets, and widget placements are all associated with a particular site. Any previously existing widget-related objects are assigned to the default site, the ID of which is `1000` for each merchant store.

Going forward, we recommend that you use the query parameters on each Widgets API endpoint to pass the `site_id` of the storefront for which you are managing content. This will restrict the scope of your requests to the target site. When you create new widget objects, be sure to include the correct `site_id`.

### 301 Redirects

![redirects-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/redirects-diagram.webp)

[Redirects API documentation](/api-reference/store-management/redirects)

Redirects are associated with a particular site. Any redirects that were created previously have been assigned to the default site, the ID of which is `1000` for each merchant store.

The new V3 Redirects API services multi-storefront use cases and provides several of the efficiency benefits that V3 APIs offer in comparison with their V2 equivalents. The V3 Redirects API has `site_id` as a required parameter.

If your application reads redirects-related data, be sure to filter by the appropriate `site_id` when dealing with a particular site. Similarly, when writing new redirects, be sure to provide the correct `site_id`.

### Themes

Previously, the [Activate store theme](/api-reference/store-management/themes/theme-actions/activatestoretheme) endpoint accepted a `variation_id` and a `which` value. This has changed.

Because we now support installing different themes and/or theme configurations for each storefront, you must now _instead_ supply a `site_id` and `configuration_id` to indicate the storefront to which you wish to apply a theme and a corresponding configuration.

![themes-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/themes-diagram.webp)
[Themes API documentation](/api-reference/store-management/themes)

To understand which theme is active for a particular site, you can check the [Get active theme](/api-reference/store-management/channels/channel-active-theme/getchannelactivetheme) endpoint.

Themes themselves remain "global" to the store, but each theme now exposes a list of configuration settings. Each theme has a default configuration, but you can use the store control panel's Page Builder feature in the BigCommerce control panel to apply a different configuration to a storefront. 

<!-- theme: info -->
> #### Themes API roadmap
> Our Themes API roadmap includes the following: 
> * Exposing an endpoint to create a new theme configuration
> * Adding a `download_url` query parameter to the [Get all themes](/api-reference/store-management/themes/themes/getstorethemes) endpoint

Currently, you can use the [Download a theme](/api-reference/store-management/themes/theme-actions/downloadtheme) endpoint to download a theme. This will create a download job. 

<!-- TODO: test link -->
Because each theme can define its own configuration, the response from the [Get theme configurations](/api-reference/store-management/themes/theme-configurations/getthemesuuidconfigurations) endpoint may differ for each theme. Valid configurations match the theme's schema. You can use the [Validate theme configurations](/api-reference/store-management/themes/theme-configurations/postthemesuuidconfigurationsvalidate) endpoint to validate a potential configuration against the theme's schema.

### Subscribers

[Subscribers API documentation](/api-reference/store-management/subscribers)

Each subscriber now has an `origin_channel_id` property that identifies the channel on which the subscriber consented to receive a newsletter. When not supplied, the `origin_channel_id` will default to `1`. To comply with electronic consent and privacy regulations, we recommend that your implementation specify the `origin_channel_id` for every subscriber.

If your application deals with subscribers, be sure to check the `origin_channel_id` to understand exactly where the subscriber signed up. If you are integrating with an email marketing system, you may want to allow the merchant to pick which email lists will be used for which channels.

<!-- theme: info -->
> #### Subscriber webhooks roadmap
> Our roadmap includes augmenting subscriber webhooks with an `origin_channel_id`, so that new subscriptions can be added to the email list that corresponds with the subscriber's channel.
