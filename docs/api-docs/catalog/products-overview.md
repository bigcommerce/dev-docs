# Catalog Overview

<div class="otp" id="no-index">

### On this page
- [OAuth scopes](#oauth-scopes)
- [Products overview](#products-overview)
- [Creating products with options](#creating-products-with-options)
- [Creating digital products](#creating-digital-products)
- [Pricing precision](#pricing-precision)
- [Adding product images](#adding-product-images)
- [Adding product videos](#adding-product-videos)
- [Adding custom fields](#adding-custom-fields)
- [Adding bulk pricing rules](#adding-bulk-pricing-rules)
- [Adding product metafields](#adding-product-metafields)
- [Adding product reviews](#adding-product-reviews)
- [Creating brands](#creating-brands)
- [Variant options](#variant-options)
- [Variant](#variant)
- [Create a variant](#create-a-variant)
- [Modifier options](#modifier-options)
- [Complex rules](#complex-rules)
- [Categories](#categories)
- [Resources](#resources)

</div>

The Catalog refers to a store's collection of physical and digital products. The Catalog includes all the information about a product such as MPN, warranty, price, and images.

## OAuth scopes

| UI Name  | Permission | Parameter                     |
|----------|------------|-------------------------------|
| Products | modify     | `store_v2_products`           |
| Products | read-only  | `store_v2_products_read_only` |

For more information on OAuth Scopes and authentication, see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

## Products overview

[Products](/api-reference/catalog/catalog-api/products/getproducts) are the primary catalog entity, and the primary function of the eCommerce platform is to sell products on the storefront and other channels.

Products can be physical or digital:
* **Physical** - Exist in a physical form, have a weight, and are sold by merchants to ship to customers.

* **Digital** - Non-physical products, including downloadable files (for example, computer software, ebooks, or music) and services (for example, haircuts, consulting, or lawn care).


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> * Only one product can be created at a time.

</div>
</div>
</div>

### Creating a product

Below is an example `POST` request for creating a simple product without options, modifiers, or variants:


```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "name": "BigCommerce Coffee Mug",
  "price": "10.00",
  "categories": [
    23,
    21
  ],
  "weight": 4,
  "type": "physical"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct#requestrunner)

## Creating Products with Options

To create a complex product with options selectable by shoppers, include a `variants` array in the request body:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "name": "BigCommerce Coffee Mug",
  "price": "10.00",
  "categories": [
    23,
    21
  ],
  "weight": 4,
  "type": "physical",
  "variants": [
    {
      "sku": "SKU-BLU",
      "option_values": [
        {
          "option_display_name": "Mug Color",
          "label": "Blue"
        }
      ]
    },
    {
      "sku": "SKU-GRAY",
      "option_values": [
        {
          "option_display_name": "Mug Color",
          "label": "Gray"
        }
      ]
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> * When you create options via `/products`, `display_type` defaults to a radio button (displayed as selectable boxes in some themes).

</div>
</div>
</div>

## Creating digital products

To create a digital product (like an ebook), set `type` to `digital`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "name": "ebook: A Guide to Coffee",
  "price": "10.00",
  "categories": [
    23,
    21
  ],
  "type": "digital",
  "images": [
    {
      "is_thumbnail": true,
      "image_url": "{{image_url}}"
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> * Files can only be added to digital products via [Control Panel or WebDav](https://support.bigcommerce.com/articles/Public/Creating-Downloadable-Products/#adding-downloadable-product) -- attaching via the API is not supported. You can also set additional settings such as file description and maximum downloads in the control panel.

</div>
</div>
</div>


## Pricing precision

BigCommerce pricing is precise up to `4` decimal places. For example:
* `"$ 10.99999` rounds up to `$ 11`
* `"$ 10.99994` rounds down to `$ 10.9999`

Currency display settings allow for more than four decimal places. When this is the case, the additional decimal places will display as `0`s.

## Adding product images

Add a product image to a product with a `POST` to `/v3/catalog/products/{{product_id}}/images`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/images
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "is_thumbnail": true,
  "sort_order": 1,
  "description": "Yellow Large Bath Towel",
  "image_url": "{{image_url}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog-api/catalog/product-images/createproductimage#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

### Note
> * If using `image_file`, set `Content-Type` header to `multipart/form-data` -- otherwise, you will be unable to add subsequent requests.
> * Set `is_thumbmail` to true to set the image as the thumbnail used on product listing pages.
> * Only one image can be the product thumbnail at a time.
> * If only one image is on the product, it becomes both the thumbnail and the main product image.
> * You can also add images to [variants](/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid).

</div>
</div>
</div>

## Adding product videos

Videos hosted on YouTube can be added as a product video via `PUT` to `/v3/catalog/products/{{product_id}}/videos`:

```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/videos
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "title": "BigCommerce Mug Video",
  "description": "Video Describing the Mug",
  "sort_order": 1,
  "type": "youtube",
  "video_id": "R12345677"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-videos/createproductvideo#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

### Note
> * A product can have more than one video.
> * You must host product videos on YouTube.
> * `video_id` corresponds to the `v` parameter in the URL (Ex: `https://www.youtube.com/watch?v=R12345677`).

</div>
</div>
</div>

## Adding custom fields

To add custom fields to a product, `POST` to `/v3/catalog/products/{{product_id}}/custom-fields`:

```http
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/{{product_id}}/custom-fields
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "name": "Release Year",
  "value": "2018"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-custom-fields/createcustomfield#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> Custom field values are limited to **250** characters.

> For additional information on custom fields and their use-cases, see [Custom Fields](https://support.bigcommerce.com/s/article/Custom-Fields).


</div>
</div>
</div>

## Adding bulk pricing rules

Add bulk, quantity-based pricing to products via `PUT` to `/v3/catalog/products/{{product_id}}/bulk-pricing-rules`:

```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/bulk-pricing-rules
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "bulk_pricing_rules": [
    {
      "quantity_min": 10,
      "quantity_max": 15,
      "type": "price",
      "amount": 3
    },
    {
      "quantity_min": 16,
      "quantity_max": 25,
      "type": "price",
      "amount": 5
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-bulk-pricing-rules/updatebulkpricingrule#requestrunner)

For general information and use cases for product bulk pricing, see [Bulk Pricing](https://support.bigcommerce.com/s/article/Bulk-Pricing).


## Adding product metafields

[Metafields](/api-reference/catalog/catalog-api/product-metafields/createproductmetafield) are key-value pairs intended for programmatically storing data against a product or other entity. Data stored in metafields does not appear in the storefront or the control panel. Data not appearing in the storefront or control panel is useful when information needs to be passed back and forth between an app and BigCommerce.


To add metafields to a product, `PUT` to `/v3/catalog/products/{{product_id}}/metafields`:

```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/metafields
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "permission_set": "read",
  "namespace": "Location",
  "key": "bin_number",
  "value": "#4456",
  "description": "location of the product",
  "resource_type": "product",
  "resource_id": 131
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-metafields/updateproductmetafield#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

### Note
> * You can add metafields to variants, products, categories, and brands.

</div>
</div>
</div>

## Adding product reviews

To add product reviews to a product, `POST` to `/v3/catalog/products/{{product_id}}/reviews`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/reviews
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "title": "Great Coffee Mug",
  "text": "This coffee mug kept my liquids hot for several hours.",
  "status": "pending",
  "rating": 5,
  "email": "testing@bigcommerce.com",
  "name": "BigCommerce",
  "date_reviewed": "2018-07-20T17:45:13+00:00"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-reviews/createproductreview#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

### Note
> * You cannot create reviews in the control panel.

</div>
</div>
</div>

## Creating brands

To create a [Brand](/api-reference/catalog/catalog-api/brands/getbrands), send a `POST` request to `/v3/catalog/brands`:


```http
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/brands
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "name": "BigCommerce",
  "page_title": "BigCommerce",
  "meta_keywords": [
    "ecommerce",
    "best in class",
    "grow your business"
  ],
  "image_url": "{{image_url}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/brands/createbrand#requestrunner)

For general information on brands and their use cases, see [Managing Brands](https://support.bigcommerce.com/s/article/Managing-Brands).


## Variant options

[Variant options](/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid) are any choices that the shopper needs to make that will result in selecting a variant. Color and size are typical examples of variant options.  A t-shirt can have different combinations of sizes and colors.

Example:
* Color is a variant option; red, orange, and green are variant option values.
* Size is a variant option; small, medium, and large are variant option values.

This example results in selecting a combination of small and red on the storefront and correlates to a product variation, also called a SKU.


**Variant options:**

* Require the shopper to select a value
* Only support “multiple choice” option types
* Rectangle
* Radio button
* Color swatch
* Product pick list
* Product pick list with images
* Will automatically generate variants when created in the CP
* Are auto-generated from variants when you create a product with variants via V3 API Product /POST

### Variant options example:

| If the product is | variant option |
| -- | -- |
| T-Shirt | Blue<br>-<br>Small<br> Medium<br> Large|
| Backpack | Black<br> Yellow<br>-<br>2L <br> 3L<br> 8L |

### Options created on V2 and V3

* If a product has options created using the V2 API, you cannot add additional options using the V3 API.
* SKUs in V2 map to variants in V3.
* Base variants are not SKUs in V2.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Create variant option
> Creating a variant option does not automatically create SKUs or build out variants. You can build out SKUs later using the [variants endpoint](/api-reference/catalog/catalog-api/product-variants/createvariant).

</div>
</div>
</div>

### Create variant options
The following request will create options that will show on the storefront as choices selected by the customer. In a separate request, you could build out SKUs based on these variant option values or a combination of variant option values. You can use a similar request to add new choices to an existing variant.
<!--
title: "Create Size Variant Option"
subtitle: "/POST https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}/options"
lineNumbers: true
-->

**Example create size variant option**
```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}/options
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "product_id": 134,
  "name": "Size Rectangle",
  "display_name": "Size",
  "type": "rectangles",
  "option_values": [
    {
      "label": "S",
      "sort_order": 0,
      "is_default": false
    },
    {
      "label": "M",
      "sort_order": 1,
      "is_default": true
    },
    {
      "label": "L",
      "sort_order": 2,
      "is_default": false
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-options/createoption#requestrunner)

## Variant
[Variants](/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid) represent an item as it sits on the shelf in the warehouse or a particular saleable product. A product might be a t-shirt, while the variant would be “a small, red t-shirt.” Shoppers select variants on the storefront via product options. In the case where a product is simple, meaning it does not have any options, the product is its own variant - called a base variant. Everything you can buy should be a variant.

* Options build out variants.
* Variants are usually what you track inventory against.
* Can have their own price, weight, dimensions, image, etc. - or they can inherit these values from the product if you have not specified them.
* Must have a SKU code (unless they are a base variant).

* In non-base variants, variants will relate to a particular combination of variant option values - such as “small” and “red”.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### V2 SKU rules will override variant pricing
> Creating SKU rules via the V2 API or via CSV import will alter or override any variant price or sale price added to a product via the control panel, V3 API, or Price Lists UI.


</div>
</div>
</div>

### Variants:

| If the product is | Variant Option | Variant |
| -- | -- | -- |
| T-Shirt | Blue<br>-<br> Small<br> Medium<br> Large| SM-BLU<br> SM-MED <br> SM-LARG
| Backpack | Black<br>Yellow<br>-<br>2L <br> 3L<br> 8L |BLACK-2L<br>BLACK-3L<br>BLACK 8L<br>-<br>YELLOW-2L<br>YELLOW-3L<br>YELLOW-8L|

## Create a variant
You can create variants in two ways:
* From existing variant options, using [Create a Product Variant](/api-reference/catalog/catalog-api/product-variants/createvariant) endpoint.

* By adding variants with options and SKUs, using [Create a Product](/api-reference/catalog/catalog-api/products/createproduct) endpoint.


The example below will go over using existing variant options to create the variants.

To fetch variant information, send a `GET` request to `/v3/catalog/products/{{product_id}}/options`:

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/options
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "data": [
    {
      "id": 193,
      ...
      "option_values": [
        {
          "id": 163,
          "label": "S",
          "sort_order": 0,
          "value_data": null,
          "is_default": false
        },
        ...
      ],
      "config": []
    },
    {
      "id": 194,
      ...
      "option_values": [
        {
          "id": 166,
          "label": "Blue",
          "sort_order": 1,
          "value_data": {
            "colors": [
              "#123C91"
            ]
          },
          ...
      ],
      "config": []
    }
  ],
  "meta": {
    ...
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-options/getoptions#requestrunner)

In the above response, there are two variant options of size and color with three values each.

To combine the variant option values into variants and build out SKUs use the following endpoint:

`https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/{{product_id}}/variants`

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> * Variants need to be created one at a time using this endpoint.
> * You can create only one variant option at a time; individual variant options will contain an array of multiple values.
> * To use a variant array and create variants in the same call as the base product, use the [/catalog/product](/api-reference/catalog/catalog-api/products/createproduct) endpoint during product creation.

</div>
</div>
</div>

The `option_values` array combines the options small and blue to create the SKU SMALL-BLUE. The ID in the `option_values` array is the ID from the variant option response `option_values > id`. The `option_id` is the ID of the option.


```json
{
  "id": 193, //option_id
  "product_id": 134,
  "name": "Size1533313432-134",
  "display_name": "Size",
  "type": "rectangles",
  "sort_order": 0,
  "option_values": [
    {
        "id": 163, //id
        "label": "S",
        "sort_order": 0,
        "value_data": null,
        "is_default": false
    },
    ...
  ]
}
```

### Create a variant using the product endpoint

The following example creates a base product, variant options, and variants in a single call to the [Products](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct) endpoint. Use this method to create a product and variants in a single call without creating variant options first (option display will default to radio button):


```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}


{
  "name": "BigCommerce Coffee Mug",
  "price": "10.00",
  "categories": [
    23,
    21
  ],
  "weight": 4,
  "type": "physical",
  "variants": [
    {
      "sku": "SKU-BLU",
      "option_values": [
        {
          "option_display_name": "Mug Color",
          "label": "Blue"
        }
      ]
    },
    {
      "sku": "SKU-GRAY",
      "option_values": [
        {
          "option_display_name": "Mug Color",
          "label": "Gray"
        }
      ]
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Supported types
> swatch, radio buttons, rectangle, dropdown, product list, and product list with images

</div>
</div>
</div>

## Modifier options

[Modifier options](/api-reference/catalog/catalog-api/product-modifiers/getmodifiers) are any choices that the shopper can make to change how the merchant fulfills the product. Examples include:
* A checkbox to add shipping insurance
* Text to be engraved on the product
* A selected color for an unfinished product before it’s shipped

Critically, the modifier will not change the SKU/variant fulfilled, and you cannot track inventory against combinations of modifier values. Modifiers typically would not change which product is “picked off the shelf” in the warehouse, but they change what happens to that product before sending it to the shopper, or how a merchant can send it.

Modifier options:
* May be required or non-required
* Support all option types
* Cannot be used as part of a variant

You can add an adjuster to a modifier option to change things, such as increasing the price, changing the weight, or shipping rules.  You cannot apply adjusters to all modifier types.

### Modifier options example:

| If the product is | Variant Option | Variant |Modifier |
| -- | -- | -- | -- |
| T-Shirt | Blue<br>-<br> Small<br> Medium<br> Large| BLU<br> BLU-MED <br> BLU-LARG| Checkbox<br>Donate to Charity|
| Backpack | Black<br>Yellow<br>-<br>2L <br> 3L<br> 8L |BLACK-2L<br>BLACK-3L<br>BLACK 8L<br>-<br>YELLOW-2L<br>YELLOW-3L<br>YELLOW-8L| Text Field<br> Add Embroidery|

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Modifiers that support adjusters
> swatch, radio buttons, rectangle list, drop-down, product list, and product list with images

</div>
</div>
</div>

### Add a modifier with price adjuster to an existing product

The following example shows how to add a modifier and a checkbox with a price adjuster to increase the product's price by five dollars.

Creating a checkbox with an adjuster requires two separate calls: one to create the checkbox and another one to add the adjuster. You can define adjusters within the `option_values` array, but `option_values` are not allowed in the request to create a checkbox modifier because creating a checkbox automatically generates two mandatory option values: a Yes and a No. Once you have created the checkbox along with its option values, you can update the modifier to add an adjuster.


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Modifiers that require a second step to add an adjuster
> swatch, radio buttons, drop-down, rectangle list, product list, product list with images, and checkbox

</div>
</div>
</div>

To [create a modifier](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-modifiers/createmodifier), send a `POST` request to `/v3/catalog/products/{{product_id}}/modifiers`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/modifiers
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "type": "checkbox",
  "required": false,
  "config": {
    "default_value": "Yes",
    "checked_by_default": false,
    "checkbox_label": "Check for Donation"
  },
  "display_name": "Add a $5 Donation"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-modifiers/createmodifier#requestrunner)


**Response:**

```json
{
  "data": [
    {
      "id": 160,
      "product_id": 131,
      "name": "Add-a-$5-Donation1535039590-191",
      "display_name": "Add a $5 Donation",
      "type": "checkbox",
      "required": false,
      "config": {
        "checkbox_label": "Check for Donation",
        "checked_by_default": false
      },
      "option_values": [
        {
          "id": 149,
          "option_id": 160,
          "label": "Yes",
          "sort_order": 0,
          "value_data": {
            "checked_value": true
          },
          "is_default": false,
          "adjusters": {...},
        {
          "id": 150,
          "option_id": 160,
          "label": "No",
          "sort_order": 1,
          "value_data": {
            "checked_value": false
          },
          "is_default": true,
          "adjusters": {...}
      ]
    }
  ],
  "meta": {...}
}
```

Since this is a checkbox with two states, you create two option values. The default `adjuster_value` is null.

To [update the modifier value](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-modifier-values/updatemodifiervalue), send a `PUT` request to `/v3/catalog/products/{{product_id}}/modifiers/{{modifier_id}}/values/{value_id}`.

```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/modifiers/{{modifier_id}}/values/{value_id}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "is_default": false,
  "adjusters": {
    "price": {
      "adjuster": "relative",
      "adjuster_value": 5
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-modifier-values/updatemodifiervalue#requestrunner)

### Troubleshooting: 422 Errors

```json
{
    "status": 422,
    "title": "The product is currently associated with an option set, please remove it before editing an option or modifier.",
    "type": "https://developer.bigcommerce.com/api#api-status-codes",
    "errors": {
        "product_id": "The product is currently associated with an option set, please remove it before editing an option or modifier."
    }
}
```

To fix this error:
* Modify the products using the V2 API
* Remove the option set using the V2 API or the control panel, then remake the variants and modifiers using V3

## Complex rules

[Complex rules](/api-reference/catalog/catalog-api/product-complex-rules/getcomplexrules) allow merchants to set up conditions and actions based on shopper option selections on the storefront. You can use them to vary the following based on option selections made by the shopper:
* Price
* Weight
* Image
* Purchasability

Adjustments made by complex rules are displayed to shoppers in real-time on the storefront.

For most merchant use cases, **best practice** will be to either assign values (such as a price) directly to a variant or use adjusters on the modifier option itself. However, complex rules exist for rare cases where a rule condition is too complex to express in those forms easily.

Use complex rules when an adjustment should be triggered by:
* The selection of values across multiple modifier options
* The combination of a particular variant/SKU and a modifier option value.

### Complex rules example:

| If the product is | Variant Option | Variant |Modifier | Complex Rule |
| -- | -- | -- | -- | -- |
| T-Shirt | Blue<br>-<br> Small<br> Medium<br> Large| SM-BLU<br> SM-MED <br> SM-LARG| Checkbox<br>Donate to Charity| Checkbox<br> Donate to Charity.<br> Add $5
| Backpack | Black<br>Yellow<br>-<br>2L <br> 3L<br> 8L |BLACK-2L<br>BLACK-3L<br>BLACK 8L<br>-<br>YELLOW-2L<br>YELLOW-3L<br>YELLOW-8L| Text Field<br> Add Embroidery| N/A

<br>

### Creating complex rules based on modifiers

Complex rules must have a combination of two or more modifiers, such as two checkboxes. The following example will add $10 to the product price when you check both boxes.

```http
PUT https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}/complex-rules
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "product_id": 1200,
  "enabled": true,
  "price_adjuster": {
    "adjuster_value": 10
  },
  "conditions": [
    {
      "modifier_id": 506,
      "modifier_value_id": 852
    },
    {
      "modifier_id": 507,
      "modifier_value_id": 854
    }
  ]
}
```
[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-complex-rules/updatecomplexrule#requestrunner)

### Troubleshooting

Complex rules must consist of multiple conditions that trigger the rule adjustment. If multiple conditions are not specified, the request will return a 422 unprocessable entity.

```json
{
    "status": 422,
    "title": "The rule must contain multiple modifier conditions with unique modifier ids or a variant condition and modifier condition",
    "type": "https://developer.bigcommerce.com/api#api-status-codes"
}
```

## Categories

[Categories](/api-reference/catalog/catalog-api/category/getcategories) are a hierarchy of products available on the store, presented in a tree structure. A store's category structure determines the primary menu structure of most storefront themes directly tied to it.

All products must be associated with at least one category, although a category does not need to contain any products. Unlike some eCommerce platforms, you can associate products on BigCommerce with more than one category.


A product associated with categories does not currently have any priority or weighted order (there's no “primary category”). The absence of priority or weighted order makes it difficult to integrate with some external systems that might wish to use a product's categories to map to a category structure in that external system.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/categories

Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}

{
  "parent_id": 18,
  "name": "Shoes",
  "description": "Shoes Available for purchase",
  "sort_order": 1,
  "page_title": "Shoes",
  "is_visible": true
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/category/createcategory#requestrunner)

### Category tree

[Category Tree](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/category/getcategorytree) returns a simple view of the parent > child relationship of all categories in the store. You can use this endpoint to fetch the categories if building out a custom navigation for a store.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/categories/tree
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
```

**Response:**:

```json
{
  "data": [
    {
      "id": 25,
      "parent_id": 0,
      "name": "Towels",
      "is_visible": true,
      "url": "/towels/",
      "children": [
        {
          "id": 26,
          "parent_id": 25,
          "name": "Bath Towels",
          "is_visible": true,
          "url": "/towels/bath-towels/",
          "children": [
            {
              ...
              "children": [
                ...
                ]
            },
            ...
          ]
        },
        ..
      ]
    },
    ...
  ],
  "meta": {...}
}
```

## Resources

### Webhooks
* [Products](/api-docs/store-management/webhooks/events#products)
* [Categories](/api-docs/store-management/webhooks/events#category)
* [SKU](/api-docs/store-management/webhooks/events#sku)

### Related endpoints
* [Catalog API](/api-reference/catalog/catalog-api)
