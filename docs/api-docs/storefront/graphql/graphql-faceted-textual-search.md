# Using Storefront GraphQL's Faceted and Textual Search

With Storefront GraphQL's Faceted and Textual Search, you can ...

This can be done using the `SearchProducts` field. 

This page walks you through how to query products and facets. See [GraphQL Playground](/graphql-playground) for full schema documentation.  

## How to Filter for Products and Facets

At least one filter must be specified in the argument for `SearchProducts`. You may filter by price, rating, among other features and attributes of products: 

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

You can sort the products that are returned using the `sort` field. Here is an example request that sorts products in alphabetical order:

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


## How to Get Facets

## Putting it all Together: Products and Facets

## Related Resources
