# GraphQL Storefront API

Use GraphQL to query data for headless storefronts and BigCommerce [Stencil](/stencil-docs/getting-started/about-stencil)-powered storefronts.

## GraphQL Playground

To access the GraphQL Storefront API Playground and documentation, [log in to your store](https://login.bigcommerce.com/deep-links/manage) and navigate to **Advanced Settings** **>** **Storefront API Playground**.

If you don't yet have a store and would like to experiment making queries against a staging site, [visit the Dev Center's GraphQL Playground directly](/graphql-playground).


## GraphQL Explorer

To explore Storefront nodes in an interactive graph, check out the [GraphQL Explorer](/graphql-explorer).

## Authentication



### Request tokens with REST API

Create JWT tokens for authenticating cross-origin requests by making a `POST` request to the [Create a token](/api-reference/store-management/tokens/api-token/createtoken) endpoint.

```http title="Example request: Create a token" lineNumbers
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
&nbsp;
```json title="Example response: Create a token" lineNumbers
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  "meta": {}
}
```

You can complete the GraphQL query call with any HTTP library. Use the `data.token` value from the preceding response as the `{{JWT}}` value in the `Authorization: Bearer {{JWT}}` header. 

```http title="Example GraphQL query" lineNumbers
POST /graphql
Authorization: Bearer {{JWT}}
Content-Type: application/json

{
  "query": "{ site { ... } }" //graphql query string
}
```


### Access tokens using Stencil objects

Client scripts on BigCommerce [Stencil](/stencil-docs/getting-started/about-stencil)-powered storefronts can access a token with the `{{settings.storefront_api.token}}` Handlebars object.

```handlebars title="Example GraphQL query script with Stencil token" lineNumbers
<script>
// nest within any conditional, such as onload
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {{settings.storefront_api.token}}'
    },
    body: JSON.stringify({ query: '{ site { ... } }' }) //graphql query string
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
</script>
```

### Customer impersonation tokens

It's also possible to generate tokens for use in server-to-server interactions with a trusted consumer. Make a `POST` request to the [Create a customer impersonation token](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation) endpoint.

```http title="Example request: Create a customer impersonation token" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/storefront/api-token-customer-impersonation
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "channel_id": 1,
  "expires_at": 1602288000
}

```
&nbsp;
```json title="Example response: Create a customer impersonation token" lineNumbers
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  "meta": {}
}
```


## Logging in a customer

If you're using the Storefront API from a browser (for example, on top of your Stencil storefront) you can use the Customer Login mutation to log in a customer account with an email address and password (for server-side integrations, consider a customer impersonation token instead). This will set a session cookie in the browser which will authenticate the customer account on future requests:

```graphql title="Customer login mutation" lineNumbers
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
