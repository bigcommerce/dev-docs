# Tax Settings

Tax settings allow you to choose how a store handles tax calculations and price display. For example, you can set how a store handles taxes if an enabled tax service is unavailable. You can also choose whether prices include taxes when displayed on storefront orders. For more info, see [Tax Settings](https://support.bigcommerce.com/s/article/Tax-Overview?language=en_US#tax-settings).

This guide shows you how to use the Tax Settings API. For more info, see the [Tax Settings API Reference](/...). 

## Get tax settings

To get tax settings, send a request to the [Get tax settings](/...) endpoint

<!--
type: tab
title: Request
-->

```http title="Example request: Get tax settings" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/settings
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get tax settings" lineNumbers 
{
  "data": {
    "tax_entered_with_prices": true,
    "price_display_settings": {
      "show_inclusive_in_control_panel": true,
      "invoice_price_display_strategy": "ZONE"
    },
    "fallback_strategy": "DISABLE"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

## Update tax settings

To update tax settings, send a request to the [Update tax settings](/...) endpoint. The request updates only fields that you specify.

<!--
type: tab
title: Request
-->

```json title="Example request: Update tax settings" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/settings
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "tax_entered_with_prices": false,
  "price_display_settings": {
    "invoice_price_display_strategy": "INCLUSIVE"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update tax settings" lineNumbers 
{
  "data": {
    "tax_entered_with_prices": false,
    "price_display_settings": {
      "show_inclusive_in_control_panel": true,
      "invoice_price_display_strategy": "INCLUSIVE"
    },
    "fallback_strategy": "DISABLE"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

## Resources

- [Tax Settings API Reference](/...)

### Tax Settings reference

- [Get Tax Settings](/...)
- [Update Tax Settings](/...)