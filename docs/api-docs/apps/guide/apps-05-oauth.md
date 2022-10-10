# Single-Click App OAuth Flow


After you [install your draft app](/api-docs/apps/guide/development) and [create an app profile](/api-docs/apps/guide/developer-portal), you're ready to write the code grant authorization flow that generates a unique `access_token` for each store that installs your app. This article covers the sequence and contents of API requests and responses in the code grant authorization flow for a BigCommerce app. 

It may be more appropriate for your application to use an API client to handle this logic; see [the list of BigCommerce API clients](#helpful-tools) that expose OAuth-related helper methods. 

<!-- theme: info -->
> #### Store owner access_token constraint
> Typically, only [store owners](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating) can create API accounts and `access_token`s for a store. However, when an app is approved to be publicly available for additional stores to install, it can generate `access_token`s *on behalf* of store owners. 

## Overview

Your app must expose a callback endpoint, `GET /auth`, that the merchant's store control panel can hit to initiate the code grant authorization flow. For a list of all the callback endpoints your app can expose, both required and optional, see [Single-Click App Callback Handlers](/api-docs/apps/guide/callbacks).

BigCommerce uses a modified version of the [OAuth2 authorization code grant (tools.ietf.org)](https://tools.ietf.org/html/rfc6749#section-4.1). The sequence is as follows:

1. The merchant initiates installing your app by signing in to their store control panel and doing one of the following: 
  * clicking **Install** in the [App Marketplace](https://www.bigcommerce.com/apps/), or 
  * following a direct installation link.
2. The merchant accepts the app's OAuth scope permissions. The OAuth consent view presented to the merchant requires them to approve all the scopes to install the app; at this time, merchants cannot pick and choose scopes.
3. The merchant's [browser sends a GET request to the app](#receiving-the-auth-callback) server's `GET /auth` endpoint that contains some of the information necessary to request a unique `access_token` for the store. 
4. The [app sends POST request to BigCommerce](#requesting-the-access_token) to request a unique `access_token` for the store. 
5. BigCommerce responds with either an error or an `access_token` unique to the merchant's store; see [receiving the access_token response](#receiving-the-access_token-response).
6. The app saves the store's unique `access_token` and handles any internal logic.
7. The app sends a [response to the browser's GET request](#responding-to-the-auth-callback) in step 3 that contains markup to render the app's landing view in the iFrame the store control panel provides.

After your app has an `access_token` for the store, the following events can mark the `access_token` for invalidation the next time the merchant opens the app:
* You change the app's OAuth scopes.
* The merchant's email address changes.

The next time the merchant opens the app in the store control panel, the browser will prompt them to accept the changes. Once they accept, their previous `access_token` will be invalid, and your app will receive a fresh auth callback for their store.  

## Receiving the auth callback

<!-- theme: info -->
> #### Auth callback URL requirement
> In production, all app callback URLs must be publicly available, fully qualified, and served over TLS/SSL.

The request to your app's `GET /auth` endpoint contains query parameters required to request an `access_token`.

It's a best practice to request and receive an `access_token` **before** responding to the auth callback.

<!--
type: tab
title: Example request
-->

```http title="Example request: auth callback" lineNumbers
GET https://your_app.example.com/auth?account_uuid=12345678-90ab-cdef-1234-567890abcdef&code=qr6h3thvbvag2ffq&context=stores%2Fg5cd38&scope=store_v2_orders+store_channel_listings_read_only
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: https://login.bigcommerce.com/
```

<!-- 
type: tab
title: URL-decoded query parameters
-->

```json title="Example query parameters: auth callback" lineNumbers
{
  "account_uuid": "12345678-90ab-cdef-1234-567890abcdef",
  "code": "qr6h3thvbvag2ffq",
  "context": "stores/g5cd38",
  "scope": "store_v2_orders store_channel_listings_read_only"
}
```

<!-- type: tab-end -->

### Query parameters in auth callback

| Parameter | Description |
|:----------|:------------|
| `code` | The proverbial code in the code grant authorization flow; exchange for a semi-permanent `access_token`. |
| `scope` | A space-separated list of the OAuth scopes associated with this app's [API account](/api-docs/getting-started/authentication/rest-api-authentication#app-api-accounts). |
| `context` | The path that identifies the store in API requests to `https://api.bigcommerce.com`; a string of the form `stores/{{STORE_HASH}}`. |
| `account_uuid` | The ID of the Developer Portal account that registered the app profile. |

Before proceeding with the grant code authorization flow, it's a best practice to validate the list of scopes to ensure that it matches the scopes currently configured in your app profile.

## Requesting the access_token


To generate an access_token for the merchant's store, send a `POST` request to `https://login.bigcommerce.com/oauth2/token`. The request body contains a combination of query arguments from the auth callback and credentials from your app profile.

```http title="Example request: Create an access_token" lineNumbers
POST https://login.bigcommerce.com/oauth2/token
Accept: application/json
Content-Type: application/json

{
  "client_id": {{CLIENT_ID}},
  "client_secret": {{CLIENT_SECRET}},
  "code": "qr6h3thvbvag2ffq",
  "context": "stores/g5cd38",
  "scope": "store_v2_orders store_channel_listings_read_only",
  "grant_type": "authorization_code",
  "redirect_uri": "https://your_app.example.com/auth"
}

```

### Request body properties in the access_token request

| Property | Description |
|:---------|:------------|
| `client_id` | Your app's client ID. |
| `client_secret` | Your app's client secret. |
| `code` | The `code` from the auth callback; see the [list of auth callback query parameters](#query-parameters-in-auth-callback). |
| `scope` | The `scope` list from the auth callback; see the [list of auth callback query parameters](#query-parameters-in-auth-callback).|
| `context` | The store `context` from the auth callback; see the [list of auth callback query parameters](#query-parameters-in-auth-callback). |
| `grant_type` | The value is always `authorization_code`. |
| `redirect_uri` | Identical to the auth callback registered in the app profile. |



## Receiving the access_token response

BigCommerce responds to the access_token request with JSON that contains a permanent `access_token`, among other information. Use this `access_token` to authenticate API requests the app makes on behalf of the store; see [Authentication and Example Requests](/api-docs/getting-started/authentication). To provide the most responsive app architecture and re-authentication checks, save all the response values.

```json title="Example response: Create an access_token" lineNumbers
{
  "access_token": "xxxxalphanumstringxxxx",
  "scope": "store_v2_orders store_channel_listings_read_only",
  "user": {
    "id": 24654,
    "username": "merchant@example.com",
    "email": "merchant@example.com"
  },
  "context": "stores/g5cd38",
  "account_uuid": "12345678-90ab-cdef-1234-567890abcdef"
}
```

### Response body properties for the access_token request

| Property | Type | Description |
|:---------|:-----|:------------|
| `access_token` | string | The semi-permanent security token that your app can use to make requests on behalf of the store. Save this value securely for future requests. |
| `scope` | string | A space-separated list of the OAuth scopes this `access_token` authorizes access to. |
| `user.id` | integer | BigCommerce’s unique identifier for the merchant or authorized user. Save this value to identify the user in future requests. |
| `user.username` | string | The username that the initiating user has on file with BigCommerce. |
| `user.email` | string | The email address that the owner or authorized user has on file with BigCommerce. Save this value for future requests. |
| `context` | string | The path that identifies the store in API requests to `https://api.bigcommerce.com`; a string of the form `stores/{{STORE_HASH}}`. |
| `account_uuid` | string, UUID | The ID of the Developer Portal account that registered the app profile. |

## Responding to the auth callback

After you save the `access_token` response body information, respond to the `GET /auth` callback with markup and assets to render in the store control panel. BigCommerce renders the response view inside an **iFrame**, so ensure that any JavaScript you send is scoped to avoid conflicts with the store control panel's JavaScript.

If you do not respond, the merchant will be left looking at a blank screen and will not be able to interact with your app.


## Security considerations

[RFC 6749 (tools.ietf.org)](https://tools.ietf.org/html/rfc6749) discusses security considerations, recommendations, and requirements. The following are some requirements and recommendations applicable to apps:
* Request access tokens with the minimal scope necessary.
* Keep access tokens and client secrets confidential in transit and storage.
* Educate end-users about the risks phishing attacks pose.
* Implement CSRF protection on redirect URIs.

For additional details, see [Security Considerations in RFC 6749 (tools.ietf.org)](https://tools.ietf.org/html/rfc6749#section-10). For a list of the top web application security risks and best practices for avoiding them, see [OWASP Top Ten (owasp.org)](https://owasp.org/www-project-top-ten/).


## Helpful tools

The following BigCommerce API clients expose helper methods for BigCommerce's code grant authorization flow:
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [Node API Client](https://github.com/bigcommerce/node-bigcommerce/)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
  * Fetches `access_token`
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
  * Fetches `access_token`

## Next step
* [Handle load, uninstall, and remove_user callbacks](/api-docs/apps/guide/callbacks)

## Resources

### Related articles
* [About Our APIs](/api-docs/getting-started/about-our-api)
* [Authentication](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis)

### Sample apps
* [Node / React / Next.js](https://github.com/bigcommerce/sample-app-nodejs) with [quick start tutorial](/api-docs/apps/quick-start)
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
* [Figma UI Kit](https://figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [BigDesign Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)

### Additional resources
* [OAuth 2.0 Simplified (oauth.net)](https://oauth.net/getting-started/)
* [RFC 6749 (tools.ietf.org)](https://tools.ietf.org/html/rfc6749) 
* [OWASP Top Ten (owasp.org)](https://owasp.org/www-project-top-ten/) 
