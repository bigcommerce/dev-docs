# Multi-Currency Percentage Promotions

When creating a promotion, you can configure the promotion to target all enabled transactional currencies. The promotion will run regardless of what currency the shopper selects as transactional currency within the cart and checkout.

Multi-currency promotions intentionally only support percentage-based discounts (not amount-based discounts). You will not be able to create an amount-based promotion in multiple currencies. This choice prevents discounting based on fluctuating currency rates as some currencies have broader foreign exchange rates than others (for example, a 10 USD discount is substantially different from 10 JPY).

The following is an example of a coupon promotion offered to all international customers worldwide in their local transactional currency. The WELCOME10 coupon applies a 10% discount off the order, and can be digitally distributed through social media channels (e.g., Instagram, Facebook, TikTok) or email marketing. Use the [Create a promotion](/docs/api-beta-promotions/7d0f6a12f28e0-create-promotion) endpoint followed by the [Create a coupon code](/docs/api-beta-promotions/b3A6NDQzMTY0MDM-create-a-coupon-code) endpoint.

```http title="Example request: Create a multi-currency promotion" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/promotions
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "10% off entire order",
  "currency_code": "*",
  "redemption_type": "COUPON",
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "percentage_amount": "10"
          }
        }
      }
    }
  ]
}
```
&nbsp;
```http title="Example request: Create a coupon code" lineNumbers
//use the promotion ID from the response to the preceding call
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/promotions/{{promotion_id}}/codes
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
	"code": "WELCOME10"
}
```
