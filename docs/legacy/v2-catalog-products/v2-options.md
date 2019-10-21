# Product Options

<div class="otp" id="no-index">

### On This Page
- [Options](#options)
- [List Product Options](#list-product-options)
- [Get a Product Option](#get-a-product-option)

</div> 

## Options 

Shared attributes that control value facets on a product.

### Options Object – Properties 

| Name | Type | Description |
|-|-|-|
| name | string | Required field. The option's name, as used internally. Must be unique. |
| display_name | string | Optional field. The option's name, as displayed on the storefront. Defaults to same value as `name`. However, a custom value can be defined here, and can be reused among multiple options. |
| type | string | Optional field. The type of option, which determines how it will display on the storefront. Acceptable values: <br> `C`: Checkbox; <br>`D`: Date field; <br>`F`: File upload field; <br>`MT`: Multi-line text field; <br>`RB`: Radio buttons; <br>`RT`: Rectangular boxes (for product sizes); <br>`S`: Select/drop-down list; <br>`C`: Numbers-only text field; <br>`P`: Product Pick list; <br>`CS`: Color/texture Swatch; <br>`T`: Text field.  |
| values | object | Optional field. Object containing option values: a `url` and a `resource`. |
| product_id | integer | Optional field; read-only. If `null`, this option can be reused with any product. If populated with a numeric ID, this option can be used exclusively with the corresponding product. |

## List Product Options 

Gets the options associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/options`

### Filters 

There are no filter parameters specific to product options. 

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 product_options are returned by default.

| Parameter | Type | Example |
|-|-|-|
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

## Get a Product Option 

Gets an option associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/options/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 14,
  "option_id": 9,
  "display_name": "Accessories",
  "sort_order": 1,
  "is_required": false
}
```
