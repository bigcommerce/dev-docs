# Implementing App OAuth Flow

<div class="otp" id="no-index">

### On This Page
- [Helpful Tools](#helpful-tools)
- [OAuth Summary](#oauth-summary)
- [Request Headers](#request-headers)
- [Managing Session Timeouts](#managing-session-timeouts)
- [Installation and Update Sequence](#installation-and-update-sequence)
- [Receiving the GET Request](#receiving-the-get-request)
- [Responding to the GET Request](#responding-to-the-get-request)
- [Making the POST Request](#making-the-post-request)
- [Receiving the POST Response](#receiving-the-post-response)

</div>

This article explains the OAuth flow used by BigCommerce Single-Click apps...

## Helpful Tools

## OAuth Summary

API token creation is a permission reserved for the [store owner](https://forum.bigcommerce.com/s/article/Store-API-Accounts#creating) user account. An app can request authentication “on behalf” of a store owner, allowing the app to make API requests against store data.

To test an app before release, apply for a [sandbox](https://www.bigcommerce.com/partners/) store.

- When a merchant clicks your app's Install button in the control panel, a [/GET request](#receiving-the-get-request) is sent to your app's [Auth callback URL](#receiving-the-get-request).
- The /GET request sent from BigCommerce contains a `code` or temporary access token, `client_id`, `client_secret`, `scopes` and [other information](#receiving-the-get-request). Your Auth Callback URL needs to be served over https. You should also have access to your app's server logs which will allow you to see the information in the request.
- Your app needs to [respond](#responding-to-the-get-request) to the /GET  with HTML that will be rendered in an iframe in the store's control panel.
- Your app then needs to make a /POST request back to BigCommerce that contains the code, client_id and client secret. This should be done programmatically.
- BigCommerce will respond with a permanent Oauth token authorized against the store that has installed your app.
- After installation, the `store_hash` and `access_token` should be stored somewhere secure so the app does not lose its authorization.

## Request Headers

API requests are authenticated by the following HTTP headers:

* `X-Auth-Client` -- The Client ID of the requesting app.
* `X-Auth-Token` -- Access token authorizing an app to access store data on behalf of a user.

In addition, while not all resources require the Accept and Content-Type headers, many do. To ensure that your calls succeed, always include these headers. For more details on request headers and their accepted values, see [Request Headers](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api#request-headers).

## Managing Session Timeouts

We recommend that you add BigCommerce’s JavaScript SDK to your Single-Click Apps to protect your apps’ users from getting logged out of the BigCommerce control panel after a period of idleness. To include our SDK, add this script tag to your Single-Click App:
`<script src="//cdn.bigcommerce.com/jssdk/bc-sdk.js">`

Optionally, you can pass a logout callback function within the initialization call:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Logout Callback</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Logout Callback"
subtitle: ""
lineNumbers: true
-->

```javascript
Bigcommerce.init({
      onLogout: callback
});
```

This callback function will run when the user explicitly logs out of the BigCommerce control panel or is automatically logged out. The callback will allow your app to respond to this logout appropriately.

## Installation and Update Sequence

The purpose of the App Installation sequence is to obtain an Oauth token for the store installing the app, using the Client ID and Secret from Dev Tools.

A user kicks off the installation or update sequence from within a store's control panel by clicking the “Install” button from your app details page or by clicking an installed app to update its scopes. BigCommerce redirects the user to the Auth Callback URI provided during app registration. The Auth Callback URI must be publicly available, fully qualified, and served over TLS.

<!--
    title: #### App Installation Sequence

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1536263813949
-->

#### App Installation Sequence
![#### App Installation Sequence
](//s3.amazonaws.com/user-content.stoplight.io/6012/1536263813949 "#### App Installation Sequence
")

### Handling Requests Securely

The request comes from the client browser, rather than directly from BigCommerce. This allows you to use a non-publicly-available Auth Callback URI while testing your app.

For security, Auth and Load callbacks should be handled server-side. If you are building a client-side application (such as an AngularJS Single Page App), you should handle Auth and Load callbacks outside that application. Use a separate service that accepts the Auth and Load callback requests, generates tokens, validates requests, and then redirects the user to your client-side app’s entry point.

## Receiving the GET Request

The GET request to your Auth Callback URI contains a temporary code that you can exchange for a permanent OAuth token. It also includes a unique value that identifies the store installing or updating your app, as well as authorized scopes.

The following table details the full list of parameters and values included in the GET request from BigCommerce to your Auth Callback URI. BigCommerce passes these within the URI itself as query parameters.

| Parameter | Description |
|-|-|
| code | Temporary code to exchange for a permanent OAuth token. See [Making the POST request](#building-apps_making-post-request) below for more information about this exchange. |
| scope | List of scopes authorized by the user. As a best practice, your app should validate this list to ensure that it matches the app&#39;s needs, and fail if it does not. However, at this time, the user does not have any opportunity to pick and choose between scopes. The dialog presented to the user requires the user to approve all scopes or none. |
| context | The store hash: a unique value that identifies the store on which a logged-in user has clicked to install or your app. BigCommerce passes this along with a context path as follows: `stores/{store_hash}`. Save the store hash value, because you will need to pass it in all your requests to the API. |

**Example – Initial Installation**

This example initiates the token exchange, with a requested scope of store_v2_orders:

<!--
title: "Initial Installation"
subtitle: ""
lineNumbers: true
-->

```http
GET /auth?code=qr6h3thvbvag2ffq&scope=store_v2_orders&context=stores/g5cd38 HTTP/1.1
Host: app.example.com
```

### Example – Updating Scopes
The following example requests a scope of store_v2_products, in addition to the initially requested scope of store_v2_orders:

<!--
title: "Updating Scopes"
subtitle: ""
lineNumbers: true
-->

```http
GET /auth?code=qr6h3thvbvag2ffq&scope=store_v2_orders+store_v2_products&context=stores/g5cd38 HTTP/1.1
Host: app.example.com
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Token Invalidation
> When your app receives a new token, any previously issued token is invalidated.

</div>
</div>
</div>

## Responding to the GET Request

Upon receiving the GET request at your Auth Callback URI, your app should return some HTML to the merchant browser. BigCommerce renders this in an iframe inside of the control panel. It could be a form that collects further information from the user, or you could redirect the user to your app’s main page. If you do not pass back some HTML, the user will be left looking at a blank screen. Such an app would not be accepted into the App Marketplace.

## Making the POST Request

The POST request’s primary purpose is to exchange the temporary access code for a permanent OAuth token. However, your app must pass a number of additional values to accomplish the exchange. Pass the parameters and their values inside the request body, using query parameters and URL-encoding. To achieve this, you must include one of the following HTTP headers:

`Content-Type: application/x-www-form-urlencoded` or `Content-Type: application/json`

Make the POST request to the following address: `https://login.bigcommerce.com/oauth2/token`

### Initial Installation

Upon receiving the POST request during inital installation, BigCommerce marks the status of your app as “Installed”, removes the progress-indicator overlay, and places your app icon in the control panel’s left-hand navigation. With the progress-indicator overlay removed, the user can interact with the HTML that you returned in your GET response.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Receiving the POST request
> Upon receiving the POST request during initial installation BigCommerce removes the update prompt from the control panel.

</div>
</div>
</div>

### Parameters

Include values for each of the following parameters.

| Parameter | Description |
|-|-|
| client_id | The Client ID for your app, obtained during [registration](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_client-id-secret). |
| client_secret | The Client Secret for your app, obtained during [registration](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_client-id-secret). |
| code | Temporary access code received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#receiving-the-get-request) discussed above. |
| scope | List of OAuth scopes received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#receiving-the-get-request) discussed above. |
| grant_type | Always use the following: authorization_code. |
| redirect_uri | Must be identical to your registered Auth Callback URI. |
| context | The store hash received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#receiving-the-get-request), in the format: `stores/{_store_hash_}` |

**Examples – Initial Installation**

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">HTTP</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "HTTP"
subtitle: ""
lineNumbers: true
-->

```http
POST /oauth2/token HTTP/1.1
Host: login.bigcommerce.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 186
client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&code=qr6h3thvbvag2ffq&scope=store_v2_orders&grant_type=authorization_code&redirect_uri=https://app.example.com/oauth&context=stores/{STORE_HASH}
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">PHP</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "PHP"
subtitle: ""
lineNumbers: true
-->

```php
use Bigcommerce\Api\Connection;
$tokenUrl = "https://login.bigcommerce.com/oauth2/token";
$connection = new Connection();
$connection->useUrlencoded();
$response = $connection->post($tokenUrl, array(
    "client_id" => "CLIENT_ID",
    "client_secret" => "CLIENT_SECRET",
    "redirect_uri" => "https://app.example.com/oauth",
    "grant_type" => "authorization_code",
    "code" => $request->get("code"),
    "scope" => $request->get("scope"),
    "context" => $request->get("context"),
));
$token = $response->access_token;
```

**Examples – Updating Scopes**

The following examples request a scope of store_v2_products, in addition to the initially requested scope of store_v2_orders:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">HTTP</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "HTTP"
subtitle: ""
lineNumbers: true
-->

```http
POST /oauth2/token HTTP/1.1
Host: login.bigcommerce.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 186
client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=store_v2_orders+store_v2_products&grant_type=authorization_code&redirect_uri=https://app.example.com/oauth&context=stores/{STORE_HASH}
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">PHP</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "PHP"
subtitle: ""
lineNumbers: true
-->

```php
use Bigcommerce\Api\Connection;
$tokenUrl = "https://login.bigcommerce.com/oauth2/token";
$connection = new Connection();
$connection->useUrlencoded();
$response = $connection->post($tokenUrl, array(
    "client_id" => "CLIENT_ID",
    "client_secret" => "CLIENT_SECRET",
    "redirect_uri" => "https://app.example.com/oauth",
    "grant_type" => "authorization_code",
    "code" => $request->get("code"),
    "scope" => $request->get("scope"),
    "context" => $request->get("context"),
));

$token = $response->access_token;
```

## Receiving the POST Response

The POST response will include a JSON object containing the permanent OAuth token, user information, and other values. Upon receiving the permanent OAuth token, store it securely. You should also store the user and store hash values, to identify the user and store at load and uninstall. The following sections detail the contents of the JSON body.

### JSON Values
| Name | Data Type | Value Description |
|-|-|-|
| access_token | string | The permanent OAuth token that your app can use to make requests to the Stores API on behalf of the user. Store this value securely. |
| scope | string | List of authorization scopes. |
| id | integer | Unique identifier for the user. Store this value to identify the user at load and uninstall. |
| email | string | The user’s email address. Store this value to identify the user at load and uninstall. |
| context | string | The store hash, as well as a base path: `stores/{_store_hash_}` |

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Initial Installation</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Initial Installation"
subtitle: ""
lineNumbers: true
-->

```json
{
  "access_token": "ACCESS_TOKEN",
  "scope": "store_v2_orders",
  "user": {
    "id": 24654,
    "email": "merchant@mybigcommerce.com"
  },
  "context": "stores/STORE_HASH"
}
```

Update requests will refresh the payload’s access_token and scope values. Here again, the following example requests a scope of store_v2_products, in addition to the initially requested scope of store_v2_orders:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Updating Scopes</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Updating Scopes"
subtitle: ""
lineNumbers: true
-->

```json
{
  "access_token": "ACCESS_TOKEN",
  "scope": "store_v2_orders store_v2_products",
  "user": {
    "id": 24654,
    "email": "merchant@mybigcommerce.com"
  },
  "context": "stores/STORE_HASH"
}
```



### Load Request and Response

Once your app has been installed, the store owner or user can click its icon in the control panel to launch it. This causes BigCommerce to send a GET request to the Load Callback URI that you provided during app registration. In a production environment, the Load Callback URI must be publicly available, fully qualified, and served over TLS/SSL.

```http
# The GET request contains a signed payload, as shown below.
GET /load?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: app.example.com
```

Upon receiving a GET request to the Load Callback URI, your app needs to [process the signed payload](#processing-the-signed-payload). After processing the payload, your app returns its user interface as HTML. BigCommerce renders this inside of an iframe. Please see [User Interface Constraints](#designing-the-user-interface) for important information about your app’s user interface.

### Uninstall Request (Optional)

Store owners have the option to uninstall any app at any time. When a store owner uninstalls an app, the app’s OAuth token is revoked and the app cannot make requests to the Stores API on the store’s behalf anymore.

You do not need to provide an Uninstall Callback URI. The lack of an Uninstall Callback URI does not prevent uninstallation. Instead, the Uninstall Callback URI allows you to track store owners who uninstall your app and to run cleanup operations, such as removing the store’s user accounts from your system.

Should you choose to provide an Uninstall Callback URI, please note that it must be publicly available, fully qualified, and served over TLS/SSL. If provided, BigCommerce will send a GET request to your Uninstall Callback URI when a store owner clicks to uninstall your app.

Example of a GET Request sent to the Uninstall Callback URI:

```http
GET /uninstall?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
	Host: app.example.com
```

Upon receiving the GET request, your app will need to process the signed payload.

### Remove User Request (Optional)

If you have not enabled [multi-user support](#multi-user-support), you will not provide a Remove User Callback URI and can ignore this section. If you enable multi-user support, you can optionally specify a Remove User Callback URI. It must be fully qualified, publicly available, and served over TLS/SSL. BigCommerce will send a GET request to your Remove User Callback URI when a store admin revokes a user’s access to your app.

**Example -- Get Request sent to the Remove User URI**

<!--
title: "Remove User URI"
subtitle: ""
lineNumbers: true
-->

```http
GET /remove-user?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: app.example.com
```

Upon receiving the GET request, your app will need to process the signed payload.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

> Any HTML that you return in your response for uninstalling an app or removing a user will not render in the response.

</div>
</div>
</div>


BigCommerce stores are hosted on [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region.

Therefore, you can maximize performance of your app (in terms of latency to the public API) by hosting in the same region. There is no requirement to do so, and you may host wherever you like.

