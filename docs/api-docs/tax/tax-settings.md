# Tax Settings

Tax settings allow you to choose how a store handles tax calculation and price display. For example, you can set how a store handles taxes if an enabled tax service is unavailable. You can also choose whether prices include taxes when displayed on orders and invoices. For more info, see [Tax Settings](https://support.bigcommerce.com/s/article/Tax-Overview?language=en_US#tax-settings).

This guide shows you how to use the Tax Settings API. For more info, see the [Tax Settings API Reference](/api-reference/store-management/tax-settings). 

## Get tax settings

To get tax settings, send a request to the [Get tax settings](/api-reference/store-management/tax-settings/tax-settings/get-tax-settings) endpoint.

<Tabs items=([Request, Response])>

<Tab>
```http filename="Example request: Get tax settings" showLineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/tax/settings
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```
</Tab>

<Tab>
```json filename="Example response: Get tax settings" showLineNumbers 
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
</Tab>

</Tabs>

## Update tax settings

To update tax settings, send a request to the [Update tax settings](/api-reference/store-management/tax-settings/tax-settings/update-tax-settings) endpoint. The request updates only the fields that you specify.

<Tabs items=([Request, Response])>

<Tab>
```json filename="Example request: Update tax settings" showLineNumbers
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
</Tab>

<Tab>
```json filename="Example response: Update tax settings" showLineNumbers 
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
</Tab>

</Tabs>

## Resources

- [Tax Settings API Reference](/api-reference/store-management/tax-settings)
- [Get Tax Settings](/api-reference/store-management/tax-settings/tax-settings/get-tax-settings)
- [Update Tax Settings](/api-reference/store-management/tax-settings/tax-settings/update-tax-settings)
