# Tax Properties for Products

Tax properties are inputs that merchants can provide into a tax provider's tax calculation to receive more accurate tax calculations from third-party tax providers. These properties are specific to a tax provider and allow merchants and shoppers to have tax-related fields factored into their tax rates. 

The Tax Property V3 API will allow you to perform the following functions:
- Add tax property fields that are specific to a tax provider (have **variable** inputs for tax calculations)      
- Associate tax properties to **products**. Unlike tax codes, you can add **multiple** tax properties to a single product

<!-- theme: info -->
> #### Note
> Currently, you can associate tax properties to base products.

For more info, see the [Tax Property V3 API](/api-reference/store-management/tax-properties) reference.

## Tax properties

You must first add tax properties, as specified by your tax provider, to the store. The tax provider must provide the `code` for a tax property. Both `code` and `display_name` are required.   

### Create tax properties

<!--
type: tab
title: Request
-->

```http title="Example request: Create tax properties" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "code": "A-123456789",
    "display_name": "Example Tax Property 1",
    "description": "Food Industry"
  },
  {
    "code": "B-123456789",
    "display_name": "Example Tax Property 2",
    "description": "Clothing Industry"
  }  
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Create tax properties" lineNumbers 
{
  "data": [
    {
      "id": 1,
      "code": "A-123456789",
      "display_name": "Example Tax Property 1",
      "description": "Food Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-17T14:25:21+00:00"
    },
    {
      "id": 2,
      "code": "B-123456789",
      "display_name": "Example Tax Property 2",
      "description": "Clothing Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-17T14:25:21+00:00"
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

The response provides an `id` for each tax property which you can use to get, update, or delete a specific tax property.

### Update tax properties

You may update a tax property's `code`, `display_name`, and `description`. Only fields that you specify will be updated.   

<!--
type: tab
title: Request
-->

```http title="Example request: Update tax properties" lineNumbers 
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "id": 1,
    "description": "Automobile Industry"
  }  
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update tax properties" lineNumbers 
{
  "data": [
    {
      "id": 1,
      "code": "A-123456789",
      "display_name": "Example Tax Property 1",
      "description": "Automobile Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-21T14:25:21+00:00"
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Get tax properties

You can get all the tax properties in your store or only specific tax properties. To get specific tax properties, specify the `id` for the tax properties in the query.

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax properties" lineNumbers 
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get tax properties" lineNumbers 
{
  "data": [
    {
      "id": 1,
      "code": "A-123456789",
      "display_name": "Example Tax Property 1",
      "description": "Automobile Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-21T14:25:21+00:00"
    },
    {
      "id": 2,
      "code": "B-123456789",
      "display_name": "Example Tax Property 2",
      "description": "Clothing Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-17T14:25:21+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->

### Delete tax properties

To delete tax properties, you must specify the `id` in the query for the tax properties you wish to delete.

<!--
type: tab
title: Request
-->

```http title="Example request: Delete tax properties" lineNumbers 
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/properties?id:in=1,2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```http title="Example response: Delete tax properties" lineNumbers 
HTTP 204 No content
```

<!-- type: tab-end -->



## Product tax properties 

Tax properties can be associated with products, creating a product tax property. To do so, specify the product using its product ID. The `product_id` field has the same value as the `id` field from the [Get all products](/api-reference/store-management/catalog/products/getproducts) endpoint. Note that you can add multiple tax properties for a single product.

### Update product with tax properties

<!--
type: tab
title: Request
-->

```http title="Example request: Update product with tax properties" lineNumbers 
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/products/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "product_id": 113,
    "tax_properties": {
      "A-123456789": "405",
      "B-123456789": "111"
    }
  },
  {
    "product_id": 117,
    "tax_properties": {
      "B-123456789": "800"
    }
  }
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update product with tax properties" lineNumbers 
{
  "data": [
    {
      "product_id": 113,
      "tax_properties": {
        "A-123456789": "405",
        "B-123456789": "111"
      }
    },
    {
      "product_id": 117,
      "tax_properties": {
        "B-123456789": "800"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->


<!-- theme: info -->
> #### Note
> Product tax properties are sent when BigCommerce makes a request to a provider for taxes estimations, tax quote commits, and tax quote adjustments. For more info, see the [Tax Provider API](/api-reference/providers/tax-provider-api).


### Get product tax properties 

To get the tax properties associated with a product, you must specify the `product_id` for the products in the query. 

<!--
type: tab
title: Request
-->

```http title="Example request: Get product tax properties" lineNumbers 
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/products/properties?product_id:in=113,117
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get product tax properties" lineNumbers 
{
  "data": [
    {
      "product_id": 113,
      "tax_properties": {
        "A-123456789": "405",
        "B-123456789": "111"
      }
    },
    {
      "product_id": 117,
      "tax_properties": {
        "B-123456789": "800"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?product_id%3Ain=113%2C117&page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->

### Delete product tax properties

You can disassociate tax properties from a product. To do so, you must specify the `product_id` for the products in the query. This disassociates all the tax properties from a product. 

<!--
type: tab
title: Request
-->

```http title="Example request: Delete product tax properties" lineNumbers 
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/products/properties?product_id:in=113,117
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```http title="Example response: Delete product tax properties" lineNumbers 
HTTP 204 No content
```

<!-- type: tab-end -->

## Resources 

- [Tax Properties V3 API Reference](/api-reference/store-management/tax-properties)
