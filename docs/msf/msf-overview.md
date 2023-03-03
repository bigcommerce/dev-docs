# Introduction to Multi-Storefront

Some merchants want to sell their products in different places. They may want to maintain multiple website-based eCommerce storefronts, or sell products from their store's catalog on other channels, such as Amazon, eBay, in-person POS (point-of-sale) systems, and so on.

Multi-storefront capabilities extend the reach of BigCommerce stores. Merchants are no longer relegated to selling from a single storefront website. They can maintain multiple websites, on which they can configure and customize the look, feel, pricing, and organization of the shopping experience to support multiple distinct brands or sales goals. To this end, BigCommerce's data model has evolved significantly to support these new dimensions.

We intend to provide these new features with no breaking changes to the platform so that existing single-storefront merchant stores continue to function as they did previously, and the existing APIs function as before for these stores. However, there are several additive changes to the platform. To provide the full multi-storefront, multi-channel support that merchants with complex stores expect and require, our partners must adapt.

This guide provides an overview of the core features that power multi-storefront, multi-channel stores. Our [Multi-Storefront API Guide](/api-docs/multi-storefront/api-guide) and [Multi-Storefront App Compatibility and Optimization](/api-docs/apps/multi-storefront) article provide guidance on how developers can modify and reimagine applications to support multi-storefront, multi-channel selling.

![channels-sites-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/channels-sites-diagram.webp)

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
> In some cases when a more specific channel cannot be associated with an interaction, channel `1` may be used for backwards compatibility. For example, orders created using the V2 Orders API that do not specify a channel ID will be associated with channel `1`.

To learn more about upgrading your application to support multi-channel sales, see [Multi-Storefront App Compatibility](/api-docs/apps/multi-storefront#upgrading-existing-apps).

## Sites

[Sites API documentation](/api-reference/store-management/sites)

A **site** is a website owned or controlled exclusively by the merchant, usually for hosting a storefront website. Every site will be tied to exactly one channel, but because not all sales channels are sites, channels are not required to have a site. Sites are mainly relevant to storefront-type channels, and they serve as containers for settings and objects that only apply to websites.

Every site must have the following properties:

* The `channel_id` of the sales channel associated with the site
* A `url`, which is the public-facing URL of the site

Every Stencil storefront has a site, in addition to having a channel of type `storefront` and a platform of type `bigcommerce`.

The first Stencil storefront of each merchant store has an ID of `1000` and is also known as the default site. It cannot be deleted.

To learn more about upgrading your application to support multi-storefront functionality, see [Multi-Storefront App Compatibility](/api-docs/apps/multi-storefront#upgrading-existing-apps).

## Settings & Configuration

[Settings API Documentation](/api-reference/store-management/settings)

The Settings APIs now allow your app to read and write many important elements of the store's configuration, both globally and on a per-channel basis. If your application manages settings, you can use these endpoints to enable merchants to configure different settings for different channels. You may also wish to read and respect any merchant-configured settings that control details of your application's behavior.

If your application interacts with shoppers, you may be able to use the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the relevant settings for a given shopper in real time.

For a deep dive into this new class of APIs, see our [Settings API Overview](/api-docs/store-management/settings).

## Resources
* [Multi-Storefront API Guide](/api-docs/multi-storefront/api-guide)
* [Multi-Storefront App Compatibility and Optimization](/api-docs/apps/multi-storefront)
* [Settings API Overview](/api-docs/store-management/settings)
