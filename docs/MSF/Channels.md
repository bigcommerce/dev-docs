# Channels

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
