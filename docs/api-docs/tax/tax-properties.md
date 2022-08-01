# Tax Properties for Products

The Tax Properties API allows merchants to attach many tax codes to products. These tax codes allow merchants to use more than one tax provider for a given product. For example, a merchant might use a different tax provider for US-based storefronts. They can also assist merchants who are transitioning between tax providers.

When configured, tax properties help merchants send tax providers more detailed product information.  Tax properties are variable: merchants assign a distinct value depending on product specifics. This is useful for products, such as alcohol and fuel, whose tax rates vary by product composition. Providers can then provide more accurate tax calculations. The examples in this guide expand on this use case.

This guide demonstrates how you can manage tax properties. Tax properties are specific to a tax provider. Thus, merchants must liaise with tax providers to explore supported tax properties. For more info, see the [Tax Properties API Reference](/api-reference/store-management/tax-properties) and the [Tax Provider API Reference](/api-reference/providers/tax-provider-api). 

Here is a summary of use cases for using the Tax Properties API: 
* Use more than one tax provider for a store
* Assist a transition to another tax provider
* Vary inputs into a tax provider's tax calculation
* Receive more accurate tax calculations from third-party tax providers
* Factor in many tax-related fields in tax rates 
* Give third-party tax providers parity with Avalara

## Tax properties

### Create tax properties

You must first add tax properties to the store. This requires the property's `code` and `display_name`. The tax provider must provide the `code` for a tax property.  

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
    "code": "alcohol-percentage",
    "display_name": "Alcohol Percentage",
    "description": "Beverage Industry"
  },
  {
    "code": "fuel-type",
    "display_name": "Fuel Type",
    "description": "Oil and Natural Gas Industry"
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
      "code": "alcohol-percentage",
      "display_name": "Alcohol Percentage",
      "description": "Beverage Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-17T14:25:21+00:00"
    },
    {
      "id": 2,
      "code": "fuel-type",
      "display_name": "Fuel Type",
      "description": "Oil and Natural Gas Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-17T14:25:21+00:00"
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

The response provides an `id` for each tax property. Use the `id` to get, update, or delete a specific tax property.

### Update tax properties

You may update a tax property's `code`, `display_name`, and `description`. This updates only fields that you specify.   

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
    "description": "Alcohol Industry"
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
      "code": "alcohol-percentage",
      "display_name": "Alcohol Percentage",
      "description": "Alcohol Industry",
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
      "code": "alcohol-percentage",
      "display_name": "Alcohol Percentage",
      "description": "Alcohol Industry",
      "created_at": "2022-05-17T14:25:21+00:00",
      "updated_at": "2022-05-21T14:25:21+00:00"
    },
    {
      "id": 2,
      "code": "fuel-type",
      "display_name": "Fuel Type",
      "description": "Oil and Natural Gas Industry",
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
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/properties?id:in=2
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

After [creating a tax property](#create-tax-properties), you can attach it to a base product to create a product tax property. To do so, specify the product using its `product_id`. The `product_id` is the `id` from the [Get all products](/api-reference/store-management/catalog/products/getproducts) endpoint. Tax properties are not stored on or retrievable with the product object.

You can add many tax properties to a single product. The following example shows many tax properties attached to alcohol products. The tax rate of alcohol products vary by both alcohol percentage and net volume.    

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
      "alcohol-percentage": "4.9",
      "netvolume-milliliters": "400"
    }
  },
  {
    "product_id": 117,
    "tax_properties": {
      "alcohol-percentage": "10",
      "netvolume-milliliters": "200"
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
        "alcohol-percentage": "4.9",
        "netvolume-milliliters": "400"
      }
    },
    {
      "product_id": 117,
      "tax_properties": {
        "alcohol-percentage": "10",
        "netvolume-milliliters": "200"
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

### Get product tax properties 

You can get the tax properties attached to products. To do so, specify the `product_id` for the products in the query. 

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
        "alcohol-percentage": "4.9",
        "netvolume-milliliters": "400"
      }
    },
    {
      "product_id": 117,
      "tax_properties": {
        "alcohol-percentage": "10",
        "netvolume-milliliters": "200"
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

You can disassociate tax properties from a product. To do so, specify the `product_id` for the products in the query. This disassociates all the tax properties from a product. 

<!--
type: tab
title: Request
-->

```http title="Example request: Delete product tax properties" lineNumbers 
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/products/properties?product_id:in=117
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

## Tax Quotes

BigCommerce sends product tax properties to request [tax estimates](/api-reference/providers/tax-provider-api/tax-provider/estimate) from a provider. The requests include tax properties for each item in a consignment. 

The following request uses the Tax Provider API:

```http title="Example request: Get a tax estimate" lineNumbers
POST https://store.example.com/estimate
Authorization: Basic ZGVtbzpwQDU1dzByZA==
Content-Type: application/json
Accept: application/json

{
  ...
  "items": [
    {
      "id": "1",
      "price": {
        "amount": 10.0,
        "tax_inclusive": false
      },
      "quantity": 1,
      "tax_class": {
        "code": "custom-tax",
        "class_id": "1",
        "name": "Custom Tax"
      },
      "tax_properties": [
        {
          "code": "alcohol-percentage",
          "value": "4.9"
        },
        {
          "code": "netvolume-milliliters",
          "value": "400"
        }
      ],
      "type": "item",
      "wrapping": null
    }
  ]
  ...
}
```
BigCommerce also sends product tax properties to [commit](/api-reference/providers/tax-provider-api/tax-provider/commit) and [adjust tax quotes](/api-reference/providers/tax-provider-api/tax-provider/adjust). 

## Resources 

- [Tax Properties API Reference](/api-reference/store-management/tax-properties)
- [Tax Provider API Reference](/api-reference/providers/tax-provider-api)
