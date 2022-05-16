# Tax Properties for Products

Tax properties are ... They allow merchants and shoppers to receive more accurate tax calculations from third-party tax providers by factoring in ...   

The tax properties feature will allow you to:
-Add tax property fields that are specific to a tax provider (have **variable** inputs for tax calculations)      
-Associate tax properties to **products**. Unlike tax codes, you can add **multiple** tax properties to a single product

## Tax Properties

You must first add tax properties from a tax provider to the store. The `code` for a tax property must be provided by the tax provider. Both `code` and `display_name` are required.   

### Create Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example POST request with X-Auth-Token header 
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

```JSON title="Example POST response 
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

### Update Tax Properties

You may update a tax property's `code`, `display_name`, and `description`. Only fields that you specify will be updated.   

<!--
type: tab
title: Request
-->

```JSON title="Example PUT request with X-Auth-Token header 
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

```JSON title="Example PUT response 
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

### Get Tax Properties

You can get either all the tax properties in your store or only specific tax properties by specifying the `id` for the tax properties in the query.

<!--
type: tab
title: Request
-->

```JSON title="Example GET request with X-Auth-Token header 
GET https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example GET response 
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

### Delete Tax Properties

To delete tax properties, you must specify the `id` for the tax properties in the query.

<!--
type: tab
title: Request
-->

```JSON title="Example DELETE request with X-Auth-Token header 
DELETE https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?id:in=1
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example DELETE response 
No Response
```

<!-- type: tab-end -->



## Product Tax Properties 

Tax properties can be associated with products (i.e. Product Tax Property). To do so,
specify the product using its product ID. The `product_id` field has the same value as the `id` field from [Get All Products](/api-reference/store-management/catalog/products/getproducts). Note that you can add multiple tax properties for a product.

### Update Product with Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example PUT request with X-Auth-Token header 
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

```JSON title="Example PUT response 
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
    "meta": {}
}


```

<!-- type: tab-end -->


<!-- theme:info -->
> #### Note:
> Product Tax Properties are sent to the tax provider via the Tax Provider API. To see this in action, see [Estimate Taxes](...). 


### Get Product Tax Properties 

To get the tax properties associated with products, you must specify the `product_id` for the products in the query. 

<!--
type: tab
title: Request
-->

```JSON title="Example GET request with X-Auth-Token header 
GET https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?product_id:in=113,117
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example GET response 
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
    "meta": {}
}
```

<!-- type: tab-end -->

### Delete Product Tax Properties

To delete the tax properties associated with products, you must specify the `product_id` for the products you wish to delete in the query. 

<!--
type: tab
title: Request
-->

```JSON title="Example DELETE request with X-Auth-Token header 
DELETE https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?product_id:in=113,117
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example DELETE response 
{
    "data": [],
    "meta": {}
}
```

<!-- type: tab-end -->

## Related Resources 

- [Tax Properties API Reference](...)
- [Tax Provider API Doc](...) See how tax properties are sent to tax providers 