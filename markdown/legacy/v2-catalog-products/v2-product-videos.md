<h1>Product Videos</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-video_object-properties">Object Properties</a></li>
		<li><a href="#v2-video_list-product-videos">List Product SKU</a></li>
		<li><a href="#v2-sku_get-product-video">Get Product Video</a></li>
    <li><a href="#v2-video_get-count-video">Get a Count of Product Videos</a></li>
    <li><a href="#v2-video_create-product-video">Create Product Video</a></li>
    <li><a href="#v2-video_update-product-video-metadata">Update Product Video Metadata</a></li>
    <li><a href="#v2-video_delete-product-video">Delete a Product Video</a></li>
    <li><a href="#v2-video_delete-all-product-video">Delete All Product Videos</a></li>
		</ul>
</div>

<a href='#v2-video_object-properties' aria-hidden='true' class='block-anchor'  id='v2-video_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## Videos 

Embedded videos displayed on product listings.

### Videos Object – Properties 

| Name | Type | Description |
| --- | --- | --- |
| id | string | ID of this video. |
| product_id | int | ID of the associated product. |
| sort_order | int | Sort order for this video. |
| name | string | Name for this video. |

---

<a href='#v2-video_list-product-videos' aria-hidden='true' class='block-anchor'  id='v2-video_list-product-videos'><i aria-hidden='true' class='linkify icon'></i></a>

## List Product Videos 

Gets the videos associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/videos`


### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 `product_videos` are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
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

---

<a href='#v2-sku_get-product-video' aria-hidden='true' class='block-anchor'  id='v2-sku_get-product-video'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Product Video 

Gets a product video.

>`GET /stores/{store_hash}/v2/products/{product_id}/videos/{id}`

---

<a href='#v2-video_get-count-video' aria-hidden='true' class='block-anchor'  id='v2-video_get-count-video'><i aria-hidden='true' class='linkify icon'></i></a>

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

---

<a href='#v2-video_create-product-video' aria-hidden='true' class='block-anchor'  id='v2-video_create-product-video'><i aria-hidden='true' class='linkify icon'></i></a>

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

<a href='#v2-video_update-product-video-metadata' aria-hidden='true' class='block-anchor'  id='v2-video_update-product-video-metadata'><i aria-hidden='true' class='linkify icon'></i></a>

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

---

<a href='#v2-video_delete-product-video' aria-hidden='true' class='block-anchor'  id='v2-video_delete-product-video'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete a Product Video 

Delete a product video.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/videos/{id}`

---

<a href='#v2-video_delete-all-product-video' aria-hidden='true' class='block-anchor'  id='v2-video_delete-all-product-video'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete All Product Videos 

Deletes all videos belonging to a product.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/videos`

