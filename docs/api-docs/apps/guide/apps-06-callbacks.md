# Single-Click App Callback Handlers

After a store owner installs your single-click app, they and their authorized users will need to use it and configure any settings. In turn, your app will likely need to store and manage information about the stores and users you're supporting.

Your app's front-end views render inside an iFrame in the store control panel, so your app has no native ability to listen for a few high-level events. To support your work, BigCommerce sends `GET` requests to callback routes in your app that correspond to three events: opening the app, uninstalling the app, and revoking a user's access to the app. Each request includes a signed JSON web token (_JWT_), which contains identifying information about the store and the user. This article is a reference for endpoints to which we send event-driven callbacks, and a guide to writing handlers that verify and use our JWT payloads.

<!-- theme: info -->
> #### Note
> In production, all app callback URLs must be publicly available, fully qualified, and served over TLS/SSL.


## Overview

The following table lists the app management events and corresponding endpoints to which our servers dispatch callbacks. Your app is only required to handle the `GET /load` endpoint, but we recommend writing handlers for all of them. Please see the corresponding detail sections that follow for more about the consequences of not handling optional callback endpoints.

| Endpoint           | Required? | Event Description |
|:-------------------|:---------:|:------------------|
| `GET /auth`        | yes       | See [Implement the OAuth flow](/api-docs/apps/guide/auth). |
| `GET /load`        | yes       | The store owner or authorized user clicks to load the app. |
| `GET /uninstall`   | no        | The store owner clicks to uninstall the app.               |
| `GET /remove_user` | no        | The store owner revokes a user's access to the app.        |

Decoding the supplied JWT lets your app do the following:
- Identify the store.
- Identify the requesting user.
- Verify that the request came from BigCommerce.

<!-- theme: info -->
> #### Note
> We strongly recommend that each callback handler decode `signed_payload_jwt` to [verify the payload](#decode-and-verify-signed_payload_jwt) before taking any action.


## Open the app with /load

Once the store owner installs your app, it appears on the **Apps** sub-menu list in their store control panel, as well as their authorized users' control panels. When a user clicks your app's listing, BigCommerce dispatches a `GET` request to the `/load` route you've written. The following is an example request:

```http title="Example request: /load callback from BigCommerce"
GET /load?signed_payload_jwt={{header_b64.payload_claims_b64.signature_b64}}
Host: your_app.example.com
Accept: application/json
>>>TEST
```

After you [verify the payload](#decode-and-verify-signed_payload_jwt), [identify the requesting user](#work-with-payload-claims), and handle any internal business, your app should respond with the markup and assets for the view that you want BigCommerce to render in the control panel.

## Remove the app with /uninstall

When the store owner clicks the **Uninstall** button on your app's card in their store control panel, BigCommerce dispatches a `GET` request to the `/uninstall` route you've written. The following is an example request:

```http title="Example request: /uninstall callback from BigCommerce"
GET /uninstall?signed_payload_jwt={{header_b64.payload_claims_b64.signature_b64}}
Host: your_app.example.com
Accept: application/json
>>>TEST
```

After you [verify the payload](#decode-and-verify-signed_payload_jwt) and [identify the requesting user](#work-with-payload-claims), handle any business internal to your app, such as marking the user inactive in your app's database or decrementing the number of active installations. You do not need to send a response. If you do not write a handler for the `GET /uninstall` endpoint, BigCommerce will still uninstall your app from the owner's store, but your app will not know that.

## Revoke user access with /remove_user

When the store owner revokes a user's authorization to access your app at **Account Settings** **>** **Users** in the store control panel, BigCommerce dispatches a `GET` request to the `/remove_user` route you've written.

```http title="Example request: /remove_user callback from BigCommerce"
GET /remove_user?signed_payload_jwt={{header_b64.payload_claims_b64.signature_b64}}
Host: your_app.example.com
Accept: application/json
>>>TEST
```


After you [verify the payload](#decode-and-verify-signed_payload_jwt) and [identify the requesting user](#work-with-payload-claims), handle any business internal to your app, such as removing the user's data from your app's database. You do not need to send a response. If you do not write a handler for the `GET /remove_user` endpoint, BigCommerce will still revoke the user's access to your app in the store control panel, but your app will not know that.

## Decode and verify signed_payload_jwt

The `signed_payload_jwt` is composed of three distinct **base64URL**-encoded strings concatenated with the `.` character.

```js title="Form of payload JWT"
header_b64.payload_claims_b64.signature_b64
```

Use the steps in our [Guide to Working with JWTs](/api-docs/getting-started/authentication/jwts#decode-verify-and-parse) to decode, verify, and parse the `signed_payload_jwt`s that BigCommerce sends to your app's callback endpoints.

## Work with payload claims

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
  "url": "/", // deep link, if any
  "channel_id": null, // >>> does this apply to channel manager apps only? will it just be 1 unless it's a channel manager app? what if it's not a channel manager app, but the app is somehow associated with a specific channel? >>> someone answered this for me already
}
```


| Name          | Data Type | Value Description                                 |
|:--------------|:----------|:--------------------------------------------------|
| `user.id`     | integer   | ID of user initiating the callback >>> requesting |
| `user.email`  | string    | email address of the requesting user              |
| `user.locale` | string    | the requesting user's language configuration      |
| `owner.id`    | integer   | ID of store owner                                 |
| `owner.email` | string    | email address of store owner                      |
| `sub`         | string    | `stores/` + `store_hash`; ex: `stores/store_hash` |
| `store_hash`  | string    | unique identified for store used in API requests  |
| `timestamp`   | float     | Unix time when callback generated                 |

Use the payload claims' data to identify the store and user. What your app should do with this information typically depends on whether it supports [multiple users](/api-docs/apps/guide/users). Refer to the following table for instructions:

| Endpoint | Multiple Users Enabled | Multiple Users Not Enabled |
|:---------|:-----------------------|:---------------------------|
| `GET /load` | Compare user to store owner or existing user; if no match, it's a new user; add them to the app's database. | Matches store owner |
| `GET /uninstall` | Compare user to store owner or existing user; only store owner can uninstall an app. | Matches store owner |
| `GET /remove_user` | Compare user to users stored in app database; remove matching user from database. | N/A |

## Helpful tools
>>> do all the API clients expose helper methods for verifying `signed_payload_jwt`s?
The following BigCommerce API clients expose helper methods for verifying the `signed_payload_jwt`:
* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [bigcommerce/node-bigcommerce](https://github.com/bigcommerce/node-bigcommerce/)
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
* [Figma UI Kit](//figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
