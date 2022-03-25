# Multi-Storefront App Compatibility

To make sure your app is compatible with stores with multiple BigCommerce storefront channels, verify your app meets *applicable* or *relevant* requirements before submitting it for approval.

## Setup and channels configuration

1. Users can install and load the app in a store with multiple BigCommerce storefront channels.
2. The app makes API requests to [Channels](https://developer.bigcommerce.com/api-reference/store-management/channels) endpoints to get available BigCommerce storefront channels.
3. The app makes API requests to [Sites](https://developer.bigcommerce.com/api-reference/store-management/sites) endpoints to get sites associated with BigCommerce storefront channels.
4. The app settings acknowledge multiple storefronts within the app.

## Catalog and orders

1. Products synced to the app include correct channel assignments. For more information on retrieving channel assignments for products, see [Products](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjU0OTY1MDE-products).
2. Categories synced to the app include correct channel assignments. For more information on identifying the category tree tied to each storefront channel, see [Categories](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjg3NjcxOTA-categories).
3. Orders synced to the app include correct channel assignments. For more information on how to retrieve the `channel_id` of orders, see [Orders](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjI1MDM3NDg-orders).
4. Customers synced to the app include correct channel access permissions within the app. For more information, see [Customers](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjM3ODMxNzk-customers).
5. Orders written to BigCommerce through API requests include correct storefront channel assignments. For more information, see [Orders](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjI1MDM3NDg-orders).

## Storefront content

1. Scripts installed using the Scripts API include correct storefront site assignments. For more information on assigning a script to a site using the `site_id` property, see [Scripts](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#scripts).
2. Installed tracking scripts or pixels are unique per BigCommerce storefront channel. For more information, see [Scripts](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#scripts) and [Update a Web Analytics Provider](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQxNzE-update-a-web-analytics-provider).
3. Users can use any storefront content or features created by the app on a single storefront or multiple storefronts. For more information, see [Storefront Content](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content).
4. Users can install widgets created by the app on a single storefront or multiple storefronts. For more information, see [Widgets](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#widgets).
5. Themes synced to the app include correct storefront site assignments within the app. For more information, see [Themes](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#themes).
6. Themes published to BigCommerce include options for a single storefront or multiple storefronts. For more information, see [Themes](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#themes).
7. Custom template files synced to the app include correct storefront assignments within the app. For more information, see [WidgetTemplate](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/c2NoOjExNjk0MDE2-widget-template).
8. Custom template files written to BigCommerce include options for a single storefront or multiple storefronts. For more information, see [WidgetTemplate](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/c2NoOjExNjk0MDE2-widget-template).
9. Web pages synced to the app include correct storefront assignments within the app. For more information on filtering by `site_id` when retrieving pages, see [Pages](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#pages).
10. Web pages written to BigCommerce include options for a single storefront or multiple storefronts. For more information on providing a `site_id` when writing new pages, see [Pages](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#pages).
11. Carts tracked in the app or created by the app include a correct `channel_id`. For more information, see [Cart and Checkout](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzEz-cart-and-checkout).

## Other

1. BigCommerce store settings synced to the app include correct storefront channel assignments. For more information, see [Store Settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIy-store-settings).
2. Newsletter subscribers synced to the app include correct storefront channel assignments. For more information, see [Subscribers](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjQ0NjQ2MDA-subscribers).
3. Currencies synced to the app include correct storefront assignments. For more information on viewing and updating currency properties, see the [Store Information](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/c2NoOjExNjk0MDA1-store-information) object reference.
4. 301 redirects written to or synced from BigCommerce include correct storefront `site_id` assignments. For more information, see [301 Redirects](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/ZG9jOjExNjkzNzIz-storefront-content#301-redirects).
5. Transactional emails written to or synced from BigCommerce include correct storefront `channel_id` assignments. For more information, see [Update Transactional Email Settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQxOTA-update-transactional-email-settings) and [Get Transactional Email Settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQxODk-get-transactional-email-settings).
6. Abandoned cart emails written to or synced from BigCommerce include correct storefront `channel_id` assignments. For more information, see [Update Channel Abandoned Cart Settings](https://bigcommerce.stoplight.io/docs/api-beta-multi-storefront/b3A6MTE2OTQwNDA-update-channel-abandoned-cart-settings).