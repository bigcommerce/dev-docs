<h1>Product SKU</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-sku_object-properties">Object Properties</a></li>
		<li><a href="#v2-sku_list-product-sku">List Product SKU</a></li>
		<li><a href="#v2-sku_get-product-sku">Get Product SKU</a></li>
    <li><a href="#v2-sku_get-count-sku">Get a Count of Product SKUs</a></li>
    <li><a href="#v2-sku_create-product-sku">Create Product SKU</a></li>
    <li><a href="#v2-sku_update-product-sku">Update Product SKU</a></li>
    <li><a href="#v2-sku_delete-product-sku">Delete a Product SKU</a></li>
    <li><a href="#v2-sku_delete-multiple-product-sku">Delete Multiple Product SKUs</a></li>
		</ul>
</div>

<a href='#v2-sku_object-properties' aria-hidden='true' class='block-anchor'  id='v2-sku_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## SKUs 

Stock Keeping Unit identifiers associated with products or product options.

### SKU Object – Properties 

| Name | Type | Description |
| --- | --- | --- |
| id | int | |
| product_id | int | |
| sku | string | The unique SKU (stock keeping unit). |
| price | decimal | This SKU's base price on the storefront. If this value is null, the product's default price (set in the Product resource's `price` field) will be used as the base price. |
| adjusted_price | decimal | The SKU's price on the storefront – after the product's base price is inherited, and/or any option set or any product rules are applied. This property is READ-ONLY. |
| cost_price | decimal | The product's cost price. |
| upc | string | The UPC (Universal Product Code) for this product combination. |
| inventory_level | int | The inventory level for the product. |
| inventory_warning_level | int | The inventory warning level for the product .|
| bin_picking_number | string | The BIN picking number. |
| weight | decimal | This SKU's base weight on the storefront. If this value is null, the product's default weight (set in the Product resource's weight field) will be used as the base weight. |
| adjusted_weight | decimal | This SKU's weight on the storefront – after the product's base weight is inherited, and/or any option set or any product rules are applied. This property is READ-ONLY. |
| is_purchasing_disabled | boolean | if true, this prohibits purchasing of the SKU. | 
| purchasing_disabled_message | string | The message to display if purchasing is disabled on this SKU. | 
| image_file | string | The image that will be displayed when this SKU is selected on the storefront. When updating a SKU image, send the publicly accessible URL. Supported image formats are JPEG, PNG, and GIF. | 
| options | object_array | This is an object {"product_option_id": int, "option_value_id":int} |


<a href='#v2-sku_list-product-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_list-product-sku'><i aria-hidden='true' class='linkify icon'></i></a>

## List Product SKUs 

Gets the collection of SKUs associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/skus`

### Notes 

BigCommerce has updated the SKU schema to include additional price, weight, image, and purchasable properties. We will eventually remove the ability to manage these properties via SKU rules. (Merchants are already constrained from creating SKU-only rules in the BigCommerce control panel.)

### Filters 

Filter parameters can be added to the URL query string to select specific skus in the collection.

| Parameter | Type | Example |
| --- | --- | --- |
| min_id | int | /api/v2/products/{product_id}/skus?min_id={value} |
| max_id | int | /api/v2/products/{product_id}/skus?max_id={value} |
| sku | string | /api/v2/products/{product_id}/skus?sku={value} |
| upc | string | /api/v2/products/{product_id}/skus?upc={value} |
| inventory_level | string | /api/v2/products/{product_id}/skus?inventory_level={value} |
| inventory_warning_level | string | /api/v2/products/{product_id}/skus?inventory_warning_level={value} |
| bin_picking_number | string | /api/v2/products/{product_id}/skus?bin_picking_number={value} |
| min_inventory_level | int | /api/v2/products/{product_id}/skus?min_inventory_level={value} |
| max_inventory_level | int | /api/v2/products/{product_id}/skus?max_inventory_level={value} |
| is_low_inventory | boolean | /api/v2/products/{product_id}/skus?is_low_inventory={value} |
| product_hash | int | /api/v2/products/{product_id}/skus?product_hash={value} |

#### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 skus are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/skus?page={number} |
| limit | int | /api/v2/products/{product_id}/skus?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "product_id": 5,
    "sku": "MB-1",
    "price": null,
    "adjusted_price": "1.5000",
    "cost_price": "0.0000",
    "upc": "",
    "inventory_level": 0,
    "inventory_warning_level": 0,
    "bin_picking_number": "",
    "weight": null,
    "adjusted_weight": "0.00",
    "is_purchasing_disabled": false,
    "purchasing_disabled_message": "",
    "image_file": "",
    "options": [
      {
        "product_option_id": 15,
        "option_value_id": 17
      },
      {
        "product_option_id": 16,
        "option_value_id": 28
      }
    ]
  },
  {
    "id": 2,
    "product_id": 5,
    "sku": "MB-2",
    "price": null,
    "adjusted_price": "2.0000",
    "cost_price": "0.0000",
    "upc": "",
    "inventory_level": 0,
    "inventory_warning_level": 0,
    "bin_picking_number": "",
    "weight": null,
    "adjusted_weight": "0.00",
    "is_purchasing_disabled": true,
    "purchasing_disabled_message": "We're sorry, this is unavailable.",
    "image_file": "",
    "options": [
      {
        "product_option_id": 15,
        "option_value_id": 18
      },
      {
        "product_option_id": 16,
        "option_value_id": 26
      }
    ]
  }
]
```

<a href='#v2-sku_get-product-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_get-product-sku'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Product SKU 

Gets a single product SKU.

>`GET /stores/{store_hash}/v2/products/{product_id}/skus/{id}`


### Response 

Example JSON returned in the response:

```json
{
  "id": 5,
  "product_id": 7,
  "sku": "MBA-1atest",
    "price": null,
    "adjusted_price": "1.5000",
  "cost_price": "0.0000",
  "upc": "",
  "inventory_level": 0,
  "inventory_warning_level": 0,
  "bin_picking_number": "",
    "weight": null,
    "adjusted_weight": "0.00",
    "is_purchasing_disabled": false,
    "purchasing_disabled_message": "",
    "image_file": "https://thinglust.com/eyecandy.png",
  "options": [
    {
      "product_option_id": 20,
      "option_value_id": 51
    }
  ]
}
```

<a href='#v2-sku_get-count-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_get-count-sku'><i aria-hidden='true' class='linkify icon'></i></a>

### Get a Count of Product SKUs 

Gets a count of the number of product SKUs in the store.

*   OAuth
>`GET /stores/{store_hash}/v2/products/skus/count`
*   Basic Auth
>`GET /api/v2/products/skus/count`

### Response 

Example JSON returned in the response:

```json
{
  "count": 1235
}
```

<a href='#v2-sku_create-product-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_create-product-sku'><i aria-hidden='true' class='linkify icon'></i></a>

### Create a Product SKU 

Creates a new product SKU.

*   OAuth
>`POST /stores/{store_hash}/v2/products/{product_id}/skus`


### Read-only Properties 

The following properties of the sku are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id
*   adjusted_price
*   adjusted_weight

### Requirements 

The following properties of the sku are required. The request won’t be fulfilled unless these properties are valid.

*   sku
*   options

### Notes 

To maximize system performance, BigCommerce caps the number of SKUs associated with a product at 500. If you attempt to add a SKU to a product that has 500 SKUs, BigCommerce will return a 403 error.

BigCommerce has updated the SKU schema to include additional price, weight, image, and purchasable properties. We will eventually remove the ability to manage these properties via SKU rules. (Merchants are already constrained from creating SKU-only rules in the BigCommerce control panel.)

### Response 

Example JSON returned in the response:

```json
{
  "id": 5,
  "product_id": 7,
  "sku": "MBA-1atest",
    "price": null,
    "adjusted_price": "1.5000",
  "cost_price": "0.0000",
  "upc": "",
  "inventory_level": 0,
  "inventory_warning_level": 0,
  "bin_picking_number": "",
    "weight": null,
    "adjusted_weight": "0.00",
    "is_purchasing_disabled": false,
    "purchasing_disabled_message": "",
    "image_file": "",
  "options": [
    {
      "product_option_id": 20,
      "option_value_id": 51
    }
  ]
}
```

<a href='#v2-sku_update-product-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_update-product-sku'><i aria-hidden='true' class='linkify icon'></i></a>

## Update a Product SKU 

Updates an existing product SKU.


>`PUT /stores/{store_hash}/v2/products/{product_id}/skus/{id}`


### Read-only Properties 

The following properties of the sku are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   product_id
*   adjusted_price
*   adjusted_weight

### Requirements 

There are no required properties for updating a product SKU.

### Response 

Example JSON returned in the response:

```json
{
  "id": 5,
  "product_id": 7,
  "sku": "MBA-1atest",
    "price": "4.9900",
    "adjusted_price": "3.9900",
  "cost_price": "2.9900",
  "upc": "",
  "inventory_level": 0,
  "inventory_warning_level": 0,
  "bin_picking_number": "",
    "weight": null,
    "adjusted_weight": "0.00",
    "is_purchasing_disabled": true,
    "purchasing_disabled_message": "We're sorry, this is unavailable.",
    "image_file": "",
  "options": [
    {
      "product_option_id": 20,
      "option_value_id": 51
    }
  ]
}
```

<a href='#v2-sku_delete-product-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_delete-product-sku'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete a Product SKU 

Deletes a product SKU.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/skus/{id}`

<a href='#v2-sku_delete-multiple-product-sku' aria-hidden='true' class='block-anchor'  id='v2-sku_delete-multiple-product-sku'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete Multiple Product SKUs 

Deletes multiple product SKUs.


>`DELETE /stores/{store_hash}/v2/products/{product_id}/skus`

### Filters 

Filter parameters can be added to the URL query string to select specific SKUs in the collection.

| Parameter | Type | Example |
| --- | --- | --- |
| min_id | int | /api/v2/products/{product_id}/skus?min_id={value} |
| max_id | int | /api/v2/products/{product_id}/skus?max_id={value} |
| sku | string | /api/v2/products/{product_id}/skus?sku={value} |
| upc | string | /api/v2/products/{product_id}/skus?upc={value} |
| inventory_level | string | /api/v2/products/{product_id}/skus?inventory_level={value} |
| inventory_warning_level | string | /api/v2/products/{product_id}/skus?inventory_warning_level={value} |
| bin_picking_number | string | /api/v2/products/{product_id}/skus?bin_picking_number={value} |
| min_inventory_level | int | /api/v2/products/{product_id}/skus?min_inventory_level={value} |
| max_inventory_level | int | /api/v2/products/{product_id}/skus?max_inventory_level={value} |
| is_low_inventory | boolean | /api/v2/products/{product_id}/skus?is_low_inventory={value} |
| product_hash | int | /api/v2/products/{product_id}/skus?product_hash={value} |

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 skus are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| page | int | /api/v2/products/{product_id}/skus?page={number} |
| limit | int | /api/v2/products/{product_id}/skus?limit={count} |

