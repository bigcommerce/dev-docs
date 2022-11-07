# Big Open Data Layer

Big Open Data Layer (shortened as `BODL`, pronounced 'Bottle') is a global JavaScript object that allows BigCommerce to integrate with third-party analytics providers. This data layer collects storefront data on shopper behavior and holds data needed for an analytic provider, such as GA4, to make analytic reports. With BODL, providers can easily view and manage captured data from a standardized source. Providers can reformat the event data for their solutions.

This guide demonstrates how you can integrate a BigCommerce store with [Google Analytics (GA4)](https://support.bigcommerce.com/s/article/GA4). Using BODL, you can track when a shopper starts checkout and purchases an order. You can track events for both redirected and [embedded checkout](/api-docs/storefronts/embedded-checkout/embedded-checkout-tutorial).

## Prerequisites 
- Merchants must enable GA4 for the storefront channel to set up a provider's analytic tracking script for a storefront. GA4 is enabled for new stores by default. 
- The storefront uses a stencil theme. The native GA4 integration does not support Blueprint themes. 
- Headless storefronts are not supported.
- If the store uses Custom Checkout, then the checkout javascript code has to be manually upgraded to support BODL and GA4.
- Legacy checkout is not supported.
- Your store must have a custom domain. You must verify your site.
- Merchant must enable cookie consent tracking. Shopper must consent to browser cookies so that BigCommerce can track shopper actions.
 

## BigCommerce creates and emits events

BigCommerce will emit a browser event for events that occur from shopper action without a new page load. 

Below is the code that BigCommerce uses to create and emit an event for starting a checkout and purchasing an order. For more, see the [event emitter](https://github.com/bigcommerce/checkout-sdk-js/blob/master/packages/core/src/bodl/bodl-emitter-service.ts) from the [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js).

<!--
type: tab
title: Start checkout
-->

```js title="Create and emit browser event" lineNumbers
this.bodlEvents.emit('bodl_v1_begin_checkout', {
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
this.bodlEvents.emit('bodl_v1_order_purchased', {
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
        "bodl_v1_order_purchased"
    ]
}
```

<!-- type: tab-end -->

<!-- theme: info -->
> #### Customizing BODL
> Stencil merchants can turn off the BODL and deploy their own custom version of the BODL. In this scenario, the merchant is choosing a custom route and is expected to ensure that analytics tracking scripts still work.

## Analytic tracking scripts listen for events 

You can pull storefront data from BODL to your solution using analytic storefront tracking scripts. Your analytic scripts will need to listen to the event, take in data that are stored in BODL, and send events to GA4.  

Below is example code for your analytics script that subscribes to BODL events and sends events to GA4. For more info, consult the MDN website doc [Add Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```js title="Add event listener" lineNumbers
<script async src="https://www.googletagmanager.com/gtag/js?id=$trackingId"></script>
<script>
  function subscribeOnBodlEvents() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '$trackingId');

      if (!window || typeof window.bodlEvents === 'undefined' || typeof window.bodlEvents.checkout === 'undefined') {
          return ;
      }

      var GA_TO_BODL_CHECKOUT_EVENTS = {
          begin_checkout: 'begin_checkout',
          purchase: 'purchase',
      };

      // See docs with appropriate fields for each event here
      // https://developers.google.com/analytics/devguides/collection/ga4/reference/events
      function transformItem(item, index) {
          var transformed =  {
             item_id: item.sku || item.variant_id || item.product_id,
             item_name: item.product_name,
             currency: item.currency,
             discount: item.discount,
             index: typeof item.index !== 'undefined' ? item.index : index,
             item_brand: item.brand_name,
             item_variant: item.sku || item.product_id,
             quantity: item.quantity,
             price: item.purchase_price,
          };

          var MAX_CATEGORIES_COUNT = 5;

          if (item.category_names && Array.isArray(item.category_names)) {
              var categories = item.category_names.slice(0, MAX_CATEGORIES_COUNT);

              categories.forEach(function (category, index) {
                  var key = 'item_category' + (index ? index + 1 : '');

                  transformed[key] = category;
              });
          }

          if (item.coupon) {
              transformed.coupon = item.coupon;
          }

          return transformed;
      }

      function transformPurchasePayload(payload) {
          var coupon = Array.isArray(payload.coupon_codes) && payload.coupon_codes.length ? payload.coupon_codes[0] : '';

          var transformed = {
              transaction_id: payload.order_id || payload.transaction_id,
              currency: payload.currency,
              value: payload.cart_value,
              shipping: payload.shipping_cost,
              items: payload.line_items.map(function(item, index) {
                  if (coupon) {
                      item.coupon = coupon;
                  }
                  return transformItem(item, index);
              }),
          };

          if (coupon) {
              transformed.coupon = coupon;
          }

          if (payload.tax) {
              transformed.tax = payload.tax;
          }

          return transformed;
      }

      function transformBeginCheckoutPayload(payload) {
          var coupon = Array.isArray(payload.coupon_codes) && payload.coupon_codes.length ? payload.coupon_codes[0] : '';

          var transformed = {
              currency: payload.currency,
              value: payload.cart_value,
              items: payload.line_items.map(function(item, index) {
                  if (coupon) {
                      item.coupon = coupon;
                  }
                  return transformItem(item, index);
              }),
          }

          if (coupon) {
              transformed.coupon = coupon;
          }

          return transformed;
      }

      if (typeof window.bodlEvents.checkout.checkoutBegin === 'function') {
          window.bodlEvents.checkout.checkoutBegin(function(payload) {
              gtag('event', GA_TO_BODL_CHECKOUT_EVENTS.begin_checkout, transformBeginCheckoutPayload(payload));
          });
      }
      if (typeof window.bodlEvents.checkout.orderPurchased === 'function') {
          window.bodlEvents.checkout.orderPurchased(function(payload) {
              gtag('event', GA_TO_BODL_CHECKOUT_EVENTS.purchase, transformPurchasePayload(payload));
          });
      }
  }


window.addEventListener("load", subscribeOnBodlEvents, false)

</script>
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

| Web browser event fields | Type | Description | BigC data map | GA4 data map | Required for GA4? |
| - | - | - | - | - | - |
| `event_id` | string | Unique ID for each event instance. | Unique event ID generated by BigCommerce. Not needed for GA4. | Not sent to Google Analytics. | - |
| `channel_id` | string | The BigCommerce channel ID. | Channel ID of the channel where checkout is taking place. Not needed for GA4. | Not sent to Google Analytics. | - |
| `currency` | string | [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) of the order.  BC tracks currency for a cart and not for each line item within the cart. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `currency.code` | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `currency` | Y |
| `cart_value` | number | Final value of cart after taxes, discounts, and coupons are applied. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `cart_amount` | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `value` | Y |
| `coupon_codes[]` | array of strings | Coupon codes applied to the cart. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `coupons.code` | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `coupon` | N |
| `line_items[]` | array of `line_item` objects | Items being checked out. | See [line_item](#common-event-fields-line_item-object) object for event fields | [Begin checkout event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) <br> `items[]` | Y |


### Purchase event

When the shopper clicks on ‘Purchase’, a browser event is emitted. BODL fetches GA4's [Purchase event object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) and stores the following fields into the `bodl_v1_order_purchased` object. The `bodl_v1_order_purchased` object includes the fields listed below: 

| Web browser event fields | Type | Description | BigC data map | GA4 data map | Required for GA4? |
| - | - | - | - | - | - |
| `event_id` | string | Unique ID for each event instance. | Unique event ID generated by BigCommerce. Not needed for GA4. | Not sent to Google Analytics. | - |
| `channel_id` | string | The BigCommerce channel ID. | Channel ID of the channel where checkout is taking place. Not needed for GA4. | Not sent to Google Analytics. | - |
| `currency` | string | [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) of the order. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br>  `data.cart.currency.code` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `currency` | Y |
| `order_id` | string | Unique transaction ID generated by BigCommerce to prevent duplicate purchase records. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.order_id` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `transaction_id` | Y |
| `cart_value` | number | Final value of cart after taxes, discounts, and coupons are applied. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.cart.cart_amount_inc_tax` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `value` | Y |
| `coupon_codes[]` | array of strings | Coupon codes applied to the purchase. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.cart.coupons[].code` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `coupon` | N |
| `shipping_cost` | number | Total shipping cost including tax. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.shipping_cost_total_inc_tax` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `shipping` | N |
| `tax` | number | Tax incurred. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.tax_total` | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `tax` | N |
| `line_items[]` | array of `line_item` objects | Items being purchased. | See [line_item](#common-event-fields-line_item-object) object for event fields | [Purchase event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase) <br> `items[]` | Y |

### Common event fields: `line_item` object

For many web browser events, BODL fetches GA4's [Begin checkout item object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout_item) and [Purchase item object](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase_item) and stores them in the `line_item` object. The `line_item` object includes the fields listed below:   

| Web browser event fields | Type | Description | BigC data map | GA4 data map | Required for GA4? |
| - | - | - | - | - | - |
| `product_id` | string | ID of the product. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.id` | `item_id` <br> <br> Populate this field using the following order of availability: <br> - Variant-level SKU <br> - Product-level SKU <br> - Variant-level ID <br> - Product-level ID | Y |
| `product_name` | string | Name of the product. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.name` | `item_name` | Y |
| `sku` | string | User-defined SKU for the proeduct or variant (whichever is applied). | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.sku` or `data.variants.sku` | `item_id` | Y |
| `base_price` | number | Price of product. Default price in the control panel. The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.price` | - | N |
| `sale_price` | number | Price of product after sale. The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.sale_price` | Not sent to Google Analytics. | - |
| `retail_price` | number | Maximum suggested retail price (MSRP). The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.retail_price` | Not sent to Google Analytics. | - | 
| `purchase_price` | number | Final price of product that the shopper actually pays before taxes and other charges. Equals the `base_price` unless there is a `sale_price`. The price should include or exclude tax, based on the store settings. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.sale_price` or `data.base_price` | - | Y |
| `quantity` | number | Number of items of product purchased. | [Get a cart](/api-reference/store-management/carts/cart/getacart) <br> `data.line_items.physical_items.quantity` or <br> `data.line_items.digital_items.quantity` | `quantity` | N |
| `currency` | string | [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) for the transaction. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br>  `data.cart.currency.code`  | `currency` | N |
| `discount` | number | Discount applied to purchase. | [Get a checkout](/api-reference/store-management/checkouts/checkout/checkoutsbycheckoutidget) <br> `data.cart.discount_amount` | `discount` | N |
| `index` | integer | Position of item in a list. | - | `index` | N |
| `brand_name` | string | Brand name. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.brand_name` | `brand` | N |
| `category_names[]` | array | Category names. | [Get a product](/api-reference/store-management/catalog/products/getproductbyid) <br> `data.categories[]` | `item_category` | N |


## Resources
- [Checkout SDK JS](https://github.com/bigcommerce/checkout-sdk-js)
- [Checkout JS](https://github.com/bigcommerce/checkout-js)
- [Google Analytics 4 support article](https://support.bigcommerce.com/s/article/GA4)
- [Node.js documentation on event emitters](https://nodejs.org/api/events.html#class-eventemitter)
