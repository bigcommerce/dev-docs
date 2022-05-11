# Storefront GraphQL's Faceted and Textual Search

BigCommerce storefront search features are available in the Storefront GraphQL API so that storefront API consumers can use BigCommerce's backend search to rebuild their faceted and textual search UI. These built-in capabilities allow Stencil developers to build on top of our search engine, as well as merchants on headless storefronts to access search, sort, and filtering capabilities available from BigCommerce. 

With Storefront GraphQL's Faceted and Textual Search, you can:
- Load category pages with no selections, including the both the facets and products relevant to the search results 
- Load category pages with facet selections for specific facets
- Load featured products from specific categories
- Quicksearch products by using search terms (textual search)
- Sort products alphabetically, by newest to oldest, etc

You can access these features by querying the `SearchProducts` field. Note that you can query facets, filter by rating, or filter by "in-stock" only if the merchant is on a Pro or Enterprise plan. A merchant must [enable Product Filtering](https://support.bigcommerce.com/s/article/Product-Filtering-Settings?language=en_US#setup) for facets to be returned. In addition, only facets that a merchant marks as visible in their Product Filtering settings will be returned. 

This page walks you through how to filter and query products and facets to display on your storefront. See [GraphQL Playground](/graphql-playground) for full schema documentation.  

## How to Filter Products and Facets

To use the Faceted and Textual Search feature, specify a filter in the argument for `SearchProducts`. For Faceted Search, you can filter by price, rating, among other features and attributes of products. For Textual Search, use the `searchTerm` field. 

```GraphQL title=Filters for Products and Facets" lineNumbers
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

See [GraphQL Playground](/graphql-playground) for descriptions of each filter. 

## How to Get Products

To get products, specify `products` as a field in `searchProducts`. Here is an example request that returns the first two products with a rating between three and five: 

```GraphQL title="Request" lineNumbers
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
```JSON title="Response" lineNumbers
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

You can sort the products that are returned using the `sort` field. Here is an example request that searches for products using a search term and sorts the products in alphabetical order:

```GraphQL title="Request" lineNumbers
query {
  site {
    search {
      searchProducts(
        filters: {
          searchTerm: "Sample"
        }
        sort: A_TO_Z
      ) {
        products(first: 5) {
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
```JSON title="Response" lineNumbers
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
              },
              {
                "node": {
                  "entityId": 103,
                  "name": "[Sample] Canvas Laundry Cart",
                  "prices": {
                    "price": {
                      "value": 200
                    }
                  }
                }
              },
              {
                "node": {
                  "entityId": 88,
                  "name": "[Sample] Chemex Coffeemaker 3 Cup",
                  "prices": {
                    "price": {
                      "value": 49.5
                    }
                  }
                }
              },
              {
                "node": {
                  "entityId": 107,
                  "name": "[Sample] Dustpan & Brush",
                  "prices": {
                    "price": {
                      "value": 34.95
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
The `sort` affects only the list of products returned. A merchant's [Product Filtering settings](https://support.bigcommerce.com/s/article/Product-Filtering-Settings?language=en_US#setup) determines how facets are sorted. 

<!-- theme: info -->
> **Note** 
> For a list of product fields that `searchTerm` searches, see [Store Search Product Fields](https://support.bigcommerce.com/s/article/Store-Search?language=en_US#best-practices).


## How to Get Facets

To get facets, specify `filters` as a field in `searchProducts`. Here is an example request that returns facets that have products with a rating between three and five: 

```GraphQL title="Request" lineNumbers
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
               ... on BrandSearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 brands {
                   edges {
                     node {
                       entityId
                       name
                       isSelected
                       productCount
                     }
                   }
                 }
               }
               ... on RatingSearchFilter {
                 name
                 isCollapsedByDefault
                 ratings {
                   edges {
                     node {
                       value
                       isSelected
                       productCount
                     }
                   }
                 }
               }
               ... on ProductAttributeSearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 attributes {
                   edges {
                     node {
                       value
                       isSelected
                       productCount
                     }
                   }
                 }
               }
               ... on PriceSearchFilter {
                 name
                 isCollapsedByDefault
                 selected {
                   minPrice
                   maxPrice
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

```JSON title="Response" lineNumbers
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
                      },
                      {
                        "node": {
                          "entityId": 23,
                          "isSelected": false,
                          "productCount": 2,
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
                  "__typename": "BrandSearchFilter",
                  "name": "Brand",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "brands": {
                    "edges": [
                      {
                        "node": {
                          "entityId": 36,
                          "name": "OFS",
                          "isSelected": false,
                          "productCount": 1
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "ProductAttributeSearchFilter",
                  "name": "Color",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "attributes": {
                    "edges": [
                      {
                        "node": {
                          "value": "Black",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Blue",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Orange",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Silver",
                          "isSelected": false,
                          "productCount": 1
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "ProductAttributeSearchFilter",
                  "name": "Size",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "attributes": {
                    "edges": [
                      {
                        "node": {
                          "value": "Large",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Medium",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Small",
                          "isSelected": false,
                          "productCount": 1
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "PriceSearchFilter",
                  "name": "Price",
                  "isCollapsedByDefault": false,
                  "selected": {
                    "minPrice": null,
                    "maxPrice": null
                  }
                }
              },
              {
                "node": {
                  "__typename": "RatingSearchFilter",
                  "name": "Rating",
                  "isCollapsedByDefault": true,
                  "ratings": {
                    "edges": [
                      {
                        "node": {
                          "value": "3",
                          "isSelected": true,
                          "productCount": 2
                        }
                      },
                      {
                        "node": {
                          "value": "4",
                          "isSelected": false,
                          "productCount": 2
                        }
                      },
                      {
                        "node": {
                          "value": "5",
                          "isSelected": false,
                          "productCount": 1
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

## Putting it all Together: Products and Facets

To get both products and facets, specify `products` and `filters` as a field in `searchProducts`. 

```GraphQL title="Request" lineNumbers
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
        products(first: 5) {
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
               ... on BrandSearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 brands {
                   edges {
                     node {
                       entityId
                       name
                       isSelected
                       productCount
                     }
                   }
                 }
               }
               ... on RatingSearchFilter {
                 name
                 isCollapsedByDefault
                 ratings {
                   edges {
                     node {
                       value
                       isSelected
                       productCount
                     }
                   }
                 }
               }
               ... on ProductAttributeSearchFilter {
                 name
                 displayProductCount
                 isCollapsedByDefault
                 attributes {
                   edges {
                     node {
                       value
                       isSelected
                       productCount
                     }
                   }
                 }
               }
               ... on PriceSearchFilter {
                 name
                 isCollapsedByDefault
                 selected {
                   minPrice
                   maxPrice
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

```JSON title="Response" lineNumbers
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
                      },
                      {
                        "node": {
                          "entityId": 23,
                          "isSelected": false,
                          "productCount": 2,
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
                  "__typename": "BrandSearchFilter",
                  "name": "Brand",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "brands": {
                    "edges": [
                      {
                        "node": {
                          "entityId": 36,
                          "name": "OFS",
                          "isSelected": false,
                          "productCount": 1
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "ProductAttributeSearchFilter",
                  "name": "Color",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "attributes": {
                    "edges": [
                      {
                        "node": {
                          "value": "Black",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Blue",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Orange",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Silver",
                          "isSelected": false,
                          "productCount": 1
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "ProductAttributeSearchFilter",
                  "name": "Size",
                  "isCollapsedByDefault": false,
                  "displayProductCount": true,
                  "attributes": {
                    "edges": [
                      {
                        "node": {
                          "value": "Large",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Medium",
                          "isSelected": false,
                          "productCount": 1
                        }
                      },
                      {
                        "node": {
                          "value": "Small",
                          "isSelected": false,
                          "productCount": 1
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "__typename": "PriceSearchFilter",
                  "name": "Price",
                  "isCollapsedByDefault": false,
                  "selected": {
                    "minPrice": null,
                    "maxPrice": null
                  }
                }
              },
              {
                "node": {
                  "__typename": "RatingSearchFilter",
                  "name": "Rating",
                  "isCollapsedByDefault": true,
                  "ratings": {
                    "edges": [
                      {
                        "node": {
                          "value": "3",
                          "isSelected": true,
                          "productCount": 2
                        }
                      },
                      {
                        "node": {
                          "value": "4",
                          "isSelected": false,
                          "productCount": 2
                        }
                      },
                      {
                        "node": {
                          "value": "5",
                          "isSelected": false,
                          "productCount": 1
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

If a merchant has not enabled product filtering, you will receive an empty array for the returned facets, though products will still be returned:

```JSON title="Response" lineNumbers
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

## Related Resources

- [Storefront GraphQL Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview)
- [Storefront GraphQL Playground](/graphql-playground)
