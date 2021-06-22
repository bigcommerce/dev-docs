# Styling Templates

<div class="otp" id="no-index">
	
### On this page
- [Localizing strings displayed on the storefront](#localizing-strings-displayed-on-the-storefront)
- [Styling checkout](#styling-checkout)

</div>

## Localizing strings displayed on the storefront

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

## Styling checkout

BigCommerce for WordPress offers two possible checkout experiences, depending on whether the WordPress site has an installed SSL certificate.

If no SSL is detected, WordPress redirects shoppers to your BigCommerce checkout page to finish their transaction over a secure connection. If using the redirected checkout, visit our [Stencil documentation](https://developer.bigcommerce.com/stencil-docs/template-files/customize-stencil-checkout/optimized-one-page-checkout) to review all available options for styling the checkout page.

If an SSL is detected, BC4WP seamlessly embeds BigCommerce’s secure one-page checkout through an iFrame on your WordPress checkout page.

### Hide WordPress admin bar for customers

The default setup of WordPress shows an admin bar at the top of every page for every logged in user. It provides a link back to the main site, the user's name, and the ability to log out. This is reasonable for sites that are mainly content and might have additional custom actions in the bar, but for commerce-focused sites you may want to hide it.

For a BigCommerce for WordPress child plugin that hides the bar for customers, see [BC4WP plugin](https://github.com/becomevocal/bc4wp-hide-wp-admin-bar-for-customers).
