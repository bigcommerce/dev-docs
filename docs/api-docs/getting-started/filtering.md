# Filtering

<div class="otp" id="no-index">

### On this page
- [Include](#include)
- [Include and exclude fields](#include-and-exclude-fields)
- [Pagination and limit](#pagination-and-limit)

</div>

To filter collections down to a particular set of items, you can add filters to your request as URL query parameters.

The maximum number of products returned is 250. Viewing more products requires creating a script that can loop through each subsequent page.


These are the most common filter options available for the V3 API: 

| Operator | Expression  | Example | 
|--|--|--|
| Equals/equivalency | attribute=value  | `/v3/catalog/products?price=10` `/v3/catalog/products?name=My Product` |
| Greater than or equal to (for numbers or dates) | attribute:min=value  | `/v3/catalog/products?price:min=10` |
| Less than or equal to (for numbers or dates) | attribute:max=value | `/v3/catalog/products?price:max=10` |
| Greater than (for numbers or dates)| attribute:greater=value | `/v3/catalog/products?price:greater=10` |
| Less than (for numbers or dates) | attribute:less=value | `/v3/catalog/products?price:less=10` |
| SQL LIKE operator (for strings) | attribute:like=pattern | `/v3/catalog/categories?name:like=Shirts` |
| SQL IN operator (for arrays) | attribute:in=csv,list of values | `/v3/catalog/products?categories:in=123,456` |
| SQL NOT IN operator (for arrays) | attribute:not_in=csv,list of values | `/v3/catalog/products?categories:not_in=123,456` |

Available filters vary by endpoint. For up-to-date information on supported filters, refer to the `GET` method documentation of each endpoint.

## Include

Certain endpoints support the `include` query parameter used to include sub-resources and specific attributes in the primary `GET` response for a parent object. For example, you can include a product's variants and images with the product response: 

`/v3/catalog/products?include=variants,images`

The availability of the `include` query parameter varies by endpoint. For up-to-date filter information, refer to the `GET` method documentation of each endpoint.

**Endpoints that support `include` are listed below.** (Last updated on 09/28/2020.)

| API| Endpoint  | Endpoint URL | 
|--|--|--|
| Storefront Carts | Get a Cart | `/carts` |
| Storefront Checkouts | Get a Checkout | `/checkouts/{checkoutId}` |
| Server-to-Server Carts | Get a Cart | `/carts/{cartId}` |
| Customers V3| Get All Customers | `/customers` |
|  | Get All Customer Addresses | `/customers/addresses` |
| Price Lists | Get All Price List Records | `/pricelists/{price_list_id}/records` |
| | Get a Price Record by Currency Code | `/pricelists/{price_list_id}/records/{variant_id}/{currency_code}` |
| Products | Get All Products | `/catalog/products` |
| | Get a Product | `/catalog/products/{product_id}` |
| Storefront | Get Redirects | `/storefront/redirects` |

## Include and exclude fields

Many of BigCommerce's REST API endpoints support both `include_fields` and `exclude_fields` query parameters. 

- `include_fields` query parameter will return ONLY the specified fields in the response.
- `exclude_fields` query parameter will omit the specified fields from the response.

You can request any field that is available on the object. Excluding unnecessary fields from your request (especially large fields like descriptions) can speed up your API request response time.

The following example shows product name and price included in a single request:

`https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products?include_fields=name,price`

Response: 

<!--
title: "Product Name and Price"
subtitle: ""
lineNumbers: true
-->

```json
{
    "data": [
        {
            "id": 77,
            "name": "Red printed scarf",
            "price": 12
        }    
    ]
} 
```

The availability of the `include_fields` and `exclude_fields` query parameters varies by endpoint. For up-to-date filter information, refer to the `GET` method documentation of each endpoint.

**Endpoints that support `include_fields` and `exclude_fields` are listed below.** (Last updated on 09/28/2020.)

| API| Endpoint  | Endpoint URL | 
|--|--|--|
| Brands | Get All Brands | `/catalog/brands` |
|  | Get a Brand | `/catalog/brands/{brand_id}` |
|  | Get All Brands Metafields | `/catalog/brands/{brand_id}/metafields` |
|  | Get a Brand Metafields | `/catalog/brands/{brand_id}/metafields/{metafield_id}` |
| Category| Get All Categories | `/catalog/categories` |
|  | Get a Category | `/catalog/categories/{category_id}` |
|  | Get All Category Metafields | `/catalog/categories/{category_id}/metafields` |
| | Get a Category Metafield | `/catalog/categories/{category_id}/metafields/{metafield_id}` |
| Products | Get All Products | `/catalog/products` |
|  | Get a Product | `/catalog/products/{product_id}` |
|  | Get All Bulk Pricing Rules | `/catalog/products/{product_id}/bulk-pricing-rules` |
|  | Get a Bulk Pricing Rule | `/catalog/products/{product_id}/bulk-pricing-rules/{bulk_pricing_rule_id}` |
|  | Get Complex Rules | `/catalog/products/{product_id}/complex-rules` |
|  | Get a Complex Rule | `/catalog/products/{product_id}/complex-rules/{complex_rule_id}` |
|  | Get Custom Fields | `/catalog/products/{product_id}/custom-fields` |
|  | Get a Custom Field | `/catalog/products/{product_id}/custom-fields/{custom_field_id}` |
|  | Get All Product Images | `/catalog/products/{product_id}/images` |
|  | Get a Product Image | `/catalog/products/{product_id}/images/{image_id}` |
|  | Get All Product Metafields | `/catalog/products/{product_id}/metafields` |
|  | Get a Product Metafield | `/catalog/products/{product_id}/metafields/{metafield_id}` |
|  | Get All Product Modifiers | `/catalog/products/{product_id}/modifiers` |
|  | Get a Modifier | `/catalog/products/{product_id}/modifiers/{modifier_id}` |
|  | Get All Modifier Values | `/catalog/products/{product_id}/modifiers/{modifier_id}/values` |
|  | Get a Modifier Value | `/catalog/products/{product_id}/modifiers/{modifier_id}/values/{value_id}` |
|  | Get All Product Options | `/catalog/products/{product_id}/options` |
|  | Get a Product Option | `/catalog/products/{product_id}/options/{option_id}` |
|  | Get All Product Option Values | `/catalog/products/{product_id}/options/{option_id}/values` |
|  | Get a Product Option Value | `/catalog/products/{product_id}/options/{option_id}/values/{value_id}` |
|  | Get Product Reviews | `/catalog/products/{product_id}/reviews` |
|  | Get a Product Review | `/catalog/products/{product_id}/reviews/{review_id}` |
|  | Get All Product Variants | `/catalog/products/{product_id}/variants` |
|  | Get a Product Variant | `/catalog/products/{product_id}/variants/{variant_id}` |
|  | Get All Product Variant Metafields | `/catalog/products/{product_id}/variants/{variant_id}/metafields` |
|  | Get a Product Variant Metafield | `/catalog/products/{product_id}/variants/{variant_id}/metafields/{metafield_id}` |
|  | Get All Product Videos | `/catalog/products/{product_id}/videos` |
|  | Get a Product Video | `/catalog/products/{product_id}/videos/{id}` |
| Variants | Get All Variants | `/catalog/variants` |

## Pagination and limit

`page` is the number of pages that are returned via api.

`limit` is the number of results per page that are returned.

`page=2&limit=10` will return page 2 of the results with 10 items per page.
