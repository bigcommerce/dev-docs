# Storefront GraphQL API

Inventory and location information can be queried using the GraphQL Storefront API. The information exposed to the storefront is controlled by the [inventory settings](#inventory-settings) and [location settings](#location-settings) for the store.  Additionally the token used to generate requests via the Storefront API must include scopes for 'Products' and 'Information & Settings'.

Specific information that can be queried through this API:
* Total inventory for a given variant that is available for shoppers (aggregate inventory)   
	* Your API token must have the read-only or modify scope for 'Products'
* Inventory available at a specified location for a given variant
	* Your API token must have the read-only or modify scope for 'Products' 
* Store locations
	* Your API token must have the read-only or modify scope for 'Information & Settings'
	* Storefront details for a location that can be queried include general store information, location address, contact details, and storefront display information.

## Inventory Settings

Inventory levels may return null depending on what has been configured on the Advanced Settings > Inventory page within the Control Panel.

For product inventory levels:
- If out-of-stock products are completely hidden from the storefront, a product will not be returned. 
- If a merchant chooses not to display stock levels for products, then you will receive `null` for all product inventory levels. 
- If a merchant chooses to only display stock levels for products that are low in stock, then inventory levels for products that aren't low in stock (or out of stock) will return `null`.

A store's inventory settings also affect inventory levels for variants.

To see examples of these responses, see [Get Inventory by Location](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/graphql/get-inventory-by-location).  

## Location Settings 

The visibility of locations will depend on location settings that can be managed via API or CP. Specifically, a merchant must enable a location for product and variant stocks to be included in aggregate stocks. A location must also be enabled if you want to fetch storefront details.


## Get Locations

The Storefront GraphQL API allows you to fetch data for your store's locations. Below are examples of Storefront GraphQL queries that allow you to fetch location data for storefront locations. 

For a general overview of the Storefront GraphQL API usage and capabilities, see [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview). See GraphQL Playground for documentation of the full schema.

Examples on this page:
- [How to get location data for stores](#how-to-get-location-data-for-stores)
- [How to filter location data](#how-to-filter-location-data)
  - [Filter by location identity](#filter-by-location-identity)
  - [Filter by location data](#filter-by-location-data)

### How to get location data for stores

You can retrieve location data for store locations that a merchant has enabled. Here is an example query that returns location data, for example, address and operating hours on the specified days.    

<!--
type: tab
title: GQL Request
-->

```GraphQL title="Example" lineNumbers
query {
  inventory {
    locations {
      edges {
        node {
          entityId
          code
          label
          description
          typeId
          timeZone
          address {
            city
            address1
            address2
            postalCode
            stateOrProvince
            email
            phone
            latitude
            longitude
            countryCode
          }
          operatingHours {
            sunday {
              open
              opening
              closing
            }
            monday {
              open
              opening
              closing
            }
            tuesday {
              open
              opening
              closing
            }
            wednesday {
              open
              opening
              closing
            }
            thursday {
              open
              opening
              closing
            }
            friday {
              open
              opening
              closing
            }
            saturday {
              open
              opening
              closing
            }
          }
          specialHours {
            label
            open
            opening
            closing
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
    "inventory": {
      "locations": {
        "edges": [
          {
            "node": {
              "entityId": 1,
              "code": "BC-LOCATION-1",
              "label": "Default location",
              "description": "",
              "typeId": "PHYSICAL",
              "timeZone": "Etc/UTC",
              "address": {
                "city": "Austin",
                "address1": "103 Example Drive",
                "address2": "",
                "postalCode": "78726",
                "stateOrProvince": "TX",
                "email": "person@person.com",
                "phone": "",
                "latitude": 37.7749,
                "longitude": 122.4194,
                "countryCode": "US"
              },
              "operatingHours": {
                "sunday": {
                  "open": true,
                  "opening": "09:30",
                  "closing": "20:00"
                },
                "monday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "tuesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "wednesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "thursday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "friday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "saturday": {
                  "open": false,
                  "opening": "00:00",
                  "closing": "00:00"
                }
              },
              "specialHours": []
            }
          },
          {
            "node": {
              "entityId": 2,
              "code": "BC-LOCATION-2",
              "label": "ExampleLocation",
              "description": "Open only on weekdays",
              "typeId": "PHYSICAL",
              "timeZone": "Etc/UTC",
              "address": {
                "city": "San Francisco",
                "address1": "123 Example St",
                "address2": "",
                "postalCode": "94105",
                "stateOrProvince": "CA",
                "email": "email@example.com",
                "phone": "",
                "latitude": 37.7877,
                "longitude": 122.4026,
                "countryCode": "US"
              },
              "operatingHours": {
                "sunday": {
                  "open": false,
                  "opening": "00:00",
                  "closing": "00:00"
                },
                "monday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "tuesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "wednesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "thursday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "friday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "saturday": {
                  "open": false,
                  "opening": "00:00",
                  "closing": "00:00"
                }
              },
              "specialHours": []
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

Only data from locations that a merchant has enabled will be returned.
A merchant must also choose to display a location's details on the storefront in order for that location's storefront details to be returned. 

Locations are identified by a unique ID (`entityId`) and code (`code`). The location's type ID (`typeId`) is the location type, either PHYSICAL or VIRTUAL. The location's code and type can be customized using [Locations API](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-reference/locations). 

The location identities and data that are returned from the response can be used to filter the data returned for certain locations. See [How to Filter Location Data](#how-to-filter-location-data).
 
When you query for metafields, only metafields with storefront access permissions will be returned. In other words, a metafield's `permission_set` field must be `write_and_sf_access` or `read_and_sf_access` when you create or update a metafield. The following example includes the metafields along with the location data that are returned. As shown, the `namespace` of the metafield you wish to query must be specified: 

<!--
type: tab
title: GQL Request
-->

```GraphQL title="Example" lineNumbers
query {
  inventory {
    locations {
      edges {
        node {
          metafields(namespace: "examplespace") {
            edges {
              node {
                entityId
                key
                value
              }
            }
          }
          entityId
          code
          label
          description
          typeId
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

```JSON title="Example" lineNumbers
{
  "data": {
    "inventory": {
      "locations": {
        "edges": [
          {
            "node": {
              "metafields": {
                "edges": []
              },
              "entityId": 1,
              "code": "BC-LOCATION-1",
              "label": "Default location",
              "description": "",
              "typeId": "PHYSICAL"
            }
          },
          {
            "node": {
              "metafields": {
                "edges": [
                  {
                    "node": {
                      "entityId": 2,
                      "key": "example key",
                      "value": "new location"
                    }
                  }
                ]
              },
              "entityId": 2,
              "code": "BC-LOCATION-2",
              "label": "ExampleLocation",
              "description": "Open only on weekdays",
              "typeId": "PHYSICAL"
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
> A location's descriptions can be added via the [Create locations](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-reference/locations/operations/create-a-store-v-3-inventory-location) endpoint in the Locations API. 
> A location's metafields can be added using [Create a metafield](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-reference/locations/operations/create-a-store-v-3-inventory-location-metafield) endpoint in the Locations API. 



### How to filter location data  

You can filter by the identities of locations, as well as the data for locations, so that data for only some locations will be returned. To do so, specify a filter in the argument for `locations`. 

#### Filter by location identity

You can filter by the entityIds, codes, and typeIds of the locations you wish to return: 

```GraphQL title="Filters for Location Identity" lineNumbers
...
locations(
      entityIds: [1, 2, 3]
      codes: ["BC-LOCATION-2", "BC-LOCATION-1", "BC-LOCATION-3"]
      typeIds: ["PHYSICAL", "VIRTUAL"]
      )
...    
```

Here is an example query that returns the locations that have a specific entityId, code, and typeId:

<!--
type: tab
title: GQL Request
-->

```GraphQL title="Example" lineNumbers
query {
  inventory {
    locations (
      entityIds: [2]
      codes: ["BC-LOCATION-2"]
      typeIds: ["PHYSICAL"]
    ) {
      edges {
        node {
          entityId
          code
          label
          description
          typeId
          distance {
            value
            lengthUnit
          }
          timeZone
          address {
            city
            address1
            address2
            postalCode
            stateOrProvince
            email
            phone
            latitude
            longitude
            countryCode
          }
          operatingHours {
            sunday {
              open
              opening
              closing
            }
            monday {
              open
              opening
              closing
            }
            tuesday {
              open
              opening
              closing
            }
            wednesday {
              open
              opening
              closing
            }
            thursday {
              open
              opening
              closing
            }
            friday {
              open
              opening
              closing
            }
            saturday {
              open
              opening
              closing
            }
          }
          specialHours {
            label
            open
            opening
            closing
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

```JSON title="Example" lineNumbers
{
  "data": {
    "inventory": {
      "locations": {
        "edges": [
          {
            "node": {
              "entityId": 2,
              "code": "BC-LOCATION-2",
              "label": "ExampleLocation",
              "description": "Open only on weekdays",
              "typeId": "PHYSICAL",
              "distance": null,
              "timeZone": "Etc/UTC",
              "address": {
                "city": "San Francisco",
                "address1": "123 Example St",
                "address2": "",
                "postalCode": "94105",
                "stateOrProvince": "CA",
                "email": "email@example.com",
                "phone": "",
                "latitude": 37.7877,
                "longitude": 122.4026,
                "countryCode": "US"
              },
              "operatingHours": {
                "sunday": {
                  "open": false,
                  "opening": "00:00",
                  "closing": "00:00"
                },
                "monday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "tuesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "wednesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "thursday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "friday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "saturday": {
                  "open": false,
                  "opening": "00:00",
                  "closing": "00:00"
                }
              },
              "specialHours": []
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

#### Filter by location data

You can also filter for locations by their data. For example, you can filter by location country, state, and city. You can also filter for locations that are within a specified distance from a shopper, specified by latitude and longitude coordinates. 

```GraphQL title="Filters for Location Data" lineNumbers
...
locations(
      countryCodes: [US, AU]
      states: ["TX", "CA"]
      cities: ["Austin", "San Francisco"]
      distanceFilter: {
        radius: 1.0
        longitude: 122.4194
        latitude: 37.7749
        lengthUnit: Kilometres
      }
  )
...    
```
<!-- theme: info -->
> #### Note
> When filtering by country, use the country's two-letter code. For states, use the state abbreviation.
> When filtering by distance, specify distance in terms of `Kilometres` or `Miles`.

This example query returns the stores that are in the specified country, state, and city, and that are within one kilometer from the specified latitude and longitude:

<!--
type: tab
title: GQL Request
-->

```GraphQL title="Example" lineNumbers
query {
  inventory {
    locations (
      countryCodes: [US]
      states: ["TX"]
      cities: ["Austin"]
      distanceFilter: {
        radius: 1.0
        longitude: 122.4194
        latitude: 37.7749
        lengthUnit: Kilometres
      }
    ) {
      edges {
        node {
          entityId
          code
          label
          description
          typeId
          distance {
            value
            lengthUnit
          }
          timeZone
          address {
            city
            address1
            address2
            postalCode
            stateOrProvince
            email
            phone
            latitude
            longitude
            countryCode
          }
          operatingHours {
            sunday {
              open
              opening
              closing
            }
            monday {
              open
              opening
              closing
            }
            tuesday {
              open
              opening
              closing
            }
            wednesday {
              open
              opening
              closing
            }
            thursday {
              open
              opening
              closing
            }
            friday {
              open
              opening
              closing
            }
            saturday {
              open
              opening
              closing
            }
          }
          specialHours {
            label
            open
            opening
            closing
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
    "inventory": {
      "locations": {
        "edges": [
          {
            "node": {
              "entityId": 1,
              "code": "BC-LOCATION-1",
              "label": "Default location",
              "description": "",
              "typeId": "PHYSICAL",
              "distance": {
                "value": 0,
                "lengthUnit": "Kilometres"
              },
              "timeZone": "Etc/UTC",
              "address": {
                "city": "Austin",
                "address1": "103 Example Drive",
                "address2": "",
                "postalCode": "78726",
                "stateOrProvince": "TX",
                "email": "person@person.com",
                "phone": "",
                "latitude": 37.7749,
                "longitude": 122.4194,
                "countryCode": "US"
              },
              "operatingHours": {
                "sunday": {
                  "open": true,
                  "opening": "09:30",
                  "closing": "20:00"
                },
                "monday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "tuesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "wednesday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "thursday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "friday": {
                  "open": true,
                  "opening": "09:00",
                  "closing": "17:00"
                },
                "saturday": {
                  "open": false,
                  "opening": "00:00",
                  "closing": "00:00"
                }
              },
              "specialHours": []
            }
          }
        ]
      }
    }
  }
}
```

<!-- type: tab-end -->

The distance from the queried latitude and longitude is returned in the response. In this example, one store location was returned, in which the store was located 0 km from the queried latitude and longitude. 

## Get Inventory by Location

The Storefront GraphQL API allows you to fetch inventory for products, as well as variants in your store locations. You can fetch inventory at the product level that is aggregated for all locations. You can fetch inventory at the variant level that is aggregated for all locations, as well as for each location. In addition, you can filter by product or variant. Below are examples of Storefront GraphQL queries that allow you to fetch inventory for storefront locations. 

For a general overview of the Storefront GraphQL API usage and capabilities, see [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview).

Examples on this page:
- [Fetch inventory for products](#fetch-inventory-at-product-level-aggregated-locations)
- [Fetch inventory for variants: aggregated locations](#fetch-inventory-at-variant-level-aggregated-locations)
- [Fetch inventory for variants: each location](#fetch-inventory-at-variant-level-each-location)

### Fetch inventory at product-level: aggregated locations

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

#### How inventory settings affect product inventories returned

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

### Fetch inventory at variant-level: aggregated locations

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

### Fetch inventory at variant-level: each location

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


#### How inventory settings affect variant inventories returned 

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


## Resources
* [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)
* [GraphQL Playground](https://developer.bigcommerce.com/graphql-playground)
* [GraphQL Explorer](https://developer.bigcommerce.com/graphql-explorer)
