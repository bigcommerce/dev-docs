<h1>Product Options</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-options_object-properties">Object Properties</a></li>
		<li><a href="#v2-review_list-product-reviews">List Product Options</a></li>
		<li><a href="#v2-review-product-options">Get Product Options</a></li>
		</ul>
</div>

<a href='#v2-options_object-properties' aria-hidden='true' class='block-anchor'  id='v2-options_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## Product Options 

### Product Options Object – Properties 

| Title | Name | Type | Description |
| --- | --- | --- | --- |
| `id` | `int` |
| `option_id` | `int` |
| `display_name` | `string` |
| `sort_order` | `int` |
| `is_required` | `boolean` |




<a href='#v2-review_list-product-reviews' aria-hidden='true' class='block-anchor'  id='v2-review_list-product-reviews'><i aria-hidden='true' class='linkify icon'></i></a>

## List Product Options

Gets the options associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/options`

### Pagination

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250\. If a limit isn’t provided, up to 50 product_options are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| `page` | int | `/api/v2/products/{product_id}/options?page={number}` |
| `limit` | int | `/api/v2/products/{product_id}/options?limit={count}` |

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

<a href='#v2-review-product-options' aria-hidden='true' class='block-anchor'  id='v2-review-product-options'><i aria-hidden='true' class='linkify icon'></i></a>

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

