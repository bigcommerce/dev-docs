# Implementing App OAuth Flow

<div class="otp" id="no-index">

### On This Page
- [OAuth Summary](#oauth-summary)
- [Receiving the GET Request](#receiving-the-get-request)
- [Responding to the GET Request](#responding-to-the-get-request)
- [Making the POST Request](#making-the-post-request)
- [Receiving the POST Response](#receiving-the-post-response)
- [Code Samples](#code-samples)
- [Helpful Tools](#helpful-tools)
- [Next Steps](#next-steps)
- [Resources](#resources)

</div>

This article contains all the technical details necessary to implement the app OAuth flow. If you plan on handling it completely with your own code, you'll want to read this documentation carefully. If you're starting with a sample app or using an API client that handles OAuth for you, you should read through so that at least have a high-level familiarity with flow and it's callback sequence.

## OAuth Summary
The OAuth sequence is as follows:
1. [`GET`](#receiving-the-get-request) from BigCommerce to app (triggered by merchant clicking **Install**) containing:
      - `code`
      - `client_id`
      - `client_secret`
      - `scopes`
2. [`RESPONSE`](#responding-to-the-get-request) from app to BigCommerce containing:
   * HTML for control panel `iFrame` in body.
3. `POST` from app to BigCommerce containing:
     - `code`
     - `client_id`
     - `client_secret`
4. `RESPONSE` from BigCommerce to app containing:
   * `access_token` authorized against the store that installed the app.

![App Installation Sequence](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536263813949 "App Installation Sequence")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> ### Note
> * API token creation is a permission reserved for the [store owner](https://forum.bigcommerce.com/s/article/Store-API-Accounts#creating) user account.
> *  An app can request authentication *on behalf* of a store owner, allowing the app to make API requests against store data.
> * All app callbacks must be served over `https` (you should also have access to your app's server logs which will allow you to see the information in the request).

</div>
</div>
</div>

## Receiving the GET Request
```http
GET /auth?code=qr6h3thvbvag2ffq&scope=store_v2_orders&context=stores/g5cd38 HTTP/1.1
```
**Description**: the `GET` request to the app's **Auth** Callback URL contains a temporary `code` that can be exchanged for a permanent `access_token`. It also includes a unique value that identifies the store installing or updating the app, as well as authorized scopes:

| Parameter | Description |
|-|-|
| `code` | Temporary code to exchange for a permanent `access_token`. |
| `scope` | List of scopes authorized by the user. |
| `context` | The store hash in the form of `stores/{{STORE_HASH}}`; required in API requests|

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * When the app receives a new token, any previously issued token is invalidated.
> * As a best practice, the app should validate this list to ensure that it matches the app's needs, and fail if it does not. However, at this time, the user does not have any opportunity to pick and choose between scopes. The dialog presented to the user requires the user to approve all scopes or none.
> * The request comes from the client browser, rather than directly from BigCommerce. This allows you to use a non-publicly-available Auth Callback URI while testing the app.

</div>
</div>
</div>

## Responding to the GET Request
Upon receiving the `GET` request at the Auth Callback URI, the app should return some HTML to the merchant browser. BigCommerce renders this in an **iFrame** inside of the control panel. It could be a form that collects further information from the user, or you could redirect the user to the app's main page. If you do not respond with HTML or redirect, the user will be left looking at a blank screen.

## Making the POST Request
```http
POST https://login.bigcommerce.com/oauth2/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 186

client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&code=qr6h3thvbvag2ffq&scope=store_v2_orders&grant_type=authorization_code&redirect_uri=https://app.example.com/oauth&context=stores/{STORE_HASH}
```
**Description**: The `POST` requests primary purpose is to exchange the temporary access `code` for a permanent `access_token`. Pass the parameters and their values inside the request body, using query parameters and URL-encoding.

| Parameter | Description |
|-|-|
| `client_id` | The Client ID for your app, obtained during [registration](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_client-id-secret). |
| `client_secret` | The Client Secret for your app, obtained during [registration](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_client-id-secret). |
| `code` | Temporary access code received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#receiving-the-get-request) discussed above. |
| `scope` | List of OAuth scopes received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#receiving-the-get-request) discussed above. |
| `grant_type` | Always use the following: authorization_code. |
| `redirect_uri` | Must be identical to your registered Auth Callback URI. |
| `context` | The store hash received in the [GET request](/api-docs/getting-started/building-apps-bigcommerce/building-apps#receiving-the-get-request), in the format: `stores/{STORE_HASH}` |


## Receiving the POST Response

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

Update requests refresh the `access_token` and `scope`:

```json
{
  "access_token": "NEW_ACCESS_TOKEN",
  "scope": "store_v2_orders,store_v2_products",
  "user": {
    "id": 24654,
    "email": "merchant@mybigcommerce.com"
  },
  "context": "stores/{STORE_HASH}"
}
```

**Description**: the `POST` response will include object containing the permanent `access_token`, user information, and other values.

| Name | Data Type | Value Description |
|-|-|-|
| access_token | string | The permanent OAuth token that your app can use to make requests to the Stores API on behalf of the user. Store this value securely. |
| scope | string | List of authorization scopes. |
| id | integer | Unique identifier for the user. Store this value to identify the user at load and uninstall. |
| email | string | The user’s email address. Store this value to identify the user at load and uninstall. |
| context | string | The store hash, as well as a base path: `stores/{_store_hash_}` |

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Store `access_token` securely for future use.
> * Store `user` and `store_hash` values to identify the user and store at `load` and `uninstall`.

</div>
</div>
</div>

## Code Samples
Making the `POST` request in PHP:

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

## Helpful Tools
The following clients expose helper methods for handling the OAuth flow:

* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload`
* [conversio/node-bigcommerce](https://github.com/getconversio/node-bigcommerce)
  * Fetches `access_token`
  * Verifies `signed_payload`
* [bigcommerce/bigcommerce-api-php](https://github.com/bigcommerce/bigcommerce-api-php)
  * Fetches `access_token`

## Next Steps

## Resources

### Sample Apps
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Nelify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/getconversio/node-bigcommerce)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog Posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
