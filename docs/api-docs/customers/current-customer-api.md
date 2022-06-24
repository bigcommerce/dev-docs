# Current Customer API



## Identifying logged-in customers securely

Suppose your application interacts dynamically with the BigCommerce storefront and conveys specific information to a particular logged-in customer. You must confirm that customer's identity within the insecure environment of the user's browser before revealing any sensitive information.

To address this need, BigCommerce provides a Current Customer endpoint that your app can access via JavaScript on the storefront. This endpoint allows a remote application, such as a third-party subscription billing app, to return a JWT with identifying customer details. The information is signed with your [OAuth client secret](/api-docs/getting-started/basics/authentication#authentication_client-id-secret).

<!-- theme: info -->
> #### Note
> - An app client ID is required in requests to `/customer/current.jwt`.
> - To generate an app client ID, create an app in the [BigCommerce Developer Portal](https://devtools.bigcommerce.com/).
> - Use the app's secret to validate the signature on the JWT.
> - The app doesn't need to be installed or published on a store to use the client ID to get the JWT.



## Example JavaScript

Below is an example JavaScript code snippet that will access this JWT. To test the JWT functionality, you can install this JavaScript on your sandbox BigCommerce store. You must include your application's client ID in the request to identify the requesting application.

<!--
type: tab
title: Example Javascript: Current Customer API
-->

```js title="Example Javascript Snippet" lineNumbers
const customerJWT = (apiAccountClientId) => {
  let resource = `/customer/current.jwt?app_client_id=${apiAccountClientId}`;
  return fetch(resource)
  .then(response => {
    if(response.status === 200) {
      return response.text();
    } else {
      return new Error(`response.status is ${response.status}`);
    }
  })
  .then(jwt => {
    console.log(jwt); // JWT here
    // decode...
  })
  .catch(error => console.error(error));
}
```

<!--
type: tab
title: Example Response: Current Customer API
-->

```shell title="Example text response: JWT string"
# response body
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lciI6eyJpZCI6NDkyNywiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJncm91cF9pZCI6IjYifSwiaXNzIjoiYmMvYXBwcyIsInN1YiI6ImFiYzEyMyIsImlhdCI6MTQ4MDgzMTg2MywiZXhwIjoxNDgwODMyNzYzLCJ2ZXJzaW9uIjoxLCJhdWQiOiI2c3YxNnRmeDNqNWdzb3BtNDJzczVkZDY3ZzJzcnZxIiwiYXBwbGljYXRpb25faWQiOiI2c3YxNnRhc2RncjJiNWhzNWRkNjdnMnNydnEiLCJzdG9yZV9oYXNoIjoiYWJjMTIzIiwib3BlcmF0aW9uIjoiY3VycmVudF9jdXN0b21lciJ9.uYTDTJzhDOog7PE1yLNeP6zDNdFMb91fS-NZrJpsts0
```

<!-- type: tab-end -->

The above JavaScript should alert the browser with a JWT token after logging into the storefront with a customer account. The JWT returned from this endpoint (example below) can be decoded on [JWT.IO](https://jwt.io/).

If a shopper is browsing as a guest, BigCommerce will return a `404` response, and you will see an error message. Wrapping your script in a `{{#if customer}}` Handlebars helper will check for a logged-in customer before running the request. For more information, visit Handlebars Helpers. [Handlebars Helpers](/stencil-docs/reference-docs/handlebars-helpers-reference#if).

**Example Logged In Customers Response**

```json
{
  "customer": {
    "id": 4927,
    "email": "john.doe@gmail.com",
    "group_id": "6"
  },
  "iss": "bc/apps",
  "sub": "abc123",
  "iat": 1480831863,
  "exp": 1480832763,
  "version": 1,
  "aud": "6sv16tfx3j5gsopm42ss5dd67g2srvq",
  "application_id": "6sv16tasdgr2b5hs5dd67g2srvq",
  "store_hash": "abc123",
  "operation": "current_customer"
}
```

By design, your application should send this token to the application’s server, validate it against your client secret, and then use it as a trusted indication of the logged-in customer's identity, before displaying confidential information to them.

An end-to-end example that displays a customer's recently purchased products is available in our [Ruby](https://github.com/bigcommerce/hello-world-app-ruby-sinatra/) and [PHP](https://github.com/bigcommerce/hello-world-app-php-silex/) sample apps.

<!-- theme: info -->
> #### IAT and EXP claims
> The current customer tokens are valid for 15 minutes.


