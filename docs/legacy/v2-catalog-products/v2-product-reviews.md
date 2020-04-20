# Product Reviews

<div class="otp" id="no-index">

### On This Page
- [Product Reviews](#product-reviews)
- [List Product Reviews](#list-product-reviews)
- [Get a Product Review](#get-a-product-review)
- [Create a Product Review](#create-a-product-review)
- [Update a Product Review](#update-a-product-review)
- [Delete a Product Review](#delete-a-product-review)
- [Delete All Product Reviews](#delete-all-product-reviews)

</div> 

## Product Reviews 

Reviews associated with a product.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

</div>
</div>
</div>

### Product Review Object – Properties 

| Name | Type | Description |
|-|-|-|
| id | int | Unique database ID for this product review. Read-only. |
| product_id | int | The ID of the product to which this review belongs. Read-only. |
| author | string | The review's author, displayed on the storefront. |
| date_created | date | RFC 2822 date that specifies the creation time of the review. (If not specified, will use the current time.) |
| rating | int | A whole number from 1–5, specifying the product's rating in this review. |
| title | string | The review's title, displayed on the storefront. |
| review | text | The full text of the review, displayed on the storefront. |
| status | int | A status indicator. 0="Pending", 1= "Approved", 2="Disapproved". |

## List Product Reviews 

Gets the reviews associated with a product. (Default sorting is by review id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/products/{id}/reviews`

### Filters 

There are no filter parameters specific to product reviews. 

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 product_reviews are returned by default.

| Parameter | Type | Example |
|-|-|-|
| page | int | /api/v2/products/{product_id}/reviews?page={number} |
| limit | int | /api/v2/products/{product_id}/reviews?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 190,
    "product_id": 5310,
    "author": "John Doe",
    "date_created": "Wed, 12 Dec 2012 06:00:00 +0000",
    "title": "My experience with the widget",
    "review": "This widget worked for me, but might not work for everyone.",
    "rating": 4,
    "status": 1
  },
  {
    "id": 191,
    "product_id": 5310,
    "author": "Jane Doe",
    "date_created": "Tue, 12 Nov 2013 06:00:00 +0000",
    "title": "Great product, slow shipping",
    "review": "Took two weeks to arrive",
    "rating": 3,
    "status": 1
  },
  {
    "id": 192,
    "product_id": 5310,
    "author": "Jimmy Doe",
    "date_created": "Fri, 14 Dec 2012 06:00:00 +0000",
    "title": "Worked for me!",
    "review": "I thought this product was pretty good",
    "rating": 5,
    "status": 1
  }
]
```

## Get a Product Review 

Gets a product review.

>`GET /stores/{store_hash}/v2/products/{product_id}/reviews/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 190,
  "product_id": 5310,
  "author": "John Doe",
  "date_created": "Wed, 12 Dec 2012 06:00:00 +0000",
  "title": "My experience with the widget",
  "review": "This widget worked for me, but might not work for everyone.",
  "rating": 4,
  "status": 1
}
```

## Create a Product Review 

Creates a new product review. 

### Notes 

The `review` property is the review's text. The `rating` property must be a whole number between 1–5. If the optional `date_created` property is not specified, it defaults to the current date/time. If the optional "status" property is not specified, it defaults to 0 [`Pending`]. Other allowable values are 1 [`Approved`] or 2 [`Disapproved`].)

>`POST /stores/{store_hash}/v2/products/{product_id}/reviews`

### Read-only Properties 

The following properties of the product review are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id

### Requirements 

The following properties of the product review are required. The request won’t be fulfilled unless these properties are valid.

*   author
*   title
*   review
*   rating

### Response 

Example JSON returned in the response:

```json
{
  "id": 8,
  "product_id": 32,
  "author": "Jimmy Doe",
  "date_created": "Tue, 05 Mar 2013 06:00:00 +0000",
  "title": "Worked for me!",
  "review": "I thought this product was pretty good",
  "rating": 5,
  "status": 0
}
```

## Update a Product Review 

Updates an existing product review. Your request may update any of the properties that are writeable for the Create (POST) operation.

>`PUT /stores/{store_hash}/v2/products/{product_id}/reviews/{id}`

### Read-only Properties 

The following properties of the product review are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id

### Response 

Example JSON returned in the response:

```json
{
  "id": 8,
  "product_id": 32,
  "author": "Jimmy Doe",
  "date_created": "Tue, 05 Mar 2013 06:00:00 +0000",
  "title": "Worked for me!",
  "review": "I thought this product was pretty good",
  "rating": 5,
  "status": 1
}
```

## Delete a Product Review 

Deletes a specified product review. (If successful, this will typically return a `204 No Content`.)

>`DELETE /stores/{store_hash}/v2/products/{product_id}/reviews/{id}

## Delete All Product Reviews 

Deletes all reviews for the specified product. (If successful, this will typically return a `204 No Content`.)

>`DELETE /stores/{store_hash}/v2/products/{product_id}/reviews`
