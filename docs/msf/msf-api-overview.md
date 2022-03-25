# Overview

## How BigCommerce is evolving to support multi-channel and multi-storefront selling

BigCommerce's platform is evolving to better service sophisticated merchants who wish to maintain multiple eCommerce websites (storefronts) and who may also sell on other types of channels such as Amazon, eBay, point-of-sale (POS) systems, and so on.

To this effect, a new release is planned which enables "Multi-Storefront", in which a merchant is no longer limited to serving a single storefront website from a single BigCommerce store, but instead can maintain multiple websites. For each site, they have an opportunity to configure & customize many aspects of the shopping experience in order to support multiple distinct brands (from a shopper's perspective). To this end, many of the existing elements of BigCommerce's data model have to evolve to support these new dimensions.

This guide provides an overview of both the brand-new concepts introduced to BigCommerce in order to support these multi-storefront (and multi-channel, where relevant) use cases, as well as extensions to existing parts of our data model necessary to service these cases.

It is our goal to launch these new features with no breaking changes to the platform, meaning that existing single-storefront merchant stores will continue to function identically, and the existing APIs will continue to function as they did previously for these stores. However, there are several additive changes to the platform that our partners must adapt to in order to provide the full support for multi-storefront features that will be expected by these most sophisticated merchants. With this guide, we hope to make this process as easy as possible, and provide guidance in terms of how applications might change to support multi-storefront and multi-channel selling.

## New objects & endpoints introduced

![channels-sites-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/channels-sites-diagram.webp)

### Channels

[Channels API documentation](https://developer.bigcommerce.com/api-reference/store-management/channels)

**Channel** - A place where the merchant sells products. This could be a storefront website, a marketplace such as Amazon or eBay, a POS system, a marketing feed, or a "Custom" channel which may not fit into one of these types. Merchants create new Channels when they wish to sell in a new context. Channels are useful to organize a merchant's complex business, and can be used to attach many other objects which are related to a particular shopper's experience on the Channel. A channel is defined by:

- A name, which is merchant-defined and not exposed publicly (used for organization)
- A `type`, which may be `storefront`, `marketing`, `pos`, `marketplace` or `custom`
- A `platform`, which indicates on which platform the channel is primarily experienced by a shopper.

Consider the [Channels API documentation](https://developer.bigcommerce.com/api-reference/store-management/channels) for more information on valid combinations of `type` and `platform`.

A Stencil storefront (meaning a storefront served directly by BigCommerce) will have a type of `storefront` and a platform of `bigcommerce`.

Each BigCommerce store is provisioned with 1 Channel from the moment of its creation, intended for its first Stencil storefront. The ID of this Channel will be `1` on all BigCommerce stores. This "default channel" may also be used with certain features for backwards compatibility when a more specific Channel cannot be determined. For example, orders created using the V2 Orders API, if they do not supply a specific Channel ID at the moment of creation, will be assumed to be orders for Channel ID `1`.

The default Channel (ID `1`) cannot be deleted.

When upgrading your application to support multi-channel functionality, it may make sense to provide merchants with an opportunity to configure how your app behaves differently for each Channel on which they sell. It may also be the case that your application is only relevant to certain Channel types (for example, the `storefront` type, or only `storefront` type Channels on the `bigcommerce` platform), so it's a good idea to fetch the list of Channels immediately after your app's installation to understand if your application is compatible with the merchant's current Channels and surface this information appropriately to users.

### Sites

[Sites API documentation](https://developer.bigcommerce.com/api-reference/store-management/sites)

**Site** - A website which is owned or controlled exclusively by the merchant, usually for purposes of hosting a storefront website. A Site will always be tied to exactly one Channel, although there is no requirement for Channel to have a Site. Sites are mainly relevant to `storefront`-type Channels, and they serve as a container for settings and objects that only apply to websites.

A Site is defined by:

- A `channel_id` for the Channel it is the website for.
- A `url` which indicates the public URL of the site.

A Stencil storefront, in addition to having a Channel of type `storefront` and platform `bigcommerce`, will also have a Site.

The first Stencil storefront that is provisioned with new BigCommerce stores has an ID of `1000` on each store, and this default Site cannot be deleted.

When upgrading your application to support multi-storefront functionality, you should first determine if your application is only relevant to native Stencil storefronts served by BigCommerce, or if it can also support "headless" storefronts that may be served by other platforms. Based on this, you may wish to show merchants an appropriate list of Sites when setting up your application, and allow configuration of your application differently for each storefront Site.

### Settings & Configuration

[Settings API Overview](/settings-overview)

[Settings API Documentation](https://developer.bigcommerce.com/api-reference/store-management/settings)

A new set of Settings APIs are being exposed which will allow reading and writing many important elements of the store's configuration, both globally and on the basis of Channel. If your application is in the business of managing settings, you can use these endpoints to assist merchants in the configuration of new Channels complete with appropriate settings. On the other hand, you may wish to simply respect the settings that a merchant has configured in their store to control details of your application's behavior, in which case these APIs allow you to read the current state of settings both globally and on a per-channel basis.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the relevant settings for a given shopper, in real-time.

For a deep-dive into this new class of APIs, see our [Settings API Overview](/settings-overview).

