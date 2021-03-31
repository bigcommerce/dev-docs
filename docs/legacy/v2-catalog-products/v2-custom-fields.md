# Custom Fields

<div class="otp" id="no-index">

### On This Page
- [Custom Fields](#custom-fields)
- [List Custom Fields](#list-custom-fields)
- [Get a Custom Field](#get-a-custom-field)
- [Get a Count of Custom Fields](#get-a-count-of-custom-fields)
- [Create a Custom Field](#create-a-custom-field)
- [Delete a Custom Field](#delete-a-custom-field)
- [Delete Multiple Custom Fields](#delete-multiple-custom-fields)

</div> 

## Custom Fields 

Custom fields associated with a product.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

For the most up-to-date version of this API, see [Product Custom Fields](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-custom-fields).

</div>
</div>
</div>

### Custom Field Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | int | |
| product_id | int | ID of the associated product |
| name | string | key; limited to 250 characters |
| text | string | value; limited to 250 characters |

| **Manages** | **OAuth Scopes** |
|-|-|
| store_v2_products|store_v2_products_read_only

## List Custom Fields 

Gets custom fields associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/custom_fields`

### Filters 

There are no filter parameters specific to `custom_fields`.

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 custom_fields are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/custom_fields?page={number} |
| limit | int | /api/v2/products/{product_id}/custom_fields?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "product_id": 30,
    "name": "Toy manufactured in",
    "text": "USA"
  },
  {
    "id": 2,
    "product_id": 45,
    "name": "Release Date",
    "text": "2013-12-25"
  }
]
```

## Get a Custom Field 

Gets a custom field associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/custom_fields/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 2,
  "product_id": 30,
  "name": "Toy manufactured in",
  "text": "USA"
}
```

## Get a Count of Custom Fields 

Gets a count of the number of custom fields in the store.

>`GET /stores/{store_hash}/v2/products/custom_fields/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 0
}
```

## Create a Custom Field 

Creates a new custom field associated with a product

>`POST /stores/{store_hash}/v2/products/{product_id}/custom_fields`

### Read-only Properties 

The following properties of the custom field are read-only. If one or more of these properties are included in the request, it will be rejected.

*   product_id

### Requirements 

The following properties of the custom field are required. The request won’t be fulfilled unless these properties are valid.

*   name
*   text

### Request 

Example request object:

```json
{
  "name": "Release Date",
  "text": "2013-12-25"
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 5,
  "product_id": 45,
  "name": "Release Date",
  "text": "2013-12-25"
}

## Update a Custom Field 

Updates an existing custom field associated with a product.

>`PUT /stores/{store_hash}/v2/products/{product_id}/custom_fields/{id}`

### Read-only Properties 

The following properties of the custom field are read-only. If one or more of these properties are included in the request, it will be rejected.

*   product_id

### Requirements 

The following properties of the custom field are required. The request won’t be fulfilled unless these properties are valid.

*   name
*   text

### Request 

Example request object:

```json
{
  "name": "Release Date",
  "text": "2013-12-31"
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 5,
  "product_id": 45,
  "name": "Release Date",
  "text": "2013-12-31"
}
```

## Delete a Custom Field 

Deletes a custom field associated with a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/custom_fields/{id}`

## Delete Multiple Custom Fields 

Deletes multiple custom fields associated with a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/custom_fields`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 custom_fields are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/custom_fields?page={number} |
| limit | int | /api/v2/products/{product_id}/custom_fields?limit={count} |
