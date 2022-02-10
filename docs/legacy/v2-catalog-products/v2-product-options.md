# Product Options

 

## Product Options 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

For the most up-to-date version of this API, see [Product Options](/api-reference/store-management/catalog/product-variant-options).

</div>
</div>
</div>

### Product Options Object – Properties 

| Title | Name | Type | Description |
|-|-|-|-|
| `id` | `int` |
| `option_id` | `int` |
| `display_name` | `string` |
| `sort_order` | `int` |
| `is_required` | `boolean` |

## List Product Options

Gets the options associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/options`

### Pagination

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250\. If a limit isn’t provided, up to 50 product_options are returned by default.

| Parameter | Type | Example |
|-|-|-|
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
