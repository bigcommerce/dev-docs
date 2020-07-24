# Embedded Checkout

<div class="otp" id="no-index">

### On This Page
- [Step 1: Create a Channel](#step-1-create-a-channel)
- [Step 2: Create a Site](#step-2-create-a-site)
- [Step 3: Create a Cart](#step-3-create-a-cart)
- [Step 4: Embed Checkout](#step-4-embed-checkout)
- [FAQ](#faq)
- [Additional Resources](#additional-resources)

</div>

Embedded Checkout lets you place BigCommerce’s Optimized One-Page checkout onto an external site. This tutorial will walk you through the sequence of API calls your application should make to create a working Embedded Checkout. 

This article assumes you have familiarity with the following concepts:

* Creating and managing a server-side application
* Making and receiving API calls from within your app
* Using your application to make changes to a front end

### Prerequisites

* Store API credentials (see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials) for details) with the following permissions:
	- **Carts:** `Modify`
	- **Channel Settings:** `Modify`
	- **Sites & Routes:** `Modify`
	- **Products:** `Read Only`

* Embedded Checkout requires the [BigCommerce JS Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js) to be accessible in the browser.

## Step 1: Create a Channel

To allow an external website to serve the BigCommerce checkout, create a new Channel by sending a request to the `/channels` endpoint.

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels`

**Create Channel POST**

```json
{
    "type": "storefront",
    "platform": "custom",
    "name": "https://{your-site}.com"
}
```

The response will contain an `id` (use this as the `channel_id` in future requests).

**Create Channel Response**
	
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


## Step 2: Create a Site

Next, create a site for the channel by sending a request to the `/channels/id/site` endpoint.

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels/{{channel_id}}/site`

**Create Site POST**

```js
{
    "channel_id": 20266,
    "url": "https://www.{your-site}.com"
}
```

This returns `id` which you will use as the `site_id` in future requests. The `url` value is the base path for all other routes you define for the site.

**Create Site Response**

```js
{
    {
    "data": {
        "id": 6,
        "url": "https://www.{your-site}.com",
        "channel_id": 20266,
        "created_at": "2019-09-19T17:08:44Z",
        "updated_at": "2019-09-19T17:08:44Z"
    },
    "meta": {}
    }
}
```

## Step 3: Create a Cart

To proceed to checkout, we'll need an active cart. To create one, send a request to the [Server-to-Server Cart API's](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)  `/cart` endpoint. 

**`POST`**  `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts`

**Create Cart POST**

```json
{
  "channel_id": 20266,
  "line_items": [
    {
      "quantity": 1,
      "product_id": 80,
      "variant_id": 64
    }
  ]
}
```

If you are creating a cart for a specific customer, pass in the `customer_id` in the request.

```json
{
  "customer_id": 42,
  "line_items": [
    {
      "quantity": 5,
      "product_id": 191
    }
  ]
}
```

Contained in the response is a `id` which we'll use as the `cart_id` in the next request: 

**Create Cart Response**
	
```json
{
    "data": {
        "id": "33608b81-ba34-4ff2-8bab-2771aeab3f73",
    ...
}
```
Next, generate cart redirect URLs and set this cart as the active cart by sending a request to `/carts/{{cart_id}}/redirect_urls`.

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cart_id}}/redirect_urls`
	
**Generate Redirect URLs Response**

```json
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}
```

### Redirecting A Logged-In Customer to Embedded Checkout
For some use cases, you may want your customer to be logged in before they can begin the checkout process.

This can be done using the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api#logging-in-a-customer). 

Your app will need to use [JSON Web Token Standard](https://jwt.io/introduction/) to create a new token. Use a [JWT library](https://jwt.io/#libraries-io) to accomplish this. Include the `checkout_url` as part of the request payload you send to BigCommerce.

**`POST`** `https://{store-url}}/login/token/{token}`

**Customer Login Request**

```json
{
"iss": {your app’s OAuth client ID},
"iat": {timestamp when the token was issued},
"jti": {randomly generated string},
"operation": "customer_login",
"store_hash": {store hash},
"customer_id": {customer id},
"redirect_to": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
"request_ip": "111.222.333.444"
}
```

The `request_ip` field is optional.

## Step 4: Embed Checkout

Use the `embedded_checkout_url` that is returned from generating redirect URLs and assemble a JSON object. It will be used by the Checkout JS SDK to determine how to render the checkout. Pass the object to the `embedCheckout` method of the Checkout SDK. This will render the checkout to an HTML element with the `id` you chose.

Read more about the [JSON object](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/README.md#embedcheckout) and its possible corresponding [rendering options](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutoptions.md).

**embedCheckout method**

```js
embedCheckout({
"containerId": "foo-bar-checkout",
"url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
    });
```

## FAQ

### How can I work with Embedded Checkout locally?

If your channel site doesn't match the URL from which you're making a request to a BigCommerce, you will get a security error in the browser and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

One option for working locally is to install an SSL on your local machine, and then send `https://localhost.com` as the Channel site. Use the default port 443 to be able to preview your site locally.

### Are hosted payment gateways supported with Embedded Checkout?
Embedded Checkout does not currently support hosted payment gateways. 

To determine which type of gateway you're using, see [Available Payment Gateways](https://support.bigcommerce.com/s/article/Available-Payment-Gateways#all-available).

## Additional Resources
- [Channels API reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel)
