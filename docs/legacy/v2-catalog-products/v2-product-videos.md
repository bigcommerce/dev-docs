# Product Videos

<div class="otp" id="no-index">

### On This Page
- [Videos](#videos)
- [List Product Videos](#list-product-videos)
- [Get a Product Video](#get-a-product-video)
- [Get a Count of Product Videos](#get-a-count-of-product-videos)
- [Create a Product Video](#create-a-product-video)
- [Update Product Video Metadata](#update-product-video-metadata)
- [Delete a Product Video](#delete-a-product-video)
- [Delete All Product Videos](#delete-all-product-videos)

</div> 

## Videos 

Embedded videos displayed on product listings.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

For the most up-to-date version of this API, see [Product Videos](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-videos).

</div>
</div>
</div>

### Videos Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | string | ID of this video. |
| product_id | int | ID of the associated product. |
| sort_order | int | Sort order for this video. |
| name | string | Name for this video. |

## List Product Videos 

Gets the videos associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/videos`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 `product_videos` are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/videos?page={number} |
| limit | int | /api/v2/products/{product_id}/videos?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": "UmhvxsOwhqk",
    "product_id": 30,
    "sort_order": 0,
    "name": "X-Men Evolution: Season 1, Episode 1"
  }
]
```

## Get a Product Video 

Gets a product video.

>`GET /stores/{store_hash}/v2/products/{product_id}/videos/{id}`

## Get a Count of Product Videos 

Gets a count of the number of product videos in the store.

>`GET /stores/{store_hash}/v2/products/videos/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 0
}
```

## Create a Product Video 

Adds a link to a YouTube video to a product.

>`POST /stores/{store_hash}/v2/products/{product_id}/videos`

### Read-only Properties 

The following properties of the product video are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id

### Requirements 

The following properties of the product video are required. The request won’t be fulfilled unless these properties are valid.

*   url

### Notes 

Only YouTube videos are supported. To create a new video, pass the full `url` in the request body.

### Request 

Example request object:

```json
{
  "url": "https://www.youtube.com/watch?v=4wZ3ZG_Wams"
}
```

## Update Product Video Metadata 

Edit the metadata of a product video.

>`PUT /stores/{store_hash}/v2/products/{product_id}/videos/{id}`

### Read-only Properties 

The following properties of the product video are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id

### Requirements 

There are no required properties when updating a product video. 

### Notes 

The `name`, `sort_order` and `url` properties of the product video are editable.

Posting a new `url` will update the `id` of the video to reference the new video.

### Request 

Example request object:

```json
{
  "name": "New video title",
  "sort_order": 2
}
```

## Delete a Product Video 

Delete a product video.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/videos/{id}`

## Delete All Product Videos 

Deletes all videos belonging to a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/videos`
