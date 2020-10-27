# Orders

<div class="otp" id="no-index">

### On this page
- [What is an order?](#what-is-an-order)
- [Available endpoints](#available-endpoints)
- [Storefront Orders API](#storefront-orders-api)
- [Server-to-Server Checkout API](#server-to-server-checkout-api)
- [Orders API](#orders-api)
- [Order transactions](#order-transactions)
- [OAuth scopes](#oauth-scopes)
- [Related resources](#related-resources)

</div>

## What is an order?
An order is a collection of items, customer information, and shipping information of customers that have finalized with a payment or attempted payment.

Orders can contain both digital or physical products. Digital items are delivered via email and do not require a shipping address, whereas physical items require a shipping address and a delivery method.

BigCommerce offers two possible workflows for creating orders via the API: the Server-to-Server Checkout API or the Orders API.
* The Server-to-Server Checkout API represents an extension of the Server-to-Server Cart API that you can use to complete a purchase from product selection to conversion.
* The Orders API allows you to retrieve or update existing orders or to push orders from a third party, like a POS, to BigCommerce.

## Available endpoints

| Name | Description |
| -- | -- |
| [Storefront Orders](/api-reference/orders/storefront-orders-api) | Retrieve order information from the Order Confirmation page using JavaScript |
| [Server to Server Checkout](/api-reference/cart-checkout/server-server-checkout-api/checkout-orders/createanorder) | Create an order from an existing checkout |
| [Orders API](/api-reference/orders/orders-api) | Create and manage orders. Can manage orders created via API or the Control Panel |
| [Order Transactions](/api-reference/orders/orders-transactions-api) | Get transaction information for existing orders. Read Only Endpoint |

##  Storefront Orders API
The Storefront Orders API allows you to return information about a just-placed order on the order confirmation page. You can interact with the Storefront Orders API using an app or a browser API.

For an example using the Fetch API to log order information to the console, see [Storefront Orders API](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis).

### When to use:
* Scrape order information
* Send order data to an analytics app

<!--
title: "Log Orders to Console"
subtitle: ""
lineNumbers: true
-->

**Log orders to console**
```html
<script>
console.log("Log Orders")
fetch('/api/storefront/order/{{checkout.order.id}}', {credentials: 'include'})
.then(function(response) {
return response.json();
})
.then(function(myJson) {
console.log(myJson);
});
</script>
```

## Server-to-Server Checkout API

The Server-to-Server Checkout API allows you to create a checkout programmatically and then convert it to an order. From there, you can manage the order in the Control Panel or use the V2 Orders API. [See Server-to-Server Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/checkout-orders/createanorder) for more information.

### When to use:
* Create an order from an existing checkout

## Orders API
The Orders API allows you to create an order without first creating a cart and checkout. It also allows you to manage an order's billing address, products, coupons, and taxes. See [Orders API](/api-reference/orders/orders-api) for a complete list of methods.

### When to use:
* Create an order and bypass creating a cart and checkout
* Make changes to existing orders
* Retrieve or archive existing orders
* Export or import order information to a third-party system

## Order transactions
The Order Transactions API is a read-only endpoint that returns transaction or payment data about an order. The data returned does not include payment tokens for a third party such as Braintree.

Orders processed via all [payment providers](https://support.bigcommerce.com/s/article/Available-Payment-Gateways) except PayPal Express Checkout and Test Gateway will create a transaction that is retrievable via Transactions API. Gift certificates, store credit, and offline payment methods will not create a transaction.

### When to use:
* View transaction information about an Order.

## OAuth scopes
- Orders
- Carts
- Checkouts

For more details and a full list of available scopes, see [Oauth Scopes](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes).

## Related resources

### Articles
- [Working with the Storefront Cart and Checkout APIs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis)
- [How To Embed a Shipping Location Map on the BigCommerce Order Confirmation Page](https://medium.com/bigcommerce-developer-blog/how-to-embed-a-google-map-on-the-bigcommerce-order-confirmation-page-8264747e654d)

### Webhooks
- [Orders](/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders)
