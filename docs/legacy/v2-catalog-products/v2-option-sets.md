# Option Sets

<div class="otp" id="no-index">

### On This Page
- [Option Sets](#option-sets)
- [List Option Sets](#list-option-sets)
- [Get an Option Set](#get-an-option-set)
- [Get a Count of Option Sets](#get-a-count-of-option-sets)
- [Create an Option Set](#create-an-option-set)
- [Update an Option Set](#update-an-option-set)
- [Delete an Option Set](#delete-an-option-set)
- [Delete All Option Sets](#delete-all-option-sets)

</div> 

## Option Sets 

A reusable set of option facets that can be applied to products.

### Option Set Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | int | Optional field. Unique numeric ID for this option set. Increments sequentially. |
| name | string | Required field. The option set's name, as used internally. Must be unique. |
| options | object/resource | Optional field; read-only. Object containing option-set options: a `url` and a `resource`. |
| product_id (optional) | integer | Optional field; read-only. If `null`, this option set can be reused with any product. If populated with a numeric ID, this option set can be used exclusively with the corresponding product. |

## List Option Sets 

Gets the collection of option sets. (Default sorting is by option-set id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/option_sets`

### Filters 

Filter parameters can be added to the URL query string to select specific option_sets in the collection.

| Parameter | Type | Example |
|-|-|-|
| name | string | /api/v2/option_sets?name={value} |

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 option_sets are returned by default.

| Parameter | Type | Example |
|-|-|-|
| Page | int | /api/v2/option_sets?page={number} |
| Limit | int | /api/v2/option_sets?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "product_id": null,
    "name": "MacBook",
    "options": {
      "url": "https://store-bwvr466.mybigcommerce.com/api/v2/optionsets/1/options.json",
      "resource": "/optionsets/1/options",
      "product_id": null
    }
  },
  {
    "id": 2,
    "product_id": null,
    "name": "PixelSkin Case",
    "options": {
      "url": "https://store-bwvr466.mybigcommerce.com/api/v2/optionsets/2/options.json",
      "resource": "/optionsets/2/options",
      "product_id": null
    }
  }
]
```

## Get an Option Set 

Gets an option set.

>`GET /stores/{store_hash}/v2/option_sets/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 10,
  "product_id": null,
  "name": "T-Shirt Facets",
  "options": {
    "url": "https://store-bwvr466.mybigcommerce.com/api/v2/optionsets/10/options.json",
    "resource": "/optionsets/13/options",
    "product_id": null
  }
}
```

## Get a Count of Option Sets 

Gets a count of the number of option sets in the store.

>`GET /stores/{store_hash}/v2/option_sets/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 4
}
```

## Create an Option Set 

Creates a new Option set.

>`POST /stores/{store_hash}/v2/option_sets`

### Read-only Properties 

The following properties of the option set are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   options

### Requirements 

The following properties of the option set are required. The request won’t be fulfilled unless these properties are valid.

*   name

### Request 

Example request object:

```json
{
  "name": "T-Shirts"
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 10,
  "product_id": null,
  "name": "T-Shirts",
  "options": {
    "url": "https://store-bwvr466.mybigcommerce.com/api/v2/optionsets/10/options.json",
    "resource": "/optionsets/10/options",
    "product_id": null
  }
}
```

## Update an Option Set 

Updates an existing option set.

>`PUT /stores/{store_hash}/v2/option_sets/{id}`

### Read-only Properties 

The following properties of the option set are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   options

### Requirements 

The following properties of the option set are required. The request won’t be fulfilled unless these properties are valid.

*   name

### Request 

Example request object:

```json
{
  "name": "T-shirt Facets"
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 10,
  "product_id": null,
  "name": "T-shirt Facets",
  "options": {
    "url": "https://store-bwvr466.mybigcommerce.com/api/v2/optionsets/10/options.json",
    "resource": "/optionsets/13/options",
    "product_id": null
  }
}
```

## Delete an Option Set 

Deletes an option set.

>`DELETE /stores/{store_hash}/v2/option_sets/{id}`

## Delete All Option Sets 

Deletes all option sets in the store.

>`DELETE /stores/{store_hash}/v2/option_sets`
