# Order Refunds

<div class="otp" id="no-index">

### On this page
- [Single order refund example](#single-order-refund-example)
- [Creating refund quotes](#creating-refund-quotes)
- [Creating a refund](#creating-a-refund)
- [Offline order refunds](#offline-order-refunds)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Related resources](#related-resources)

</div>

[Order V3](https://developer.bigcommerce.com/api-reference/store-management/order-transactions) exposes endpoints for creating refunds against orders with settled payments. These endpoints are useful when building order management or payment integrations as they make embedding refund functionality directly into the application possible without requiring merchants to return to their BigCommerce control panel.

This article provides an overview of Order's V3 refund capabilities and includes a step-by-step example for creating a [single order refund](#single-order-refund-example).

## Single order refund example

Refunding an order consists of two API requests.

|Request|Operation|Endpoint|Description|
|-|-|-|-|
|1|`POST`|[`/v3/orders/{id}/payment_actions/refund_quotes`](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote)|Calculate amounts and get payment methods|
|2|`POST`|[`/v3/orders/{id}/payment_actions/refund`](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefund)|Create the refund|



The example requests in this article use an order with the following properties:
* **Products**: Single product priced at `$10.00`
* **Tax:** `$0.83`
* **Shipping:** `$10.00`

The refunded amount will include the shipping, tax, and product cost (a total of `$20.83`). We will [create a refund quote](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote). Then, we will [create a refund](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefund) using the information contained in the [create refund quote response](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote#responses).

## Creating refund quotes

A refund quote provides the tax amount, total refund amount, and a list of available payment methods for order refunds.

To [create a refund quote](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote), send a `POST` request to `/v3/orders/{order_id}/payment_actions/refund_quotes`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/orders/{order_id}/payment_actions/refund_quotes
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "item_type": "PRODUCT",
      "item_id": 8,
      "quantity": 1,
      "reason": "Testing the Refund API!"
    },
    {
      "item_type": "SHIPPING",
      "item_id": 9,
      "amount": 10,
      "reason": "Testing the Refund API!"
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote#responses)**

```json
{
  "data": {
    "total_refund_amount": 20.83,
    "total_refund_tax_amount": 0.83,
    "rounding": 0,
    "adjustment": 0,
    "is_tax_included": false,
    "order_level_refund_amount": 0,
    "refund_methods": [
      [
        {
          "provider_id": "braintree",
          "provider_description": "Store Credit",
          "amount": 20.83,
          "offline": false,
          "offline_provider": false,
          "offline_reason": ""
        }
      ],
      ...
    ]
  },
  "meta": {}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * To get an `item_id` for the [create refund quote](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote#requestrunner) request, make a request to [get order products](https://developer.bigcommerce.com/api-reference/store-management/orders/order-products/getallorderproducts#requestrunner); the `id` of the order product is the `item_id`.
> * To get a list of orders and their `id`s, make a request to [get all orders](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/getallorders#requestrunner).

</div>
</div>
</div>


## Creating a refund

Use the `provider_id`, the `amount`, and `items` from the [refund quote](#creating-refund-quotes) to [create a refund](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefund).

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/orders/{order_id}/payment_actions/refunds
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "item_id": 8,
      "item_type": "PRODUCT",
      "quantity": 1
    },
    {
      "item_id": 9,
      "item_type": "SHIPPING",
      "amount": 10
    }
  ],
  "payments": [
    {
      "provider_id": "braintree",
      "amount": 20.83,
      "offline": false
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefund#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefund#responses)**

```json
{
  "data": {
    "id": 1,
    "order_id": 21,
    "user_id": 0,
    "created": "",
    "reason": "",
    "total_amount": 20.83,
    "total_tax": 0.83,
    "items": [
      {
        "item_type": "PRODUCT",
        "item_id": 8,
        "reason": "",
        "quantity": 1,
        "requested_amount": 10
      },
      {
        "item_type": "SHIPPING",
        "item_id": 9,
        "reason": "",
        "requested_amount": 10
      }
    ],
    "payments": [
      {
        "id": 1,
        "provider_id": "braintree",
        "amount": 20.83,
        "offline": false,
        "is_declined": false,
        "declined_message": ""
      }
    ]
  },
  "meta": {}
}
```

## Offline order refunds

Payments collected outside of BigCommerce can be marked as offline when creating a refund. Marking payments as offline is a way to keep track of which portions of an order you refunded. However, no funds were collected. If you did not receive payment using BigCommerce, then the funds can not be refunded directly to the payment source using BigCommerce's refund endpoints.

## FAQ

**Can I just skip creating the quote and go straight to processing a refund?**

It is possible to process a refund without creating a quote first. Quotes serve to make sure you are refunding to the correct payment provider in the correct amount.

**Where do I find the `item_id`?**

Use the V2 Orders Endpoint to get the required ID:

  - `PRODUCT` -- Order Product ID
  - `GIFT_WRAPPING` -- Order Product ID
  - `SHIPPING` -- Order Address ID
  - `HANDLING` -- Order Address ID
  - `ORDER` -- Order ID

**Will this trigger an email to the merchant?**

Yes, if you configure the store to send an email when an order status changes to _Refunded_ or _Partially Refunded_.

**How do I get a list of  `provider_id`s?**

The POST Refund Quote exposes `provider_id`s.

**Will a refunded item be returned to inventory?**

No, you cannot return items to inventory that you refunded via API. You can either update the inventory directly on the product's page or use the [Control Panel](https://support.bigcommerce.com/s/article/Inventory-Tracking#levels) to change the inventory.

## Troubleshooting

* You must receive payment of the order before you can issue a refund.
* If you use a payment gateway, it must support refunds. For a list of payment gateways that support refunds through BigCommerce, see the Supported Payment Gateways section in [Processing Refunds](https://support.bigcommerce.com/s/article/Processing-Refunds#payment-gateways).
* If you use a payment gateway, you must settle payments. Some gateways require a certain amount of time to pass before you can process refunds.

## Related resources

### Articles
* [Orders Overview](https://developer.bigcommerce.com/api-docs/store-management/orders)
* [Order Webhook Events](https://developer.bigcommerce.com/api-docs/store-management/webhooks/events#orders)

### Endpoints
* [Orders V2 Reference](https://developer.bigcommerce.com/api-reference/orders/orders-api)
* [Orders V3 Reference](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)
