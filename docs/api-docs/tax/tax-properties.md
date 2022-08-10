# Tax Properties for Products

The Tax Properties API allows merchants to vary the tax info they send to tax providers. In some jurisdictions, tax rates for products vary by product composition. For example, correct taxation of alcohol requires info about alcohol percentage. Using tax properties, providers can return more accurate tax calculations. The examples in this guide expand on this use case. 

In some instances, tax providers may need multiple inputs that vary between products. For example, both the alcohol percentage and the volume sold affect alcohol taxes. As shown in this guide, merchants can provide both pieces of info to tax providers.    

<!-- theme: info -->
> #### Tax properties versus tax codes
> A tax code is a single code that tax providers use to invoke specific rules when calculating tax on a product. 
> In contrast, tax properties are fields that contain info about product specifics. Tax providers use these fields to factor product specifics into their calculations. 

This guide demonstrates how to use the Tax Properties API. For more, see the [Tax Properties API Reference](/api-reference/store-management/tax-properties) and the [Tax Provider API Reference](/api-reference/providers/tax-provider-api). 

## Tax properties

Tax properties rely on `code`s specific to third-party tax providers. Consult a tax provider's documentation to identify supported `code`s. The `code`s used in tax properties are not tax codes. See [Tax properties versus tax codes](#tax-properties-versus-tax-codes).    

### Create tax properties

First, use the [Create tax properties](/api-reference/store-management/tax-properties/tax-properties/create-tax-properties) endpoint to add tax properties to the store. This requires the tax provider's `code` and a `display_name` that shoppers may see, depending on your theme, settings, and jurisdiction.  Optionally, you can add a description.

The response provides an `id` for each tax property. Use the `id` to get, update, or delete a specific tax property.

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

### Update tax properties

Send a request to the [Update tax properties](/api-reference/store-management/tax-properties/tax-properties/update-tax-properties) endpoint to modify a tax property's `code`, `display_name`, or `description`. The request updates only fields that you specify.   

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

This endpoint supports batch operations. You can get all the tax properties in your store, or only specific tax properties. To get tax properties, send a request to the [Get tax properties](/api-reference/store-management/tax-properties/tax-properties/get-tax-properties) endpoint. To get only select tax properties, use the `id:in` query parameter.

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax properties" lineNumbers 
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/properties?id:in=1,2
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

To delete tax properties, send a request to the [Delete tax properties](/api-reference/store-management/tax-properties/tax-properties/delete-tax-properties) endpoint and use the `id:in` query parameter to specify the tax properties you want to delete.

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

After [creating a tax property](#create-tax-properties), you can attach it to a base product to create a product tax property. To do so, specify the product using its `product_id`. The `product_id` is the `id` from the [Get all products](/api-reference/store-management/catalog/products/getproducts) endpoint. 

You can add multiple tax properties to a single product. The following example shows tax properties attached to alcohol products. In this example, the tax rate of alcohol products varies by both alcohol percentage and net volume. 

<!-- theme: info -->
> #### Tax properties aren't product properties
> Tax properties are not stored on or retrievable with the product object.

### Update product with tax properties

To attach tax properties to a product, send a request to the [Update product tax properties](/api-reference/store-management/tax-properties/product-tax-properties/update-product-tax-properties) endpoint. Use the same endpoint to modify a product's existing tax properties.

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

To get the tax properties attached to a product, send a request to the [Get product tax properties](/api-reference/store-management/tax-properties/product-tax-properties/get-product-tax-properties) endpoint and use the `product_id:in` query parameter. 

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

<!-- theme: warning -->
> #### Batch deletion
> This endpoint removes **all** tax properties from a given product.

To remove tax properties from a product, send a request to the [Delete product tax properties](/api-reference/store-management/tax-properties/product-tax-properties/delete-product-tax-properties) endpoint and use the `product_id:in` query parameter. This disassociates all the tax properties from a product. 


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

### Tax Properties reference
- [Create tax properties](/api-reference/store-management/tax-properties/tax-properties/create-tax-properties)
- [Get tax properties](/api-reference/store-management/tax-properties/tax-properties/get-tax-properties)
- [Update tax properties](/api-reference/store-management/tax-properties/tax-properties/update-tax-properties)
- [Delete tax properties](/api-reference/store-management/tax-properties/tax-properties/delete-tax-properties)

### Product Tax Properties reference
- [Create and update product tax properties](/api-reference/store-management/tax-properties/product-tax-properties/update-product-tax-properties)
- [Get product tax properties](/api-reference/store-management/tax-properties/product-tax-properties/get-product-tax-properties)
- [Delete product tax properties](/api-reference/store-management/tax-properties/product-tax-properties/delete-product-tax-properties)

### Tax Provider reference
- [Create a tax estimate](/api-reference/providers/tax-provider-api/tax-provider/estimate)
- [Create a tax commit](/api-reference/providers/tax-provider-api/tax-provider/commit)
- [Create a tax adjustment](/api-reference/providers/tax-provider-api/tax-provider/adjust)

### Catalog reference
- [Get all products](/api-reference/store-management/catalog/products/getproducts)
