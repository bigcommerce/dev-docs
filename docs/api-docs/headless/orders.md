# Handling Orders

<div class="otp" id="no-index">

### On this page
- [Creating an order from a cart](#creating-an-order-from-a-cart)
- [Processing payments](#processing-payments)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

This section explains how to create and manage orders for headless storefronts.

## Creating an order from a cart

To successfully complete this section, you must first create a cart with a **redirect URL**. For instructions on how to create a cart, see the [Carts]() section of this tutorial.

### Adding a billing address

You can change a cart to a checkout by adding a billing address. To add a checkout billing address, send a `POST` request to the [Add Checkout Billing Address](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-billing-address/checkoutsbillingaddressbycheckoutidpost) endpoint. Your `checkoutId` will correspond with the cart `id` returned in response to [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart).

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/checkouts/{checkoutId}/billing-address
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "address1": "123 Main Street",
  "address2": "",
  "city": "Austin",
  "state_or_province": "Texas",
  "state_or_province_code": "TX",
  "country_code": "US",
  "postal_code": "78751",
  "phone": "1234567890"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-billing-address/checkoutsbillingaddressbycheckoutidpost#requestrunner)

### Adding a consignment

Now that you have transformed your headless cart into a checkout, you need to add a consignment with a shipping address, line items, and a shipping option. You can do so following this two-step process:

**Step 1: Add a new consignment to the checkout**

Send a `POST` request to the [Add Consignment to Checkout](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost) endpoint. Append the `include=consignments.available_shipping_options` query parameter to your `POST` request to return `available_shipping_options` (required for step two).

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/checkouts/{checkoutId}/consignments?include=consignments.available_shipping_options
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

[
  {
    "shipping_address": {
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "address1": "123 Main Street",
      "address2": "",
      "city": "Austin",
      "state_or_province": "Texas",
      "state_or_province_code": "TX",
      "country_code": "US",
      "postal_code": "78751",
      "phone": "1234567890"
    },
    "line_items": [
      {
        "item_id": "7e2f9b22-a16e-4056-9e2d-8fc919bcf653",
        "quantity": 1
      }
    ]
  }
]
```

The response will contain an array of `available_shipping_options`. You will use one of the available shipping options to update the consignment in the next step.

```json
"available_shipping_options": [
  {
    "id": "80ad65f7946c23bd4ee9a531d85c5e21",
    "type": "shipping_pickupinstore",
    "description": "Pickup In Store",
    "image_url": "",
    "cost": 0,
    "transit_time": "",
    "additional_description": ""
  },
  {
    "id": "4dcbf24f457dd67d5f89bcf374e0bc9b",
    "type": "freeshipping",
    "description": "Free Shipping",
    "image_url": "",
    "cost": 0,
    "transit_time": "",
    "additional_description": ""
  },
  {
    "id": "85dfaf5f834d7e594f0bd7cf67d5b200",
    "type": "shipping_flatrate",
    "description": "Flat Rate",
    "image_url": "",
    "cost": 5,
    "transit_time": "",
    "additional_description": ""
  },
  {
    "id": "8809b0bbcc8bdc2d5cad2a4fcbd6cf09",
    "type": "shipping_byweight",
    "description": "Ship by Weight",
    "image_url": "",
    "cost": 10,
    "transit_time": "",
    "additional_description": ""
  }
]
```

**Step 2: Update the consignment**

Use one of the available shipping options to update the consignment you created in Step 1.
Send a `PUT` request to the [Update Checkout Consignment](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput) endpoint.

```http
PUT https://api.bigcommerce.com/stores/{store_hash}/v3/checkouts/{checkoutId}/consignments/{consignmentId}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "shipping_option_id": "4dcbf24f457dd67d5f89bcf374e0bc9b"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput#requestrunner)

### Creating an order

Now that you have added a billing address and a consignment to your checkout, you can create an order by sending a `POST` request to the [Create an Order](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-orders/createanorder) endpoint. The order status will be set to incomplete.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/checkouts/{checkoutId}/orders
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-orders/createanorder#requestrunner)

**Response example**

```json
{
  "data": {
    "id": 125
  },
  "meta": {}
}
```

## Processing payments

Depending on the shopper's card-on-file authorization, you can use one of the following methods to process the payment.

* **Stored Card** – A shopper has authorized a merchant to store their payment details.
* **Credit Card** – A shopper has not authorized a merchant to store their payment details.

### Using the Stored Card method

1. Start by retrieving the available payment methods. Send a `GET` request to the `Get Accepted Payment Methods` endpoint. 

```http
GET https://api.bigcommerce.com/stores/{store_hash}/v3/payments/methods
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/accepted-methods/paymentsmethodsget#requestrunner)

2. To process a payment for an order, you will need to make a call to the Payments API which requires an access token. To generate an access token, send a `POST` request to the [Create Payment Access Token](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost) endpoint. 

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/payments/access_tokens
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "order": {
    "id": 125,
    "is_recurring": false
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost#requestrunner)

Make a note of the access token `id`. This token is required in subsequent payment request to the [Process Payment](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/process-payment/paymentspost) endpoint.

3. Send a `POST` request to the [Process Payment](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/process-payment/paymentspost) endpoint. The headers to process a payment are different than the headers you normally send with a BigCommerce API. The authorization token is the ID returned in Create Payment Access Token (step two). To learn more, see [Stored cards](https://developer.bigcommerce.com/api-docs/store-management/payment-processing#stored-cards).

```http
POST https://api.bigcommerce.com/stores/{store_hash}/payments
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "payment": {
    "instrument": {
      "type": "stored_card",
      "token": "8cdf7b6ea1b27119463bf9e5106639618cc77a9adc49f0069ca8b756cc15caee",
      "verification_value": "1142"
    },
    "payment_method_id": "adyenv2.scheme",
    "save_instrument": true
  }
}
```

**Example response**

```json
{
  "data": {
    "id": "693bb4cd-3f20-444a-8315-6369f582c68a",
    "status": "success",
    "transaction_type": "purchase"
  }
}
```

### Using the Credit Card method

If a shopper does not have a payment method saved on file, you can process a payment using a credit card. There are two steps to this method:

1. Send a `POST` request to the [Create Payment Access Token](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost) endpoint to get the authorization token that needs to be passed in the header when processing the payment.

2. Send a `POST` request to the [Process Payment](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/process-payment/paymentspost) endpoint. The headers to process a payment are different than the headers you normally send with a BigCommerce API. The Authorization token is the ID returned in Create Payment Access Token (step one). To learn more, see [Credit cards](https://developer.bigcommerce.com/api-docs/store-management/payment-processing#credit-cards).

**Example response**

```json
{
  "data": {
    "id": "693bb4cd-3f20-444a-8315-6369f582c68a",
    "status": "success",
    "transaction_type": "purchase"
  }
}
```

A successful transaction will return a status of success. The order is then automatically moved to an Awaiting Fulfillment status. If you get a different response, see [Error Codes](https://developer.bigcommerce.com/api-docs/store-management/payment-processing#error-codes) for troubleshooting.

## Next steps

- [Learn more about PCI compliance](https://developer.bigcommerce.com/api-docs/storefronts/guide/pci-compliance)

## Resources

- [Payments API Overview](https://developer.bigcommerce.com/api-docs/store-management/payment-processing)