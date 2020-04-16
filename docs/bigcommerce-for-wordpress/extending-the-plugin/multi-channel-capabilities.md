# Multi-Channel Capabilities

<div class="otp" id="no-index">

### On this Page
- [Enabling Multiple Channels](#enabling-multiple-channels)
- [Switching Channels](#switching-channels)
- [Plugin Example](#plugin-example)
- [Step 1: Setup Directory Structure](#step-1-setup-directory-structure)
- [Step 2: Connect Channels](#step-2-connect-channels)
- [Step 2: Add the Plugin Code](#step-2-add-the-plugin-code)
- [Developing Further](#developing-further)
- [FAQ](#faq)
- [Resources](#resources)

</div>

Since version `3.1.0`, BigCommerce for WordPress is capable of managing multiple channels (and displaying different product listings for each channel) from within a single WordPress site. This makes it possible to have multiple storefronts on a single WordPress instance with BigCommerce serving as headless commerce back-end.

This article explains how to enable and make use of BigCommerce for WordPress's multi-channel capabilities. The first two sections briefly note the the filters required to enable and use the functionality; then, in [Plugin Example](#plugin-example), a more in-depth demonstration with example code is provided. For longer discussion on multi-storefront use cases and additional examples, see [Build a Multi-Region Storefront with BigCommerce for WordPress 3.1.0+](https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9) on our [Developer Blog](https://medium.com/bigcommerce-developer-blog)

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
* BigCommerce store with at least two channels and products in each channel
* Admin access to a WordPress instance with BigCommerce for WordPress installed
* Ability to edit WordPress instance files locally or via FTP

## Step 1: Setup Directory Structure

In your WordPress instance's `wp-content/plugins/` directory:
1. create a subdirectory called `query-string-activation`
2. in the `query-string-activation` subdirectory, create a file called `query-string-region-activation.php`

Once finished, the directory structure should look as follows:

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

## Step 2: Connect Channels

Add and connect the desired channels in **WordPress Admin > BigCommerce > Settings > Channels** and make note of the `term_id` in the URL when hovering over **Make Primary**:

![Getting the term_id](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-channel-capabilities-0.png)

In the example screenshot above, we've created and connected two channels:
1. a `US` channel with `term_id` `32` (primary), and
1. a `UK` channel with `term_id` `31`

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> ### Note
> * The `term_id`s for your channels will probably be different

</div>
</div>
</div>

## Step 2: Add the Plugin Code

Now that we've connected two channels and made note of the `term_id`s, we're ready to begin coding.

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

// Enable multi channel capabilities
add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );

// If ?region=uk
if ( $_GET[ 'region' ] !== 'us' && ($_GET[ 'region' ] === 'uk' || strpos($_SERVER['HTTP_REFERER'], 'region=uk') !== false) ) {

	// switch to the uk channel
	add_filter( 'bigcommerce/channel/current', function( $channel ) {

        // NOTE: change 31 to the  term_id of your channel
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

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> ### Note
> * replace `31` in `get_term()` above with the `term_id` if your channel
> * change `uk`, `GBP`, and `£` to the country code and currency corresponding to your channel, as desired

</div>
</div>
</div>

Here's what's happening in the example code:
1. First enable multi-channel capabilities with `add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );`
2. Then, there's an `if` statement to check the value of the `?region=` query string from the browser:
   * If the value is **NOT** `us` and **IS** `uk`, filter to channel with `term_id=31` (UK in this case)
      * change currency code to `GBP` (British pound sterling).
      * change the currency symbol to `£`

Once everything is configured correctly, we can test by navigating to **All Products** (`/products/`) on the WordPress storefront (note the product and currency symbol):

![All Product US](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-channel-capabilities-1.png)

Now let's switch the channel and currency symbol by passing in `region=uk` in the query string (notice product and currency symbol have changed):

![All Product UK](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-channel-capabilities-2.png)

## Developing Further

Obviously, the example plugin above is simple and not super useful as-is; however, its a starting point to creating rich, multi-storefront shopping experiences.

For additional implementation ideas (such as adding a region selection dropdown and switching regions based on a shopper's geo IP), checkout how to [Build a Multi-Region Storefront with BigCommerce for WordPress 3.1.0+](https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9) on our developer blog.

## FAQ

**How does BigCommerce for WordPress sync changes made to products in BigCommerce?**
In the past, if you made a change to a single product you would have to re-sync your entire catalog to copy the changes to WordPress. Now each product has a Sync button in the admin area so you can initiate a sync on a given product.

**What is the taxonomy for storing channels?**
Most stores will only have one, but a store with multi-channel enabled may have many. The taxonomy’s UI is hidden, and it is only exposed during onboarding (when selecting the initial channel) and in the Channel Settings section when multi-channel is enabled. All products are associated with a channel term on import.

## Resources

**BigCommerce**
* [BigCommerce for WordPress Repo](https://github.com/bigcommerce/bigcommerce-for-wordpress) (GitHub)
* [New Release: BigCommerce for WordPress 3.1.0](https://medium.com/bigcommerce-developer-blog/new-release-bigcommerce-for-wordpress-3-1-0-9bbe436153d8) (BigCommerce Dev Blog)
* [Build a Multi-Region Storefront with BigCommerce for WordPress 3.1.0+](https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9) (BigCommerce Dev Blog)

**Other Resources**
* [Editing Files](https://wordpress.org/support/article/editing-files/) (wordpress.org)