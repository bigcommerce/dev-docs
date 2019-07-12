<h1>Cart and Checkout</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#cart-checkout_storefrix otpont-cart-and-checkout">Storefront Cart and Checkout</a></li>
    <li><a href="#cart-checkout_server-to-server-cart-and-checkout">Server-to-Server Cart and Checkout</a></li>
    <li><a href="#cart-checkout_troubleshooting">Troubleshooting Cart Errors</a></li>
	</ul>
</div>

<a href='#cart-checkout_storefront-cart-and-checkout' aria-hidden='true' class='block-anchor'  id='cart-checkout_storefront-cart-and-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## Storefront Cart and Checkout

The Storefront APIs are for managing the contents of a shopper's cart and checkout using JavaScript in the context of a storefront session. 

### Prerequisites:
The following [OAuth Scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_oauth-scopes) are required:

* Carts
* Checkouts
* Products
* Checkout Content
* Order Transactions

### When to Use the Storefront APIs

* Analytics and Tracking
* Retrieving cart data client-side
* Quick Order Form
* Upsell applications

### Using the Fetch API
The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is an alternative to [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) for making http requests in JavaScript. You can use the Fetch API to interact with the Storefront APIs and return a shopper's cart, checkout or order. 

Fetch API is supported by most modern browsers, but it is not supported in Internet Explorer. We recommend using a [Polyfill](https://github.com/github/fetch) for Internet Explorer 10+ and XMLHttpRequest for earlier versions.

To learn more about using the Fetch API with the Storefront see our tutorial [here](/api-docs/cart-and-checkout/working-sf-apis). 

You can run fetch requests from the browser console to test, or you can  use the [Scripts API](/api-docs/scripts/scripts-overview) to add inject JavaScript into your theme's footer.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Log Cart Details to the Console</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Log Cart Details to the Console"
subtitle: ""
lineNumbers: true
-->

```html
<script>
console.log('Log Cart');
fetch('/api/storefront/cart', {
  credentials: 'include'
}).then(function(response) {
  return response.json();
}).then(function(myJson) {
  console.log(myJson);
});
</script>
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Log Checkout Details to the Console</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Log Checkout Details to the Console"
subtitle: ""
lineNumbers: true
-->

```html
<script>
console.log('Log Checkout');
fetch('/api/storefront/cart?includes=consignments.availableShippingOptions', {
        credentials: 'include'
      })
      .then(function(response) {
        return response.json();
      }).then(function(cartJson) {
        console.log(cartJson);
        return cartJson[0].id;
      }).catch(function(error) {
        console.log(error);
      }).then(function(cartId) {
        fetch('/api/storefront/checkouts/' + cartId, {
          credentials: 'include'
        }).then(function(response) {
          return response.json();
        }).then(function(checkoutJson) {
          console.log(checkoutJson);
        }).catch(function(error) {
          console.log(error);
        })
      });

</script>
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Log Order Details to the Console</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Log Order Details to the Console"
subtitle: ""
lineNumbers: true
-->

```html
<script>
console.log("Log Order");
fetch('/api/storefront/order/{{checkout.order.id}}', {credentials: 'include'})
.then(function(response) {
return response.json();
})
.then(function(myJson) {
console.log(myJson);
});
</script>
```

---

<a href='#cart-checkout_server-to-server-cart-and-checkout' aria-hidden='true' class='block-anchor'  id='cart-checkout_server-to-server-cart-and-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## Server-to-Server Cart and Checkout

The Server-to-Server APIs are for managing the contents of a shopping cart and checkout remotely, from a server. Using the Cart, Checkout and Payment API allows for a fully headless ecommerce solution.

### CaaS

[Commerce-as-a-Service](https://www.bigcommerce.com/commerce-as-a-service/) is made possible with the Server-to-Server APIs. It lets the underlying cart, checkout, order and payment APIs be called from a separate app, allowing you to create a completely custom checkout without ever touching the BigCommerce storefront.


## When to Use
* Modifying cart contents, such as price matching
* Taking a shopper through cart and checkout using an app
* Quote Builder - Building a cart then restoring it on the storefront
* Native mobile apps
* Pre-filling customer information

---

<a href='#cart-checkout_troubleshooting' aria-hidden='true' class='block-anchor'  id='cart-checkout_troubleshooting'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting Cart Errors
We will go over common Storefront Cart and Checkout as well as Server to Server Cart and Checkout errors. Each scenario will include the error message and how to fix the error. The most common errors are listed below.

### Please create some text for the API option [422]
*Server to Server Cart API*

***Issue:*** When a cart is created containing a product that has an incorrect or missing text modifier. 

***Resolution:***
Options and modifiers refer to a list of choices on a product. Options are used to build out variants and modifiers are not tied to variants at all. To learn more about options and modifiers see [Products Overview](/api-docs/catalog/products-overview#products-overview_modifier-options).

To add a product to the cart that has a single modifier (text field), POST to the [Cart API](/api-reference/cart-checkout/server-server-cart-api/cart/createacart) without the `variant_id`. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Single Modifier</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Single Modifier"
subtitle: ""
lineNumbers: true
-->

```json

{
  "line_items": [
    {
      "quantity": 1,
      "product_id": 1001,
      "option_selections": [
        {
          "option_id": 123,
          "option_value": "Hello!"
        }
      ]
    }
  ]
}

```

To add a product to the cart that has one option (radio button)  associated with it, use just the `variant_id` in the request. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Single Option</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Single Option"
subtitle: ""
lineNumbers: true
-->

```json
{
  "line_items": [
    {
      "quantity": 1,
      "product_id": 1001,
      "variant_id": 2331
    }
]
}
```

To add a product that has both an option and a modifier associated with it, then use the `option_id` and `option_value`. This example uses a radio button (option) and a text field (modifier).

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Modifier and Option</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Modifier and Option"
subtitle: ""
lineNumbers: true
-->

```json
{
  "line_items": [
    {
      "quantity": 1,
      "product_id": 101,
      "option_selections": [
        {
          "option_id": 231,
          "option_value": 456
        },

        {
          "option_id": 123,
          "option_value": "Hello!"
        }
      ]
    }
  ]

```

### Missing line_items in request body [422]

*Server to Server Cart API*

***Issue:*** 
When a required product modifier is missing. A product can have a modifier that is not required. In those cases the product can be added to a cart without the modifier. 

***Resolution:***
Use the [Get Products](/api-reference/catalog/catalog-api/products/getproducts) or [Get Modifier](/api-reference/catalog/catalog-api/product-modifiers/getmodifiers) endpoints to return the modifier ID. The `modifier_id` = `option_id`. 

To create a cart with a product modifier:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Create cart with modifier</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Create cart with modifier"
subtitle: ""
lineNumbers: true
-->

```

{
  "line_items": [
    {
      "quantity": 1,
      "product_id": 1001,
      "option_selections": [
        {
          "option_id": 123,
          "option_value": "Hello!"
        }
      ]
    }
  ]
}

```

### A shipping address for this order is incomplete [422]
*Server to Server Cart API*

***Issue:***
This can return when the customer ID of a cart has changed. 

***Resolution:***
The customer ID is linked to discounts and pricing available to that customer. If that is changed then anything that affects the cart price is invalidated. This includes coupons, discounts, taxes and shipping.

A cart should be created with the `customer_id` as part of the request body. Use the [Get Customers](/api-reference/customer-subscribers/customers-api/customers/getallcustomers) endpoint to get the `customer_id`. 

To create a cart with a `customer_id`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Create cart with customer ID</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Create cart with customer ID"
subtitle: ""
lineNumbers: true
-->

```json
{
  “customer_id”: 12,
  "line_items": [
    {
      "quantity": 5,
      "product_id": 191
    }
  ]
}

```

### This product has options, variant ID is required [422]
*Server to Server Cart API*

***Issue:***  When a product has options and variant ID is not supplied in either the create or update cart request. 

***Resolution:***
To get the variant ID use the [Get Products](/api-reference/catalog/catalog-api/products/getproducts) endpoint or the [Get Variants](/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid) endpoint.
To create a cart with a variant ID:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Create cart with variant ID</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Create cart with variant ID"
subtitle: ""
lineNumbers: true
-->

```json
{
  "line_items": [
    {
      "quantity": 1,
      "product_id": 1001,
      "variant_id": 2331
    }
]
}
```

***Issue:***
The incorrect `option_id` is supplied.

***Resolution:***
To get the correct option_id make a request to [Get Products
](/api-reference/catalog/catalog-api/products/getproducts) or [Get Options](/api-reference/catalog/catalog-api/product-variant-options/getoptions). 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Create cart option ID</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Create cart option ID"
subtitle: ""
lineNumbers: true
-->

```
{
  "line_item": {
    "quantity": 1,
    "product_id": 76,
    "list_price": 170.00,
    "option_selections": [
      {
        "option_id": 21506,
        "option_value": 10090
      }
    ]
  }
}

```

*Storefront Cart API*

***Issue:***

* Missing required modifier on the storefront. This can include a text modifier with no selection. Make sure the optionValue is not blank.
* The variantID is incorrect.
* The modifierID is incorrect.


**Resolution:**
To add a product to the cart that has a single modifier (text field), POST to the [Cart API](/api-reference/cart-checkout/storefront-cart-api/cart/createacart) without the `variant_id`. Use the `optionId` and `optionValue` instead. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Create cart optionId and optionValue</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Create cart optionId and optionValue"
subtitle: ""
lineNumbers: true
-->

```json
{
  "lineItems": [
    {
      "quantity": 1,
      "product_id": 1001,
      "optionSelections": [
        {
          "optionId": 123,
          "optionValue": "Hello!"
        }
      ]
    }
  ]
}
```

To add a product to the cart that has one option (radio button)  associated with it, use just the `variant_id` in the request. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Create Storefront Cart variantID</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Create Storefront Cart variantID"
subtitle: ""
lineNumbers: true
-->

```json
{
  "lineItems": [
    {
      "quantity": 1,
      "productId": 1001,
      "variantId": 2331
    }
]
}
```

To add a product that has both an option and a modifier associated with it, then use the `option_id` and `option_value`. This example uses a radio button (option) and a text field (modifier).

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Add item with option and modifier</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Add item with option and modifier"
subtitle: ""
lineNumbers: true
-->

```json
{
  "lineItems": [
    {
      "quantity": 1,
      "product_id": 101,
      "optionSelections": [
        {
          "optionId": 231,
          "optionValue": 456
        },

        {
          "optionId": 123,
          "optionValue": "Hello!"
        }
      ]
    }
  ]
}
```

### You can only purchase a maximum of :qty of the :product per order [409]
*Server to Server Cart API*

***Issue:***
When less than a product’s minimum required purchase or more than the maximum allowed purchase is added to cart.

***Resolution:***
Check the product for `order_quantity_minimum` and `order_quantity_maximum `for the correct amount to add the cart. Use the [Get Product](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts) endpoint.

### Internal Server Error [500]

*Server to Server Cart API* 

***Issue:***
Adding more product quantity to a cart than what’s in stock. 

***Resolution:***
Check the product for `inventory_level` to see how many are in stock. Use the [Get Product](/api-reference/catalog/catalog-api/products/getproducts) endpoint.

***Issue:***
Trying to edit a Cart that does not exist. 

***Resolution:***
Carts are only valid 30 days past the `date_last_modified`. Check the [Get Carts](/api-reference/cart-checkout/storefront-cart-api/cart/getacart) endpoint for the current available session cart.

*Storefront Cart API*

***Issue:***
When less than a product’s minimum required purchase or more than the maximum allowed purchase is added to cart. Use the [Get Product](/api-reference/catalog/catalog-api/products/getproducts) endpoint to check for min/max purchase restrictions.

***Resolution:***
Check the product for order_quantity_minimum and order_quantity_maximum for the correct amount to add the cart. Use the [Get Product](/api-reference/catalog/catalog-api/products/getproducts) endpoint.

---


## Resources

### Related Articles
* [Working with the Storefront Cart and Checkout](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis)

### Available Webhooks
* [Orders](/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders)
* [SKU](/api-docs/getting-started/webhooks/webhook-events#webhook-events_sku)
* [Cart](/api-docs/getting-started/webhooks/webhook-events#webhook-events_cart)

### Related Endpoints
* [Storefront Cart](/api-reference/cart-checkout/storefront-cart-api)
* [Storefront Checkout](/api-reference/cart-checkout/storefront-checkout-api)
* [Server-to-Server Cart](/api-reference/cart-checkout/server-server-cart-api)
* [Server-to-Server Checkout](/api-reference/cart-checkout/server-server-checkout-api)

