# Brands
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-brands_object-properties">Object Properties</a></li>
		<li><a href="#v2-brands_list-brands">List Brands</a></li>
		<li><a href="#v2-brands_get-brands">Get a Brand</a></li>
    <li><a href="#v2-brands_get-count-brands">Get a Count of Brands</a></li>
    <li><a href="#v2-brands_create-brands">Create a Brand</a></li>
    <li><a href="#v2-brands_update-brands">Update A Brand</a></li>
    <li><a href="#v2-brands_delete-brands">Delete a Brand</a></li>
    <li><a href="#v2-brands_delete-all-brands">Delete All Brands</a></li>
		</ul>
</div>

<a href='#v2-brands_object-properties' aria-hidden='true' class='block-anchor'  id='v2-brands_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## Brands 

Brand facets for identifying and categorizing products according to their manufacturer or company metonym.

### Brand Object – Properties 

| Name | Type | Description |
| --- | --- | --- |
| id | int |
| name | string | The name of the brand. Must be unique. |
| page_title | string | The title shown in the browser while viewing the brand. |
| meta_keywords | text | Comma-separated list of meta keywords to include in the HTML. |
| meta_description | text | A meta description to include. |
| image_file | string | A valid image. |
| s

---

<a href='#v2-brands_list-brands' aria-hidden='true' class='block-anchor'  id='v2-brands_list-brands'><i aria-hidden='true' class='linkify icon'></i></a>

## List Brands 

Gets the collection of brands. (Default sorting is by brand id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/brands`

### Filters 

Filter parameters can be added to the URL query string to select specific brands in the collection.

| Parameter | Type | Example |
| --- | --- | --- |
| name | string | /api/v2/brands?name={value} |
| min_id | int | /api/v2/brands?min_id={value} |
| max_id | int | /api/v2/brands?max_id={value} |

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, BigCommerce returns up to 50 brands by default.

| Parameter | Type | Example |
| --- | --- | --- |
| Page | int | /api/v2/brands?page={number} |
| Limit | int | /api/v2/brands?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "name": "Apple",
    "page_title": "",
    "meta_keywords": "",
    "meta_description": "",
    "image_file": "",
    "search_keywords": ""
  },
  {
    "id": 2,
    "name": "Microsoft",
    "page_title": "",
    "meta_keywords": "",
    "meta_description": "",
    "image_file": "",
    "search_keywords": ""
  }
]
```

---

<a href='#v2-brands_get-brands' aria-hidden='true' class='block-anchor'  id='v2-brands_get-brands'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Brand 

Gets a brand.


>`GET /stores/{store_hash}/v2/brands/{id}`


### Response 

Example JSON returned in the response:

```json
{
  "id": 1,
  "name": "Apple",
  "page_title": "",
  "meta_keywords": "",
  "meta_description": "",
  "image_file": "",
  "search_keywords": ""
}
```

---

<a href='#v2-brands_get-count-brands' aria-hidden='true' class='block-anchor'  id='v2-brands_get-count-brands'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Count of Brands 

Returns the total number of brands in the store.

>`GET /stores/{store_hash}/v2/brands/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 25
}
```

---

<a href='#v2-brands_create-brands' aria-hidden='true' class='block-anchor'  id='v2-brands_create-brands'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a Brand 

Creates a new brand.

>`POST /stores/{store_hash}/v2/brands`


### Read-only Properties 

The following properties of the brand are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id

### Requirements 

The following properties of the brand are required. The request won’t be fulfilled unless these properties are valid.

*   name

### Notes 

To maximize system performance, BigCommerce caps the number of brands that can be added to a store at 30,000. If your POST causes the store to exceed the maximum of 30,000 brands, BigCommerce will return a 403 error.

### Request 

Example request object:

```json
{
  "name": "Xmen",
  "page_title": "X men brand"
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 10,
  "name": "Xmen",
  "page_title": "X men brand",
  "meta_keywords": null,
  "meta_description": null,
  "image_file": "",
  "search_keywords": ""
}
```

---

<a href='#v2-brands_update-brands' aria-hidden='true' class='block-anchor'  id='v2-brands_update-brands'><i aria-hidden='true' class='linkify icon'></i></a>


## Update a Brand 

Updates an existing brand.


>`PUT /stores/{store_hash}/v2/brands/{id}`


### Read-only Properties 

The following properties of the brand are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id

### Requirements 

The following properties of the brand are required. The request won’t be fulfilled unless these properties are valid.

### Response 

Example JSON returned in the response:

```json
{
  "id": 10,
  "name": "Xmen",
  "page_title": "X men brand",
  "meta_keywords": null,
  "meta_description": null,
  "image_file": "t/apirmzk0a__43675.jpg",
  "search_keywords": "xmen, awesomeness"
}
```

---

<a href='#2-brands_delete-brands' aria-hidden='true' class='block-anchor'  id='2-brands_delete-brands'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete a Brand 

Deletes a brand.

>`DELETE /stores/{store_hash}/v2/brands/{id}`

---

<a href='#v2-brands_delete-all-brands' aria-hidden='true' class='block-anchor'  id='v2-brands_delete-all-brands'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete All Brands 

Deletes all brands belonging to a product.

>`DELETE /stores/{store_hash}/v2/brands`

