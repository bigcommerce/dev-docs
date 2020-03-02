# Order Refunds

The Order API refund endpoints allow developers to process refunds against orders with settled payments. Refund endpoints are useful when building order management or payment integrations. They make embedding refund functionality directly into the the application possible without requiring merchants to return to their BigCommerce Control Panel.

The first section of this article is a brief walkthrough of a refund example. Subsequent sections provide detailed information about refund request objects and batching.

---
## Refund Endpoints

The Order API has two refund endpoints that handle processing refunds on a single order at a time.

|Endpoint|Operations|Reference|
|---|---|---|
|`/orders/{id}/payment_actions/refund_quotes`|` POST` - Create refund quote for order ID `{id}`.|[Create a Refund Quote](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefundquote)
|`/orders/{id}/payment_actions/refunds`|`POST` Create a refund for order ID `{id}`.|[Create a Refund](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/postrefund)
|`/orders/{id}/payment_actions/refunds`|` GET` - Returns the refunds for order ID `{id}`.|[Get Refunds For Order](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/getorderrefunds)
|`/orders/payment_actions/refunds`|`GET` - Returns a list of refunds ordered by refund ID.|[Get All Refunds](https://developer.bigcommerce.com/api-reference/store-management/order-transactions/order-refunds/getrefunds)

## Single Order Refund Example

Refunding a single order consists of two `POST` requests:
1. `/orders/{id}/refund_quotes` to calculate amounts and get available payment methods
2. `/orders/{id}/refunds` to create the refund

This refund example uses an order with the following properties:
* **Products**: Single product priced at `$10.00`
* **Tax:** `$0.83`
* **Shipping:** `$10.00`

The refunded amount will include the shipping, tax, and product cost, a total of `$20.83`.

To refund the cost, we will create a refund quote. Then, we will create a refund using information from the quote.

### Get Refund Quote

A refund quote provides the tax amount, total refund amount, and a list of available payment methods for order refunds.

**Request**
```json
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

>The `item_id` used in the request is the [Order Product](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-products/getallorderproducts) `id` obtained by sending a `GET` request to `/orders/{order_id}/products`.

**Response**
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
      ]
  },
  "meta": {}
}

```

### Create the Refund

Use the `provider_id`, the amount and items from the refund quote, to create the refund:

**Request**

```json
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

**Response**

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

## Offline Order Refunds

Payments collected outside of BigCommerce can be marked as offline when creating a refund. This is a way to keep track of which portions of an order have been refunded. However, no funds are actually exchanged. If the payment was not taken using BigCommerce, then the funds can not be refunded directly back to the payment source through the BigCommerce Order Refund API.

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

Yes, if the store is configured to send an email when an order status changes to _Refunded_ or _Partially Refunded_.

**How do I get a list of  `provider_id`s?**

The `provider_id`s are only exposed as part of POST Refund Quote.

**Will a refunded item be returned to inventory?**

No, items refunded via API will not be returned to inventory. You can either update the inventory directly on the product's page or use the [Control Panel](https://support.bigcommerce.com/s/article/Inventory-Tracking#levels) to change the inventory.

## Troubleshooting

* Before a refund can be issued, the order must have already been paid.
* If a payment gateway is used, it must support refunds. For a list of payment gateways that support refunds through BigCommerce, see the Supported Payment Gateways section in [Processing Refunds](https://support.bigcommerce.com/s/article/Processing-Refunds#payment-gateways).
* If a payment gateway is used, Payments must be settled. Some gateways require a certain amount of time to pass before refunds can be processed.
