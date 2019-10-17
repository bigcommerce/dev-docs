# Proxy REST API Endpoints

<div class="otp" id="no-index">

### On This Page
- [Caching and Webhooks](#caching-and-webhooks)
- [Endpoints](#endpoints)

</div> 

BigCommerce for WordPress sets up several proxy REST endpoints that map requests to the BigCommerce API. This allows developers to build extensions using client-side requests without having to worry about cross-origin restrictions. This feature is useful for building extensions such as single-page store apps or progressive web apps, and it powers the AMP integration provided when the official AMP plugin for WordPress is active on the same site.

By default, these proxy REST endpoints are available under `your-wordpress-site.com/wp-json/bc/v3/`, with request routes mapping to those documented in the BigCommerce Dev Center's API Reference. For example, `your-wordpress-site.com/wp-json/bc/v3/catalog/products` returns data from the corresponding BigCommerce API endpoint and accepts all the same parameters.

Most of the WordPress proxy REST endpoints are publicly queryable, with authentication happening automatically using plugin settings. For security purposes, however, some potentially sensitive data is filtered out of the WordPress response. Those fields are noted in the table below.

---

<a href='#proxy-api-endpoints_caching' aria-hidden='true' class='block-anchor'  id='proxy-api-endpoints_caching'><i aria-hidden='true' class='linkify icon'></i></a>

## Caching and Webhooks
By default, GET requests under `/catalog` are cached for ten minutes in the object cache -- or via WordPress transients if object caching is not available -- and a BigCommerce webhook is used to bust cached data related to a product when it is updated in BigCommerce or its inventory data changes. This default caching implementation can be overridden using the `bigcommerce/proxy/result_pre` WordPress filter. See the plugin customization guide for details on overriding core plugin functionality.

---

<a href='##proxy-api-endpoints_endpoints' aria-hidden='true' class='block-anchor'  id='#proxy-api-endpoints_endpoints'><i aria-hidden='true' class='linkify icon'></i></a>

## Endpoints
|URL|Description|Methods|Excluded Fields
|---|---|---|---|
|[`/catalog/products(/*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts)|Endpoints for products and product-related data such as reviews, categories, and variants|`GET`|bin_picking_number, cost_price, date_created, date_modified, inventory_tracking, layout_file, product_tax_code, search_keywords, sku_id, tax_class_id, total_sold, view_count; **If price_id_hidden is true**: map_price, price, retail_price, sale_price; **If is_condition_shown is false**: condition; **If is_preorder_only is true**: preorder_message, prorder_release_date
|[`/catalog/products/[product-id]/variants/(*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid)|Fetch variants associated with a product|`GET`|cost_price, sku_id; **If associated product's is_price_hidden is true**: calculated_price, map_price, price, retail_price, sale_price
|[`/catalog/products/[product-id]/images/(*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-images/getproductimages)|Fetch images associated with a product|`GET`|date_modified
|[`/catalog/products/[product-id]/reviews(/*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-reviews/getproductreviews)|Fetch reviews associated with a product|`GET`|date_created, date_modifed, date_reviewed, email, status (**note: reviews are filtered out if status is not `approved`**)
|[`/catalog/categories(/*)`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/category/getcategories)|Fetch category listings or individual categories by ID|`GET`|views
|[Additional `/catalog` endpoints](https://developer.bigcommerce.com/api-reference/catalog/catalog-api)| See BigCommerce API docs |`GET`
|`/channels(/*)`|BigCommerce channels endpoints|`GET`
|`/channels/[channel-id]/site`||`GET`|
|[`/carts`](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/createacart)|Creates a cart]|`POST`, `PUT`
|[`/carts/[cart-id]`]()|Fetch, update, and delete a cart by cart ID|`GET`, `POST`, `PUT`, `DELETE`|
|[`/carts/[cart-id]/items(/[item-id])`](/api-reference/cart-checkout/server-server-cart-api/cart/createacart)|Create, update, and delete cart items|`POST`, `PUT`, `DELETE`|
|[`/carts/[cart-id]/redirect_urls/`](/api-reference/cart-checkout/server-server-cart-api/cart/createcartredirecturl)|Fetch a cart's redirect URLs|`POST`, `PUT`|
