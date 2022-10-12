# Authentication

BigCommerce offers a suite of APIs that let you manage store data, sign customers in, make client-side queries for product information, and write apps that integrate third-party services into store operations.

This article provides an overview of the authentication schemes that our APIs use, organized by the header or other mechanism they use to authenticate with our servers.

Regardless of the subject API's authentication scheme, BigCommerce **API accounts** play a role in every authenticated request to our servers.

Our API accounts come in a few different flavors to meet the needs of different use cases. For example, app API accounts work well in multi-store contexts, whereas store API accounts are a good choice for frontend applications. **Some endpoints only work with one kind of API account.** For a thorough explanation of the differences, check out the section on [choosing the right kind of API account](/api-docs/getting-started/authentication/rest-api-authentication#choosing-the-right-kind-of-api-account) in our API accounts article.

## Stable tokens

Most of our APIs use credentials that do not expire based on a time frame. Depending on the type of API account the credentials belong to, they might expire based on user or developer actions. 
<!-- For more on events that expire tokens, see ??forthcoming apps article??. -->

The following sections describe the two authentication schemes we use that rely on stable tokens. They include example requests and list or describe the endpoints to which the schemes apply.

### Access tokens

<!-- theme: info -->
> Legacy API accounts used HTTP basic authentication. They are no longer available to new stores. For more information, see [API Accounts: Migrating from legacy to OAuth](/api-docs/getting-started/authentication/rest-api-authentication#migrating-from-legacy-to-oauth).

Most of our REST endpoints use the `X-Auth-Token` header to authenticate to BigCommerce servers. For more about the APIs that do **NOT** use the `X-Auth-Token` header, consult this article's sections on [dynamic tokens](#dynamic-tokens) and [same-origin CORS authentication](#same-origin-cors-authentication).

The `X-Auth-Token` header uses access tokens to authenticate requests. [Create an OAuth API account](/api-docs/getting-started/authentication/rest-api-authentication#api-accounts) to generate access tokens. Pass the access token as the value of the `X-Auth-Token` header of the request you want to authenticate.

<!-- theme: info -->
> #### The X-Auth-Client header is deprecated
> Your API account's client ID is [no longer a required header value](https://developer.bigcommerce.com/changelog#posts/o-auth-client-id-is-no-longer-required-for-requests-to-api-bigcommerce-com).

For a request to succeed, the access token's API account must have permission to receive the response. Configure your API account with the minimum set of OAuth scopes that your implementation needs. 

To find the specific OAuth scopes your requests require, consult the root API reference pages for the families of endpoints you plan to use. For example, see the [OAuth scopes for the Email Templates endpoints](/api-reference/store-management/email-templates). We also maintain a [list of all our OAuth scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

#### X-Auth-Token header example requests

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

### Client ID

Another **stable token**-based scheme involves mutual authentication. The requesting app identifies itself by sending an API account's client ID as a query parameter, and our servers return a BigCommerce-generated JSON web token, or _JWT_, which securely encrypts merchant data. The app can decode the JWT to view the response. For example, the Current Customer API's JWT payload identifies the currently signed-in customer.

The following table lists the APIs that authenticate with a client ID. For OAuth scopes, consult the **Endpoint Reference** column. 


| API description | Endpoint reference | API account type | Query parameter | Query argument |
|:----------------|:-------------------|:-----------------|:----------------|:---------------|
| [Current Customer API](/api-docs/storefront/current-customer-api) | [Get current customer](/api-reference/storefront/current-customers/current-customers/getcurrentcustomer) | app | `app_client_id` | API account client ID |

### Current Customer API example request

<!-- 
type: tab
title: Example Request: Current Customer API
-->

```js title="Example GET request" lineNumbers
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

## Dynamic tokens

Several of our APIs authenticate with JSON web tokens, or _JWTs_. JWTs authorize both the requester and the recipient because they contain a signed payload that the recipient must successfully decrypt before working with the transmitted data. Some JWTs can be used unlimited times within an expiration window; others must be unique to each request.

Our JWT-based authentication schemes fall into the following categories:
* The user passes a [BigCommerce-generated JWT](#bigcommerce-generated-jwts) as part of the value of the `Authorization` header
* The user sends BigCommerce a [user-generated JWT](#user-generated-jwts)
* [BigCommerce-encrypted payload JWTs](#bigcommerce-encrypted-payload-jwts) send apps information as part of a signed JWT's payload

All requests that use JWTs require at least two steps. In addition to the request itself, you must also either get, make, or decrypt the JWT that the request sends or receives. The following sections describe the steps for these three JWT-based authentication schemes, reference the endpoints to which they apply, and give example requests.

<!-- theme: warning -->
> #### Make sure your tokens are in scope
> Before you create an API account to request dynamic tokens, determine the required OAuth scopes by consulting the documentation for your target endpoint and its corresponding REST token generation endpoint.

### BigCommerce-generated JWTs

Some APIs authenticate with an `Authorization` header that contains a string concatenated with a BigCommerce-generated JWT. Requests to these APIs contain the following two parts:
1. The user obtains the JWT by:
   * Making an API request to BigCommerce, or 
   * On Stencil storefronts, extracting it from the page's context.
2. The user sends the intended request.

The following table lists the APIs that use the `Authorization` header, along with information about obtaining a token and forming a valid header value. For OAuth scope, expiry window, and other implementation details, consult the **Endpoint Reference** column. 

| API description | Obtain a JWT | Endpoint reference | API account type | Authorization header value |
|:----------------|:-------------|:-------------------|:-----------------|:---------------------------|
| [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) | [Create a token](/api-reference/storefront/graphql-api-tokens/api-token/createtoken), Stencil context | [Create a Storefront query](/api-reference/graphql/storefront-graphql-reference) | store | `Bearer {{TOKEN}}` |
| [Payments API](/api-docs/store-management/payment-processing) | [Create a payment access token](/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost) | [Process a payment](/api-reference/store-management/payment-processing/process-payment/paymentspost) | app or store | `PAT {{TOKEN}}` |

To obtain a dynamic token, send a request to the REST endpoint listed in the **Obtain a JWT** column or consult the article listed in the **API Description** column. Use an API account with the OAuth scopes you need to make your target request. 

### Authorization header example requests

<!-- 
type: tab
title: Example request: Dynamic token
-->

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

<!-- 
type: tab
title: GraphQL Storefront API
-->

GraphQL Storefront response-request pairs resemble the following:

```json title="Example response: Create a GraphQL Storefront API token" lineNumbers
{
  "token":"BigCommerceProvidedJwt.dotDelimited.threePartString",
  "meta": {
    // ...
  }
}
```

&nbsp;

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

<!-- 
type: tab
title: Payments API
-->

Payments response-request pairs resemble the following:

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

&nbsp;

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

### User-generated JWTs

Some APIs rely on the app or implementation to send user-generated JWTs that simultaneously authenticate the request and contain the request body in their payload. Requests to these APIs contain the following two parts:
* The user encrypts, or signs, the JWT
* The user sends the intended request

The following table lists the APIs that rely on user-generated JWTs. For OAuth scope, expiry window, and other implementation details, consult the **Endpoint Reference** column. 

| API description | Create a JWT | Endpoint reference | API account type |
|:----------------|:-------------|:-------------------|:-----------------|
| [Customer Login API](/api-docs/storefront/customer-login-api) | See API description | [SSO API Reference](/api-reference/storefront/customer-login-sso) | app |

### Customer Login API example request
For the Customer Login API, your request will look something like the following:

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

### BigCommerce-encrypted payload JWTs

BigCommerce-encrypted payload JWTs let control panel apps listen to and reason about events that affect them, but happen outside the app itself. These events include users installing, loading, and uninstalling the app. Working with these JWTs includes the following parts:
* The app receives the JWT from BigCommerce
* The app validates the JWT, then decrypts its payload
* The payload's data informs what the app does next

To learn more, see our [Apps Guide](/api-docs/apps/guide/intro), especially the articles on [authorization, installation](/api-docs/apps/guide/auth), and other [app callback events](/api-docs/apps/guide/callbacks). 

## Same-origin CORS authentication

The following APIs rely on [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers for authentication. You do not need to send any BigCommerce-specific tokens with your requests to these endpoints.

### REST Storefront API

The REST Storefront API lets you make client-side requests for carts, checkouts, and orders using JavaScript or an alternative language that compiles to run in the browser. It is a convenience collection of operations that affect one customer at a time and run in the context of the customer's current session on a BigCommerce-hosted storefront. You can perform authenticated versions of the same operations using the GraphQL Storefront API or the REST Store Management APIs.

The following examples illustrate how to make calls to the REST Storefront API:

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

## Developer-configured authentication

### REST Provider APIs

Unlike our other APIs, we do not host the REST Provider APIs. The Provider API specifications describe _requests that BigCommerce sends_ the provider app's server, and the responses that we expect in return. 

The following table describes the authentication characteristics of our REST Provider APIs.

| API description | API reference | Configuration reference | Associated API account | Authentication method |
|:----------------|:--------------|:------------------------|:-----------------------|:----------------------|
| [Shipping Provider API](/api-docs/providers/shipping) | [Shipping Provider Reference](/api-reference/providers/shipping-provider-api) | [Configure during registration](/api-docs/providers/shipping#configuration-fields), and/or with [Update a carrier connection](/api-reference/store-management/shipping-api/shipping-carrier/updateacarrierconnection) | implemented in an app | developer-defined request body keys | 
| [Tax Provider API](/api-docs/providers/tax) | [Tax Provider Reference](/api-reference/providers/tax-provider-api) | [Update a tax provider connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-put) | implemented in an app | `Authorization: Basic {{base64encode(username:password)}}` |

In the Tax Provider API `Authorization` header, the username and password belong to the app's tax provider service. What this username and password actually refer to is up to the app developer. 

## Resources

### Related articles
* [Creating API Accounts](/api-docs/getting-started/authentication/rest-api-authentication)
* [OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes)
<!-- jwts in apps, graphql storefront playground -->

