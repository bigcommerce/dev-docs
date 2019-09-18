<h1>Embedded Checkout Overview</h1>
<div class="otp" id="no-index">
### On This Page

* [iFrame](#cart-checkout_iFrame)
* [Channels, Sites and Routes](#cart-checkout_channels-sites-routes)
* [BigCommerce Checkout SDK](#cart-checkout_embed-checkout-sdk)
* [Logged-In Customers](#cart-checkout_logged-in-customers)

</div>

Embedded Checkout lets you place BigCommerce’s checkout onto any website. Customers can check out on an external storefront while their order information syncs simultaneously to the BigCommerce Control Panel. You can see this in action within the BigCommerce for WordPress plugin, which uses the same process described here as a checkout option for merchants. View more information about the plugin in the article [BigCommerce for Wordpress](https://developer.bigcommerce.com/bigcommerce-for-wordpress/getting-started/introduction).

<a href='#cart-checkout_channels-sites-routes' aria-hidden='true' class='block-anchor'  id='cart-checkout_channels-sites-routes'><i aria-hidden='true' class='linkify icon'></i></a>

## Channels, Sites and Routes

You will need to use the [Channels, Sites and Routes](#) APIs to embed checkout. The Channels API allows you to create and manage sales channel listings across a merchant's product catalog. A channel can be a marketplace, like Amazon, or an external storefront, like a WordPress site. The Sites and Routes APIs let you set an external storefront domain and define the paths for important pages, like the home page, cart page, or checkout page. The site and routes are used to link back to the proper URL from invoice emails and storefront links.

<a href='#cart-checkout_iframe' aria-hidden='true' class='block-anchor'  id='cart-checkout_iframe'><i aria-hidden='true' class='linkify icon'></i></a>

## iFrame

Embedded Checkout uses an HTML `<iframe>` to display a BigCommerce's PCI compliant Optimized One-Page Checkout on non-BigCommerce web pages.

If your channel site doesn't match the URL from which you're making a request to a BigCommerce, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

<a href='#cart-checkout_embed-checkout-sdk' aria-hidden='true' class='block-anchor'  id='cart-checkout_embed-checkout-sdk'><i aria-hidden='true' class='linkify icon'></i></a>

## BigCommerce Checkout SDK

Embedded Checkout requires the BigCommerce Checkout SDK to invoke a method that can render the checkout in your app. Learn more about the [Checkout SDK](https://developer.bigcommerce.com/api-docs/cart-and-checkout/checkout-sdk).

<a href='#embedded-checkout_prerequisites' aria-hidden='true' class='block-anchor'  id='embedded-checkout_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Logged-In Customers

Customers are handled in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer so the session is active when the checkout loads. This is done through the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

<a href='cart-checkout_logged-in-customers' aria-hidden='true' class='block-anchor'  id='cart-checkout_logged-in-customers'><i aria-hidden='true' class='linkify icon'></i></a>

## 1: Prerequisites

### Credentials

Obtain a set of Store API credentials, which can be found in the Control Panel of your BigCommerce store. See [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials) for details.

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

### Create React App

This tutorial uses several npm packages to build an embeddable checkout. First we will spin up a basic [React](https://reactjs.org) application that we'll use as a starting point. Run the following in your shell:

<!--
title: "Create react app"
subtitle: ""
lineNumbers: true
-->

```shell
npx create-react-app bc-embedded-checkout

cd bc-embedded-checkout

npm start
```

### BigCommerce Checkout SDK
Install the BigCommerce Checkout SDK to invoke a method that can render the checkout in your app.

In your project folder, run the following in your shell:

<!--
title: "Install Checkout SDK"
subtitle: ""
lineNumbers: true
-->

```shell
npm install --save @bigcommerce/checkout-sdk

```

### Heroku

We'll be deploying this app on [Heroku](https://heroku.com). Create a new app and give it a name. We will use the app's public URL to create a Channel in the next step.

<a href='#embedded-checkout_create-channel' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-channel'><i aria-hidden='true' class='linkify icon'></i></a>

## 2: Create a Channel

In order to allow your external website to serve the BigCommerce checkout, you must first create a new Channel using the Channels API.

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
    "platform": "custom",
    "name": "https://bc-react.herokuapp.com"
}

```

The response will be an `id` which you will use as the `channel_id` in future requests. Let's assume it's `15001` for this guide.

Once you create a Channel, it appears in your BigCommerce Control Panel under Products > Listed On. Here products can be chosen to be listen on each desired channel. The Orders section will now also include a filter for your channel.

<a href='#embedded-checkout_create-site' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-site'><i aria-hidden='true' class='linkify icon'></i></a>

## 3: Create a Site

Next you will need to create a site for the channel. Make a POST to `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels/{{channel_id}}/site`

<!--
title: "POST to Channels"
subtitle: ""
lineNumbers: true
-->

**Create Site POST**

```js
{
    "channel_id": 15001,
    "url": "https://bc-react.herokuapp.com"
}

```

This returns `id` which you will use as the `site_id` in future requests. The `url` value is the base path for all other routes you define for the site.


<a href='embedded-checkout_create-cart' aria-hidden='true' class='block-anchor'  id='embedded-checkout_create-cart'><i aria-hidden='true' class='linkify icon'></i></a>

## 4: Create a Cart

In order to proceed to checkout, an active cart is required. You'll use the [Server-to-Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) to generate it.

We'll also use the [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api) to obtain `product_id`s and/or `variant_id`s for the items we need to build a cart. See [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproductbyid) for more information on how to GET a product.

Make the POST with your product information to the Carts endpoint: `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts`

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

Next we'll create routes to redirect customers from links on your external site to the appropriate BigCommerce URLs.

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
    type: "product",
    matching: "*",
    route: "/products/"
  }
];
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

This resource supports upsert, so you can batch upsert routes on the PUT request. POST only supports single route creation.

</div>
</div>
</div>

If you don’t add a route for a certain type of entity / entities, we will default to the BigCommerce storefront URL instead.

For a full list of supported `type` values, see the [Sites & Routes API](#) documentation

<a href='embedded-checkout_embed-checkout' aria-hidden='true' class='block-anchor'  id='embedded-checkout_embed-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## 6: Embed Checkout

To generate a cart URL and set this cart as the active cart for a shopper, make a POST to:
`https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cart_id}}/redirect_urls`

Once you generate the redirect URLs they can only be used once. 
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

Once you have created the JSON object, in your app project folder navigate to `public > index.html`. Create an empty `<div>` with the id attribute mapped to the value for `containerId` in the page where you want to embed the checkout.

Example: `<div id="bc-embedded-checkout"></div>`

Finally, we will render the checkout from your app. Import and invoke the checkout service, and import and call the `embedCheckout` method while passing in your JSON object.

<!--
title: "External app"
subtitle: ""
lineNumbers: true
-->

**App.js**

```js
import React from 'react';
import './App.css';
import {createCheckoutService} from '@bigcommerce/checkout-sdk'
import {embedCheckout} from '@bigcommerce/checkout-sdk'

const service = createCheckoutService();


class App extends React.Component {
componentDidMount(){
  embedCheckout({
    "containerId": "bc-embedded-checkout",
    "url": "https://my-site.com/cart.php?embedded=1&action=loadInCheckout&id=9a988ee4-be1e-4fbd-9e3c-5cc32df42cbd&token=bccc9a5e9691a7d30267a3188c238d7a22d2d9685734e926cf4c261f7c83de13",
    "styles": {
      "button": {
        "backgroundColor": "#ffffff",
        "borderColor": "#000000",
        "color": "#000000"
      }
    }
  })
 }
 render(){
   return <h1>BC Embedded Checkout</h1>
 }
}

export default App;
```

At this point, you should have a working embedded checkout. 

##FAQ

### How can I work with embedded checkout locally?

If your channel site doesn't match the URL from which you're making a request to a BigCommerce, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

One option to work locally is to install an SSL on your local machine, and then send `https://localhost.com` at the Channel site. Use the default port 443 to be able to preview your site locally.

### How does this work with logged-in customers?

Customers are handled in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer so the session is active when the checkout loads. This is done through the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

