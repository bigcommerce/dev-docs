# Single-Click App Callback Handlers

After a store owner installs your single-click app, they and their authorized users will need to use it and configure any settings. In turn, your app will likely need to store and manage information about the stores and users you're supporting.

This article is a reference for endpoints to which we send event-driven callbacks, and a guide to writing handlers that verify and use our JWT payloads. It also describes the payload schema of the `signed_payload_jwt`.

<!-- theme: info -->
> #### Callback URL requirements
> In production, all app callback URLs must be publicly available, fully qualified, and served over TLS/SSL.

## Overview

Your app's front-end views render inside an iFrame in the store control panel, so your app has no native ability to listen for a few high-level events. To support your work, BigCommerce sends `GET` requests to callback routes in your app that correspond to three events: opening the app, uninstalling the app, and revoking a user's access to the app. Each request includes a signed JSON web token (_JWT_), which contains identifying information about the store and the user. 

Your app is only required to handle the `GET /auth` and `GET /load` endpoints, but we recommend writing handlers for the others, as well. Please see the corresponding detail sections that follow for more about the consequences of not handling optional callback endpoints.

The following table lists the app management callbacks that BigCommerce stores send: the three listed in the preceding paragraph, plus the auth callback described in [Single-Click App OAuth Flow](/api-docs/apps/guide/auth).

| Endpoint | Required | Request Origin | Payload | Expected Response | Event Description |
|:---------|:--------:|:---------------|:--------|:-----------------|:------------------|
| `GET /auth` | yes | browser | URL-encoded | markup | See [Implement the OAuth flow](/api-docs/apps/guide/auth). |
| `GET /load` | yes | browser | JWT | markup | The store owner or authorized user clicks to load the app. |
| `GET /uninstall` | no | server | JWT | JSON | The store owner clicks to uninstall the app. |
| `GET /remove_user` | no | server | JWT | JSON | The store owner revokes a user's access to the app. |

## Render the app with load

Once the store owner installs your app, it appears on the **Apps** sub-menu list in their store control panel, as well as their authorized users' control panels. When a user clicks your app's listing or another referring UI component, BigCommerce dispatches a request to your app's `GET /load` endpoint. The following is an example request: 

```http title="Example request: /load callback from BigCommerce"
GET https://your_app.example.com/load?signed_payload_jwt={{header_b64.payload_claims_b64.signature_b64}}
Accept: application/json
```

After your app [verifies the payload](#decode-and-verify-signed_payload_jwt), [identifies the requesting user](#work-with-payload-claims), and handles any internal business, respond with the markup and assets for the view that you want BigCommerce to render in the provided **iFrame**.

## Deactivate stores with uninstall

When the store owner clicks the **Uninstall** button on your app's card in the store control panel, BigCommerce dispatches a request to the app's `GET /uninstall` endpoint. The following is an example request:

```http title="Example request: uninstall callback from BigCommerce"
GET https://your_app.example.com/uninstall?signed_payload_jwt={{header_b64.payload_claims_b64.signature_b64}}
Accept: application/json
```

After your app [verifies the payload](#decode-and-verify-signed_payload_jwt) and [identifies the requesting user](#work-with-payload-claims), handle any internal business, such as marking the user inactive in your app's database or decrementing the number of active installations. You do not need to send a response. If you do not write a handler for the `GET /uninstall` endpoint, BigCommerce will still uninstall your app from the owner's store, but your app will not know that.

## Revoke user access with remove_user

When the store owner revokes a user's authorization to access your app, BigCommerce dispatches a request to the app's the `GET /remove_user` endpoint. The following is an example request:

```http title="Example request: remove_user callback"
GET https://your_app.example.com/remove_user?signed_payload_jwt={{header_b64.payload_claims_b64.signature_b64}}
Accept: application/json
```

After your app [verifies the payload](#decode-and-verify-signed_payload_jwt) and [identifies the requesting user](#work-with-payload-claims), handle any internal business, such as removing the user's data from your app database. You do not need to send a response. If you do not write a handler for the `GET /remove_user` endpoint, BigCommerce will still revoke the user's access to your app in the store control panel, but your app will not know that.

## Decode and verify signed_payload_jwt

The `signed_payload_jwt` is composed of three distinct **base64URL**-encoded strings concatenated with the `.` character.

```js title="Form of payload JWT"
header_b64.payload_claims_b64.signature_b64
```

Use a library package or [compatible BigCommerce API client](#helpful-tools) to decode, verify, and parse the `signed_payload_jwt`s that BigCommerce sends to your app's callback endpoints.

## Work with payload claims

Use the payload claim data to identify the store and user. What your app should do with this information typically depends on whether it supports [multiple users](/api-docs/apps/guide/users). Refer to the following table for instructions:

| Endpoint | Multiple Users Enabled | Multiple Users Not Enabled |
|:---------|:-----------------------|:---------------------------|
| `GET /load` | Compare user to store owner or existing user; if no match, it's a new user; add them to the app's database. | Matches store owner |
| `GET /uninstall` | Compare user to store owner or existing user; only store owner can uninstall an app. | Matches store owner |
| `GET /remove_user` | Compare user to users stored in app database; remove matching user from database. | N/A |


The following is an example of the payload claims encoded in the `signed_payload_jwt` that BigCommerce sends to your app callback endpoints:

```json title="Example: app callback payload" lineNumbers
{
  "aud": "U8RphZeDjQc4kLVSzNjePo0CMjq7yOg", // your app's CLIENT_ID
  "iss": "bc",
  "iat": 1659031626,
  "nbf": 1659031621,
  "exp": 1659118026,
  "jti": "c5f0bcf5-a504-4ae6-8dcc-0e40eaa5a070", // JWT unique identifier
  "sub": "stores/z4zn3wo", // STORE_HASH
  "user": {
    "id": 9876543,
    "email": "authorized_user@example.com",
    "locale": "en-US"
  },
  "owner": {
    "id": 7654321,
    "email": "owner@example.com"
  },
  "url": "/", 
  "channel_id": null, 
}
```

### Data properties in the signed_payload_jwt

| Property | Type | Description |
|:---------|:-----|:------------|
| `aud` | string | The app API account's client ID; the intended *audience*. |
| `iss` | string | The *issuer*; the value is always `bc`. |
| `iat` | integer, UNIX time | The *issued at* time; when the JWT was issued. |
| `nbf` | integer, UNIX time | The *not valid before* time; when the JWT became or becomes valid. The value is always the same as `iat`.  |
| `exp` | integer, UNIX time | The *expiration* time; when the JWT becomes invalid. Currently, 24 hours after `nbf`. |
| `jti` | string, UUID | A unique identifier for the JWT. |
| `sub` | string | The path that identifies the store in API requests to `https://api.bigcommerce.com`; a string of the form `stores/{{STORE_HASH}}`. |
| `user.id` | integer | The ID of the user who initiates the callback. |
| `user.email` | string | The email address of the user who initiates the callback. |
| `user.locale` | string | The [BCP 47](https://www.rfc-editor.org/info/bcp47) language tag of the user who initiates the callback. |
| `owner.id` | integer | The ID of the store owner. |
| `owner.email` | string | The email address of the store owner. |
| `url` | string | Also known as a *deep link*. A developer-configured path that provides the app more information about the resource that initiated the load callback. |
| `channel_id` | integer | The channel associated with the click event that dispatched the callback. The value is `null` when a click in the **Apps** menu sidebar initiates the load callback. |

## Helpful tools

The following BigCommerce API clients expose helper methods for verifying the `signed_payload_jwt`:
* [Python API client](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [Node API client](https://github.com/bigcommerce/node-bigcommerce/)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`

## Next step
* [Support multiple users](/api-docs/apps/guide/users)

## Resources

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
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
