# Variants with the GraphQL Storefront API

BigCommerce's GraphQL Storefront API lets merchants on headless storefronts retrieve [variants](https://support.bigcommerce.com/s/article/Variants-and-Modifiers) from a store. These built-in capabilities also allow Stencil developers to customize their storefronts with variant information.

The GraphQL Storefront API lets you retrieve the following variant features, and more:
- Price info in a store's transacting currency   
- Variant options associated with a variant, along with their values
- Variant metafields that have storefront access

You can access these features if a merchant makes the product visible on storefronts.

This page walks you through how to retrieve info for a variant. To retrieve info for the base product, see [Products with the GraphQL Storefront API](/api-docs/storefront/graphql/products). For full schema documentation, see the [GraphQL Storefront Playground](https://developer.bigcommerce.com/api-docs/storefront/graphql/playground).

## Get a variant

### Get a variant with the `variants` field

Query a variant by specifying a variant identifier. For instance, use the variant `entityId` or `optionValueId` for the `variants` field as shown here:

<!--
type: tab
title: Variant entity ID
-->


```graphql title="Get a variant using the variant entity ID" lineNumbers
# This example retrieves 1 variant. 
# Specify multiple variant entityIds to retrieve multiple variants.

query {
  site {
    product (entityId: 113) {           # product entity ID 
      variants (entityIds: [98]) {      # variant entity ID(s)
        edges {
          node {
            # fields on the Variant object type
          }
        }
      }
    }
  }
}
```

<!--
type: tab
title: Variant option value entity ID
-->

```graphql title="Get a variant using variant option values" lineNumbers
# This query retrieves one variant.
# You must specify the entity ID for the value of each variant option.

query {
  site {
    product (entityId: 113) {       # product entity ID 
      variants (optionValueIds: [{optionEntityId: 116, valueEntityId: 108} {optionEntityId: 126, valueEntityId: 129}]) {
        edges {
          node {
            # fields on the Variant object type
          }
        }
      }
    }
  }
}
```

&nbsp;

```graphql title="Get a variant using variant option values" lineNumbers
# This query retrieves two variants.
# For each variant, you must specify the entity ID for the value of each variant option.
# This query uses aliases and fragments. For more, see https://graphql.org/learn/queries.

query {
  site {
    product (entityId: 113) {       # product entity ID 
      v1: variants (optionValueIds: [{optionEntityId: 116, valueEntityId: 108} {optionEntityId: 126, valueEntityId: 129}]) {
        edges {
          node {
            ...VariantFields
          }
        }
      }
      v2: variants (optionValueIds: [{optionEntityId: 116, valueEntityId: 109} {optionEntityId: 126, valueEntityId: 129}]){
        edges {
          node {
            ...VariantFields
          }
        }
      }
    }
  }
}

fragment VariantFields on Variant {
  # fields on the Variant object type
}
```

<!-- type: tab-end -->

Query all variants by omitting an argument for `variants`.

### Get a variant with the `product` field

Query a variant by specifying a variant identifier for the `product` field. Use the variant's entity ID, variant option value entity IDs, or variant SKU:

<!--
type: tab
title: Variant entity ID
-->


```graphql title="Get a variant using the variant entity ID" lineNumbers
# This query retrieves 1 variant. 

query {
  site {
    product (variantEntityId: 27098) {
      # fields on the Product object type  
    }
  }
}
```

<!--
type: tab
title: Variant option value entity ID
-->

```graphql title="Get a variant using variant option values" lineNumbers
# This query retrieves 1 variant.
# You must specify the entity ID for the value of each variant option.

query {
  site {
    product (
      entityId: 113       # product entity ID
      optionValueIds: [{optionEntityId: 116, valueEntityId: 108} {optionEntityId: 126, valueEntityId: 129}]
    ) {
      # fields on the Product object type
    }
  }
}

```
<!--
type: tab
title: Variant SKU
-->

```graphql title="Get a variant using the variant sku" lineNumbers
# This query retrieves 1 variant. 

query {
  site {
    product (sku: "variant-sku") {
      # fields on the Product object type 
    }
  }
}
```

<!-- type: tab-end -->

Specifying a variant identifier for the `product` field returns variant information overlaid on the Product object. For example, if the variant has a different image, dimensions, SKU, or price, than the product, the variant's info will be returned. This allows you to directly query a variant.

## Get variant identifiers

You can query identifying info for variants. The following query retrieves identifying info for the specified variant:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get basic info for a variant" lineNumbers
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

```json title="Example response: Get basic info for a variant" lineNumbers
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
                "mpn": "9876543210"
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

## Get variant prices and dimensions

You can query the prices and dimensions for variants. The following query retrieves prices and dimensions for the specified variant:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get prices and dimensions for a variant" lineNumbers
# This query uses fragments. For more, see https://graphql.org/learn/queries/#fragments.

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
      
fragment PriceFields on Money {               # fields on the Money object type
  value
  currencyCode
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

```json title="Example response: Get prices and dimensions for a variant" lineNumbers
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

## Get variant options and variant option values

You can query the variant options and the variant option values that are associated with variants. 

### Get variant options

All variant options are [multiple choice](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#mc). 

The following example shows how to get the first two variant options that are associated with the base product for the specified variant:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get variant options for a variant" lineNumbers
# This query uses interfaces. For more, see https://graphql.org/learn/schema/#interfaces.

query {
  site {
    product (entityId: 113) {
      variants (entityIds: [127]) {
        edges {
          node {
            productOptions (first: 2) {
              edges {
                node {
                  ... on MultipleChoiceOption { 
                    entityId                              
                    displayName
                    isRequired
                    isVariantOption
                    displayStyle
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

```json title="Example response: Get variant options for a variant" lineNumbers
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
                        "isVariantOption": true,
                        "displayStyle": "RadioButtons",
                      }
                    },
                    {
                      "node": {
                        "entityId": 126,
                        "displayName": "Size",
                        "isRequired": true,
                        "isVariantOption": true,
                        "displayStyle": "Swatch",
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

### Get variant option values

All variant options are [multiple choice](https://support.bigcommerce.com/s/article/Product-Options-v3?language=en_US#mc). When you get variant options, you can also retrieve the multiple choice values that are associated with a variant (i.e. variant option values). 

Multiple choice values are of various types, for example, swatch or radio buttons. Each type of multiple choice value has a schema type that implements the `CatalogProductOptionValue` interface, meaning you can retrieve the common fields from `CatalogProductOptionValue` for any type of multiple choice value. For more on interfaces, see the [GraphQL Schema and Types- Interfaces](https://graphql.org/learn/schema/#interfaces) documentation.   


```graphql title="CatalogProductOptionValue interface" lineNumbers
# Fields common among multiple choice values 

interface CatalogProductOptionValue {
  entityId: Int!
  label: String!
  isDefault: Boolean!`
}
```

The following example retrieves variant option values for the specified variant. In the response, all multiple choice values include queried fields from the `CatalogProductOptionValue` interface, and those that are swatch types include additional fields. The example query retrieves only the first two variant options associated with the base product.

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get variant option values for a variant" lineNumbers
# This query uses interfaces. For more, see https://graphql.org/learn/schema/#interfaces.

query {
  site {
    product (entityId: 113) {
      variants (entityIds: [127]) {
        edges {
          node {
            productOptions (first: 2) {
              edges {
                node {
                  ... on MultipleChoiceOption {           # fields all muliple choice options include
                    values {
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
    }
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get variant option values for a variant" lineNumbers
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
                        "values": {
                          "edges": [
                            {
                              "node": {
                                "entityId": 108,
                                "label": "Pink",
                                "isDefault": true
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "node": {
                        "values": {
                          "edges": [
                            {
                              "node": {
                                "entityId": 129,
                                "label": "Small",
                                "isDefault": false,
                                "hexColors": [
                                  "#912727",
                                  "#D6A67C"
                                ],
                                "imageUrl": null
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

You can also retrieve variant option values using the `options` field. The following query retrieves the variant option values that are associated with the specified variant. The example query retrieves only the first two variant options associated with the base product.

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get variant option values for a variant" lineNumbers
query {
  site {
    product(entityId: 113) {
      variants(entityIds: [127]) {
        edges {
          node {
            options (first: 2) {
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

```json title="Example response: Get variant option values for a variant" lineNumbers
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

## Get variant images

You can query the images for variants. The following query retrieves the image for the specified variant:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get images for a variant" lineNumbers
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

```json title="Example response: Get images for a variant" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "variants": {
          "edges": [
            {
              "node": {
                "defaultImage": {
                  "url": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/1w/attribute_rule_images/32_source_1667245516.png",
                  "urlOriginal": "https://cdn11.bigcommerce.com/s-{store_hash}/images/stencil/original/attribute_rule_images/32_source_1667245516.png",
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

## Get variant metafields

Query variant metafields by specifying the namespace for the variant metafields. Only metafields that have storefront permissions are returned (i.e. permissions must be set to `write_and_sf_access` or `read_and_sf_access`).

<!-- theme:info -->
> #### Variant vs product metafields
> The query returns only **variant** metafields. See [Get product metafields](/api-docs/storefront/graphql/products#get-product-metafields) to retrieve **product** metafields. 

The following query retrieves the first variant metafield for the specified variant:

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get variant metafields for a variant" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (entityIds: [127]) {
        edges {
          node {
            metafields (first: 1 namespace: "Warehouse Locations") {
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

```json title="Example response: Get variant metafields for a variant" lineNumbers
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

- [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview)
- [Products with the GraphQL Storefront API](/api-docs/storefront/graphql/products)
- [GraphQL Storefront API Explorer](https://developer.bigcommerce.com/api-docs/storefront/graphql/explorer)
- [GraphQL Storefront API Playground](https://developer.bigcommerce.com/api-docs/storefront/graphql/playground)
- [GraphQL language documentation](https://graphql.org/learn/queries) (graphql.org)
