# Brands

<div class="otp" id="no-index">

### On This Page
- [Brands](#brands)
- [List Brands](#list-brands)
- [Get a Brand](#get-a-brand)
- [Get a Count of Brands](#get-a-count-of-brands)
- [Create a Brand](#create-a-brand)
- [Update a Brand](#update-a-brand)
- [Delete a Brand](#delete-a-brand)
- [Delete All Brands](#delete-all-brands)

</div> 

## Brands 

Brand facets for identifying and categorizing products according to their manufacturer or company metonym.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

For the most up-to-date version of this API, see [Brands](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/brands).

</div>
</div>
</div>

### Brand Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | int |
| name | string | The name of the brand. Must be unique. |
| page_title | string | The title shown in the browser while viewing the brand. |
| meta_keywords | text | Comma-separated list of meta keywords to include in the HTML. |
| meta_description | text | A meta description to include. |
| image_file | string | A valid image. |
| s

## List Brands 

Gets the collection of brands. (Default sorting is by brand id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/brands`

### Filters 

Filter parameters can be added to the URL query string to select specific brands in the collection.

| Parameter | Type | Example |
|-|-|-|
| name | string | /api/v2/brands?name={value} |
| min_id | int | /api/v2/brands?min_id={value} |
| max_id | int | /api/v2/brands?max_id={value} |

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, BigCommerce returns up to 50 brands by default.

| Parameter | Type | Example |
|-|-|-|
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

## Delete a Brand 

Deletes a brand.

>`DELETE /stores/{store_hash}/v2/brands/{id}`

## Delete All Brands 

Deletes all brands belonging to a product.

>`DELETE /stores/{store_hash}/v2/brands`
