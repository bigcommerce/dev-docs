# Channels Toolkit Reference

<div class="otp" id="no-index">

### On this Page
- [Documentation](#documentation)
- [Endpoints](#endpoints)
- [UI Components](#ui-components)
- [User Flows](#user-flows)

</div>

The Channel Toolkit is a set of APIs, UI components, patterns, and app frameworks that provide partners and 3rd party developers with the ability to build integrations between BigCommerce and external sales channels. This article serves as a comprehensive list of all the tools in the toolkit for quick reference. For a general overview of channels and developing channel apps on BigCommerce, see [Channels Overview]().

## Documentation

| Link | Description |
|-|-|
|[Channels Overview]()|High-level overview of channels and developing channels apps on BigCommerce|
|[Building Channel Apps]()|In-depth technical guide to building a channel app|
|[Building Cannel Apps for POS]()|In-depth technical guide to building an app for Point-of-Sale channels|
|[Channels Toolkit Reference]()|Channels toolkit quick reference|

## Endpoints

**Required for Channel Apps:**

| Endpoint | Description |
|-|-|
|[Channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)||
|[Listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)||
|[Orders](https://developer.bigcommerce.com/api-reference/store-management/orders)||
|[Products](https://developer.bigcommerce.com/api-reference/store-management/catalog)||

**Recommended for Channel Apps:**

| Endpoint | Description |
|-|-|
|[Price Lists](https://developer.bigcommerce.com/api-reference/store-management/price-lists)||
|[Store Information](https://developer.bigcommerce.com/api-reference/store-management/store-information-api)||
|[Shipping](https://developer.bigcommerce.com/api-reference/store-management/shipping-api)||
|[Webhooks](https://developer.bigcommerce.com/api-reference/webhooks)||
|[Routes](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)||
|[Sites](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)||

**Extended Functionality:**

| Endpoint | Description |
|-|-|
|[Carts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)||
|[Checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)||
|[Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)||
|[Currencies](https://developer.bigcommerce.com/api-reference/store-management/currency-api)||
|[Coupons](https://developer.bigcommerce.com/api-reference/store-management/marketing)||
|[Gift Certificates](https://developer.bigcommerce.com/api-reference/store-management/marketing)||
|[Customer Login](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)||
|[Current Customer](https://developer.bigcommerce.com/api-docs/customers/current-customer-api)||
|[Order Payment Actions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)||
|[Order Transactions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api)||

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