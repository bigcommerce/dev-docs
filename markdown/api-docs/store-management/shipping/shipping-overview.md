<h1>Shipping</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#shipping_storefront-server-checkout">Storefront Checkout and Server to Server Checkout</a></li>
    <li><a href="#shipping_order-shipping-addresses">Order Shipping Addresses</a></li>
    <li><a href="#shipping_shipping-zone-methods">Shipping Zone and Shipping Methods</a></li>
    <li><a href="#shipping_real-time-carriers">Real-Time Carriers</a></li>
	</ul>
</div>

<a href='#shipping_what-is-a-shipment' aria-hidden='true' class='block-anchor'  id='shipping_what-is-a-shipment'><i aria-hidden='true' class='linkify icon'></i></a>

Shipments are created from orders. A [shipment](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipments/postordersorderidshipments) represents a grouping of order line items that are shipped to a customer, and multiple shipments can be created from a single order.

The V2 Shipping API allows you to manage Shipping Zones, Shipping Methods, and Shipping Carrier Connections.

The Order Shipments resource creates a shipment for an order. You can specify the shipping provider, tracking number and shipping address id when creating a shipment.

---

<a href='#shipping_storefront-server-checkout' aria-hidden='true' class='block-anchor'  id='shipping_storefront-server-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## Storefront Checkout and Server-to-Server Checkout API

The [Storefront Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api) and [Server-to-Server Checkout APIs](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api) provide methods for managing a checkout up until the point when it is finalized into an order. Because shipments can only be created from finalized orders, a shipment cannot be created from Checkout API endpoints. 

However, both the Storefront and Server-to-Server Checkout APIs provide methods for creating a Consignment, which specifies the line items that should ship to a particular address. Creating a Consignment corresponds with the actions that a shopper might take when filling out the storefront checkout page, assigning the items in their basket to their respective shipping destinations. 

A Checkout will always have one Consignment assigned to it, which is the first shipping address. A Consignment supports multiple shipping addresses, with each address having its own line items.

---

<a href='#shipping_order-shipping-addresses' aria-hidden='true' class='block-anchor'  id='shipping_order-shipping-addresses'><i aria-hidden='true' class='linkify icon'></i></a>

## Order Shipping Addresses

The [Order Shipping Addresses](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipping-addresses) endpoint allows you to view the shipping addresses on an order. This will be the address(es) the items are shipped to.  An order can have more than one shipping address.

---

<a href='#shipping_shipping-zone-methods' aria-hidden='true' class='block-anchor'  id='shipping_shipping-zone-methods'><i aria-hidden='true' class='linkify icon'></i></a>

## Shipping Zone and Shipping Methods

[Shipping zones ](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-zones)can be configured in the control panel or using the API to designate where a merchant ships their products and which [shipping methods](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-method) should be available in each geographic region. 

An example of a shipping zone might be North America, and within that shipping zone, the shipping methods might be Free Shipping, Ship-by-Weight, and USPS.

---

<a href='#shipping_real-time-carriers' aria-hidden='true' class='block-anchor'  id='shipping_real-time-carriers'><i aria-hidden='true' class='linkify icon'></i></a>

## Real-Time Carriers

BigCommerce offers native integrations with many real-time shipping carriers such as UPS, Fedex, and USPS. The [Real-Time Carriers](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-carrier) resource allows you to connect an account for one of our natively supported shipping carrier integrations. 

For a list of all supported carriers, see [Real-Time Quote Providers](https://support.bigcommerce.com/articles/Public/Setting-Up-a-Real-Time-Shipping-Quote-Shipping-Method/#providers).

---

## Resources

### Related Endpoints
* [Storefront Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api/checkout/checkoutsconsignmentsbycheckoutidpost)
* [Server to Server Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/checkout/checkoutsconsignmentsbycheckoutidpost)
* [Order Shipping Addresses](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipping-addresses)
* [Shipping Methods](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-method/createashippingmethod)
* [Shipping Zones](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-zones/createashippingzones)
* [Real-Time Carriers](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection)
### Related Articles
* [Orders API Article](https://developer.bigcommerce.com/api-docs/orders/orders-api-overview#orders-api-overview_create-order-shipment)

