# Single-Click App OAuth Flow


<div class="otp" id="no-index">

### On this page
- [Helpful tools](#helpful-tools)
- [OAuth summary](#oauth-summary)
- [Receiving the GET request](#receiving-the-get-request)
- [Responding to the GET request](#responding-to-the-get-request)
- [Making the POST request](#making-the-post-request)
- [Receiving the POST response](#receiving-the-post-response)
- [Code samples](#code-samples)
- [Security considerations](#security-considerations)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

If you're developing a single-click app, you'll need to handle the OAuth flow that begins when a merchant clicks **Install**. This article contains the technical details necessary to do so. If you don't want to start from scratch, see [Helpful tools](#helpful-tools) for a list of API clients that expose OAuth related helper methods. This documentation assumes you're an experienced developer familiar with web app authentication. If this is your first time approaching OAuth, see [Additional resources](#additional-resources) for links to introductory articles on the [OAuth framework](https://tools.ietf.org/html/rfc6749) (tools.ietf.org).

## Helpful tools

The following BigCommerce API clients expose helper methods for fetching an OAuth `access_token`:
* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload`
* [conversio/node-bigcommerce](https://github.com/getconversio/node-bigcommerce)
  * Fetches `access_token`
  * Verifies `signed_payload`
* [bigcommerce/bigcommerce-api-php](https://github.com/bigcommerce/bigcommerce-api-php)
  * Fetches `access_token`
* [bigcommerce/omniauth-bigcommerce](https://github.com/bigcommerce/omniauth-bigcommerce)
  * Fetches `access_token`

## OAuth summary

Single click app authorization and authentication occurs via [OAuth2 authorization code grant](https://tools.ietf.org/html/rfc6749#section-4.1) (tools.ietf.org). The sequence is as follows:

1. [`GET`](#receiving-the-get-request) request from BigCommerce to your app (triggered by merchant clicking **Install**) containing:
   - `code`
   - `client_id`
   - `client_secret`
   - `scopes`
2. [`RESPONSE`](#responding-to-the-get-request) from your app to BigCommerce containing:
   * HTML for control panel `iFrame` in body.
3. `POST` request from your app to BigCommerce containing:
     - `code`
     - `client_id`
     - `client_secret`
4. `RESPONSE` from BigCommerce to your app containing:
   * `access_token` authorized against the store that installed your app.

![App Installation Sequence](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536263813949 "App Installation Sequence")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * API token creation is a permission reserved for the [store owner](https://forum.bigcommerce.com/s/article/Store-API-Accounts#creating) user account.
> * An app can request authentication *on behalf* of a store owner, allowing your app to make API requests against store data.
> * All app callbacks must be served over `https` (you should also have access to your app's server logs which will allow you to see the information in the request).

</div>
</div>
</div>

## Receiving the GET request

The `GET` request to your app's **auth** callback URL contains a temporary `code` that can be exchanged for a permanent `access_token`. It also includes a unique value that identifies the store installing or updating your app, as well as authorized scopes.

```http
GET /auth?code=qr6h3thvbvag2ffq&scope=store_v2_orders&context=stores/g5cd38 HTTP/1.1
```

| Parameter | Description |
|-|-|
| `code` | Temporary code to exchange for a permanent `access_token`. |
| `scope` | List of scopes authorized by the user. |
| `context` | The `store_hash` in the form of `stores/{{STORE_HASH}}`; required in API requests.|

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
>
> * When your app receives a new token, any previously issued token is invalidated.

> * As a best practice, your app should validate the list of scopes to ensure that it matches your app's needs and fails if it does not. At this time, the user cannot pick and choose scopes. The dialog presented to the user requires the user to approve all scopes or none. For more information about available scopes, see [OAuth scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

> * The request comes from the client browser, rather than directly from BigCommerce. This request allows you to use a non-publicly available auth callback URL while testing your app.

</div>
</div>
</div>

## Responding to the GET request

Upon receiving the `GET` request at the auth callback URL, your app should return some HTML to the merchant browser. BigCommerce renders this in an **iFrame** inside of the control panel. It could be a form that collects further information from the user, or you could redirect the user to your app's main page. If you do not respond with HTML or redirect, the user will be left looking at a blank screen.

## Making the POST request
 The `POST` requests primary purpose is to exchange the temporary access `code` for a permanent `access_token`. Pass the parameters and their values inside the request body, using query parameters and URL-encoding.

```http
POST https://login.bigcommerce.com/oauth2/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 186

client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&code=qr6h3thvbvag2ffq&scope=store_v2_orders&grant_type=authorization_code&redirect_uri=https://app.example.com/oauth&context=stores/{STORE_HASH}
```

| Parameter | Description |
|-|-|
| `client_id` | The Client ID for your app obtained in the [Developer Portal](https://devtools.bigcommerce.com/my/apps). |
| `client_secret` | The Client Secret for your app obtained in the [Developer Portal](https://devtools.bigcommerce.com/my/apps). |
| `code` | Temporary access code received in the `GET` request.|
| `scope` | List of OAuth scopes received in the `GET` request. For more information about available scopes, see [OAuth scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).|
| `grant_type` | Always set to `authorization_code`. |
| `redirect_uri` | Must be identical to your registered auth callback URI. |
| `context` | Store hash received in the `GET` request.|


## Receiving the POST response

BigCommerce will respond to the `POST` request with JSON containing a permanent `access_token`. Use this `access_token` to authenticate API requests against the store. A `user` object for identifying app users during `load` and `uninstall` is also included. Store these values securely.

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

| Name | Data Type | Value Description |
|-|-|-|
| `access_token` | string | The permanent OAuth token that your app can use to make requests to the Stores API on behalf of the user. Store this value securely. |
| `scope` | string | List of authorization scopes. |
| `user.id` | integer | Unique identifier for the user. Store this value to identify the user at load and uninstall. |
| `user.email` | string | The user’s email address. Store this value to identify the user at load and uninstall. |
| `context` | string | The store hash, as well as a base path: `stores/{_store_hash_}` |

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Store the `access_token` securely for future use.
> * Store `user` and `store_hash` values to identify the user and store at `load` and `uninstall`.

</div>
</div>
</div>

## Code samples

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

## Security considerations

[RFC 6749](https://tools.ietf.org/html/rfc6749#section-10) discusses security considerations, recommendations, and requirements. The following are some requirements and recommendations applicable to apps:
* Request access tokens with the minimal scope necessary.
* Serve all redirect URIs over TLS.
* Keep `access_tokens` confidential in transit and storage.
* Do not transmit access tokens, refresh tokens, or client credentials in the clear.
* Do not transmit authorization codes in the clear.
* Educate end-users about the risks phishing attacks pose.
* Provide mechanisms that make it easy for end-users to confirm the authenticity of your app.
* Implement CSRF protection on redirect URI.

For additional details, see [Security Considerations in RC6749](https://tools.ietf.org/html/rfc6749#section-10). For a list of the top web application security risks and best practices for avoiding them, see [OWASP Top Ten](https://owasp.org/www-project-top-ten/).

## Next steps
* [Handle load, uninstall, and remove user callbacks](https://developer.bigcommerce.com/api-docs/apps/guide/callbacks)

## Resources

### Related articles
* [About Our APIs](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api)
* [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication/authenticating-bigcommerce-apis)
* [Types of Apps](https://developer.bigcommerce.com/api-docs/apps/guide/types-of-apps)

### Sample apps
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Netlify](https://github.com/bigcommerce/channels-app/)
* [Node / Express / CodeSandbox](https://codesandbox.io/s/express-hello-world-app-fq5t1?file=%2Fapp.js)

### Tools
* [Node API Client](https://github.com/getconversio/node-bigcommerce)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [BigDesign Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)

### Additional resources
* [OAuth 2.0 Simplified](https://oauth.net/getting-started/) (oauth.net)
* [What the Heck is OAuth](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth) (developer.okta.com)
* [An Introduction to OAuth 2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) (www.digitalocean.com)
* [RFC6749](https://tools.ietf.org/html/rfc6749) (tools.ietf.org)
* [OWASP Top Ten](https://owasp.org/www-project-top-ten/) (owasp.org)
