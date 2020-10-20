# Orders Overview

<div class="otp" id="no-index">

### On this page
- [Creating an order](#creating-an-order)
- [Changing order status](#changing-order-status)
- [Specifying order customer](#specifying-order-customer)
- [Including shipping addresses](#including-shipping-addresses)
- [Adding products](#adding-products)
- [Creating order shipments](#creating-order-shipments)
- [Shipping to multiple locations](#shipping-to-multiple-locations)
- [Getting shipping quotes](#getting-shipping-quotes)
- [Getting order taxes](#getting-order-taxes)
- [Getting order transactions](#getting-order-transactions)
- [Handling refunds](#handling-refunds)
- [Calculating totals](#calculating-totals)
- [FAQ](#faq)
- [Resources](#resources)

</div>

This article introduces BigCommerce's [Orders V2](https://developer.bigcommerce.com/api-reference/store-management/orders) and [Orders V3](https://developer.bigcommerce.com/api-reference/store-management/order-transactions) REST API resources. [Orders V2](https://developer.bigcommerce.com/api-reference/store-management/orders) exposes endpoints for [creating](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder), [reading](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/getallorders), [updating](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/updateanorder), and [deleting](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/deleteallorders) orders; it also includes endpoints for managing [order shipments](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipments) and [order shipping addresses](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses). [Orders V3](https://developer.bigcommerce.com/api-reference/store-management/order-transactions) surfaces [order transactions](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/transactions/gettransactions) and [order refunds](https://developer.bigcommerce.com/api-reference/store-management/order-transactions) endpoints. For information on processing order payments via API, see [Payments API Overview](https://developer.bigcommerce.com/api-docs/payments/payments-api-overview).

### Prerequisites:
* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial)
* Access token for [API authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication) with the following [scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes):
  * Orders - **Modify**
  * Products - **Read**
* [Product](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct) with [variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/createvariant).

## Creating an order

To [create an order](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder), send a `POST` request to `/stores/{{STORE_HASH}}/v2/orders`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2//v2/orders
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "billing_address": {
    "first_name": "Jane",
    "last_name": "Doe",
    "street_1": "123 Main Street",
    "city": "Austin",
    "state": "Texas",
    "zip": "78751",
    "country": "United States",
    "country_iso2": "US",
    "email": "janedoe@email.com"
  },
  "products": [
    {
      "name": "BigCommerce Coffee Mug",
      "quantity": 1,
      "price_inc_tax": 50,
      "price_ex_tax": 45
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * The example above contains minimum required fields for a [create order request](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder).
> * The product ordered is a *custom* product; custom products do not exist in the catalog.

</div>
</div>
</div>

## Changing order status

Specify [order status](https://developer.bigcommerce.com/api-reference/store-management/orders/order-status/getorderstatus) by including the `status_id` property in the [create order](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder) request. To [update an order](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/updateanorder) and change it's status, send a `PUT` request to `/v2/orders/{order_id}`.

```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders/{order_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "status_id": 2
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder#requestrunner)

To [get a list of order statuses](https://developer.bigcommerce.com/api-reference/store-management/orders/order-status/getorderstatus), send a `GET` request to `/stores/{{STORE_HASH}}/v2/order_statuses`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/order_statuses
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/order-status/getorderstatus#requestrunner)

**Response:**

```json
[
  {
    "id": 0,
    "name": "Incomplete",
    "system_label": "Incomplete",
    "custom_label": "Incomplete - Testing",
    "system_description": "An incomplete order happens when a shopper reached the payment page, but did not complete the transaction.",
    "order": 0
  },
  ...
]
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * If not specified, `status_id` defaults to `1`.
> * The refunded status is neither paid nor unpaid.
> * See [Order Statuses](https://support.bigcommerce.com/s/article/Order-Statuses#rename) in the Help Center for information on changing `custom_label` in the control panel .

</div>
</div>
</div>


## Specifying order customer

Specify the [customer](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customers/customersget#responses) by including a `customer_id` in the [create order](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder) request.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


{
  "customer_id": 1,
  "billing_address": {...},
  "products": [...]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder#requestrunner)

To [get a list of customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customers/customersget), send a `GET` request to `/stores/{{STORE_HASH}}/v3/customers`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/customers
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customers/customersget#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Set `customer_id` to `0` to create a guest order.

</div>
</div>
</div>

## Including shipping addresses

Add [shipping addresses](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses/updateashippingaddress#request-body) by including a [`shipping_address` array](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses/updateashippingaddress#request-body) in the [create order](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder) request.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


{
  "billing_address": {...},
  "shipping_addresses": [
    {
      "first_name": "Rusty",
      "last_name": "Gates",
      "company": "Example LLC",
      "street_1": "123 Example ST",
      "street_2": "",
      "city": "Austin",
      "state": "Texas",
      "zip": "12345",
      "country": "United States",
      "country_iso2": "US",
      "phone": "5128675309",
      "email": "rusty.gates@example.com"
    }
  ],
  "products": [...]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder#requestrunner)


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Add multiple shipping addresses to [ship to multiple locations](#shipping-to-multiple-locations).

</div>
</div>
</div>

## Adding products

Specify [products from the catalog](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses/updateashippingaddress#request-body) by including a [`products` array](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses/updateashippingaddress#request-body) in the [create order](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder) request.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


{
  "billing_address": {...},
  "products": [
    {
      "name": "BigCommerce Coffee Mug", # custom product
      "quantity": 1,
      "price_inc_tax": 50,
      "price_ex_tax": 45
    },
    {
      "product_id": 184,               # product from catalog
      "quantity": 1,
      "product_options": [
        {
          "id": 200,
          "value": "180"
        },
        {
          "id": 230,
          "value": "192"
        }
      ]
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder#requestrunner)

To get the `product_options.id` and `product_options.value` of a product for the order `products` array, send a `GET` request to `/stores/{{STORE_HASH}}/v3/catalog/products/{product_id}/variants`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3//catalog/products/{product_id}/variants
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/getvariantbyid#responses)**

```json
{
  "data": [
    {
      "id": 421,
      "product_id": 184,
      ...
      "option_values": [
        {
          "id": 180,         // product_options.value
          "label": "Red",
          "option_id": 200,  // product_options.id
          "option_display_name": "Color"
        },
        {
          "id": 192,
          "label": "Small",
          "option_id": 230,
          "option_display_name": "T-Shirt Size"
        }
      ]
    }
    ...
  ]
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Custom products do not get added to the catalog.
> * If price is not specified, the store's product catalog price is used; override this price with `price_inc_tax` and `price_ex_tax`.
> * If you override `price_ex_tax` or `price_inc_tax`, override both; otherwise, order totals will not calculate correctly.
> * Overriding `price_inc_tax` or `price_ex_tax` does not change variant pricing.

</div>
</div>
</div>

## Creating order shipments

Once an order has products, a billing address, and a shipping address, you can create an order shipment.

To [create an order shipment](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipments/createordershipments), send a `POST` request to `/stores/{{STORE_HASH}}/v2/orders/{{order_id}}/shipments`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}}/v2/orders/{{order_id}}/shipments
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

  "tracking_number": "EJ958083578UK",
  "comments": "Janes Order",
  "order_address_id": "128",
  "shipping_provider": "",
  "items": [
    {
      "order_product_id": 194,
      "quantity": 1
    },
    {
      "order_product_id": 195,
      "quantity": 1
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipments/createordershipments#requestrunner)

|Property|Description|
|-|-|
|`tracking_number`|Shipping provider tracking number; used to generate tracking link|
|`comments`|Optional comments|
|`order_address_id`|Obtainable via [Get Order Shipping Address](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses/getallshippingaddresses)|
|`shipping_provider`| Optional; used to create tracking link; see [Create Order Shipment](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipments/createordershipments) for accepted values|
|`items.order_product_id`|Obtainable via [Get Order Products](https://developer.bigcommerce.com/api-reference/store-management/orders/order-products/getallorderproducts)|

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Create multiple shipments by specifying a subset of products and quantities in each `POST` request.
> * Creating order shipments triggers email notifications; adjust [Order Notification](https://support.bigcommerce.com/s/article/Customer-Order-Notifications#enable) settings in the [control panel](https://login.bigcommerce.com/deep-links/manage) to change this behavior.
> * Deleting a shipment does **not** move the order out of `shipped` status.

</div>
</div>
</div>

## Shipping to multiple locations

You can create multiple shipments for orders, and each shipment can have a different `order_address_id`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}}/v2/orders/{{order_id}}/shipments
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "order_address_id": "123",
  "shipping_provider": "usps",
  "items": [
    {
      "order_product_id": 2,
      "quantity": 1
    }
  ]
}
```

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}}/v2/orders/{{order_id}}/shipments
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "order_address_id": "456",
  "shipping_provider": "",
  "items": [
    {
      "order_product_id": 5,
      "quantity": 1
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipments/createordershipments#requestrunner)

|Property|Description|
|-|-|
|`order_address_id`|Obtainable via [Get Order Shipping Address](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses/getallshippingaddresses)|
|`shipping_provider`| Optional; used to create tracking link; see [Create Order Shipment](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipments/createordershipments) for accepted values|
|`items.order_product_id`|Obtainable via [Get Order Products](https://developer.bigcommerce.com/api-reference/store-management/orders/order-products/getallorderproducts)|

## Getting shipping quotes

To [get shipping quotes](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses-quotes/getshippingquotes), send a `GET` request to `/v2/orders/{order_id}/shipping_addresses/{shipping_address_id}/shipping_quotes`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders/{order_id}/shipping_addresses/{shipping_address_id}/shipping_quotes
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses-quotes/getshippingquotes#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/orders/order-shipping-addresses-quotes/getshippingquotes#responses)**

```json
{
  "id": "16",
  "uuid": "18aaa5eb-3c7a-4bf8-bfaa-d14d155606f1",
  "timestamp": "Mon, 30 Jul 2018 15:32:35 +0000",
  "shipping_provider_id": "bcproductbased",
  "shipping_provider_quote": [],
  "provider_code": "productfixedshipping",
  "carrier_code": "",
  "rate_code": "",
  "rate_id": ""
}
```

Generating a quote through a shipping carrier is not supported. You can specify a shipping carrier when creating an order shipment. You can generate the quote elsewhere, then update the `shipping_cost_ex_tax` and `shipping_cost_inc_tax` for the order total to be correct.

## Getting order taxes

To [get order taxes](https://developer.bigcommerce.com/api-reference/store-management/orders/order-taxes/getordertaxes), send a `GET` request to `/stores/{{STORE_HASH}}/v2/orders/{order_id}/taxes`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders/{order_id}/taxes
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/orders/order-taxes/getordertaxes#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/orders/order-taxes/getordertaxes#responses)**

```json
[
  {
    "id": 13,
    "order_id": 138,
    "order_address_id": 39,
    "tax_rate_id": 1,
    "tax_class_id": 0,
    "name": "Tax",
    "class": "Default Tax Class",
    "rate": "8.0000",
    "priority": 0,
    "priority_amount": "17.6400",
    "line_amount": "17.6400"
  }
]
```

The response's [order tax object](https://developer.bigcommerce.com/api-reference/store-management/orders/order-taxes/getordertaxes) `name` property gets set to `API Tax Override` when generated by third-party tax services like [Avalara Premium](https://www.bigcommerce.com/apps/avalara-avatax/?search=avalara).

```json
[
  {
    "id": 13,
    "order_id": 138,
    "order_address_id": 39,
    "tax_rate_id": 1,
    "tax_class_id": 0,
    "name": "API Tax Override",
    ...
  }
]
```

BigCommerce submits tax documents to Avalara when an order moves from an **unpaid** status to a **paid** status and voids tax documents when an order moves from a **paid status** to an unpaid status.

| Existing Status | Status Passed | Resultant Status | Avalara Tax Document Submission |
| - | - | - | - |
| Any | None | `Pending` | None |
| Paid or `Refunded` | Paid | Paid | None |
| Unpaid or `Refunded` | Unpaid | Unpaid | None |
| Paid or `Refunded` | Unpaid | Unpaid | Tax document voided |
| Unpaid or `Refunded` | Paid | Paid | Tax document submitted |

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Abbreviated state names (ex: `CA` instead of `California`) in an order address will cause tax document submission to fail.
> * Taxes are calculated using rules specified in the store (unless [automatic taxes](https://support.bigcommerce.com/s/article/Automatic-Tax-Setup) are enabled).
> * You can optionally override tax values by specifying `price_inc_tax` and `price_ex_tax` in an [update order request](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/updateanorder).
> * If a store has [automatic tax](https://support.bigcommerce.com/s/article/Automatic-Tax-Setup) enabled, BigCommerce does not compute sales tax on orders created via the API.

</div>
</div>
</div>

## Getting order transactions

To [get order transactions](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/transactions/gettransactions), send a `GET` request to `/stores/{{STORE_HASH}}/v3/orders/{order_id}/transactions`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/orders/{order_id}/transactions
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/transactions/gettransactions#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/transactions/gettransactions#responses)**

```json
{
  "data": [
    {
      "id": 85926313,
      "order_id": "121",
      "event": "purchase",
      "method": "nonce",
      "amount": 1,
      "currency": "USD",
      "gateway": "squarev2",
      "gateway_transaction_id": "pN5Kd7R9ilEI2ygBawCy7tMF|qwnAFAxRZ7tYRtIpZULg1yMF",
      "status": "ok",
      "test": false,
      "fraud_review": false,
      "reference_transaction_id": {},
      "date_created": "2018-05-08T15:06:12+00:00",
      "avs_result": {...},
      "cvv_result": {...},
      "credit_card": {},
      "gift_certificate": {},
      "store_credit": {},
      "offline": {},
      "custom": {},
      "payment_instrument_token": {},
      "payment_method_id": "squarev2.card"
    }
  ],
  "meta": {...}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Depending on the payment method, different information will be available (not all payment gateways return full card or fraud detail).
> * Transactions are not created for the following payment methods:
>   * Test Payment Gateway
>   * PayPal Express
>   * Amazon Pay

</div>
</div>
</div>

## Handling refunds

[Orders V3](https://developer.bigcommerce.com/api-reference/store-management/order-transactions) exposes endpoints for managing [order refunds](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds). For an overview on using these endpoints, see [Order Refunds in API Docs](https://developer.bigcommerce.com/api-docs/orders/payment-actions).

## Calculating totals

Order `subtotal` and `total` calculate automatically; edits to the following properties trigger recalculation.

|Property|Type|Description|
|-|-|-|
|`products`|`array[obj]`|Used to calculate shipping, taxes, and subtotal|
|`shipping_cost_ex_tax`|`float`|Shipping cost, excluding tax|
|`shipping_cost_inc_tax`|`float`|Shipping cost, including tax|
|`handling_cost_ex_tax`|`float`|Value of handling cost, excluding tax|
|`handling_cost_inc_tax`|`float`|Value of handling cost, including tax|
|`wrapping_cost_ex_tax`|`float`|Value of wrapping cost, excluding tax |
|`wrapping_cost_inc_tax`|`float`|Value of wrapping cost, including tax |
|`billing_address`|`obj`|Used to calculate shipping and taxes| 
|`shipping_addresses`|`array[obj]`|Used to calculate shipping and taxes| 

|Property|Description
|-|
|`products`|
|`shipping_cost_ex_tax`|
|`shipping_cost_inc_tax`|
|`handling_cost_ex_tax`|
|`handling_cost_inc_tax`|
|`wrapping_cost_ex_tax`|
|`wrapping_cost_inc_tax`|
|`billing_address`|
|`shipping_addresses`|

You can override calculated values such as product prices, subtotals, and totals by sending a fixed value in the request. If values are not supplied for these properties, they will be automatically calculated based on the preset store values and tax rules.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * If you override `subtotal` or `total`, override both; the system will not re-calculate the other.
> * To add a manual discount, overwrite the product price or `discount_amount`.

</div>
</div>
</div>

## FAQ

**Is adding coupons available?**

Coupon redemption is unavailable. You can not write to the `coupon_discount` field. You can add a discount to the order by using the `discount_amount`.

**How do I create an order for a guest?**

To specify a guest checkout, set `customer_id` to 0.

**How do I set the order source?**

You cannot specify the `order_source`; its value is external. You can optionally specify a value for `external_source` to define which external source the order is coming from - e.g., POS system X, accounting system Y, etc.

**Can I create an order with only custom products?**

Yes, the store's catalog does not include products.

**What is the difference between country_ISO2 and country?**

There is no requirement to specify country when `country_ISO2` is specified in the shipping and billing addresses and vice versa.

**How can I take a payment for an order?**

You can either process payment through a third party or using the control panel.

**Can I generate a shipping quote from a carrier using the API?**

Not at this time. If an order is created either in the control panel or via API, it returns a 204 when trying to get a Shipping Quote.

## Resources

### Webhooks

- [Orders](/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders)

### Related endpoints

- [Storefront Orders](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-orders)
- [Order Refunds](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds)
- [Orders](https://developer.bigcommerce.com/api-reference/orders/orders-api/orders/)
- [Order Shipments](/api-reference/orders/orders-api/order-shipments/createordershipments)
- [Order Status](/api-reference/orders/orders-api/order-status/getaorderstatus)
- [Shipping Quotes](/api-reference/orders/orders-api/order-shipping-addresses-quotes/getshippingquotes)
- [Order Products](/api-reference/orders/orders-api/order-products/getanorderproduct)
- [Order Shipping Address](/api-reference/orders/orders-api/order-shipping-addresses/getashippingaddress)
- [Order Coupons](/api-reference/orders/orders-api/order-coupons/getallordercoupons)
- [Order Transactions](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/transactions)

### Related articles

- [Payments API Overview](https://developer.bigcommerce.com/api-docs/payments/payments-api-overview)
- [Order Refunds](https://developer.bigcommerce.com/api-docs/orders/payment-actions)
- [Order Statuses](https://support.bigcommerce.com/s/article/Order-Statuses) (Help Center)
- [Order Notifications](https://support.bigcommerce.com/s/article/Customer-Order-Notifications#enable) (Help Center)
