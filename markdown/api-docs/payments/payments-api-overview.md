<h1>Payments API</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#payments_pci-compliance">PCI Compliance</a></li>
    <li><a href="#payments_processing-payment">Processing a Payment</a></li>
    <li><a href="#payments_stored-cards">Stored Cards</a></li>
    <li><a href="#payments_credit-cards">Credit Cards</a></li>
    <li><a href="#payments_orders-api">Orders API</a></li>
    <li><a href="#payments_technical-details">Technical Details</a></li>
    <li><a href="#payments_sample-app-diagram">Sample App Diagram</a></li>
    <li><a href="#payments_error-codes">Error Codes</a></li>
    <li><a href="#payments_faq">FAQ</a></li>
	</ul>
</div>

The Payments API enables you to process payments through the store’s connected payment gateway. A payment can be taken for an order that is created using either the [Server to Server Checkout API Orders](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api) endpoint or creating an order using [V2 Orders](https://developer.bigcommerce.com/api-reference/orders/orders-api/orders/postorders) endpoint.

Payments are processed via a sequence of requests to two API hosts:
* Create the payment token:   `https://api.bigcommerce.com/stores/{store_hash}/v3/payments/access_tokens`
* Process the payment:   `https://payments.bigcommerce.com/stores/{store_hash}/payments`

### Prerequisites
**Scopes**  
The following [OAuth](/api-docs/getting-started/authentication#authentication_oauth-scopes) scopes are required:
* Create Payments
* Get Payment Methods

To follow along, we have created a Postman Collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/38daa68bda00ba9d4734)
---

<a href='#payments_pci-compliance' aria-hidden='true' class='block-anchor'  id='payments_pci-compliance'><i aria-hidden='true' class='linkify icon'></i></a>

## PCI Compliance
BigCommerce is only responsible for the security of credit card to the extent that it is directly in the route of the payment request to payment processors during a payment processing request. To ensure secure handling of payment instruments, as a third-party developer, you are responsible for developing the storefronts or recurring billing apps in a PCI compliant manner and maintaining a PCI compliance certification for third-party service providers certified by an external Qualified Security Assessor (QSA).

Merchants or shoppers personal identifiable information (PII) collected by recurring billing apps that consumes the BigCommerce Payments API must have it’s own Privacy Policy sufficient to the requirements of the European Union General Data Protection Requirements (GDPR) which must be available and displayed to the general public.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->
### PCI Compliance
> If your application handles credit card data, you will need to be PCI Compliant. SAQs (self-assessment questionnaires) can be submitted to 
<a href="mailto:compliance@bigcommerce.com">compliance@bigcommerce.com</a>.

</div>
</div>
</div>

---

<a href='#payments_processing-payment' aria-hidden='true' class='block-anchor'  id='payments_processing-payment'><i aria-hidden='true' class='linkify icon'></i></a>

## Processing a Payment

Payments can be processed using cards stored with the BigCommerce Stored Credit Cards feature or by providing a credit card number.  

**The following gateways are supported for stored cards:**

* Authorize.net
* Paypal Powered by Braintree
* CyberSource
* Stripe
* Paymetric


**The following gateways are supported for credit cards:**

* Authorize.net
* PayPal powered by Braintree
* CardConnect
* Chase Merchant Services
* Chase Integrated Payments
* Cybersource Direct
* eWAY Rapid
* First Data Payeezy Gateway
* Heartland Payment Systems
* MIGS
* MyVirtualMerchant
* NMI
* PayPal Payments Pro (Payflow Edition) UK
* PayPal Payments Pro (Payflow Edition) US
* Sage Pay/Protx VSP Direct
* QuickBooks Payments
* SecureNet
* Stripe
* Worldpay Core
* WorldPay
* USA ePay
* Paymetric

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Hosted Providers
> The API flow does not currently support hosted/offsite providers such as PayPal and Adyen and wallet type payments such as Amazon Pay.

</div>
</div>
</div>

---

<a href='#payments_stored-cards' aria-hidden='true' class='block-anchor'  id='payments_stored-cards'><i aria-hidden='true' class='linkify icon'></i></a>

### Stored Cards
There are three steps to using a stored card to make a payment.

1. [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)
2. [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
3. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)

To use stored cards with the Payments API or the Checkout SDK make sure stored cards are enabled in the stores Control Panel. To enable stored credit cards on your storefront, navigate to **Store Setup › Payments** and click the tab for your payment gateway. Toggle the switch to enable Stored Credit Cards and Save. For more on enabling stored cards, see [Enabling Stored Credit Cards](https://support.bigcommerce.com/s/article/Enabling-Stored-Credit-Cards).

**Requirements for Stored Cards**

* Your store must be on a Plus plan or higher.
* Your store needs to be using Optimized One-Page Checkout.
* Your store needs to be using a compatible payment gateway.

1. To pay with a stored card, first make a call to [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget) for the `stored_instruments > token`. The `order_id` is passed in as a query parameter.

This token is the same as `payment_instrument_token` from [Get Transactions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api).

<br>

<!--
title: "Sample Response"
subtitle: "Get Payment Methods"
lineNumbers: true
-->

**Example Response Get Payment Methods**  
`/GET https://api.bigcommerce.com/stores/{{store_hash}}/v3/payments/methods?{{order_id}}`

```json
{
  "data": [
    {
      "id": "stripe.card",
      "name": "Stripe",
      "test_mode": true,
      "type": "card",
      "supported_instruments": [
        {
          "instrument_type": "VISA",
          "verification_value_required": true
        },
        {
          "instrument_type": "MASTERCARD",
          "verification_value_required": true
        },
        {
          "instrument_type": "AMEX",
          "verification_value_required": true
        },
        {
          "instrument_type": "DISCOVER",
          "verification_value_required": true
        },
        {
          "instrument_type": "JCB",
          "verification_value_required": true
        },
        {
          "instrument_type": "DINERS_CLUB",
          "verification_value_required": true
        },
        {
          "instrument_type": "STORED_CARD",
          "verification_value_required": true
        }
      ],
      "stored_instruments": [
        {
          "type": "stored_card",
          "brand": "VISA",
          "expiry_month": 9,
          "expiry_year": 2020,
          "issuer_identification_number": "424242",
          "last_4": "4242",
          "token": "050a1e5c982e5905288ec5ec33f292772762033a070a45g434qfb16bf1940b51ef",
          "is_default": true
        }
      ]
    }
  ],
  "meta": {}
}
```

Make note of the `token` to use as part of processing the payment in the request body.

### Create Access Token
2. Make a request to [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost) to get the authorization token that needs to be passed in the header when processing the payment. The ID of the order needs to be part of the request body.

<!--
title: "Sample Request"
subtitle: "Create Payment Access Token"
lineNumbers: true
-->

**Example Request Create Payment Access Token**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/payments/access_tokens`

```json
{
  "order": {
    "id": 215
  }
}
```


<!--
title: "Sample Response"
subtitle: "Create Payment Access Token"
lineNumbers: true
-->

**Example Response Create Payment Access Token**

```json
{
  "data": {
    "id": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTEzOTQxNDIsIm5iZiI6MTU1MTM5MDU0MiwiaXNzIjoicGF5bWVudHMuYmlnY29tbWVyY2UuY29tIiwic3ViIjoianJhaDZnbW4iLCJqdGkiOiI3Nzg3ZmU1Zi01OWJmLTQ3ZWMtYTFmZC00ZDQ3ZTkwNjFlNWMiLCJpYXd4gJ8uHDk3kDhhuyefsrtr45mRhdGEiOnsic3RvcmVfaWQiOjEwMjU2NDYsIm9yZGVyX2lkIjoyMTUsImFtb3VudCI6OTgwMCwiY3VycmVuY3kiOiJVU0QifX0.WbR90d8m4gn8wK7kPMDEoVq8B0hHC5Ul5H4Hpqq6Yvo"
  },
  "meta": {}
}
```

### Process the Payment
3. To process the payment, send a POST to [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost). You will need the following information from [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget) in step one. 

**Get Payment Methods = Process Payment**
* type = type
* token = token
* last_four = verfication_value
* id = payment_method_id

The headers to process a payment are different than the headers you normally send with a BigCommerce API. The Authorization token is the ID that is returned in Get Payment Access Token (step two). 

**Headers**
* Accept: application/vnd.bc.v1+json
* Authorization: PAT {your-access-token}
* Content-Type: application/json

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### PAT
> There is a space between PAT {your-access-token}.

</div>
</div>
</div>


<!--
title: "Sample Request"
subtitle: "Process Payment"
lineNumbers: true
-->

**Example Request Process Payment**  
`/POST https://payments.bigcommerce.com/stores/{store_hash}/payments`

```curl
curl -X POST \
  https://payments.bigcommerce.com/stores/{store_hash}/payments \
  -H 'Accept: application/vnd.bc.v1+json' \
  -H 'Authorization: PAT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTEzOTQxNDIsIm5iZiI6MTU1MTM5MDU0MiwiaXNzIjoicGF5bWVudHMuYmlnY29tbWVyY2UuY29tIiwic3ViIjoianJhaDZnbW4iLCJqdGkiOiI3Nzg3ZmU1Zi01OWJmLTQ3ZWMtYTFmZC00ZDQ3ZTkwNjFlNWMiLCJpYXQiOjE1NTEzOTA1NDIsImRhdGEiOnsic3RvcmVfaWQiOjEwMjU2NDYsIm9yZGVyX2lkIjoyMTUsImFtb3VudCI6OTgwMCwiY3VycmVuY3kiOiJVU0QifX0.WbR90d8m4gn8wK7kPMDEoVq8B0hHC5Ul5H4Hpqq6Yvo' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment": {
    "instrument": {
      "type": "stored_card",
      "token": "050a1e5c982e5905288ec5ec33f292772762033a0704f46fccb16bf1940b51ef", // from Get Payment Methods
      "verification_value": "4242"
    },
    "payment_method_id": "stripe.card"
  }
}'

```

<!--
title: "Sample Response"
subtitle: "Process Payment"
lineNumbers: true
-->

**Example Response Process Payment**

```json
{
  "data": {
    "id": "693bb4cd-3f20-444a-8315-6369f582c68a",
    "status": "success",
    "transaction_type": "purchase"
  }
}
```

If the purchase was successful it will return a status of success. The order is then automatically moved to an Awaiting Fulfillment status. If you get a different response, see [Error Codes](#payments_error-codes) for troubleshooting.

---

<a href='#payments_credit-cards' aria-hidden='true' class='block-anchor'  id='payments_credit-cards'><i aria-hidden='true' class='linkify icon'></i></a>

## Credit Cards

There are two steps to using a credit card to make a payment.

1. [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
2. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)

### Create Access Token
1. Make a request to [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost) to to get the authorization token that needs to be passed in the header when processing the payment. The ID of the order needs to be part of the request body.

<!--
title: "Sample Request"
subtitle: "Create Payment Access Token"
lineNumbers: true
-->

**Example Request Create Payment Access Token**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/payments/access_tokens`

```json
{
  "order": {
    "id": 215
  }
}
```

<!--
title: "Sample Response"
subtitle: "Create Payment Access Token"
lineNumbers: true
-->

**Example Response Create Payment Access Token**

```json
{
  "data": {
    "id": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTEzOTQxNDIsIm5iZiI6MTU1MTM5MDU0MiwiaXNzIjoicGF5bWVudHMuYmlnY29tbWVyY2UuY29tIiwic3ViIjoianJhaDZnbW4iLCJqdGkiOiI3Nzg3ZmU1Zi01OWJmLTQ3ZWMtYTFmZC00ZDQ3ZTkwNjFlNWMiLCJpYXd4gJ8uHDk3kDhhuyefsrtr45mRhdGEiOnsic3RvcmVfaWQiOjEwMjU2NDYsIm9yZGVyX2lkIjoyMTUsImFtb3VudCI6OTgwMCwiY3VycmVuY3kiOiJVU0QifX0.WbR90d8m4gn8wK7kPMDEoVq8B0hHC5Ul5H4Hpqq6Yvo"
  },
  "meta": {}
}
```

### Process the Payment

2. To process the payment, send a POST to [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost).

The headers to process a payment are different than the headers you normally send with a BigCommerce API. The Authorization token is the ID that is returned in Get Payment Access Token(step two). 

**Headers**
* Accept: application/vnd.bc.v1+json
* Authorization: PAT {your-access-token}
* Content-Type: application/json

Send the request with the following fields from the credit card:
* type -- Will always be card
* payment_method_id -- The name of the card in the format `payment-provider.card`
* number
* cardholder_name
* expiry_month
* expiry_year
* verification_value

If any of these fields are incorrect, the payment might be rejected.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### PAT
> There is a space between PAT {your-access-token}.

</div>
</div>
</div>

<!--
title: "Sample Request"
subtitle: "Process Payment"
lineNumbers: true
-->

**Example Request Process Payment**  
`/POST https://payments.bigcommerce.com/stores/{store_hash}/payments`

```curl
curl -X POST \
  https://payments.bigcommerce.com/stores/{store_hash}/payments \
  -H 'Accept: application/vnd.bc.v1+json' \
  -H 'Authorization: PAT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTEzOTQxNDIsIm5iZiI6MTU1MTM5MDU0MiwiaXNzIjoicGF5bWVudHMuYmlnY29tbWVyY2UuY29tIiwic3ViIjoianJhaDZnbW4iLCJqdGkiOiI3Nzgadskfjua451OWJmLTQ3ZWMtYTFmZC00ZDQ3ZTkwNjFlNWMiLCJpYXQiOjE1NTEzOTr4gk78dhshehdGEiOnsic3RvcmVfaWQiOjEwMjU2NDYsIm9yZGVyX2lkIjoyMTUsImFtb3VudCI6OTgwMCwiY3VycmVuY3kiOiJVU0QifX0.WbR90d8m4gn8wK7kPMDEoVq8B0hHC5Ul5H4Hpqq6Yvo' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment": {
    "instrument": {
      "type": "card",
      "number": "4242424242424242",
      "cardholder_name": "Jane Doe",
      "expiry_month": 12,
      "expiry_year": 2020,
      "verification_value": "422"
    },
    "payment_method_id": "stripe.card"
  }
}'
```

<!--
title: "Sample Response"
subtitle: "Process Payment"
lineNumbers: true
-->

**Example Response Process Payment**

```json
{
  "data": {
    "id": "693bb4cd-3f20-444a-8315-6369f582c68a",
    "status": "success",
    "transaction_type": "purchase"
  }
}
```

If the purchase was successful it will return a status of success. The order is then automatically moved to an Awaiting Fulfillment status. If you get a different response, see [Error Codes](#payments_error-codes) for troubleshooting.

---

<a href='#payments_orders-api' aria-hidden='true' class='block-anchor'  id='payments_orders-api'><i aria-hidden='true' class='linkify icon'></i></a>

## Using the Orders API

It is possible to take a payment for an order created using the [Orders API](https://developer.bigcommerce.com/api-docs/orders/orders-api-overview). When creating the order using the Orders API make sure the `status_id:0`. If the order status is not created with the status set to `0` or `Incomplete`, the Payments API will return an [error](#payments_error-codes).
The billing address and line items should be filled in when creating the order. The order can be created as a guest order by either seeting the 
`customer_id:0`or leaving it blank. After the order is created, then follow the steps for either a [credit card](#payments_credit-cards) or a [stored card](#payments_stored-cards).

<!--
title: "Example Create Order"
subtitle: ""
lineNumbers: true
-->

**Example Create an Order**  
`/POST https://api.bigcommerce.com/stores/{store_hash}/v2/orders` 

```json
{
    "status_id": 0,
    "customer_id": 11,
    "billing_address": {
        "first_name": "Jane",
        "last_name": "Does",
        "company": "",
        "street_1": "123 Main Street",
        "street_2": "",
        "city": "Austin",
        "state": "Texas",
        "zip": "78751",
        "country": "United States",
        "country_iso2": "US",
        "email": "janedoe@email.com"
    },
    "shipping_addresses": [
        {
            "first_name": "Trishy",
            "last_name": "Test",
            "company": "Acme Pty Ltd",
            "street_1": "666 Sussex St",
            "street_2": "",
            "city": "Anywhere",
            "state": "Some State",
            "zip": "12345",
            "country": "United States",
            "country_iso2": "US",
            "phone": "",
            "email": "janedoe@email.com"
        }
    ],
    "products": [
        {
            "name": "BigCommerce Poster",
            "quantity": 1,
            "price_inc_tax": 10.98,
            "price_ex_tax": 10
        },
        {
            "name": "BigCommerce Poster II",
            "quantity": 1,
            "price_inc_tax": 50,
            "price_ex_tax": 45
        }
    ]
}
```

<a href='#payments_technical-details' aria-hidden='true' class='block-anchor'  id='payments_technical-details'><i aria-hidden='true' class='linkify icon'></i></a>

## Technical Details 

### Using Test Credit Cards

The following is a list of supported gateways and a list of their test credit cards. These can be useful while getting your app setup. Check your credit card setup in both [BigCommerce](https://support.bigcommerce.com/s/article/Online-Payment-Methods#setup) and the payment gateway to make sure testing is configured properly. If the credit cards do not work or stop working please reach out the payment provider as these are not maintained by BigCommerce. 

* [Authorize.Net](https://developer.authorize.net/hello_world/testing_guide/)
* [Paypal Powered by Braintree](https://developers.braintreepayments.com/guides/credit-cards/testing-go-live/php)
* [CyberSource](https://www.cybersource.com/developers/other_resources/quick_references/test_cc_numbers/)
* [Stripe](https://stripe.com/docs/testing#cards)


### Token
The `payment_access_token` is not from the payment provider. It is created by BigCommerce.

### Decline Payments
If a payment is declined it will return a 4XX error with details if available. 

### Authorization
If a payment gateway is configured for authorization only, the payment will be authorized at the time of processing. The order will have to later be captured through the control panel. If the gateway is set for authorization and capture, the payment will be authorized and captured when payment is processed.

### Stored Cards
The Payments API supports payment with cards that are currently stored. It does not provide a method for storing new cards.

### Control Panel
Orders created and captured via the API will look the same as other orders created via the storefront or other apps. The order source will be “Checkout API.” 

### Data Access
The card data is not accessible via the API once the payment is processed. 

### Rate Limits
BigCommerce has rates limits in place for this API. Some payment providers will provide checks on the incoming requests.

---

<a href='#payments_sample-app-diagram' aria-hidden='true' class='block-anchor'  id='payments_sample-app-diagram'><i aria-hidden='true' class='linkify icon'></i></a>

## Sample App Diagram

The following diagram shows how the `payment_access_token` interacts with BigCommerce API and BigCommerce payments. 

Orders can be created using the [Server to Server API Endpoints](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/checkout/createanorder) or [Orders API](https://developer.bigcommerce.com/api-reference/orders/orders-api).

<!--
    title: #### Sample App

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1553180551833
-->

#### Sample App
![#### Sample App
](//s3.amazonaws.com/user-content.stoplight.io/6012/1553180551833 "#### Sample App
")

---

<a href='#payments_error-codes' aria-hidden='true' class='block-anchor'  id='payments_error-codes'><i aria-hidden='true' class='linkify icon'></i></a>

## Error Codes

| Code | Description | Possible Causes | Possible Solutions |
| ---   | ---  |  ---- |  ---- |
| `10000` |  An internal error has occurred within the API. |  Connection error | Try the request again. |
| `10001` | Missing or incorrect required fields. | Missing or Incorrect Fields |  Check the request for any data that is incorrect or is missing |
| `30000` | Merchant payment configuration could not be found. | * The payment provider has not been configured in the store. | Check the [payment gateways](https://support.bigcommerce.com/s/article/Online-Payment-Methods#setup) settings in your BigCommerce store. |
| `3001` | Merchant payment configuration is not correctly being configured. | The payment configuration is being rejected by the payment gateway. | Check the [payment gateways](https://support.bigcommerce.com/s/article/Online-Payment-Methods#setup) settings in your BigCommerce store. <br> Reach out the the payment gateway to check the information is correct. | 
| `30002` | Vaulting service is currently not available. |  The vaulting feature is not enabled on this store. | Reach out to the store owner to enable [Stored Credit Cards](https://support.bigcommerce.com/s/article/Enabling-Stored-Credit-Cards) |
| `30003` | Order could not be found. | The order does not exist. <br> The order ID is not correct. |  Check the current orders in the store using [Get All Orders](https://developer.bigcommerce.com/api-reference/orders/orders-api/orders/getorders) |
| `30004` | The validation on line item and grand total does not match. | N/A| Recreate the payment access token <br> Recreate the order <br> Ensure the store settings for taxes and discounts are setup correctly| 
| `30050` | Payment instrument could not be saved. | Credit card information is incorrect. | Check that the card information is correct.<br> * `expiry_month` is two digits<br>* `expiry_year` is four digits |
| `30051` | The stored card was not found. |  The card requested for payment is not associated to the shopper.| Use [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget) to see available vaulted cards |
|`30100` | Payment access token could not be created. | N/A|N/A|
| `30101` | Order is invalid. | The order is in the wrong status. | Orders must be in Incomplete Status with a `status_id:0` <br>  The order must be created by the Checkout SDK, Checkout API or V2 Orders API. Orders created in the Control and set to an incomplete status will return this error. | 
| `30102` | The payment was declined. | The card information provided was incorrect<br>The token provided was incorrect | Check that the provider shopper information is correct<br>Make sure the token in the Authorization header field is correct |
| `30103` | Card has expired |N/A | N/A|
| `30104` | The payment was declined. Please contact card issuer for more information. |N/A |N/A|
| `30105` | The payment was declined due to duplicate payment being submitted. |N/A |N/A |
| `30106` | The payment was declined due to insufficient funds. |N/A |N/A|

---

<a href='#payments_faq' aria-hidden='true' class='block-anchor'  id='payments_faq'><i aria-hidden='true' class='linkify icon'></i></a>

## FAQ


**How can I store a credit card?**

When processing a credit payment set `save_instrument: true`. The shopper can also store credit cards during checkout. If you are using the Checkout SDK, it can store the credit card as part of the checkout.

**How do I get a list of stored credit cards?**

Use the Get Payment Methods to get a list of stored payment instruments. 

**Can I add my payment gateway?**

The Payments API does not support adding a third party gateway. Payments are processed through BigCommerce.

**Can I issue a refund?**

Refunds can be issued either using the [Control Panel](https://support.bigcommerce.com/s/article/Processing-Refunds) or through the payment gateway directly.

**How do I process payment for a capture credit card?**

Once a payment has been authorized, the capture step will need to be completed using the [Control Panel](https://support.bigcommerce.com/s/article/How-can-I-set-my-payment-gateway-to-only-authorize-transactions-and-not-capture-the-funds-automatically).

**Can I use this on orders with more than one shipping address?**
Yes, checkouts and orders with more than one consignment can use the Payments API. 

**Is store credit supported?**

Store credit is not a supported payment method with the Payments API. Store credit can still be used by the shopper on the storefront, part of the control panel or with the Checkout API.

**Are gift certificates supported?**

Gift certificates are not supported with the Payments API. Gift certificates can still be used by the shopper on the storefront, part of the control panel or with the Checkout API.

---

## Resources

### Webhooks

- [Customer Payment Instrument](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_customer)
- [Orders](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders)
- [Cart](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_cart)

### Related Endpoints
* [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
* [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)
* [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)

### Related Articles
* [Enabling Stored Credit Cards](https://support.bigcommerce.com/s/article/Enabling-Stored-Credit-Cards) (BigCommerce Support)
* [Processing Refunds](https://support.bigcommerce.com/s/article/Processing-Refunds) (BigCommerce Support)
* [Manually Capturing Transactions (Authorize Only)](https://support.bigcommerce.com/s/article/How-can-I-set-my-payment-gateway-to-only-authorize-transactions-and-not-capture-the-funds-automatically) (BigCommerce Support)
* [Available Payment Gateways](https://support.bigcommerce.com/s/article/Available-Payment-Gateways) (BigCommerce Support)

