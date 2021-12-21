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

When the store owner clicks the **Uninstall** button on your app's card in their store's control panel, BigCommerce dispatches a `GET` request to the `/uninstall` route you've written.  The following is an example request:

```http
GET /uninstall?signed_payload_jwt=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: your_app.example.com
```
Once you've [verified the payload](#verifying-the-payload) and [identified the requesting user](#working-with-payload-claims), handle any business internal to your app, such as marking the user inactive in your app's database or decrementing the number of active installations. You do not need to send a response.
## Removing a user: the `/remove_user` callback

When the store owner revokes a user's authorization to access your app at **Account Settings** **>** **Users** in the store control panel, BigCommerce dispatches a `GET` request to the `/remove_user` route you've written.

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

Use the following steps to decode, verify, and parse the JWTs that BigCommerce sends to your app's callback endpoints.

**Decompose the JWT**
1. Split the `signed_payload_jwt` by the `.` delimiter.

**Identify the signing algorithm**
2. Decode the **base64url** `jose_header_b64`. `jose_header_str` is a JSON string.
3. Parse `jose_header_str` into a JSON object. Locate the signing algorithm's name at `jose_header_obj.alg`.

**Decode the signature** 
4. Decode the **base64url** `algorithmic_signature_b64`.  `algorithmic_signature_crypt` is a cryptographic hash.

**Concatenate and sign the header and payload claims**
5. Concatenate `jose_header_b64` and `payload_claims_b64` with a `.` delimiter to create `header_payload_b64`.
6. Use the algorithm specified at `jose_header_obj.alg` to sign `header_payload_b64` with your app's `CLIENT_SECRET`. `header_payload_crypt` is a cryptographic hash.

**Verify the payload claims**
7. Compare `header_payload_crypt` with `algorithmic_signature_crypt`. If BigCommerce sent your app this JWT, the two hashes will match. _We strongly recommend using a constant time string comparison function.  See the following warning about security precautions for further information._

**Parse and use the payload**
8. Decode the **base64url** `payload_claims_b64`. `payload_claims_str` is a JSON string.
9. Parse `payload_claims_str` into your language's version of a JSON object. The following section is a reference for working with the values in `payload_claims_obj`.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->
> ### Security precautions
> Your production code should never work with claims from a payload you can't verify.
> To limit the vulnerability of an app to timing attacks, we recommend using a constant time string comparison function. How to accomplish this varies by programming language and signing algorithm. Ruby and PHP [code samples](#code-samples) for HS256 hashes follow. For more information, use your preferred search engine to find "constant time string comparison {lang}".
> We recommend writing middleware or using an existing [library in your language of choice](https://jwt.io/libraries) to help you decode, verify, and parse JWTs.

</div>
</div>
</div>

## Working with payload claims

The following is an example of the payload claims in a BigCommerce app callback JWT:

```json
{
  "aud": "U8RphZeDjQc4kLVSzNjePo0CMjq7yOg", // your app's CLIENT_ID
  "iss": "bc",
  "iat": 1640037763,
  "nbf": 1640037758,
  "exp": 1640124163,
  "jti": "c5f0bcf5-a504-4ae6-8dcc-0e40eaa5a070", // JWT unique identifier
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
function verifySignedPayload($signed_payload_jwt, $client_secret)
{
    // decompose the jwt 
    list($jose_header_b64, $payload_claims_b64, $algorithmic_signature_b64) = explode('.', $signed_payload_jwt, 3);

    // identify the signing algorithm
    $jose_header_str = base64_decode($jose_header_b64);
    $jose_header_arr = json_decode($jose_header_str, true);
    $algorithm = $jose_header_arr['alg'];

    // decode the signature
    $algorithmic_signature_crypt = base64_decode($algorithmic_signature_b64);

    // concatenate and sign the header and payload claims
    $header_payload_b64 = $jose_header_b64 . "." . $payload_claims_b64;
    if($algorithm != "HS256") {
        error_log('Unknown signature algorithm. Please review documentation and contact support.');
        return null;
    } else {
        $header_payload_crypt = hash_hmac('sha256', $header_payload_b64, $client_secret, $raw = true);
    }

    // verify the payload claims
    if (!hash_equals($header_payload_crypt, $algorithmic_signature_crypt)) {
        error_log('Bad signed request from BigCommerce!');
        return null;
    } else {
        echo 'JWT is valid, proceed to use claims!';
    }

    // parse and use the payload
    $payload_claims_str = base64_decode($payload_claims_b64);
    $payload_claims_arr = json_decode($payload_claims_str, true);
    return $payload_claims_arr;
}

```

### Verifying `signed_payload_jwt` in Ruby

```ruby
require "base64"
require "openssl"
require "json"

def verify_signed_payload(signed_payload_jwt, client_secret)
  # decompose the jwt 
  message_parts = signed_payload_jwt.split(".")
  jose_header_b64 = message_parts[0]
  payload_claims_b64 = message_parts[1]
  algorithmic_signature_b64 = message_parts[2]

  # identify the signing algorithm
  jose_header_str = Base64.decode64(jose_header_b64)
  jose_header_hash = JSON.parse(jose_header_str)
  algorithm = jose_header_hash['alg']

  # decode the signature
  algorithmic_signature_crypt = Base64.decode64(algorithmic_signature_b64)

  # concatenate and sign the header and payload claims
  header_payload_b64 = message_parts[0..1].join(".")
  unless algorithm == "HS256"
    begin
      raise NotImplementedError, 'Unknown signature algorithm. Please review documentation and contact support.'
    rescue => e
      puts e.message
      return e.message
    end
  end
  header_payload_crypt = OpenSSL::HMAC.digest("SHA256", client_secret, header_payload_b64)

  # verify the payload claims 
  crypt_match = secure_compare(header_payload_crypt, algorithmic_signature_crypt)
  unless crypt_match
    begin
      raise StandardError, 'Bad signed request from BigCommerce!'
    rescue => e
        puts e.message
        return e.message
    end
  end
  puts 'JWT is valid, proceed to use claims!'
  payload_claims_str = Base64.decode64(payload_claims_b64)
  payload_claims_hash = JSON.parse(payload_claims_str)
  return payload_claims_hash
end

def secure_compare(a, b)
  #  ruby's hmac comparison implementation uses constant time
  a == b
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
