# Get Locations

The Storefront GraphQL API allows you to fetch data for your store's locations. Below are examples of Storefront GraphQL queries that allow you to fetch location data for storefront locations. 

For a general overview of the Storefront GraphQL API usage and capabilities, see [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview). See GraphQL Playground for documentation of the full schema.

Examples on this page:
- [How to get location data for stores](#how-to-get-location-data-for-stores)
- [How to filter location data](#how-to-filter-location-data)
  - [Filter by location identity](#filter-by-location-identity)
  - [Filter by location data](#filter-by-location-data)

## How to get location data for stores

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



## How to filter location data  

You can filter by the identities of locations, as well as the data for locations, so that data for only some locations will be returned. To do so, specify a filter in the argument for `locations`. 

### Filter by location identity 

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

### Filter by location data

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
