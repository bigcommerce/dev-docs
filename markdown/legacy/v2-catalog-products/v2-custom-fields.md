<h1>Custom Fields</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-custom-fields_object-properties">Object Properties</a></li>
		<li><a href="#v2-custom-fields_list-custom-fields">List Custom Fields</a></li>
		<li><a href="#v2-custom-fields_get-custom-fields">Get Custom Fields</a></li>
    <li><a href="#v2-custom-fields_get-count-custom-fields">Get a Count of Custom Fields</a></li>
    <li><a href="#v2-custom-fields_create-custom-fields">Create Custom Fields</a></li>
    <li><a href="#v2-custom-fields_update-custom-fields">Update Custom Fields</a></li>
    <li><a href="#v2-custom-fields_delete-custom-fields">Delete an Custom Fields</a></li>
    <li><a href="#v2-custom-fields_delete-multiple-custom-fields">Delete Multiple Custom Fields</a></li>
		</ul>
</div>


<a href='#v2-custom-fields_object-properties' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_object-properties'></a>

## Custom Fields 

Custom fields associated with a product.

### Custom Field Object – Properties 

| Name | Type | Description |
| --- | --- | --- |
| id | int | |
| product_id | int | ID of the associated product |
| name | string | key; limited to 250 characters |
| text | string | value; limited to 250 characters |

<a href='#v2-custom-fields_list-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_list-custom-fields'></a>

|||
|---|---|
| **Manages** |
| **OAuth Scopes** | store_v2_products
||store_v2_products_read_only

## List Custom Fields 

Gets custom fields associated with a product.


>`GET /stores/{store_hash}/v2/products/{product_id}/custom_fields`

### Filters 

There are no filter parameters specific to `custom_fields`.

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 custom_fields are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
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



<a href='#v2-custom-fields_get-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_get-custom-fields'></a>

## Get a Custom Field 

Gets a custom field associated with a product.


>`GET /stores/{store_hash}/v2/products/{product_id}/custom_fields/{id}`

### Response 

Example JSON returned in the response:

```
{
  "id": 2,
  "product_id": 30,
  "name": "Toy manufactured in",
  "text": "USA"
}
```



<a href='#v2-custom-fields_get-count-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_get-count-custom-fields'></a>

## Get a Count of Custom Fields 

Gets a count of the number of custom fields in the store.

>`GET /stores/{store_hash}/v2/products/custom_fields/count`

### Response 

Example JSON returned in the response:

```
{
  "count": 0
}
```



<a href='#v2-custom-fields_create-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_create-custom-fields'></a>

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

```
{
  "name": "Release Date",
  "text": "2013-12-25"
}
```

### Response 

Example JSON returned in the response:

```
{
  "id": 5,
  "product_id": 45,
  "name": "Release Date",
  "text": "2013-12-25"
}



<a href='#v2-custom-fields_update-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_update-custom-fields'></a>

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

```
{
  "name": "Release Date",
  "text": "2013-12-31"
}
```

### Response 

Example JSON returned in the response:

```
{
  "id": 5,
  "product_id": 45,
  "name": "Release Date",
  "text": "2013-12-31"
}
```



<a href='#v2-custom-fields_delete-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_delete-custom-fields'></a>


## Delete a Custom Field 

Deletes a custom field associated with a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/custom_fields/{id}`



<a href='#v2-custom-fields_delete-multiple-custom-fields' aria-hidden='true' class='block-anchor'  id='v2-custom-fields_delete-multiple-custom-fields'></a>

## Delete Multiple Custom Fields 

Deletes multiple custom fields associated with a product.


>`DELETE /stores/{store_hash}/v2/products/{product_id}/custom_fields`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 custom_fields are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/custom_fields?page={number} |
| limit | int | /api/v2/products/{product_id}/custom_fields?limit={count} |

