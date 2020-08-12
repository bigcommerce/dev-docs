# Single-click App Callbacks

<div class="otp" id="no-index">

### On this page
- [Overview](#overview)
- [Load callback](#load-callback)
- [Uninstall callback](#uninstall-callback)
- [Remove user callback](#remove-user-callback)
- [Verifying the signed payload](#verifying-the-signed-payload)
- [Processing the payload](#processing-the-payload)
- [Code samples](#code-samples)
- [Helpful tools](#helpful-tools)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

This article discusses handling BigCommerce app callbacks.

## Overview
| Event | Required? | Description |
|-|-|-|
| `Load`  | Yes | Called when the store owner or user clicks to load the app. |
| `Uninstall`  | No | Called when the store owner clicks to uninstall the app. |
| `Remove User` | No | Called when the store admin revokes a user's access to the app. |

Each event triggers a `GET` request from BigCommerce containing a signed payload that allows the app to:
- Verify that the request came from BigCommerce.
- Identify the store.
- Identify the store owner or user.

**Requirements**:
* In a production, all app callback URLs must be publicly available, fully qualified, and served over TLS/SSL.

## Load callback
```http
GET /load?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: app.example.com
```

**Description**: called when the store owner or user clicks to load the app.

**How to Handle**:
1. [Verify the signed payload](#verifying-the-signed-payload)
2. [Process the payload](#processing-the-payload)
3. Return UI HTML to be rendered in control panel iFrame

## Uninstall callback
```http
GET https://app.example.com/uninstall?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
```

**Description**: Called when the store owner clicks to uninstall the app.

**How to Handle:**
1. [Verify the signed payload](#verifying-the-signed-payload)
2. [Process the payload](#processing-the-payload)

## Remove user callback
```http
GET https://app.example.com/remove-user?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
```
**Description**: sent when a store admin revokes a user's access to the app

**How to Handle:**
1. [Verify the signed payload](#verifying-the-signed-payload)
2. [Process the payload](#processing-the-payload)

## Verifying the signed payload
The `signed_payload` is comprised of two `.` separated **base64URL** encoded strings:

```javascript
encoded_json_string.encoded_hmac_signature
```
**To verify**:
1. Split `signed_payload` by `.` delimiter.
2. Decode `encoded_json_string` using **base64url**.
3. Convert the decoded JSON string into an object.
4. Decode `encoded_hmac_signature` using **base64url**.
5. Use app's `client_secret` to verify the signature.
6. Sign decoded `json_string` with app's `client_secret`
7. Match `client_secret` signed `json_string` against decoded `hmac_signature`


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> ### Note
> * To limit the vulnerability of an app to timing attacks, we recommend using a constant time-string comparison function, rather than the equality operator, to check that the signatures match.

</div>
</div>
</div>

## Processing the payload
| Callback | Multiple Users Enabled | Multiple Users Not Enabled |
|-|-|-|
| `Load` | Compare user data to store owner or existing user; if no match, its a new users -- add to app's database. | Should match store owner|
| `Uninstall` | Compare user data to store owner or existing user; only store owner can uninstall an app. | Should match store owner. |
| `Remove user` | Compare user data to users stored in app database -- remove found user from database. | `n/a` |

**Example Payload:**
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
| `user.id` | int | ID of user initiating callback. |
| `user.email `| str | Email of the user initiating callback. |
| `owner.id` | int | ID of store owner. |
| `owner.email` | str | Email address of store owner. |
| `context` | str | `stores/` + `store_hash`; ex: `stores/store_hash`. |
| `store_hash` | str | Unique identified for store used in API requests |
| `timestamp` | float | Unix time when callback was generated.|

## Code samples

**Verifying the Signed Request in PHP:**

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

**Verifying the Signed Request in Ruby:**
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
The following api clients expose helper methods for verifying the `signed_payload`:
* [bigcommerce/bigcommerce-api-python](https://github.com/bigcommerce/bigcommerce-api-python)
  * Fetches `access_token`
  * Verifies `signed_payload`
* [conversio/node-bigcommerce](https://github.com/getconversio/node-bigcommerce)
  * Fetches `access_token`
  * Verifies `signed_payload`

## Next steps

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