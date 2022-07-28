# Working with JWTs


## Decode, verify, and parse

BigCommerce's payload JWTs implement the JWT-JWS specification that the [IETF's](https://www.ietf.org/) open standard [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515) defines. >>> Consult endpoint documentation for the specific characteristics of the JWT you're decoding >>> or encoding. In general, our payload JWTs are composed of three distinct **base64URL**-encoded strings concatenated with the `.` character.

```js title="Form of payload JWT"
header_b64.payload_claims_b64.signature_b64
```

Use the following steps to decode, verify, and parse the JWTs that BigCommerce sends to your app or implementation:

**Decompose the JWT**
1. Split the `signed_payload_jwt` by the `.` delimiter.

**Identify the signing algorithm**
2. Decode the **base64url** `header_b64`. `header_str` is a JSON string.
3. Parse `header_str` into a JSON object. Locate the signing algorithm's name at `header_obj.alg`.

**Decode the signature** 
4. Decode the **base64url** `signature_b64`. `signature_crypt` is a cryptographic hash.

**Concatenate and sign the header and payload claims**
5. Concatenate `header_b64` and `payload_claims_b64` with a `.` delimiter to create `header_payload_b64`.
6. Use the algorithm specified at `header_obj.alg` to sign `header_payload_b64` with your app's `CLIENT_SECRET`. `header_payload_crypt` is a cryptographic hash.

**Verify the payload claims**
7. Compare `header_payload_crypt` with `signature_crypt`. If BigCommerce sent your app this JWT, the two hashes will match. _We strongly recommend using a constant time string comparison function. See the following warning about security precautions for further information._

**Parse and use the payload**
8. Decode the **base64url** `payload_claims_b64`. `payload_claims_str` is a JSON string.
9. Parse `payload_claims_str` into your language's version of a JSON object. The following section is a reference for working with the values in `payload_claims_obj`.

<!-- theme: warning -->
> #### Security precautions
> Your production code should never work with claims from a payload you can't verify.
> To limit the vulnerability of an app to timing attacks, we recommend using a constant time string comparison function. Comparison techniques vary by programming language and signing algorithm. Ruby and PHP [code samples](#code-samples) for HS256 hashes follow. 
> We recommend writing middleware or using an existing [library in your language of choice](https://jwt.io/libraries) to help you decode, verify, and parse JWTs.

### Code samples

The following examples decode and verify callback JWTs:

<!-- 
type: tab
title: PHP
-->

```php lineNumbers
function verifySignedPayload($signed_payload_jwt, $client_secret)
{
    // decompose the jwt 
    list($header_b64, $payload_claims_b64, $signature_b64) = explode('.', $signed_payload_jwt, 3);

    // identify the signing algorithm
    $header_str = base64_decode($header_b64);
    $header_arr = json_decode($header_str, true);
    $algorithm = $header_arr['alg'];

    // decode the signature
    $signature_crypt = base64_decode($signature_b64);

    // concatenate and sign the header and payload claims
    $header_payload_b64 = $header_b64 . "." . $payload_claims_b64;
    if($algorithm != "HS256") {
        error_log('Unknown signature algorithm. Please review documentation and contact support.');
        return null;
    } else {
        $header_payload_crypt = hash_hmac('sha256', $header_payload_b64, $client_secret, $raw = true);
    }

    // verify the payload claims
    if (!hash_equals($header_payload_crypt, $signature_crypt)) {
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

<!-- 
type: tab
title: Ruby
-->

```ruby lineNumbers
require "base64"
require "openssl"
require "json"

def verify_signed_payload(signed_payload_jwt, client_secret)
  # decompose the jwt 
  message_parts = signed_payload_jwt.split(".")
  header_b64 = message_parts[0]
  payload_claims_b64 = message_parts[1]
  signature_b64 = message_parts[2]

  # identify the signing algorithm
  header_str = Base64.decode64(header_b64)
  header_hash = JSON.parse(header_str)
  algorithm = header_hash['alg']

  # decode the signature
  signature_crypt = Base64.decode64(signature_b64)

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
  crypt_match = secure_compare(header_payload_crypt, signature_crypt)
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

<!-- type: tab-end -->
