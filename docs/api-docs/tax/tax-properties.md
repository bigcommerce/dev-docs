# Tax Properties for Products

Tax properties are inputs that merchants can provide into a tax provider's tax calculation to receive more accurate tax calculations from third-party tax providers. These properties are specific to a tax provider and allow merchants and shoppers to have tax-related fields factored into their tax rates. 

The Tax Property V3 API will allow you to perform the following functions:
- Add tax property fields that are specific to a tax provider (have **variable** inputs for tax calculations)      
- Associate tax properties to **products**. Unlike tax codes, you can add **multiple** tax properties to a single product

## Tax properties

You must first add tax properties from a tax provider to the store. The `code` for a tax property must be provided by the tax provider. Both `code` and `display_name` are required.   

### Create tax properties

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
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

```json title="Example POST response" lineNumbers 
{
    "data": [
        {
            "id": 1,
            "code": "A-123456789",
            "display_name": "Example Tax Property 1",
            "description": "Food Industry",
            "created_at": 1652474631,
            "updated_at": 1652474631
        },
        {
            "id": 2,
            "code": "B-123456789",
            "display_name": "Example Tax Property 2",
            "description": "Clothing Industry",
            "created_at": 1652474631,
            "updated_at": 1652474631
        }
    ],
    "meta": {}
}
```

<!-- type: tab-end -->

The response provides an `id` for each tax property that is used to get, update, or delete a specific tax property.

### Update tax properties

You may update a tax property's `code`, `display_name`, and `description`. Only fields that you specify will be updated.   

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers 
PUT https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
    {
      "id": 1,
      "code": "A-123456789",
      "display_name": "Example Tax Property 1",
      "description": "Automobile Industry"
    }  
]
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers 
{
    "data": [
        {
            "id": 1,
            "code": "A-123456789",
            "display_name": "Example Tax Property 1",
            "description": "Automobile Industry",
            "created_at": 1652474631,
            "updated_at": 1652476111
        }
    ],
    "meta": {}
}
```

<!-- type: tab-end -->

### Get tax properties

You can get either all the tax properties in your store or only specific tax properties by specifying the `id` for the tax properties in the query.

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers 
GET https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers 
{
    "data": [
        {
            "id": 1,
            "code": "A-123456789",
            "display_name": "Example Tax Property 1",
            "description": "Automobile Industry",
            "created_at": 1652474631,
            "updated_at": 1652476111
        },
        {
            "id": 2,
            "code": "B-123456789",
            "display_name": "Example Tax Property 2",
            "description": "Clothing Industry",
            "created_at": 1652474631,
            "updated_at": 1652476372
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

To delete tax properties, you must specify the `id` for the tax properties in the query.

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers 
DELETE https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?id:in=1,2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers 
No response
```

<!-- type: tab-end -->



## Product tax properties 

Tax properties can be associated with products (i.e. product tax property). To do so,
specify the product using its product ID. The `product_id` field has the same value as the `id` field from [Get All Products](/api-reference/store-management/catalog/products/getproducts). Note that you can add multiple tax properties for a product.

### Update product with tax properties

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers 
PUT https://api.bigcommerce.com/stores/{{Store-Hash}}/v3/tax/products/properties
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

```json title="Example PUT response" lineNumbers 
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


<!-- theme:info -->
> #### Note:
> Product tax properties are sent to the tax provider via the Tax Provider API. To see this in action, see [Estimate Taxes](...). 


### Get product tax properties 

To get the tax properties associated with products, you must specify the `product_id` for the products in the query. 

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers 
GET https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?product_id:in=113,117
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers 
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

To delete the tax properties associated with products, you must specify the `product_id` for the products you wish to delete in the query. 

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers 
DELETE https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?product_id:in=113,117
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers 
No response
```

<!-- type: tab-end -->

## Resources 

- [Tax Properties V3 API Reference](...)
- [Tax Provider API Doc](...) See how tax properties are sent to tax providers 
