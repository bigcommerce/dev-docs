# Big Open Data Layer for Storefront Analytics

<!-- theme: info -->
> Big Open Data Layer (shortened as `BODL`, pronounced 'Bottle') is a global JavaScript object that integrates BigCommerce storefronts with third-party analytics providers. 

BODL captures shopper storefront data and holds data needed for an analytics provider, such as GA4, to make analytics reports. <!-- rework this one -->

With BODL, providers can easily view and manage captured data from a standardized source. Providers can reformat the event data for their solutions.

This guide demonstrates how you can integrate a BigCommerce store with [Google Analytics (GA4)](https://support.bigcommerce.com/s/article/GA4). 
<!-- for whom? seems like this is not actionable. BC handles this for stencil stores and it is not relevant to headless implementations -->

Using BODL, you can capture shopper data at the time of any [supported event](#supported-events). You can track events for [One page checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout).

<!-- theme: info -->
> #### Supported events
> * Begin checkout - bodl_v1_begin_checkout
> * Order purchased - bodl_v1_order_purchased

## Prerequisites 

<!-- is this a list for google to know what stores this will actually work on? is this a list for agency partners to know how to configure -->
For BODL to successfully <verb> analytics to a provider, the following must be true:
- The merchant must enable the provider storefront channel must have the pro
### 
- Merchants must enable GA4 for the storefront channel to set up a provider's analytics tracking script for a storefront. GA4 is enabled for new stores by default. 
- The storefront uses a stencil theme. The native GA4 integration does not support Blueprint themes. 
- Headless storefronts are not supported.
<!-- - QQQ -- so then how does this work on redirected checkouts -- storefront is subdomain of redirected checkout, so presumably BODL  -->
- If the store uses a custom checkout, you mustthe checkout JavaScript code has to be manually upgraded to support BODL and GA4.

- The store must have a custom domain. The site is verified.
- Merchants must enable cookie consent tracking. Shoppers must consent to browser cookies so that BigCommerce can track shopper actions.

### Unsupported
- Legacy checkout is not supported.

 

## BigCommerce creates and emits events

BigCommerce will emit a browser event for events that occur from shopper action without a new page load. 

Below is the code that BigCommerce uses to create and emit an event for starting a checkout and purchasing an order. For more information, see the [event emitter](https://github.com/bigcommerce/checkout-sdk-js/blob/master/packages/core/src/bodl/bodl-emitter-service.ts) from the [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js).

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

BODL is a predefined JSON object that extracts data from events. When a merchant enables BODL, they add a BODL object to each page of a merchant store and render it as a part of the initial DOM load for all pages of all storefronts.

BODL holds the data needed for you to make analytics reports. When a shopper triggers an event, BODL fetches and stores the event and its parameters. For supported events and parameters, see [Events](#events).

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
> Stencil merchants can turn off the BODL and deploy their own custom version of the BODL. In this scenario, the merchant chooses a custom route and should ensure that analytics tracking scripts still work.

## Analytics tracking scripts listen for events 

You can pull storefront data from BODL to your solution using analytics storefront tracking scripts. Your analytics scripts will need to listen to the event, take in data stored in BODL, and send events to GA4.  

The following example code for your analytics script that subscribes to BODL events and sends events to GA4. For more info, consult the MDN website doc [Add Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```handlebars title="Add event listener" lineNumbers
<script async src="https://www.googletagmanager.com/gtag/js?id={{trackingId}}"></script>
<script>
  function subscribeOnBodlEvents() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', {{trackingId}});

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

  window.addEventListener("load", subscribeOnBodlEvents, false);

</script>
```


## Injecting scripts 

The [Scripts API](/api-docs/store-management/scripts) allows you to manage your storefront scripts. Use the [Create a Script](/api-reference/store-management/scripts/scripts/createscript) endpoint to deploy your script on a storefront. The Scripts API only works for stores with Stencil themes. You can also manually deploy scripts using the store control panel.


## Resources
- [Checkout SDK JS](https://github.com/bigcommerce/checkout-sdk-js)
- [Checkout JS](https://github.com/bigcommerce/checkout-js)
- [Node.js documentation on event emitters](https://nodejs.org/api/events.html#class-eventemitter)
