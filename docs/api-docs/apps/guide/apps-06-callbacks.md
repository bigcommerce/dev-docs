# Single-Click App Callbacks


<div class="otp" id="no-index">

### On this page
- [Overview](#overview)
- [Load callback](#load-callback)
- [Uninstall callback](#uninstall-callback)
- [Remove user callback](#remove-user-callback)
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
> * In a production, all app callback URLs must be publicly available, fully qualified, and served over TLS/SSL.

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





## Load callback

BigCommerce sends a `GET` request to your app's `load` URL when the store owner or user clicks to load the app.

```http
GET /load?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

The steps steps to handle this callback are as follows:
1. [Verify the signed payload](#verifying-the-signed-payload).
2. [Identify the user](#identifying-users).
3. Respond with HTML for the control panel iFrame.

## Uninstall callback

BigCommerce sends a `GET` request to your app's `uninstall` URL when the store owner clicks to uninstall the app.

```http
GET /uninstall?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

The steps steps to handle this callback are as follows:
1. [Verify the signed payload](#verifying-the-signed-payload).
2. [Identify the user](#identifying-users).
3. Remove the user's data from your app's database.

## Remove user callback

BigCommerce sends a `GET` request to your app's `remove user` callback when a store admin revokes a user's access to the app.

```http
GET /remove_user?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```

The steps steps to handle this callback are as follows:
1. [Verify the signed payload](#verifying-the-signed-payload).
2. [Identify the user](#identifying-users).
3. Remove the user's data from your app's database.

## Verifying the signed payload

The `signed_payload` is comprised of two `.` separated **base64URL** encoded strings:

```javascript
encoded_json_string.encoded_hmac_signature
```

**To verify**:
1. Split the `signed_payload` by the `.` delimiter.
2. Decode the **base64url** `encoded_json_string`.
3. Convert the decoded string into an object.
4. Decode the **base64url** `encoded_hmac_signature`.
5. Use your app's `client_secret` to verify the decoded `hmac_signature`.
6. Sign the decoded `json_string` with your app's `client_secret`.
7. Match<sup>1</sup> signed `json_string` against decoded `hmac_signature`.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> ### Note
> 1. To limit the vulnerability of an app to timing attacks, we recommend using a constant time string comparison function. How to accomplish this varies by programming language. For code samples in Ruby and PHP, see [Code samples](#code-samples) below; search for "constant time string comparison {lang}" using your preferred search engine for more information.

</div>
</div>
</div>

## Identifying users

After decoding and verifying the `signed_playload`, parse the JSON string into an object. Here's an example payload:

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

| Name | Data Type | Value Description |
|-|-|-|
| `user.id` | int | ID of user initiating callback |
| `user.email `| str | email of the user initiating callback |
| `owner.id` | int | ID of store owner |
| `owner.email` | str | email address of store owner. |
| `context` | str | `stores/` + `store_hash`; ex: `stores/store_hash` |
| `store_hash` | str | unique identified for store used in API requests |
| `timestamp` | float | Unix time when callback generated|

Use the data contained in the payload object to identify the store and user. What your app should do with this information is dependent on whether [**Multiple Users**](https://developer.bigcommerce.com/api-docs/apps/guide/users) is enabled in the [Developer Portal](https://devtools.bigcommerce.com/). Refer to the table below for instructions.

| Callback | Multiple Users Enabled | Multiple Users Not Enabled |
|-|-|-|
| `Load` | Compare user to store owner or existing user; if no match, it's a new users; add them app's database. | should match store owner|
| `Uninstall` | Compare user to store owner or existing user; only store owner can uninstall an app. | should match store owner |
| `Remove user` | Compare user to users stored in app database; remove matching user from database. | `n/a` |

## Code samples

### Verifying signed_payload in PHP

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

### Verifying signed_payload in Ruby
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

## Helpful tools
The following BigCommerce API clients expose helper methods for verifying the `signed_payload`:
* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload`
* [bigcommerce/node-bigcommerce](https://github.com/bigcommerce/node-bigcommerce/)
  * Fetches `access_token`
  * Verifies `signed_payload`

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
