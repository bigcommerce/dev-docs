# Big Open Data Layer

Big Open Data Layer (shortened as `BODL`, pronounced 'Bottle') is a global JavaScript object that allows BigCommerce to integrate with third-party analytics providers. This datalayer collects storefront data on shopper behavior and holds data needed for an analytic provider, such as GA4, to make analytic reports.  With BODL, providers can easily view and manage captured data from a standardized source. Providers can reformat the event data for their solutions.

This guide demonstrates how you can integrate a BigCommerce store with Google Analytics (GA4). Using BODL, you can track when a shopper starts checkout and purchases an order. You can track events for both redirected and embedded checkout. BigCommerce will support other events in [future phases](#future-phases).

## Prerequisites 
- Merchants must enable GA4 for the storefront channel. This sets up a provider's analytic tracking script for a storefront. GA4 is enabled for new stores by default.  
- The BigCommerce store uses a stencil theme. The native GA4 integration does not support Blueprint themes. 
- Shopper must accept cookies from the browser. 
 

## BigCommerce creates and emits events

BigCommerce will emit a browser event for events that occur from shopper action without a new page load. 

Below is the code that BigCommerce uses to create and emit an event for starting a checkout and purchasing an order. For more, see the [event emitter](https://github.com/bigcommerce/checkout-sdk-js/blob/master/packages/core/src/bodl/bodl-emitter-service.ts) from the [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js).

<!--
type: tab
title: Start checkout
-->

```js title="Create and emit browser event" lineNumbers
this.bodlEvents.emit('create_checkout_begin', {
  id,
  currency: currency.code,
  cart_value: cartAmount,
  coupon: coupons.map(coupon => coupon.code.toUpperCase()).join(','),
  line_items: this.getProducts(lineItems, currency.code)
});
```

<!--
type: tab
title: Purchase order
-->

```js title="Create and emit browser event" lineNumbers
this.bodlEvents.emit('create_order_purchased', {
  id: cartId,
  currency: currency.code,
  transaction_id: orderId,
  cart_value: orderAmount,
  coupon: coupons.map(coupon => coupon.code.toUpperCase()).join(','),
  shipping_cost: shippingCostTotal,
  line_items: this.getProducts(lineItems, currency.code),
});
```

<!-- type: tab-end -->

For reference, consult the [Event Emitter docs](https://nodejs.org/api/events.html#class-eventemitter) on the Node.js website.

## BODL fetches and stores event data

BODL is a predefined JSON object that extracts data from events. When a merchant enables BODL, BODL object is added to each page of a merchant store. BODL is rendered as a part of the initial DOM load for all pages of all storefronts. 

BODL holds data needed for you to make analytic reports. When a shopper triggers an event, BODL fetches and stores the event and its parameters. For supported events and parameters, see [Events](#events).

Below are examples of BODL after a shopper triggers a start checkout event or a purchase order event:

<!--
type: tab
title: Start checkout
-->

```json title="BODL object after start checkout event" lineNumbers
{
    "session": {
        "first_touch_referral_url": "https://store-{store_hash}.mybigcommerce.com/",
        "first_touch_request_url": "https://{store_domain}.mybigcommerce.com/",
        "first_touch_timestamp": "2022-09-22T16:21:15",
        "id": "123"
    },
    "shopper": {
        "customer_id": null,
        "email": null,
        "first_name": null,
        "last_name": null,
        "visitor_id": "" 
    },
    "data_consent": {
        "advertising": true,
        "analytics": true,
        "functional": true
    },
    "events": [
        "create_checkout_begin"
    ]
}
```

<!--
type: tab
title: Purchase order
-->

```json title="BODL object after order purchase event" lineNumbers
{
    "session": {
        "first_touch_referral_url": "https://store-{store_hash}.mybigcommerce.com/",
        "first_touch_request_url": "https://{store_domain}.mybigcommerce.com/",
        "first_touch_timestamp": "2022-09-22T16:21:15",
        "id": "123"
    },
    "shopper": {
        "customer_id": null,
        "email": null,
        "first_name": null,
        "last_name": null,
        "visitor_id": "" 
    },
    "data_consent": {
        "advertising": true,
        "analytics": true,
        "functional": true
    },
    "events": [
        "create_order_purchased"
    ]
}
```

<!-- type: tab-end -->

<!-- theme: info -->
> #### Customizing BODL
> Stencil merchants can turn off the BODL and deploy their own custom version of the BODL. In this scenario, the merchant is choosing a custom route and is expected to ensure that analytics tracking scripts still work.

## Analytic tracking scripts listen for events 

You can pull storefront data from BODL to your solution using analytic storefront tracking scripts. Your analytic scripts will need to listen to the event and take in data that are stored in BODL.  

Below is example code for your analytics script consuming the event. For more info, consult the MDN website doc [Add Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```js title="Add event listener" lineNumbers
document.addEventListener('checkout_begin', function (bodl_event) {
	analyticsScript.track(
    'Begin Checkout', { 
    currency_code: bodl_event.currency,
    coupon_code: bodl_event.coupon,
    ...
    }
  )
}, false);
```


### Injecting scripts 

The [Scripts API](/api-docs/store-management/scripts) allows you to manage your storefront scripts. Use the [Create a Script](/api-reference/store-management/scripts/scripts/createscript) endpoint to deploy your script on a storefront. The Scripts API only works for stores with Stencil themes.  

## Events

Each event has web browser parameters that are populated when a shopper triggers the event. You can send these fields to your analytics solution to create analytic reports.

For each field:  
- The BIGC Data Map provides a reference for the data value that populates a field in BODL. This does not imply that our technical architecture literally makes the referenced API call to fill out the value for BODL.
- The GA4 Data Map provides a reference for the GA4 data field whose value is supplied by BODL. 

### Start checkout event

When the shopper clicks on the button to initiate a checkout process, a browser event is emitted. BODL fetches GA4's [Begin checkout event object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) and stores the following fields into the `bodl_v1_begin_checkout` object. The `bodl_v1_begin_checkout` object includes the fields listed below: 

| Web browser event fields | Type | Description | BigC data map | GA4 data map |
| - | - | - | - | - |
| `event_id` | string | Unique ID for each event instance. | Unique event ID generated by BigCommerce. Not needed for GA4. | Not sent to Google Analytics. |
| `channel_id` | string | The BigCommerce channel ID. | Channel ID of the channel where checkout is taking place. Not needed for GA4. | Not sent to Google Analytics. |
| `currency` | string | [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) of the order.  BC tracks currency for a cart and not for each line item within the cart. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `currency.code` | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `currency` |
| `cart_value` | number | Final value of cart after taxes, discounts, and coupons are applied. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `cart_amount` | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `value` |
| `coupon_codes[]` | array of strings | Coupon codes applied to the cart. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `coupons.code` | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `coupon` |
| `line_items[]` | array of `line_item` objects | Items being checked out. | See [line_item](#common-event-fields-line-item) object for event fields | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `items[]` |


### Purchase event

When the shopper clicks on ‘Purchase’, a browser event is emitted. BODL fetches GA4's [Purchase event object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) and stores the following fields into the `bodl_v1_order_purchased` object. The `bodl_v1_order_purchased` object includes the fields listed below: 

| Web browser event fields | Type | Description | BigC data map | GA4 data map |
| - | - | - | - | - |
| `event_id` | string | Unique ID for each event instance. | Unique event ID generated by BigCommerce. Not needed for GA4. | Not sent to Google Analytics. |
| `channel_id` | string | The BigCommerce channel ID. | Channel ID of the channel where checkout is taking place. Not needed for GA4. | Not sent to Google Analytics. |
| `currency` | string | [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) of the order. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br>  `data.cart.currency.code` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `currency` |
| `order_id` | string | Unique transaction ID generated by BigCommerce to prevent duplicate purchase records. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.order_id` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `transaction_id` |
| `cart_value` | number | Final value of cart after taxes, discounts, and coupons are applied. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.cart.cart_amount_inc_tax` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `value` |
| `coupon_codes[]` | array of strings | Coupon codes applied to the purchase. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.cart.coupons[].code` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `coupon` |
| `shipping_cost` | number | Total shipping cost including tax. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.shipping_cost_total_inc_tax` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `shipping` |
| `tax` | number | Tax incurred. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.tax_total` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `tax` |
| `line_items[]` | array of `line_item` objects | Items being purchased. | See [line_item](#common-event-fields-line-item) object for event fields | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `items[]` |

### Common event fields: `line_item` object

For many web browser events, BODL fetches GA4's [Begin checkout item object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout_item) and [Purchase item object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase_item) and stores them in the `line_item` object. The `line_item` object includes the fields listed below:   

| Web browser event fields | Type | Description | BigC data map | GA4 data map |
| - | - | - | - | - |
| `product_id` | string | ID of the product. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.id` | `item_id` <br> <br> Populate this field using the following order of availability: <br> - Variant-level SKU <br> - Product-level SKU <br> - Variant-level ID <br> - Product-level ID |
| `product_name` | string | Name of the product. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.name` | `item_name` | 
| `line_items.sku` | string | User-defined SKU for the proeduct or variant (whichever is applied). | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.sku` or `data.variants.sku` | `item_id` |
| `variant_id` | string | ID of the variant. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.variants.id` |`item_variant` <br> <br> Populate this field using the following order of availability: <br> - Variant ID <br> - Variant-level SKU <br> - Product-level SKU <br> - Product-level ID |
| `base_price` | number | Price of product. Default price in the control panel. The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.price` | - |
| `sale_price` | number | Price of product after sale. The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.sale_price` | - |
| `retail_price` | number | Maximum suggested retail price (MSRP). The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.retail_price` | - |
| `purchase_price` | number | Final price of product that the shopper actually pays before taxes and other charges. Equals the `base_price` unless there is a `sale_price`. The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.sale_price` or `data.base_price` | - |
| `quantity` | number | Number of items of product purchased. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `data.line_items.physical_items.quantity` or <br> `data.line_items.digital_items.quantity` | `quantity` |
| `currency` | string | [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) for the transaction. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br>  `data.cart.currency.code`  | `currency` |
| `discount` | number | Discount applied to purchase. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.cart.discount_amount` | `discount` |
| `index` | integer | Position of item in a list. | - | `index` |
| `brand_name` | string | Brand name. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.brand_name` | `brand` |
| `category_names[]` | array | Category names. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.categories[]` | `item_category` |


## Resources
- [Checkout SDK JS](https://github.com/bigcommerce/checkout-sdk-js)
- [Checkout JS](https://github.com/bigcommerce/checkout-js)
- [Node.js documentation on event emitters](https://nodejs.org/api/events.html#class-eventemitter)