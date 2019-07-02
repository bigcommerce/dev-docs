<h1>Product Options</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-option_object-properties">Object Properties</a></li>
		<li><a href="#v2-option-set_list-product-option">List Option Set</a></li>
		<li><a href="#v2-option-set_get-product-option">Get Option Set</a></li>
		</ul>
</div>

<a href='#v2-option_object-properties' aria-hidden='true' class='block-anchor'  id='v2-option_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## Options 

Shared attributes that control value facets on a product.

### Options Object – Properties 

| Name | Type | Description |
|---|---|---|
| name | string | Required field. The option's name, as used internally. Must be unique. |
| display_name | string | Optional field. The option's name, as displayed on the storefront. Defaults to same value as `name`. However, a custom value can be defined here, and can be reused among multiple options. |
| type | string | Optional field. The type of option, which determines how it will display on the storefront. Acceptable values: <br> `C`: Checkbox; <br>`D`: Date field; <br>`F`: File upload field; <br>`MT`: Multi-line text field; <br>`RB`: Radio buttons; <br>`RT`: Rectangular boxes (for product sizes); <br>`S`: Select/drop-down list; <br>`C`: Numbers-only text field; <br>`P`: Product Pick list; <br>`CS`: Color/texture Swatch; <br>`T`: Text field.  |
| values | object | Optional field. Object containing option values: a `url` and a `resource`. |
| product_id | integer | Optional field; read-only. If `null`, this option can be reused with any product. If populated with a numeric ID, this option can be used exclusively with the corresponding product. |




<a href='#v2-option-set_list-product-option' aria-hidden='true' class='block-anchor'  id='v2-option-set_list-product-option'><i aria-hidden='true' class='linkify icon'></i></a>

## List Product Options 

Gets the options associated with a product.


>`GET /stores/{store_hash}/v2/products/{product_id}/options`

### Filters 

There are no filter parameters specific to product options. 

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 product_options are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/options?page={number} |
| limit | int | /api/v2/products/{product_id}/options?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 13,
    "option_id": 8,
    "display_name": "iPod Capacities",
    "sort_order": 0,
    "is_required": true
  },
  {
    "id": 14,
    "option_id": 9,
    "display_name": "Accessories",
    "sort_order": 1,
    "is_required": false
  }
]
```



<a href='#v2-option-set_get-product-option' aria-hidden='true' class='block-anchor'  id='v2-option-set_get-product-option'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Product Option 

Gets an option associated with a product.


>`GET /stores/{store_hash}/v2/products/{product_id}/options/{id}`

### Response 

Example JSON returned in the response:

```
{
  "id": 14,
  "option_id": 9,
  "display_name": "Accessories",
  "sort_order": 1,
  "is_required": false
}
```

