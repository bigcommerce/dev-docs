<h1> Customer Login API </h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#customer-login_introduction"> Introduction</a></li>
    <li><a href="#customer-login_jwt"> JWT</a></li>
		<li><a href="#customer-login_oauth-scope">OAuth Scope</a></li>
    <li><a href="#customer-login_sample-code">Sample Code</a></li>
    <li><a href="#customer-login_access-url">Acces URL</a></li>
    <li><a href="#customer-login_logging-in-a-customer">Logging In a Customer</a></li>
    <li><a href="#customer-login_logout-customer">Logging Out a Customer</a></li>
    <li><a href="#customer-login_troubleshooting-customer-login-api">Troubleshooting</a></li>
	</ul>
</div>

<a href='#customer-login_introduction' aria-hidden='true' class='block-anchor'  id='customer-login_introduction'><i aria-hidden='true' class='linkify icon'></i></a>

## Introduction
The Customer Login API enables single sign-on (SSO). It allows your apps to programmatically log in a storefront customer by using the login entry point URL: `/login/token/{token}`. Here, {token} must be a JSON Web Token (JWT) containing the parameters for the customer login request, signed by your application’s Oauth client secret.

Example use cases for the Customer Login API include:

* Integration with a SSO provider or IdP
* Continuous login between a BC storefront and another system, such as a WordPress blog
* Any login method other than BC's typical email and password login - for example, if you wanted to enable customers to log in via a phone number and SMS password

<a href='#customer-login_jwt' aria-hidden='true' class='block-anchor'  id='customer-login_jwt'><i aria-hidden='true' class='linkify icon'></i></a>

## JWT

JWT is a standard for verifying a login signature between two parties. For a full overview of the JWT standard, please see [JWT.IO](https://jwt.io/), where you can find links to client libraries (in many languages) that facilitate the generation and verification of JWT tokens. BigCommerce also supplies helper methods for generating login tokens in our [API Client Libraries](/tools-resources).

### JWT Standard

A valid JWT token is a string composed of three parts, separated by periods (“.”), which correspond to the encoded header, the encoded payload, and the signature.

<a href='#example-jwt-token' aria-hidden='true' class='block-anchor'  id='example-jwt-token'><i aria-hidden='true' class='linkify icon'></i></a>

<!--
    title: #### Example JWT Token

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1535390918772
-->

#### Example JWT Token
![Example JWT Token
](//s3.amazonaws.com/user-content.stoplight.io/6012/1535390918772 "#### Example JWT Token
")

<a href='#token-key' aria-hidden='true' class='block-anchor'  id='token-key'><i aria-hidden='true' class='linkify icon'></i></a>

<!--
    title: #### Key

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1535391044482
-->

#### Key
![JWT Key](//s3.amazonaws.com/user-content.stoplight.io/6012/1535391044482 "#### Key
")

### Header

The header specifies the type of token (JWT) and the hashing algorithm.

```json
{
	"typ": "JWT",
	"alg": "HS256" 
}
```

The type and algorithm are always JWT and HS256. Those are the only values BigCommerce supports.

### Payload
The payload contains a series of claims that identify the application requesting the login, the store, and the customer to be logged in. Optionally, you can specify a redirect URL to direct the customer to a page other than the My Account page after login. 

Once a request has is made with a given `jti`, it cannot be made again. This parameter is used to prevent replay attacks by malicious actors intercepting the request or obtaining it after the fact.

The `request_ip` field can be used as an additional security precaution, to prevent a malicious actor from intercepting the request and making it from another browser or system before you do. If you supply this value, BigCommerce checks the incoming request to ensure that it is being made from the stated IP address otherwise the request fails. We strongly encourage setting this IP address value, but doing so is optional, to support those cases where this information is not available.

<a href='#example-payload' aria-hidden='true' class='block-anchor'  id='example-payload'><i aria-hidden='true' class='linkify icon'></i></a>


<!--
title: "Example Payload"
subtitle: ""
lineNumbers: true
-->

**Example Payload**

```json
{
"iss": "Your app’s Oauth client ID",
"iat": "timestamp for when the token was issued",
"jti": "randomly generated string",
"operation": "customer_login",
"store_hash": "abc123",
"customer_id": 1234,
"redirect_to": "/account.php",
"request_ip": "111.222.333.444"
}

```

| Field Name | Type | Description |
| --- | --- | --- |
| iss | string | Indicates the token's issuer. This is your application's client ID, which is obtained during application registration in Developer Portal. |
| iat | integer| Time when the token was generated. This is a numeric value indicating the number of seconds since the [Unix epoch](http://en.wikipedia.org/wiki/Unix_time).|
| jti | string | Request ID string that must be unique across all requests made by your app. A UUID or other random string would be an appropriate value. Most libraries contain a method for generating a uuid. For testing a [UUID generator](https://www.uuidgenerator.net/) can be used, but it recommended to use built in libraries.|
| operation | string | Must contain the string "customer_login". |
| store_hash | string | Store hash identifying the store you are logging into. |
| customer_id | integer | ID of the customer you are logging in, as obtained through the Customer API. |
| redirect_to | string | Optional field containing a relative path for the shopper's destination after login. Will default to `/account.php`. |
| request_ip | string | Optional field containing the expected IP address for the request. If provided, BigCommerce will check that it matches the browser trying to log in. If there is not a match, it will be rejected |

### Signature

The signature is created by signing the header and payload with the hashing algorithm specified in the header (HS256) and your application’s Client Secret. 

---

<a href='#customer-login_oauth-scope' aria-hidden='true' class='block-anchor'  id='customer-login_oauth-scope'><i aria-hidden='true' class='linkify icon'></i></a>

## OAuth Scope
Your OAuth API credentials must include the [customers_login](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes) scope.

---

<a href='#customer-login_access-url' aria-hidden='true' class='block-anchor'  id='customer-login_access-url'><i aria-hidden='true' class='linkify icon'></i></a>

## Access URL
After generating the JWT token, your app should immediately redirect the shopper’s browser to the following access point URL to log the customer into their account: `/login/token/{token}`

Example:
`https://storedomain.com/login/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`

---

<a href='#customer-login_logging-in-a-customer' aria-hidden='true' class='block-anchor'  id='customer-login_logging-in-a-customer'><i aria-hidden='true' class='linkify icon'></i></a>

## Logging in a Customer
The following tutorial will walk through creating a login token. We recommend scripting this process since the iat is invalid after 30 seconds. For the purpose of illustration, this tutorial will walk through creating a token manually using the debugger tool at JWT.io, although doing so can be tricky due to time constraints.  

**Prerequisites**:
Client ID and Client Secret generated from the store with the scope set to [Customers Login](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes).

### Create a JWT Token

1. Run a /GET request against the [Customers](/api-reference/customer-subscribers/customers-api/customers/getacustomer) resource. Choose a customer and make note of the customer_id. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: success -->

### Making a /GET request
> If you are unsure how to make a /GET request see our tutorial on [making your first request](https://developer.bigcommerce.com/api-docs/getting-started/making-requests).

</div>
</div>
</div>

2. Create the payload by filling in the PAYLOAD:DATA on jwt.io

<a href='#create-the-paylpad' aria-hidden='true' class='block-anchor'  id='create-the-paylpad'><i aria-hidden='true' class='linkify icon'></i></a>


<!--
title: "Create the Payload"
subtitle: ""
lineNumbers: true
-->

**Create the Payload**

```json
{
    "iss": "1234r5t6y7u8i9o0p",
    "iat": 1535393113,
    "jti": "20b7c03e-00da-4d29-91bf-2aa06a57575b",
    "operation": "customer_login",
    "store_hash": "{store_hash}",
    "customer_id": 2,
    "redirect_to": "/account.php"
}
```

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1535469059335
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6012/1535469059335 "")

<a href='#iat-claim' aria-hidden='true' class='block-anchor'  id='iat-claim'><i aria-hidden='true' class='linkify icon'></i></a>

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### IAT Claim
> The iat claim is only good for 30 seconds.


</div>
</div>
</div>

3.  Add your Client Secret in the Verify Signature Section. Replace the text `your-256-bit-secret` with the Client Secret.
4. Copy the token from the encoded box and paste at the end of the login/token url.  

*https://store-url/login/token/generated-jwt-token*

**Example**: 
`https://storedomain.com/login/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9 .TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`

5. Paste the URL into the address bar.

If the request was successful then you will be logged in as the customer and directed to /account.php. If it was unsuccessful there will be a login attempt message and you will be directed to /login.php


<a href='#customer-login_sample-code' aria-hidden='true' class='block-anchor'  id='customer-login_sample-code'><i aria-hidden='true' class='linkify icon'></i></a>

## Sample Code

Code to generate a valid JWT token for a storefront login request is provided in our API Client Libraries. The list items below link to the repositories maintained by BigCommerce:

* [PHP Sample](https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421)
* [Python Sample](https://github.com/bigcommerce/bigcommerce-api-python/blob/master/bigcommerce/customer_login_token.py)
* [Ruby Sample](https://github.com/bigcommerce/bigcommerce-api-ruby/blob/master/examples/customers/customer_login.rb)

Client libraries in many other languages are at JWT.io.

---

<a href='#customer-login_logout-customer' aria-hidden='true' class='block-anchor'  id='customer-login_logout-customer'><i aria-hidden='true' class='linkify icon'></i></a>

## Logging Out a Customer

To logout a customer programatically, set the redirect URL in the JWT to `/login.php?action=logout`. This will log out the customer even though the cross-origin request to
`/login/token/{jwt}` will return an opaque response.

<a href='#customer-login_troubleshooting-customer-login-api' aria-hidden='true' class='block-anchor'  id='customer-login_troubleshooting-customer-login-api'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting

* If the server generating the iat is out of sync, the login token will fail if the timestamp indicates a time in the future or an expired token.

* The login URL can be visited only once. Once a GET request is run against the link, the token is invalidated. 

* Tokens can be validated or generated for testing purposes using the debugger at https://jwt.io/.

* Tokens will be valid for a very short timeframe after they are first generated, so tokens should not be generated in advance. Instead, the application should generate the token and then immediately redirect the user’s browser to `/login/token/{token}`. If you're seeing issues related to your system time differing from BC's server time, you can use the <a href="/api-reference/store-management/store-information-api/time-zone/gettime">/v2/time</a> endpoint as a source of truth.

---

## Resources 

### Sample Apps
* [PHP Sample](https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421)
* [Python Sample](https://github.com/bigcommerce/bigcommerce-api-python/blob/master/bigcommerce/customer_login_token.py)
* [Ruby Sample](https://github.com/bigcommerce/bigcommerce-api-ruby/blob/master/examples/customers/customer_login.rb)

### Additional Resources
* [JWT](https://jwt.io/) (JWT)
* [UUID generator](https://www.uuidgenerator.net/) (UUID)
