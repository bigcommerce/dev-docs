<h1>Orders</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    		<li><a href="#order-overview_what-is-a-order">What is a Order?</a></li>
    		<li><a href="#order-overview_available-endpoints">Available Endpoints</a></li>
        <li><a href="#order-overview_storefront-orders">Storefront Orders API</a></li>
        <li><a href="#order-overview_server-server-checkout">Server to Server Checkout Orders</a></li>
        <li><a href="#order-overview_v2-orders">Orders API</a></li>
    		<li><a href="#order-overview_transactions">Order Transactions</a></li>
        <li><a href="#order-overview_oauth-scopes">OAuth Scopes</a></li>
        <li><a href="#order-overview_available-webhooks">Webhooks Available</a></li>
	</ul>
</div>

<a href='#order-overview_what-is-a-order' aria-hidden='true' class='block-anchor'  id='order-overview_what-is-a-order'><i aria-hidden='true' class='linkify icon'></i></a>

## What is an Order?
An order is a collection of items, along with customer and shipping information, that has been finalized with a payment or attempted payment. 

Orders can contain both digital or physical products. Digital items are delivered via email and do not require a shipping address, whereas physical items require a shipping address and a delivery method. 

BigCommerce offers two possible workflows for creating orders via the API: the Server-to-Server Checkout API or  the Orders API.
* The Server-to-Server Checkout API represents an extension of the Server-to-Server Cart API and can be used to complete a purchase from product selection to conversion.
* The Orders API is used to retrieve or update existing orders or to push orders from a third party, like a POS, to BigCommerce.

---

<a href='#order-overview_available-endpoints' aria-hidden='true' class='block-anchor'  id='order-overview_available-endpoints'><i aria-hidden='true' class='linkify icon'></i></a>

## Available Endpoints

| Name | Description |
| -- | -- |
| [Storefront Orders](/api-reference/orders/storefront-orders-api) | Retrieve order information from the Order Confirmation page using JavaScript |
| [Server to Server Checkout](/api-reference/cart-checkout/server-server-checkout-api/checkout/createanorder) | Create an order from an existing checkout |
| [Orders API](/api-reference/orders/orders-api) | Create and manage orders. Can manage orders created via API or the Control Panel |
| [Order Transactions](/api-reference/orders/orders-transactions-api) | Get transaction information for existing orders. Read Only Endpoint |

---

<a href='#order-overview_storefront-orders' aria-hidden='true' class='block-anchor'  id='order-overview_storefront-orders'><i aria-hidden='true' class='linkify icon'></i></a>

##  Storefront Orders API 
The Storefront Orders API can be used to return information about a just-placed order on the order confirmation page. You can interact with the Storefront Orders API using an app or a browser API. 

For an example using the Fetch API to log order information to the console, see [Storefront Orders API](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis).

### When to Use:
* Scrape order information
* Send order data to an analytics app


<!--
title: "Log Orders to Console"
subtitle: ""
lineNumbers: true
-->

**Log Orders to Console**
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

---

<a href='#order-overview_server-server-checkout' aria-hidden='true' class='block-anchor'  id='order-overview_server-server-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## Server-to-Server Checkout API

The Server-to-Server Checkout API allows you to create a checkout programmatically and then convert it to an order. From there, the order can be managed in the Control Panel or using the V2 Orders API. [See Server-to-Server Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/checkout/createanorder) for more.

### When to Use:
* Create an order from an existing checkout

---

<a href='#order-overview_v2-orders' aria-hidden='true' class='block-anchor'  id='order-overview_v2-orders'><i aria-hidden='true' class='linkify icon'></i></a>


## Orders API
The Orders API can be used to create an order without first creating a cart and checkout. It also allows you to manage an order's billing address, products, coupons, and taxes. See [Orders API](/api-reference/orders/orders-api) for a complete list of methods.

### When to Use: 
* Create an order and bypass creating a cart and checkout
* Make changes to existing orders
* Export or import order information to a third-party system

---

<a href='#order-overview_transactions' aria-hidden='true' class='block-anchor'  id='order-overview_transactions'><i aria-hidden='true' class='linkify icon'></i></a>

## Order Transactions
The Order Transactions API is a read-only endpoint that returns transaction or payment data about an order. The data returned does not include payment tokens for a third party such as Braintree. 

### When to Use:
* View transaction information about an Order. 

---

<a href='#order-oauth-scopes' aria-hidden='true' class='block-anchor'  id='order-oauth-scopes'><i aria-hidden='true' class='linkify icon'></i></a>

## OAuth Scopes
- Orders
- Carts
- Checkouts

For a more details and a full list of available scopes, see [Oauth Scopes](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes).

---

<a href='#order-webhooks-available' aria-hidden='true' class='block-anchor'  id='order-webhooks-available'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources
### Webhooks Available
- [Orders](/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders)

### Related Articles
- [Working with the Storefront Cart and Checkout APIs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis)
- [How To Embed a Shipping Location Map on the BigCommerce Order Confirmation Page](https://medium.com/bigcommerce-developer-blog/how-to-embed-a-google-map-on-the-bigcommerce-order-confirmation-page-8264747e654d) (Developer Blog)
