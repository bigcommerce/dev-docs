# REST API Quick Start

<div class="otp" id="no-index">

### On This Page
- [Authentication](#authentication)
- [Making Requests](#making-requests)
- [Get all Products](#get-all-products)
- [Get Ten Products Sorted by Name](#get-ten-products-sorted-by-name)
- [Create a Product](#create-a-product)
- [Next Steps](#next-steps)
- [Troubleshooting](#troubleshooting)

</div> 

This Quick Start guide will take you through the minimum required steps to begin making API requests against BigCommerce's **V3 REST API**. 

By the end of this guide, you’ll be able to:
* get a list of products
* create a product 
* troubleshoot common errors

### Prerequisites
* [Store API Credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials) (with [Scope](/api-docs/getting-started/authentication#authentication_oauth-scopes) set to `Products Modify`)

## Authentication

For simplicity, we'll be using [Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#obtaining-store-api-credentials) in this tutorial. To obtain Store API credentials, do one of the following:
1. Generate [Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#obtaining-store-api-credentials) in your store's control panel (if you're a store owner).
2. Request your store owner to generate API credentials on your behalf.
3. Generate Store API Credentials by signing up for a [free trial](https://www.bigcommerce.com/essentials/free-trial/).

For more information on authentication and types of API credentials, see: 
* [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication)
* [Building an App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)

## Making Requests

The easiest way to make requests while going through this tutorial is to use the built-in request runner -- copy and paste your `store_hash`, `X-Auth-Client` ID, and `X-Auth-Token` into the form and click **send**:

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts#requestrunner)

If you use **Visual Studio Code**, another simple way to experiment with the requests in this tutorial is to use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension. Once you have it installed, create a new file called `bigcommerce.http` and paste in the following:

```http
@ACCESS_TOKEN = your_access_token 
@CLIENT_ID = your_client_id
@STORE_HASH = your_store_hash

###

GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

Once saved, there will be `send request` link above the `GET` -- click it and the response will open in a split window.

Alternatively, you can import the [Specification File](https://developer.bigcommerce.com/api-reference/store-management/catalog/BigCommerce_Catalog_API.oas2.json) into [Postman](https://www.getpostman.com/) (or any other tool that can import [Open API Specification](https://swagger.io/specification/) files). 

## Get all Products

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts#requestrunner)

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
      ...
    },
    ...
    "meta": {
      "pagination": {
        "total": 120,
        "count": 30,
        "per_page": 30,
        "current_page": 1,
        "total_pages": 4,
        "links": {
          "next": "?page=2",
          "current": "?page=1"
        },
        "too_many": false
      }
  }

```

**Note:**: replace `{store_hash}` with the store hash shown when generating the API credentials):

## Get Ten Products Sorted by Name

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products?limit=10&sort=name
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts#requestrunner)

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
      ...
    },
    ...
    "meta": {
      "pagination": {
        "total": 120,
        "count": 10,
        "per_page": 10,
        "current_page": 1,
        ...
      }
  }
```

For a full of filters, see [API Reference > Products > Get All Products > Request Parameters > Query Parameters](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts).

## Create a Product

Before we can create a product, we'll first need to get the `id` of a `category` to add the product to (`categories` is a required field for creating products). We can do this with a `GET` request to `/catalog/categories`:

```http
GET https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/categories
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories#requestrunner)

**Example Response**:

```json
{
    "data": [
        {
            "id": 2,
            ...
            }
        },
        ...
    ],
    ...
}
```

Once we have a category ID, we can create a product with the minimum required fields (notice the category `id` from the previous request in the `categories` array):

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "name": "BigCommerce Hoodie",
  "type": "physical",
  "weight": 5,
  "width": 12,
  "price": 25.99,
  "categories": [
    2
  ],
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/createproduct#requestrunner)

|Property|Type|Description|
|-|-|-|
|`name`|string|The name of of the product|
|`price`|number|the price of the product|
|`categories`|array|list of categories the product belongs to|
|`type`|enum|`physical` or `digital`|
|`weight`|number|how much the product weighs; used for shipping calculations|

## Next Steps
* To see a full list of filters, see [API Reference > Products > Get All Products > Request Parameters > Query Parameters](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts).
* Try creating a product with new attributes.
* View BigCommerce's [API Reference](https://developer.bigcommerce.com/api-reference) for a list of available APIs, endpoints, and resources.
* 
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