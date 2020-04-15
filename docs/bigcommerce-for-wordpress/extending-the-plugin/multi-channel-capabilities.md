# Multi-Channel Capabilities

<div class="otp" id="no-index">

### On this Page
- [Enabling Multi-Channel Views](#enabling-multi-channel-views)
- [Displaying Multi-Channel Views](#displaying-multi-channel-views)
- [Common Use Cases](#common-use-cases)
- [FAQ](#faq)
- [Resources](#resources)

</div>

One of the key characteristics of a multi-channel architecture is that multiple user-facing experiences share a single backend. With BigCommerce for WordPress, and with other channel integrations built on BigCommerce, that single backend is BigCommerce, which is the source of truth for the catalog, orders, and customers.

A single product might be listed on several channels, and across those channels, the product details may vary. For example, a pair of sneakers that’s sold on a site serving the US region might have a different price and description than the pair that is sold on the French site. But despite those variations, there is a single product record for the pair of sneakers which is managed from the BigCommerce control panel. Similarly, orders placed on different channels all flow into a single admin view within BigCommerce, and each order is attributed back to its channel source. This allows you to maintain a central source of truth for managing your orders, while tracking sales performance across various channels. No need to jump around into different accounts!

## Enabling Multi-Channel Views
Added support for connecting to multiple BigCommerce channels. Since the plugin can't know the particular use case a store has for using multiple channels, we provide the base framework for site developers to extend in a way that makes sense for their business. Multi-channel support requires opt-in using a filter:

```php
add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );
```

## Displaying Multi-Channel Views

This will enable an admin to connect to multiple channels on the settings screen. The primary channel will still be used for all front-end requests unless filtered to use a different channel. Example:

```php
add_filter( 'bigcommerce/channel/current', function( $channel ) {
    // do some logic here to determine what channel to use
    return get_term( 697, \BigCommerce\Taxonomies\Channel\Channel::NAME );
});
```

## Common Use Cases
Multi-region. Businesses with a global footprint have the need to tailor product merchandising to the regions where they do business, which means translating product details into the local language and showing prices in the proper currency.

You could potentially build multi-store experiences around a range of broader use cases including B2B scenarios like separate wholesale and retail sites or “vendor portals”, featuring a product catalog specific to each vendor.

## FAQ

**How does BigCommerce for WordPress sync changes made to products in BigCommerce?**
In the past, if you made a change to a single product you would have to re-sync your entire catalog to copy the changes to WordPress. Now each product has a Sync button in the admin area so you can initiate a sync on a given product.

**What is the taxonomy for storing channels?**
Most stores will only have one, but a store with multi-channel enabled may have many. The taxonomy’s UI is hidden, and it is only exposed during onboarding (when selecting the initial channel) and in the Channel Settings section when multi-channel is enabled. All products are associated with a channel term on import.

## Resources
* https://github.com/bigcommerce/bigcommerce-for-wordpress
* https://medium.com/bigcommerce-developer-blog/new-release-bigcommerce-for-wordpress-3-1-0-9bbe436153d8
* https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9