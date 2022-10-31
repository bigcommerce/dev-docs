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


