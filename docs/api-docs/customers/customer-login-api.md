#  Customer Login API Tutorial

<div class="otp" id="no-index">

### On This Page
- [Introduction](#introduction)
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Tutorial](#tutorial)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources )

</div> 

## Introduction
In this tutorial, you will learn how to enable single sign-on for storefront customers using the Customer Login API and JSON Web Tokens.

## Overview

Single sign-on (SSO) is an authentication mechanism that enables users to log into multiple software applications using the same set of credentials entered only once. It eliminates the need to maintain multiple passwords, streamlining the process of accessing web applications. For more details, see [Single sign-on](https://en.wikipedia.org/wiki/Single_sign-on). 

The Customer Login API authenticates users logged into your web application to your BigCommerce store using SSO.

Use cases for the Customer Login API include:

* Integration with a SSO provider or Identity Provider (IdP) 
* Continuous login between a BigCommerce store and another application
* Alternative login methods (ex. phone number and SMS password)

Storefront customers are logged in using the access point URL `/login/token/{token}`. The `{token}` must be a JSON Web Token (JWT) containing parameters for the customer login request signed by your application’s OAuth Client Secret. For more information on the OAuth protocol, see [OAuth](https://oauth.net/2/). 

JWT is an industry standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) for securely transmitting information between two parties. A JWT is represented as a sequence of base64url-encoded parts separated by dots (` . `).  The parts include header, payload, and signature. For more details, see [Introduction to JSON Web Tokens](https://jwt.io/introduction/). 

**Payload Fields Reference**

| Field Name | Type | Description |
|-|-|-|
| iss | string | Indicates the token's issuer. This is your application's Client ID.|
| iat | integer| Time when the token was generated. This is a numeric value indicating the number of seconds since the [Unix epoch](http://en.wikipedia.org/wiki/Unix_time).|
| jti | string | A unique request ID (ex. uuid).|
| operation | string | Must contain the string "customer_login".|
| store_hash | string | Store hash identifying the store you are logging into.|
| customer_id | integer | ID of the customer you are logging in.|
| redirect_to | string | Optional field containing a relative path for the shopper's destination after login. Will default to `/account.php`. |
| request_ip | string | Optional field containing the expected IP address for the request. If provided, BigCommerce will check that it matches the browser trying to log in.|

## Prerequisites

To enable SSO using the Customer Login API, you will need the following: 

* A BigCommerce store
* API Client ID and Client Secret with the OAuth Scope set to Customers Login
* [Node.js](https://nodejs.org/en/) installed on your machine if you plan to use JavaScript

If you do not know your Client ID and Client Secret, follow the steps outlined in [Creating an API Account](https://support.bigcommerce.com/articles/Public/Store-API-Accounts/#creating) to obtain the necessary credentials. Make sure to set your OAuth Scope to Customers Login: login. 

![Example OAuth Scope](https://storage.googleapis.com/bigcommerce-production-dev-center/images/scopes.png "Example OAuth Scope")

## Tutorial

To log a customer into their storefront account using the Customer Login API, your app needs to redirect the customer’s browser to the following access point URL: `https://storedomain.com/login/token/{token}`.

The `{token}` parameter is the JWT containing the payload data signed by your app’s OAuth Client Secret.

We recommend writing a script to generate a login token since JTW’s `iat` (Issued At) claim is only valid for 30 seconds. BigCommerce supplies helper methods for generating login tokens in our [API Client Libraries](https://developer.bigcommerce.com/tools-resources).

The beginning of this tutorial focuses on manually creating a token using the Debugger tool at [JWT.io](https://jwt.io/). Then, we will look at how to use a JavaScript function to programmatically generate an access point URL. 

### Create JWT Using the Debugger

1. Retrieve a `customer_id` using the [Customers v3 API](https://developer.bigcommerce.com/api-reference/store-management/customers-v3). Send a GET request to the [Get All Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customers/customersget) endpoint, choose a customer, and make note of the `customer_id`. 

```json
{
    "accepts_product_review_abandoned_cart_emails": true,
    "authentication": {
      "force_password_reset": false
    },
    "company": "BigCommerce",
    "customer_group_id": 2,
    "date_created": "2020-02-06T17:46:33Z",
    "date_modified": "2020-02-07T19:58:03Z",
    "email": "customer@email.com",
    "first_name": "Jane",
    "id": 1,
    "last_name": "Doe",
    "notes": "",
    "phone": "",
    "registration_ip_address": "",
    "tax_exempt_category": "D"
}
```

2. Go to [JWT.io](https://jwt.io/) and open the Debugger. Make sure that the JWT `alg` (algorithm) is set to “HS256” and the `typ` (token type) is set to “JWT”.

![JWT Header](https://storage.googleapis.com/bigcommerce-production-dev-center/images/header-token.png "Header")

3. Create a payload by filling in PAYLOAD: DATA on [JWT.io](https://jwt.io/). 

![JWT Payload](https://storage.googleapis.com/bigcommerce-production-dev-center/images/payload-data.png "Payload")

4. Replace “your-256-bit-secret” with your Client Secret. 

![JWT Signature](https://storage.googleapis.com/bigcommerce-production-dev-center/images/verify-signature.png "Signature")

5. Copy the login token from the encoded box and paste it into the access point URL replacing the `{token}` parameter. 
</br>
Example: 
`https://storedomain.com/login/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ7Y2xpZW50X2lkfSIsImlhdCI6MTUzNTM5MzExMywianRpIjoie3V1aWR9Iiwib3BlcmF0aW9uIjoiY3VzdG9tZXJfbG9naW4iLCJzdG9yZV9oYXNoIjoie3N0b3JlX2hhc2h9IiwiY3VzdG9tZXJfaWQiOjJ9.J-fAtbjRFGdLsT744DhoprFEDqIfVq72HbDzrbFy6Is`

6. Paste the URL into the address bar of your web browser. 

If the request was successful, you will be logged in as a customer and directed to `/account.php`. If it was unsuccessful, a login attempt error message will be displayed and you will be directed to `/login.php`. 

![Login Error](https://storage.googleapis.com/bigcommerce-production-dev-center/images/invalid-login.png "Login Error")

For common causes of login failure, see [Troubleshooting](#troubleshooting).

### Create JWT Using a JavaScript Function

In this part of the tutorial, we will walk you through creating an access point URL using JavaScript. You will need to have [node.js](https://nodejs.org/en/) installed on your machine to complete this section. 

1. Create and open a new folder by running the following commands in your terminal:
</br>
`mkdir urlGenerator`
</br>
`cd urlGenerator` 

2. Create a new node project with the following command:
</br>
  `npm init`

3. Install [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [uuid](https://www.npmjs.com/package/uuid) npm packages:
</br>
  `npm install jsonwebtoken uuid`

4. Open the `urlGenerator` folder in your code editor of choice and create a new JS file.

5. Paste the following code in your JS file:

```js
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
 
function getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret) {
   const dateCreated = Math. round((new Date()). getTime() / 1000);
   const  payload = {
       "iss": clientId,
       "iat": dateCreated,
       "jti": uuidv4(),
       "operation": "customer_login",
       "store_hash": storeHash,
       "customer_id": customerId,
   }
   let token = jwt.sign(payload, clientSecret, {algorithm:'HS256'});
   return `${storeUrl}/login/token/${token}`;
};
 
const clientId = “Your client id”;
const clientSecret = “Your client secret”;
const customerId = “You customer id”;
const storeHash = “Your store hash”;
const storeUrl = “Your store url”;
 
const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);
console.log(loginUrl);
```
6. Replace your app and customer-specific values in the variables.

7. Run the code: 
  </br>
  `node youFileName.js`
  </br>
  You should receive a complete access point URL as an output. 

8. Copy the URL and paste it into the address bar of your browser. 

If the request was successful, you will be logged in as a customer and directed to `/account.php`. If it was unsuccessful, a login attempt error message will be displayed and you will be directed to `/login.php`. For common causes of login failure, see [Troubleshooting](#troubleshooting).

### Sample Code

Helper methods for generating login tokens are provided in our [API Client Libraries](https://developer.bigcommerce.com/tools-resources). See the following BigCommerce repositories for language-specific examples:

* [PHP Sample](https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421)
* [Python Sample](https://github.com/bigcommerce/bigcommerce-api-python/blob/master/bigcommerce/customer_login_token.py)
* [Ruby Sample](https://github.com/bigcommerce/bigcommerce-api-ruby/blob/master/examples/customers/customer_login.rb)

For client libraries in other languages, see [Libraries for Token Signing/Verification](https://jwt.io/#libraries-io).

### Logging Out 

To log out a customer, set the `redirect_to` field of the JWT’s payload to `/login.php?action=logout`. 

## Troubleshooting

* If the clock of the server generating the “iat” claim is not synchronized, the timestamp will be out of sync and the request will fail. If your system’s time is different from the BigCommerce server time, you can use the [Get System Timestamp](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/time-zone/gettime) endpoint as a source of truth.
* The access point URL can be visited only once. The token will be invalidated after the GET request is made.
* Tokens should not be generated in advance. Instead, the app should generate the token and immediately redirect the user’s browser to the access point URL. 

## Additional Resources 

* [API Clients](https://developer.bigcommerce.com/tools-resources)
* [Authenticating BigCommerce’s REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials)
* [Customer Login SSO](https://developer.bigcommerce.com/api-reference/storefront/customer-login-sso)
* [Customers V3](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)
* [Introduction to JSON Web Tokens](https://jwt.io/introduction/)
* [Online UUID Generator](https://www.uuidgenerator.net/)
* [BigCommerce APIs Quick Start](https://developer.bigcommerce.com/api-docs/getting-started/making-requests)
* [Store API Accounts](https://support.bigcommerce.com/articles/Public/Store-API-Accounts/)
* [Unix Time](https://en.wikipedia.org/wiki/Unix_time)




