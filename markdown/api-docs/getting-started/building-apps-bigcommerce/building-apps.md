<h1>Building an App</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#building-apps_oauth-summary">OAuth Summary</a></li>
		<li><a href="#building-apps_request-headers">Request Headers</a></li>
		<li><a href="#building-apps_session-timeouts">Managing Users Session Timeouts</a></li>
		<li><a href="#building-apps_installation-update-sequence">App Installation and Update Sequence</a></li>
		<li><a href="#building-apps_recieving-get-request">Receiving the GET Request</a></li>
		<li><a href="#building-apps_responding-get-request">Responding to the GET Request</a></li>
        <li><a href="#building-apps_making-post-request">Making the POST Request</a></li>
        <li><a href="#building-apps_recieving-post-request">Receiving the POST Response</a></li>
        <li><a href="#building-apps_load-uninstall-removal-requests">Load, Uninstall, and User Removal Requests</a></li>
        <li><a href="#building-apps_processing-signed-payload">Processing the Signed Payload</a></li>
        <li><a href="#building-apps_multi-user-support">Multi-User Support</a></li>
    <li><a href="#building-apps_external-app-installation">External App Installation</a></li>
    <li><a href="#building-apps_user-interface-constraints">User Interface Constraints<a/></li>
    <li><a href="#building-apps_hosting-your-app">Hosting Your App </a></li>
    <li><a href="#building-apps_faq">FAQ</a></li>
	</ul>
</div>

<a href='#building-apps_oauth-summary' aria-hidden='true' class='block-anchor'  id='building-apps_oauth-summary'><i aria-hidden='true' class='linkify icon'></i></a>

## OAuth Summary

API token creation is a permission reserved for the [store owner](https://forum.bigcommerce.com/s/article/Store-API-Accounts#creating) user account. An app can request authentication “on behalf” of a store owner, allowing the app to make API requests against store data.

To test an app before release, apply for a [sandbox](https://www.bigcommerce.com/partners/) store.
 
- When a merchant clicks your app's Install button in the control panel, a [/GET request](#building-apps_recieving-get-request) is sent to your app's [Auth callback URL](#building-apps_recieving-get-request). 
- The /GET request sent from BigCommerce contains a `code` or temporary access token, `client_id`, `client_secret`, `scopes` and [other information](#building-apps_recieving-get-request). Your Auth Callback URL needs to be served over https. You should also have access to your app's server logs which will allow you to see the information in the request.
- Your app needs to [respond](#building-apps_responding-get-request) to the /GET  with HTML that will be rendered in an iframe in the store's control panel.
- Your app then needs to make a /POST request back to BigCommerce that contains the code, client_id and client secret. This should be done programmatically. 
- BigCommerce will respond with a permanent Oauth token authorized against the store that has installed your app.
- After installation, the `store_hash` and `access_token` should be stored somewhere secure so the app does not lose its authorization. 

<a href='#building-apps_request-headers' aria-hidden='true' class='block-anchor'  id='building-apps_request-headers'><i aria-hidden='true' class='linkify icon'></i></a>

## Request Headers

API requests are authenticated by the following HTTP headers:


* `X-Auth-Client` -- The Client ID of the requesting app. 
* `X-Auth-Token` -- Access token authorizing an app to access store data on behalf of a user.

In addition, while not all resources require the Accept and Content-Type headers, many do. To ensure that your calls succeed, always include these headers. For more details on request headers and their accepted values, see [Request Headers](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api#about-api_request-headers).

---

<a href='#building-apps_session-timeouts' aria-hidden='true' class='block-anchor'  id='building-apps_session-timeouts'><i aria-hidden='true' class='linkify icon'></i></a>

## Managing Users Session Timeouts

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

```
Bigcommerce.init({
      onLogout: callback
});
```

This callback function will run when the user explicitly logs out of the BigCommerce control panel or is automatically logged out. The callback will allow your app to respond to this logout appropriately.

---

<a href='#building-apps_installation-update-sequence' aria-hidden='true' class='block-anchor'  id='building-apps_installation-update-sequence'><i aria-hidden='true' class='linkify icon'></i></a>

## App Installation and Update Sequence

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

---

<a href='#building-apps_recieving-get-request' aria-hidden='true' class='block-anchor'  id='building-apps_recieving-get-request'><i aria-hidden='true' class='linkify icon'></i></a>

## Receiving the GET Request

The GET request to your Auth Callback URI contains a temporary code that you can exchange for a permanent OAuth token. It also includes a unique value that identifies the store installing or updating your app, as well as authorized scopes.

The following table details the full list of parameters and values included in the GET request from BigCommerce to your Auth Callback URI. BigCommerce passes these within the URI itself as query parameters.

| Parameter | Description |
| --- | --- |
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

---

<a href='#building-apps_responding-get-request' aria-hidden='true' class='block-anchor'  id='building-apps_responding-get-request'><i aria-hidden='true' class='linkify icon'></i></a>

## Responding to the GET Request

Upon receiving the GET request at your Auth Callback URI, your app should return some HTML to the merchant browser. BigCommerce renders this in an iframe inside of the control panel. It could be a form that collects further information from the user, or you could redirect the user to your app’s main page. If you do not pass back some HTML, the user will be left looking at a blank screen. Such an app would not be accepted into the App Marketplace.

---

<a href='#building-apps_making-post-request' aria-hidden='true' class='block-anchor'  id='building-apps_making-post-request'><i aria-hidden='true' class='linkify icon'></i></a>

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
| --- | --- |
| client_id | The Client ID for your app, obtained during [registration](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_client-id-secret). |
| client_secret | The Client Secret for your app, obtained during [registration](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_client-id-secret). |
| code | Temporary access code received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_recieving-get-request) discussed above. |
| scope | List of OAuth scopes received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_recieving-get-request) discussed above. |
| grant_type | Always use the following: authorization_code. |
| redirect_uri | Must be identical to your registered Auth Callback URI. |
| context | The store hash received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_recieving-get-request), in the format: `stores/{_store_hash_}` |


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

---

<a href='#building-apps_recieving-post-request' aria-hidden='true' class='block-anchor'  id='building-apps_recieving-post-request'><i aria-hidden='true' class='linkify icon'></i></a>

## Receiving the POST Response

The POST response will include a JSON object containing the permanent OAuth token, user information, and other values. Upon receiving the permanent OAuth token, store it securely. You should also store the user and store hash values, to identify the user and store at load and uninstall. The following sections detail the contents of the JSON body.

### JSON Values
| Name | Data Type | Value Description |
| --- | --- | --- |
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

---

<a href='#building-apps_load-uninstall-removal-requests' aria-hidden='true' class='block-anchor'  id='building-apps_load-uninstall-removal-requests'><i aria-hidden='true' class='linkify icon'></i></a>

## Load, Uninstall, and User Removal Requests
In addition to the Auth Callback URI, the following URI’s are required for BigCommerce Apps:

| Name | Required? | Event Discussion |
| --- | --- | --- |
| Load Callback URI | Yes | Called when the store owner or user clicks to load your app. |
| Uninstall Callback URI | No | Called when the store owner clicks to uninstall your app. |
| Remove User Callback URI | No | Called when the store admin revokes a user's access to your app. |

Each event listed here triggers a GET request from BigCommerce containing a signed payload that allows your app to:
- Verify that the request came from BigCommerce.
- Identify the store.
- Identify the store owner or user.

### Load Request and Response

Once your app has been installed, the store owner or user can click its icon in the control panel to launch it. This causes BigCommerce to send a GET request to the Load Callback URI that you provided during app registration. In a production environment, the Load Callback URI must be publicly available, fully qualified, and served over TLS/SSL.

```
The GET request contains a signed payload, as shown below.
GET /load?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: app.example.com
```

Upon receiving a GET request to the Load Callback URI, your app needs to [process the signed payload](#building-apps_processing-signed-payload). After processing the payload, your app returns its user interface as HTML. BigCommerce renders this inside of an iframe. Please see [User Interface Constraints](#building-apps_user-interface-constraints) for important information about your app’s user interface.

### Uninstall Request (Optional)

Store owners have the option to uninstall any app at any time. When a store owner uninstalls an app, the app’s OAuth token is revoked and the app cannot make requests to the Stores API on the store’s behalf anymore.

You do not need to provide an Uninstall Callback URI. The lack of an Uninstall Callback URI does not prevent uninstallation. Instead, the Uninstall Callback URI allows you to track store owners who uninstall your app and to run cleanup operations, such as removing the store’s user accounts from your system.

Should you choose to provide an Uninstall Callback URI, please note that it must be publicly available, fully qualified, and served over TLS/SSL. If provided, BigCommerce will send a GET request to your Uninstall Callback URI when a store owner clicks to uninstall your app.

Example of a GET Request sent to the Uninstall Callback URI
```
GET /uninstall?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
	Host: app.example.com
```
Upon receiving the GET request, your app will need to process the signed payload.

### Remove User Request (Optional)

If you have not enabled [multi-user](#building-apps_multi-user-support) support, you will not provide a Remove User Callback URI and can ignore this section. If you enable multi-user support, you can optionally specify a Remove User Callback URI. It must be fully qualified, publicly available, and served over TLS/SSL. BigCommerce will send a GETrequest to your Remove User Callback URI when a store admin revokes a user’s access to your app. 


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

---

<a href='#building-apps_processing-signed-payload' aria-hidden='true' class='block-anchor'  id='building-apps_processing-signed-payload'><i aria-hidden='true' class='linkify icon'></i></a>

## Processing the Signed Payload

Processing the signed payload involves splitting and decoding it, verifying the HMAC signature, and processing the JSON object.

### Splitting and Decoding the Signed Payload

The signed payload is a string containing a base64 url-encoded JSON string and a base64 url-encoded HMAC signature. The parts are delimited by the `.` character:

```
encoded_json_string.encoded_hmac_signature
```


To decode the signed payload, complete the following steps:
1. Split signed_payload into its two parts at the `.` delimiter.
2. Decode encoded_json_string using base64url.
3. Convert the decoded JSON string into an object. See Processing the JSON object for more about this object.
4. Decode encoded_hmac_signature using base64url.
5. Use your client secret to verify the signature. See the next section for more details.

### Verifying the HMAC Signature

To verify the payload, you need to sign the payload using your client secret, and confirm that it matches the signature that was sent in the request.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Timing Attacks
> To limit the vulnerability of your app to timing attacks, we recommend using a constant time-string comparison function, rather than the equality operator, to check that the signatures match.

</div>
</div>
</div>

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">verifySignedRequest</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "verifySignedRequest"
subtitle: ""
lineNumbers: true
-->

```php
function verifySignedRequest($signedRequest)
{
    list($encodedData, $encodedSignature) = explode('.', $signedRequest, 2);

    // decode the data
    $signature = base64_decode($encodedSignature);
        $jsonStr = base64_decode($encodedData);
    $data = json_decode($jsonStr, true);

    // confirm the signature
    $expectedSignature = hash_hmac('sha256', $jsonStr, $clientSecret(), $raw = false);
    if (!hash_equals($expectedSignature, $signature)) {
        error_log('Bad signed request from BigCommerce!');
        return null;
    }
    return $data;
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### !hash_equals
> !hash_equals is available in PHP 5.6 and later. If you are running an older version of PHP, pull in a compatibility library such as the following: https://packagist.org/packages/realityking/hash_equals. BigCommerce’s sample app hello-world-app-php-silex app does this automatically.

</div>
</div>
</div>

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">verify()</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "verify()"
subtitle: ""
lineNumbers: true
-->

```ruby
require "base64"
require "openssl"

def verify(signed_payload, client_secret)
  message_parts = signed_payload.split(".")

  encoded_json_payload = message_parts[0]
  encoded_hmac_signature = message_parts[1]

  payload_object = Base64.strict_decode(encoded_json_payload)
  provided_signature = Base64.strict_decode(encoded_hmac_signature)

  expected_signature = OpenSSL::HMAC::hexdigest("sha256", client_secret, payload_object)

  return false unless secure_compare(expected_signature, provided_signature)

  JSON.parse(payload_object)
end

def secure_compare(a, b)
  return false if a.blank? || b.blank? || a.bytesize != b.bytesize
  l = a.unpack "C#{a.bytesize}"

  res = 0
  b.each_byte { |byte| res |= byte ^ l.shift }
  res == 0
end

```

### Processing the JSON Object

The JSON object embedded in the signed_payload contains information about the BigCommerce store and the store owner or user.

### Identifying the Store
Use the store information endpoint to identify the store to which the request pertains.

### Interpreting the User Information

| Request type | Multiple users enabled | Multiple users not enabled |
| --- | --- | --- |
| Load | Compare the user information to see if it matches that of the store owner (received at the time of [app installation](#building-apps_installation-update-sequence)) or that of an existing user. If the user information does not match either of these, then it represents a new user that you should add to your database or other storage. | The information should match that of the store owner, received at the time of [app installation](#building-apps_installation-update-sequence). |
| Uninstall | The user information should match that of the store owner. Only the store owner can uninstall your app. | Should match the store owner. |
| Remove user | The user information should match one of the users that you have stored. After locating the stored user, delete it from your database or other storage. | N/A |

### JSON Values

| Name | Data Type | Value Description |
| --- | --- | --- |
| user.id | integer | Unique identifier for the user who initiated the callback. |
| user.email | string | Email address of the user who initiated the callback. |
| owner.id | integer | Unique identifier for the user listed as the store owner. |
| owner.email | string | Email address of the user listed as the store owner. |
| context | string | The context value is part of the API path for this store and includes the store_hash. |
| store_hash | string |Unique identifier for the store. |
| timestamp | float | The time (in Unix time) when the callback was generated.|

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">User Information</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "User Information"
subtitle: ""
lineNumbers: true
-->

```json
{
    "user":
         {
        "id":9128,
        "email":"user@mybigcommerce.com"
     },
     "owner":
          {
         "id":9128,
         "email":"user@mybigcommerce.com"
     },
     "context":"stores/z4zn3wo",
     "store_hash":"z4zn3wo",
     "timestamp":1469823892.9123988
}
```

---

<a href='#building-apps_multi-user-support' aria-hidden='true' class='block-anchor'  id='building-apps_multi-user-support'><i aria-hidden='true' class='linkify icon'></i></a>

## Multi-User Support

When you register your app with BigCommerce, enabling multi-user support will allow store admins to manually authorize users – other than the store owner – to load the app. 

As soon as you enable multi-user support, the control panel of any store that has your app installed will be affected. If you already have an app published in the App Marketplace, be aware that this setting takes effect immediately. Therefore, we recommend testing your multi-user support using a separate app that is in draft status.

Let your customers know that you’ve enabled this feature. Otherwise, they won’t know that they can start granting access to users.

If multi-user support is added after your app has launched, the update will cause the app scopes to change and users will be alerted of the new permission request.

### The Control Panel Experience
Store admins will be able to adjust user permissions to grant/deny other store users’ access to your app. The next time the user logs in, they will see any apps for which they have been granted access. The user can then click on the app icon in the left navigation to load it.
Use your draft app and your sandbox store to review this behavior.

### The Load Request
Apps that support multiple users can expect the email and ID of the user that initiated the callback in addition to the owner’s email and ID in the JSON object sent in the load request. If a load request is sent with information for a user you haven’t seen yet, you should provision the user account and associate it with the store in your database.

Because you know the store owner’s email and ID from the App Installation sequence, your app can distinguish store owners from other users. This allows you to provide different user experiences based on the information in the load request. Here is a summary of the two types of users:

- Store owner: Can install, uninstall, and load apps.
- Users: Cannot install or uninstall apps. Permitted only to load the apps that a store admin has authorized.

For further details, please see [Load Request and Response](#building-apps_load-uninstall-removal-requests).

### The Remove User Request
In addition to their ability to add users, store admins can also remove users. This action generates a GET request to the Remove User Callback URI that you provided in My Apps. Your app the user identified in the request from its records.

For further information, please see [Remove User Request](#building-apps_load-uninstall-removal-requests).

---

<a href='#building-apps_external-app-installation' aria-hidden='true' class='block-anchor'  id='building-apps_external-app-installation'><i aria-hidden='true' class='linkify icon'></i></a>

## External App Installation

Apps can be installed from outside the BigCommerce control panel. For example, you could create an install link on your company’s site that directs the merchant to download your app. This section provides a step-by-step guide.

### Create an Install Button

First, embed an install button like the one below, at any web location from which you’d like to enable app installation:

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6490/1539297285625
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6490/1539297285625 "")

Redirect anyone who presses your button to: `https://login.bigcommerce.com/app/<your-app's-client-id>/install`



### Configure Your Button
Upon clicking, your button should open a modal similar to the image below. We recommend a modal sized 900px wide by 450px high.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6490/1539297431440
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6490/1539297431440 "")

Your button will link merchants to BigCommerce’s install endpoint for your application. Once the merchant clicks the link, they will be prompted to log in, then authorize your application, just like in the [normal installation flow](#building-apps_installation-update-sequence).

### Render Success/Failure Pages

Modify your application code to serve either a success or failure page, depending on whether the external installation was successful or unsuccessful.

If you skip this step, your application will load in the iframe created by your button. To ensure a good experience for your merchants, we strongly recommend that you return a confirmation page, instead of allowing your application to be loaded in that modal.

### Handling Errors

If your application’s installation was initiated and completed through an external link, BigCommerce will send your auth callback endpoint an extra parameter called external_install.
If you receive this parameter and there are no errors, call:

`https://login.bigcommerce.com/app/<your_app_client_id>/install/succeeded`

If there were errors, call:
`https://login.bigcommerce.com/app/<your_app_client_id>/install/failed`

Below is a sample code snippet of an auth callback that does this:


<!--
title: "Auth Callback"
subtitle: ""
lineNumbers: true
-->

```
   if params['external_install']
        return get 'https://login.bigcommerce.com/app/m8e1mkkmjw2xjinydqz7ie05to1y2nk/install/succeeded'
    end

    redirect '/'

rescue => e
    if params['external_install']
        return get 'https://login.bigcommerce.com/app/m8e1mkkmjw2xjinydqz7ie05to1y2nk/install/failed'
    end
```

Depending on which endpoint you call, we will render one of the following success/failed pages to the modal.

---

<a href='#building-apps_user-interface-constraints' aria-hidden='true' class='block-anchor'  id='building-apps_user-interface-constraints'><i aria-hidden='true' class='linkify icon'></i></a>

## User Interface Constraints

Single-click apps benefit from a high level of integration with the BigCommerce platform. Users interacting with your app will enjoy a seamless experience. BigCommerce achieves this by rendering your app&#39;s user interface inside of an iframe within the control panel. To ensure acceptance into the App Marketplace, your app should be able to perform all of its functions inside of the iframe.

While very usable and friendly, the iframe approach does require special attention from app developers. The remainder of this page discusses several functional areas to consider when designing and developing your app.

### About Mixed Content

The BigCommerce control panel is served over TLS/SSL. Your app must be hosted on a web server that accepts and sends TLS/SSL requests. In addition, all of the resources referenced in the HTML that you present to the end users must be served over TLS/SSL. You may find protocol-agnostic addressing helpful.

If the user interface retrieves images, scripts, or other assets over a connection not encrypted with TLS/SSL, the user will experience errors and possibly an inability to interact with your app. Before submitting your app, use an <a href="https://www.jitbit.com/sslcheck/" target="_blank">online crawler</a> to check for insecure content.

### About Same-Origin Policies

<a href="http://en.wikipedia.org/wiki/Same-origin_policy" target="_blank">Same-origin policies</a> restrict apps running within iframes from performing certain activities, such as interacting with other services and making OAuth connections. While apps that operate within the BigCommerce iframe get strong preference during App Marketplace considerations, we sometimes make exceptions for apps that need to interact with, and authenticate to, other services. If your app requires this, we advise you to open a new tab for actions that cannot occur within the iframe.

### About P3P and Cookies

Internet Explorer is one of the browsers that BigCommerce [supports](#supported-browsers), and our merchants do use it to access the control panel. If your app needs to set a cookie, you will need to craft a <a href="http://en.wikipedia.org/wiki/P3P" target="_blank">P3P policy</a>. Otherwise, your app will experience issues on Internet Explorer. Please see the following pages for more information:

*   <a href="http://www.techrepublic.com/blog/software-engineer/craft-a-p3p-policy-to-make-ie-behave/" target="_blank">Craft a P3P policy to make IE behave</a>
*   <a href="http://blogs.msdn.com/b/ieinternals/archive/2013/09/17/simple-introduction-to-p3p-cookie-blocking-frame.aspx" target="_blank">MSDN Intro to P3P Cookie Blocking</a>

---

<a href='#building-apps_hosting-your-app' aria-hidden='true' class='block-anchor'  id='building-apps_hosting-your-app'><i aria-hidden='true' class='linkify icon'></i></a>

## Hosting Your App
BigCommerce stores are hosted on [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region.

Therefore, you can maximize performance of your app (in terms of latency to the public API) by hosting in the same region. There is no requirement to do so, and you may host wherever you like.

---

<a href='#building-apps_faq' aria-hidden='true' class='block-anchor'  id='building-apps_faq'><i aria-hidden='true' class='linkify icon'></i></a>

## FAQ

**How can I make API calls?**   
We have built several [Hello World](https://developer.bigcommerce.com/tools-resources) apps to get you started quickly. You can use these apps as a starting point or an example for building a Single-click app. 

If you'd like to make test API requests without the overhead of installing a draft app, you can generate [API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials) by creating an API Account in your store's control panel.

**How can I sell my app?**  
The first step to listing an app in the BigCommerce App Marketplace is to apply to the BigCommerce [partner program](https://www.bigcommerce.com/partners/). 

For more details on including your app in the Marketplace, see [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements).

---

## Resources

### Tools
* [Online Crawler](https://www.jitbit.com/sslcheck/) (JitBit)
### Sample Apps
* [Ruby Hello World](https://github.com/bigcommerce/omniauth-bigcommerce) (BigCommerce GitHub)
* [Python Hello World](https://github.com/bigcommerce/hello-world-app-python-flask) (BigCommerce GitHub)
### Related Articles
* [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication)
* [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)
* [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)
* [Store Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating) (Knowledge Base)
* [Supported Browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) (Knowledge Base)
* [BigCommerce Partners](https://www.bigcommerce.com/partners/) (BigCommerce)
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) (BigCommerce Developer Blog)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) (BigCommerce Developer Blog)
### Additonal Resources
* [Same Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) (Wikipedia)
* [Craft a P3P Policy to Make IE Behave](https://www.techrepublic.com/blog/software-engineer/craft-a-p3p-policy-to-make-ie-behave/) (Tech Republic)
* [Quick Look at P3P](https://blogs.msdn.microsoft.com/ieinternals/2013/09/17/a-quick-look-at-p3p/) (Microsoft Blogs)
* [Google Cloud](https://cloud.google.com/) (Google)

