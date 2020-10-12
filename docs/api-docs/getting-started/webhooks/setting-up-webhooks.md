# Webhooks Tutorial

<div class="otp" id="no-index">

### On this page

- [Prerequisites](#prerequisites)
- [Create project folder](#create-project-folder)
- [Install ngrok](#install-ngrok)
- [Create express app](#create-express-app)
- [Start the app and ngrok](#start-the-app-and-ngrok)
- [Trigger the webhook event](#trigger-the-webhook-event)
- [Adding custom headers](#adding-custom-headers)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

</div>

In this tutorial, we'll install the software ngrok, register a BigCommerce webhook on your store, and then observe the response when the webhook event is triggered.

If you would like to follow along, we have created a [Postman](https://www.postman.com/) collection with all the requests. 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3f005ed74030e01bbf7a)

## Prerequisites

- NPM is installed (installed automatically with Node)
- Familiarity with command line
- Familiarity with Postman
- [API Access Token](/api-docs/getting-started/basics/authentication#authentication_getting-api-credentials) with [scope](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes) set to Information & Settings read-only and Products read-only.
- [Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks)

## Create project folder

1. Open the terminal and create a folder, then move into that directory. This folder will hold ngrok and the Node app. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

**Create new folder and move to new directory using the shell**

```shell
mkdir webhooks-test
cd webhooks-test
```

## Install ngrok

When testing your application locally, ngrok is a helpful tool for viewing the webhook responses that BigCommerce sends to your app. Ngrok creates a publicly accessible tunnel URL to an application running on your machine's localhost. When using ngrok you can view HTTP request details in its web interface. 

### Mac/Linux

1. Visit https://ngrok.com/ and click download.
2. Choose the version for your operating system.
3. Unzip ngrok and place the application in the project folder that you created.
This step can be accomplished in one command:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

**Downloading ngrok and moving contents to folder using the shell**
```shell
unzip /Users/your-computer/Downloads/ngrok-stable-darwin-amd64.zip -d /Users/your-computer/Documents/webhooks-test
```

### Windows

1. Visit https://ngrok.com/ and click download.
2. Choose the version for your operating system.
3. Unzip ngrok and place the application in the project folder that you created.
4. Make sure ngrok is referenced in your [PATH environment variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them).

<div class="HubBlock--callout">
<div class="CalloutBlock--success">
<div class="HubBlock-content">
    
<!-- theme: success -->

### Checkpoint
> At this point you should have a project folder with ngrok unzipped inside of it. 

</div>
</div>
</div>

## Create express app

1. In the terminal run `npm init`. You will be prompted with several questions about the app setup. Feel free to hit return to accept the default values.  The final screen will look something like this:     

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

**Final setup**

```json
{
  "name": "webhooks-test",
  "version": "1.0.0",
  "description": "webhooks-test",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

2. Take note of the value in "main", `index.js`. 
3. Create a file in your project folder called `index.js`. In the terminal use the command `touch index.js` for Mac or `copy nul > index.js` for Windows.

4. Install [Express](https://expressjs.com/en/starter/installing.html) using the terminal in the same project folder by running `npm install express --save`

<div class="HubBlock--callout">
<div class="CalloutBlock--success">
<div class="HubBlock-content">
    
<!-- theme: success -->

### Checkpoint
> At this point your project folder should contain:
* `index.js`
* `node_modules`
* `package.json`
* `ngrok`
* `package-lock.json`

</div>
</div>
</div>

5. Copy and paste the following into `index.js`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->
**index.js**
```js
const express = require('express');
const app = express();

// when there's a post request to /webooks...
app.post('/webhooks', function (req, res) {
  
    // respond with 200 OK
    res.send('OK');
});

app.listen(3000, function () {
    console.log('Listening for webhooks on port 3000')
})
```

This app listens to requests on port `3000`, then responds with a `200` status once it receives a `POST` request to `/webhooks`.

From the Express [Website](https://expressjs.com/en/starter/basic-routing.html):
`app.METHOD(PATH, HANDLER)`
- app is an instance of express.
- METHOD is an [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.
- Res.send is the body parameter that sends the HTTP response.

## Start the app and ngrok

1. Open two terminal tabs. In both tabs, navigate to your project folder. 
2. In one tab run the app. `node index.js`
3. Start ngrok in the other tab. `./ngrok http 3000`


#### node index.js

```shell
BIGCOMMERCE:webhooks your.computer$ node index.js
Listening for webhooks on port 3000
```

#### ngrok http 3000

![ngrok running](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500085650)

ngrok returns two values we will need to register a webhook and observe the response: 
- **Web Interface:** Where you can monitor the hook from a browser. `http://127.0.0.1:4040`
- **Forwarding:** The webhook destination. Make note of the https version. For example, `https://6a35e97b.ngrok.io`.

4. Open a web browser and copy in your Web Interface URL: `http://127.0.0.1:4040`.  This is where webhook payloads will appear when they fire.

<!--
    title: #### ngrok Web Interface

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500191661
-->

#### ngrok web interface
![#### ngrok Web Interface
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500191661 "#### ngrok Web Interface
")

Subscribe to the `store/product/updated` event: 

1. If you have not already done so, generate the [API Access Token](/api-docs/getting-started/basics/authentication#authentication_getting-api-credentials) with the Information & Settings scope set to Read-Only and the Products scope set to Read-Only.

2. `POST` to `https://api.bigcommerce.com/stores/{{store_hash}}/v2/hooks`. 
Replace store_hash with the value from your store's API path.
3. In the request body, `scope` is the webhook event we are subscribing to, and `destination` is the `ngrok` forwarding url with `/webhooks` appended (the route specified in the Express app):

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->
**Webhook POST request body**
```json
{
 "scope": "store/product/updated",
 "destination": "https://6a35e97b.ngrok.io/webhooks",
 "is_active": true
}
```

4. Update the request headers to contain the following:


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->
**Request headers**
```http
    Accept: application/json
    Content-Type: application/json
    X-Auth-Token: {{the OAuth token}}
```

5. Check all the values and then send. If successful, the response will be `200 OK`.

The id number displayed in the response is needed to disable the hook.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">200 OK Response</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->
**200 response**
```json
{
  "id": 14263419,
  "client_id": "your-client-id",
  "store_hash": "your-store-hash",
  "scope": "store/product/updated",
  "destination": "https://6a35e97b.ngrok.io/webhooks",
  "headers": null,
  "is_active": true,
  "created_at": 1531256030,
  "updated_at": 1531256030
}
```

## Trigger the webhook event
Webhooks fire when a shopper performs an action on the storefront, or when users take action in the control panel. Making changes to stores via API also trigger webhooks. To illustrate this point, we'll demonstrate both methods.

### Update via the control panel
1. From your store’s control panel, navigate to **Products > View**. Choose a product and edit product details like name or description. 
2. Click **Save**.

<!--
    title: #### BigCommerce Control Panel

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500906129
-->

#### BigCommerce control panel
![#### BigCommerce Control Panel
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500906129 "#### BigCommerce Control Panel
")

3. Visit the ngrok web interface address and check for a `200` response. 


<!--
    title: #### ngrok Web Interface

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500945565
-->

#### ngrok web interface
![#### ngrok Web Interface
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500945565 "#### ngrok Web Interface
")

The summary shows the webhook fired and our Express app returned a `200` response along with the text OK. The response is generated by `res.send(‘OK’)` in our app code, but this text can be changed to say something else, or even forward the `POST` response to another app. For more information, see [Express Routing](https://expressjs.com/en/guide/routing.html).

The record of the HTTP request will also show in the terminal tab running ngrok.

<!--
    title: #### ngrok Terminal Response

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500989467
-->

#### ngrok Terminal Response
![#### ngrok Terminal Response
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500989467 "#### ngrok Terminal Response
")

### Update via the API
1. Generate the [API Access Token](/api-docs/getting-started/basics/authentication#authentication_getting-api-credentials). Set the Information & Settings scope to read-only and the Products scope to modify.


2. Create a `PUT` request to the product to be updated, replacing `{{store-hash}}` and `{{product_id}}` with values from your store: 

`https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/124`

In this example, the price of `product_id` 124 is being changed to `12.99`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

**PUT request to update product**

```json
{
  "price": 12.99
}
```

After hitting send, check the ngrok web interface. You may see a single event or several based on how many times you updated the product in the previous step.

<!--
    title: #### ngrok Web Interface

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531501115256
-->

#### ngrok web interface
![#### ngrok Web Interface
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531501115256 "#### ngrok Web Interface
")

That’s it! In this walkthrough you created a webhook, set up a server to accept the response, and used ngrok to observe the webhook payload.

Want to keep going? Try changing the text in `res.send()` to a custom response, print the response to a webpage, or register a different webhook event. 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### URL timeout
> Unless you have a paid ngrok account, the destination URL will only be valid for a few hours. After that, the webhook will stop working. Send a DELETE request to the specific webhook ID to disable the hook. 

</div>
</div>
</div>

## Adding custom headers
For added security you can add custom headers to your webhook request. The `headers` property accepts any key value pair as a string. 

<!--
title: "Example Webhook Custom Headers"
subtitle: ""
lineNumbers: true
-->

**Example webhook custom headers**

```json
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

**Getting a `404` error using the root (/) url?**

Add this snippet to your code to respond to incoming get requests with 'hello':

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

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

If you are having trouble getting ngrok started try setting the PATH. 
    - [What are PATH and other environment variables, and how can I set or use them?](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)

## Resources
* [Webhooks Overview](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/about-webhooks)
* [Webhook Events](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events)
* [Webhooks Reference](https://developer.bigcommerce.com/api-reference/webhooks)
