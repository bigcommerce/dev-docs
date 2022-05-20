# Faceted and Textual Search with the GraphQL Storefront API

BigCommerce's GraphQL Storefront API lets you power your storefront's faceted and textual search with results from our back-end search engine. These built-in capabilities allow Stencil developers to build on top of our search engine, and it enables merchants on headless storefronts to use BigCommerce's search, sort, and filtering capabilities. 

With the GraphQL Storefront API's faceted and textual search, you can:
- Load category pages with no selections, including the both the facets and products relevant to the search results 
- Load category pages with facet selections for specific facets
- Load featured products from specific categories
- Quicksearch products by using search terms (textual search)
- Sort products alphabetically, by newest to oldest, etc

You can access these features by querying the `SearchProducts` field. Note that you can query facets, filter by rating, or filter by "in-stock" only if the merchant is on a Pro or Enterprise plan. A merchant must [enable Product Filtering](https://support.bigcommerce.com/s/article/Product-Filtering-Settings?language=en_US#setup) for facets to be returned. In addition, only facets that a merchant marks as visible in their Product Filtering settings will be returned. 

This page walks you through how to filter and query products and facets to display on your storefront. See the [GraphQL Storefront Playground](/graphql-playground) for full schema documentation.  

## Filter products and facets

To use faceted and textual search, specify a filter in the argument for `SearchProducts`. For faceted search, you can filter by price, rating, among other features and attributes of products. For textual search, use the `searchTerm` field. 

```graphql title=Filters for products and facets" lineNumbers
...
  searchProducts(
  filters: {
    searchTerm: "Sample"
    price:{
      minPrice:11,
      maxPrice:200
    },
    rating:{
      minRating:3,
      maxRating:5
    },
    categoryEntityId:24,
    searchSubCategories:false,
    categoryEntityIds:[23],
    brandEntityIds:[35],
    productAttributes:[
      {
        attribute:"Color",
        values:["Black"]
      }
    ],
    isFreeShipping:true,
    isFeatured:true,
    isInStock:true
  }
  ... 
) { 
...
```
These filters affect **both** the products and facets that are returned. For example, filtering by rating returns only products that are within the specified rating range, as well as only facets that have products within the rating range. 

See the [GraphQL Storefront Playground](/graphql-playground) for descriptions of each filter. 

## Get products

To get products, specify `products` as a field in `searchProducts`. Here is an example request that returns the first two products with a rating between three and five: 

<!--
type: tab
title: Example query
-->

```graphql title="Example" lineNumbers
query {
  site {
    search {
      searchProducts(
        filters: {
          rating:{
             minRating:3,
             maxRating:5
           }
        }
      ) {
        products(first: 2) {
          edges {
            node {
              entityId
              name
              prices {
                price {
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
title: Example response
-->

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "search": {
        "searchProducts": {
          "products": {
            "edges": [
              {
                "node": {
                  "entityId": 80,
                  "name": "[Sample] Orbit Terrarium - Large",
                  "prices": {
                    "price": {
                      "value": 109
                    }
                  }
                }
              },
              {
                "node": {
                  "entityId": 93,
                  "name": "[Sample] 1 L Le Parfait Jar",
                  "prices": {
                    "price": {
                      "value": 7
                    }
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

You can sort the products that are returned using the `sort` field. Here is an example request that searches for products using a search term and sorts the products in alphabetical order:

<!--
type: tab
title: Example query
-->

```graphql title="Example" lineNumbers
query {
  site {
    search {
      searchProducts(
        filters: {
          searchTerm: "Sample"
        }
        sort: A_TO_Z
      ) {
        products(first: 2) {
          edges {
            node {
              entityId
              name
              prices {
                price {
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
title: Example response
-->

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "search": {
        "searchProducts": {
          "products": {
            "edges": [
              {
                "node": {
                  "entityId": 93,
                  "name": "[Sample] 1 L Le Parfait Jar",
                  "prices": {
                    "price": {
                      "value": 7
                    }
                  }
                }
              },
              {
                "node": {
                  "entityId": 86,
                  "name": "[Sample] Able Brewing System",
                  "prices": {
                    "price": {
                      "value": 225
                    }
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
}
```

<!-- type: tab-end -->

The `sort` affects only the list of products returned. A merchant's [Product Filtering settings](https://support.bigcommerce.com/s/article/Product-Filtering-Settings?language=en_US#setup) determines how facets are sorted. 

<!-- theme: info -->
> **Note** 
> For a list of product fields that `searchTerm` searches, see [Store Search Product Fields](https://support.bigcommerce.com/s/article/Store-Search?language=en_US#best-practices).


## Get facets

To get facets, specify `filters` as a field in `searchProducts`. Here is an example request that returns the specified facets that have products with a rating between three and five: 

<!--
type: tab
title: Example query
-->

```graphql title="Example" lineNumbers
query {
  site {
    search {
      searchProducts(
        filters: {
           rating:{
             minRating:3,
             maxRating:5
           }
        }
      ) {
         filters {
           edges {
             node {
               __typename
               name
               isCollapsedByDefault
               ... on CategorySearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 categories {
                   edges {
                     node {
                       entityId
                       isSelected
                       productCount
                       subCategories {
                         edges {
                           node {
                             entityId
                             name
                           }
                         }
                       }
                     }
                   }
                 }
               }
               ... on OtherSearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 freeShipping {
                   isSelected
                   productCount
                 }
                 isInStock {
                   isSelected
                   productCount
                 }
                 isFeatured {
                   isSelected
                   productCount
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
title: Example response
-->

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "search": {
        "searchProducts": {
          "filters": {
            "edges": [
              {
                "node": {
                  "__typename": "CategorySearchFilter",
                  "name": "Category",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "categories": {
                    "edges": [
                      {
                        "node": {
                          "entityId": 19,
                          "isSelected": false,
                          "productCount": 1,
                          "subCategories": {
                            "edges": []
                          }
                        }
                      },
                      {
                        "node": {
                          "entityId": 21,
                          "isSelected": false,
                          "productCount": 1,
                          "subCategories": {
                            "edges": []
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "OtherSearchFilter",
                  "name": "Other",
                  "isCollapsedByDefault": true,
                  "displayProductCount": true,
                  "freeShipping": null,
                  "isInStock": {
                    "isSelected": false,
                    "productCount": 2
                  },
                  "isFeatured": null
                }
              }
            ]
          }
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

For a complete list of facets that can be returned, see the [GraphQL Storefront Playground](/graphql-playground).

## Put it all together: get products and facets

To get both products and facets, specify `products` and `filters` as a field in `searchProducts`. 

<!--
type: tab
title: Example query
-->


```graphql title="Example" lineNumbers
query {
  site {
    search {
      searchProducts(
        filters: {
          searchTerm: "Sample"
           rating:{
             minRating:3,
             maxRating:5
           }
        }
        sort: A_TO_Z
      ) {
        products(first: 2) {
          edges {
            node {
              entityId
              name
              prices {
                price {
                  value
                }
              }
            }
          }
        }
         filters {
           edges {
             node {
               __typename
               name
               isCollapsedByDefault
               ... on CategorySearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 categories {
                   edges {
                     node {
                       entityId
                       isSelected
                       productCount
                       subCategories {
                         edges {
                           node {
                             entityId
                             name
                           }
                         }
                       }
                     }
                   }
                 }
               }
               ... on OtherSearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 freeShipping {
                   isSelected
                   productCount
                 }
                 isInStock {
                   isSelected
                   productCount
                 }
                 isFeatured {
                   isSelected
                   productCount
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
title: Example response
-->

```json title="Example" lineNumbers
{
    "data": {
      "site": {
        "search": {
          "searchProducts": {
            "products": {
              "edges": [
                {
                  "node": {
                    "entityId": 93,
                    "name": "[Sample] 1 L Le Parfait Jar",
                    "prices": {
                      "price": {
                        "value": 7
                      }
                    }
                  }
                },
                {
                  "node": {
                    "entityId": 80,
                    "name": "[Sample] Orbit Terrarium - Large",
                    "prices": {
                      "price": {
                        "value": 109
                      }
                    }
                  }
                }
              ]
            },
            "filters": {
              "edges": [
                {
                  "node": {
                    "__typename": "CategorySearchFilter",
                    "name": "Category",
                    "isCollapsedByDefault": false,
                    "displayProductCount": true,
                    "categories": {
                      "edges": [
                        {
                          "node": {
                            "entityId": 19,
                            "isSelected": false,
                            "productCount": 1,
                            "subCategories": {
                              "edges": []
                            }
                          }
                        },
                        {
                          "node": {
                            "entityId": 21,
                            "isSelected": false,
                            "productCount": 1,
                            "subCategories": {
                              "edges": []
                            }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "__typename": "OtherSearchFilter",
                    "name": "Other",
                    "isCollapsedByDefault": true,
                    "displayProductCount": true,
                    "freeShipping": null,
                    "isInStock": {
                      "isSelected": false,
                      "productCount": 2
                    },
                    "isFeatured": null
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
```
<!-- type: tab-end -->

If a merchant has not enabled product filtering, you will receive an empty array for the returned facets, though products will still be returned:

<!--
type: tab
title: Example response
-->

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "search": {
        "searchProducts": {
          "products": {
            "edges": [
              {
                "node": {
                  "entityId": 93,
                  "name": "[Sample] 1 L Le Parfait Jar",
                  "prices": {
                    "price": {
                      "value": 7
                    }
                  }
                }
              },
              {
                "node": {
                  "entityId": 80,
                  "name": "[Sample] Orbit Terrarium - Large",
                  "prices": {
                    "price": {
                      "value": 109
                    }
                  }
                }
              }
            ]
          },
          "filters": {
            "edges": []
          }
        }
      }
    }
  }
}
```

<!-- type: tab-end -->

## Resources

- [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview)
- [GraphQL Storefront Playground](/graphql-playground)
