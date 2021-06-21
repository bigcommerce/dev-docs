<div class="otp" id="no-index">
	
### On this page
- [Overview](#overview)
- [Hooks](#hooks)
- [Accessing BigCommerce data](#accessing-bigcommerce-data)
- [Proxy REST API Endpoints](#proxy-rest-api-endpoints)

</div>

## Overview

[placeholder]

## Hooks

Hooks are access points during the WordPress execution process where a developer can insert custom code. Hooks consist of two types: actions and filters. Both allow developers to execute custom code during the WordPress lifecycle. The difference lies in whether the function returns a value:

- **Actions** execute a function with no output. Even if a value was returned it would be ignored.
- **Filters** modify a variable and return a value, which is the modified version of the original variable.

BigCommerce for WordPress provides over 100 hooks that you can use to extend and customize the plugin. For a comprehensive, searchable list of all available hooks, visit our [Code Reference](https://bigcommerce.moderntribe.qa/reference/hooks/).

### Architectural guidelines

All actions and filters called by the plugin begin with the `bigcommerce/` prefix (e.g., `bigcommerce/init`). If there is a dynamic component to the hook, precede it with an equal sign (e.g., `bigcommerce/template=' . $template . '/path`).

The entire plugin operates through closures wrapped around calls to classes instantiated via a dependency injection container. In the event that you need to modify the core behavior of the plugin, there are several methods to get access to these closures.


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

## Proxy REST API Endpoints

BigCommerce for WordPress sets up several proxy REST endpoints that map requests to the BigCommerce API. This allows developers to build extensions using client-side requests without having to worry about cross-origin restrictions. This feature is useful for building extensions such as single-page store apps or progressive web apps, and it powers the AMP integration provided when the official AMP plugin for WordPress is active on the same site.

By default, these proxy REST endpoints are available under `your-wordpress-site.com/wp-json/bc/v3/`, with request routes mapping to those documented in the BigCommerce Dev Center's API Reference. For example, `your-wordpress-site.com/wp-json/bc/v3/catalog/products` returns data from the corresponding BigCommerce API endpoint and accepts all the same parameters.

Most of the WordPress proxy REST endpoints are publicly queryable, with authentication happening automatically using plugin settings. For security purposes, however, some potentially sensitive data is filtered out of the WordPress response. Those fields are noted in the table below.

### Caching and Webhooks
By default, GET requests under `/catalog` are cached for ten minutes in the object cache -- or via WordPress transients if object caching is not available -- and a BigCommerce webhook is used to bust cached data related to a product when it is updated in BigCommerce or its inventory data changes. This default caching implementation can be overridden using the `bigcommerce/proxy/result_pre` WordPress filter. See the plugin customization guide for details on overriding core plugin functionality.

### Endpoints
|URL|Description|Methods|Excluded Fields
|-|-|-|-|
|[`/catalog/products(/*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts)|Endpoints for products and product-related data such as reviews, categories, and variants|`GET`|bin_picking_number, cost_price, date_created, date_modified, inventory_tracking, layout_file, product_tax_code, search_keywords, sku_id, tax_class_id, total_sold, view_count; **If price_id_hidden is true**: map_price, price, retail_price, sale_price; **If is_condition_shown is false**: condition; **If is_preorder_only is true**: preorder_message, prorder_release_date
|[`/catalog/products/[product-id]/variants/(*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid)|Fetch variants associated with a product|`GET`|cost_price, sku_id; **If associated product's is_price_hidden is true**: calculated_price, map_price, price, retail_price, sale_price
|[`/catalog/products/[product-id]/images/(*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-images/getproductimages)|Fetch images associated with a product|`GET`|date_modified
|[`/catalog/products/[product-id]/reviews(/*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-reviews/getproductreviews)|Fetch reviews associated with a product|`GET`|date_created, date_modifed, date_reviewed, email, status (**note: reviews are filtered out if status is not `approved`**)
|[`/catalog/categories(/*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/category/getcategories)|Fetch category listings or individual categories by ID|`GET`|views
|[Additional `/catalog` endpoints](https://developer.bigcommerce.com/api-reference/catalog/catalog-api)| See BigCommerce API docs |`GET`
|`/channels(/*)`|BigCommerce channels endpoints|`GET`
|`/channels/[channel-id]/site`||`GET`|
|[`/carts`](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/createacart)|Creates a cart]|`POST`, `PUT`
|[`/carts/[cart-id]`](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/getacart)|Fetch, update, and delete a cart by cart ID|`GET`, `POST`, `PUT`, `DELETE`|
|[`/carts/[cart-id]/items(/[item-id])`](/api-reference/cart-checkout/server-server-cart-api/cart/createacart)|Create, update, and delete cart items|`POST`, `PUT`, `DELETE`|
|[`/carts/[cart-id]/redirect_urls/`](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl)|Fetch a cart's redirect URLs|`POST`, `PUT`|


