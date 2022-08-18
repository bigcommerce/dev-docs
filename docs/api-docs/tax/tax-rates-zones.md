# Tax Rates and Tax Zones

## Tax Rates

### Create Tax Rates

<!--
type: tab
title: Request
-->

```json title="Example request: Create tax rates" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


```

<!--
type: tab
title: Response
-->

```json title="Example response: Create tax rates" lineNumbers
```

<!-- type: tab-end -->

### Update Tax Rates

<!--
type: tab
title: Request
-->

```json title="Example request: Update tax rates" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

<!--
type: tab
title: Response
-->

```json title="Example response: Update tax rates" lineNumbers
```

<!-- type: tab-end -->

### Get Tax Rates

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax rates" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

<!--
type: tab
title: Response
-->

```json title="Example response: Get tax rates" lineNumbers
```

<!-- type: tab-end -->

### Delete Tax Rates

<!--
type: tab
title: Request
-->

```http title="Example request: Delete tax rates" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/rates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```http title="Example response: Delete tax rates" lineNumbers
```

<!-- type: tab-end -->

## Tax Zones

### Create Tax Zones

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
    "id": 0,
    "name": "string",
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
```

<!-- type: tab-end -->

### Update Tax Zones

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
    "id": 0,
    "name": "string",
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

```json title="Example response: Update tax zones" lineNumbers
```

<!-- type: tab-end -->

### Get Tax Zones

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax zones" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/zones?id:in=2,5
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get tax zones" lineNumbers
```

<!-- type: tab-end -->

### Delete Tax Zones

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
204 No Content
```

<!-- type: tab-end -->

## Resources

- [Tax Rates and Zones API Reference](/...)

### Tax Rates reference
- [Create tax rates](/...)
- [Get tax rates](/...)
- [Update tax rates](/...)
- [Delete tax rates](/...)

### Tax Zones reference
- [Create tax zones](/...)
- [Get tax zones](/...)
- [Update tax zones](/...)
- [Delete tax zones](/...)