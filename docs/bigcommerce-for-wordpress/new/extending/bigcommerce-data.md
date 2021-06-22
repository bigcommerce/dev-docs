# Accessing BigCommerce data

<div class="otp" id="no-index">
	
### On this page

- [Products](#products)
- [Variants](#variants)
- [Channels](#channels)
- [Customers](#customers)
- [Customer groups](#customer-groups)
  
</div>

BC4WP allows your WordPress site to access most of your BigCommerce data. The following will guide you through the process of accessing your products, variants, channels, customers, and customer groups.

## Products

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

## Variants

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

## Channels

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

## Customers

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

## Customer groups

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


The `bigcommerce/init` action fires after the plugin has completed initializing all of its service providers and hooked them into WordPress. It passes two arguments: the primary plugin controller (an instance of the BigCommerce\Plugin class) and the dependency injection container itself. The former is also available at any time after initialization by calling the function `bigcommerce()`.

An instance of each of the service providers found in the src/BigCommerce/Container directory can be accessed via this plugin controller, using the keys specified in `\BigCommerce\Plugin::load_service_providers()`. E.g., to get an instance of the BigCommerce\Container\Cart service provider, you would use `bigcommerce()->cart`.

Every action or filter callback created by one of the service providers is given an identifier so that it can be retrieved and, if appropriate, unhooked from WordPress. E.g., to unhook the closure that renders the product archive template and replace it with your own, you could do:

```javascript
remove_action( 'bigcommerce/template/product/archive', bigcommerce()->templates->product_archive, 10 );

add_action( 'bigcommerce/template/product/archive', 'your_callback_function', 10, 2 );
```