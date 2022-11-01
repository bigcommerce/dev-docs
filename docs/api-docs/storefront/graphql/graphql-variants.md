# Variants with the GraphQL Storefront API


## Get a variant

In the following cases, you can query a variant by using the `variants` field and specifying a product identifier, for example, the variant `entityId` or `optionValueId`:

<!--
type: tab
title: Variant entity ID
-->


```graphql title="How to get a variant" lineNumbers
query {
  site {
    product (entityId: 113) {           #This is the product entity ID 
      variants (entityIds: [98]) {      #This is the variant entity ID
        ...
      }
    }
  }
}
```

<!--
type: tab
title: Variant option value entity ID
-->

```graphql title="How to get a variant" lineNumbers
query {
  site {
    product (entityId: 113) {       # This is the product's entity ID 
      variants (
        # Specify the entity ID for the value of each variant option
        optionValueIds: [
          { optionEntityId: 116, valueEntityId: 108 }
          { optionEntityId: 126, valueEntityId: 129 }
        ]
      ) {
        ...
      }
    }
  }
}
```

<!-- type: tab-end -->

You can also query a variant by using the `products` field and specifying a variant identifier. You can use the variant's entity ID, variant option value entity IDs, or variant SKU:

<!--
type: tab
title: Variant entity ID
-->


```graphql title="How to get a variant" lineNumbers
query {
  site {
    product(variantEntityId: 27098) {
      ...  
    }
  }
}
```

<!--
type: tab
title: Variant option value entity ID
-->

```graphql title="How to get a variant" lineNumbers
query {
  site {
    product(
      entityId: 113 # This is the product's entity ID
      
      # Specify the entity ID for the value of each variant option
      optionValueIds: [
        { optionEntityId: 116, valueEntityId: 108 }
        { optionEntityId: 126, valueEntityId: 129 }
      ]
    ) {
      ...
    }
  }
}

```
<!--
type: tab
title: Variant SKU
-->

```graphql title="How to get a variant" lineNumbers
query {
  site {
    product(sku: "variant-sku") {
      ...  
    }
  }
}
```

<!-- type: tab-end -->

Using the `products` field with a variant identifier returns variant information overlaid on the Product object. For example, if the variant has a different image, dimensions, SKU, or price, than the product,the variant's info will be returned. This allows you to directly query a variant.

## Variant Info

### Basic info

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (entityIds: [127]) {
        edges {
          node {
            id
            entityId
            sku  
            upc
            mpn
            isPurchasable
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
        "variants": {
          "edges": [
            {
              "node": {
                "id": "VmFyaWFudDoxMjc=",
                "entityId": 127,
                "sku": "ABC-1111-PI-SM-CO-RE",
                "upc": "123346",
                "mpn": "9876543210",
                "isPurchasable": true
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

### Prices and dimensions

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (entityIds: [98]) {
        edges {
          node {
            prices {
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
            width {
              ...DimensionFields
            }
            height {
              ...DimensionFields
            }
            depth {
              ...DimensionFields
            }
            weight {
              ...DimensionFields
            }
          }
        }
      }
    }
  }
}
      
fragment PriceFields on Money {
  value
  currencyCode
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
        "variants": {
          "edges": [
            {
              "node": {
                "prices": {
                  "price": {
                    "value": 4.5,
                    "currencyCode": "USD"
                  },
                  "salePrice": {
                    "value": 5,
                    "currencyCode": "USD"
                  },
                  "basePrice": {
                    "value": 10,
                    "currencyCode": "USD"
                  },
                  "retailPrice": {
                    "value": 20,
                    "currencyCode": "USD"
                  }
                },
                "width": {
                  "value": 2,
                  "unit": "in"
                },
                "height": {
                  "value": 2,
                  "unit": "in"
                },
                "depth": {
                  "value": 2,
                  "unit": "in"
                },
                "weight": {
                  "value": 37,
                  "unit": "oz"
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

## Variant options

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product(entityId: 113) {
      variants(entityIds: [127]) {
        edges {
          node {
            productOptions {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                  isVariantOption
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

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "variants": {
          "edges": [
            {
              "node": {
                "productOptions": {
                  "edges": [
                    {
                      "node": {
                        "entityId": 116,
                        "displayName": "Color",
                        "isRequired": true,
                        "isVariantOption": true
                      }
                    },
                    {
                      "node": {
                        "entityId": 126,
                        "displayName": "Size",
                        "isRequired": true,
                        "isVariantOption": true
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

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product(entityId: 113) {
      variants(entityIds: [127]) {
        edges {
          node {
            options {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                  values {
                    edges {
                      node {
                        entityId
                        label
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
        "variants": {
          "edges": [
            {
              "node": {
                "options": {
                  "edges": [
                    {
                      "node": {
                        "entityId": 116,
                        "displayName": "Color",
                        "isRequired": true,
                        "values": {
                          "edges": [
                            {
                              "node": {
                                "entityId": 108,
                                "label": "Pink"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "node": {
                        "entityId": 126,
                        "displayName": "Size",
                        "isRequired": true,
                        "values": {
                          "edges": [
                            {
                              "node": {
                                "entityId": 129,
                                "label": "Small"
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
          ]
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

## Images

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (entityIds: [127]) {
        edges {
          node {
            defaultImage {
              url (width: 1)
              urlOriginal
              altText
              isDefault
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

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "variants": {
          "edges": [
            {
              "node": {
                "defaultImage": {
                  "url": "https://cdn11.bigcommerce.com/s-o8ertuc7vw/images/stencil/1w/attribute_rule_images/32_source_1667245516.png",
                  "urlOriginal": "https://cdn11.bigcommerce.com/s-o8ertuc7vw/images/stencil/original/attribute_rule_images/32_source_1667245516.png",
                  "altText": "",
                  "isDefault": true
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

## Metafields

This returns only variant metafields. Use [Get product metafields](/...) to retrieve product metafields. 

Only product metafields that have storefront permissions are returned. i.e. permissions set to `write_and_sf_access` or `read_and_sf_access`.

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (entityIds: [127]) {
        edges {
          node {
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
        "variants": {
          "edges": [
            {
              "node": {
                "metafields": {
                  "edges": [
                    {
                      "node": {
                        "id": "TWV0YWZpZWxkczoxOA==",
                        "entityId": 18,
                        "key": "Site number",
                        "value": "3TZ"
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

## Resources