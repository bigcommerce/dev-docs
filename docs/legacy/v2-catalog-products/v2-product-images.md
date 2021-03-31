# Product Images

<div class="otp" id="no-index">

### On This Page
- [Product Images](#product-images)
- [Get a Product Image](#get-a-product-image)
- [Get a Count of Product Images](#get-a-count-of-product-images)
- [Create a Product Image](#create-a-product-image)
- [Update a Product Image](#update-a-product-image)
- [Delete a Product Image](#delete-a-product-image)
- [Delete Multiple Product Images](#delete-multiple-product-images)

</div> 

## Product Images 

Images associated with a product.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

For the most up-to-date version of this API, see [Product Images](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-images).

</div>
</div>
</div>

### Product Image Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | int |
| product_id | int | The ID of the product to which the image belongs. |
| image_file | string | When specifying a product image, the `image_file` should be specified as either: a path to an image already uploaded via WebDAV to the import directory (with the path relative to the import directory); or a URL to an image accessible on the internet. |
| is_thumbnail | boolean | If true, the image is used as the product's thumbnail. |
| sort_order | int | The order in which the image will be displayed on the product page. Lower integers will give the image a higher priority. If the image is given a lower priority, then when updating, all images with a `sort_order` the same or greater than the image's new `sort_order` value will have their `sort_order` reordered. |
| description | text | The description for the image |
| date_created | date |

### List Product Images 

Gets the images associated with a product. (Default sorting is by image id, from lowest to highest.)

>GET /stores/{store_hash}/v2/products/{product_id}/images

### Filters 

There are no filter parameters specific to product images.

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 product_images are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/images?page={number} |
| limit | int | /api/v2/products/{product_id}/images?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 247,
    "product_id": 32,
    "image_file": "sample_images/in_123__14581.jpg",
    "zoom_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.1280.1280.jpg?c=1",
    "thumbnail_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.386.513.jpg?c=1",
    "standard_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.220.290.jpg?c=1",
    "tiny_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.44.58.jpg?c=1",
    "is_thumbnail": true,
    "sort_order": 0,
    "description": null,
    "date_created": "Mon, 24 Sep 2012 01:14:30 +0000"
  },
  {
    "id": 248,
    "product_id": 32,
    "image_file": "sample_images/in_122__93910.jpg",
    "zoom_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.1280.1280.jpg?c=1",
    "thumbnail_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.386.513.jpg?c=1",
    "standard_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.220.290.jpg?c=1",
    "tiny_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.44.58.jpg?c=1",
    "is_thumbnail": false,
    "sort_order": 1,
    "description": null,
    "date_created": "Mon, 24 Sep 2012 01:17:14 +0000"
  }
]
```

## Get a Product Image 

Gets a product image.

>`GET /stores/{store_hash}/v2/products/{product_id}/images/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 248,
  "product_id": 32,
  "image_file": "sample_images/in_122__93910.jpg",
  "zoom_url": "https://cdn.bcapp.dev/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.1280.1280.jpg?c=1",
  "thumbnail_url": "https://cdn.bcapp.dev/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.386.513.jpg?c=1",
  "standard_url": "https://cdn.bcapp.dev/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.220.290.jpg?c=1",
  "tiny_url": "https://cdn.bcapp.dev/bcapp/et7xe3pz/products/32/images/248/in_122__93910.1393831046.44.58.jpg?c=1",
  "is_thumbnail": false,
  "sort_order": 1,
  "description": null,
  "date_created": "Mon, 24 Sep 2012 01:17:14 +0000"
}
```

## Get a Count of Product Images 

Gets a count of the number of product images in the store.

>`GET /stores/{store_hash}/v2/products/images/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 105
}
```

## Create a Product Image 

Creates a new product image.

>`POST /stores/{store_hash}/v2/products/{product_id}/images`

### Read-only Properties 

The following properties of the product image are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   date_created
*   product_id

### Requirements 

The following properties of the product image are required. The request won’t be fulfilled unless these properties are valid.

*   image_file

### Response 

Example JSON returned in the response:

```json
{
  "id": 116,
  "product_id": 29,
  "image_file": "p/022/astonishing-x-men-1-100k__36562.jpg",
  "is_thumbnail": false,
  "sort_order": 0,
  "description": "",
  "date_created": "Fri, 21 Dec 2012 18:54:04 +0000"
}
```

## Update a Product Image 

Updates an existing product image.

>`PUT /stores/{store_hash}/v2/products/{product_id}/images/{id}`

### Read-only Properties 

The following properties of the product image are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id
*   date_created

### Requirements 

The following properties of the product image are required. The request won’t be fulfilled unless these properties are valid.

### Response 

Example JSON returned in the response:

```json
{
  "id": 118,
  "product_id": 30,
  "image_file": "k/392/ud2vk0n1l0zcfr7gtlqi__43888.png",
  "is_thumbnail": false,
  "sort_order": 1,
  "description": "",
  "date_created": "Fri, 21 Dec 2012 19:01:03 +0000"
}
```

## Delete a Product Image 

Deletes a product image.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/images/{id}`

## Delete Multiple Product Images 

Deletes multiple product images.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/images`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 `product_images` are returned by default.

| Parameter | Type | Example |
|-|-|-|
| Page | int | /api/v2/products/{product_id}/images?page={number} |
| Limit | int | /api/v2/products/{product_id}/images?limit={count} |
