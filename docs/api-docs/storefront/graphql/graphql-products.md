# Products with the GraphQL Storefront API

BigCommerce's GraphQL Storefront API lets merchants on headless storefronts retrieve products powered by results from our back-end search engine. These built-in capabilities also allow Stencil developers to customize...

The GraphQL Storefront API lets you retrieve the following product features:
- product options 
- 

This page walks you through how to ... for products without variants. For products with variants, see [Variants](/...) instead. See the [GraphQL Storefront Playground](https://developer.bigcommerce.com/graphql-playground) for full schema documentation.


## Product Info

Queries return all products in a store, regardless of storefront. Thus, even if you don't allow purchasing on the storefont, the product is still returned. 

Prod visibility for product needs to be "visible on storefront" to be returned (else get `null`).
However, product still returned even if purchasability is "not purchasable" on product page. 
If category (that product is in) is not "visible", product still shows up.
For Non-MSF stores, only products in categories that are available to "default GUEST customer groups" returned. => what if you login as a customer???

### Basic info

If your product has variants, see [Get variant basic info](/...) to retrieve variant info.

Don't need to check "Show condition on SF" to be able to see condition field 

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 111) {
      id
      entityId
      sku
      path
      name
      description
      warranty
      minPurchaseQuantity
      maxPurchaseQuantity
      addToCartUrl
      type
      upc
      mpn
      gtin
      condition  
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
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
        "warranty": "example warranty information",
        "minPurchaseQuantity": 1,
        "maxPurchaseQuantity": 10,
        "addToCartUrl": "https://heavens-gate.mybigcommerce.com/cart.php?action=add&product_id=111",
        "type": "Physical",
        "upc": "123456",
        "mpn": "example MPN",
        "gtin": "99999999",
        "condition": "REFURBISHED"
      }
    }
  }
}
```
<!-- type: tab-end -->

### Prices and dimensions

You can get prices and dimensions for a product. 
If your product has variants, see [Get variant prices and dimensions](/...) instead.

If Product values empty (except for required Weight): null

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
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

fragment PriceFields on Money {
  currencyCode
  value
}

fragment DimensionFields on Measurement {
  value
  unit
}
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
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

## Product options 

You can query for the [product options](https://support.bigcommerce.com/s/article/Product-Options-v3) associated with a product. If your product has variants, use [Get variant product options](/...) for more. 

There are various [types of product options](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#types), including checkbox, multiple choice, and more, each with unique fields. However, each type of product option has a schema type that implements the `CatalogProductOption` interface, meaning you can query for the common fields that are included in `CatalogProductOption`. For more on interfaces, see the [GraphQL Schema and Types- Interfaces](https://graphql.org/learn/schema/#interfaces) documentation.

```graphql title="CatalogProductOption interface" lineNumbers
interface CatalogProductOption {
  entityId: Int!
  displayName: String!
  isRequired: Boolean!
  isVariantOption: Boolean!
}
```

The example below shows how to query for product options with additional fields for the checkbox and datefield option types. In the response, all product options include common fields from the `CatalogProductOption` interface, and the checkbox and datefield option returned the additional fields included in the query.  

<!--
type: tab
title: Query
-->

```graphql title="Example query: Product options" lineNumbers
query {
  site {
    product (entityId: 115) {
      productOptions {
        edges {
          node {
            entityId
            displayName
            isRequired
            isVariantOption
            ... on CheckboxOption {
              checkedByDefault
              label
            }
            ... on DateFieldOption {
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

```json title="Example response: Product options" lineNumbers
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

Multiple choice product options also have various types, including swatch, radio buttons, and more. Each multiple choice option has a schema type that implements the `CatalogProductOptionValue` interface.   

```graphql title="CatalogProductOptionValue interface" lineNumbers
interface CatalogProductOptionValue {
  entityId: Int!
  label: String!
  isDefault: Boolean!`
}
```

The example below shows a query that returns all product options. In the response, all multiple choice product options include common fields from the `CatalogProductOptionValue` interface, and the swatch types return additional fields (`hexColors` and `imageUrl`).

<!--
type: tab
title: Query
-->

```graphql title="Example query: Product options" lineNumbers
query {
  site {
    product (entityId: 113) {
      productOptions {
        edges {
          node {
            entityId
            displayName
            isRequired
            isVariantOption
            ... on MultipleChoiceOption {
              displayStyle
              values {
                edges {
                  node {
                    entityId
                    label
                    isDefault
                    ... on SwatchOptionValue {
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

```json title="Example response: Product options" lineNumbers
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

## Images

If your product has variants, use [Get variant images](/...) instead.

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
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

```json title="Example" lineNumbers
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
            },
            {
              "node": {
                "url": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/1w/products/113/380/IMAG0805_BURST004__27919.1640207947.jpg",
                "urlOriginal": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/original/products/113/380/IMAG0805_BURST004__27919.1640207947.jpg",
                "altText": "",
                "isDefault": false
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

## Metafields

This returns only product metafields. Use [Get variant metafields](/...) to retrieve variant metafields. 

Only product metafields that have storefront permissions are returned. i.e. permissions set to `write_and_sf_access` or `read_and_sf_access`.

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
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

```json title="Example" lineNumbers
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

## Custom fields

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
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

```json title="Example" lineNumbers
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

## Gift wrapping options

Gift wrapping options that are available for the product are returned. A gift wrapping option does not have to be marked as "visible" in the control panel.

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
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

```json title="Example" lineNumbers
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

## Reviews

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

## Related Products

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

## Resources