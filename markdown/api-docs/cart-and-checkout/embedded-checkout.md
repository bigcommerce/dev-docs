<h1>Embedded Checkout</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#embedded-checkout_initial-setup">Step 1: Initial Setup</a></li>
    <li><a href="#embedded-checkout_create-channel">Step 2: Create a Channel</a></li>
    <li><a href="#embedded-checkout_create-site">Step 3: Create a Site</a></li>
    <li><a href="#embedded-checkout_create-cart">Step 4: Create a Cart</a></li>
    <li><a href="#embedded-checkout_create-routes">Step 5: Create Routes</a></li>
    <li><a href="#embedded-checkout_embed-checkout">Step 6: Embed Checkout</a></li>
	</ul>
</div>

Embedded Checkout lets you place BigCommerce’s checkout onto any website. Customers will be able to check out on your site while their order information syncs simultaneously to the BigCommerce Control Panel. You can see this in action within the BigCommerce for WordPress plugin, which uses the same process described here as a checkout option for merchants. View more information on the plugin [here](https://developer.bigcommerce.com/bigcommerce-for-wordpress/getting-started/introduction).

This tutorial will walk you through creating a working BigCommerce embedded checkout on an external website.

You will need to use the Channels, Sites and Routes APIs to complete this tutorial. 

The Channels API is... The Sites API is... The Routes API is...


This tutorial will cover the sequence of API calls necessary to create an embedded checkout, but in the real-world, you'd 
this is the sequence of API calls... if you were doing it for real... talk about how these are the server side API etc

** explain problems we're solving and why to use this solution over another; call out its an iframe**

<a href='#embedded-checkout_initial-setup' aria-hidden='true' class='block-anchor'  id='embedded-checkout_initial-setup'><i aria-hidden='true' class='linkify icon'></i></a>

## 1: Initial Setup

Obtain a set of Store API credentials, which can be found [in the Control Panel of your BigCommerce store.](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials)

TODO: fix this link to style guide spec

These scopes are required for this guide:

- **Carts: Modify**\
  Enables creating carts and requesting secure redirect links to checkout
- **Channel Settings: Modify**\
  Enables creation of a channel that references the external storefront
- **Sites & Routes: Modify**\
  Enables creation of routes to be used when directing the shopper back to the site
- **Products: Read Only**\
  Enables reading information from the product catalog

We recommend limiting scopes only to what you need in your script or app. Learn more about scopes [here](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

<a href='#embedded-checkout_create-channel' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-channel'><i aria-hidden='true' class='linkify icon'></i></a>

## 2: Create a Channel

TODO: explain what channels represent; its not just a checkout running in isolation

In order to authenticate your external website to serve the BigCommerce checkout, you must first create a new Channel using the [Channels API](link).

TODO: "every outlet for selling prods needs to registered with bigcommerce"

To do this, make a POST request to `https://api.bigcommerce.com/stores/{{store_hash}}/V3/channels`

<!--
title: "POST to Channels"
subtitle: ""
lineNumbers: true
-->

**Create Channel POST**

```js
{
    "type": "storefront",
    "platform": "wordpress",
    "name": "https://my-website-address.com"
}

```

The response will be an `id` which you will use as the `channel_id` in future requests. Let's assume it's `15001` for this guide.

Once you create a Channel, it appears in your BigCommerce Control Panel under Products > Listed On. Here merchants can choose which products should be available to purchase for that channel. The Orders section will now also include a filter for your channel.

TODO: use passive voice "products can be chosen..."


<a href='#embedded-checkout_create-site' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-site'><i aria-hidden='true' class='linkify icon'></i></a>

## 3: Create a Site

Next you will need to create a site for the channel. Make a POST to `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels/{{channel_id}}/site`

TODO: include correct JSON
<!--
title: "POST to Channels"
subtitle: ""
lineNumbers: true
-->

**Create Site POST**

```js
{
    "type": "storefront",
    "platform": "wordpress",
    "name": "https://my-website-address.com"
}

```

This returns `id` which you will use as the `site_id` in future requests. The `url` value is the base path for all other routes you define for the site.

<!--
title: "Create Site Response"
subtitle: ""
lineNumbers: true
-->

**Response**

```js
{
    "channel_id": 15001,
    "url": "https://www.my-website-address.com"
}

```

<a href='embedded-checkout_create-cart' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-cart'><i aria-hidden='true' class='linkify icon'></i></a>

## 4: Create a Cart

TODO: In order to proceed to checkout, an active cart is required

You must create a cart using the [Server-to-Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) in order to display the checkout. 

Use the [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api) to obtain `product_id`s and/or `variant_id`s for the items you'll use to build a cart. [View this page](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproductbyid) for more information on using the Catalog API to GET a product.

Make a POST with your product information to the Carts endpoint: `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts`

TODO: note that you must include the channel id

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

For products without options, you only need to send `quantity` and `product_id` in a `line_items` object to create a cart.

</div>
</div>
</div>

<!--
title: "Create Cart POST"
subtitle: ""
lineNumbers: true
-->

**Create Cart POST**

```js
{
  "channel_id": 15001,
  "line_items": [
    {
      "quantity": 1,
      "product_id": 80,
      "variant_id": 64
    }
  ]
}

```

This will return a UUID format `id` that you will use as the `cart_id`.

<a href='#embedded-checkout_create-routes' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-routes'><i aria-hidden='true' class='linkify icon'></i></a>

## 5: Create Routes

TODO: explain what a route is

Create routes to redirect customers from links on your external site to the appropriate BigCommerce URLs. 


To do so, make a PUT to this endpoint: `https://api.bigcommerce.com/stores/{{store_hash}}/v3/sites/{{site_id}}/routes`

<!--
title: "Create Route PUT"
subtitle: ""
lineNumbers: true
-->

**Create Cart POST**

```js

[
    {
    "type": "product",
    "matching": "*",
    "route": "/products/"
    }
]

```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

This resource supports upsert, so you can batch upsert routes on the PUT request. POST only supports single creation.

</div>
</div>
</div>

If you don’t add a route for a certain type of entity / entities, we will default to the BigCommerce storefront URL instead.

For a full list of supported `type` values, see the [Sites & Routes API](#) documentation

<a href='embedded-checkout_embed-checkout' aria-hidden='true' class='block-anchor'  id='embedded-checkout_embed-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## 6: Embed Checkout

To generate a cart URL and set this cart as the active cart for a shopper, make a POST to:
`https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cart_id}}/redirect_urls`

Once you generate the redirect URLs they can only be used once. Your front-end should send information to your app that it can use to generate a cart and the redirect URL, and then proceed to pass the redirect URL to the `embedCheckout` method.

TODO: "Your front end should communicate to the back end application to build and manage the shopper's cart and generate the redirect URL"

<!--
title: "Response"
subtitle: ""
lineNumbers: true
-->

**Response**

```js
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}

```

Use the `embedded_checkout_url` that is returned and assemble a JSON object that will be used by the Checkout JS SDK to determine how to render the checkout.

Read more about the [JSON object](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/README.md#embedcheckout) and its possible corresponding [rendering options](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutoptions.md).

Example of the JSON object:

<!--
title: "JSON object"
subtitle: ""
lineNumbers: true
-->

**JSON Object**

```js
{
"containerId": "bc-embedded-checkout",
"url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
"styles": {
    "button": {
	"backgroundColor": "#ffffff",
	"borderColor": "#000000",
	"color": "#000000"
        }
    }
}

```

Once you have created the JSON object, create an empty `<div>` with the id attribute mapped to the value for "containerId” in the page where you want to embed the checkout.

Example: `<div id="bc-embedded-checkout"></div>`
 
Finally, we will render the checkout from your app.

TODO: fill in steps here.....

TODO: *move this to the into graf Install the BigCommerce [Checkout SDK](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk) into your project. 

`npm install --save @bigcommerce/checkout-sdk`

Then import and invoke the checkout service, and import and call the `embedCheckout` method while passing in your JSON object.


<!--
title: "External app"
subtitle: ""
lineNumbers: true
-->

**External app**

```js
import {createCheckoutService} from '@bigcommerce/checkout-sdk'
import {embedCheckout} from '@bigcommerce/checkout-sdk'

const service = createCheckoutService();

embedCheckout({
"containerId": "bc-embedded-checkout",
"url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
"styles": {
    "button": {
	"backgroundColor": "#ffffff",
	"borderColor": "#000000",
	"color": "#000000"
        }   
    }
});

```
At this point, you should have a working embedded checkout.

##FAQ

### How can I work with embedded checkout locally?

There are several things to consider when working locally. Your channel site must match the URL from which you're making a requxest to a BigCommerce store or embedded checkout will not load. Requests to your BigCommerce store must also be served over HTTPS.

There are several options you have etc etc

* Be awa FIX THIS PART `https://localhost:[port]` as the site name when you create a channel. The response will always be returned as `https://localhost`. One way of getting around this is using port 443 to serve your app. When using `https` this is what localhost will default to.

* You can also publish your app in the cloud and develop it from there. For example, you can host your app on Heroku and and set it up to [automatically deploy with GitHub](https://devcenter.heroku.com/articles/github-integration).

* Another option is to spin up a server locally.

### How does this work with logged-in customers?
Customers are handled in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer so the session is active when the checkout loads. This is done through the Customer Login API which is documented here.


