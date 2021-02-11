<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>

# Customization Guide

<div class="otp" id="no-index">

### On This Page

- [Overview](#overview)
- [Styling BC4WP templates](#Styling-BC4WP-templates)
- [Accessing BigCommerce data](#accessing-bigcommerce-data)
- [Custom CSS](#custom-css)
- [Hooks](#hooks)
- [Localizing strings displayed on the storefront](#localizing-strings-displayed-on-the-storefront)
- [Styling checkout](#styling-checkout)
- [Email templates](#email-templates)
- [Related resources](#related-resources)

</div>

## Overview

BigCommerce for WordPress (BC4WP) is compatible out-of-the-box with all standard WordPress themes and includes full support for the Genesis theme framework. The plugin includes templates and stylesheets to render all of the elements and pages you need to merchandise your products and move shoppers through checkout, including:

- Product Cards
- Product Detail Pages
- Product Listing Pages
- Product Archive Page
- Cart Page
- Gift Certificate Page
- Customer Account, Registration, and Order History Pages
- Shipping & Returns Page
- Checkout Page

Although the plugin will work with any theme, as a theme developer, you can choose to offer BigCommerce for WordPress support by styling the pages and elements created by the plugin to fit your theme’s design.

Plugin developers can also fork [BigCommerce for WordPress on GitHub](https://github.com/bigcommerce/bigcommerce-for-wordpress), where the plugin is available as an open-source project. We encourage developers to adapt BigCommerce for WordPress to fit any custom use case imaginable! If you’re building a custom feature that you think would benefit the wider community, consider submitting a pull request on GitHub to add your feature to the code base.

This guide will walk through the available options to develop themes that support BigCommerce for WordPress and extend the plugin through custom development.

## Styling BC4WP templates

BC4WP includes template files that are used to display your BigCommerce data on your WordPress storefront. You can edit these templates to change both the content displayed and the styling of that content.

### Templates location

You can find all of the BC4WP template files that render on the frontend in the `templates/public` folder. Templates within the `templates/public/components` subfolder render smaller content blocks within your theme’s template, while the following two control the entire page:

- `single-bigcommerce_product.php`: The template for rendering a single Product post.

- `archive-bigcommerce_product.php`: The template for rendering the Product post type archive.

These templates may require modification to match the styling of your theme. Both templates call the functions `get_header()` and `get_footer()` to render your theme's default header and footer.

You can render the page content inside the wrapper template found in `components/page-wrapper.php`. By modifying this wrapper template to match the HTML markup of a template in your theme, you can have consistent styling across your site.

### CSS

BigCommerce for WordPress uses [PostCSS](https://postcss.org/), a JavaScript tool that accepts CSS with special additional syntax and compiles it into normal CSS. Combined with PostCSS plugins, PostCSS offers many of CSS preprocessors' core features like Sass, with less overhead.

The `asset/pcss` directory contains PostCSS modules. The `assets/css` directory contains both the minified and uncompressed versions of the CSS files created during the PostCSS build process.

### Template overrides

When a WordPress plugin is updated, the new version overwrites existing plugin files. To ensure that your customizations persist through the update process, it’s important to use overrides in your theme files rather than editing plugin files directly.

To override any template, create a bigcommerce directory in your theme and copy the template file to that directory.

Examples:

Copy `templates/public/single-bigcommerce_product.php` to `bigcommerce/single-bigcommerce_product.php`

Copy `templates/public/components/page-wrapper.php` to `bigcommerce/components/page-wrapper.php`

As WordPress loads, it will first check for a custom template override in your theme's `/bigcommerce` directory; if there is no custom template there, WordPress will fetch the built-in plugin template instead.

### Required element classes

BC4WP relies on specially named element classes for JavaScript functionality, and we strongly recommend leaving the default class names untouched as you create custom templates. You are, however, welcome to create additional classes.

## Accessing BigCommerce data

BC4WP allows your WordPress site to access most of your BigCommerce data. The following will guide you through the process of accessing your products, variants, channels, customers, and customer groups.

### Products

If you have a WordPress post ID (as you might get by calling `get_the_ID()` in the context of a template), you can get a Product object.

```php
$post_id = get_the_ID();
$product = new \BigCommerce\Post_Types\Product\Product( $post_id );
```

If you have a BigCommerce product ID, you can get the Product object using that ID:

`$product = \BigCommerce\Post_Types\Product\Product::by_product_id( $product_id );`

In the context of many templates, the `$product` variable is already available to you. Check the docblock at the top of the template file to see defined variables in that scope.

If the Product object is available, you can access all the product's cached information from the BigCommerce Catalog API.

```php
$bigcommerce_id = $product->bc_id(); // the BigCommerce product ID
$post_id = $product->post_id(); // the WordPress post ID
$sku = $product->sku();
$brand = $product->brand();
```

Consult the code reference for a full list of methods available on the Product object.

For any data not directly exposed through a dedicated method, call `$product->get_property()` to retrieve the value.

```php
$weight = $product->get_property( 'weight' );
$height = $product->get_property( 'height' );
```

You can retrieve the same properties using the `__get()` method already available on the Product object:

```php
$weight = $product->weight;
$height = $product->height;
```
The product ID can appear in various places on the client side. The ID you use depends on the context. Here are some places to look:

- On an Add to Cart button
  </br>
  `var product_id = $('.bc-btn--add_to_cart').attr('data-js')`
- On the product price
  </br>
  `var product_id = $('.bc-product__pricing').attr('data-product-price-id')`

Generally, the WordPress plugin works with post IDs, not product IDs. The latter is rarely needed on the client side.

There is a REST API endpoint to retrieve additional information about the product in the browser.  Its primary purpose is supporting the product block interface in the WordPress admin. Still, you can use it anywhere to retrieve a small subset of the product's information. The endpoint is `/wp-json/bigcommerce/v1/products`.

### Variants

Retrieve a Product object as explained in the Products section. After that step, you can retrieve information about variants.

`$variants = $product->variants;`

The returned objects will match the schema from the BigCommerce API.

```php
$variant_ids = wp_list_pluck( $variants, 'id' );
foreach ( $variants as $variant ) {
  $sku = $variant->sku;
  $inventory = $variant->inventory_level;
}
```

On the client side, variant details are available in the product form.

```php
var variants = JSON.parse($('[data-js="product-variants-object"]').attr('data-variants'));
var variant_ids = variants.map( variant => variant.variant_id );
```

The schema does not completely match the API data. It has been adjusted to suit the needs of the product form. Properties include:

- variant_id
- price
- formatted_price
- sku
- disabled
- disabled_message
- image
- option_ids

### Channels

The current channel is available through a Connections object.

```php
$connections = new \BigCommerce\Taxonomies\Channel\Connections();
$channel     = $connections->current();
```

The response is a WP_Term object with meta containing the channel ID:

```php
$channel_name = $channel->name;
$channel_id   = get_term_meta( $channel->term_id, \BigCommerce\Taxonomies\Channel\Channel::CHANNEL_ID, true );
```

The channel ID is not available anywhere on the client side.

### Customers

A logged-out user does not have any customer information. For a logged-in user, you can create a Customer object to get the customer's information.

```php
$customer    = new \BigCommerce\Accounts\Customer( get_current_user_id() );
$customer_id = $customer->get_customer_id();
```

Aside from the customer ID, no customer information is cached in WordPress. Retrieving additional information will make an API call.

```php
$profile   = $customer->get_profile();
$addresses = $customer->get_addresses();
$orders    = $customer->get_orders( $page, $limit );
$order     = $customer->get_order_details( $order_id );
```

The customer ID is not available anywhere on the client side.

### Customer groups

Similar to the customer ID, the customer group ID is available via the Customer object.

```php
$customer = new \BigCommerce\Accounts\Customer( get_current_user_id() );
$group_id = $customer->get_group_id();
```

Additional information about the customer group is not cached in WordPress. However, you can request more information from the BigCommerce API:

```php
$group      = $customer->get_group();
$group_info = $group->get_info();
```

The customer group ID is not available anywhere on the client side.

## Custom CSS

To style BigCommerce for WordPress elements with custom CSS, add your CSS to your theme’s stylesheet rather than editing the plugin stylesheets directly. Your theme’s CSS will have specificity over styles applied by the plugin and will override the default styles.

For example, you might want to change the Add-To-Cart button from blue to orange by adding the following CSS to your theme’s stylesheet:

```css
button.bc-btn.bc-btn--form-submit.bc-btn--add_to_cart {
  background-color: #ff9c33;
}
```

### Opting out of BigCommerce styles

If you wish to disable the built-in plugin styles entirely, you have the option to do so. In the WordPress theme customizer, navigate to BigCommerce > Colors & Theme and select Disable Plugin Styles from the CSS dropdown menu.

## Hooks

Hooks are access points during the WordPress execution process where a developer can insert custom code. Hooks consist of two types: actions and filters. Both allow developers to execute custom code during the WordPress lifecycle. The difference lies in whether the function returns a value:

- **Actions** execute a function with no output. Even if a value was returned it would be ignored.
- **Filters** modify a variable and return a value, which is the modified version of the original variable.

BigCommerce for WordPress provides over 100 hooks that you can use to extend and customize the plugin. For a comprehensive, searchable list of all available hooks, visit our [Code Reference](https://bigcommerce.moderntribe.qa/reference/hooks/).

### Architectural guidelines

All actions and filters called by the plugin begin with the `bigcommerce/` prefix (e.g., `bigcommerce/init`). If there is a dynamic component to the hook, precede it with an equal sign (e.g., `bigcommerce/template=' . $template . '/path`).

The entire plugin operates through closures wrapped around calls to classes instantiated via a dependency injection container. In the event that you need to modify the core behavior of the plugin, there are several methods to get access to these closures.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Warning

> Modifying core plugin functionality can lead to security vulnerabilities, data corruption, broken user workflows, and an overall unpleasant experience for you and your customers. Proceed at your own risk.

</div>
</div>
</div>

The `bigcommerce/init` action fires after the plugin has completed initializing all of its service providers and hooked them into WordPress. It passes two arguments: the primary plugin controller (an instance of the BigCommerce\Plugin class) and the dependency injection container itself. The former is also available at any time after initialization by calling the function `bigcommerce()`.

An instance of each of the service providers found in the src/BigCommerce/Container directory can be accessed via this plugin controller, using the keys specified in `\BigCommerce\Plugin::load_service_providers()`. E.g., to get an instance of the BigCommerce\Container\Cart service provider, you would use `bigcommerce()->cart`.

Every action or filter callback created by one of the service providers is given an identifier so that it can be retrieved and, if appropriate, unhooked from WordPress. E.g., to unhook the closure that renders the product archive template and replace it with your own, you could do:

```javascript
remove_action( 'bigcommerce/template/product/archive', bigcommerce()->templates->product_archive, 10 );

add_action( 'bigcommerce/template/product/archive', 'your_callback_function', 10, 2 );
```

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

## Email templates

You may wish to customize the built-in transactional emails sent from BigCommerce when placing or updating an order. You can add custom text or images to email templates to reflect your store’s branding.

Email templates can be customized and enabled/disabled on an individual basis from the BigCommerce control panel. For more information, see [Customizing Emails](https://support.bigcommerce.com/s/article/Customizing-Emails).

## Related resources

- [Theme Development - WordPress.org](https://codex.wordpress.org/Theme_Development)
- [How to Customize WordPress Plugins](https://wpengine.com/resources/customize-wordpress-plugin/)
- [Methods for Overriding Styles in WordPress](https://css-tricks.com/methods-overriding-styles-wordpress/)
