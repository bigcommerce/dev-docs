# Shipping
<div class="otp" id="no-index">
	<h3> On this page </h3>
	<ul>
    <li><a href="#shipping_storefront-server-checkout">Storefront Checkout and Server to Server Checkout</a></li>
    <li><a href="#shipping_order-shipping-addresses">Order shipping addresses</a></li>
    <li><a href="#shipping_shipping-zone-methods">Shipping zone and shipping methods</a></li>
    <li><a href="#shipping_real-time-carriers">Real-time carriers</a></li>
	</ul>
</div>

You can create shipments from orders, and it is possible to create multiple shipments from a single order. A [shipment](/api-reference/orders/orders-api/order-shipments/createordershipments) represents a grouping of order line items that you can ship to a customer. 

The V2 Shipping API allows you to manage shipping zones, shipping methods, and shipping carrier connections.

The Order Shipments resource creates a shipment for an order. You can specify the shipping provider, tracking number, and shipping address id when creating a shipment.

## Storefront Checkout and Server-to-Server Checkout API

The [Storefront Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api) and [Server-to-Server Checkout APIs](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api) provide methods for managing a checkout up until the point when you finalized it into an order. Because you can only create shipments from finalized orders, you cannot create a shipment from Checkout API endpoints.

However, both the Storefront and Server-to-Server Checkout APIs provide methods for creating a Consignment, which specifies the line items that should ship to a particular address. Creating a Consignment corresponds with the actions that a shopper might take when filling out the storefront checkout page, assigning the items in their basket to their respective shipping destinations.

A Checkout will always have one Consignment assigned to it, which is the first shipping address. A Consignment supports multiple shipping addresses, with each address having its own line items.

## Order shipping addresses

The [Order Shipping Addresses](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipping-addresses) endpoint allows you to view the shipping addresses on an order. An order can have more than one shipping address.

## Shipping zone and shipping methods

You can configure [Shipping zones ](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-zones) in the control panel or use the API to designate where a merchant ships their products and which [shipping methods](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-method) should be available in each geographic region.

An example of a shipping zone might be North America, and within that shipping zone, the shipping methods might be Free Shipping, Ship-by-Weight, and USPS.

## Real-time carriers

BigCommerce offers native integrations with many real-time shipping carriers such as UPS, FedEx, and USPS. The [Real-Time Carriers](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-carrier) resource allows you to connect an account for one of our natively supported shipping carrier integrations.

For a list of all supported carriers, see [Real-Time Quote Providers](https://support.bigcommerce.com/articles/Public/Setting-Up-a-Real-Time-Shipping-Quote-Shipping-Method/#providers).

## Resources

### Related endpoints
* [Storefront Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api/checkout-consignments/checkoutsconsignmentsbycheckoutidpost)
* [Server to Server Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/checkout-consignments/checkoutsconsignmentsbycheckoutidpost)
* [Order Shipping Addresses](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipping-addresses)
* [Shipping Methods](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-method/createashippingmethod)
* [Shipping Zones](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-zones/createashippingzones)
* [Real-Time Carriers](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection)
### Related articles
* [Orders API Article](https://developer.bigcommerce.com/api-docs/orders/orders-api-overview#orders-api-overview_create-order-shipment)
