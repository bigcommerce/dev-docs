# Multi-Storefront App Compatibility

Compatible versus optimized

Compatible - works with the data from all storefronts and other sales channels associated with a store
* Your app can handle the basic structural functions of an app -- see the app guide, esp [handling callbacks]()
* Your app is *channel aware* - can work intelligently with the configuration nuances of multiple storefronts and other sales channels

Optimized - in addition to being channel-aware, optimized apps are *channel extensible*. They offer features that allow merchants and other users to configure parameters that are unique to each channel, over and above the offerings of BC. 

The features that will make an app channel-optimized depend exclusively on its use cases, so this guide focuses primarily on ensuring that your app meets the *relevant* requirements before you submit it for approval.

When upgrading your application to support multi-channel functionality, it may make sense to provide merchants with an opportunity to configure how your app behaves differently for each Channel on which they sell. It may also be the case that your application is only relevant to certain Channel types (for example, the `storefront` type, or only `storefront` type Channels on the `bigcommerce` platform), so it's a good idea to fetch the list of Channels immediately after your app's installation to understand if your application is compatible with the merchant's current Channels and surface this information appropriately to users.

## Setup and channels configuration

Ensure that your app's settings acknowledge multiple storefronts and convey that understanding to the merchant or authorized user. Your app's features should work with any subset of a merchant's channels, including a single channel, some of their channels, or across all the channels in their store. 

In testing, make sure that users can install and load the app in a store with multiple BigCommerce storefront channels. Use [Channels](/api-reference/store-management/channels) endpoints to work with basic data about the store's channels. Use [Sites](/api-reference/store-management/sites) endpoints to work with the channels' sites.


## Reading from and writing to multiple channels

An app that functions correctly with a store's multi-channel product catalog and customer base must be able to handle the following complexity. Ensure that your app meets these criteria before submitting it for approval.

1. Products synced to the app should include correct channel assignments. Read more about [retrieving product channel assignments](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjU0OTY1MDE-products). Merchants who use your app to create products should be able to assign them to one or more channels.
   
2. Categories synced to the app should include correct channel assignments. Read more about [identifying the category tree](/api-docs/multi-storefront/api-guide#categories) that's active on a sales channel. Your app should allow merchants to integrate new categories individually into each target channel's active category tree.
   
3. Orders synced to the app should include correct channel assignments. Orders that your app creates should include correct storefront channel assignments. Your app should be able to assign new orders to one or more channels. Read more about [channel-aware orders](/api-docs/multi-storefront/api-guide#orders).
   
4. Customers synced to the app should include correct channel access permissions within the app. If your app creates any new customers, it should be able to assign them to one or more channels. Read more about [customers and channels](/api-docs/multi-storefront/api-guide#customers). Customer groups synced to the app should also include correct channel assignments. If your app creates any new customer groups, it should be able to assign them to one or more channels.

<!-- theme: info -->
> #### Price lists
> Price lists have been substantially upgraded to support multi-channel sales. Read more about [channel-aware price lists](/api-docs/multi-storefront/api-guide#price-lists) 

## Storefront content

All storefront content that your app creates should be assigned to the channel of the merchant's choosing. Merchants should be able to customize storefront content on a channel-by-channel basis.

1. Scripts installed using the Scripts API should include correct storefront site assignments. Read more about using the `site_id` to [assign a script to a site](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#scripts).

2. Tracking scripts and pixels should be unique to each storefront or other sales channel. Read more about [scripts](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#scripts) and consult the [Update a web analytics provider](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQxNzE-update-a-web-analytics-provider) endpoint.

3. If your app creates storefront content or features, merchants should be able to make it accessible on one or more channels. Read more about [channel-aware storefront content](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content).

4. Any widgets that your app creates should be available on one or more storefronts. Read more about [channel-aware widgets](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#widgets).

5. Themes synced to the app should include correct storefront site assignments. Published themes should include configuration options for any subset of storefronts. Read more about [channel-aware themes](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#themes).

6. Custom template files synced to the app should include correct storefront assignments. Custom template files that the app creates should include configuration options for one or more storefronts. Read more about [widget template objects](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/c2NoOjExNjk0MDE2-widget-template).

7. Pages synced to the app should include correct storefront assignments. Pages that the app creates should include configuration options for one or more storefronts. Read more about [working with pages' site_id property](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#pages).

8.  Carts that the app tracks or creates should include the correct `channel_id`. Read more about [channel-aware carts and checkout](/api-docs/multi-storefront/api-guide#cart-and-checkout).

## Additional settings and content

1. BigCommerce store settings synced to the app should include the correct channel assignments. Merchants should be able to configure store settings that the app creates for one or more channels. Read more about [managing store configuration](/api-docs/store-management/settings).

2. Newsletter subscribers synced to the app should include the correct storefront channel assignments. Merchants should be able to assign any subscribers that the app creates to one or more channels. Read more about [subscribers](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjQ0NjQ2MDA-subscribers).

3. Currencies synced to the app should include correct channel assignments. Merchants should be able to ensure that currency modifications that the app makes apply to the channel or channels of their choosing. Consult the [store information object reference](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/c2NoOjExNjk0MDA1-store-information) to learn more about viewing and updating currency properties.

4. 301 redirects synced from or written to a merchant's store must include the correct storefront's `site_id`. Read more about [channel-aware 301 redirects](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#301-redirects).

5. Transactional emails synced from or written to a merchant's store should include the correct `channel_id`. Consult the reference for the [Get transactional email settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQxODk-get-transactional-email-settings) and [Update transactional email settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQxOTA-update-transactional-email-settings) endpoints.

6. Abandoned cart emails synced from or written to a merchant's store should include the correct `channel_id`. Consult the reference for the [Update channel abandoned cart settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQwNDA-update-channel-abandoned-cart-settings) endpoint.
