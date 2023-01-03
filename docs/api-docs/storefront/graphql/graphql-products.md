# Products with the GraphQL Storefront API

BigCommerce's GraphQL Storefront API lets merchants on headless storefronts retrieve [products](https://support.bigcommerce.com/s/article/Product-Identifiers) from a store. These built-in capabilities allow Stencil developers to customize their storefronts with product information.

The GraphQL Storefront API lets you retrieve the following product features, and more:
- Price info in a store's transacting currency   
- Product options associated with a product (variant and modifier options) 
- Product metafields that have storefront access

You can access these features for a product if a merchant makes a product visible on storefronts.

This page walks you through the process of retrieving info for a product. If your product has variants, see [Variants with the GraphQL Storefront API](/api-docs/storefront/graphql/variants) on how to retrieve variant info. For full schema documentation, see the [GraphQL Storefront Playground](https://developer.bigcommerce.com/api-docs/storefront/graphql/playground).

## Get a Product

### Get a product with the `product` field

You can query a product by using the `product` field and specifying a product identifier, for example, the product `entityId`.

```graphql title="Get a product with the product field" lineNumbers
# This query retrieves one product.

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
# This query retrieves two products.
# This query uses aliases and fragments. To learn more about queries, see https://graphql.org/learn/queries.

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
> The Product object is also used to retrieve variant info. For example, if you use the identifier `variantEntityId` or `optionValueIds`, you will retrieve info for the variant overlaid on the Product object (if the variant has a different values than the product). 
> See [Get a variant](/api-docs/storefront/graphql/variants#get-a-variant) for more info.

### Get a product with the `products` field

Query a list of products by using the `products` field and specifying product identifiers, for example, the product `entityID`s:

```graphql title="Get a product with the products field" lineNumbers
# This example retrieves one product.
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

Query all products by not including an argument for `products`.

You can also query for featured products, related products, and more. See the [GraphQL Storefront Playground](https://developer.bigcommerce.com/graphql-playground) for full schema documentation.

## Get product identifiers

Query basic info for products. The following query retrieves both product identifiers and basic information for the specified product:

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
        "addToCartUrl": "https://example-store.mybigcommerce.com/cart.php?action=add&product_id=111",
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

You can query prices and dimensions for a product. The following query retrieves prices and dimensions for the specified product:


<!--
type: tab
title: Query
-->

```graphql title="Example query: Get prices and dimensions for a product" lineNumbers
# This query uses fragments. To learn more about fragments, see https://graphql.org/learn/queries/#fragments.

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

You can query the [product options](https://support.bigcommerce.com/s/article/Product-Options-v3) associated with a product. The response includes both variant options and modifer options. To retrieve only variant options, you can use a [Get variant options](/api-docs/storefront/graphql/variants#get-variant-options) query. 

There are various [types of product options](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#types), for example, checkbox and multiple choice. Each type of product option has a schema type that implements the `CatalogProductOption` interface, meaning you can retrieve the common fields from `CatalogProductOption` for any type of product option. For more on interfaces, see the [GraphQL Schema and Types- Interfaces](https://graphql.org/learn/schema/#interfaces) documentation.

```graphql title="CatalogProductOption interface" lineNumbers
# Fields common among product option types

interface CatalogProductOption {
  entityId: Int!
  displayName: String!
  isRequired: Boolean!
  isVariantOption: Boolean!
}
```

The following example shows how to get the first three product options associated with a product. In the response, all product options include queried fields from the `CatalogProductOption` interface, and those that are checkbox or datefields include additional fields.  

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product options for a product" lineNumbers
# This query uses interfaces. To learn more about interfaces, see https://graphql.org/learn/schema/#interfaces.

query {
  site {
    product (entityId: 115) {
      productOptions (first: 3) {
        edges {
          node {
            entityId                  # fields that all product options include
            displayName
            isRequired
            isVariantOption
            ... on CheckboxOption {   # additional fields for checkbox options
              checkedByDefault
              label
            }
            ... on DateFieldOption {  # additional fields for datefield options
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

When you get product options, you can also retrieve the available values for product options that are [multiple choice](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#mc) (i.e. product option values). These values are of various types, for example, swatch or radio buttons. Each type of multiple choice value has a schema type that implements the `CatalogProductOptionValue` interface, meaning you can retrieve the common fields from `CatalogProductOptionValue` for any type of multiple choice value.   

```graphql title="CatalogProductOptionValue interface" lineNumbers
# Fields common among multiple choice values

interface CatalogProductOptionValue {
  entityId: Int!
  label: String!
  isDefault: Boolean!`
}
```

The following example shows a query that includes values for product options that are multiple choice. In the response, all product option values include queried fields from the `CatalogProductOptionValue` interface, and product option values that are swatch types include additional fields. The example query retrieves only the first product option and the first two values for that product option.

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product options for a product" lineNumbers
# This query uses interfaces. To learn more about interfaces, see https://graphql.org/learn/schema/#interfaces.

query {
  site {
    product (entityId: 113) {
      productOptions (first: 1) {
        edges {
          node {
            entityId                                # fields that all product options include
            displayName
            isRequired
            isVariantOption
            ... on MultipleChoiceOption {           # additional fields for multiple choice options
              displayStyle
              values (first: 2) {
                edges {
                  node {
                    entityId
                    label
                    isDefault
                    ... on SwatchOptionValue {      # additional fields for swatch options
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
            }
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

The following example retrieves the first two images and the default image for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product images for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      images (first: 2) {
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

You can query product images at different resolutions. The following query retrieves the first image for the specified product at various resolutions: 

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product images at different resolutions" lineNumbers
# This query retrieves 4 images.
# This query uses aliases. To learn more about aliases, see https://graphql.org/learn/queries/#aliases.

query {
  site {
    product(entityId: 113) {
      images (first: 1) {
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
                "url320wide": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/320w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "url640wide": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/640w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "url960wide": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/960w/products/113/379/IMAG0729__87810.1662649673.jpg",
                "url1280wide": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/1280w/products/113/379/IMAG0729__87810.1662649673.jpg"
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

You can query product metafields by specifying the product metafield's namespace. Only metafields that have storefront permissions are returned (i.e. permissions must be set to `write_and_sf_access` or `read_and_sf_access`).

<!-- theme:info -->
> #### Product vs variant metafields 
> The query retrieves only **product** metafields. See [Get variant metafields](/api-docs/storefront/graphql/variants#get-variant-metafields) to retrieve **variant** metafields. 

The following query retrieves the first two product metafields for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get product metafields for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      metafields (first: 2 namespace: "Warehouse Locations") {
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

You can query the custom fields for products. The following example retrieves the first two custom fields for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get custom fields for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      customFields (first: 2) {
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

You can query gift wrapping options that are available for a product. The following example retrieves the first two gift wrapping options for the specified product:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get gift wrapping options for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      giftWrappingOptions (first: 2) {
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

You can query reviews for products. You retrieve only reviews that a merchant has approved. The following example retrieves the first review for the specified product: 

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get reviews for a product" lineNumbers
query {
  site {
    product (entityId: 113) {
      reviews (first: 1) {
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
                  "name": "example name"
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
- [GraphQL language documentation](https://graphql.org/learn/queries) (graphql.org)
