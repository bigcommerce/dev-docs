# Channels Toolkit Reference

<div class="otp" id="no-index">

### On this Page
- [Documentation](#documentation)
- [Endpoints](#endpoints)
- [UI Components](#ui-components)
- [User Flows](#user-flows)

</div>

The Channel Toolkit is a set of APIs, UI components, patterns, and app frameworks that provide partners and 3rd party developers with the ability to build integrations between BigCommerce and external sales channels. This article serves as a comprehensive list of all the tools in the toolkit for quick reference. For a general overview of channels and developing channel apps on BigCommerce, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview).

## Documentation

| Link | Description |
|-|-|
|[Channels Overview](https://developer.bigcommerce.com/api-docs/channels/channels-overview)|High-level overview of channels and developing channels apps on BigCommerce|
|[Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps)|In-depth technical guide to building a channel app|
|[Channels Toolkit Reference](https://developer.bigcommerce.com/api-docs/channels-toolkit-reference)|Channels toolkit quick reference|

## Endpoints

**Required for Channel Apps:**

| Endpoint | Description |
|-|-|
|[Channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)|Create and manage product listings for multiple storefronts and sales channels|
|[Listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)|Create and manage product listings for multiple storefronts and sales channels|
|[Orders](https://developer.bigcommerce.com/api-reference/store-management/orders)|Get and manage order data|
|[Products](https://developer.bigcommerce.com/api-reference/catalog/catalog-api)|Manage products, options, variants, and modifiers|

**Recommended for Channel Apps:**

| Endpoint | Description |
|-|-|
|[Price Lists](https://developer.bigcommerce.com/api-reference/store-management/price-lists)|Control variant-level pricing by channel, customer group, etc|
|[Store Information](https://developer.bigcommerce.com/api-reference/store-management/store-information-api)|Get store metadata|
|[Shipping](https://developer.bigcommerce.com/api-reference/store-management/shipping-api)|Manage how products are shipped|
|[Webhooks](https://developer.bigcommerce.com/api-reference/webhooks)|Get notified when specific events occur in a BigCommerce store|
|[Routes](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)|Create and manage page routes for headless storefronts|
|[Sites](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)|Create and manage sites associated with a channel|

**Extended Functionality:**

| Endpoint | Description |
|-|-|
|[Carts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)|Create and manage carts|
|[Checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)|Create and manage checkouts|
|[Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)|Create and Manage Customers, Customer Addresses, and Customer Attributes.|
|[Currencies](https://developer.bigcommerce.com/api-reference/store-management/currency-api)|Manage accepted currencies and their display|
|[Coupons](https://developer.bigcommerce.com/api-reference/store-management/marketing)|Manage coupons|
|[Gift Certificates](https://developer.bigcommerce.com/api-reference/store-management/marketing)|Manage gift certificates|
|[Customer Login](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)|Use SSO to login customers|
|[Current Customer](https://developer.bigcommerce.com/api-docs/customers/current-customer-api)|Securely identify current customer|
|[Order Payment Actions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)|Authorize, capture, and void order payments|
|[Order Transactions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)|Get order payment transaction data|

## UI Components

| Link |
|-|
|[BigDesign Developer Playground](https://developer.bigcommerce.com/big-design/)|
|[CodeSandbox Example](https://codesandbox.io/s/github/bigcommerce/big-design/tree/%40bigcommerce/examples%400.6.0/packages/examples)|
|[GitHub Repo](https://github.com/bigcommerce/big-design)|
|[Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1)|
|[Example App](https://github.com/bigcommerce/channels-app/)|

For a complete reference of all BigCommerce API endpoints, see: [API Reference](https://developer.bigcommerce.com/api-reference).

## User Flows
* **Onboarding** - user flows that enable a merchant to connect their BC store to an external channel, inclusive of creating an account on the external channel if needed.
  * Channel configuration
  * Settings
* **Catalog Management** - user flows that enable a merchant to manage their product catalog data between their BC store and external channels, inclusive of product, inventory, and pricing information.
  * Import
  * Export
  * Per product listing
  * Inventory
* **Order Management** - user flows that enable a merchant to manage orders between their BC store and external channels.
  * Orders
  * Shipping
* **Notifications** - user flows that enable a merchant to easily find and manage important notifications related to their channel, inclusive of errors, warnings, and general helpful notifications, such as pending channel updates or changes.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwODg3NDY2MTIsNzMwOTk4MTE2XX0=
-->
