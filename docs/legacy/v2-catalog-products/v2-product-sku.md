# Product SKU

<div class="otp" id="no-index">

### On This Page
- [SKUs](#skus)
- [List Product SKUs](#list-product-skus)
- [Get a Product SKU](#get-a-product-sku)
- [Update a Product SKU](#update-a-product-sku)
- [Delete a Product SKU](#delete-a-product-sku)
- [Delete Multiple Product SKUs](#delete-multiple-product-skus)

</div> 

## SKUs 

Stock Keeping Unit identifiers associated with products or product options.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Deprecated
> Avoid using this API operation if possible. It will be removed in a future version.

For the most up-to-date version of this API, see [Product Variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants).

</div>
</div>
</div>

### SKU Object – Properties 

| Name | Type | Description |
|-|-|-|
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

## List Product SKUs 

Gets the collection of SKUs associated with a product.

>`GET /stores/{store_hash}/v2/products/{product_id}/skus`

### Notes 

BigCommerce has updated the SKU schema to include additional price, weight, image, and purchasable properties. We will eventually remove the ability to manage these properties via SKU rules. (Merchants are already constrained from creating SKU-only rules in the BigCommerce control panel.)

### Filters 

Filter parameters can be added to the URL query string to select specific skus in the collection.

| Parameter | Type | Example |
|-|-|-|
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
|-|-|-|
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

## Delete a Product SKU 

Deletes a product SKU.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/skus/{id}`

## Delete Multiple Product SKUs 

Deletes multiple product SKUs.

>`DELETE /stores/{store_hash}/v2/products/{product_id}/skus`

### Filters 

Filter parameters can be added to the URL query string to select specific SKUs in the collection.

| Parameter | Type | Example |
|-|-|-|
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
|-|-|-|
| page | int | /api/v2/products/{product_id}/skus?page={number} |
| limit | int | /api/v2/products/{product_id}/skus?limit={count} |
