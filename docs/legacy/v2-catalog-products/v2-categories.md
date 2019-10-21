# Categories

<div class="otp" id="no-index">

### On This Page
- [Categories](#categories)
- [List Categories](#list-categories)
- [Get a Category](#get-a-category)
- [Get a Count of Categories](#get-a-count-of-categories)
- [Create a Category](#create-a-category)
- [Update a Category](#update-a-category)
- [Delete a Category](#delete-a-category)
- [Delete All Categories](#delete-all-categories)

</div>

## Categories 

Index of hierarchical categories used to organize and group products.

### Category Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | int | A read-only field containing the unique numeric identifier of this category. |
| parent_id | int | The ID of the parent category to which this category belongs.<br> (NOTE: the total number of parent categories cannot exceed seven.) |
| name | string | The name of the category. Must be unique. |
| description | text | A description for the category. |
| sort_order | int | The sort order of the category. |
| page_title | string | The page title for the category page. |
| meta_keywords | text | Comma-separated list of meta keywords to include in the HTML. |
| meta_description | text | A meta description to include. |
| layout_file | string | A valid layout file. (Please refer to [this article](https://support.bigcommerce.com/articles/Public/Creating-Custom-Template-Files/) on creating category files.) This field is writable only for stores with a Blueprint theme applied. |
| parent_category_list | array | A read-only field containing the ID of this category and the ID of its parent category, if any. |
| image_file | string | A valid image. |
| is_visible | boolean | Is the category visible? |
| search_keywords | string | A comma-separated list of keywords that can be used to locate this brand. |
| url | string | The context path of this category. |

## List Categories 

Gets the list of categories. (Default sorting is by category id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/categories`

### Filters 

Filter parameters can be added to the URL query string to select specific categories in the collection.

| Parameter | Type | Example |
|-|-|-|
| parent_id | string | /api/v2/categories?parent_id={value} |
| name | string | /api/v2/categories?name={value} |
| is_visible | string | /api/v2/categories?is_visible={value} |
| min_id | int | /api/v2/categories?min_id={value} |
| max_id | int | /api/v2/categories?max_id={value} |

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 categories are returned by default.

| Parameter | Type | Example |
|-|-|-|
| Page | int | /api/v2/categories?page={number} |
| Limit | int | /api/v2/categories?limit={count} |

### Response

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "parent_id": 0,
    "name": "Shop Mac",
    "description": "",
    "sort_order": 0,
    "page_title": "",
    "meta_keywords": "",
    "meta_description": "",
    "layout_file": "category.html",
    "parent_category_list": [
      1
    ],
    "image_file": "",
    "is_visible": true,
    "search_keywords": "",
    "url": "/shop-mac/"
  }
]
```

## Get a Category 

Gets a single category.

>`GET /stores/{store_hash}/v2/categories/{id}`

### Response

Example JSON returned in the response:

```json
{
  "id": 10,
  "parent_id": 1,
  "name": "Xmen toys",
  "description": "",
  "sort_order": 2,
  "page_title": "",
  "meta_keywords": null,
  "meta_description": null,
  "layout_file": "category.html",
  "parent_category_list": [
    1,
    10
  ],
  "image_file": "d/apiy2uz6q__69888.jpg",
  "is_visible": true,
  "search_keywords": "",
  "url": "/xmen-toys/"
}
```

## Get a Count of Categories 

Gets a count of the total number of categories in the store.

>`GET /stores/{store_hash}/v2/categories/count`

### Response

Example JSON returned in the response:

```json
{
  "count": 10
}
```

## Create a Category 

Creates a new category.

>`POST /stores/{store_hash}/v2/categories`

### Read-only Properties 

The following properties of the category are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   parent_category_list

### Requirements 

The following properties of the category are required. The request won’t be fulfilled unless these properties are valid.

*   name

### Notes 

To maximize system performance, BigCommerce caps the number of categories that can be added to a store at 16,000. If your `POST` causes the store to exceed the maximum of 16,000 categories, BigCommerce will return a 403 error.

In addition, BigCommerce caps the total number of parent categories at seven. If your `POST` includes the ID of a parent category in the `parent_id` field, BigCommerce will check that parent category and its parent and so on to determine the total number of parent categories. If your `POST` would cause the total number of parent categories to exceed seven, BigCommerce will return a 403 error.

### Request

Example request object:

```json
{
  "name": "Xmen toys"
}
```

### Response

Example JSON returned in the response:

```json
{
  "id": 10,
  "parent_id": 1,
  "name": "Xmen toys",
  "description": "",
  "sort_order": 2,
  "page_title": "",
  "meta_keywords": null,
  "meta_description": null,
  "layout_file": "category.html",
  "parent_category_list": [
    1,
    10
  ],
  "image_file": "d/apiy2uz6q__69888.jpg",
  "is_visible": true,
  "search_keywords": "",
  "url": "/xmen-toys/"
}
```

## Update a Category 

Updates an existing category.

>`PUT /stores/{store_hash}/v2/categories/{id}`

### Read-only Properties 

The following properties of the category are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   parent_category_list

### Requirements 

The following properties of the category are required. The request won’t be fulfilled unless these properties are valid.

### Notes 

To maximize system performance, BigCommerce caps the total number of parent categories at seven. If your `PUT` includes the ID of a parent category in the `parent_id` field, BigCommerce will check the parent and any children of the current category to determine the total number of parent categories. If your `PUT` would cause the total number of parent categories to exceed the maximum of seven, BigCommerce will return a 403 error.

### Response

Example JSON returned in the response:

```json
{
  "id": 10,
  "parent_id": 1,
  "name": "Xmen toys",
  "description": "",
  "sort_order": 2,
  "page_title": "",
  "meta_keywords": null,
  "meta_description": null,
  "layout_file": "category.html",
  "parent_category_list": [
    1,
    10
  ],
  "image_file": "d/apiy2uz6q__69888.jpg",
  "is_visible": true,
  "search_keywords": "",
  "url": "/xmen-toys/"
}
```

## Delete a Category 

Deletes a category.

>`DELETE /stores/{store_hash}/v2/categories/{id}`

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Delete Products before Categories
> The Delete All Categories operation will not succeed unless the store has zero products. If any products in the store belong to any categories, the entire operation will fail. Therefore, if you really want to delete all the categories of the store, you must first delete all of the products in the store.

</div>
</div>
</div>

## Delete All Categories 

Deletes all the categories in the store.

>`DELETE /stores/{store_hash}/v2/categories`
