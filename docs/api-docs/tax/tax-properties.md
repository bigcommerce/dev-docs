# Tax Properties for Products

The Tax Properties API allows merchants to attach multiple tax codes to products. These tax codes allow merchants to use more than one tax provider for a given product; for example, a merchant might use one tax provider on a US-based storefront and a different provider for its Australian sales ecosystem. They can also assist merchants who are transitioning between tax providers. 

With the right configuration, tax properties can help merchants send tax providers more detailed product information and help providers send back more accurate tax calculations. Specifically, tax properties are variable: merchants assign a distinct value to a tax property depending on product specifics. This is useful for products, such as alcohol and fuel, whose tax rates vary by product composition. Merchants can then send tax properties to tax providers through the Tax Provider API so that tax providers have the necessary product detail for tax calculations. The examples in this guide expand on this use case.

This guide demonstrates how you can manage and send tax properties to tax providers for their tax calculations. Because tax properties are specific to a tax provider, merchants must liaise with tax providers to explore supported tax properties. For more info, see the [Tax Properties API Reference](/api-reference/store-management/tax-properties) and [Tax Provider API Reference](/api-reference/providers/tax-provider-api). 

Here is a summary of use cases for using the Tax Properties API: 
* Use more than one tax provider for a store
* Assist a transition to another tax provider
* Vary inputs into a tax provider's tax calculation
* Receive more accurate tax calculations from third-party tax providers
* Factor in multiple tax-related fields in tax rates 
* Give third-party tax providers parity with Avalara

## Tax properties

### Create tax properties

You must first add tax properties, as specified by your tax provider, to the store. The tax provider must provide the `code` for a tax property. Both `code` and `display_name` are required.  

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

Tax properties can be associated with base products, creating a product tax property. To do so, specify the product using its product ID. The `product_id` field has the same value as the `id` field from the [Get all products](/api-reference/store-management/catalog/products/getproducts) endpoint. Note that you can add multiple tax properties for a single product. Tax properties are not stored on or retrievable with the product object.

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
      "alcohol-percentage": "4.9"
    }
  },
  {
    "product_id": 117,
    "tax_properties": {
      "alcohol-percentage": "10"
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
        "alcohol-percentage": "4.9"
      }
    },
    {
      "product_id": 117,
      "tax_properties": {
        "alcohol-percentage": "10"
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
        "alcohol-percentage": "4.9"
      }
    },
    {
      "product_id": 117,
      "tax_properties": {
        "alcohol-percentage": "10"
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

BigCommerce sends product tax properties when we request [tax estimates](/api-reference/providers/tax-provider-api/tax-provider/estimate) from a provider. Tax properties are sent for each item in a consignment. In the example below, the provider must support the tax property code `alcohol-percentage` for BigCommerce to specify the alcohol compositions for the tax calculation. 

```json title="Example request: Tax estimates with product tax properties" lineNumbers
\\ items object for a consignment contains tax properties for each item

"items": [
  {
    "id": "1",
    "price": {
      "amount": 10.0,
      "tax_inclusive": false
    },
    "quantity": 1,
    "tax_class": {
      "code": "example code",
      "class_id": "1",
      "name": "example tax class"
    },
    "tax_properties": [
      {
        "code": "alcohol-percentage",
        "value": "4.9"
      }
    ],
    "type": "item",
    "wrapping": null
  }
]
```

BigCommerce also sends product tax properties when we request [tax quotes commits](/api-reference/providers/tax-provider-api/tax-provider/commit) and [tax quote adjustments](/api-reference/providers/tax-provider-api/tax-provider/adjust) from a provider.

## Resources 

- [Tax Properties API Reference](/api-reference/store-management/tax-properties)
- [Tax Provider API Reference](/api-reference/providers/tax-provider-api)
