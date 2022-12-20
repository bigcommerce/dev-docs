# Tax Rates and Tax Zones

[Tax rates](https://support.bigcommerce.com/s/article/Manual-Tax-Setup?language=en_US#tax-rate) are percentages a store uses to calculate taxes due for products and services. Tax zones are geographic regions defined in a store. [Tax zones](https://support.bigcommerce.com/s/article/Manual-Tax-Setup?language=en_US#tax-zone) allow you to apply different tax rates to different customer groups and locations. All the tax rates and zones you configure for a store are available on each storefront.

This guide demonstrates how to use the Tax Rates and Zones API. The Tax Rates and Zones API allows you to configure [manual taxes](https://support.bigcommerce.com/s/article/Manual-Tax-Setup?language=en_US) for a store. For more information, see the [Tax Rates and Zones API Reference](/api-reference/store-management/tax-rates-and-zones).

## Tax zones

A zone must be defined by one of the following location parameters:

- Countries: Specify one or more countries for a zone.
- Subdivisions: Specify one or more states, provinces, or territories. You can include subdivisions of more than one country in a subdivision-based zone.
- Postal codes: Specify one or more postal codes within a country. Currently, zones based on postal codes are limited to a single country.

You can further narrow the scope of a zone by specifying one or more customer groups to whom the zone applies. You can also use zones to modify how a store displays prices to different customer groups.  

<!-- theme: info -->
> #### Default tax zone
> A default tax zone covers locations that other zones don't cover. Shoppers in customer groups that don't match a tax zone fall under the default tax zone. A default tax zone does not have `shopper_target_settings` in its requests or responses. You can't specify the customer groups or locations for a default tax zone.  

### Create tax zones

To add tax zones to a store, send a request to the [Create tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/create-tax-zones) endpoint. The following example creates a subdivision-based zone.

The response provides an `id` for each tax zone. Use the `id` to get, update, or delete a specific tax zone.

<!--
type: tab
title: Request
-->

```json title="Example request: Create tax zones" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "name": "example zone",
    "enabled": true,
    "price_display_settings": {
      "show_inclusive": true,
      "show_both_on_detail_view": true,
      "show_both_on_list_view": true
    },
    "shopper_target_settings": {
      "locations": [
        {
          "country_code": "AR",
          "subdivision_codes": [
            "T",
            "V"
          ]
        },
        {
          "country_code": "AU",
          "subdivision_codes": [
            "WA",
            "VIC"
          ]
        }
      ],
      "customer_groups": [
        0
      ]
    }
  }
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Create tax zones" lineNumbers
{
  "data": [
    {
      "id": 2,
      "name": "example zone",
      "enabled": true,
      "price_display_settings": {
        "show_inclusive": true,
        "show_both_on_detail_view": true,
        "show_both_on_list_view": true
      },
      "shopper_target_settings": {
        "locations": [
          {
            "country_code": "AR",
            "subdivision_codes": [
              "T",
              "V"
            ],
            "postal_codes": []
          },
          {
            "country_code": "AU",
            "subdivision_codes": [
              "WA",
              "VIC"
            ],
            "postal_codes": []
          }
        ],
        "customer_groups": [
          0
        ]
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Update tax zones

To modify a tax zone, send a request to the [Update tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/update-tax-zones) endpoint. In the request body, specify the `id` of the zones you want to update. The request updates only the fields for which you supply values.

<!--
type: tab
title: Request
-->

```json title="Example request: Update tax zones" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "id": 2,
    "enabled": false,
    "price_display_settings": {
      "show_inclusive": false,
      "show_both_on_detail_view": false,
      "show_both_on_list_view": false
    },
    "shopper_target_settings": {
      "customer_groups": [
        2
      ]
    }
  }
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update tax zones" lineNumbers
{
  "data": [
    {
      "id": 2,
      "name": "example zone",
      "enabled": false,
      "price_display_settings": {
        "show_inclusive": false,
        "show_both_on_detail_view": false,
        "show_both_on_list_view": false
      },
      "shopper_target_settings": {
        "locations": [
          {
            "country_code": "AR",
            "subdivision_codes": [
              "T",
              "V"
            ],
            "postal_codes": []
          },
          {
            "country_code": "AU",
            "subdivision_codes": [
              "WA",
              "VIC"
            ],
            "postal_codes": []
          }
        ],
        "customer_groups": [
          2
        ]
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Get tax zones

[Get tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/get-tax-zones) returns all tax zones by default. To return select tax zones, include the `id:in` query parameter.

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax zones" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones?id:in=2
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get tax zones" lineNumbers
{
  "data": [
    {
      "id": 2,
      "name": "example zone",
      "enabled": false,
      "price_display_settings": {
        "show_inclusive": false,
        "show_both_on_detail_view": false,
        "show_both_on_list_view": false
      },
      "shopper_target_settings": {
        "locations": [
          {
            "country_code": "AR",
            "subdivision_codes": [
              "T",
              "V"
            ],
            "postal_codes": []
          },
          {
            "country_code": "AU",
            "subdivision_codes": [
              "WA",
              "VIC"
            ],
            "postal_codes": []
          }
        ],
        "customer_groups": [
          2
        ]
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Delete tax zones

To delete tax zones, send a request to the [Delete tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/delete-tax-zones) endpoint and use the `id:in` query parameter to specify the tax zones you want to delete. Deleting a tax zone cascades to removes all associated tax rates.

<!--
type: tab
title: Request
-->

```http title="Example request: Delete tax zones" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones?id:in=3,7
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```http title="Example response: Delete tax zones" lineNumbers
HTTP 204 No content
```

<!-- type: tab-end -->

## Tax rates

After creating a zone, you can add rates to the zone. You can add multiple rates to a zone to account for multiple tax jurisdictions. When adding a rate, you can add a rate for each tax class in your store. 

### Create tax rates

To create tax rates, send a request to the [Create tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/create-tax-rates) endpoint. Specify the rate name, rates of each tax class, and the associated tax zone. The `tax_zone_id` is the `id` from the [Get tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/get-tax-zones) endpoint.

The response provides an `id` for each tax rate. Use the `id` to update or delete a specific tax rate.

<!--
type: tab
title: Request
-->

```json title="Example request: Create tax rates" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "class_rates": [
      {
        "rate": 5,
        "tax_class_id": 0
      },
      {
        "rate": 5,
        "tax_class_id": 1
      }
    ],
    "enabled": true,
    "name": "Sales Tax",
    "priority": 1,
    "tax_zone_id": 2
  }
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Create tax rates" lineNumbers
{
  "data": [
    {
      "class_rates": [
        {
          "rate": 5,
          "tax_class_id": 0
        },
        {
          "rate": 5,
          "tax_class_id": 1
        }
      ],
      "enabled": true,
      "id": 3,
      "name": "Sales Tax",
      "priority": 1,
      "tax_zone_id": 2
    }
  ]
}
```

<!-- type: tab-end -->

### Update tax rates

To update tax rates, send a request to the [Update tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/update-tax-rates) endpoint. Specify the `id` of the rate you want to update in the request body. The `tax_zone_id` is the `id` from the [Get tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/get-tax-zones) endpoint.

<!--
type: tab
title: Request
-->

```json title="Example request: Update tax rates" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "class_rates": [
      {
        "rate": 10,
        "tax_class_id": 0
      }
    ],
    "enabled": false,
    "id": 3,
    "name": "Excise Tax",
    "priority": 2,
    "tax_zone_id": 4
  }
]
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update tax rates" lineNumbers
{
  "data": [
    {
      "class_rates": [
        {
          "rate": 10,
          "tax_class_id": 0
        },
        {
          "rate": 5,
          "tax_class_id": 1
        }
      ],
      "enabled": false,
      "id": 3,
      "name": "Excise Tax",
      "priority": 2,
      "tax_zone_id": 4
    }
  ]
}
```

<!-- type: tab-end -->

### Get tax rates

To get tax rates, send a request to the [Get tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/get-tax-rates) endpoint. Specify the tax zones in the `tax_zone_id:in` query parameter to get the tax rates for specific zones.   

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax rates" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates?tax_zone_id:in=2
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json

```

<!--
type: tab
title: Response
-->

```json title="Example response: Get tax rates" lineNumbers
{
  "data": [
    {
      "class_rates": [
        {
          "rate": 10,
          "tax_class_id": 0
        },
        {
          "rate": 5,
          "tax_class_id": 1
        }
      ],
      "enabled": false,
      "id": 3,
      "name": "Excise Tax",
      "priority": 2,
      "tax_zone_id": 4
    }
  ]
}
```

<!-- type: tab-end -->

### Delete tax rates

To delete tax rates, send a request to the [Delete tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/delete-tax-rates) endpoint and use the `id:in` query parameter to specify the tax rates you want to delete.

<!--
type: tab
title: Request
-->

```http title="Example request: Delete tax rates" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates?id:in=3,5
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

<!--
type: tab
title: Response
-->

```http title="Example response: Delete tax rates" lineNumbers
HTTP 204 No content
```

<!-- type: tab-end -->

## Resources

- [Tax Rates and Zones API Reference](/api-reference/store-management/tax-rates-and-zones)

### Tax Zones reference
- [Create tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/create-tax-zones)
- [Update tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/update-tax-zones)
- [Get tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/get-tax-zones)
- [Delete tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/delete-tax-zones)

### Tax Rates reference
- [Create tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/create-tax-rates)
- [Update tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/update-tax-rates)
- [Get tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/get-tax-rates)
- [Delete tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/delete-tax-rates)
