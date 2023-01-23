---
stoplight-id: c12b0d2b2ed99
---

# End-to-End User Journey API Guide

This page is a how-to guide on creating end-to-end Buy Online Pickup In-Store (BOPIS) *customized* experiences for both merchants and shoppers through BigCommerce’s APIs. This guide lays out the API calls in sequence, framed from the perspective of an end-to-end user journey.

## 1.0 Prerequisites
1. You create a new partner store and share the URL with (jordan.sim@bigcommerce) to activate BOPIS on your store (Note: this will be a non-transacting store, and should not be used to process live transactions)
2. Store settings have been configured (e.g. Payments, Shipping, Tax, Catalog, etc)
3. You are not using BigCommerce's defeault Checkout, but are using a custom checkout, i.e. 
      - You have installed a new custom checkout or you have an existing checkout built on the Checkout JS SDK or;
      - You have built a headless experience using the Server-to-Server (S2S) Checkout V3 APIs
4. OAuth scopes have been granted and configured on your store: 
      - Store Inventory
      - Store Locations
      - Pickup Methods
      - Order Fulfillment
5. Obtain [Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#store-api-accounts) containing the required [OAuth scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).


----------

## 2.0 Setup and configure as a merchant
### 2.1 Create a location

You start by first creating a location. Customers can pick up their orders from this location, i.e. a *pickup* location.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Create locations" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "code": "DTOWN_PARK_ST",
    "label": "Downtown Location - Park Lane",
    "description": "Customer-facing additional details about this location",
    "managed_by_external_source": false,
    "type_id": "PHYSICAL",
    "enabled": true,
    "operating_hours": {
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
    "time_zone": "Etc/UTC",
    "address": { 
      "email": "jane.doe@bigcommerce.com",
      "address1": "100 Park Lane",
      "address2": "",
      "city": "Austin",
      "state": "TX",
      "zip": "78726",
      "country_code": "US",
      "phone": "+15128654500",
      "geo_coordinates": {
        "longitude": -97.849560,
        "latitude": 30.404500
      } 
    },
    "storefront_visibility": true,
    "special_hours": [
      {
        "label": "Christmas Eve",
        "date": "2022-12-25",
        "open": true,
        "opening": "00:00",
        "closing": "09:00",
        "all_day": false,
        "annual": false
      }
    ]  
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Create locations" lineNumbers
{
  "transaction_id": "f2e9c9da-8f35-403c-8f9f-d0b1b3302efbv"
}
```

<!-- type: tab-end -->

### 2.2 Update details about a location

Once a location has been created, you may choose to update its details.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update locations" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "id": 2,
    "code": "DTOWN_PARKST",
    "label": "Downtown Location - Park Lane",
    "description": "Customer-facing additional details about this location.",
    "managed_by_external_source": false,
    "type_id": "PHYSICAL",
    "enabled": true,
    "operating_hours": {
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
      }
    },
    "time_zone": "Etc/UTC",
    "address": {
      "email": "jane.doe@bigcommerce.com",
      "address1": "100 Park Lane",
      "address2": "",
      "city": "Austin",
      "state": "TX",
      "zip": "78726",
      "country_code": "US",
      "phone": "+15128654500",
      "geo_coordinates": {
        "longitude": -97.849560,
        "latitude": 30.404500
      }
    },
    "storefront_visibility": true,
    "special_hours": [
      {
        "label": "Christmas Eve",
        "date": "2022-12-25",
        "open": true,
        "opening": "00:00",
        "closing": "09:00",
        "all_day": false,
        "annual": false
      }
    ]
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update locations" lineNumbers
{
  "transaction_id": "d3f9c9df-8d35-403c-8f9f-d1v1b3302efbv"
}
```

<!-- type: tab-end -->

### 2.3 Get all locations

At this point, you may have created multiple locations and want to check on all of these locations.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Get locations" lineNumbers
GET https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Get locations" lineNumbers
{
  "data": [
    {
      "id": 2,
      "code": "DTOWN_PARK_ST",
      "label": "Downtown Location - Park Lane",
      "description": "Customer-facing additional details about this location.",
      "managed_by_external_source": false, 
      "type_id": "PHYSICAL",    
      "enabled": true,
      "operating_hours": {
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
      "time_zone": "Etc/UTC",
      "created_at": "2022-01-01T00:00:00.0001",
      "updated_at": "2022-02-02T00:00:00.0001",
      "address": {
        "address1": "100 Park Lane",
        "address2": "",
        "city": "Austin",
        "state": "TX",
        "zip": "78726",
        "email": "jane.doe@bigcommerce.com",
        "phone": "+15128654500",
        "geo_coordinates": {
          "longitude": -97.849560,
          "latitude": 30.404500
        }
        "country_code": "US"
      },
      "storefront_visibility": true,
      "special_hours": [
        {
          "label": "Christmas Eve",
          "date": "2022-12-25T00:00:00.0001",
          "open": true,
          "opening": "00:00",
          "closing": "09:00",
          "all_day": false,
          "annual": false
        }
      ]
    },
    {
      "id": 3,
      "code": "UPTOWN_MAYFAIR)LANE",
      "label": "Uptown Location - Mayfair Lane",
      "description": "Customer-facing additional details about this location.",
      "managed_by_external_source": false, 
      "type_id": "PHYSICAL",    
      "enabled": true,
      "operating_hours": {
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
      "time_zone": "Etc/UTC",
      "created_at": "2022-01-01T00:00:00.0001",
      "updated_at": "2022-02-02T00:00:00.0001",
      "address": {
        "address1": "100 Park Lane",
        "address2": "",
        "city": "Austin",
        "state": "TX",
        "zip": "78726",
        "email": "jane.doe@bigcommerce.com",
        "phone": "+15128654500",
        "geo_coordinates": {
          "longitude": -120.123456,
          "latitude": 60.987654
        }
        "country_code": "US"
      },
      "storefront_visibility": true,
      "special_hours": [
        {
          "label": "Christmas Eve",
          "date": "2022-12-25",
          "open": true,
          "opening": "00:00",
          "closing": "09:00",
          "all_day": false,
          "annual": false
        }
      ]
    }
  ],
  "meta": {}
}
```
<!-- type: tab-end -->

### 2.4 Manage inventory for a location

BigCommerce’s Inventory API enables two ways of managing inventory quantities:
* **Absolute quantity** - the amount defined in the API payload is the inventory quantity that will be set for a product or variant.
* **Relative quantity** - the amount defined in the API payload will be added to (or subtracted from) the existing inventory quantity that already exists for the product or variant.

Before setting inventory quantity to a location, check the inventory tracking configurations that have been enabled. There are three inventory tracking configurations:
* **Inventory is tracked by product** - This setting is used if your product has no variations, e.g. a champagne glass or a water glass tumbler.
* **Inventory is tracked by variant** - This setting is used if your product has different attributes (variations), e.g. a shirt has various sizes and colors.
* **Inventory is not tracked** - This setting is used if you do not have a need to track inventory quantity, e.g. you may sell a digital asset (like a PDF or music). When inventory is not tracked, the product will always be considered available to sell on your storefront, even if it may not be in your physical storage location.

It’s important to know the type of tracking when making absolute or relative adjustments, as this will ultimately determine how you author your API request to set inventory quantity.

#### 2.4.1 Absolute adjustments to inventory quantity

You can make absolute adjustments for inventory tracked by product.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Absolute adjustment to inventory" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/adjustments/absolute
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "location_id": 1,
      "product_id": 111,
      "quantity": 10
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Absolute adjustment to inventory" lineNumbers
{
  "transaction_id": "6e172496-b0bb-46d5-adf5-855ba901cae7"
}
```
<!-- type: tab-end -->

You can make absolute adjustments for inventory tracked by variant.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Absolute adjustment to inventory" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/adjustments/absolute
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "location_id": 2,
      "variant_id": 78,
      "quantity": 5
    },
    {
      "location_id": 2,
      "variant_id": 79,
      "quantity": 5
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Absolute adjustment to inventory" lineNumbers
{
  "transaction_id": "b8dfdfbd-bfaa-40f4-b1b1-04d540604867"
}
```
<!-- type: tab-end -->

#### 2.4.2 Relative adjustments to inventory quantity

You can make relative adjustments for inventory tracked by product.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Relative adjustment to inventory" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/adjustments/relative
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "location_id": 2,
      "product_id": 111,
      "quantity": -2
    },
    {
      "location_id": 2,
      "product_id": 112,
      "quantity": 2
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Relative adjustment to inventory" lineNumbers
{
  "transaction_id": "6511a3d1-5392-4d10-8a0b-910d95c48d1e"
}
```
<!-- type: tab-end -->

You can make relative adjustments for inventory tracked by variant.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Relative adjustment to inventory" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/adjustments/relative
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "location_id": 2,
      "variant_id": 78,
      "quantity": -2
    },
    {
      "location_id": 2,
      "variant_id": 79,
      "quantity": 2
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Relative adjustment to inventory" lineNumbers
{
  "transaction_id": "d0e1c1ca-8f35-403c-8d9f-d9a1b3302efbv"
}
```

<!-- type: tab-end -->

### 2.5 Configure inventory settings

In addition to making absolute or relative adjustments to inventory quantities, other inventory settings can also be set, including:

- **Warning Level** - This is the same as the `inventory_warning_level` attribute in the Catalog API
- **Safety Stock** - The quantity of product that is stored to prevent an out-of-stock situation. It serves as insurance against sudden or rapid fluctuations in demand. Safety stock quantity is not included in the "available to sell" quantity that may be displayed to customers on the storefront.

You can configure inventory settings for inventory tracked by product.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update inventory settings at a location" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations/{location_id}/items
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "settings": [
    {
      "identity": {
        "product_id": 111
      },
      "safety_stock": 2,
      "warning_level": 5
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update inventory settings at a location" lineNumbers
{
  "transaction_id": "6e172496-b0bb-46d5-adf5-855ba901cae7"
}
```

<!-- type: tab-end -->

You can configure inventory settings for inventory tracked by variant.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update inventory settings at a location" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations/{location_id}/items
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "settings": [
    {
      "identity": {
        "variant_id": 78
      },
      "safety_stock": 2,
      "warning_level": 5
    },
    {
      "identity": {
        "variant_id": 79
      },
      "safety_stock": 2,
      "warning_level": 5
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update inventory settings at a location" lineNumbers
{
  "transaction_id": "6e172496-b0bb-46d5-adf5-855ba901cae7"
}
```

<!-- type: tab-end -->

### 2.6 Get inventory by location

At this point you may want to view inventory by location.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Get inventory at a location" lineNumbers
GET https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations/{location_id}/items
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Get inventory at a location" lineNumbers
{
  "data": [
    {
      "identity": {
        "sku": "SM13",
        "variant_id": 74,
        "product_id": 111
      },
      "available_to_sell": 8,
      "total_inventory_onhand": 10,
      "settings": {
        "safety_stock": 2,
        "is_in_stock": true,
        "warning_level": 5
        }
    },
    {
      "identity": {
        "sku": "SM14-SM",
        "variant_id": 78,
        "product_id": 112
      },
      "available_to_sell": 5,
      "total_inventory_onhand": 5,
      "settings": {
        "safety_stock": 0,
        "is_in_stock": true,
        "warning_level": 0
      }
    },
    {
      "identity": {
        "sku": "SM14-ME",
        "variant_id": 79,
        "product_id": 112
      },
      "available_to_sell": ,
      "total_inventory_onhand": 5,
      "settings": {
        "safety_stock": 0,
        "is_in_stock": true,
        "warning_level": 0
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### 2.7 [Optional step] Get a product's inventory across all locations

Alternatively, you may want to view inventory information for a product across all locations where that product is stocked. This can be achieved by filtering on the `product_id`, `variant_id` or `sku`.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Get inventory at locations" lineNumbers
GET https://api.bigcommerce.com/stores/{store_hash}/v3/inventory/items?variant_id=123
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Get inventory at locations" lineNumbers
{
  "data": [
    {
      "identity": {
        "product_id": 123
      },
      "locations": [
        {
          "location_id": 1,
          "location_code": "BC-LOCATION-1",
          "location_name": "Default location",
          "available_to_sell": 10,
          "total_inventory_onhand": 11,
          "location_enabled": true,
          "settings": {
            "safety_stock": 1,
            "is_in_stock": true,
            "warning_level": 1
          }
        }
      ]
    }
  ],
  "meta": {}
}
```
<!-- type: tab-end -->

### 2.8 Create a pickup method and assign it to a location

Once locations have been created, you can create pickup methods and assign them to a location. 

<!--
type: tab
title: Request
-->

```JSON title="Example request: Create pickup methods" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/pickup/methods
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "location_id": 1,
    "display_name": "In-store pickup",
    "collection_instructions": "Visit the service desk on arrival with your order number",
    "collection_time_description": "9 AM to 5 PM"
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Create pickup methods" lineNumbers
{
  "data": [
    {
      "id": 1,
      "location_id": 1,
      "display_name": "In-store pickup",
      "collection_instructions": "Visit the service desk on arrival with your order number",
      "collection_time_description": "9 AM to 5 PM"
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### 2.9 Add a second pickup method and assign it to a location

Some merchants offer multiple pickup options at a single location (e.g. in-store pickup and curbside pickup.) To achieve this, you'll create another pickup method and assign it to the same location.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Create pickup methods" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/pickup/methods
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "location_id": 1,
    "display_name": "Curb-side pickup",
    "collection_instructions": "See our staff member outside of the store",
    "collection_time_description": "Wait for a pickup confirmation and visit in business hours"
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Create pickup methods" lineNumbers
{
  "data": [
    {
      "id": 2,
      "location_id": 1,
      "display_name": "Curb-side pickup",
      "collection_instructions": "See our staff member outside of the store",
      "collection_time_description": "Wait for a pickup confirmation and visit in business hours"
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### 2.10 Update a specific detail for a pickup method

If you need to update the original pickup method details, you have the ability to do so via the Pickup Methods API. You can update the:
- `location_id`
- `display_name`
- `collection_instructions`
- `collection_time_description`

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update pickup methods" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/pickup/methods
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "id": 2,
    "collection_instructions": "See our friendly staff member outside of the store"
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update pickup methods" lineNumbers
{
  "data": [
    {
      "id": 2,
      "location_id": 1,
      "display_name": "Curb-side pickup",
      "collection_instructions": "See our friendly staff member outside of the store",
      "collection_time_description": "Wait for a pickup confirmation and visit in business hours"
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### 2.11 [Optional step] Validate the pickup methods are assigned to the location

Once you have assigned the pickup methods to the location(s), you can check what you've configured.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Get pickup methods" lineNumbers
GET https://api.bigcommerce.com/stores/{{store_hash}}/v3/pickup/methods
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Get pickup methods" lineNumbers
{
  "data": [
    {
      "id": 1,
      "location_id": 1,
      "display_name": "In-store pickup",
      "collection_instructions": "Visit the service desk on arrival with your order number",
      "collection_time_description": "9 AM to 5 PM"
    },
    {
      "id": 2,
      "location_id": 1,
      "display_name": "Curb-side pickup",
      "collection_instructions": "See our staff member outside of the store",
      "collection_time_description": "Wait for a pickup confirmation and visit in business hours"
    },
  "meta": {}
}
```
<!-- type: tab-end -->

----------

## 3.0 Browse and discover as a shopper

There are two ways to access data on the storefront:
- Storefront REST API
- Storefront GraphQL API

Over time, BigCommerce will be investing more in the Storefront GraphQL API, so all future enhancements to support BOPIS will be made against the Storefront GraphQL API.

### 3.1 Storefront REST API

#### 3.1.1 Find available pickup options with stock available 

Use this to show pickup options to customers on a storefront page (e.g. the product detail page).

<!--
type: tab
title: Request
-->

```JSON title="Example request: Find available pickup options" lineNumbers
POST https://{{youstore.example.com}}/api/storefront/pickup-options
Content-Type: application/json
Accept: application/json

{
  "searchArea": {
    "radius": {
      "value": 25,
      "unit": "MI"
    },
    "coordinates": {
      "latitude": 32.8058616,
      "longitude": -98.0105544
    }
  },
  "items": [
    {
      "variantId": 1,
      "quantity": 1
    },
    {
      "variantId": 2,
      "quantity": 2
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Find available pickup options" lineNumbers
{
  "results": [
    {
      "pickupOptions": [
        {
          "pickupMethod": {
            "id": 1,
            "locationId": 1,
            "displayName": "Office Pickup",
            "collectionInstructions": "Bring your ID",
            "collectionTimeDescription": "Collect during our opening hours of 0900 - 1700"
          },
          "availableItems": [
            {
              "variantId": 1,
              "quantity": 1
            },
            {
              "variantId": 2,
              "quantity": 2
            }
          ]
        }
      ]
    },
    {
      "pickupOptions": [
        {
          "pickupMethod": {
            "id": 2,
            "locationId": 2,
            "displayName": "Pickup method 2",
            "collectionInstructions": "Instructions",
            "collectionTimeDescription": "Desc"
          },
          "availableItems": [
            {
              "variantId": 1,
              "quantity": 1
            },
            {
              "variantId": 2,
              "quantity": 2
            }
          ]
        }
      ]
    }
  ]
}
```
<!-- type: tab-end -->

### 3.2 Storefront GraphQL API

#### 3.2.1 Get locations

For info on getting locations, see [Get Locations](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/graphql/get-locations) 

#### 3.2.2 Get inventory by location

For info on getting inventory by location, see [Get Inventory by Location](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/graphql/get-inventory-by-location)

----------

## 4.0 Manage checkout as a shopper
The Checkout SDK and Server-to-Server (S2S) Checkout APIs have been updated to support BOPIS experiences. As a developer, you may wonder which to choose and when to use the SDK vs the API. If you’re developing:
* A native storefront and custom checkout experience, use the Checkout SDK
* An end-to-end headless experience, use the S2S Checkout APIs

If you’re dependent on webhook events, all [existing Cart webhooks](https://developer.bigcommerce.com/api-docs/store-management/webhooks/webhook-events) have been updated to support BOPIS.

### 4.1 Native storefront & custom checkout experience via Checkout SDK
To support BOPIS, we would be adding a `loadPickupOptions` method to the [CheckoutService](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/classes/checkoutservice.md) class, allowing you to load pickup options to your storefront checkout. In order to fetch pickup-options via the Checkout SDK, you will need to be on SDK version 1.224.0 or above. This applies to existing custom checkouts as well as new custom checkouts. 

```JS title="Example JavaScript Code" lineNumbers
const consignmentId = '123';
const searchArea = {
  radius: {
    value: 1.4,
    unit: 'KM' // Another unit allowed here is 'MI'
  },
  coordinates: {
    latitude: 1.4,
    longitude: 0
  }
};

const query: PickupOptionRequestBody = { consignmentId, searchArea };

const state = await checkoutService.loadPickupOptions(query: PickupOptionRequestBody);

/*
* Pickup options are once fetched and then cached against the consignmentId and
* searchArea. So unless you change either of the parameters the options there won’t 
* be an API call to the server and memoized options will be returned to checkout App
*/

// To log and see pickup options
console.log(state.data.getPickupOptions(consignmentId, searchArea));
```

If you want to show pickup method options to customers on a storefront page (e.g. the Product Detail Page), before having a consignment, refer to [4.2.2 Find available pickup methods with stock available](#422-find-available-pickup-methods-with-stock-available).


### 4.2 End-to-end headless experience (S2S APIs)

#### 4.2.1 Create a cart with a product in it

<!--
type: tab
title: Request
-->

```JSON title="Example request: Create a cart" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "line_items": [
    {
      "quantity": 1,
      "product_id": 97
    }
  ]
}
``` 

<!--
type: tab
title: Response
-->

```JSON title="Example response: Create a cart" lineNumbers
{
  "data": {
    "id": "76f1bfe4-dbbe-4018-8ee6-2e3c36bf1518",
    …
    "line_items": {
      "physical_items": [
        {
          "id": "67642f07-49d1-4501-8b7d-2e589aec34b8",
          …
        }
      ],
      "digital_items": [],
      "gift_certificates": [],
      "custom_items": []
    },
    …
  },
  "meta": {}
}
```

<!-- type: tab-end -->

For a successfully-created cart, the response will have:
* The newly-created cart ID. In this example, the cart ID is `76f1bfe4-dbbe-4018-8ee6-2e3c36bf1518`.
* The physical product ID. In this example, the cart ID is `67642f07-49d1-4501-8b7d-2e589aec34b8`.

Cart ID is the same as Checkout ID and both represent the same identifier for a cart depending on which API is being consumed: the Cart API uses cart ID and the Checkout API uses Checkout ID.

#### 4.2.2 Find available pickup options with stock available 

<!--
type: tab
title: Request
-->

```JSON title="Example request: Find available pickup options" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/pickup/options
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "search_area": {
    "coordinates": {
      "latitude": 32.8058616,
      "longitude": -98.0105544
    },
    "radius": {
      "value": 25,
      "unit": "MI"
    }
  },
  "items": [
    {
      "variant_id": 1,
      "quantity": 1
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Find available pickup options" lineNumbers
{
  "results": [
    {
      "pickup_options": [
        {
          "pickup_method": {
            "id": 1,
            "location_id": 1,
            "display_name": "Office Pickup",
            "collection_instructions": "Bring your ID",
            "collection_time_description": "Collect during our opening hours of 0900 - 1700"
          },
          "available_items": [
            {
              "variant_id": 1,
              "quantity": 1
            }
          ]
        }
      ]
    }
  ]
}
```

<!-- type: tab-end -->

#### 4.2.3 Create the pickup consignment for the checkout

<!--
type: tab
title: Request
-->

```JSON title="Example request: Add consignment to checkout" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/checkouts/{{checkout_id}}/consignments
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "pickup_option": {
      "pickup_method_id": 2
    },
    "line_items": [
      {
        "item_id": "67642f07-49d1-4501-8b7d-2e589aec34b8",
        "quantity": 1
      }
    ]
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Add consignment to checkout" lineNumbers
{
  "data": {
    ...
    "consignments": [
      {
        "id": "6218019d81754",
        "shipping_cost_inc_tax": 0,
        "shipping_cost_ex_tax": 0,
        "handling_cost_inc_tax": 0,
        "handling_cost_ex_tax": 0,
        "coupon_discounts": [],
        "discounts": [],
        "line_item_ids": [
          "67642f07-49d1-4501-8b7d-2e589aec34b8"
        ],
        "selected_pickup_option": {
          "pickup_method_id": 2
        }
        ...
      }
    ]
    ...
  }
} 
```

<!-- type: tab-end -->

From the response we can see the consignment object now has a `selected_pickup_option` set with the `pickup_method_id` we requested.

Currently BOPIS only supports 1 consignment of type Pickup. If you attempt to mix pickup and shipping consignments or create multiple pickup consignments, you will receive an error message.

```JSON title="Example error response" lineNumbers
{
  "status": 422,
  "title": "Pickup method is limited to 1 consignment.",
  "type": "https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes"
}
```

If you have a change of mind, and you want to change it from pickup to be shipped, then you will need to update the consignment.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update checkout consignment" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/checkouts/{{checkout_id}}/consignments/{{consignment_id}}?include=consignments.available_shipping_options
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "shipping_address": {
    "first_name": "abc1",
    "last_name": "abc1",
    "company": "a",
    "email": "abc1@bigcommerce.com",
    "phone": "0410123456",
    "address1": "2808 Skyway Cir",
    "address2": "",
    "city": "Austin",
    "country_code": "US",
    "state_or_province": "",
    "state_or_province_code": "TX",
    "postal_code": "78704",
    "custom_fields": []
  },
  "line_items": [
    {
      "item_id": "67642f07-49d1-4501-8b7d-2e589aec34b8",
      "quantity": 1
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update checkout consignment" lineNumbers
{
  "data": {
    ...
    "consignments": [
      {
        "id": "6218019d81754",
        "shipping_cost_inc_tax": 0,
        "shipping_cost_ex_tax": 0,
        "handling_cost_inc_tax": 0,
        "handling_cost_ex_tax": 0,
        "coupon_discounts": [],
        "discounts": [],
        "line_item_ids": [
          "67642f07-49d1-4501-8b7d-2e589aec34b8"
        ],
        "shipping_address": {
          "first_name": "abc1",
          "last_name": "abc1",
          "email": "abc1@bigcommerce.com",
          "company": "a",
          "address1": "2808 Skyway Cir",
          "address2": "",
          "city": "Austin",
          "state_or_province": "Texas",
          "state_or_province_code": "TX",
          "country": "United States",
          "country_code": "US",
          "postal_code": "78704",
          "phone": "0410123456",
          "custom_fields": []
        },
        "available_shipping_options": [
          {
            "id": "4dcbf24f457dd67d5f89bcf374e0bc9b",
            "type": "freeshipping",
            "description": "Free Shipping",
            "image_url": "",
            "cost": 0,
            "transit_time": "",
            "additional_description": ""
          }
        ]
      }
    ]
    ...
  }
}
```

<!-- type: tab-end -->

The `available_shipping_options` is returned if we add the `include=consignments.available_shipping_options` to the request.

This allows us to select a shipping option as described in the next request:

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update checkout consignment" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/checkouts/{{checkout_id}}/consignments/{{consignment_id}}
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "shipping_option_id" : "4dcbf24f457dd67d5f89bcf374e0bc9b"
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update checkout consignment" lineNumbers
{
  "data": {
    ...
    "consignments": [
      {
        "id": "6218019d81754",
        "shipping_cost_inc_tax": 0,
        "shipping_cost_ex_tax": 0,
        "handling_cost_inc_tax": 0,
        "handling_cost_ex_tax": 0,
        "coupon_discounts": [],
        "discounts": [],
        "line_item_ids": [
          "67642f07-49d1-4501-8b7d-2e589aec34b8"
        ],
        "selected_shipping_option": {
          "id": "4dcbf24f457dd67d5f89bcf374e0bc9b",
          "type": "freeshipping",
          "description": "Free Shipping",
          "image_url": "",
          "cost": 0,
          "transit_time": "",
          "additional_description": ""
        },
        "shipping_address": {
          "first_name": "Jane",
          "last_name": "Doe",
          "email": "jane.doe@bigcommerce.com",
          "company": "Acme Inc",
          "address1": "2808 Skyway Cir",
          "address2": "",
          "city": "Austin",
          "state_or_province": "Texas",
          "state_or_province_code": "TX",
          "country": "United States",
          "country_code": "US",
          "postal_code": "78704",
          "phone": "0410123456",
          "custom_fields": []
        }
      }
    ]
    ...
  }
}
```

<!-- type: tab-end -->

We can see in the response above the `selected_shipping_option` contains the shipping method selected, and there isn’t any pickup object anymore.

#### 4.2.4 Update pickup consignment in the cart/checkout
If you want to update the consignment from shipping to pickup or select another pickup method you can edit the consignment and send a new pickup method ID, retrieved from the api call to the pickup endpoint earlier.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update checkout consignment" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/checkouts/{{checkout_id}}/consignments/{{consignment_id}}
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "pickup_option": {
    "pickup_method_id": 1
  },
  "line_items": [
    {
      "item_id": "67642f07-49d1-4501-8b7d-2e589aec34b8",
      "quantity": 1
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update checkout consignment" lineNumbers
{
  "data": {
    ...
    "consignments": [
      {
        "id": "6218019d81754",
        "shipping_cost_inc_tax": 0,
        "shipping_cost_ex_tax": 0,
        "handling_cost_inc_tax": 0,
        "handling_cost_ex_tax": 0,
        "coupon_discounts": [],
        "discounts": [],
        "line_item_ids": [
          "67642f07-49d1-4501-8b7d-2e589aec34b8"
        ],
        "selected_pickup_option": {
          "pickup_method_id": 1
        }...
      }
    ]
    ...
  }
}
```

<!-- type: tab-end -->

#### 4.2.5 Finalize order creation (i.e. complete checkout via API)

<!--
type: tab
title: Request
-->

```JSON title="Example request: Finalize an order" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/checkouts/{{checkout_id}}/orders
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Finalize an order" lineNumbers
{
  "data": {
    "id": 126
  },
  "meta": {}
}
```

<!-- type: tab-end -->

Order ID is 126.

## 5.0 Manage order as a merchant
### 5.1 View the newly-created order’s pickup consignment

<!--
type: tab
title: Request
-->

```JSON title="Example request: Get consignments" lineNumbers
GET https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders/{{order_id}}/consignments
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Get consignments" lineNumbers
{
  "pickups": [
    {
      "id": 13,
      "pickup_method_id": 2,
      "pickup_method_display_name": "Pickup Method 2",
      "collection_instructions": "Pickup Method 2 instructions",
      "collection_time_description": "Pickup Method 2 time",
      "location": {
        "id": 2,
        "name": "location2",
        "code": "LOCATION-2",
        "address_line_1": "2802 Skyway Cir",
        "address_line_2": "",
        "city": "Austin",
        "state": "Texas",
        "postal_code": "78704",
        "country_alpha2": "US",
        "email": "location2@example.com",
        "phone": "410123002"
      },
      "line_items": [
        {
          "url": "https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders/126/products/22",
          "resource": "/orders/126/products/22"
        }
      ]
    }
  ]
}
```

<!-- type: tab-end -->

The order's pickup consignment is 13.

### 5.2 View the newly-created order's products  

The response returns products that were assigned to a pickup consignment.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Get order products" lineNumbers
GET https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders/{{order_id}}/products
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Get order products" lineNumbers
[
  {
    "id": 22,
    "order_id": 126,
    "product_id": 97,
    "variant_id": 69,
    "order_pickup_method_id": 13,
    …
  }
]
```

<!-- type: tab-end -->

The `order_pickup_method_id` field is 13 (same value as the pickup consignment ID).

### 5.3 Update pickup consignment

If you need to update the original pickup consignment details, you have the ability to do so via the Orders API. You can update the:
* `pickup_method_id`
* `pickup_method_display_name`
* `collection_instructions`
* `collection_time_description`
* location attributes (except for the `location_id`)

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update an order" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders/{{order_id}}
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "consignments": {
    "pickups": [
      {
        "id": 13,
        "pickup_method_id": 1,
        "pickup_method_display_name": "Pickup Method 1 name - override",
        "collection_instructions": "Pickup Method 1 instructions - override",
        "collection_time_description": "Pickup Method 1 time - override",
        "location": {
          "name": "Location 1 - override",
          "code": "LOCATION-1 - override",
          "address_line_1": "123 Main Street - override",
          "address_line_2": "Suite 101 - override",
          "city": "Austin - override",
          "state": "Texas - override",
          "postal_code": "78726 - override",
          "country_alpha2": "US",
          "email": "location1_override@example.com",
          "phone": "+1 111-111-1111 - override"
        }
      }
    ]
  }
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update an order" lineNumbers
{
  "id": 126,
  ...
  "consignments": {
    "url": "https://api.bigcommerce.com/stores/cc8eopdesv/v2/orders/126/consignments",
    "resource": "/orders/126/consignments"
  }
}
```

<!-- type: tab-end -->

## 6.0 Fulfill order as a merchant

<!--
type: tab
title: Request
-->

```JSON title="Example request: Create an order" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

{
  "billing_address": {
    "state": "Washington",
    "zip": "98006",
    "country": "United States"
  },
  "consignments": {
    "pickups": [
      {
        "pickup_method_id": 1,
        "pickup_method_display_name": "Pick Up",
        "collection_instructions": "Bring your ID",
        "collection_time_description": "9am - 6pm",
        "location": {
          "name": "Location 1",
          "code": "LOCATION-1",
          "address_line_1": "123 Main Street",
          "address_line_2": "Suite 101",
          "city": "Austin",
          "state": "Texas",
          "postal_code": "78726",
          "country_alpha2": "US",
          "email": "location1@example.com",
          "phone": "+1 111-111-1111"
        },
        "line_items": [
          {
            "name": "Fog Linen Chambray Towel - Beige Stripe",
            "quantity": 3,
            "price_ex_tax": 0,
            "price_inc_tax": 0
          }
        ]
      }
    ]
  }
}
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Create an order" lineNumbers
{
  "id": 1234000049,
  ...
  "billing_address": {
    "first_name": "",
    "last_name": "",
    "company": "",
    "street_1": "",
    "street_2": "",
    "city": "",
    "state": "Washington",
    "zip": "98006",
    "country": "United States",
    "country_iso2": "US",
    "phone": "",
    "email": "",
    "form_fields": []
  },
  "consignments": {
    "url": "https://api.bigcommerce.com/stores/o8ertuc7vw/v2/orders/1234000049/consignments",
    "resource": "/orders/1234000049/consignments"
  },
  ...
}
```

<!-- type: tab-end -->

## 7.0 Terminate configuration as a merchant

### 7.1 Reassign inventory from one location to another
No dedicated endpoint exists to reassign inventory from one location to another. The existing inventory API endpoints can be used to achieve this outcome.

### 7.2 Location

#### 7.2.1 Disable a location

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update locations" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "id": 2,
    "enabled": false
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update locations" lineNumbers
{
  "transaction_id": "e81ada43-fc10-41a0-9a61-b25d8223a71c"
}
```

<!-- type: tab-end -->

#### 7.2.2 Disable a location’s storefront visibility

Storefront visibility is currently a shopper-facing property of a location. 
If it is set to false, then details about the location (e.g. description, operating hours) on the location details page and inventory quantities at that location will be excluded from the "available to sell" quantity on the storefront.
If it is set to true, then details about the location on the location details page and inventory quantities at that location will be included in the "available to sell" quantity on the storefront.

<!--
type: tab
title: Request
-->

```JSON title="Example request: Update locations" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v3/inventory/locations
X-Auth-Token: {{access_token}}
Content-Type: application/json
Accept: application/json

[
  {
    "id": 2,
    "storefront_visibility": false
  }
]
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Update locations" lineNumbers
{
  "transaction_id": "e81ada43-fc10-41a0-9a61-b25d8223a71c"
}
```

<!-- type: tab-end -->

### 7.3 Delete a pickup method

<!--
type: tab
title: Request
-->

```JSON title="Example request: Delete pickup methods" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{store_hash}}/v3/pickup/methods?id:in=1,2
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example response: Delete pickup methods" lineNumbers
No Content
```

<!-- type: tab-end -->
