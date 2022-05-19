# Authentication

BigCommerce offers a suite of APIs that let you manage store data, sign customers in, make client-side queries for product information, and write apps that integrate third-party services into store operations.

This article provides an overview of the authentication schemes that our APIs use organized by the header or other mechanism they use to authenticate with our servers.

Regardless of authentication scheme, BigCommerce **API accounts** play a role in every authenticated request to our servers.

Our API accounts come in a few different flavors to meet the needs of different use cases. For example, app API accounts work well in multi-store contexts, whereas store API accounts are a good choice for front-end applications. **Some endpoints only work with one kind of API account.** For a thorough explanation of the differences, check out the section on [choosing the right kind of API account](/api-docs/getting-started/authentication/rest-api-authentication#choosing-the-right-kind-of-api-account) in our API accounts article.

## Stable tokens

Most of our APIs use credentials that do not expire based on a time frame. Depending on the type of API account the credentials belong to, they may expire based on user or developer actions. For more on events that expire tokens, see ???[app API account reference]()???.

The following sections describe two authentication schemes that use stable tokens, give example requests, and indicate the endpoints to which the schemes apply.

### The X-Auth-Token header

<!-- theme: info -->
> Legacy API accounts used HTTP basic authentication. They are no longer available to new stores. [Learn more about migrating](/api-docs/getting-started/authentication/rest-api-authentication#migrating-from-legacy-to-oauth).

Most of our REST endpoints use the X-Auth-Token header to authenticate to BigCommerce servers. For more about the APIs that do **NOT** use the X-Auth-Token header, consult this article's sections on [dynamic tokens](#dynamic-tokens) and [unauthenticated endpoints](#unauthenticated-endpoints-the-storefront-apis).

The X-Auth-Token header uses access tokens to authenticate requests. [Create an OAuth API account](/api-docs/getting-started/authentication/rest-api-authentication#all-oauth-api-accounts) to generate access tokens. Pass the access token as the value of the `X-Auth-Token` header of the request you want to authenticate.

For a request to succeed, the access token's API account must have permission to receive the response. Configure your API account with the minimum set of OAuth scopes that your implementation needs. 

To find the specific OAuth scopes your requests require, consult the root API reference pages for the families of endpoints you plan to use. For example, see the [OAuth scopes for the Email Templates endpoints](/api-reference/store-management/email-templates). We also maintain a [list of all our OAuth scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

#### X-Auth-Token authentication examples

The following tabs contain examples of how to authenticate requests by passing an access token to the `X-Auth-Token` header.

<!--
type: tab
title: GET request
-->

```http title="Example GET request with X-Auth-Token header"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v... # endpoint
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!--
type: tab
title: POST request
-->

```http title="Example POST request with X-Auth-Token header"
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v... # endpoint
X-Auth-Token: {{access_token}}
Accept: application/json
Content-Type: application/json

{
  // request body
}
```

<!--
type: tab
title: PUT request
-->

```http title="Example PUT request with X-Auth-Token header"
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v... # endpoint
X-Auth-Token: {{access_token}}
Accept: application/json
Content-Type: application/json

{
  // request body
}

```
<!--
type: tab
title: DELETE request
-->

```http title="Example DELETE request with X-Auth-Token header"
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v... # endpoint
X-Auth-Token: {{access_token}}
Accept: application/json
```

<!-- type: tab-end -->

### The Current Customer API

Calls to the Current Customer API request BigCommerce-generated JWTs that confirm a customer's identity and logged-in status. This API authenticates by sending an app API account's **client ID** as a query parameter. BigCommerce responds with a JWT that your app or implementation can decode to verify the customer's identity.

For OAuth scope and implementation details, consult [Current Customer API](/api-docs/storefront/current-customer-api) and [Get Current Customer](/api-reference/storefront/current-customers/current-customers/getcurrentcustomer).

The following request-response sequence shows the authentication scheme for the Current Customer API:

<!-- 
type: tab
title: Example Request: Current Customer API
-->

```js title="Example GET request: Current Customer API" lineNumbers
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

```shell title="Example response.text(): JWT string"
# response body
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lciI6eyJpZCI6NDkyNywiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJncm91cF9pZCI6IjYifSwiaXNzIjoiYmMvYXBwcyIsInN1YiI6ImFiYzEyMyIsImlhdCI6MTQ4MDgzMTg2MywiZXhwIjoxNDgwODMyNzYzLCJ2ZXJzaW9uIjoxLCJhdWQiOiI2c3YxNnRmeDNqNWdzb3BtNDJzczVkZDY3ZzJzcnZxIiwiYXBwbGljYXRpb25faWQiOiI2c3YxNnRhc2RncjJiNWhzNWRkNjdnMnNydnEiLCJzdG9yZV9oYXNoIjoiYWJjMTIzIiwib3BlcmF0aW9uIjoiY3VycmVudF9jdXN0b21lciJ9.uYTDTJzhDOog7PE1yLNeP6zDNdFMb91fS-NZrJpsts0
```

<!-- type: tab-end -->

## Dynamic tokens

A number of our APIs use tokens that vary over time. Some can be used an unlimited number of times within an expiration window; others must be unique to each request. The following sections describe a series of authentication schemes, give example requests, and list the endpoints to which they apply along with links to learn more. 

<!-- theme: warning -->
> #### Ensure your tokens are in scope
> Consult the documentation for your target endpoint and the REST token generation endpoint that correspond to your use case to determine the required OAuth scopes before you create an OAuth API account to request dynamic tokens.

### The Authorization header

Currently, two endpoints use the Authorization header: the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) and the [Process a payment](/api-reference/store-management/payment-processing/process-payment/paymentspost) endpoint.

The following table describes??... oauth

For OAuth scope and implementation details, consult the ??following 

| API | Obtain an auth token | Authorization header endpoint | Header value | API account type |
|:----|:---------------------|:------------------------------|:------------|
[GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) | [Create a token](/api-reference/storefront/graphql-api-tokens/api-token/createtoken), Stencil context | [Create a Storefront query](/api-reference/graphql/storefront-graphql-reference) | Bearer {{TOKEN}} | store |
[Payments API](/api-docs/store-management/payment-processing) | [Create a payment access token](/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost) | [Process a payment](/api-reference/store-management/payment-processing/process-payment/paymentspost) | PAT {{TOKEN}} | app or store |


First, request a dynamic token by hitting the ??possessive?? REST endpoint that uses the X-Auth-Token header, using an API account with OAuth scopes that allow the actions you want the Auth header request to do. Consider the following:

```http title="Example request: limited-use auth token"
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/some-token-generating-endpoint
X-Auth-Token: {{access_token}} # the OAuth scopes of this access token must allow the stuff you want to do with the limited-use token
Accept: application/json
Content-Type: application/json

{
  // request body per token request endpoint documentation
}
```

Then, include the returned token with an identifying string in the Authorization header of your request.

#### The GraphQL Storefront API
For the GraphQL Storefront API, your response-request pair will look something like the following:

<!-- 
type: tab
title: Example Response: Create a token
-->

```json title="Example response: Create a GraphQL Storefront API token" lineNumbers
{
  "token":"BigCommerceProvidedJwt.dotDelimited.threePartString",
  "meta": {
    // ...
  }
}
```

<!-- 
type: tab
title: Example Query: GraphQL Storefront API
-->

```js title="Example query: GraphQL Storefront API" lineNumbers

const gqlStorefrontQuery = (token, gqlQueryString) => {
  // example token is "BigCommerceProvidedJwt.dotDelimited.threePartString"
  let authHeader = `Bearer ${token}`; // there's a space between "Bearer" and the token
  let requestBody = {
    query: gqlQueryString
  };
  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader 
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .then(result => {
    console.log(result); // GraphQL query response
    // do stuff...
  })
  .catch(error => console.error(error));
}
```

<!-- type: tab-end -->


#### The Payment Processing API
The Payment Processing response-request pair should resemble the following pair:

<!-- 
type: tab
title: Example Response: Create a token
-->

```json title="Example response: Create a payment access token" lineNumbers
{
  "data": {
    "id": "BigCommerceProvidedJwt.dotDelimited.threePartString"
  },
  "meta": {
     // ...
  }
}
```

<!-- 
type: tab
title: Example Request: Process a payment
-->

```http title="Example request: Process a payment" lineNumbers

# example TOKEN is BigCommerceProvidedJwt.dotDelimited.threePartString

POST https://payments.bigcommerce.com/stores/{{STORE_HASH}}/payments
Accept: application/vnd.bc.v1+json # note uncommon accept header value
Authorization: PAT {{TOKEN}} # there's a space between "PAT" and the token
Content-Type: application/json

{
  // ...
}

```

<!-- type: tab-end -->

### The Customer Login API
<!-- access point URL with JWT as path parameter -->

??example, rewrite

The Customer Login API is BigCommerce's mechanism for single sign-on. Your app or implementation generates signed JWTs that simultaneously authenticate your request and identify the customer you want to sign in. You need an app API account to use the Customer Login API.

```js title="Example GET request: Customer Login API"

const loginCustomer = (yourJwt) => {
  let resource = `${window.location.origin}/login/token/${yourJwt}`;
  return fetch(resource)
  .then(response => {
    console.log(response);
    if(response.status === 200) {
      // resolve any parts of the response to work with...
      return Promise.all([response.url, response.text()]);
    } else {
      return new Error(`response.status is ${response.status}`);
    }
  })
  .then(([url, content]) => {
    console.log(url); // navigate to URL, or
    console.log(content); // work with page content
    // etc...
  })
  .catch(error => console.error(error));
}
```


For OAuth scope and implementation details, consult [Customer Login API](/api-docs/storefront/customer-login-api) and [SSO API Reference](/api-reference/storefront/customer-login-sso).





## Unauthenticated endpoints: the REST Storefront APIs

??example of no particular headers? cors??

The Storefront APIs allow you to make client-side requests for carts, checkouts, and orders using JavaScript or an alternative language that compiles to run in the browser. They are a convenience collection of operations that affect one customer at a time. These endpoints are unauthenticated and may be low-risk for your store's use case. You can perform authenticated versions of the same operations using GraphQL or the Store Management REST APIs.



```js title="Example script: REST Storefront API call" lineNumbers

const storefrontCall = (endpoint, requestBody = null) => {
  let resource = `${window.location.origin}/api/storefront${endpoint.route}`;
  let init = {
    method: endpoint.method,
    credentials: "same-origin",
    headers: {
      // note: no authorization
      "Accept": endpoint.accept,
    }
  }
  if(requestBody) {
    init.body = JSON.stringify(requestBody);
    init.headers["Content-Type"] = endpoint.content;
  }

  return fetch(resource, init)
  .then(response => {
    console.log(response);
    if(response.status === endpoint.success) {
      // resolve promise using the Fetch API method that correlates with the endpoint.accept value
      return response.json(); // or response.text()
    } else {
      return new Error(`response.status is ${response.status}`);
    }
  })
  .then(result => {
    console.log(result); // requested data
    // do stuff...
  })
  .catch(error => console.error(error));
}

```
&nbsp;

<!-- 
type: tab
title: storefrontCall GET request 
-->

```js title="Example GET call: Get a cart" lineNumbers
let endpoint = {
  route: "/carts?include=lineItems.physicalItems.options",
  method: "GET",
  accept: "application/json",
  // content: "application/json",
  success: 200 
}

storefrontCall(endpoint);

```

<!-- 
type: tab
title: storefrontCall POST request 
-->

```js title="Example POST call: Add cart line items" lineNumbers
let endpoint = {
  route: "/carts/123abc45-de67-89f0-123a-bcd456ef7890/items", 
  method: "POST", 
  accept: "application/json",
  content: "application/json",
  success: 200
}

let requestBody = {
  lineItems: [
    {
      productId: 123,
      quantity: 3
    }
  ]
}

storefrontCall(endpoint, requestBody);

```

<!-- 
type: tab
title: storefrontCall PUT request 
-->

```js title="Example PUT call: Update checkout billing address" lineNumbers
let endpoint = {
  route: "/checkouts/123abc45-de67-89f0-123a-bcd456ef7890/billing-address/123abc456def7",
  method: "PUT",
  accept: "application/json",
  content: "application/json",
  success: 200
}

let requestBody = {
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@example.com",
  "company": "BigCommerce",
  "address1": "123 Main Street",
  "address2": "Apt 1",
  "city": "Austin",
  "stateOrProvinceCode": "TX",
  "countryCode": "US",
  "postalCode": "78701"
}

storefrontCall(endpoint, requestBody);

```

<!-- 
type: tab
title: storefrontCall DELETE request 
-->

```js title="Example DELETE call: Delete a cart" lineNumbers
let endpoint = {
  route: "/carts/123abc45-de67-89f0-123a-bcd456ef7890",
  method: "DELETE", 
  accept: "application/json", 
  // content: "application/json", 
  success: 204
}

storefrontCall(endpoint);

```

<!-- type: tab-end -->


## Resources
??reconsider these
### Related articles
* [Creating API Accounts](/api-docs/getting-started/authentication/rest-api-authentication)
* [OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes)

### Outside reading
* [OAuth 2.0 Simplified (oauth.net)](https://oauth.net/getting-started/)
* [What the Heck is OAuth (Okta)](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)
* [An Introduction to OAuth 2 (Digital Ocean)](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
* [RFC6749 Standard (IETF)](https://tools.ietf.org/html/rfc6749)
