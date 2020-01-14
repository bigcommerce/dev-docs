# Quick Start

<div class="otp" id="no-index">

### On This Page
- [Authentication](#authentication)
- [Getting a List of Products](#getting-a-list-of-products)
- [Create a Product](#create-a-product)
- [Troubleshooting](#troubleshooting)

</div> 

This Quick Start guide will take you through the minimum required steps to begin making API requests against BigCommerce's **V3 REST API**. 

By the end of this guide, you’ll be able to:
* retrieve a store’s product catalog,
* create a new product, 
* and troubleshoot common errors

### Prerequisites
* [Store API Credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials) (with [Scope](/api-docs/getting-started/authentication#authentication_oauth-scopes) set to `Products Modify`)

## Authentication

Two types of API credentials are available to developers wishing to make requests against BigCommerce REST APIs:

1. [Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#obtaining-store-api-credentials) (created in a store's control panel)
1. [App API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#obtaining-app-api-credentials) (created in the [Developer Portal](https://devtools.bigcommerce.com/))

For simplicity, we'll be using [Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#obtaining-store-api-credentials) in this tutorial. To obtain Store API credentials:
1. If you're a **developer for a store owner**: request the store owner to generate store API credentials for you.
2. If you're a **store owner**: generate [Store API Cedentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#obtaining-store-api-credentials) yourself in your store's control panel.
3. **If you're not a store owner** or **developer for a store owner**: generate Store API Credentials by signing up for a [free trial](https://www.bigcommerce.com/essentials/free-trial/).

For more information on authentication and types of API credentials, see: 
* [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication)
* [Building an App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)

## Getting a List of Products

To get all products, send a `GET` request to: `https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products` (replace `{store_hash}` with the store hash shown when generating the store API credentials).

To add the name and sort [filters](/api-docs/getting-started/filtering), append `?limit=10&sort=name` to the end of the request URL:

**`GET`** `https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products?limit=10&sort=name`

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/catalog/products/getproducts#requestrunner)

**Example Response:**


```json
{
  "data": [
    {
      "id": 174,
      "name": "1L Le Parfait Jar",
      "type": "physical",
      "sku": "",
      "description": "<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>",
      "weight": 1,
      "width": 0,
      "depth": 0,
      "height": 0,
      "price": 7.95,
      "cost_price": 0,
      "retail_price": 10,
      "sale_price": 0,
      "map_price": 0,
      "tax_class_id": 0,
      "product_tax_code": "",
      "calculated_price": 7.95,
      "categories": [
        23,
        21
      ],
      ...
      "open_graph_description": "",
      "open_graph_use_meta_description": true,
      "open_graph_use_product_name": true,
      "open_graph_use_image": true
    },
    ...
    "meta": {
    "pagination": {
      "total": 39,
      "count": 10,
      "per_page": 10,
      "current_page": 1,
      "total_pages": 4,
      "links": {
        "next": "?limit=10&sort=name&page=2",
        "current": "?limit=10&sort=name&page=1"
      },
      "too_many": false
    }
  }
```

Products are returned in an array. At the end of the response is a meta object showing the total number of products as well as products `per_page` (which is set to 10 using the limit param).

### Next Steps
* Try including other filter parameters (such as `name`, or `include` and `exclude`). See [Get All Products](/api-reference/catalog/catalog-api/products/getproducts) for a full list of available filters. 

## Create a Product

Before we can create a product, we'll first need to get a `category` ID to add the product to (`category` is a required field for creating products):

**`GET`** `https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/categories`:

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/catalog/category/getcategories#requestrunner)

**Example Response**:

```json
{
    "data": [
        {
            "id": 19,
            "parent_id": 0,
            "name": "Garden",
            "description": "<p>This is the garden description</p>",
            "views": 0,
            "sort_order": 2,
            "page_title": "page title",
            "meta_keywords": [
                "meta keyword"
            ],
            "meta_description": "meta description",
            "layout_file": "category_with_facets.html",
            "image_url": "https://cdn11.bigcommerce.com/s-jrah6gmn/product_images/j/group__63336.png",
            "is_visible": true,
            "search_keywords": "search keywords",
            "default_product_sort": "use_store_settings",
            "custom_url": {
                "url": "/garden/",
                "is_customized": false
            }
        },
        ...
    ],
    ...
}
```

Now that we have a category ID (`19` in the example JSON), we can create a product with the following required fields:

|Property|Type|Description|
|-|-|-|
|`name`|string|The name of of the product|
|`price`|number|the price of the product|
|`category`|integer|the category ID of the category the product belongs to|
|`type`|enum|`physical` or `digital`|
|`weight`|number|how much the product weighs; used for shipping calculations|

**`POST`** `https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products`

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/catalog/products/createproduct#requestrunner)

```json
{
  "name": "BigCommerce Hoodie",
  "type": "physical",
  "description": "A super soft hoodie to wear",
  "weight": 5,
  "width": 12,
  "price": 25.99,
  "categories": [
    19
  ],
  "condition": "New"
}
```

### Next Steps
* To see a full list of fields that can be sent in a request see [Create a Product](/api-reference/catalog/catalog-api/products/createproduct)
* Try to make a different product with new attributes.

## Troubleshooting

**Did you get a status of 403 Forbidden?**
* Check the Client ID and Client Token.
* Make sure your request headers are correct.
* Be sure you replaced `{store_hash}` with your store hash. 
* Make sure the request url is correct.

**Did you get a 200 but nothing was returned?**
* Make sure your store has products.

**Did you get a status of 404?**
* Check the request url for errors.