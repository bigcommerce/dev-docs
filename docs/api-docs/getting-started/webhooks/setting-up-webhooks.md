# Webhooks Tutorial

<div class="otp" id="no-index">

### On this page

- [Create an Express app](#create-an-express-app)
- [Start the app](#start-the-app)
- [Create a webhook](#create-a-webhook)

- [Trigger the webhook event](#trigger-the-webhook-event)
- [Adding custom headers](#adding-custom-headers)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

</div>

In this tutorial, we'll create a Node.js Express app that handless webhook callbacks and uses [ngrok](https://ngrok.com/) (ngrok.com) to expose the app to the Internet. Then, we'll create a webhook and observe the callback using the ngrok web interface when the event is triggered.


### Prerequisites

- [API Access Token](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication) with [scope](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes) set to **Information & Settings** read-only and **Products** read-only.
- [Webhooks Overview](https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview)
- Familiarity with working in the terminal
- Familiarity working with `node` and `npm`
## Create an Express app

First, let's make a `webooks-test` directory and initialize a Node.js Express app inside of it. To do so, run the following commands in the terminal.


```bash
mkdir webhooks-test         # Create project directory

cd webhooks-test            # Move into project directory

npm init                    # Initialize a Node.js project (hit return to accept the default values)


npm install express --save  # Install express

npm install ngrok           # install node wrapper for ngrok

touch index.js              # Create main app script file

```

Then, copy and paste the following JavaScript code into `index.js`.



```js
const express = require('express');
const ngrok = require('ngrok')
const app = express();

// when there's a post request to /webooks...
app.post('/webhooks', function (req, res) {

    // respond with 200 OK
    res.send('OK');
});

// listen to port 3000
app.listen(3000, function () {
    console.log('Listening for webhooks on port 3000');

    // start ngrok and create a tunnel to port 3000
    (async function() {
        const url = await ngrok.connect(3000);
    })();
})
```

This app listens to requests on port `3000`, then responds with a `200` status once it receives a `POST` request to `/webhooks`.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Ngrok is a helpful tool for viewing webhook callbacks BigCommerce sends to your app. Ngrok creates a publicly accessible tunnel URL to an application running on your machine. When using ngrok you can view HTTP request details in its web interface.
> * For simplicity, this tutorial uses an [npm package](https://www.npmjs.com/package/ngrok) to install and run ngrok. For official ngrok usage and installation instructions, visit [ngrok.com](https://ngrok.com/).


</div>
</div>
</div>

## Start the app

To start the app, run the following commands.

```bash
cd ~/path/to/webhooks-test # Make sure you're in your webhooks-test project directory

node index.js              # Start the app
```

Navigate to `http://localhost:4040/` in your browser. You should see the ngrok web interface like shown in the image below. Copy the HTTPS tunnel URL and keep the app running.

![ngrok web interface](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500191661 "ngrok web interface")

## Create a webook

Now, we'll create a webook that subscribes to the `store/product/updated` [webhook event](https://developer.bigcommerce.com/api-docs/store-management/webhooks/events). To do so, send a `POST` request to `/stores/{{STORE_HASH}}/v3/hooks`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/hooks
X-Auth-Token: {{ACCESS_TOKEN}}

{
 "scope": "store/product/updated",
 "destination": "https://6a35e97b.ngrok.io/webhooks", # Replace 6a35e97b.ngrok.io with your HTTPS tunnel URL

 "is_active": true
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/webhooks/webhooks/createwebhooks#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Be sure to replace `6a35e97b.ngrok.io` with your ngrok HTTPS tunnel URL.
> * Currently, BigCommerce does not support desination URLs served over custom HTTPS ports. Use the default HTTPS port 443.

</div>
</div>
</div>

## Trigger the webhook event

Webhooks fire when shoppers perform actions on the storefront and when users make changes in the control panel. They will also fire when you make changes using an API. Trigger the webhook you just created by performing the following actions in your BigCommerce control panel:


1. Navigate to **Products** > [**View**](https://login.bigcommerce.com/deep-links/manage/products).
2. Edit a product and change something like **name** or **description**.
3. Click **Save**.

Now, visit the ngrok web interface address (`http://127.0.0.1:4040`) and check for a `200` response.

![ngrok Web Interface](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500945565 "ngrok Web Interface")

The summary shows the webhook fired and our Express app returned a `200` response along with the text OK. The response is generated by `res.send(‘OK')` in our app code. For more information, see [Express Routing](https://expressjs.com/en/guide/routing.html).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> ### Note
>
> * Unless you have a paid ngrok account, the destination URL will only be valid for a few hours. After that, the webhook will stop working. Send a `DELETE` request to the specific webhook ID to disable the hook.

</div>
</div>
</div>

## Adding custom headers

You can add custom headers to your create webhook request for added security. The `headers` property accepts any key-value pair as a string. BigCommerce will include the headers in callback requests made to your application.


```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/hooks
X-Auth-Token: {{ACCESS_TOKEN}}

{
"scope": "store/cart/lineItem/*",
  "destination": "https://myapp.herokuapp.com/",
  "is_active": true,
  "headers": {
    "User-Name": "Hello",
    "Password": "Goodbye"
  }
}
```

## Troubleshooting

**Custom ports**

Currently, BigCommerce does not support destination URLs served over custom HTTPS ports. Use the default HTTPS port `443`.

**Getting a `404` error using the root (/) url?**

Add this snippet to your code to respond to incoming `GET` requests with 'hello':


```js
app.get('/',(req, res)=>{
    res.send('Hello!');
});
```

**Getting error "ngrok not found"?**

There are two ways to fix this. Your local setup will determine which command will work.
Use the command `mv ngrok /usr/local/bin `to move ngrok to your local bin folder. This way it becomes available globally.
Use the command `./ngrok http 3000` to run ngrok as a sudo user.

**Windows users**

If you are having trouble getting ngrok started, try setting the PATH.

    - [What are PATH and other environment variables, and how can I set or use them?](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)

## Resources
* [Webhooks Overview](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/about-webhooks)
* [Webhook Events](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events)
* [Webhooks Reference](https://developer.bigcommerce.com/api-reference/webhooks)
