# Single-Click App OAuth Flow

When you create an app's profile, BigCommerce creates an app API account. See []() >> developing.

Once you have a client ID and client secret, you're ready to write the code grant authorization flow that creates a unique `access_token` for each store. This article covers >>> list, using "concepts". 

It may be more appropriate for your application to use an API client to handle this logic; see [the list of API clients](#helpful-tools >>> is there a list to link to?) that expose OAuth-related helper methods. 

>>> assumes a skill level???


* each store needs its own access token
* your app's API must expose a callback endpoint at GET /auth that BigCommerce can hit to generate and regenerate a store's access token
* full list of 
* currently can't regenerate arbitrarily; only in response to the following events:
  * app API account's OAuth scopes change
  * store owner's email address changes
* BigCommerce hits this callback endpoint on **Install** (and reinstall?)
* uses a ((slightly?) modified?) code grant authorization flow



## Grant code flow overview

Single click app authorization and authentication occurs via [OAuth2 authorization code grant](https://tools.ietf.org/html/rfc6749#section-4.1) (tools.ietf.org). The sequence is as follows:
>>> DIAGRAM; mermaid vs lucidchart, for links

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

<!-- theme: info -->
> #### Note
> * Typically, only [store owners](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating) can create API accounts and generate `access_token`s.
> *  However, if and when your app is approved to be publicly available for additional stores to install, it will be able to programmatically configure API accounts *on behalf* of the store owner. 
> * All app callbacks must be served over `https`. >>> LINK to all app endpoints, this includes callbacks



## Receiving the GET request

The `GET` request to your app's **auth** callback URL contains a temporary `code` that can be exchanged for a permanent `access_token`. It also includes a unique value that identifies the store installing or updating your app, as well as authorized scopes.

```http title="Example request: auth callback"
GET /auth?code=qr6h3thvbvag2ffq&scope=store_v2_orders&context=stores/g5cd38 HTTP/1.1
```

| Parameter | Description |
|:----------|:------------|
| `code`    | A temporary code to pass during the grant code authorization flow. |
| `scope`   | >>>TEST (A comma-separated) list of the OAuth scopes associated with this app's (app API account)[/api-docs/getting-started/authentication/rest-api-authentication#app-api-accounts]. |
| `context` | A string that contains the subject store's `store_hash` in the following form: `stores/{{STORE_HASH}}`.|

>>> the following callout should just be content

<!-- theme: info -->
> #### Note
> * When your app receives a new token, any previously issued token is invalidated. >>> incorrect, it's per store
> * As a best practice, your app should validate the list of scopes to ensure that it matches your app's needs and fails if it does not. At this time, the user cannot pick and choose scopes. The dialog (>>>it's a view; does KB have an article representing UX?) presented to the user requires the user to approve all scopes or none. For more information about available scopes, see [OAuth scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).
> * The request comes from the client browser, rather than directly from BigCommerce. This request allows you to use a non-publicly available auth callback URL while testing your app. >>> is this true?

## Responding to the GET request

Upon receiving the `GET` request at the auth callback URL, your app should return some HTML to the merchant browser. BigCommerce renders this in an **iFrame** embedded in your store's >>>(audience dimorphism; target store, user store, sandbox store?) control panel. It could be a form that collects further information from the user, or you could redirect the user to your app's main page. >>> (do we need speculation?) If you do not respond with HTML or redirect, the user will be left looking at a blank screen.

## Making the POST request
 The `POST` request's primary purpose is to exchange the temporary access `code` for a permanent `access_token`. Pass the parameters and their values inside the request body, using query parameters and URL-encoding. >>> use more grant code auth-centered language

```http
POST https://login.bigcommerce.com/oauth2/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 186

>>> booker verified that this supports JSON post

client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&code=qr6h3thvbvag2ffq&scope=store_v2_orders&grant_type=authorization_code&redirect_uri=https://app.example.com/oauth&context=stores/{STORE_HASH}
```

| Parameter | Description |
|-|-|
| `client_id` | The Client ID for your app obtained in the [Developer Portal](https://devtools.bigcommerce.com/my/apps). |
| `client_secret` | The Client Secret for your app obtained in the [Developer Portal](https://devtools.bigcommerce.com/my/apps). | >>> obvs take it out
| `code` | Temporary access code received in the `GET` request.|
| `scope` | List of OAuth scopes received in the `GET` request. For more information about available scopes, see [OAuth scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).|
| `grant_type` | Always set to `authorization_code`. |
| `redirect_uri` | Must be identical to your registered auth callback URI. |
| `context` | Store hash received in the `GET` request.|


## Receiving the POST response

BigCommerce will respond to the `POST` request with JSON containing a permanent `access_token`. Use this `access_token` to authenticate API requests against the store. A `user` object for identifying app users during `load` and `uninstall` is also included. Store these values securely.

```json
>>>TEST
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

Update requests refresh the `access_token` and `scope`: >>> separate section?

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

<!-- theme: info -->
> #### Note
> * Store the `access_token` securely for future use. >>> in development only
> * Store `user` and `store_hash` values to identify the user and store at `load` and `uninstall`.



## Code samples
>>> leave untested for now

Making the `POST` request in PHP:

```php
use Bigcommerce\Api\Connection;
$tokenUrl = "https://login.bigcommerce.com/oauth2/token";
$connection = new Connection();
$connection->useUrlencoded();
$response = $connection->post($tokenUrl, array(
    "client_id" => "CLIENT_ID",
    "client_secret" => "CLIENT_SECRET", >>> make sure all these are out
    "redirect_uri" => "https://app.example.com/oauth",
    "grant_type" => "authorization_code",
    "code" => $request->get("code"),
    "scope" => $request->get("scope"),
    "context" => $request->get("context"),
));
$token = $response->access_token;
```

## Security considerations
>>> rewrite but maybe not for now

[RFC 6749](https://tools.ietf.org/html/rfc6749#section-10) discusses security considerations, recommendations, and requirements. The following are some requirements and recommendations applicable to apps:
* Request access tokens with the minimal scope necessary.
* Serve all redirect URIs over TLS.
* Keep `access_token`s confidential in transit and storage.
* Do not transmit access tokens, refresh tokens, or client credentials in the clear.
* Do not transmit authorization codes in the clear. >>> even though BC does...
* Educate end-users about the risks phishing attacks pose.
* Provide mechanisms that make it easy for end-users to confirm the authenticity of your app.
* Implement CSRF protection on redirect URI.

For additional details, see [Security Considerations in RC 6749](https://tools.ietf.org/html/rfc6749#section-10). For a list of the top web application security risks and best practices for avoiding them, see [OWASP Top Ten](https://owasp.org/www-project-top-ten/).


## Helpful tools

The following BigCommerce API clients expose helper methods for fetching an OAuth `access_token`:
* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [bigcommerce/node-bigcommerce](https://github.com/bigcommerce/node-bigcommerce/)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [bigcommerce/bigcommerce-api-php](https://github.com/bigcommerce/bigcommerce-api-php)
  * Fetches `access_token`
* [bigcommerce/omniauth-bigcommerce](https://github.com/bigcommerce/omniauth-bigcommerce)
  * Fetches `access_token`

## Next step
* [Handle load, uninstall, and remove user callbacks](/api-docs/apps/guide/callbacks)

## Resources

### Related articles
* [About Our APIs](/api-docs/getting-started/about-our-api)
* [Authentication](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis)
* [Types of Apps](/api-docs/apps/guide/types-of-apps)

### Sample apps
* [Node / React / Next.js](https://github.com/bigcommerce/sample-app-nodejs) with [quick start tutorial](https://developer.bigcommerce.com/api-docs/apps/quick-start)
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Netlify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/bigcommerce/node-bigcommerce/)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design)
* [Figma UI Kit](//figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [BigDesign Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)

### Additional resources
* [OAuth 2.0 Simplified](https://oauth.net/getting-started/) ([oauth.net](https://oauth.net/))
* [What the Heck is OAuth](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth) ([developer.okta.com](https://developer.okta.com/))
* [An Introduction to OAuth 2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) ([DigitalOcean](https://www.digitalocean.com))
* [RFC6749](https://tools.ietf.org/html/rfc6749) ([tools.ietf.org](https://tools.ietf.org/))
* [OWASP Top Ten](https://owasp.org/www-project-top-ten/) ([owasp.org](https://owasp.org/))
