<h1>Bulk Pricing Rules</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-bulk-pricing-rules_object-properties">Object Properties</a></li>
		<li><a href="#v2-bulk-pricing-rules_list-bulk-pricing-rules">List Bulk Pricing Rules</a></li>
		<li><a href="#v2-bulk-pricing-rules_get-bulk-pricing-rules">Get a Bulk Pricing Rule</a></li>
    <li><a href="#v2-bulk-pricing-rules_get-count-bulk-pricing-rules">Get a Count of Bulk Pricing Rules</a></li>
    <li><a href="#v2-bulk-pricing-rules_create-bulk-pricing-rules">Create a Bulk Pricing Rule</a></li>
    <li><a href="#v2-bulk-pricing-rules_update-bulk-pricing-rules">Update A Bulk Pricing Rule</a></li>
    <li><a href="#v2-bulk-pricing-rules_delete-bulk-pricing-rules">Delete a Bulk Pricing Rules</a></li>
    <li><a href="#v2-bulk-pricing-rules_delete-multiple-bulk-pricing-rules">Delete Multiple Bulk Pricing Rules</a></li>
		</ul>
</div>

<a href='#v2-bulk-pricing-rules_object-properties' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

##  Bulk Pricing 

Bulk pricing rules applied to a product.

###  Bulk Pricing Object – Properties 

| Name | Type | Description |
| --- | --- | --- |
| id | string | The ID of the bulk discount rule. |
| product_id | int | The ID of the product associated with this bulk discount rule. |
| min | int | The minimum inclusive quantity of a product to satisfy this rule. Must be greater than or equal to zero. |
| max | int | The maximum inclusive quantity of a product to satisfy this rule. Must be greater than the min value, unless this field has a value of 0 (zero), in which case there will be no maximum bound for this rule. |
| type | enum |
| type_value | decimal | The value of the discount |

---

<a href='#v2-bulk-pricing-rules_list-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_list-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>

## List Bulk Pricing Rules 

Gets the collection of product bulk pricing rules.


>`GET /stores/{store_hash}/v2/products/{product_id}/discount_rules`

### Filters 

There are no filter parameters specific to `discount_rules`.

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 bulk_pricing_rules are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
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

---

<a href='#v2-bulk-pricing-rules_get-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_get-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Product Bulk Pricing Rule 

Gets a product bulk pricing rule.

>`GET /stores/{store_hash}/v2/products/{product_id}/discount_rules/{id}`

### Response 

Example JSON returned in the response:

```
{
  "id": "1",
  "product_id": 30,
  "min": 100,
  "max": 500,
  "type": "price",
  "type_value": 2
}
```

---

<a href='#v2-bulk-pricing-rules_get-count-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_get-count-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Count of Bulk Pricing Rules 

Gets a count of the number of bulk pricing rules in the store.

>`GET /stores/{store_hash}/v2/products/discount_rules/count`


### Response 

Example JSON returned in the response:

```
{
  "count": 9
}
```

---

<a href='#v2-bulk-pricing-rules_create-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_create-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>


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

```
{
  "min": 100,
  "max": 500,
  "type": "price",
  "type_value": 2
}
```

### Response 

Example JSON returned in the response:

```
{
  "id": "1",
  "product_id": 30,
  "min": 100,
  "max": 500,
  "type": "price",
  "type_value": 2
}
```

---

<a href='#v2-bulk-pricing-rules_update-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_update-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>

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

```
{
  "min": 200,
  "max": 300,
  "type": "fixed",
  "type_value": 10
}
```

### Response 

Example JSON returned in the response:

```
{
  "id": "1",
  "product_id": 30,
  "min": 200,
  "max": 300,
  "type": "fixed",
  "type_value": 10
}
```

---

<a href='#v2-bulk-pricing-rules_delete-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_delete-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete a Product Bulk Pricing Rule 

Deletes a product bulk pricing rule.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/discount_rules/{id}`

---

<a href='#v2-bulk-pricing-rules_delete-multiple-bulk-pricing-rules' aria-hidden='true' class='block-anchor'  id='v2-bulk-pricing-rules_delete-multiple-bulk-pricing-rules'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete Multiple Product Bulk Pricing Rules 

Deletes bulk pricing rules associated with a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/discount_rules`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 `bulk_pricing_rules` are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/discount_rules?page={number} |
| limit | int | /api/v2/products/{product_id}/discount_rules?limit={count} |

