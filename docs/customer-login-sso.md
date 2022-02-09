# Customer Login SSO

* **Host**: {$$.env.store_domain}/graphql
* **Protocols**:`https`
* **Accepts**: `application/json`
* **Responds With**: `application/json`


Download Spec: [customer_login.json](https://bigcommerce.stoplight.io/api/v1/projects/bigcommerce/api-reference/nodes/reference/customer_login.yml?branch=master&amp;deref=all&amp;format=json)

Create a login URL for customer single sign-on.

## Authentication

To log in a customer using the Customer Login API, redirect the customer's browser to the following access point URL:

```http
  https://storedomain.com/login/token/{{TOKEN}}
```


The `{{TOKEN}}` parameter is the `JWT` containing the payload data signed by your app's OAuth client secret. 

We recommend writing a script to generate a login token since the `JWT iat` (issued at) claim is only valid for 30 seconds. BigCommerce supplies helper methods for generating login tokens in our [API Client Libraries](/tools-resources).
    

### OAuth scopes

| UI Name | Permission | Parameter |
|----|----|----|
| Customers | read-only | `store_v2_customers_read_only` |
| Customers | login | `store_v2_customers_login` |



### JWT Header

```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }
```


### JWT Payload
    // example, schema

### JWT Signature
    
To create the signature, sign the encoded header, the encoded payload, and client_secret using the `HMAC SHA256` algorithm.
  
```js
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    {{CLIENT_SECRET}}
  )
```


## Node.js example
      
Create `urlGenerator.js` node app and install dependencies.
    
```shell
  mkdir urlGenerator

  cd urlGenerator

  touch urlGenerator.js

  npm init

  npm install jsonwebtoken uuid
```

Paste the following into `urlGenerator/urlGenerator.js`.

```js
  const jwt = require('jsonwebtoken');
  const {v4: uuidv4} = require('uuid');

  const clientId = "{{CLIENT_ID}}";
  const clientSecret = "{{CLIENT_SECRET}}";
  const customerId = "{{CUSTOMER_ID}}";
  const storeHash = "{{STORE_HASH}}";
  const storeUrl = "{{STORE_URL_ORIGIN}}";

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
  
  const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);

  console.log(loginUrl);
```


Replace `{{CLIENT_ID}}` and other variables with your credentials, then run the app.

```shell
  node urlGenerator.js
```

You should receive a complete access point URL as an output.

<!-- theme: info -->
> #### Note
> You are required to include the `channel_id` when using the login JWTs to redirect to an embedded checkout. Default value = 1. For more information, see the [Embedded Checkout Overview](/api-docs/storefronts/embedded-checkout/embedded-checkout-overview).


## Resources

* [Customer Login SSO Generator with Ruby](https://github.com/jordanarldt/ruby-bc-customer-sso-generator/)
* [Customer Login API](/api-docs/customers/customer-login-api)
* [PHP Example](https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421)
* [Python Example](https://github.com/bigcommerce/bigcommerce-api-python/blob/master/bigcommerce/customer_login_token.py)
