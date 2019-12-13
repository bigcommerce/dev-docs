<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>

# Customization Guide

<div class="otp" id="no-index">

### On This Page

- [Introduction](#introduction)
- [File Structure](#file-structure)
- [Template Overrides](#template-overrides)
- [Accessing BigCommerce Data](#accessing-bigcommerce-data)
- [Custom CSS](#custom-css)
- [Hooks](#hooks)
- [Styling Checkout](#styling-checkout)
- [Email Templates](#email-templates)
- [Additional Resources](#additional-resources)

</div>

## Introduction

BigCommerce for WordPress is compatible out-of-the-box with all standard WordPress themes and includes full support for the Genesis theme framework. The plugin includes templates and stylesheets to render all of the elements and pages you need to merchandise your products and move shoppers through checkout, including:
- Product Cards
- Product Detail Pages
- Product Listing Pages
- Product Archive Page
- Cart Page
- Gift Certificate Page
- Customer Account, Registration, and Order History Pages
- Shipping & Returns Page
- Checkout Page

Although the plugin will work with any theme, as a theme developer, you can choose to offer  BigCommerce for WordPress support by styling the pages and elements created by the plugin to fit your theme’s design.

Plugin developers can also fork [BigCommerce for WordPress on GitHub](https://github.com/bigcommerce/bigcommerce-for-wordpress), where the plugin is available as an open source project. We encourage developers to adapt BigCommerce for WordPress to fit any custom use case imaginable! If you’re building a custom feature that you think would benefit the wider community, consider submitting a pull request on GitHub to add your feature to the code base.

This guide will walk through the available options for developing themes that support BigCommerce for WordPress and extending the plugin through custom development.

## File Structure
### Templates
All of the BigCommerce for WordPress template files that render on the front end can be found in the templates/public folder. Templates within the components subfolder render smaller content blocks within your theme’s template, while two control the entire page:

- `single-bigcommerce_product.php`: The template for rendering a single Product post.

- `archive-bigcommerce_product.php`: The template for rendering the Product post type archive.

These templates may require modification to match the styling of your theme. Both templates call `get_header()` and `get_footer()` to render your theme's default header and footer. 
The page content is rendered inside the wrapper template found in `components/page-wrapper.php`. By modifying this wrapper template to match the HTML markup of a template in your theme, you should have consistent styling across your site.
### CSS
BigCommerce for WordPress uses [PostCSS](https://postcss.org/), a JavaScript tool that accepts CSS with special additional syntax and compiles it into normal CSS. Combined with PostCSS plugins, PostCSS offers many of the core features of CSS preprocessors like Sass, with less overhead.

PostCSS modules are contained in the asset/pcss directory. The assets/css directory contains both the minified and uncompressed versions of the CSS files created during the PostCSS build process.

## Template Overrides
When a WordPress plugin is updated, existing plugin files are overwritten by the new version. To ensure that your customizations persist through the update process, it’s important to use overrides in your theme files rather than editing plugin files directly.

To override any template, create a bigcommerce directory in your theme and copy the template file to that directory. 

Examples:

Copy `templates/public/single-bigcommerce_product.php` to `bigcommerce/single-bigcommerce_product.php`

Copy `templates/public/components/page-wrapper.php` to `bigcommerce/components/page-wrapper.php`

As WordPress loads, it will first check for a custom template override in your theme’s bigcommerce directory; if no custom template is found there, WordPress will fetch the built-in plugin template instead.
### Required Classes
BigCommerce for WordPress relies on specially named element classes for JavaScript functionality, and we strongly recommend leaving the default class names untouched as you create custom templates. You are, however, welcome to create additional classes.

## Accessing BigCommerce Data
### Products
If you have a WordPress post ID (as you might get by calling `get_the_ID()` in the context of a template), you can get a Product object.

```php
$post_id = get_the_ID();
$product = new \BigCommerce\Post_Types\Product\Product( $post_id );
```

If you have a BigCommerce product ID, you can get the Product object using that ID:

`$product = \BigCommerce\Post_Types\Product\Product::by_product_id( $product_id );`

In the context of many templates, the `$product` variable is already available to you. Check the docblock at the top of the template file to see which variables are defined in that scope. 

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

The product ID can appear in various places on the client side. The ID you use depends on context. Here are some places to look:

- On an Add to Cart button
 </br>
  `var product_id = $('.bc-btn--add_to_cart').attr('data-js')`
- On the product price
  </br>
  `var product_id = $('.bc-product__pricing').attr('data-product-price-id')`

Generally, the WordPress plugin works with post IDs, not product IDs. The latter is rarely needed on the client side.

To retrieve additional information about the product in the browser, there is a REST API endpoint. Its primary purpose is supporting the product block interface in the WordPress admin, but it can be used anywhere to retrieve a small subset of the information about the product. The endpoint is `/wp-json/bigcommerce/v1/products`.

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

A logged out user does not have any customer information. For a logged in user, you can create a Customer object to get the customer's information.

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

### Customer Groups
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
    background-color: #FF9C33;
}
```
### Opting Out of BigCommerce Styles
If you wish to disable the built-in plugin styles entirely, you have the option to do so. In the WordPress theme customizer, navigate to BigCommerce > Colors & Theme and select Disable Plugin Styles from the CSS dropdown menu.

## Hooks
Hooks are access points during the WordPress execution process where a developer can insert custom code. Hooks consist of two types: actions and filters. Both allow developers to execute custom code during the WordPress lifecycle. The difference lies in whether the function returns a value: 

- **Actions** execute a function with no output. Even if a value was returned it would be ignored. 
- **Filters** modify a variable and return a value, which is the modified version of the original variable.

BigCommerce for WordPress provides over 100 hooks that you can use to extend and customize the plugin. For a comprehensive, searchable list of all available hooks, visit our [Code Reference](https://bigcommerce.moderntribe.qa/reference/hooks/).

### Architectural Guidelines
All actions and filters called by the plugin begin with the `bigcommerce/` prefix (e.g., `bigcommerce/init`). If there is a dynamic component to the hook, it should be preceded by an equal sign (e.g., `bigcommerce/template=' . $template . '/path`).

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

## Styling Checkout
BigCommerce for WordPress offers two possible checkout experiences, depending on whether the WordPress site has an installed SSL certificate.

If no SSL is detected, shoppers will be redirected to the BigCommerce checkout page, on the domain of the BigCommerce store. Because BigCommerce stores provide an SSL certificate by default, this ensures that the checkout page is always accessed on an encrypted domain. If you are using this checkout experience, visit our [Stencil documentation](https://developer.bigcommerce.com/stencil-docs/template-files/customize-stencil-checkout/optimized-one-page-checkout) to review all available options for styling the checkout page.

If an SSL is detected, shoppers will visit an embedded version of the BigCommerce checkout page, on your WordPress domain. This has the advantage of providing a seamless experience for the shopper. 

### Embedded Checkout

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
add_filter( 'bigcommerce/checkout/config', 'myCheckoutFunction');

```

Following this format, you can apply styles to other elements, like buttons, input fields, and checkboxes. See the full list of checkout elements that can be styled and which properties you can adjust in the [Embedded Checkout Styles documentation](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutstyles.md) (Github).

Note that styles apply globally to all elements on the checkout page. For example, styles applied to steps will apply to all steps rather than targeting only step 2 or 3.

## Email Templates
You may wish to customize the built-in transactional emails sent from BigCommerce when an order is placed or updated. You can add custom text or images to email templates to reflect your store’s branding. 

Email templates can be customized and enabled/disabled on an individual basis from the BigCommerce control panel. For more information, see [Customizing Emails](https://support.bigcommerce.com/s/article/Customizing-Emails).

## Additional Resources
- [https://codex.wordpress.org/Theme_Development](https://codex.wordpress.org/Theme_Development)
- [https://wpengine.com/resources/customize-wordpress-plugin/](https://wpengine.com/resources/customize-wordpress-plugin/)
- [https://css-tricks.com/methods-overriding-styles-wordpress/](https://css-tricks.com/methods-overriding-styles-wordpress/)
