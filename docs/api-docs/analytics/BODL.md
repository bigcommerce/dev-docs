# Big Open Data Layer (BODL) 

## Overview
The Big Open Data Layer (shortened as BODL, pronounced 'Bottle') is a standard used to obtain data points needed for driving storefront analytics and personalization. Having all BigCommerce and headless storefronts use this standard over time allows merchants to benefit from increased site speed and more consistent third-party analytics integrations.

## Pixel example snippets
The following is a series of example snippets of code to build on when using BODL data for your integration.

### Initialize script
This larger code snippet has a lot of built-in detection to identify where it is running within the environment; then, the code injects objects based on this detection.
  
 <!-- theme: info -->
>The check for BODL is fetched once per page render instead of once for each analytics integration. If you want to make an alternate custom version of this data layer object with a unique schema, please use a unique object name. A unique object name ensures other apps depending on this default BODL schema do not break. We recommend using `BODL_YOUR_APP_NAME` as the object name so it's unique and easy to understand.


```handlebars title="Sample Pixel Code Start: Initialization Script & Page Event" lineNumbers
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
    // https://developer.bigcommerce.com/theme-objects/wishlist
    {{inject "cartItemAdded" cart.added_item}}
    // https://developer.bigcommerce.com/theme-objects/cart
    // (Fetching selective cart data to prevent additional payment button object html from causing JS parse error)
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

  !function (w, d, t) {
    w.SampleAnalyticsObject=t;var sampleAnalyticsProvider=w[t]=w[t]||[];sampleAnalyticsProvider.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],sampleAnalyticsProvider.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<sampleAnalyticsProvider.methods.length;i++)sampleAnalyticsProvider.setAndDefer(sampleAnalyticsProvider,sampleAnalyticsProvider.methods[i]);sampleAnalyticsProvider.instance=function(t){for(var e=sampleAnalyticsProvider._i[t]||[],n=0;n<sampleAnalyticsProvider.methods.length;n++)sampleAnalyticsProvider.setAndDefer(e,sampleAnalyticsProvider.methods[n]);return e},sampleAnalyticsProvider.load=function(e,n){var i="https://analytics.Sample.com/i18n/pixel/events.js";sampleAnalyticsProvider._i=sampleAnalyticsProvider._i||{},sampleAnalyticsProvider._i[e]=[],sampleAnalyticsProvider._i[e]._u=i,sampleAnalyticsProvider._t=sampleAnalyticsProvider._t||{},sampleAnalyticsProvider._t[e]=+new Date,sampleAnalyticsProvider._o=sampleAnalyticsProvider._o||{},sampleAnalyticsProvider._o[e]=n||{},sampleAnalyticsProvider._partner=sampleAnalyticsProvider._partner||"BigCommerce";var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

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

### Add to cart

The following snippet covers tracking the Add to Cart event, actively tracking each new product ID and quantity added.

```handlebars title="Sample Pixel Code Start: Product Detail Page Add to Cart Event" lineNumbers
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
    
  }}));

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

### Add to wishlist
The following snippet is for tracking when users add an item to their wishlist. Note that this sends individual products specified by the `added_product_id` and a commented section regarding category data. We do not track category data on the wishlist, but the snippet includes it for future-proofing.

```handlebars title="Sample Pixel Code Start: Add to Wishlist" lineNumbers
<script>
  // This only sends one wishlist product: the one that was just added based on the 'added_product_id' param in the url
  if (BODL.wishlist) {
    var addedWishlistItem = BODL.wishlist.items.filter((i) => i.product_id === parseInt(BODL.getQueryParamValue('added_product_id'))).map((p) => ({
      content_id: p.product_id,
      // Commenting out as category data doesn't exist on wishlist items
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
### Order complete
This snippet pulls down a series of objects from a completed order and splits them into nested arrays for physical items, digital items, and gift certificates.

```handlebars title="Sample Pixel Code Start: Purchase Event" lineNumbers
<script>
  fetch('/api/storefront/order/{{checkout.order.id}}', {
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

### Registration

This snippet tracks account creation.

```handlebars title="Sample Pixel Code Start: Registration" lineNumbers
<script>
  if (window.location.pathname.indexOf('/login.php') === 0 && BODL.getQueryParamValue('action') === 'account_created') {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('Registration');
  }
</script>
```

### Search
This snippet tracks when an end-user searches for products. Please take note that there is a built-in tracker for the category. However, we have commented out the tracker due to known distortions, which cause reporting of only the first category ID. Only reactivate if needed; use it at your own risk.

```handlebars title="Sample Pixel Code Start: Search" lineNumbers
<script>
  if (BODL.search) {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('Search', {
      query: BODL.getQueryParamValue('search_query'),
      contents: BODL.search.products.map((p) => ({
        content_id: p.id,
        // Products can be in multiple categories.
        // Commenting out as this might distort category reports if only the first one is used.
        // content_category: p.category[0], 
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

### Start checkout
This snippet is very similar to the Order Complete snippet above in the formatting, grabbing information about all items in the cart, and separating them into physical items, digital items, and gift certificates.

```handlebars title="Sample Pixel Code Start: Start Checkout Event" lineNumbers
<script>
  fetch('/api/storefront/carts/{{cart_id}}', {
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

### Subscribe to newsletter
A snippet that tracks anytime the user successfully subscribes to a newsletter.

```handlebars title="Sample Pixel Code Start: Subscribe to Newsletter" lineNumbers
<script>
  if (window.location.pathname.indexOf('/subscribe.php') === 0 && BODL.getQueryParamValue('result') === 'success') {
    sampleAnalyticsProvider.instance('<%= property_id %>').track('Subscribe');
  }
</script>
```

### View category
A snippet that tracks when the user views a category.

```handlebars title="Sample Pixel Code Start: View Category Content" lineNumbers
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

### View product
A snippet that tracks the viewing of a product.

```handlebars title="Sample Pixel Code Start: View Product Content" lineNumbers
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
