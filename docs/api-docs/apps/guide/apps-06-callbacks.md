# Handling Single-Click App Callbacks


<div class="otp" id="no-index">

### On this page
- [Overview](#overview)
- [Opening app settings: the `/load` callback](#opening-app-settings-the-load-callback)
- [Removing the app: the `/uninstall` callback](#removing-the-app-the-uninstall-callback)
- [Removing a user: the `/remove_user` callback](#removing-a-user-the-remove_user-callback)
- [Verifying the payload](#verifying-the-payload)
- [Working with payload claims](#working-with-payload-claims)
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
> We strongly recommend that each of your callback handlers decode `signed_payload_jwt` to [verify the payload](#verifying-the-payload) before taking any action.

</div>
</div>
</div>

## Opening app settings: the `/load` callback

Once the store owner or an authorized user has installed your app, they will see it listed in the **Apps** sub-menu of their store's control panel. When the user clicks your app's listing, BigCommerce will dispatch a `GET` request to the `/load` route you've written.  The following is an example request:

```http
GET /load?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

Once you've [verified the payload](#verifying-the-payload), [identified the requesting user](#working-with-payload-claims), and handled any internal business, your app should respond with the markup and assets for the view that you want BigCommerce to render in the control panel.

## Removing the app: the `/uninstall` callback

When the store owner >>>(maybe also auth users; can they uninstall?)<<< clicks **Uninstall** in >>>PLACE(s)<<<, BigCommerce dispatches a `GET` request to the `/uninstall` route you've written.  The following is an example request:

```http
GET /uninstall?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```
Once you've [verified the payload](#verifying-the-payload) and [identified the requesting user](#working-with-payload-claims), handle any business internal to your app, such as marking the user inactive in your app's database or decrementing the number of active installations. You do not need to send a response.
## Removing a user: the `/remove_user` callback

When the store owner >>>(or admin?)<<< revokes a user's authorization to access your app >>>(in PLACE in the **Users** section of the control panel)<<<, BigCommerce dispatches a `GET` request to the `/remove_user` route you've written.

```http
GET /remove_user?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

Once you've [verified the payload](#verifying-the-payload) and [identified the requesting user](#working-with-payload-claims), handle any business internal to your app, such as removing the user's data from your app's database. You do not need to send a response.
## Verifying the payload

BigCommerce's payload JWTs implement the JWT-JWS specification that the [IETF's](https://www.ietf.org/) open standard [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515) defines. The `signed_payload_jwt` is composed of three distinct **base64URL**-encoded strings concatenated with the `.` character.

```javascript
jose_header_b64.payload_claims_b64.algorithmic_signature_b64
```

Use the following steps to parse, validate, and verify the JWTs that BigCommerce sends to your app's callback endpoints.

**Identify the signing algorithm**
1. Split the `signed_payload_jwt` by the `.` delimiter.
2. Decode the **base64url** `jose_header_b64`. `jose_header_str` is a JSON string.
3. Parse `jose_header_str` into a JSON object. Locate the signing algorithm's name at `jose_header_obj.alg`.

**Validate the signature**
4. Decode the **base64url** `algorithmic_signature_b64`.  `algorithmic_signature_hash` is a cryptographic hash.
5. Use the algorithm specified at `jose_header_obj.alg` and your app's `client_secret` to validate `algorithmic_signature_hash`.  

**Sign the payload claims string**
6. Decode the **base64url** `payload_claims_b64`. `payload_claims_str` is a JSON string.
7. Use the algorithm specified at `jose_header_obj.alg` to sign `payload_claims_str` with your app's `client_secret`. `payload_claims_hash` is a cryptographic hash.

**Verify the payload claims hash**
8. Compare `algorithmic_signature_hash` with `payload_claims_hash`.  If BigCommerce sent your app this JWT, they will match. 

**Parse and use the payload**
1. Parse `payload_claims_str` into a JSON object. The following section is a reference for working with the values in `payload_claims_obj`.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->
> ### Security precautions
> Your production code should never work with claims from a payload whose hash does not match its signature.
> To limit the vulnerability of an app to timing attacks, we recommend using a constant time string comparison function. How to accomplish this varies by programming language and signing algorithm. Ruby and PHP [code samples](#code-samples) for HS256 hashes follow. For more information, use your preferred search engine to find "constant time string comparison {lang}".
> We recommend writing middleware or using an existing [library in your language of choice](https://jwt.io/libraries) to help you parse, validate, and verify JWTs.

</div>
</div>
</div>

## Working with payload claims

The following is an example of the payload claims in a BigCommerce app callback JWT:

```json
{
  "aud": "<your app's CLIENT_ID>",
  "iss": "bc",
  "iat": 1640037763,
  "nbf": 1640037758,
  "exp": 1640124163,
  "jti": "c5f0bcf5-a504-4ae6-8dcc-0e40eaa5a070",
  "sub": "stores/z4zn3wo", // STORE_HASH
  "user": {
    "id": 9128,
    "email": "user@mybigcommerce.com"
  },
  "owner": {
    "id": 9128,
    "email": "user@mybigcommerce.com"
  },
  "url": "/"
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


Use the payload claims' data to identify the store and user. What your app should do with this information typically depends on whether it supports [multiple users](https://developer.bigcommerce.com/api-docs/apps/guide/users). Refer to the following table for instructions.

| Endpoint      | Multiple Users Enabled                                                                                      | Multiple Users Not Enabled |
|:--------------|:------------------------------------------------------------------------------------------------------------|:---------------------------|
| `load`        | Compare user to store owner or existing user; if no match, it's a new user; add them to the app's database. | Will match store owner     |
| `uninstall`   | Compare user to store owner or existing user; only store owner can uninstall an app.                        | Will match store owner     |
| `remove_user` | Compare user to users stored in app database; remove matching user from database.                           | N/A                        |

## Code samples

### Verifying `signed_payload_jwt` in PHP

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

### Verifying `signed_payload_jwt` in Ruby

```ruby
require "base64"
require "openssl"

def verify(signed_payload_jwt, client_secret)
  message_parts = signed_payload_jwt.split(".")

  b64_json_payload = message_parts[0]
  algorithmic_signature_b64 = message_parts[1]

  payload_object = Base64.strict_decode(b64_json_payload)
  provided_signature = Base64.strict_decode(algorithmic_signature_b64)

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
