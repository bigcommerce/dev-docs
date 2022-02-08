# Channels Toolkit Reference

<!-- Dev Center URL: https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference -->



This article serves as a comprehensive list of all the tools in Channels Toolkit for quick reference. For a general overview of channels and developing channel apps on BigCommerce, see [Channels Introduction](/api-docs/channels/overview).

## Required endpoints

All channels must integrate the following endpoints.

| Endpoint                                                                                        | Description                                                                    |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Channels](/api-reference/cart-checkout/channels-listings-api) | Create and manage product listings for multiple storefronts and sales channels |
| [Listings](/api-reference/cart-checkout/channels-listings-api) | Create and manage product listings for multiple storefronts and sales channels |
| [Orders](/api-reference/store-management/orders)               | Get and manage order data                                                      |
| [Products](/api-reference/catalog/catalog-api)                 | Manage products, options, variants, and modifiers                              |

## Recommended endpoints

The following endpoints are recommended for most channels.

| Endpoint                                                                                                    | Description                                                    |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [Channel Currency Assignments](/api-reference/store-management/channels/channel-currency-assignments)|Manage channel specific currency settings|
| [Price Lists](/api-reference/store-management/price-lists)                 | Control variant-level pricing by channel, customer group, etc  |
| [Store Information](/api-reference/store-management/store-information-api) | Get store metadata                                             |
| [Shipping](/api-reference/store-management/shipping-api)                   | Manage how products are shipped                                |
| [Webhooks](/api-reference/webhooks)                                        | Get notified when specific events occur in a BigCommerce store |
| [Routes](/api-reference/cart-checkout/sites-routes-api)                    | Create and manage page routes for headless storefronts         |
| [Sites](/api-reference/cart-checkout/sites-routes-api)                     | Create and manage sites associated with a channel              |
| [Settings](/api-reference/store-management/settings)                       | Read global and channel specific settings                      |

## Extended functionality endpoints

The following endpoints provide extended functionality to channels.

| Endpoint | Description |
|-|-|
|[Carts](/api-reference/cart-checkout/server-server-cart-api)|Create and manage carts|
|[Checkouts](/api-reference/cart-checkout/server-server-checkout-api)|Create and manage checkouts|
|[Customers](/api-reference/store-management/customers-v3)|Create and Manage Customers, Customer Addresses, and Customer Attributes.|
|[Currencies](/api-reference/store-management/currency-api)|Manage accepted currencies and their display|
|[Coupons](/api-reference/store-management/marketing)|Manage coupons|
|[Gift Certificates](/api-reference/store-management/marketing)|Manage gift certificates|
|[Customer Login](/api-docs/customers/customer-login-api)|Use SSO to login customers|
|[Current Customer](/api-docs/customers/current-customer-api)|Securely identify current customer|
|[Order Payment Actions](/api-reference/orders/orders-transactions-api)|Authorize, capture, and void order payments|
|[Order Transactions](/api-reference/orders/orders-transactions-api)|Get order payment transaction data|

## UI components

To assist in the rapid development of apps that match the native UI and UX of the control panel, BigCommerce provides UI components and design guidelines to developers via [BigDesign](/big-design/) -- BigCommerce’s library of React components.

| Link | Description |
|-|-|
|[BigDesign Developer Playground](/big-design/)| BigDesign react component documentation and playground |
|[CodeSandbox Example](https://codesandbox.io/s/github/bigcommerce/big-design/tree/%40bigcommerce/examples%400.6.0/packages/examples)| CodeSandbox app show-casing BigDesign components|
|[Big Design Repo](https://github.com/bigcommerce/big-design)|GitHub repository for BigDesign components|
|[Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1)|Figma UI kit for BigDesign components|

### Required UI components

The following UI components are required for channels.

- [Typography](/big-design/typography)
- [Tabs](/big-design/tabs)
- [Panel](/big-design/panel)
- [Link](/big-design/link)
- [Icons](/big-design/icons)
- [Button](/big-design/button)
- [Progress Circle](/big-design/progress-circle)
- [Badge](/big-design/badge)
- [Dropdown](/big-design/dropdown)
- [Table](/big-design/table)
- [Box](/big-design/box)

### Recommended UI components

The following UI components are highly recommended for channels.

- [Alerts](/big-design/alert)
- [Form](/big-design/form)
- [Input](/big-design/input)
- [Tooltip](/big-design/tooltip)

## Documentation

| Link | Description |
|-|-|
|[Channels Overview](/api-docs/channels/channels-overview)|High-level overview of channels and developing channels apps on BigCommerce|
|[Building Channel Apps](/api-docs/channels/building-channel-apps)|In-depth technical guide to building a channel app|
|[Extending Sales Channel Apps with Channels Toolkit](/api-docs/channels/guide/extending-existing-apps)|Tutorial on intregrating Channels Toolkit into existing apps|
|[Channel App Best Practices](/api-docs/channels/guide/channel-app-best-practices)|List of best practices for channel apps|
|[Building a Storefront Channel](/api-docs/channels/tutorials/storefront)|Tutorial on creating a channel app for a headless storefront|
