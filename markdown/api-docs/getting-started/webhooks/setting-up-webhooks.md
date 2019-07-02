<h1>Webhooks Tutorial</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#setting-up-webhooks_intro">Intro</a></li>
    		<li><a href="#setting-up-webhooks_prerequisites">Prerequisites</a></li>
        <li><a href="#setting-up-webhooks_create-project-folder">Create Project Folder</a></li>
        <li><a href="#setting-up-webhooks_install-ngrok">Install ngrok</a></li>
        <li><a href="#setting-up-webhooks_create-express-app">Create Express App</a></li>
        <li><a href="#setting-up-webhooks_start-the-app-ngrok">Start the App and ngrok</a></li>
        <li><a href="#setting-up-webhooks_fire-webhooks">Trigger the Webhook Event</a></li>
    		<li><a href="#setting-up-webhooks_custom-headers">Adding Custom Headers</a></li>
        <li><a href="#setting-up-webhooks_troubleshooting">Troubleshooting</a></li>
        <li><a href="#/api-docs/getting-started/webhooks/webhook-events">All Available Webhooks</a></li>
	</ul>
</div>

<a href='#setting-up-webhooks_intro' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_intro'><i aria-hidden='true' class='linkify icon'></i></a>

When testing your application locally, ngrok is a helpful tool for viewing the webhook responses that BigCommerce sends to your app. Ngrok creates a publicly accessible tunnel URL to an application running on your machine's localhost. Ngrok also provides a web interface you can use to view HTTP request details.

In this tutorial, we'll install ngrok, register a webhook on your store, and then observe the response when the webhook event is triggered.

<a href='#setting-up-webhooks_prerequisites' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

- NPM is installed (installed automatically with Node)
- Familiar with Command Line
- Familiar with Postman
- [API Access Token & Client ID](/api-docs/getting-started/basics/authentication#authentication_getting-api-credentials) with [scope](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes) set to Information & Settings Read-Only and Products Read-Only.
- [Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks)



<a href='#setting-up-webhooks_create-project-folder' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_create-project-folder'><i aria-hidden='true' class='linkify icon'></i></a>

## Create Project Folder

1. Open the terminal and create a folder that will hold ngrok and the Node app, then move into that directory.

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
mkdir webhooks-test
cd webhooks-test
```



<a href='#setting-up-webhooks_install-ngrok' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_install-ngrok'><i aria-hidden='true' class='linkify icon'></i></a>

## Install ngrok

### Mac/Linux

1. Visit https://ngrok.com/ and click download.
2. Choose the version for your operating system.
3. Unzip ngrok and place the application in the project folder that you created.

This can be accomplished in one command:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

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
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#setting-up-webhooks_create-express-app' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_create-express-app'><i aria-hidden='true' class='linkify icon'></i></a>

## Create Express App

1. In the terminal run `npm init`. You will be prompted with several questions about the app setup. Feel free to hit return to accept the default values.  The final screen will look something like this:		 

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

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
3. Create a file in your project folder called index.js. `touch index.js` or `copy nul > index.js` for Windows.
4. Install [Express](https://expressjs.com/en/starter/installing.html) using the terminal in the same project folder. `npm install express --save`

<div class="HubBlock--callout">
<div class="CalloutBlock--success">
<div class="HubBlock-content">
    
<!-- theme: success -->

### Checkpoint
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

4. Copy and paste the following into `index.js`:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

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

This app listens to requests on port 3000, then 200 responds once it receives a `POST` request to `/webhooks`.

From Express [Website](https://expressjs.com/en/starter/basic-routing.html):
`app.METHOD(PATH, HANDLER)`
- app is an instance of express.
- METHOD is an [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.
- Res.send is the body parameter that sends the HTTP response.



<a href='#setting-up-webhooks_start-the-app-ngrok' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_start-the-app-ngrok'><i aria-hidden='true' class='linkify icon'></i></a>

## Start the App and ngrok

1. Open two terminal tabs. In both tabs, navigate to your project folder. 
2. In one tab run the app. `node index.js`
3. In the other start ngrok. `./ngrok http 3000`

<div class="tab-block">
    {'children': [{'title': 'node index.js', 'blocks': [{'type': 'text', 'data': '```\nBIGCOMMERCE:webhooks your.computer$ node index.js\nListening for webhooks on port 3000\n```'}]}, {'title': 'ngrok http 3000', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1531500085650', 'config': {'centered': True}, 'header': {'title': 'nrgok terminal'}}]}]}
</div>

ngrok returns two values we will need to register a webhook and observe the response: 
- **Web Interface:** Where you can monitor the hook from a browser. `https://127.0.0.1:4040`
- **Forwarding:** The webhook destination. Make note of the https version. For example, `https://6a35e97b.ngrok.io`.

4. Open a web browser and copy in your Web Interface URL: `http://127.0.0.1:4040`.  This is where webhook payloads will appear when they fire.

<!--
    title: #### ngrok Web Interface

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500191661
-->

#### ngrok Web Interface
![#### ngrok Web Interface
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500191661 "#### ngrok Web Interface
")



Subscribe to the `store/product/updated` event: 

1. Create a POST request using the try it now box below or your API enviroment of choice to the request URL:`https://api.bigcommerce.com/stores/{{store_hash}}/v2/hooks`. 
Replace store_hash with the value from your store's API path.
2. Create a request body where "scope" is the webhook event we are subscribing to and "destination" is your ngrok forwarding url with /webhooks appended (the route specified in our Express app):

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
 "scope": "store/product/updated",
 "destination": "https://6a35e97b.ngrok.io/webhooks",
 "is_active": true
}
```

3. Update the request headers to contain:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```http
    Accept: application/json
    Content-Type: application/json
    X-Auth-Client: {{the OAuth client id}}
    X-Auth-Token: {{the OAuth token}}
```

4. Check all the values and then hit POST. If successful, the response will be 201 Created.

<a href='#create-a-webhook' aria-hidden='true' class='block-anchor'  id='create-a-webhook'><i aria-hidden='true' class='linkify icon'></i></a>

{'method': 'post', 'url': 'https://api.bigcommerce.com/stores/{store_hash}/v2/hooks', 'headers': {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Auth-Client': '{the OAuth client id}', 'X-Auth-Token': '{the OAuth token}'}, 'body': '{\n"scope": "store/product/updated",\n "destination": "https://{your-url}.ngrok.io/webhooks",\n "is_active": true\n}\n'}

<a href='#201-response' aria-hidden='true' class='block-anchor'  id='201-response'><i aria-hidden='true' class='linkify icon'></i></a>

<!--
title: "201 Created Response"
subtitle: ""
lineNumbers: true
-->

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

<a href='#setting-up-webhooks_fire-webhooks' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_fire-webhooks'><i aria-hidden='true' class='linkify icon'></i></a>

## Trigger the Webhook Event
Webhooks can be triggered by actions performed by a shopper on the storefront or user within the control panel, or actions performed via API. To illustrate this point, we'll demonstrate both methods.

### Update via the Control Panel

1. From your store’s control panel, navigate to Products > View. Choose a product and edit product details like name or description. 
2. Click **Save**.

<!--
    title: #### BigCommerce Control Panel

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500906129
-->

#### BigCommerce Control Panel
![#### BigCommerce Control Panel
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500906129 "#### BigCommerce Control Panel
")

3. Visit the ngrok web interface address  and check for a 200 response. 

<!--
    title: #### ngrok Web Interface

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500945565
-->

#### ngrok Web Interface
![#### ngrok Web Interface
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500945565 "#### ngrok Web Interface
")

The Summary shows that the webhook has fired and our Express app has returned a 200 response along with the text OK. The response is generated by res.send(‘OK’) in our app code, but this text can be changed to say something different or even post the response to another app. For more info, see [Express Routing](https://expressjs.com/en/guide/routing.html).

The record of the HTTP request will also show in the terminal tab running ngrok.

<!--
    title: #### ngrok Terminal Response

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531500989467
-->

#### ngrok Terminal Response
![#### ngrok Terminal Response
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531500989467 "#### ngrok Terminal Response
")

### Update Via the API
Create a PUT request to the product to be updated, replacing 124 with the product’s ID: 

`https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/124`

In this example, the price of product_id 124 is being changed to 12.99:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
	"price": 12.99
}
```

After hitting send, check the ngrok web interface. You may see a single event or several based on how many times the product has been updated in the previous step.

<a href='#update-a-product-webhooks' aria-hidden='true' class='block-anchor'  id='update-a-product-webhooks'><i aria-hidden='true' class='linkify icon'></i></a>

{'url': 'https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}', 'headers': {'X-Auth-Client': '{Your-X-Auth-Client}', 'X-Auth-Token': '{Your-X-Auth-Token}', 'Accept': 'application/json', 'Content-Type': 'application/json'}, 'method': 'put', 'body': '{\n  "price": 12.99\n}'}

<!--
    title: #### ngrok Web Interface

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1531501115256
-->

#### ngrok Web Interface
![#### ngrok Web Interface
](//s3.amazonaws.com/user-content.stoplight.io/6012/1531501115256 "#### ngrok Web Interface
")



That’s it! In this walkthrough you created a webhook, set up a server to accept the response, and used ngrok to observe the webhook payload.

Want to keep going? Try changing the text in `res.send()` to a custom response, print the response to a webpage, or register a different webhook event. 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### URL Timeout
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#delete-webhook' aria-hidden='true' class='block-anchor'  id='delete-webhook'><i aria-hidden='true' class='linkify icon'></i></a>

{'method': 'delete', 'url': 'https://api.bigcommerce.com/stores/{store_hash}/v2/hooks/{hook_id}', 'headers': {'X-Auth-Client': '{your-client-id}', 'X-Auth-Token': '{your-auth-token}', 'Content-Type': 'application/json', 'Accept': 'application/json'}}



<a href='#setting-up-webhooks_custom-headers' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_custom-headers'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding Custom Headers
For added security you can add custom headers to your webhook request. `headers` accepts any key:value pair as a string. 

<!--
title: "Example Webhook Custom Headers"
subtitle: ""
lineNumbers: true
-->

```
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



<a href='#setting-up-webhooks_troubleshooting' aria-hidden='true' class='block-anchor'  id='setting-up-webhooks_troubleshooting'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting
1. Getting a 404 error using the root (/) url?

Add this snippet to your code to respond to incoming get requests with 'hello':

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

2. Getting error ngrok not found?
There are two ways to fix this. Your local setup will determine which command will work.
Use the command `mv ngrok /usr/local/bin `to move ngrok to your local bin folder. This way it becomes available globally. 
Use the command `./ngrok http 3000` to run ngrok as a sudo user. 

3. Windows Users
If you are having trouble getting ngrok started try setting the PATH. 
    - [What are PATH and other environment variables, and how can I set or use them?](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)

