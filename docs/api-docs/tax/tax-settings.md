# Tax Settings

## Get tax settings

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