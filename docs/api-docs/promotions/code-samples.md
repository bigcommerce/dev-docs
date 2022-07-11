# Code Samples

The following tabs contain code samples.

<!--
type: tab
title: Brand Promotions
-->

```http title="Spend $X in brand X, get free shipping to X shipping zones"
json title="Example request" lineNumbers
{
  "name": "Order $100 of this Common Good Brand, Get Free Shipping",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "shipping": {
          "free_shipping": true,
          "zone_ids": [
            1,
            3
          ]
        }
      },
      "apply_once": true,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              37
            ]
          },
          "minimum_quantity": 1,
          "minimum_spend": 100
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "Get Free Shipping for Common Good Upsell",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "On the Cart Page, Eligible",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Applied Cart Page",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "status": "ENABLED"
}
```
