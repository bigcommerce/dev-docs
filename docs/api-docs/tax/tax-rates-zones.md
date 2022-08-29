# Tax Rates and Tax Zones

[Tax rates](https://support.bigcommerce.com/s/article/Manual-Tax-Setup?language=en_US#tax-rate) are percentages for which you tax products or services. Tax zones are geographic locations that you define in your store. [Tax zones](https://support.bigcommerce.com/s/article/Manual-Tax-Setup?language=en_US#tax-zone) allow you to vary tax rates for different customer groups and locations. Tax rates and zones apply for all storefronts on a store.

This guide shows you how to use the Tax Rates and Tax Zones API. The Tax Rates and Zones API allows you to configure [manual taxes](https://support.bigcommerce.com/s/article/Manual-Tax-Setup?language=en_US) in a store. For more info, see the [Tax Rates and Tax Zones API Reference](/api-reference/store-management/tax-rates-and-zones).

## Tax zones

A zone can occupy multiple countries, each containing multiple subdivisions and postal codes. You can specify the customer groups that fall under a zone. You can also set how a store displays prices to shoppers in customer groups that fall under a zone.  

<!-- theme:info -->
> #### Default tax zone
> A default tax zone covers locations that other zones don't cover. Shoppers in customer groups that don't match a tax zone fall under the default tax zone. A default tax zone does not have `shopper_target_settings` in its requests or responses. You can't specify the customer groups or locations for a default tax zone.  

### Create tax zones

Use the [Create tax zones endpoint](/api-reference/store-management/tax-rates-and-zones/tax-zones/create-tax-zones) to add tax zones to the store. 

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
    "name": "Australia",
    "enabled": true,
    "price_display_settings": {
      "show_inclusive": true,
      "show_both_on_detail_view": true,
      "show_both_on_list_view": true
    },
    "shopper_target_settings": {
      "customer_groups": [
        0
      ],
      "locations": [
        {
          "country_code": "AU",
          "subdivision_codes": [
            "NSW",
            "QLD"
          ],
          "postal_codes": [
            "2234",
            "2170"
          ]
        }
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
      "name": "Australia",
      "enabled": true,
      "price_display_settings": {
        "show_inclusive": true,
        "show_both_on_detail_view": true,
        "show_both_on_list_view": true
      },
      "shopper_target_settings": {
        "customer_groups": [
          0
        ],
        "locations": [
          {
            "country_code": "AU",
            "subdivision_codes": [
              "NSW",
              "QLD"
            ],
            "postal_codes": [
              "2234",
              "2170"
            ]
          }
        ]
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Update tax zones

Send a request to the [Update tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/update-tax-zones) endpoint to modify a tax zone. Specify the `id` of the zone you want to update in the request body. The request updates only the fields that you specify.

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
      "name": "Australia",
      "enabled": false,
      "price_display_settings": {
        "show_inclusive": false,
        "show_both_on_detail_view": false,
        "show_both_on_list_view": false
      },
      "shopper_target_settings": {
        "customer_groups": [
          0
        ],
        "locations": [
          {
            "country_code": "AU",
            "subdivision_codes": [
              "NSW",
              "QLD"
            ],
            "postal_codes": [
              "2234",
              "2170"
            ]
          }
        ]
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Get tax zones

[Get tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/get-tax-zones) returns all tax zones by default. To return certain tax zones, include the `id:in` query parameter.

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax zones" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones?id:in=2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
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
      "name": "Australia",
      "enabled": false,
      "price_display_settings": {
        "show_inclusive": false,
        "show_both_on_detail_view": false,
        "show_both_on_list_view": false
      },
      "shopper_target_settings": {
        "customer_groups": [
          0
        ],
        "locations": [
          {
            "country_code": "AU",
            "subdivision_codes": [
              "NSW",
              "QLD"
            ],
            "postal_codes": [
              "2234",
              "2170"
            ]
          }
        ]
      }
    }
  ],
  "meta": {}
}
```

<!-- type: tab-end -->

### Delete tax zones

To delete tax zones, send a request to the [Delete tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/delete-tax-zones) endpoint and use the `id:in` query parameter to specify the tax zones you want to delete. Deleting a tax zone removes all associated tax rates.

<!--
type: tab
title: Request
-->

```http title="Example request: Delete tax zones" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones?id:in=3,7
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
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

To create tax rates, send a request to the [Create tax rates](/api-reference/store-management/tax-rates-and-zones/tax-rates/create-tax-rates) endpoint. Specify the rate name, rates of each tax class, and tax zone in which the rates will be created. The `tax_zone_id` is the `id` from the [Get tax zones](/api-reference/store-management/tax-rates-and-zones/tax-zones/get-tax-zones) endpoint.

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
    "tax_zone_id": 2,
    "name": "Sales Tax",
    "enabled": true,
    "priority": 1,
    "class_rates": [
      {
        "rate": 5,
        "tax_class_id": 1
      }
    ]
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
      "id": 3,
      "tax_zone_id": 2,
      "name": "Sales Tax",
      "enabled": true,
      "priority": 1,
      "class_rates": [
        {
          "rate": 5,
          "tax_class_id": 1
        }
      ]
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
    "id": 3,
    "tax_zone_id": 4,
    "enabled": false,
    "priority": 2
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
      "id": 3,
      "tax_zone_id": 4,
      "name": "Sales Tax",
      "enabled": false,
      "priority": 2,
      "class_rates": [
        {
          "rate": 5,
          "tax_class_id": 1
        }
      ]
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
Content-Type: application/json
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
      "id": 3,
      "tax_zone_id": 4,
      "name": "Sales Tax",
      "enabled": false,
      "priority": 2,
      "class_rates": [
        {
          "rate": 5,
          "tax_class_id": 1
        }
      ]
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
Content-Type: application/json
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
