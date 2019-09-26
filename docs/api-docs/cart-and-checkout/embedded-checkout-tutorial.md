# Embedded Checkout

<div class="otp" id="no-index">

### On This Page

- [Step 1: Create a Channel](#step-1-create-a-channel)
- [Step 2: Create a Site](#2-create-a-site)
- [Step 3: Create a Cart](#step-3-create-a-cart)
- [Step 4: Embed Checkout](#step-4-embed-checkout)
- [FAQ](#faq)

</div>

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

Embedded Checkout also requires the [BigCommerce JS Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js) to be accessible in the browser.

<a id="step-1-create-channel"></a>

## Step 1: Create a Channel

To allow the external website to serve the BigCommerce checkout, create a new Channel by sending a `POST` request to the [/channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) endpoint:

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
        "id": 20266,
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

<a id="step-2-create-site"></a>

## 2: Create a Site

Next, create a site for the channel by POSTing to the [/channels/id/site endpoint](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api/sites/post-channel-site):

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
    "url": "https://www.{your-site}.com"
}
```

This returns `id` which you will use as the `site_id` in future requests. The `url` value is the base path for all other routes you define for the site.

```js
{
    {
    "data": {
        "id": 6,
        "url": "https://www.{your-site}.com",
        "channel_id": 15001,
        "created_at": "2019-09-19T17:08:44Z",
        "updated_at": "2019-09-19T17:08:44Z"
    },
    "meta": {}
    }
}
```


<a id="step-3-create-a-cart"></a>

## Step 3: Create a Cart

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
<a id="#step-4-embed-checkout"></a>

## Step 4: Embed Checkout

Use the `embedded_checkout_url` that is returned and assemble a JSON object that will be used by the Checkout JS SDK to determine how to render the checkout. Pass the object to the `embedCheckout` method of the Checkout SDK. This will render the checkout to an HTML element with the `id` you chose.

Read more about the [JSON object](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/README.md#embedcheckout) and its possible corresponding [rendering options](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutoptions.md).


```html
<div id="foo-bar-checkout"></div>
```

```js
embedCheckout({
"containerId": "foo-bar-checkout",
"url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",

    }
});

```

At this point, you should have a working embedded checkout. 

## FAQ

### How can I work with embedded checkout locally?

If your channel site doesn't match the URL from which you're making a request to a BigCommerce, you will get a security error and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

One option to work locally is to install an SSL on your local machine, and then send `https://localhost.com` at the Channel site. Use the default port 443 to be able to preview your site locally.

### How does this work with logged-in customers?

Customers are handled in two steps. First, you need to pass the customer_id when creating the cart. Second, you need to log in the customer so the session is active when the checkout loads. This is done through the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

### Are hosted payment gateways support with Embedded Checkout?
At this time you cannot embed checkout using a hosted payment gateway. See [Available Payment Gateways](https://support.bigcommerce.com/s/article/Available-Payment-Gateways#all-available) to determine which type of gateway you're using.