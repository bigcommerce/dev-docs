# Embedded Checkout

<div class="otp" id="no-index">

### On This Page
- [Creating a channel](#creating-a-channel)
- [Creating a site](#creating-a-site)
- [Step 3: Create a Cart](#step-3-create-a-cart)
- [Embedding the checkout](#embedding-the-checkout)
- [FAQ](#faq)
- [Additional Resources](#additional-resources)

</div>

Embedded Checkout lets you place BigCommerce’s Optimized One-Page checkout onto an external site. This tutorial will walk you through the sequence of API calls your application should make to create a working Embedded Checkout. 

This article assumes you have familiarity with the following concepts:

* Creating and managing a server-side application
* Making and receiving API calls from within your app
* Using your application to make changes to a front end

### Prerequisites

* Store API credentials with the following permissions.
	- **Carts:** `Modify`
	- **Channel Settings:** `Modify`
	- **Sites & Routes:** `Modify`
	- **Products:** `Read Only`

For more information, see [OAuth Scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

* The [BigCommerce JS Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js) must be accessible in the browser.

## Creating a channel

To allow an external website to serve the BigCommerce checkout, create a new channel by sending a `POST` request to the `/channels` endpoint.

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels`

**Create a Channel POST request**

```json
{
    "type": "storefront",
    "platform": "custom",
    "name": "https://{your-site}.com"
}
```

The response will contain an `id` which we will use as the `channel_id` in future requests.

**Create Channel response**
	
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


## Creating a site

Next, create a site for the channel by sending a `POST` request to the `/channels/id/site` endpoint.

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/channels/{{channel_id}}/site`

**Create Site POST**

```js
{
    "channel_id": 20266,
    "url": "https://www.{your-site}.com"
}
```

This returns `id` which you will use as the `site_id` in future requests. The `url` value is the base path for all other routes you define for the site.

**Create Site response**

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

To proceed to checkout, we'll need an active cart. To create one, send a `POST` request to the [Server-to-Server Cart API's](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)  `/cart` endpoint. 

**`POST`**  `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts`

**Create Cart POST request**

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

Contained in the response is an `id` which we'll use as the `cart_id` in the next request: 

**Create Cart response**
	
```json
{
    "data": {
        "id": "33608b81-ba34-4ff2-8bab-2771aeab3f73",
    ...
}
```
Next, generate cart redirect URLs by sending a `POST` request to `/carts/{{cart_id}}/redirect_urls`. 

**`POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cart_id}}/redirect_urls`
	
**Generate Redirect URLs response**

```json
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}
```

### Redirecting a logged-in customer to embedded checkout
For some use cases, you may want your customer to be logged in before they can begin the checkout process.

This can be done using the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api#logging-in-a-customer). 

Your will first need to use JSON Web Token Standard to create a new token. Use a [JWT library](https://jwt.io/#libraries-io) to accomplish this. For more information, see [Create JWT Using the Debugger Tool](https://developer.bigcommerce.com/api-docs/customers/customer-login-api#create-jwt-using-the-debugger-tool).

Next, include the `checkout_url` as part of the request payload you send to BigCommerce. 

**`POST`** `https://{store-url}}/login/token/{token}`

**Customer Login Request**

```json
{
"iss": {client_id},
"iat": 1535393113,
"jti": {uuid},
"operation": "customer_login",
"store_hash": {store_hash},
"customer_id": 2
"redirect_to": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
"request_ip": "111.222.333.444"
}
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
The `request_ip` field is optional.
</div>
</div>
</div>


## Embedding the checkout

Use the `embedded_checkout_url` that is returned from generating redirect URLs and assemble a JSON object. It will be used by the Checkout JS SDK to determine how to render the checkout. 

**JSON object**
```json
{
"containerId": "foo-bar-checkout",
"url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
    }
```

Pass the object to the `embedCheckout` method of the Checkout SDK. 


**embedCheckout method**

```js
embedCheckout({
"containerId": "foo-bar-checkout",
"url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
    });
```


This will render the checkout to an HTML element with the `id` you chose.

**HTML element**
```html
<div id="foo-bar-checkout"></div>
```

Read more about the [JSON object](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/README.md#embedcheckout) and its possible corresponding [rendering options](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutoptions.md).

## FAQ

### How can I work with Embedded Checkout locally?

One option for working locally is to install an SSL on your local machine, and then send `https://localhost.com` as the Channel site. Use the default port 443 to be able to preview your site locally.

If your channel site doesn't match the URL from which you're making a request to BigCommerce, you will get a security error in the browser and the checkout will not load. Additionally, if requests to your BigCommerce store aren't served over HTTPS, you will also see an error.

### Are hosted payment gateways supported with Embedded Checkout?
At this time you cannot embed checkout using a hosted payment gateway. See [Available Payment Gateways](https://support.bigcommerce.com/s/article/Available-Payment-Gateways#all-available) to determine which type of gateway you're using.

## Additional Resources
- [Channels API reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel)
