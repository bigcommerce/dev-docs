# Get Inventory by Location

The Storefront GraphQL API allows you to fetch inventory for products, as well as variants in your store locations. You can fetch inventory at the product level that is aggregated for all locations. You can fetch inventory at the variant level that is aggregated for all locations, as well as for each location. In addition, you can filter by product or variant. Below are examples of Storefront GraphQL queries that allow you to fetch inventory for storefront locations. 

For a general overview of the Storefront GraphQL API usage and capabilities, see [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview).

Examples on this page:
- [Fetch inventory for products](#fetch-inventory-at-product-level-aggregated-locations)
- [Fetch inventory for variants: aggregated locations](#fetch-inventory-at-variant-level-aggregated-locations)
- [Fetch inventory for variants: each location](#fetch-inventory-at-variant-level-each-location)

## Fetch inventory at product-level: aggregated locations

This query returns the inventory level for each product. The inventory for each product is the sum of the inventory from all locations (aggregated). 

<!--
type: tab
title: GQL Query
-->

```GraphQL title="Example" lineNumbers
query {
  site {
    products {
      edges {
        node {
          entityId
          name
          inventory {
            aggregated {
              availableToSell
              warningLevel
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
title: JSON Response
-->

```JSON title="Example" lineItems
{
  "data": {
    "site": {
      "products": {
        "edges": [
          {
            "node": {
              "entityId": 113,
              "name": "Example Product 1",
              "inventory": {
                "aggregated": {
                  "availableToSell": 20,
                  "warningLevel": 5
                }
              }
            }
          },
          {
            "node": {
              "entityId": 115,
              "name": "Example Product 2",
              "inventory": {
                "aggregated": {
                  "availableToSell": 0,
                  "warningLevel": 0
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

In the example response, Example Product 1 has an aggregated inventory of 11. 

<!-- theme: info -->
> #### Note
> You can filter by product so that only the inventory for certain products will be returned. To do so, use the entity IDs of the products you wish to return. 
> For example, in the example response, Example Product 1 has an entityId of 113. You can make a new request that filters for this product by using entityId 113. See GraphQL Playground for documentation.

### How inventory settings affect product inventories returned

The products returned depend on a store's inventory settings for out-of-stock products. If a merchant decides to hide out-of-stock products completely, out-of-stock products will not be returned. In the following example, Example Product 2s are out-of-stock and therefore, only (in-stock) Example Product 1 is returned:


```JSON title="Example JSON Response" lineItems
{
  "data": {
    "site": {
      "products": {
        "edges": [
          {
            "node": {
              "entityId": 113,
              "name": "Example Product 1",
              "inventory": {
                "aggregated": {
                  "availableToSell": 20,
                  "warningLevel": 5
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

The inventory levels for products depend on a stores's inventory settings for displaying stock levels. If a merchant decides to not show stock levels, inventory levels will return `null` as shown here: 

```JSON title="Example JSON Response" lineItems
{
  "data": {
    "site": {
      "products": {
        "edges": [
          {
            "node": {
              "entityId": 113,
              "name": "Example Product 1",
              "inventory": {
                "aggregated": null
              }
            }
          },
          {
            "node": {
              "entityId": 115,
              "name": "Example Product 2",
              "inventory": {
                "aggregated": null
              }
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

Similarly, if a merchant decides to only show stock levels for a product when stock is low, inventory levels for products that aren't low or aren't out of stock will return `null`. In the following example, Example Product 1 returns `null` because it is not low or out of stock: 

```JSON title="Example JSON Response" lineItems
{
  "data": {
    "site": {
      "products": {
        "edges": [
          {
            "node": {
              "entityId": 113,
              "name": "Example Product 1",
              "inventory": {
                "aggregated": null
              }
            }
          },
          {
            "node": {
              "entityId": 115,
              "name": "Example Product 2",
              "inventory": {
                "aggregated": {
                  "availableToSell": 0,
                  "warningLevel": 0
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

## Fetch inventory at variant-level: aggregated locations

This query returns the inventory level for each variant. The inventory for each variant is the sum of the inventory from all locations (aggregated). In this example, the query returns data for only one product by specifying the product's entityId.

<!--
type: tab
title: GQL Query
-->

```GraphQL title="Example" lineNumbers
query {
  site {
    products (entityIds:[113]) {
      edges {
        node {
          entityId
          name
          variants {
            edges {
              node {
                entityId
                sku
                inventory {
                  aggregated {
                    availableToSell
                    warningLevel
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
title: JSON Response
-->

```JSON title="Example" lineItems
{
    "data": {
      "site": {
        "products": {
          "edges": [
            {
              "node": {
                "entityId": 113,
                "name": "Example Product 1",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "entityId": 95,
                        "sku": "ABC-1111-PI",
                        "inventory": {
                          "aggregated": {
                            "availableToSell": 11,
                            "warningLevel": 20
                          }
                        }
                      }
                    },
                    {
                      "node": {
                        "entityId": 96,
                        "sku": "ABC-1111-PU",
                        "inventory": {
                          "aggregated": {
                            "availableToSell": 0,
                            "warningLevel": 0
                          }
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
```

<!-- type: tab-end -->

## Fetch inventory at variant-level: each location

This query returns the inventory level for a specified variant. The inventory for the variant is shown for each location (not aggregated for all locations). In this example, the query returns data for only one product and only one variant by specifying the product's entityId and the variant's entityId.

<!--
type: tab
title: GQL Query
-->

```GraphQL title="Example" lineNumbers
query {
  site {
    products (entityIds:[113]) {
      edges {
        node {
          entityId
          name
          variants (entityIds:[95]) {
            edges {
              node {
                entityId
                sku
                inventory {
                  byLocation {
                    edges {
                      node {
                        locationEntityId
                        locationEntityCode
                        locationEntityTypeId
                        locationDistance {
                          value
                          lengthUnit
                        }
                        availableToSell
                        warningLevel
                        isInStock
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
title: JSON Response
-->

```JSON title="Example" lineItems
{
    "data": {
      "site": {
        "products": {
          "edges": [
            {
              "node": {
                "entityId": 113,
                "name": "Example Product 1",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "entityId": 95,
                        "sku": "ABC-1111-PI",
                        "inventory": {
                          "byLocation": {
                            "edges": [
                              {
                                "node": {
                                  "locationEntityId": 1,
                                  "locationEntityCode": "BC-LOCATION-1",
                                  "locationEntityTypeId": "PHYSICAL",
                                  "locationDistance": null,
                                  "availableToSell": 6,
                                  "warningLevel": 20,
                                  "isInStock": false
                                }
                              },
                              {
                                "node": {
                                  "locationEntityId": 2,
                                  "locationEntityCode": "BC-LOCATION-2",
                                  "locationEntityTypeId": "PHYSICAL",
                                  "locationDistance": null,
                                  "availableToSell": 5,
                                  "warningLevel": 20,
                                  "isInStock": false
                                }
                              }
                            ]
                          }
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
```

<!-- type: tab-end -->

<!-- theme: info -->
> #### Note
> As shown in the example response, locations are identified by a unique ID (`locationEntityId`) and code (`locationEntityCode`). 
> The location type ID (`locationEntityTypeId`) is the location type, either `PHYSICAL` or `VIRTUAL`. 
> The location's code and type can be customized using Locations API.


### How inventory settings affect variant inventories returned 

The following examples show how variant inventories are affected when a merchant decides to hide out-of-stock options.

If a variant has stock in at least one location, the variant inventory for all locations are shown:  

<!--
type: tab
title: GQL Query
-->

```GraphQL title="Example" lineNumbers
query {
  site {
    products (entityIds:[113]) {
      edges {
        node {
          entityId
          name
          variants (entityIds: [95]) {
            edges {
              node {
                entityId
                sku
                inventory {
                  aggregated {
                    availableToSell
                    warningLevel
                  }
                  byLocation {
                    edges {
                      node {
                        locationEntityId
                        locationEntityCode
                        locationEntityTypeId
                        locationDistance {
                          value
                          lengthUnit
                        }
                        availableToSell
                        warningLevel
                        isInStock
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
title: JSON Response
-->

```JSON title="Example" lineItems
{
    "data": {
      "site": {
        "products": {
          "edges": [
            {
              "node": {
                "entityId": 113,
                "name": "Example Product 1",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "entityId": 95,
                        "sku": "ABC-1111-PI",
                        "inventory": {
                          "aggregated": {
                            "availableToSell": 10,
                            "warningLevel": 10
                          },
                          "byLocation": {
                            "edges": [
                              {
                                "node": {
                                  "locationEntityId": 1,
                                  "locationEntityCode": "BC-LOCATION-1",
                                  "locationEntityTypeId": "PHYSICAL",
                                  "locationDistance": null,
                                  "availableToSell": 10,
                                  "warningLevel": 5,
                                  "isInStock": true
                                }
                              },
                              {
                                "node": {
                                  "locationEntityId": 2,
                                  "locationEntityCode": "BC-LOCATION-2",
                                  "locationEntityTypeId": "PHYSICAL",
                                  "locationDistance": null,
                                  "availableToSell": 0,
                                  "warningLevel": 5,
                                  "isInStock": true
                                }
                              }
                            ]
                          }
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
```
<!-- type: tab-end -->


If a variant is out of stock at all locations, the variant is not returned. In the following example, variant `entityId: 95` is out of stock at all locations, but variant `entityId: 96` has stock in at least one location. 

<!--
type: tab
title: GQL Query
-->

```GraphQL title="Example" lineNumbers
query {
  site {
    products (entityIds:[113]) {
      edges {
        node {
          entityId
          name
          variants (entityIds:[95,96]) {
            edges {
              node {
                entityId
                sku
                inventory {
                  aggregated {
                    availableToSell
                    warningLevel
                  }
                  byLocation {
                    edges {
                      node {
                        locationEntityId
                        locationEntityCode
                        locationEntityTypeId
                        locationDistance {
                          value
                          lengthUnit
                        }
                        availableToSell
                        warningLevel
                        isInStock
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
title: JSON Response
-->

```JSON title="Example" lineItems
{
  "data": {
    "site": {
      "products": {
        "edges": [
          {
            "node": {
              "entityId": 113,
              "name": "Example Product 1",
              "variants": {
                "edges": [
                  {
                    "node": {
                      "entityId": 96,
                      "sku": "ABC-1111-PU",
                      "inventory": {
                        "aggregated": {
                          "availableToSell": 10,
                          "warningLevel": 5
                        },
                        "byLocation": {
                          "edges": [
                            {
                              "node": {
                                "locationEntityId": 1,
                                "locationEntityCode": "BC-LOCATION-1",
                                "locationEntityTypeId": "PHYSICAL",
                                "locationDistance": null,
                                "availableToSell": 10,
                                "warningLevel": 5,
                                "isInStock": true
                              }
                            },
                            {
                              "node": {
                                "locationEntityId": 2,
                                "locationEntityCode": "BC-LOCATION-2",
                                "locationEntityTypeId": "PHYSICAL",
                                "locationDistance": null,
                                "availableToSell": 0,
                                "warningLevel": 0,
                                "isInStock": false
                              }
                            }
                          ]
                        }
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
```
<!-- type: tab-end -->

The following example shows the returned response if you query for variants whose inventories are zero at all locations:

<!--
type: tab
title: GQL Query
-->

```GraphQL title="Example" lineNumbers
query {
  site {
    products (entityIds:[113]) {
      edges {
        node {
          entityId
          name
          variants (entityIds:[95,96]) {
            edges {
              node {
                entityId
                sku
                inventory {
                  aggregated {
                    availableToSell
                    warningLevel
                  }
                  byLocation {
                    edges {
                      node {
                        locationEntityId
                        locationEntityCode
                        locationEntityTypeId
                        locationDistance {
                          value
                          lengthUnit
                        }
                        availableToSell
                        warningLevel
                        isInStock
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
title: JSON Response
-->

```JSON title="Example" lineItems
{
    "data": {
      "site": {
        "products": {
          "edges": [
            {
              "node": {
                "entityId": 113,
                "name": "Example Product 1",
                "variants": {
                  "edges": []
                }
              }
            }
          ]
        }
      }
    }
  }
```

<!-- type: tab-end -->