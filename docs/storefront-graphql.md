# GraphQL Storefront API

* **Host**: {$$.env.store_domain}/graphql
* **Protocols**: `https`
* **Accepts**: `application/json`
* **Responds with**: `application/json`

Download Spec: [storefront_tokens.v3.yml](https://bigcommerce.stoplight.io/api/v1/projects/bigcommerce/api-reference/nodes/reference/storefront_tokens.v3.yml?branch=master&amp;deref=all&amp;format=json)

Use GraphQL to query data for headless storefronts and BigCommerce [Stencil](/stencil-docs/getting-started/about-stencil)-powered storefronts.

## GraphQL Playground

To access the GraphQL Storefront API Playground and documentation, [log in to your store](https://login.bigcommerce.com/deep-links/manage) and navigate to **Advanced Settings** **>** **Storefront API Playground**.

If you don't yet have a store and would like to experiment making queries against a staging site, [visit the Dev Center's GraphQL Playground directly](/graphql-playground).


## GraphQL Explorer

To explore Storefront nodes in an interactive graph, check out the [GraphQL Explorer](/graphql-explorer).

## Authentication

### Tokens via API

Create JWT tokens for authenticating cross-origin requests by making a `POST` request to [/v3/storefront/api-token](/api-reference/storefront/graphql-api-tokens/api-token/createtoken).

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/storefront/api-token
X-Auth-Token: {{ACCESS_TOKEN}}
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

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/storefront/graphql-api-tokens/api-token/createtoken#requestrunner)


### Tokens via handlebars

Client code on BigCommerce [Stencil](/stencil-docs/getting-started/about-stencil)-powered storefronts can be passed a token at render time with the `{{settings.storefront_api.token}}` Handlebars object.

```js
  fetch('/graphql', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {{settings.storefront_api.token}}'
    },
    body: JSON.stringify({ query: '{ site { ... } }' }),
  });
```

### Customer impersonation tokens

It's also possible to generate tokens for use in server-to-server interactions with a trusted consumer. To [create a customer impersonation token](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation), send a `POST` request to `/v3/storefront/api-token-customer-impersonation`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/storefront/api-token-customer-impersonation
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "channel_id": 1,
  "expires_at": 1602288000
}

```

[![Open in Request Runner](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation#requestrunner)

[Response](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation#responses):

```json
{
  "data":
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  "meta": {}
}
```


## Logging in a customer

If you're using the Storefront API from a browser (for example, on top of your Stencil storefront) you can use the Customer Login mutation to log in a customer account with an email address and password (for server-side integrations, consider a customer impersonation token instead). This will set a session cookie in the browser which will authenticate the customer account on future requests:

```js
mutation Login($email: String!, $pass: String!) {
  login(email: $email, password: $pass) {
    result
  }
}
```


As a best practice, you should inject the password using GraphQL query variables. This prevents the password from being exposed in the query itself. In the [GraphQL Playground](/graphql-playground), you can set the variables for the request. [Learn more about GraphQL Storefront API Authentication](/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication).


## Resources

* [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview)
* [GraphQL Playground](/graphql-playground)
* [GraphQL Explorer](/graphql-explorer)
