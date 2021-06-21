# Guides

<div class="otp" id="no-index">
	
### On this page

- [Importing and syncing](#importing-and-syncing)
- [Performance](#performance)
- [Styling and templates](#styling-and-templates)
- [Extending BC4WP](#extending-bc4wp)

</div>

## Importing and syncing
### CLI setup instructions

The import process will run faster and more reliably if run from the command line.

1. Ensure that your host has [WP-CLI](https://wp-cli.org/) installed and configured to manage your WordPress site.

2. The initial import will likely take longer than subsequent imports. Run the following command for the first import: 
`wp bigcommerce import products`

3. Set up a system cron job to run the import at your desired frequency. For example, to run every 10 minutes:
`*/10 * * * * /usr/bin/wp bigcommerce import products --quiet > /dev/null 2>&1`

This does not disable the WordPress cron-based import process. As long as the CLI import runs more frequently than the import configured on the settings screen, the cron-based import should never be triggered. In the event that both are running concurrently, safeguards are in place to ensure that only one process runs at a time.

![Product Sync](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/cli-setup-instructions.png)

Subsequent imports will only update products that have changed since the last import. To force an update on all products, add the `--force` flag to the import command:

`wp bigcommerce import products --force`

### Set up and recommendtions for cron

WordPress sites will generally operate more efficiently if WordPress's default cron is disabled and replaced with a server-side cron job.

To disable WordPress's default cron, follow these steps:

1. Set a constant in `your wp-config.php`:
`define( 'DISABLE_WP_CRON', true );`

2. Set up a system cron job to run WordPress's cron events from the command line:
`* * * * * /usr/bin/wp cron event run --due-now --quiet > /dev/null 2>&1`
Running the job every minute is generally recommended.

## Performance
### Stop unnecessary webhooks

BigCommerce contains a number of webhooks that your site may benefit from. We recommend disabling unused webhooks to enhance performance. To disable the webhooks you do not need, use the [Webhooks API](https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview) and update the `is_active` fields to false.

Because webhooks are associated by client ID, make sure you are using BigCommerce for WordPress API credentials to make these Webhook API calls.

## Styling and templates
### Localizing strings displayed on the storefront

You can localize the language used by BC4WP to display messages on your storefront. The array `$js_i18n_array` defined in `src/BigCommerce/Assets/Theme/JS_Localization.php:19` contains all strings used by `assets/js/dist/scripts.js` to display messages on the front-end.

```php
$js_i18n_array = [
			'operations' => [
				'query_string_separator' => __( '&', 'bigcommerce' ),
			],
			'cart'       => [
				'items_url_param'          => '/items/',
				'mini_url_param'           => '/mini/',
				'quantity_param'           => 'quantity',
				'message_empty'            => __( 'Your cart is empty.', 'bigcommerce' ),
				'continue_shopping_label'  => esc_html( $empty_cart_data[ Cart_Empty::LINK_TEXT ] ),
				'continue_shopping_url'    => esc_url( $empty_cart_data[ Cart_Empty::LINK ] ),
				'cart_error_502'           => __( 'There was an error with your request. Please try again.', 'bigcommerce' ),
				'add_to_cart_error_502'    => __( 'There was an error adding this product to your cart. It might be out of stock or unavailable.', 'bigcommerce' ),
				'ajax_add_to_cart_error'   => __( 'There was an error adding this product to your cart.', 'bigcommerce' ),
				'ajax_add_to_cart_success' => __( 'Product successfully added to your cart.', 'bigcommerce' ),
				'mini_cart_loading'        => __( 'Loading', 'bigcommerce' ),
				'shipping_calc_error'      => __( 'There was an error calculating your shipping cost. Please try again.', 'bigcommerce' ),
			],
			'account'    => [
				'confirm_delete_message' => __( 'Are you sure you want to delete this address?', 'bigcommerce' ),
				'confirm_delete_address' => __( 'Confirm', 'bigcommerce' ),
				'cancel_delete_address'  => __( 'Cancel', 'bigcommerce' ),
			],
			'errors'     => [
				'pagination_error'         => __( 'There was an error processing your request. Please try again.', 'bigcommerce' ),
				'pagination_timeout_error' => __( 'The server took too long to complete this request. Please try again.', 'bigcommerce' ),
			],
			'pricing'    => [
				'loading_prices' => __( 'Retrieving current pricing data...', 'bigcommerce' ),
			],
			'inventory'    => [
 				'in_stock' => __( 'in Stock', 'bigcommerce' ),
 				'out_of_stock' => __( 'Out of Stock', 'bigcommerce' ),
			],
			'wish_lists' => [
				'copied' => __( 'Copied!', 'bigcommerce' ),
				'copy_link' => __( 'Copy link', 'bigcommerce' ),
				'copy_success' => __( 'Wish List URL copied to clipboard.', 'bigcommerce' ),
			],
		];
```

As an example of how to localize strings, let's change the message displayed to a user when they add an item to their cart. By default, the message "Product successfully added to your cart." displays. Instead, let's update that language and include a link to your store's cart.

1. Using either a child theme or child plugin, declare a function named `update_add_to_cart_message()` that accepts `$js_i18n_array` as an arguement.
2. Within `update_add_to_cart_message()`, set the new value for the `['ajax_add_to_cart_success']` key located in the nested `['cart']` array to `'Item added to cart. <a href="/cart">View Cart!</a>'`. Note that this is an example and your store's cart might have a different slug than `/cart`.
3. Return the filtered `$js_i18n_array` array using a return statement.

Your `update_add_to_cart_message()` function will look like the following:

```php
function update_add_to_cart_message( $js_i18n_array ){
   $js_i18n_array['cart']['ajax_add_to_cart_success'] = 'Item added to cart. <a href="/cart">View Cart!</a>';
   return $js_i18n_array;
};
```

Following the `update_add_to_cart_message` function, call the `add_filter()` function that is available through the WordPress Plugin API. `add_filter()` hooks a function or method to a specific filter action. Hook `update_add_to_cart_message()` to the `bigcommerce/js_localization` filter hook that is provided by the BC4WP plugin.

```php
add_filter( 'bigcommerce/js_localization', 'update_add_to_cart_message' );
```

Once you save the file, WordPress will now localize the modified string when an item is added to a cart by doing the following:

1. When you apply the `bigcommerce/js_localization` filter hook, `add_filter()` invokes `update_add_to_cart_message()` and `$js_i18n_array` is passed in as an argument.
2. Filter `$js_i18n_array` and update the value for `ajax_add_to_cart_success` to `'Ttem added to cart. <a href="/cart">View Cart!</a>'` before being returned on the following line by our return statement.
3. `Scripts.js` displays this updated string when a user adds an item to their cart.

### Styling checkout

BigCommerce for WordPress offers two possible checkout experiences, depending on whether the WordPress site has an installed SSL certificate.

If no SSL is detected, WordPress redirects shoppers to your BigCommerce checkout page to finish their transaction over a secure connection. If using the redirected checkout, visit our [Stencil documentation](https://developer.bigcommerce.com/stencil-docs/template-files/customize-stencil-checkout/optimized-one-page-checkout) to review all available options for styling the checkout page.

If an SSL is detected, BC4WP seamlessly embeds BigCommerce’s secure one-page checkout through an iFrame on your WordPress checkout page.

### Embedded checkout

Embedded Checkout includes settings within the WordPress theme customizer that allow you to adjust colors to blend the checkout page with your theme. For advanced users, the plugin provides the [Checkout Config hook](https://bigcommerce.moderntribe.qa/reference/hooks/bigcommerce-checkout-config/) to filter all available [Embedded Checkout config options](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutoptions.md) (Github). Because of the method used to load the Embedded Checkout within the iframe, styling checkout must be accomplished by filtering the available `$checkout_config` options rather than targeting element classes or IDs with CSS.

Below, we define a function called `myCheckoutFunction()` that accepts `$checkout_config` as an argument. The function builds an array of checkout config styles that make the checkout step header text red, step number icons blue, and checkout body text green. Finally, we pass `myCheckoutFunction` to the Checkout Config hook. Try adding the below snippet to your theme’s `functions.php` file to test it out

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">myCheckoutFunction()</div>
    </div><div class="HubBlock-header-subtitle">functions.php</div>
</div>

<!--
title: "myCheckoutFunction()"
subtitle: "functions.php"
lineNumbers: true
-->

```javascript
function myCheckoutFunction($checkout_config) {
  $checkout_config['styles']['heading']['color'] = '#C70039'; //red
  $checkout_config['styles']['step']['icon']['backgroundColor'] = '#AE0BE6'; //purple
  $checkout_config['styles']['step']['color'] = '#0BE640'; //green
  return $checkout_config;
}
add_filter('bigcommerce/checkout/config', 'myCheckoutFunction');
```

Following this format, you can apply styles to other elements, like buttons, input fields, and checkboxes. See the full list of checkout elements that you can style and which properties you can adjust in the [Embedded Checkout Styles documentation](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutstyles.md) (Github).

Note that styles apply globally to all elements on the checkout page. For example, styles applied to steps will apply to all steps rather than targeting only step 2 or 3.

### Hide WordPress admin bar for customers

The default setup of WordPress shows an admin bar at the top of every page for every logged in user. It provides a link back to the main site, the user's name, and the ability to log out. This is reasonable for sites that are mainly content and might have additional custom actions in the bar, but for commerce-focused sites you may want to hide it.

For a BigCommerce for WordPress child plugin that hides the bar for customers, see [BC4WP plugin](https://github.com/becomevocal/bc4wp-hide-wp-admin-bar-for-customers).

### Currency Settings

The store’s currency code will be imported from the BigCommerce API as part of the product import process. If the PHP intl extension is available on your server, there is nothing else to configure. If it is not available, you will be presented with additional fields to control currency formatting. These will also be populated automatically from the API. Currency formatting can be filtered using the `bigcommerce/currency/format` filter.

## Extending BC4WP
### Gutenberg support

The WordPress Gutenberg Visual Editor provides users the ability to easily compose a page by adding and arranging blocks of content. Some blocks come with WordPress by default -- paragraph, image, list, and audio blocks, for example. Additionally, WordPress plugins can extend Gutenberg by adding their own blocks to the Visual Editor's Add Block dropdown. The BigCommerce for Wordpress plugin is packed with custom blocks that put the power of BigCommerce in the hands of WordPress developers.

### Creating your own Gutenberg blocks

The source code behind the BigCommerce for WordPress Gutenberg blocks is available on [GitHub](https://github.com/bigcommerce/bigcommerce-for-wordpress/tree/master/src/BigCommerce/Editor/Gutenberg/Blocks). Developers can use these blocks as a starting point for creating their own, customized BigCommerce Gutenbenberg editor blocks.
