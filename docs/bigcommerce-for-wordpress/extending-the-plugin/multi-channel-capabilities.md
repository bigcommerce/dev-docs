# Multi-Channel Capabilities

<div class="otp" id="no-index">

### On this Page
- [Enabling Multiple Channels](#enabling-multiple-channels)
- [Switching Channels](#switching-channels)
- [Plugin Example](#plugin-example)
- [FAQ](#faq)
- [Resources](#resources)

</div>


![All Product US](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-channel-capabilities-1.png)
![All Product UK](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-channel-capabilities-2.png)

One of the key characteristics of a multi-channel architecture is that multiple user-facing experiences share a single backend. With BigCommerce for WordPress, and with other channel integrations built on BigCommerce, that single backend is BigCommerce, which is the source of truth for the catalog, orders, and customers.

A single product might be listed on several channels, and across those channels, the product details may vary. For example, a pair of sneakers that’s sold on a site serving the US region might have a different price and description than the pair that is sold on the French site. But despite those variations, there is a single product record for the pair of sneakers which is managed from the BigCommerce control panel. Similarly, orders placed on different channels all flow into a single admin view within BigCommerce, and each order is attributed back to its channel source. This allows you to maintain a central source of truth for managing your orders, while tracking sales performance across various channels. No need to jump around into different accounts!

Multi-region. Businesses with a global footprint have the need to tailor product merchandising to the regions where they do business, which means translating product details into the local language and showing prices in the proper currency.

You could potentially build multi-store experiences around a range of broader use cases including B2B scenarios like separate wholesale and retail sites or “vendor portals”, featuring a product catalog specific to each vendor.

## Enabling Multiple Channels

Multi-channel capabilities can be enabled with the addition of a BigCommerce for WordPress specific filter:

```php
add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );
```

This will enable an admin to connect to multiple channels on the settings screen. The primary channel will still be used for all front-end requests unless filtered to use a different channel.

## Switching Channels

Once multi-channel support is enabled and multiple channels are connected via BigCommerce settings in the WordPress admin, the channel displayed to shoppers on the front-end can be toggled with the following filter:

```php
add_filter( 'bigcommerce/channel/current', function( $channel ) {

    // add logic here to determine the channel to use
    // note: replace '31' with the WordPress term_id of your connected channel
    return get_term( 31, \BigCommerce\Taxonomies\Channel\Channel::NAME );
});
```

The filter above displays the connected channel associated to the WordPress `term_id` passed to `get_term()` (`31` in the example). An easy way to find your connected channel's `term_id` is by hovering over the **Make Primary** link in BigCommerce Channel Settings in the WordPress Admin (note the `term_id` shown in the URL indicated by the red arrow):

![Geting the term_id](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-channel-capabilities-0.png)

## Plugin Example

A common use case for multiple channels and storefronts is offering differentiated shopping experiences for multiple geographic regions (ex: a UK and US storefronts with different translations, currencies, products, and pricing). With BigCommerce for WordPress's multi-channel capabilities, its possible to create a multi-region storefront using a single WordPress instance powered by a BigCommerce back-end. To demonstrate, this section provides steps to creating a simple plugin for switching channels and currency symbols via query string parameters.

### Prerequisites
* Familiarity with developing WordPress plugins
* BigCommerce store with at least two channels
* Admin access to a WordPress instance with BigCommerce for WordPress installed
* Ability to edit WordPress instance files locally or via FTP

### Step 1: Setup Directory Structure

In your WordPress instance's `wp-content/plugins/` dir:
1. create a new directory called `query-string-activation`
2. in the `query-string-activation` create a new file called `query-string-region-activation.php`

Once finished, your directory structure should look something like this:

```bash
.
├── wp-content                                       # WP instance wp-content dir
|    ├── plugins                                     # WP instance plugins dir
|    |   ├── bigcommerce                             # BigCommerce for WordPress Plugin
│    |   ├── query-string-activation                 # Example Child Plugin
│    |   |   └── query-string-region-activation.php
|    |   ├── ...
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> ### Note
> * For more information on editing WordPress and plugin files, see [Editing Files](https://wordpress.org/support/article/editing-files/) (wordpress.org).

</div>
</div>
</div>

### Step 2: Connect Channels

### Step 2: Add Plugin Code

Using your favorite code editor, copy and paste the following source code into `query-string-region-activation.php`:

```php
<?php
/**
 * Plugin Name: BC4WP: Query String Region Activation
 * Plugin URI: http://www.bigcommerce.com/wordpress
 * Description: Proof of concept for region activation by query string
 * Version: 0.5
 * Author: BigCommerce
 * Author URI: http://www.bigcommerce.com
 */

// Enable multi channel
add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );

// If ?region=uk
if ( $_GET[ 'region' ] !== 'us' && ($_GET[ 'region' ] === 'uk' || strpos($_SERVER['HTTP_REFERER'], 'region=uk') !== false) ) {

	// switch to the UK channel
	add_filter( 'bigcommerce/channel/current', function( $channel ) {
		// Change 31 to the wordpress term id of your channel
		return get_term( 31, \BigCommerce\Taxonomies\Channel\Channel::NAME );
	}, 10, 1 );

	// set currency code to GBP
	add_filter( 'pre_option_' . 'bigcommerce_currency_code', function() {
		return 'GBP';
	}, 10, 0 );

	// Set currency symbol to £
	add_filter( 'pre_option_bigcommerce_currency_symbol', function() {
		return '£';
	}, 10, 0 );
}
```



## FAQ

**How does BigCommerce for WordPress sync changes made to products in BigCommerce?**
In the past, if you made a change to a single product you would have to re-sync your entire catalog to copy the changes to WordPress. Now each product has a Sync button in the admin area so you can initiate a sync on a given product.

**What is the taxonomy for storing channels?**
Most stores will only have one, but a store with multi-channel enabled may have many. The taxonomy’s UI is hidden, and it is only exposed during onboarding (when selecting the initial channel) and in the Channel Settings section when multi-channel is enabled. All products are associated with a channel term on import.

## Resources
* https://github.com/bigcommerce/bigcommerce-for-wordpress
* https://medium.com/bigcommerce-developer-blog/new-release-bigcommerce-for-wordpress-3-1-0-9bbe436153d8
* https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9