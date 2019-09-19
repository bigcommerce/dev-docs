# Embedded Checkout

<div class="otp" id="no-index">

### On This Page

* [Step 1: Create a Channel](#step-1-create-channel)
* [Step 2: Create a Site](#step-2-create-site)
* [Step 3: Create a Cart](#step-3-create-cart)
* [Step 4: Embed Checkout](#step-4-embed-checkout)

Embedded Checkout lets you place BigCommerce’s Optimized One-Page checkout onto an external site. This tutorial will walk you through the sequence of API calls your application should make to create a working Embedded Checkout. 

This article assumes you have familiarity with the following concepts:

* Creating and managing a server-side application
* Making and recieving API calls from within your app
* Using your application to make changes to a front end

---

### Prerequisites

* Store API credentials (see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials) for details) with the following permissions:
	- **Carts:** `Modify`
	- **Channel Settings:** `Modify`
	- **Sites & Routes:** `Modify`
	- **Products:** `Read Only`

## Step 1: Create a Channel

To allow the external website to serve the BigCommerce checkout, create a new Channel by sending a `POST` request to the [/channels](/path/to/reference) endpoint:

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/V3/channels`

```json
{
    "type": "storefront",
    "platform": "custom",
    "name": "https://{your-site}.com"
}
```

The response will contain an `id` (use this as the`channel_id` in future requests):
	
```json

{
    "data": {
        "id": 20244,
        "name": "https://www.{your-site}.com",
        "platform": "custom",
        "type": "storefront",
        "date_created": "2019-09-18T22:28:36Z",
        "date_modified": "2019-09-18T22:28:36Z",
        "external_id": "",
        "is_enabled": true
    },
    "meta": {}
}
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
> Channels created via API are visible in the BigCommerce store's Control Panel in **Products** > **Listed On**. The Orders section will now also include a filter for your channel.

</div>
</div>
</div>

## 3: Create a Site

Next, create a site for the channel by POSTing to the [/channels/id endpoint](/path/to/reference):

*`POST`* `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels/{{channel_id}}/site`

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

## Step 4: Create a Cart

To proceed to checkout, we'll need an active cart. To create one, send a `POST` request to the [Server-to-Server Cart API's](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)  `/cart` endpoint: 

**`POST`**  `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts`

```json
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

Contained in the response is a `UUID` which is we'll as the `cart_id` in the next request: 
	
```json
{
	// example
}
```
	
Next, generate a cart URL and set this cart as the active cart by posting to  to `/carts/{{cart_id}}/redirect_urls`:

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cart_id}}/redirect_urls`
	
**Response**

```json
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}
```

## Step 5: Embed Checkout

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

## FAQ

### How can I work with embedded checkout locally?

If your channel site doesn't match the URL from which you're making a request to a BigCommerce, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

One option to work locally is to install an SSL on your local machine, and then send `https://localhost.com` at the Channel site. Use the default port 443 to be able to preview your site locally.

### How does this work with logged-in customers?

Customers are handled in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer so the session is active when the checkout loads. This is done through the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).