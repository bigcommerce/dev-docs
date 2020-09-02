# V2 Orders API Overview

<div class="otp" id="no-index">

### On this page
- [Order life-cycle](#order-life-cycle)
- [Create order request](#create-order-request)
- [Adding order status](#adding-order-status)
- [Adding a customer](#adding-a-customer)
- [Adding a billing address](#adding-a-billing-address)
- [Adding a shipping address](#adding-a-shipping-address)
- [Adding products](#adding-products)
- [Adding Discounts](#adding-discounts)
- [Creating an order shipment](#creating-an-order-shipment)
- [Shipping to multiple locations](#shipping-to-multiple-locations)
- [Calculating shipping costs](#calculating-shipping-costs)
- [Calculating taxes](#calculating-taxes)
- [Calculation of totals](#calculation-of-totals)
- [FAQ](#faq)
- [Resources](#resources)

</div>

This article introduces BigCommerce's [V2 REST API Orders endpoints](https://developer.bigcommerce.com/api-reference/store-management/orders).

### Prerequisites:
* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* API access token with the folowing [OAuth](/api-docs/getting-started/authentication#authentication_oauth-scopes) scopes:
  * `Modify` `Orders`
  * `Read` `Products`
* [Product](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct) with [variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/createvariant).

## Order life-cycle

## Create order request

```json
{
  "status_id": 0,
  "customer_id": 11,
  "billing_address": {...},
  "shipping_addresses": [...],
  "products": [...]
}
```

The response will have abbreviated order contents with sub-resources available to get the full order information. By default, the status of an order is 1 or Pending. It also returns an ID, which is the order ID.

```json
{
  "id": 193,
  "customer_id": 0,
  "date_created": "Fri, 12 Oct 2018 19:06:23 +0000",
  "date_modified": "Fri, 12 Oct 2018 19:06:23 +0000",
  "date_shipped": "",
  "status_id": 1,
  "status": "Pending",
  ...
  "products": {
    "url": "https://api.bigcommerce.com/stores/{store_hash}/v2/orders/193/products",
    "resource": "/orders/193/products"
  },
  "shipping_addresses": {
    "url": "https://api.bigcommerce.com/stores/{store_hash}/v2/orders/193/shippingaddresses",
    "resource": "/orders/193/shippingaddresses"
  },
  "coupons": {
    "url": "https://api.bigcommerce.com/stores/{store_hash}/v2/orders/193/coupons",
    "resource": "/orders/193/coupons"
  },
  ...
}
```

## Adding order status

When `status_id` is not specified, the automatic value is 1 and the status is Pending.

The following statuses are of the paid type:
* Shipped
* Partially Shipped
* Awaiting Pickup
* Awaiting Shipment
* Completed
* Awaiting Fulfillment

BigCommerce considers all statuses other than those above to be of the unpaid type, except Refunded, which is neither paid nor unpaid.

You can change the order status label in the control panel. This **does not** change the underlying functionality. See our support article on [Order Status](https://support.bigcommerce.com/s/article/Order-Statuses#rename).

## Adding a customer

**Customer ID** The customer_id will determine the price the shopper pays for an item. Links exists between customer IDs, customer group discounts, and price lists. Set the `customer_id` to 0 when creating a guest order.

## Adding a billing address

## Adding a shipping address

Input the shipping address as an array object since you can add more than one shipping address at a time. Adding multiple shipping addresses allows for an order to ship to multiple locations.

```json
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
            "email": "trish@testing.com"
        }
```

## Adding products

> * If you set `price_ex_tax` or `price_inc_tax`, then you need to specify them both. Otherwise, the order total will not calculate correctly.
> * Custom products do not get added to the catalog.
**Pricing**: If the price is not specified, it will automatically pick up the store's product catalog price. However, you can override this price with `price_inc_tax` and `price_ex_tax`. If you specify `price_inc_tax` or `price_ex_tax`, it will automatically update the order products base_price according to the store settings, but will not change any variant pricing. For example, if you set the store to display prices with tax included, then the `base_price` will be `price_inc_tax`.
**Stock**: For products that you configured to track stock, the quantity specified on the order will reduce the stock on hand. When there is not enough inventory to fulfill the order, the rejected order generates an "out of stock" error code.
**Min and max quantities**.For products with min and max quantities specified in their settings, the API will honor these and reject orders appropriately.
**Options** For products where product options are required, the API will validate these requirements to ensure that the product options are specified.
**Customer file uploads** For products that allow customers to upload a file at checkout (i.e., an image uploaded for a t-shirt order), developers can follow these steps to retrieve the file:
* Get the filename value from GET [/orders/[order_id]/products](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-products/getallorderproducts), in the product_options array
* Use that filename value to download the file via WebDAV using the following path: https://store.com/product_images/configured_products/[value]

The [create order request](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/createanorder) requires a [product object](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/createproduct).

To [get variants by product ID](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid), send a `GET` request to `/stores/{{STORE_HASH}}/v3//catalog/products/{product_id}/variants`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3//catalog/products/{product_id}/variants
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```
[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid#requestrunner)

**Response:**

```json
{
    "data": [
        {
            "id": 421,
            "product_id": 184,
            "sku": "RED",
            "sku_id": 383,
            "price": null,
            "calculated_price": 249,
            "sale_price": null,
            ...
            "option_values": [
                {
                    "id": 180,
                    "label": "Red",
                    "option_id": 200,
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
```

Make note of the following:
* `option_values.id`
* `option_values > option_id`.


**Example custom order products array**

```json
  "products": [
    {
      "name": "BigCommerce Poster",
      "quantity": 1,
      "price_inc_tax": 10.98,
      "price_ex_tax": 10
    },

     {
      "name": "BigCommerce Coffee Mug",
      "quantity": 1,
      "price_inc_tax": 50.00,
      "price_ex_tax": 45.00
    }
  ]
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> * If you set `price_ex_tax` or `price_inc_tax`, then you need to specify them both. Otherwise, the order total will not calculate correctly.
> * Custom products do not get added to the catalog.
> * Shipping address defaults to the billing address.

</div>
</div>
</div>

### Order products


### Add the billing address


```json
    "billing_address": {
        "first_name": "Jane",
        "last_name": "Doe",
        "company": "",
        "street_1": "123 Main Street",
        "street_2": "",
        "city": "Austin",
        "state": "Texas",
        "zip": "78751",
        "country": "United States",
        "country_iso2": "US",
        "email": "janedoe@email.com"
    }
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
>

</div>
</div>
</div>



## Adding Discounts

Manual discounts are supported. To add a manual discount, either overwrite the product price or use the `discount_amount`. The `discount_amount` accepts a fixed dollar amount.

## Creating an order shipment

We will create a shipment for an order, shipping quotes, shipping carriers, and shipping to multiple locations.

Once an order has products, a billing address, and at least one shipping address, you can create an order shipment. Order shipments are a way to mark an order as shipped with the shipping information. You can create multiple shipments for an order by specifying a subset of products or product quantities in each POST request.

To get the `order_address_id`  use, the ID returned in [Order Shipping Address](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipping-addresses/getallshippingaddresses).

The items array requires the product quantity and `order_product_id`. The `order_product_id` is the ID returned from [Order Products](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-products/getanorderproduct).

There does not need to be a shipping provider. If you do not specify the shipping provider, it will default to custom without generating a tracking link. To have the tracking link generated without a shipping provider, provide an empty string. To add a shipping provider, see the available options on [Order Shipment](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipments/getallordershipments).

You will automatically receive an email to the billing address with the shipment confirmation once the order shipment is complete. To stop this behavior, adjust the [Order Notification](https://support.bigcommerce.com/s/article/Customer-Order-Notifications#enable) settings in the Control Panel.

If you delete the order shipment, the status of the shipment is still shipped. The status will need to be [manually changed](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-status/getaorderstatus).

`https://api.bigcommerce.com/stores/{store_hash}/v2/orders/{order_id}/shipments`

```json
{
  "tracking_number": "EJ958083578UK",
  "comments": "Janes Order",
  "order_address_id": "128",
  "shipping_provider": "",
  "items": [
        {
            "order_product_id": 194,
            "product_id": 0,
            "quantity": 1
        },
        {
            "order_product_id": 195,
            "product_id": 0,
            "quantity": 1
        }
  ]
}
```

**response**

```json
{
    "id": 11,
    "order_id": 228,
    "customer_id": 11,
    "order_address_id": 131,
    "date_created": "Wed, 13 Mar 2019 16:35:37 +0000",
    "tracking_number": "EJ958083578US",
    "merchant_shipping_cost": "0.0000",
    "shipping_method": "None",
    "comments": "Ready to go...",
    "shipping_provider": "",
    "tracking_carrier": "",
    "billing_address": {...},
    "shipping_address": {...},
    "items": [
        {
            "order_product_id": 194,
            "product_id": 0,
            "quantity": 1
        },
        ...
    ]
}

```

## Shipping to multiple locations

Orders can have multiple shipment locations. There needs to be more than one product or quantity of a product and more than one shipping address. You can add a shipping address either during the creation or update of an order.

To ship to multiple locations, create an order shipment for each location and item. You can only make one POST request per shipment.

## Calculating shipping costs

Use `shipping_cost_ex_tax` and `shipping_cost_inc_tax` to add a custom shipping amount to an order. Include both `shipping_cost_ex_tax` and `shipping_cost_inc_tax`; otherwise, the final order amount will not calculate correctly.

### Shipping carrier
Generating a quote through a shipping carrier is currently not supported. You can specify a shipping carrier when creating an order shipment. You can generate the quote elsewhere, then update the `shipping_cost_ex_tax` and `shipping_cost_inc_tax` for the order total to be correct.

## Calculating taxes

When the store subscribes to [Avalara Premium](https://www.bigcommerce.com/apps/avalara-avatax/?search=avalara), the [order's tax object](https://developer.bigcommerce.com/api-reference/store-management/orders/order-taxes/getordertaxes) name property is to `API Tax Override`.

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

Abbreviated state names in shipping and billing addresses will prevent tax documents from being submitted to Avalara. For example, supplying `CA` instead of `California` as a state name leads to a successful submission.
BigCommerce automatically submits tax documents to Avalara when the order achieves a paid status. See Order Status below for a list of paid statuses.

| Existing Status | Status Passed | Resultant Status | Avalara Tax Document Submission |
| - | - | - | - |
| Any | None | `Pending` | None |
| Paid or `Refunded` | Paid | Paid | None |
| Unpaid or `Refunded` | Unpaid | Unpaid | None |
| Paid or `Refunded` | Unpaid | Unpaid | Tax document voided |
| Unpaid or `Refunded` | Paid | Paid | Tax document submitted |

## Calculation of totals

Automatic calculations for order subtotal and total occur when they are not specified. Edits to the following properties will trigger a recalculation of the subtotal and total.

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

You can create overrides for calculated values such as product prices, subtotal and totals by sending a fixed value in the request. If values are not supplied for these properties, they will be automatically calculated based on the preset store values and tax rules.
You can override order subtotal and/or total. If you choose to override one, we strongly recommend that you override both, because the system will not accurately calculate the other.
Tax will be calculated based on the tax rules specified in the store, except in the case of automatic taxes. However, in both cases, you can optionally override the tax values by specifying `price_inc_tax` and `price_ex_tax`.
If a store has automatic tax enabled, BigCommerce does not compute sales tax on orders created via the API.

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
- [Orders](https://developer.bigcommerce.com/api-reference/orders/orders-api/orders/)
- [Order Shipments](/api-reference/orders/orders-api/order-shipments/createordershipments)
- [Order Status](/api-reference/orders/orders-api/order-status/getaorderstatus)
- [Shipping Quotes](/api-reference/orders/orders-api/order-shipping-addresses-quotes/getshippingquotes)
- [Order Products](/api-reference/orders/orders-api/order-products/getanorderproduct)
- [Order Shipping Address](/api-reference/orders/orders-api/order-shipping-addresses/getashippingaddress)
- [Order Coupons](/api-reference/orders/orders-api/order-coupons/getallordercoupons)

### Related articles
- [Order Status](https://support.bigcommerce.com/s/article/Order-Statuses#rename) (BigCommerce Support)
- [Order Notifications](https://support.bigcommerce.com/s/article/Customer-Order-Notifications#enable) (BigCommerce Support)
