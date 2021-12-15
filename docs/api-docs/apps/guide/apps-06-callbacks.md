# Handling Single-Click App Callbacks


<div class="otp" id="no-index">

### On this page
- [Overview](#overview)
- [Opening app settings: the `/load` callback](#opening-app-settings-the-load-callback)
- [Removing the app: the `/uninstall` callback](#removing-the-app-the-uninstall-callback)
- [Removing a user: the `/remove_user` callback](#removing-a-user-the-remove_user-callback)
- [Verifying the signed payload](#verifying-the-signed-payload)
- [Identifying users](#identifying-users)
- [Code samples](#code-samples)
- [Helpful tools](#helpful-tools)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

After a store owner installs your single-click app, they and their authorized users will need to manage it and configure any settings. Because your app's users will be working in the BigCommerce control panel, certain user-initiated events that might be important to your internal logic will prompt our servers to send your app `GET` requests at predictable endpoints. Each of these requests will return a JSON web token, or _JWT_, as the value of the `signed_payload_jwt` parameter.  This article is both a reference and a guide for developing callbacks to handle these events and authenticate our `GET` requests to these endpoints.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> In production, all app callback URLs must be publicly available, fully qualified, and served over TLS/SSL.

</div>
</div>
</div>

## Overview

The following table lists the app management events and corresponding callback endpoints for which our servers return JWTs. Your app is only required to handle the `load` endpoint, but we recommend provisioning all of them.

| Endpoint      | Required? | Event Description                                         |
|:--------------|:---------:|:----------------------------------------------------------|
| `load`        | yes       | The store owner or authorized user clicks to load the app |
| `uninstall`   | no        | The store owner clicks to uninstall the app               |
| `remove_user` | no        | The store owner revokes a user's access to the app        |

Decoding the supplied JWT lets your app do the following:
- Identify the store.
- Identify the requesting user.
- Verify that the request came from BigCommerce.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> We strongly recommend that each of your callback handlers decode `signed_payload_jwt` to [verify the signed payload](#verifying-the-signed-payload) and [identify the requesting user](#identifying-users) before taking any action.

</div>
</div>
</div>

## Opening app settings: the `/load` callback

Once the store owner or an authorized user has installed your app, they will see it listed in the **Apps** sub-menu of their store's control panel. When the user clicks your app's listing, BigCommerce will dispatch a `GET` request to the `/load` route you've written.  The following is an example request:

```http
GET /load?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

Once you've [verified the signed payload](#verifying-the-signed-payload), [identified the requesting user](#identifying-users), and handled any internal business, your app should respond with the markup and assets for the view that you want BigCommerce to render in the control panel.

## Removing the app: the `/uninstall` callback

When the store owner >>>(maybe also auth users; can they uninstall?)<<< clicks **Uninstall** in >>>PLACE(s)<<<, BigCommerce dispatches a `GET` request to the `/uninstall` route you've written.  The following is an example request:

```http
GET /uninstall?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```
Once you've [verified the signed payload](#verifying-the-signed-payload) and [identified the requesting user](#identifying-users), handle any business internal to your app, such as marking the user inactive in your app's database or decrementing the number of active installations. You do not need to send a response.
## Removing a user: the `/remove_user` callback

When the store owner >>>(or admin?)<<< revokes a user's authorization to access your app >>>(in PLACE in the **Users** section of the control panel)<<<, BigCommerce dispatches a `GET` request to the `/remove_user` route you've written.

```http
GET /remove_user?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

Once you've [verified the signed payload](#verifying-the-signed-payload) and [identified the requesting user](#identifying-users), handle any business internal to your app, such as removing the user's data from your app's database. You do not need to send a response.
## Verifying the signed payload

The `signed_payload_jwt` is composed of three distinct **base64URL**-encoded strings concatenated with the `.` character.

```javascript
encoded_token_header.encoded_claim_payload.encoded_algorithmic_signature
```

**To verify**:
1. Split the `signed_payload_jwt` by the `.` delimiter.
2. Decode the **base64url** `encoded_token_header`.
3. Convert the decoded `token_header` from a JSON string to an object and locate the signing algorithm.
4. Decode the **base64url** `encoded_claim_payload`.
5. Convert the decoded `claim_payload` from a JSON string to an object.
6. Decode the **base64url** `encoded_algorithmic_signature`.
7. Use the `encoded_token_header`, `encoded_claim_payload`, your app's `client_secret`, and the signing algorithm from the decoded `token_header` to verify the decoded `algorithmic_signature`. >>>(this is the shape of a guess informed by [jwt.io](https://jwt.io/introduction) -- verify)<<< 
8. Sign the decoded `claim_payload` with your app's `client_secret`. >>>(this is also going to be different)<<<
9. Match<sup>1</sup> signed `claim_payload` against decoded `algorithmic_signature`. >>>(revise pending resolution of preceding questions)<<<

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->
> ### Note
> 1. To limit the vulnerability of an app to timing attacks, we recommend using a constant time string comparison function. How to accomplish this varies by programming language. Ruby and PHP [code samples](#code-samples) follow. For more information, use your preferred search engine to find "constant time string comparison {lang}".

</div>
</div>
</div>

## Identifying users

After decoding and verifying the `signed_payload_jwt`, parse the JSON string into an object. The following is an example payload:

```json
{
  "user": {
    "id": 9128,
    "email": "user@mybigcommerce.com"
  },
  "owner": {
    "id": 9128,
    "email": "user@mybigcommerce.com"
  },
  "context": "stores/z4zn3wo",
  "store_hash": "z4zn3wo",
  "timestamp": 1469823892.9123988
}
```

| Name          | Data Type | Value Description                                 |
|:--------------|:----------|:--------------------------------------------------|
| `user.id`     | integer   | ID of user initiating callback                    |
| `user.email`  | string    | email of the user initiating callback             |
| `owner.id`    | integer   | ID of store owner                                 |
| `owner.email` | string    | email address of store owner.                     |
| `context`     | string    | `stores/` + `store_hash`; ex: `stores/store_hash` |
| `store_hash`  | string    | unique identified for store used in API requests  |
| `timestamp`   | float     | Unix time when callback generated                 |

Use the data contained in the payload object to identify the store and user. What your app should do with this information depends on whether [**Multiple Users**](https://developer.bigcommerce.com/api-docs/apps/guide/users) is enabled in the [Developer Portal](https://devtools.bigcommerce.com/). Refer to the following table for instructions.

| Callback      | Multiple Users Enabled                                                                                      | Multiple Users Not Enabled |
|:--------------|:------------------------------------------------------------------------------------------------------------|:---------------------------|
| `Load`        | Compare user to store owner or existing user; if no match, it's a new user; add them to the app's database. | Will match store owner     |
| `Uninstall`   | Compare user to store owner or existing user; only store owner can uninstall an app.                        | Will match store owner     |
| `Remove user` | Compare user to users stored in app database; remove matching user from database.                           | N/A                        |

## Code samples

### Verifying signed_payload_jwt in PHP

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

### Verifying signed_payload_jwt in Ruby
```ruby
require "base64"
require "openssl"

def verify(signed_payload_jwt, client_secret)
  message_parts = signed_payload_jwt.split(".")

  encoded_json_payload = message_parts[0]
  encoded_algorithmic_signature = message_parts[1]

  payload_object = Base64.strict_decode(encoded_json_payload)
  provided_signature = Base64.strict_decode(encoded_algorithmic_signature)

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

## Helpful tools
The following BigCommerce API clients expose helper methods for verifying the `signed_payload_jwt`:
* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`
* [bigcommerce/node-bigcommerce](https://github.com/bigcommerce/node-bigcommerce/)
  * Fetches `access_token`
  * Verifies `signed_payload_jwt`

## Next steps
* [Support multiple users](https://developer.bigcommerce.com/api-docs/apps/guide/users)

## Resources

### Sample apps
* [Node / React / Next.js](https://github.com/bigcommerce/sample-app-nodejs)
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
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
