# GraphQL Storefront API Example Queries



Below are example GraphQL queries for use with the BigCommerce GraphQL Storefront API. The purpose of these examples is to assist developers in getting familiar with the API. For a general overview of it's usage and capabilities, see [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview).

<!-- theme: warning -->
> #### Note
> * The GraphQL Storefront API is in early access and is feature-incomplete; it will remain in early access until we reach the minimum amount of functionality necessary to power an end-to-end shopping experience.



## Get a customer's details

```graphql title="Example query: Get a customer's details" lineNumbers
query CustomerAttributes {
  customer {
    firstName
    lastName
    email
    entityId
    customerGroupId
    attributeCount
    attributes {
      shirtSize: attribute(entityId:123) {
        entityId
        value
      }
      favoriteColor: attribute(entityId:456) {
        entityId
        value
      }
    }
  }
}
```

<a href="https://developer.bigcommerce.com/graphql?playground_tab=customerDetails" target="_blank">**Try it in GraphQL Playground**</a>

## Get first three levels of category tree

```graphql title="Example query: Get first three levels of category tree" lineNumbers
query CategoryTree3LevelsDeep {
  site {
    categoryTree {
      ...CategoryFields
      children {
        ...CategoryFields
        children {
          ...CategoryFields
        }
      }
    }
  }
}

fragment CategoryFields on CategoryTreeItem {
  name
  path
  entityId
}
```

<a href="https://developer.bigcommerce.com/graphql?playground_tab=categoryTree" target="_blank">**Try it in GraphQL Playground**</a>

## Get category and products within by URL

```graphql title="Example query: Get category and products within by URL" lineNumbers
query CategoryByUrl {
  site {
    route(path: "/shop-all/") {
      node {
        id
        ... on Category {
          name
          entityId
          description
          products {
            edges {
              node {
                name
                defaultImage {
                  url(width: 1200)
                }
                brand {
                  name
                  defaultImage {
                    url(width: 200)
                  }
                }
                prices {
                  price {
                    ...PriceFields
                  }
                  priceRange {
                    min {
                      ...PriceFields
                    }
                    max {
                      ...PriceFields
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

fragment PriceFields on Money {
  value
  currencyCode
}
```

<a href="https://developer.bigcommerce.com/graphql?playground_tab=categoriesByUrl" target="_blank">**Try it in GraphQL Playground**</a>

## Look up an object by URL

```graphql title="Example query: Look up an object by URL" lineNumbers
query LookUpUrl {
  site {
    route(path: "/shop-all/") {
      node {
        __typename
        id
        ... on Category {
          name
          description
        }
        ... on Brand {
          name
          defaultImage {
            url(width: 200)
          }
        }
        ... on Product {
          name
          description
          images {
            edges {
              node {
                url(width: 500, height: 500)
              }
            }
          }
          brand {
            name
          }
        }
      }
    }
  }
}
```

<a href="https://developer.bigcommerce.com/graphql?playground_tab=objectsByUrl" target="_blank">**Try it in GraphQL Playground**</a>

## Get product images at different resolutions

```graphql title="Example query: Get product images at different resolutions" lineNumbers
query SrcsetImages {
  site {
    product(entityId: 123) {
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

<a href="https://developer.bigcommerce.com/graphql?playground_tab=productImages" target="_blank">**Try it in GraphQL Playground**</a>

## Get a product

```graphql title="Example query: Get a product" lineNumbers
query SingleProduct {
  site {
    products (entityIds: [4917]) {
      edges {
        node {
          id
          entityId
          name
          prices {
            price {
              value
              currencyCode
            }
          }
        }
      }
    }
  }
}
```

<a href="https://developer.bigcommerce.com/graphql?playground_tab=singleProduct" target="_blank">**Try it in GraphQL Playground**</a>

## Get variant details as a product object

```graphql title="Example query: Get variant details as a product object" lineNumbers
query VariantById {
  site {
    product(variantEntityId: 27098) {
      name
      sku
      defaultImage {
        url(width: 500, height: 500)
      }
      prices {
        price {
          ...PriceFields
        }
        salePrice {
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

<!-- theme: info -->
> This query returns variant information appropriately overlaid on the Product object. For example, if the variant has a different image, dimensions, SKU, or price, that will be automatically returned -- this allows for directly merchandising particular variants.



<a href="https://developer.bigcommerce.com/graphql?playground_tab=variantDetails" target="_blank">**Try it in GraphQL Playground**</a>

## Get product option details by product ID

```graphql title="Example query: Get product option details by product ID" lineNumbers
query SeveralProductsByID {
  site {
    products(entityIds: [1, 2, 3]) {
      edges {
        node {
          name
          productOptions {
            edges {
              node {
                entityId
                displayName
                isRequired
                ... on MultipleChoiceOption {
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

<a href="https://developer.bigcommerce.com/graphql?playground_tab=productOptions" target="_blank">**Try it in GraphQL Playground**</a>

## Get refined product object for given options

```graphql title="Example query: Get refined product object for given options" lineNumbers
query ProductsWithOptionSelections {
  site {
    product123: product(
      entityId: 123
      optionValueIds: [
        { optionEntityId: 4, valueEntityId: 543 }
        { optionEntityId: 5, valueEntityId: 443 }
      ]
    ) {
      ...ProductFields
    }
    product234: product(
      entityId: 234
      optionValueIds: [
        { optionEntityId: 8, valueEntityId: 768 }
        { optionEntityId: 13, valueEntityId: 883 }
      ]
    ) {
      ...ProductFields
    }
  }
}

fragment ProductFields on Product {
  name
  defaultImage {
    url(width: 1000)
  }
  sku
}
```

<a href="https://developer.bigcommerce.com/graphql?playground_tab=refinedProduct" target="_blank">**Try it in GraphQL Playground**</a>

## Get product swatch option values

```graphql title="Example query: Get product swatch option values" lineNumbers
query {
  site {
    products (first: 3) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          entityId
          name
          productOptions {
            edges {
              node {
                entityId
                displayName
                ... on MultipleChoiceOption {
                  values {
                    edges {
                      node {
                        ... on SwatchOptionValue {
                          label
                          hexColors
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
