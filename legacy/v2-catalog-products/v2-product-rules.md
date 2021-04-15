<h1>Product Rules</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-rule_object-properties">Object Properties</a></li>
		<li><a href="#v2-rule_list-product-rules">List Product Rules</a></li>
		<li><a href="#v2-rule-product-rule">Get Product Rules</a></li>
    <li><a href="#v2-rule_get-count-rule">Get a Count of Product Rules</a></li>
    <li><a href="#v2-rule_create-product-rule">Create Product Rules</a></li>
    <li><a href="#v2-rule_update-product-rule">Update Product Rules </a></li>
    <li><a href="#v2-rule_delete-product-rule">Delete a Product Rule</a></li>
    <li><a href="#v2-rule_delete-all-product-rule">Delete All Product Rules</a></li>
		</ul>
</div>

## Product Rules 

Rules that modify the properties of a product, such as weight, price, and product image.

### Product Rule Object – Properties 

| Name | Type | Description |
| --- | --- | --- |
| id | int | The ID of the rule. |
| product_id | int | The ID of the product to which the rule belongs. |
| sort_order | int | The order in which the rule will be displayed on the product page. Lower integers will give the rule a higher priority. If the rule is given a lower priority, then when updating, all rules with a `sort_order` the same or greater than the rule's new `sort_order` value will have their `sort_order` reordered. |
| is_enabled | boolean | If set to `true`, the rule will be evaluated when a customer configures a product's options. |
| is_stop | boolean | If set to `true` and the rule evaluates to `true`, no more rules with a higher `sort_order` will be processed. |
| price_adjuster | object | If a product option rule specifies a change to the price based on an option, the `price_adjuster` object will consist of two name/value pairs. The first pair is named `adjuster` and contains one of the following values: `relative`, `percentage`, or `absolute`. The `percentage` value causes the price to vary based on either a positive or negative percentage. The `relative` value causes the price to vary by either a positive or negative monetary amount. The `absolute` value resets the price, so it should always be a positive number. The second pair is named `adjuster_value` and contains a decimal value representing one of the following: the amount to add or subtract from the price, the percentage by which the price should change, or the new price (as per the `adjuster` setting). If the product option rule does not specify a change to the price based on size or color, `price_adjuster` will be null. |
| weight_adjuster | object | If a product option rule specifies a change to the weight based on an option, the `weight_adjuster` object will consist of two name/value pairs. The first pair is named `adjuster` and contains one of the following values: `relative` or `absolute`. The `relative` value causes the weight to vary by either a positive or negative amount. The `absolute` value resets the weight, so it should always be a positive number. The second pair is named `adjuster_value` and contains a decimal value representing one of the following: the amount to add or subtract from the weight or the new weight (as per the `adjuster` setting). If the product option rule does not specify a change to the price based on size or color, `weight_adjuster` will be null. |
| is_purchasing_disabled | boolean | If true this rule prohibits purchasing the product with the configured option values. |
| purchasing_disabled_message | string | The message to display if the rule disabled purchasing the product. |
| is_purchasing_hidden | boolean | If true the rule hides the options on the product. Setting this to true has no effect if the rule is based on an SKU or has conditions from multiple product options. |
| image_file | string | When specifying a product rule, the image_file should be specified as either: A path to an rule already uploaded via FTP in the import directory and the path should be relative from the import directory. It can be a URL to an rule accessible on the internet. |
| conditions | array | The conditions array can contain one or more objects. Each object inside the array contains three name/value pairs, but at least one value will be missing at any given time. If a `product_option_id` value is present, then a `option_value_id` must also be present. If `product_option_id` and `option_value_id` values are present, then a `sku_id` value must not be present. This also holds true in the reverse, where if a `sku_id` value exists, values for the `product_option_id` and `option_value_id` cannot exist. NOTE: if you can use a SKU value, this is preferred for simplicity. Empty values are represented as `null`. If multiple objects are included in the array, the software runs through them using an AND/OR logic. Objects with identical `product_option_id` values will be linked with an OR. Objects with different `product_option_id` values will be linked with an AND. When one object contains a `sku_id` value and the other contains `product_option_id` and `option_value_id` values, they will be linked with an AND. Two objects which both contain `sku_id` values will be linked with an OR. |




<a href='#v2-rule_list-product-rules' aria-hidden='true' class='block-anchor'  id='v2-rule_list-product-rules'></a>

## List Product Rules 

Gets the collection of rules associated with a product. (Default sorting is by rule id, from lowest to highest.)


>`GET /stores/{store_hash}/v2/products/{product_id}/rules`


### Filters 

There are no filter parameters specific to product rules.

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 product_rules are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/rules?page={number} |
| limit | int | /api/v2/products/{product_id}/rules?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "product_id": 3,
    "sort_order": 0,
    "is_enabled": true,
    "is_stop": false,
    "price_adjuster": null,
    "weight_adjuster": null,
    "is_purchasing_disabled": false,
    "purchasing_disabled_message": "",
    "is_purchasing_hidden": false,
    "image_file": "attribute_rule_images/1_source.jpg",
    "conditions": [
      {
        "product_option_id": 4,
        "option_value_id": 7,
        "sku_id": null
      }
    ]
  },
  {
    "id": 2,
    "product_id": 3,
    "sort_order": 1,
    "is_enabled": true,
    "is_stop": false,
    "price_adjuster": null,
    "weight_adjuster": null,
    "is_purchasing_disabled": false,
    "purchasing_disabled_message": "",
    "is_purchasing_hidden": false,
    "image_file": "attribute_rule_images/2_source.jpg",
    "conditions": [
      {
        "product_option_id": 4,
        "option_value_id": 8,
        "sku_id": null
      }
    ]
  }
]
```



<a href='#v2-rule-product-rule' aria-hidden='true' class='block-anchor'  id='v2-rule-product-rule'></a>

## Get a Product Rule 

Gets a single product rule.


>`GET /stores/{store_hash}/v2/products/{product_id}/rules/{id}`


### Response 

Example JSON returned in the response:

```
{
  "id": 2,
  "product_id": 3,
  "sort_order": 1,
  "is_enabled": true,
  "is_stop": false,
  "price_adjuster": null,
  "weight_adjuster": null,
  "is_purchasing_disabled": false,
  "purchasing_disabled_message": "",
  "is_purchasing_hidden": false,
  "image_file": "attribute_rule_images/2_source.jpg",
  "conditions": [
    {
      "product_option_id": 4,
      "option_value_id": 8,
      "sku_id": null
    }
  ]
}
```



<a href='#v2-rule_get-count-rule' aria-hidden='true' class='block-anchor'  id='v2-rule_get-count-rule'></a>

## Get a Count of Product Rules 

Gets a count of the number of product rules in the store.

>`GET /stores/{store_hash}/v2/products/rules/count`

### Response 

Example JSON returned in the response:

```
{
  "count": 3
}
```



<a href='#v2-rule_create-product-rule' aria-hidden='true' class='block-anchor'  id='v2-rule_create-product-rule'></a>

## Create a Product Rule 

Creates a new product rule.


>`POST /stores/{store_hash}/v2/products/{product_id}/rules`



### Read-only Properties 

The following properties of the product rule are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id

### Requirements 

The following properties of the product rule are required. The request won’t be fulfilled unless these properties are valid.

*   conditions

### Response 

Example JSON returned in the response:

```
{
  "id": 10,
  "product_id": 3,
  "sort_order": 1,
  "is_enabled": true,
  "is_stop": false,
  "price_adjuster": null,
  "weight_adjuster": null,
  "is_purchasing_disabled": false,
  "purchasing_disabled_message": "",
  "is_purchasing_hidden": false,
  "image_file": "attribute_rule_images/2_source.jpg",
  "conditions": [
    {
      "product_option_id": 4,
      "option_value_id": 8,
      "sku_id": null
    }
  ]
}
```



<a href='#v2-rule_update-product-rule' aria-hidden='true' class='block-anchor'  id='v2-rule_update-product-rule'></a>


## Update a Product Rule 

Updates an existing product rule. 

### Notes 

If you include a conditions object array, its contents will be appended to any existing conditions. This operation does not overwrite existing conditions.

>`PUT /stores/{store_hash}/v2/products/{product_id}/rules/{id}`


### Read-only Properties 

The following properties of the product rule are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id

### Requirements 

There are no property requirements for updating a product rule.

### Response 

Example JSON returned in the response:

```
{
  "id": 2,
  "product_id": 3,
  "sort_order": 2,
  "is_enabled": true,
  "is_stop": false,
  "price_adjuster": null,
  "weight_adjuster": null,
  "is_purchasing_disabled": false,
  "purchasing_disabled_message": "",
  "is_purchasing_hidden": false,
  "image_file": "attribute_rule_images/2_source.jpg",
  "conditions": [
    {
      "product_option_id": 4,
      "option_value_id": 8,
      "sku_id": null
    }
  ]
}
```



<a href='#v2-rule_delete-product-rule' aria-hidden='true' class='block-anchor'  id='v2-rule_delete-product-rule'></a>

## Delete a Product Rule 

Deletes a product rule.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/rules/{id}`



<a href='#v2-rule_delete-all-product-rule' aria-hidden='true' class='block-anchor'  id='v2-rule_delete-all-product-rule'></a>

## Delete Multiple Product Rules 

Deletes multiple product rules.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/rules`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 `product_rules` are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/rules?page={number} |
| limit | int | /api/v2/products/{product_id}/rules?limit={count} 

