# Current Customer API

## Securely identifying signed-in customers

Suppose your application interacts dynamically with a Stencil storefront and conveys specific information to a particular signed-in customer. You must confirm that customer's identity within the insecure environment of the user's browser before revealing any sensitive information.

To address this need, BigCommerce provides a Current Customer endpoint that your app can access on the storefront using JavaScript. This endpoint allows a remote application, such as a third-party subscription billing app, to return a JSON web token, or _JWT_, with identifying customer details. The information is signed with your [app API account's client secret](/api-docs/getting-started/authentication/rest-api-authentication#api-accounts).

<!-- theme: info -->
> #### API account notes
> - This endpoint requires **app API account** credentials. For more information about generating accounts, consult the [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication#app-api-accounts).
> - The app you create doesn't need to be installed or published on a store, and you don't need to generate access tokens. All you need are the client ID and client secret. See the section on [client ID-based authentication](/api-docs/getting-started/authentication#client-id) in the Authentication tutorial.


## Request

To test this endpoint, save this [Current Customer API example request](/api-docs/getting-started/authentication#current-customer-api-example-request) JavaScript snippet in the **Script Manager** of one of your sandbox store's Stencil storefronts. Include your app API account's client ID as the value of the `app_client_id` query parameter.

## Response

This API call returns a JWT, sent as a plain-text string. See the [example response](/api-docs/getting-started/authentication#current-customer-api-example-request) on the tab next to the preceding example request.

Decode the JWT using the client secret from the same app API account as the client ID you sent with the request. We recommend that your browser script send this JWT in a POST request to your server or a Function-as-a-Service (FaaS) that can work securely with your client secret. After your implementation decodes and validates the JWT, you can trust the payload as a source of truth about the signed-in customer's identity. You can now use the payload's customer information to make other API calls and display confidential data to the shopper.

The following code block is an example payload from a decoded Current Customer JWT:

```json title="Example payload: Current Customer" lineNumbers
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

<!-- theme: info -->
> #### IAT and EXP claims
> Current customer tokens are valid for 15 minutes.

To view the data during development, you can use the JWT decoding tool at [jwt.io](https://jwt.io/). In production, your implementation should handle decoding the JWT. There are robust packages for most languages that can handle this for you. You can see end-to-end examples that display a customer's recently purchased products in the [Ruby](https://github.com/bigcommerce/hello-world-app-ruby-sinatra/) and [PHP](https://github.com/bigcommerce/hello-world-app-php-silex/) sample apps.

When a shopper is browsing as a guest, the endpoint returns a `404 Not Found` HTTP status code and an error message. 

On Stencil storefronts, you can check whether any customer is signed in before running the request by wrapping your request in an `{{#if customer}}` [Handlebars Helper](/stencil-docs/reference-docs/handlebars-helpers-reference#if). 

## Resources

### Reference

* [Get current customer](/api-reference/storefront/current-customers/current-customers/getcurrentcustomer) endpoint
* [API Accounts and OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication)
* [Authentication and Example Requests](/api-docs/getting-started/authentication)
* [#if Handlebars Helpers](/stencil-docs/reference-docs/handlebars-helpers-reference#if)
* [JWT sandbox (jwt.io)](https://jwt.io/)

### Sample apps
* [Ruby (GitHub)](https://github.com/bigcommerce/hello-world-app-ruby-sinatra/)
* [PHP (GitHub)](https://github.com/bigcommerce/hello-world-app-php-silex/)




