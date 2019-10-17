# Storing New Cards

<div class="otp" id="no-index">

### On This Page
- [How can I store a credit card?](#storing-a-card)

</div> 

---
Payments API allows developers to store a credit card while processing a credit card payment.

<a href='#storing-a-card' aria-hidden='true' class='block-anchor'  id='storing-a-card'><i aria-hidden='true' class='linkify icon'></i></a>

## How can I store a credit card?

When processing a credit payment set `save_instrument: true`. The shopper can also store credit cards during checkout. If you are using the [Checkout SDK](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk), it can store the credit card as part of the checkout.

*`POST`* `https://api.bigcommerce.com/stores/{{store_hash}}/v3/payments`

**Process payment example POST**

```json
{
  "payment": {
    "instrument": {
      "type": "card",
      "number": "4111111111111111",
      "cardholder_name": "BP",
      "expiry_month": 12,
      "expiry_year": 2020,
      "verification_value": "411"
    },
    "payment_method_id": "authorizenet.card",
		"save_instrument": true
  }
}
```