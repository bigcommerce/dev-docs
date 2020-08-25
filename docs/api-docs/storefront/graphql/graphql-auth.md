# Authenticating the GraphQL API

<div class="otp" id="no-index">

### On this Page
- [Section1](#section1)
- [Section2](#section2)
- [Section3](#section3)
- [Section4](#section4)
- [Section5](#section5)
- [Section6](#section6)
- [Resources](#resources)

</div>

Introduction

## Overview

GraphQL Storefront API requests are authenticated with tokens sent in the HTTP `Authorization` header.

```http
GET https://{{STORE_DOMAIN}}.com/graphql
Authorization: Bearer {{TOKEN}}
```

## Getting tokens via API

Create JWT tokens for authenticating cross-origin requests by sending a `POST` request to [`/v3/storefront/api-token`](https://developer.bigcommerce.com/api-reference/storefront/graphql-api-tokens/api-token/createtoken).

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/endpoint
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "channel_id": 1,
  "expires_at": 1602288000,
  "allowed_cors_origins": [
    "https://example.com"
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/graphql-api-tokens/api-token/createtoken#requestrunner)

**Response:**

```json
{
  "token":"...eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9...",
  "meta": {}
}
```

## Getting tokens via handlebars

Client code in BigCommerce Stencil themes can be passed a token at render time with the `{{settings.storefront_api.token}}` Handlebars object:

```html
<script>
fetch('/graphql', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer {{settings.storefront_api.token}}'
       },
       body: JSON.stringify({
           query: `
            query MyFirstQuery {...}
  `
// ...
</script>
```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
<!-- theme: warning -->

### Note
> * `1` can be passed in for the `channel_id` for generating tokens for use on the default Stencil storefront.
> * To create a channel for a remote site, see [Create Channel].(https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) in the API Reference.
> * `allowed_cors_origins` array accepts only a single origin currently -- one token must be generated for each origin.
> * `/storefront/api-token` endpoint requires the `Manage` `Storefront API Tokens` OAuth Scope.
> * `storefront/api-token-customer-impersonation` endpoint requires the `Manage` `Storefront API Customer Impersonation Tokens` OAuth Scope.

</div>
</div>
</div>

## Getting customer impersonation tokens

It's also possible to generate tokens for use in server-to-server interactions with a trusted consumer by POSTing to the [API Token Customer Impersonation Endpoint](https://developer.bigcommerce.com/api-reference/storefront/graphql-api-tokens/customer-impersonation-token/createtokenwithcustomerimpersonation):

**`POST`** `https://api.bigcommerce.com/stores/{store_id}/v3/storefront/api-token-customer-impersonation`

```json
{
  "channel_id": 1,
  "expires_at": 1602288000
}
```

**Response**:

```json
{
  "data":
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  "meta": {}
}
```

Customer Impersonation Token authenticated requests made to the GraphQL API receive store information from the perspective of the customer corresponding to the customer ID specified in the `X-Bc-Customer-Id` header sent with the GraphQL POST request -- for example: pricing, product availability, customer account, and customer details will be reflected.

Customer Impersonation Tokens should **never** be exposed publicly (e.g. to JavaScript or HTML), and should not be used for frontend requests. Unlike normal GraphQL Storefront API tokens, they are sensitive and should be treated like secrets, just as you might treat an OAuth token for BigCommerce's administrative APIs. Attempts to run requests using these tokens from a web browser will be rejected.

Consider this sample request using a Customer Impersonation token to run a request in the context of customer ID `123`:

```
curl 'https://store.com/graphql' -H 'Authorization: Bearer TOKEN_GOES_HERE' -H 'X-Bc-Customer-Id: 123' --data-binary '{"query":"query CustomerInformation {\n  customer {\n    firstName\n    lastName\n    email\n  }\n}"}'
```

## Logging in a customer

If you're using the Storefront API from a browser (for example, on top of your Stencil storefront) you can use the new Customer Login mutation to log in a customer account with an email address and password (for server-side integrations, consider a customer impersonation token instead). This will set a session cookie in the browser which will authenticate the customer account on future requests:

```js
mutation Login($email: String!, $pass: String!) {
  login(email: $email, password: $pass) {
    result
  }
}
```

## Next Steps

## Resources

### Examples
* [Bootstrap + Vanilla JS Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) (bigcommerce.github.io)
* [All BigCommerce Storefront API Examples](https://github.com/bigcommerce/storefront-api-examples) (github.com)

### Pull requests
* [Simple GraphQL Example Using Apollo Client with Cornerstone](https://github.com/bigcommerce/cornerstone/compare/graphQL-example)

### Additional resources
* [GraphQL Cheat Sheet](https://devhints.io/graphql) (devhints.io)
* [GraphQL IDE](https://github.com/andev-software/graphql-ide) (github.com)
* [GraphQL Playground](https://www.npmjs.com/package/graphql-playground-react) (npmjs.com)