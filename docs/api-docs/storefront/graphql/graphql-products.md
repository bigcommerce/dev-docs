# Products with the GraphQL Storefront API

BigCommerce's GraphQL Storefront API lets merchants on headless storefronts retrieve [products](https://support.bigcommerce.com/s/article/Product-Identifiers) powered by results from our back-end search engine. These built-in capabilities also allow Stencil developers to customize...

The GraphQL Storefront API lets you retrieve the following product features, and more:
- Price info in a store's transacting currency   
- Product options associated with a product (variant and modifier options) 
- Product metafields that have storefront access

You can access these features for a product if a merchant makes a product visible on storefronts. For Non-MSF stores, only products in categories that are available to "default GUEST customer groups" returned. => what if you login as a customer???

This page walks you through how to retrieve info for a product. If your product has variants, see [Variants with the GraphQL Storefront API](/api-docs/storefront/graphql/variants) for what you can query for your product's variants. See the [GraphQL Storefront Playground](https://developer.bigcommerce.com/api-docs/storefront/graphql/playground) for full schema documentation.

## Get a Product

### Get a product with the `product` field

You can query a product by using the `product` field and specifying a product identifier, for example, the product `entityId`.

```graphql title="Get a product with the product field" lineNumbers
# This query retrieves 1 product.

query {
  site {
    product (entityId: 111) {
      # fields on the Product object type
    }
  }
}
```

&nbsp;

```graphql title="Get a product with the product field" lineNumbers
# This query retrieves 2 products.
# This query uses aliases and fragments. For more, see https://graphql.org/learn/queries.

query {
  site {
    product1: product(entityId: 113) {
      ...ProductFields
    }
    product2: product(entityId: 115) {
      ...ProductFields
    }
  }
}

fragment ProductFields on Product {
  # fields on the Product object type 
}
```

<!-- theme:info -->
> #### Get product versus variant
> The Product object can also be used to retrieve variant info. For example, if you use the identifier `variantEntityId` or `optionValueIds`, you will retrieve info for the variant overlaid on the Product object (if the variant has a different values than the product). 
> See [Get a variant](/api-docs/storefront/graphql/variants#get-a-variant) for more info.

### Get a product with the `products` field

You can  query a product by using the `products` field and specifying a product identifier, for example, the product `entityID`:

```graphql title="Get a product with the products field" lineNumbers
# This example retrieves 1 product.
# Specify multiple entityIds to retrieve multiple products.

query {
  site {
    products (entityIds: [111]) {
      edges {
        node {
          # fields on the Product object type
        }
      }
    }
  }
}
```

You can query all products by not including an argument for `products`.

You can also query for featured products, related products, and more. See the [GraphQL Storefront Playground](https://developer.bigcommerce.com/graphql-playground) for full schema documentation.

## Get product identifiers

You can query basic info for products. The example query shows how to query product identifiers and other basic info for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get basic info for a product" lineNumbers
query {
  site {
    product (entityId: 111) {
      id
      entityId
      sku
      path
      name
      description
      addToCartUrl
      upc
      mpn
      gtin  
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get basic info for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "id": "UHJvZHVjdDoxMTE=",
        "entityId": 111,
        "sku": "SM13",
        "path": "/smith-journal-13/",
        "name": "[Sample] Smith Journal 13",
        "description": "<p>143 Pages</p>",
        "addToCartUrl": "https://heavens-gate.mybigcommerce.com/cart.php?action=add&product_id=111",
        "upc": "123456",
        "mpn": "example MPN",
        "gtin": "99999999"
      }
    }
  }
}
```
<!-- type: tab-end -->

## Get product prices and dimensions

You can query prices and dimensions for a product. The example query shows how to query prices and dimensions for the specified product:


<!--
type: tab
title: Query
-->

```graphql title="Example query: Get prices and dimensions for a product" lineNumbers
# This query uses fragments. For more, see https://graphql.org/learn/queries/#fragments.

query {
  site {
    product (entityId: 111) {
      prices(currencyCode: USD) {
        price {
          ...PriceFields
        }
        salePrice {
          ...PriceFields
        }
        basePrice {
          ...PriceFields
        }
        retailPrice {
          ...PriceFields
        }
      }
      weight {
        ...DimensionFields
      }
      height {
        ...DimensionFields
      }
      width {
        ...DimensionFields
      }
      depth {
        ...DimensionFields
      }
    }
  }
}

fragment PriceFields on Money {               # fields on the Money object type
  currencyCode
  value
}

fragment DimensionFields on Measurement {     # fields on the Measurement object type
  value
  unit
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get prices and dimensions for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "prices": {
          "price": {
            "currencyCode": "USD",
            "value": 5
          },
          "salePrice": {
            "currencyCode": "USD",
            "value": 5
          },
          "basePrice": {
            "currencyCode": "USD",
            "value": 25
          },
          "retailPrice": {
            "currencyCode": "USD",
            "value": 200
          }
        },
        "weight": {
          "value": 4000,
          "unit": "oz"
        },
        "height": {
          "value": 4,
          "unit": "in"
        },
        "width": {
          "value": 4,
          "unit": "in"
        },
        "depth": {
          "value": 4,
          "unit": "in"
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

## Get product options 

You can query the [product options](https://support.bigcommerce.com/s/article/Product-Options-v3) associated with a product. The response includes both variant options and modifer options. If your product has variants, use [Get variant options](/api-docs/storefront/graphql/variants#get-variant-options) for more. 

There are various [types of product options](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#types), including checkbox, multiple choice, and more, each with unique fields. However, each type of product option has a schema type that implements the `CatalogProductOption` interface, meaning you can retrieve the common fields from `CatalogProductOption` for all product options. For more on interfaces, see the [GraphQL Schema and Types- Interfaces](https://graphql.org/learn/schema/#interfaces) documentation.

```graphql title="CatalogProductOption interface" lineNumbers
# Fields common among product options 

interface CatalogProductOption {
  entityId: Int!
  displayName: String!
  isRequired: Boolean!
  isVariantOption: Boolean!
}
```

The example below shows how to query product options with additional fields for the checkbox and datefield option types. In the response, all product options include common fields from the `CatalogProductOption` interface, and the checkbox and datefield option returned the additional fields included in the query.  

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product options for a product" lineNumbers
# This query retrieves all product options.
# This query uses interfaces. For more, see https://graphql.org/learn/schema/#interfaces.

query {
  site {
    product (entityId: 115) {
      productOptions {
        edges {
          node {
            entityId                  # fields that all product options include
            displayName
            isRequired
            isVariantOption
            ... on CheckboxOption {   # extra fields checkbox options include
              checkedByDefault
              label
            }
            ... on DateFieldOption {  # extra fields checkbox options include
              earliest
              latest
              limitDateBy
            }
          }
        }
      }
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get product options for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "productOptions": {
          "edges": [
            {
              "node": {
                "entityId": 119,
                "displayName": "Color",
                "isRequired": true,
                "isVariantOption": true
              }
            },
            {
              "node": {
                "entityId": 137,
                "displayName": "Special feed",
                "isRequired": false,
                "isVariantOption": false,
                "checkedByDefault": false,
                "label": "YES"
              }
            },
            {
              "node": {
                "entityId": 138,
                "displayName": "Custom date",
                "isRequired": false,
                "isVariantOption": false,
                "earliest": "2022-10-27T06:00:00Z",
                "latest": "2022-12-08T06:00:00Z",
                "limitDateBy": "RANGE"
              }
            }
          ]
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

When you query product options, you can query the available values for product options that are [multiple choice](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#mc). This retrieves all the available values for product options that are multiple choice. These values are of various types, for example, swatch or radio buttons. Each multiple choice value has a schema type that implements the `CatalogProductOptionValue` interface, meaning you can retrieve the common fields from `CatalogProductOptionValue` for all multiple choice values.   

```graphql title="CatalogProductOptionValue interface" lineNumbers
# Fields common among multiple choice values

interface CatalogProductOptionValue {
  entityId: Int!
  label: String!
  isDefault: Boolean!`
}
```

The example below shows a query that returns all product options. In the response, each multiple choice product option includes common fields from the `CatalogProductOptionValue` interface, and the swatch types return additional fields.

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product options for a product" lineNumbers
# This query retrieves all product options.
# This query uses interfaces. For more, see https://graphql.org/learn/schema/#interfaces.

query {
  site {
    product (entityId: 113) {
      productOptions {
        edges {
          node {
            entityId                                # fields that all product options include
            displayName
            isRequired
            isVariantOption
            ... on MultipleChoiceOption {           # extra fields multiple choice options include
              displayStyle
              values {
                edges {
                  node {
                    entityId
                    label
                    isDefault
                    ... on SwatchOptionValue {      # extra fields swatch options include
                      hexColors
                      imageUrl (width: 2)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get product options for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "productOptions": {
          "edges": [
            {
              "node": {
                "displayStyle": "Swatch",
                "entityId": 126,
                "displayName": "Size",
                "isRequired": true,
                "isVariantOption": true,
                "values": {
                  "edges": [
                    {
                      "node": {
                        "hexColors": [
                          "#912727",
                          "#D6A67C"
                        ],
                        "imageUrl": null,
                        "entityId": 129,
                        "label": "Small",
                        "isDefault": false
                      }
                    },
                    {
                      "node": {
                        "hexColors": [
                          "#46A754",
                          "#487790",
                          "#5645AF"
                        ],
                        "imageUrl": null,
                        "entityId": 130,
                        "label": "Medium",
                        "isDefault": true
                      }
                    }
                  ]
                }
              }
            },
            ...
          ]
        }
      }
    }
  }
}
```

<!-- type: tab-end -->

## Get product images

You can query the images for products. The default image is a product's thumbnail image.

The example query shows how to query the images for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product images for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      images {
        edges {
          node {
            url (width: 1)
            urlOriginal
            altText
            isDefault
          }
        }
      } 
      defaultImage {
        url (width: 1)
        urlOriginal
        altText
        isDefault
      }
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get product images for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "images": {
          "edges": [
            {
              "node": {
                "url": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/1w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "urlOriginal": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/original/products/113/379/IMAG0729__87810.1662649673.jpg",
                "altText": "",
                "isDefault": false
              }
            },
            {
              "node": {
                "url": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/1w/products/113/378/IMAG0724__62769.1662649673.jpg",
                "urlOriginal": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/original/products/113/378/IMAG0724__62769.1662649673.jpg",
                "altText": "",
                "isDefault": true
              }
            }
          ]
        },
        "defaultImage": {
          "url": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/1w/products/113/378/IMAG0724__62769.1662649673.jpg",
          "urlOriginal": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/original/products/113/378/IMAG0724__62769.1662649673.jpg",
          "altText": "",
          "isDefault": true
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

You can query product images at different resolutions. The example query shows how to query images at various resolutions for the specified product: 

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product images at different resolutions" lineNumbers
# This query retrieves 4 images.
# This query uses aliases. For more, see https://graphql.org/learn/queries/#aliases.

query {
  site {
    product(entityId: 113) {
      images {
        edges {
          node {
            url320wide: url(width: 320)
            url640wide: url(width: 640)
            url960wide: url(width: 960)
            url1280wide: url(width: 1280)
          }
        }
      }
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get product images at different resolutions" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "images": {
          "edges": [
            {
              "node": {
                "url320wide": "https://cdn11.bigcommerce.com/s-o8ertuc7vw/images/stencil/320w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "url640wide": "https://cdn11.bigcommerce.com/s-o8ertuc7vw/images/stencil/640w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "url960wide": "https://cdn11.bigcommerce.com/s-o8ertuc7vw/images/stencil/960w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "url1280wide": "https://cdn11.bigcommerce.com/s-o8ertuc7vw/images/stencil/1280w/products/113/379/IMAG0729__87810.1662649673.jpg"
              }
            }
          ]
        }
      }
    }
  }
}
```

<!-- type: tab-end -->

## Get product metafields

You can query the metafields for products. Only metafields that have storefront permissions are returned (i.e. permissions must be set to `write_and_sf_access` or `read_and_sf_access`).

The example query shows how to query product metafields for the specified product. The query returns only product metafields. See [Get variant metafields](/api-docs/storefront/graphql/variants#get-variant-metafields) to retrieve variant metafields. 

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product metafields for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      metafields (namespace: "Warehouse Locations") {
        edges {
          node {
            id
            entityId
            key
            value
          }
        }
      } 
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get product metafields for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "metafields": {
          "edges": [
            {
              "node": {
                "id": "TWV0YWZpZWxkczoxNQ==",
                "entityId": 15,
                "key": "Location",
                "value": "4HG"
              }
            },
            {
              "node": {
                "id": "TWV0YWZpZWxkczoxNg==",
                "entityId": 16,
                "key": "Site",
                "value": "2SL"
              }
            }
          ]
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

## Get product custom fields

You can query the custom fields for products. The example query shows how to query custom fields for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get custom fields for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      customFields {
        edges {
          node {
            entityId
            name
            value
          }
        }
      } 
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get custom fields for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "customFields": {
          "edges": [
            {
              "node": {
                "entityId": 4,
                "name": "ISBN",
                "value": "9876543210"
              }
            },
            {
              "node": {
                "entityId": 5,
                "name": "Serial number",
                "value": "1234567890"
              }
            }
          ]
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

## Get product gift wrapping options

You can query gift wrapping options that are available for a product. The example query shows how to query gift wrapping options for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get gift wrapping options for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      giftWrappingOptions {
        edges {
          node {
            entityId
            name
            allowComments
            previewImageUrl
          }
        }
      } 
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get gift wrapping options for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "giftWrappingOptions": {
          "edges": [
            {
              "node": {
                "entityId": 1,
                "name": "Christmas Wrapping",
                "allowComments": false,
                "previewImageUrl": "https://cdn11.bigcommerce.com/s-{store_hash}/product_images/wrap_images/christmas_1662668596__75551.jpg"
              }
            },
            {
              "node": {
                "entityId": 2,
                "name": "Valentine's Day Wrapping",
                "allowComments": true,
                "previewImageUrl": null
              }
            }
          ]
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

## Get product reviews

You can query reviews for products. The API returns only reviews that a store owner has approved. The example query shows how to query reviews for the specified product. 

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get reviews for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      reviews {
        edges {
          node {
            entityId
            author {
              name
            }
            title
            text
            rating
            createdAt {
              utc
            }
          }
        }
      } 
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get reviews for a product" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "reviews": {
          "edges": [
            {
              "node": {
                "entityId": 3,
                "author": {
                  "name": "Android Dao"
                },
                "title": "Excellent Flowers",
                "text": "The best flowers for Valentine's Day. Would recommend.",
                "rating": 4,
                "createdAt": {
                  "utc": "2021-12-22T22:29:48Z"
                }
              }
            }
          ]
        }
      }
    }
  }
}
```
<!-- type: tab-end -->


## Resources

- [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview)
- [Variants with the GraphQL Storefront API](/api-docs/storefront/graphql/variants)
- [GraphQL Storefront API Explorer](https://developer.bigcommerce.com/api-docs/storefront/graphql/explorer)
- [GraphQL Storefront API Playground](https://developer.bigcommerce.com/api-docs/storefront/graphql/playground)
- [GraphQL language](https://graphql.org/learn/queries) (learn GraphQL at graphql.org)