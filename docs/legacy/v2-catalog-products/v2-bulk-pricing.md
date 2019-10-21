# Bulk Pricing Rules

<div class="otp" id="no-index">

### On This Page
- [Bulk Pricing](#bulk-pricing)
- [List Bulk Pricing Rules](#list-bulk-pricing-rules)
- [Get a Product Bulk Pricing Rule](#get-a-product-bulk-pricing-rule)
- [Get a Count of Bulk Pricing Rules](#get-a-count-of-bulk-pricing-rules)
- [Create a Product Bulk Pricing Rule](#create-a-product-bulk-pricing-rule)
- [Update a Product Bulk Pricing Rule](#update-a-product-bulk-pricing-rule)
- [Delete a Product Bulk Pricing Rule](#delete-a-product-bulk-pricing-rule)
- [Delete Multiple Product Bulk Pricing Rules](#delete-multiple-product-bulk-pricing-rules)

</div> 

##  Bulk Pricing 

Bulk pricing rules applied to a product.

###  Bulk Pricing Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | string | The ID of the bulk discount rule. |
| product_id | int | The ID of the product associated with this bulk discount rule. |
| min | int | The minimum inclusive quantity of a product to satisfy this rule. Must be greater than or equal to zero. |
| max | int | The maximum inclusive quantity of a product to satisfy this rule. Must be greater than the min value, unless this field has a value of 0 (zero), in which case there will be no maximum bound for this rule. |
| type | enum |
| type_value | decimal | The value of the discount |

## List Bulk Pricing Rules 

Gets the collection of product bulk pricing rules.

>`GET /stores/{store_hash}/v2/products/{product_id}/discount_rules`

### Filters 

There are no filter parameters specific to `discount_rules`.

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 bulk_pricing_rules are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/discount_rules?page={number} |
| limit | int | /api/v2/products/{product_id}/discount_rules?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": "1",
    "product_id": 30,
    "min": 100,
    "max": 500,
    "type": "price",
    "type_value": 2
  }
]
```

## Get a Product Bulk Pricing Rule 

Gets a product bulk pricing rule.

>`GET /stores/{store_hash}/v2/products/{product_id}/discount_rules/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": "1",
  "product_id": 30,
  "min": 100,
  "max": 500,
  "type": "price",
  "type_value": 2
}
```

## Get a Count of Bulk Pricing Rules 

Gets a count of the number of bulk pricing rules in the store.

>`GET /stores/{store_hash}/v2/products/discount_rules/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 9
}
```

## Create a Product Bulk Pricing Rule 

Creates a new product bulk pricing rule.

>`POST /stores/{store_hash}/v2/products/{product_id}/discount_rules`

### Read-only Properties 

The following properties of the discount rule are read-only. If one or more of these properties are included in the request, it will be rejected.

*   product_id

### Requirements 

The following properties of the discount rule are required. The request won’t be fulfilled unless these properties are valid.

*   type
*   type_value

### Notes 

To specify that a `min` or `max` value is unbounded, these properties must be explicitly set with a value of `0`. If neither `min` nor `max` properties are included in the request, the existing value will remain unchanged.

The range of the `min` and `max` values must not overlap an existing rule associated with the same product.

### Request 

Example request object:

```json
{
  "min": 100,
  "max": 500,
  "type": "price",
  "type_value": 2
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": "1",
  "product_id": 30,
  "min": 100,
  "max": 500,
  "type": "price",
  "type_value": 2
}
```

## Update a Product Bulk Pricing Rule 

Updates an existing product bulk pricing rule.

>`PUT /stores/{store_hash}/v2/products/{product_id}/discount_rules/{id}`

### Read-only Properties 

The following properties of the discount rule are read-only. If one or more of these properties are included in the request, it will be rejected.

*   product_id

### Requirements 

The following properties of the discount rule are required. The request won’t be fulfilled unless these properties are valid.

*   type
*   type_value

### Notes 

To specify that a `min` or `max` value is unbounded, these properties must be explicitly set with a value of `0`. If neither `min` nor `max` properties are included in the request, the existing value will remain unchanged.

The range of the `min` and `max` values must not overlap an existing rule associated with the same product.

### Request 

Example request object:

```json
{
  "min": 200,
  "max": 300,
  "type": "fixed",
  "type_value": 10
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": "1",
  "product_id": 30,
  "min": 200,
  "max": 300,
  "type": "fixed",
  "type_value": 10
}
```

## Delete a Product Bulk Pricing Rule 

Deletes a product bulk pricing rule.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/discount_rules/{id}`

## Delete Multiple Product Bulk Pricing Rules 

Deletes bulk pricing rules associated with a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/discount_rules`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 `bulk_pricing_rules` are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/discount_rules?page={number} |
| limit | int | /api/v2/products/{product_id}/discount_rules?limit={count} |
