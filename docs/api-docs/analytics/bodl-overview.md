# Big Open Data Layer (BODL) - Open Beta

This functionality is currently in beta. Share your feedback with us using the [Partner Portal](https://partners.bigcommerce.com/). 

## Overview

The Big Open Data Layer (shortened as `BODL`, pronounced 'Bottle') is a JavaScript object that exposes storefront data points to BigCommerce and third-party analytics integrations. Instantiating a standard `BODL` object on a BigCommerce-hosted or headless storefront makes the site more efficient and ensures that analytics providers have access to consistent, clean page data. Because `BODL` consolidates data of interest and presents it as a package, each analytics script does not need to independently fetch the same data.

BigCommerce checks your storefront for a `BODL` instance once per page render. To ensure that the analytics providers you've chosen have the complete and correct set of data points they require, initialize a standard `BODL` instance with the following schema. If you want to make an alternate custom version of this data layer object with a unique schema, name it something else.

<!-- theme: info -->
> #### Custom BODL instances
> When you create custom `BODL` instances, we recommend choosing clear, unique names that are easy to identify programmatically: for example, `BODL_YOUR_APP_NAME`.

The first section that follows captures the standard `BODL` schema. The remainder provide example snippets for using the standard `BODL` object to supply data to third-party analytics engines. The exact methods and syntax that each analytics engine provides vary, but these examples demonstrate how `BODL` organizes information for your integration to capture. Consult the example snippets in this article to get started using `BODL` data in your integration. You can inject JavaScript snippets into a BigCommerce-hosted storefront using the [Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager?language=en_US) or the [Scripts API](/api-reference/store-management/scripts/scripts/createscript). 

## Standard BODL schema with Stencil object values

The example [initialization script](#initialize-bodl) for the standard `BODL` schema adds properties and methods in two ways. First, it captures a set of values from Stencil objects. Then, it adds methods and constructs several additional properties using the Stencil values.

Consult [Stencil object reference](/theme-objects) for more about object properties. In a headless environment, the GraphQL Storefront API can return similar information.

| BODL Property | Stencil Object |
|:---|:---|
| breadcrumbs | [{{breadcrumbs}}](/theme-objects/breadcrumbs) |
| brand | [{{brand}}](/theme-objects/brand) |
| cartId | [{{cart_id}}](/theme-objects/cart_id) |
| cartItemAdded | [{{cart.added_item}}](/theme-objects/carts) |
| categoryProducts | [{{category.products}}](/theme-objects/category) |
| categoryName | [{{category.name}}](/theme-objects/category) |
| order | [{{order}}](/theme-objects/order) |
| productId | [{{product.id}}](/theme-objects/product) |
| productTitle | [{{product.title}}](/theme-objects/product) |
| productCurrency | [{{product.price.without_tax.currency}}](/theme-objects/product) |
| productPrice | [{{product.price.without_tax.value}}](/theme-objects/product) |
| products | [{{products}}](/theme-objects/products) |
| search | [{{product_results}}](/theme-objects/product_results) |
| wishlist | [{{wishlist}}](/theme-objects/wishlist) |


A standard `BODL` instance contains the following calculated properties:

| BODL Property | First-Level Child Properties | 
|:---|:---|
| category: object | name: string, products: array |
| product: object | id: string, title: string, price: object |
| customer: object |  |

A standard `BODL` instance contains the following methods:

| BODL Method | Parameter(s) | Parameter Properties | Return Value |
|:---|:---|:---|:---|
| getCartItemContentId | `item`: object | `item.type`: string, `item.product_id`: string | If the item is a gift certificate, returns the item's `type`. Otherwise, returns the item's `product_id`.  |
| getQueryParamValue | `name`: string | **X** | Returns the value of the specified query parameter from the window's URL. |

## Initialize BODL

The following script extracts storefront data from the Stencil objects available in the front-end environment to construct a standard `BODL` object.

```handlebars title="Sample Script Code Start: Initialization Script & Page Event" lineNumbers
<script>
  if (typeof BODL === 'undefined') {
    // https://developer.bigcommerce.com/theme-objects/breadcrumbs
    {{inject "breadcrumbs" breadcrumbs}}
    // https://developer.bigcommerce.com/theme-objects/brand
    {{inject "brand" brand}}
    // https://developer.bigcommerce.com/theme-objects/category
    {{inject "categoryProducts" category.products}}
    {{inject "categoryName" category.name}}
    // https://developer.bigcommerce.com/theme-objects/product
    {{inject "productId" product.id}}
    {{inject "productTitle" product.title}}
    {{inject "productCurrency" product.price.without_tax.currency}}
    {{inject "productPrice" product.price.without_tax.value}}
    // https://developer.bigcommerce.com/theme-objects/products
    {{inject "products" products}}
    // https://developer.bigcommerce.com/theme-objects/product_results
    {{inject "search" product_results}}
    // https://developer.bigcommerce.com/theme-objects/order
    {{inject "order" order}}
    // https://developer.bigcommerce.com/theme-objects/wishlist
    {{inject "wishlist" wishlist}}
    // https://developer.bigcommerce.com/theme-objects/cart_id
    {{inject "cartId" cart_id}}
    // https://developer.bigcommerce.com/theme-objects/cart
    // (Fetching selective cart data to prevent additional payment button object html from causing JS parse error)
    {{inject "cartItemAdded" cart.added_item}}
  }
  var BODL = JSON.parse({{jsContext}});

  if (BODL.categoryName) {
    BODL.category = {
      name: BODL.categoryName,
      products: BODL.categoryProducts,
    }
  }

  if (BODL.productTitle) {
    BODL.product = {
      id: BODL.productId,
      title: BODL.productTitle,
      price: {
        without_tax: {
          currency: BODL.productCurrency,
          value: BODL.productPrice,
        },
      },
    }
  }

  BODL.getCartItemContentId = (item) => {
    switch(item.type) {
      case 'GiftCertificate':
        return item.type;
      default:
        return item.product_id;
    }
  }

  BODL.getQueryParamValue = (name) => {
    var cleanName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var cleanRegex = new RegExp('[\\?&]' + cleanName + '=([^&#]*)');
    var results = cleanRegex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Replace the following example with an analytics instantiation script for your engine of choice.
  !function (w, d, t) {
    w.SampleAnalyticsObject=t;var sampleAnalyticsProvider=w[t]=w[t]||[];sampleAnalyticsProvider.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],sampleAnalyticsProvider.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<sampleAnalyticsProvider.methods.length;i++)sampleAnalyticsProvider.setAndDefer(sampleAnalyticsProvider,sampleAnalyticsProvider.methods[i]);sampleAnalyticsProvider.instance=function(t){for(var e=sampleAnalyticsProvider._i[t]||[],n=0;n<sampleAnalyticsProvider.methods.length;n++)sampleAnalyticsProvider.setAndDefer(e,sampleAnalyticsProvider.methods[n]);return e},sampleAnalyticsProvider.load=function(e,n){var i="https://analytics.sample.com/i18n/pixel/events.js";sampleAnalyticsProvider._i=sampleAnalyticsProvider._i||{},sampleAnalyticsProvider._i[e]=[],sampleAnalyticsProvider._i[e]._u=i,sampleAnalyticsProvider._t=sampleAnalyticsProvider._t||{},sampleAnalyticsProvider._t[e]=+new Date,sampleAnalyticsProvider._o=sampleAnalyticsProvider._o||{},sampleAnalyticsProvider._o[e]=n||{},sampleAnalyticsProvider._partner=sampleAnalyticsProvider._partner||"BigCommerce";var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

    sampleAnalyticsProvider.load('<%= property_id %>');
    sampleAnalyticsProvider.page();

    // Advanced Matching
    if (BODL.customer && BODL.customer.id) {
      var customerObj = {
        email: BODL.customer.email,
      }

      if (BODL.customer.phone) {
        var phoneNumber = BODL.customer.phone;
        if (BODL.customer.phone.indexOf('+') === -1) {
          // No country code, so default to US code
          phoneNumber = `+1${phoneNumber}`;  
        }

        customerObj.phone = phoneNumber;
      }

      sampleAnalyticsProvider.identify(BODL.customer.id, customerObj);
    }
  }(window, document, 'sampleAnalyticsProvider');
</script>
```

## Add to cart

The following snippet handles the Add to Cart event by capturing data about each item added, including the product ID, the quantity added, and the price.

```handlebars title="Sample Script Code Start: Product Detail Page Add to Cart Event" lineNumbers
<script>
  document.querySelectorAll('[data-cart-item-add]').forEach(form => form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let productId, productQty;
    for (const pair of formData.entries()) {
      if (pair[0] === 'product_id') {
        productId = pair[1];
      } else if (pair[0] === 'qty[]') {
        productQty = pair[1];
      }
    }

    // References:
    // https://developer.bigcommerce.com/theme-objects/product
    // https://developer.bigcommerce.com/stencil-docs/developing-further/catalog-price-object
    sampleAnalyticsProvider.instance('<%= property_id %>').track('AddToCart', {
      content_id: BODL.product.id,
      content_category: BODL.breadcrumbs[1] ? BODL.breadcrumbs[1].name : '',
      content_type: 'product_group',
      content_name: BODL.product.title,
      quantity: productQty,
      price: BODL.product.price.without_tax.value,
      value: (BODL.product.price.without_tax.value * productQty),
      currency: BODL.product.price.without_tax.currency,
    });
    
  }));

  if (BODL.cartItemAdded) {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('AddToCart', {
      content_id: BODL.cartItemAdded.product_id,
      content_type: 'product_group',
      content_name: BODL.cartItemAdded.name,
      quantity: BODL.cartItemAdded.quantity,
      price: BODL.cartItemAdded.price.value,
      value: BODL.cartItemAdded.total.value,
      currency: BODL.cartItemAdded.price.currency,
    });
  }
</script>
```

## Add to wishlist
The following snippet handles the Add to Wishlist event. This snippet uses the `added_product_id` to capture data about the individual products a shopper adds to their wishlist. 

```handlebars title="Sample Script Code Start: Add to Wishlist" lineNumbers
<script>
  // This only sends one wishlist product: the one that was just added based on the 'added_product_id' param in the url
  if (BODL.wishlist) {
    var addedWishlistItem = BODL.wishlist.items.filter((i) => i.product_id === parseInt(BODL.getQueryParamValue('added_product_id'))).map((p) => ({
      content_id: p.product_id,
      // Commenting out: category data doesn't currently exist on wishlist items
      // content_category: p.does_not_exist, 
      content_name: p.name,
      content_type: "product_group",
      currency: p.price.without_tax.currency,
      price: p.price.without_tax.value,
      value: p.price.without_tax.value,
    }));
    
    sampleAnalyticsProvider.instance('<%= property_id %>').track('AddToWishlist', addedWishlistItem[0]);
  }
</script>
```

## Order complete
The following snippet uses the unauthenticated Storefront API to request the items from a completed order and concatenate them into a single array of physical items, digital items, and gift certificates.

```handlebars title="Sample Script Code Start: Purchase Event" lineNumbers
<script>
  fetch('/api/storefront/order/' + BODL.order.id, {
    credentials: 'same-origin'
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(orderJson) {
    var orderQty = 0;
    var lineItems = [];

    for (i = 0; i < orderJson.lineItems.physicalItems.length; i++) {
      var thisItem = orderJson.lineItems.physicalItems[i];
      orderQty += thisItem.quantity;
      lineItems.push({
        "content_id": thisItem.productId,
        "content_name": thisItem.name,
        "currency": orderJson.currency.code,
        "price": thisItem.salePrice,
        "value": thisItem.extendedSalePrice,
        "quantity": thisItem.quantity,
        "content_type": "product_group"
      });
    }

    for (i = 0; i < orderJson.lineItems.digitalItems.length; i++) {
      var thisItem = orderJson.lineItems.digitalItems[i];
      orderQty += thisItem.quantity;
      lineItems.push({
        "content_id": thisItem.productId,
        "content_name": thisItem.name,
        "currency": orderJson.currency.code,
        "price": thisItem.salePrice,
        "value": thisItem.extendedSalePrice,
        "quantity": thisItem.quantity,
        "content_type": "product_group"
      });
    }

    for (i = 0; i < orderJson.lineItems.giftCertificates.length; i++) {
      var thisItem = orderJson.lineItems.giftCertificates[i];
      orderQty += thisItem.quantity;
      lineItems.push({
        "content_id": thisItem.type,
        "content_name": thisItem.name,
        "currency": orderJson.currency.code,
        "price": thisItem.amount,
        "value": thisItem.amount,
        "quantity": thisItem.quantity,
        "content_type": "product_group"
      });
    }

    sampleAnalyticsProvider.instance('<%= property_id %>').track('Purchase', {
        "contents": lineItems,
        "value": orderJson.orderAmount,
        "quantity": orderQty,
        "currency": orderJson.currency.code
    });
  });
</script>
```

## Registration
The following snippet executes when a shopper successfully creates a new account. It initiates capture of any data the sample analytics provider collects about account registration.

```handlebars title="Sample Script Code Start: Registration" lineNumbers
<script>
  if (window.location.pathname.indexOf('/login.php') === 0 && BODL.getQueryParamValue('action') === 'account_created') {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('Registration');
  }
</script>
```

### Search
This snippet tracks when an end-user searches for products. Please take note that there is a built-in tracker for the category. However, we have commented out the tracker due to known distortions, which cause reporting of only the first category ID. For this reason, we have not provided a search example snippet. Only reactivate if needed; use it at your own risk.



### Start checkout
The following snippet is very similar to the preceding Order Complete snippet. It uses the unauthenticated Storefront API to request information from the [Get a checkout](/api-reference/storefront/checkouts/checkout/checkoutsbycheckoutidget) endpoint about the line items in a checkout and concatenate them into a single array of physical items, digital items, and gift certificates.

```handlebars title="Sample Script Code Start: Start Checkout Event" lineNumbers
<script>
  fetch('/api/storefront/checkouts/{{cart_id}}', {
    credentials: 'same-origin'
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(orderJson) {
    var orderQty = 0;
    var lineItems = [];

    for (i = 0; i < orderJson.lineItems.physicalItems.length; i++) {
      var thisItem = orderJson.lineItems.physicalItems[i];
      orderQty += thisItem.quantity;
      lineItems.push({
        "content_id": thisItem.productId,
        "content_name": thisItem.name,
        "currency": orderJson.currency.code,
        "price": thisItem.salePrice,
        "value": thisItem.extendedSalePrice,
        "quantity": thisItem.quantity,
        "content_type": "product_group"
      });
    }

    for (i = 0; i < orderJson.lineItems.digitalItems.length; i++) {
      var thisItem = orderJson.lineItems.digitalItems[i];
      orderQty += thisItem.quantity;
      lineItems.push({
        "content_id": thisItem.productId,
        "content_name": thisItem.name,
        "currency": orderJson.currency.code,
        "price": thisItem.salePrice,
        "value": thisItem.extendedSalePrice,
        "quantity": thisItem.quantity,
        "content_type": "product_group"
      });
    }

    for (i = 0; i < orderJson.lineItems.giftCertificates.length; i++) {
      var thisItem = orderJson.lineItems.giftCertificates[i];
      orderQty += thisItem.quantity;
      lineItems.push({
        "content_id": thisItem.type,
        "content_name": thisItem.name,
        "currency": orderJson.currency.code,
        "price": thisItem.amount,
        "value": thisItem.amount,
        "quantity": thisItem.quantity,
        "content_type": "product_group"
      });
    }

    sampleAnalyticsProvider.instance('<%= property_id %>').track('StartCheckout', {
        "contents": lineItems,
        "value": orderJson.orderAmount,
        "quantity": orderQty,
        "currency": orderJson.currency.code
    });
  });
</script>
```

## Subscribe to newsletter
The following snippet executes when a shopper successfully subscribes to a newsletter. It initiates capture of any data the sample analytics provider collects about newsletter subscription.

```handlebars title="Sample Script Code Start: Subscribe to Newsletter" lineNumbers
<script>
  if (window.location.pathname.indexOf('/subscribe.php') === 0 && BODL.getQueryParamValue('result') === 'success') {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('Subscribe');
  }
</script>
```

## View category
The following snippet collects data about the category that's currently part of the `BODL` instance.

```handlebars title="Sample Script Code Start: View Category Content" lineNumbers
<script>
  if (BODL.category) {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('ViewContent', {
      contents: BODL.category.products.map((p) => ({
        content_id: p.id,
        content_category: BODL.category.name,
        content_name: p.name,
        content_type: "product_group",
        currency: p.price.without_tax.currency,
        price: p.price.without_tax.value,
        value: p.price.without_tax.value,
      }))
    });
  }
</script>
```

## View product
The following snippet collects data about the product that's currently part of the `BODL` instance.

```handlebars title="Sample Script Code Start: View Product Content" lineNumbers
<script>
  if (BODL.product) {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('ViewContent', {
      content_id: BODL.product.id,
      content_category: BODL.breadcrumbs[1] ? BODL.breadcrumbs[1].name : '',
      content_name: BODL.product.title,
      content_type: "product_group",
      currency: BODL.product.price.without_tax.currency,
      price: BODL.product.price.without_tax.value,
      value: BODL.product.price.without_tax.value,
    });
  }
</script>
```
