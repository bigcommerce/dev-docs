# Authentication

BigCommerce offers a suite of APIs that let you manage store data, sign customers in, make client-side queries for product information, and write apps that integrate third-party services into store operations.

This article provides an overview of the authentication schemes that our APIs use organized by the header or other mechanism they use to authenticate with our servers.

Regardless of authentication scheme, BigCommerce **API accounts** play a role in every authenticated request to our servers.

Our API accounts come in a few different flavors to meet the needs of different use cases. For example, app API accounts work well in multi-store contexts, whereas store API accounts are a good choice for front-end applications. For a thorough explanation of the differences, check out the section on [choosing the right kind of API account](/api-docs/getting-started/authentication/rest-api-authentication#choosing-the-right-kind-of-api-account) in our API accounts article.

## Stable tokens: the X-Auth-Token header

<!-- theme: info -->
> Legacy API accounts used HTTP basic authentication. They are no longer available to new stores. [Learn more about migrating](/api-docs/getting-started/authentication/rest-api-authentication#migrating-from-legacy-to-oauth).

Most of our REST endpoints use the X-Auth-Token header to authenticate to BigCommerce servers. For more about the APIs that do **NOT** use the X-Auth-Token header, consult this article's sections on [dynamic tokens](#dynamic-tokens-the-authorization-header) and [unauthenticated endpoints](#unauthenticated-endpoints-the-storefront-apis).

The X-Auth-Token header uses access tokens to authenticate requests. [Create an OAuth API account](/api-docs/getting-started/authentication/rest-api-authentication#all-oauth-api-accounts) to generate access tokens. Pass the access token as the value of the `X-Auth-Token` header of the request you want to authenticate.

For a request to succeed, the access token's API account must have permission to receive the response. Configure your API account with the minimum set of OAuth scopes that your implementation needs. 

To find the specific OAuth scopes your requests require, consult the root API reference pages for the families of endpoints you plan to use. For example, see the [OAuth scopes for the Email Templates endpoints](/api-reference/store-management/email-templates). We also maintain a [list of all our OAuth scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

The following tabs pres

### X-Auth-Token authentication example requests

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
METHOD https://api.bigcommerce.com/stores/{{STORE_HASH}}/v... # endpoint
X-Auth-Token: {{access_token}}
Accept: application/json
```
<!-- type: tab-end -->

<!-- theme: info -->
> #### App-specific APIs
> We recommend that you implement some REST APIs exclusively through an app. These APIs currently include the following:
> * The [Shipping Provider API](/api-docs/providers/shipping), which connects a shipping service to stores and supports a range of shipping-related actions, such as custom rate table calculations.
> * The [Tax Provider API](/api-docs/providers/tax), which connects tax calculation and filing services to stores.
> Depending on your use case, you might choose to interact with a third-party provider app using a store API account. 

## Dynamic tokens: the Authorization header

Consult the REST token generation endpoint that corresponds to your use case to determine the required OAuth scope before you create an OAuth API account to request dynamic tokens.

First, request a short term token by hitting a REST endpoint that uses an X-Auth-Token header using an API account with OAuth scopes that allow the actions you want the Auth header request to do.

```http title="Example request for a limited-use Authentication header token"
METHOD https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/some-token-generating-endpoint
X-Auth-Token: {{access_token}} # the OAuth scopes of this access token allow the stuff you want to do with the limited-use token
Accept: ...

... # request body, if any

```
&nbsp;
```json title="Example response with limited-use token"
{
  // ... other response object properties
  "someTokenKey": "0123456789abcdef" // the token datatype and the name of the token property vary
}
```

1. The second step varies based on the endpoint



### GraphQL APIs

You can use a store management OAuth API account to request JWT-style bearer tokens to authenticate your GraphQL queries. Pass the string `Bearer {{token}}` as the `Authorization` header of the query you want to authenticate.

??use stencil or REST endpoint to get a token.??

For more details, see [GraphQL API Authentication](/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication) and [Obtaining Store API Credentials](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).

All requests to our GraphQL APIs are POST requests.

```js title="Example GraphQL authentication header"
POST
Authorization: Bearer {{generated_jwt}}
Content-Type: application/json
```


### Payment Processing API


### Customer Login API
<!-- access point URL with JWT as path parameter -->

The Customer Login API facilitates alternative sign-in methods by letting your app generate JWTs that authenticate customers to BigCommerce's servers. Create an app OAuth API account to use the Customer Login API for single sign-on.

```http title="Form of request to Customer Login API"
# direct browser to this URL
GET https://store.example.com/login/token/{{jwt_that_your_app_generated}}
```

For OAuth scope and implementation details, consult [Customer Login API](/api-docs/storefront/customer-login-api) and [SSO API Reference](/api-reference/storefront/customer-login-sso).

### Current Customer API

The Current Customer API enables your app or script to request BigCommerce-generated JWTs that will confirm a customer's identity and logged-in status.
Create an app OAuth API account to use the Current Customer API. 

For OAuth scope and implementation details, consult [Current Customer API](/api-docs/storefront/current-customer-api) and [Get Current Customer](/api-reference/storefront/current-customers/current-customers/getcurrentcustomer).

## Class II: GraphQL APIs

GraphQL API queries use JWT-style bearer tokens to authenticate. Consult the REST token generation endpoint that corresponds to your GraphQL use case to determine the required OAuth scope before you create a store management OAuth API account to request JWTs for your GraphQL queries. Pass the bearer token in the header of the query you want to authenticate. 

For more details, see [GraphQL API Authentication](/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication) and [Obtaining Store API Credentials](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).

```http title="GraphQL authentication header"
Authorization: Bearer {{generated_jwt}}
```

## Class III: App-specific APIs

Apps add novel ways of using BigCommerce store data and can connect third-party services to merchant stores. Apps can use store management REST APIs in addition to the following app-specific APIs. Apps authenticate with access tokens that they generate during installation or in response to app configuration changes. 

Create an app OAuth API account to enable your app to request and manage BigCommerce-generated access tokens on behalf of merchant stores. 

You can change the scope of an app OAuth API account at any time. When you modify the OAuth scope, BigCommerce will invalidate the API account's existing access tokens. To facilitate generating new access tokens, BigCommerce will prompt your users to reauthorize the app so that they can accept the new OAuth scope.



```http title="App authentication header for store management APIs"
X-Auth-Token: {{grant_code_generated_access_token}}
```


## Class IV: Payment Processing API

The Payment Processing API uses a unique authentication.

For OAuth scope and implementation details, consult the[Payments API](/api-docs/store-management/payment-processing) article and the API reference for [Create a payment access token](/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost) and [Process a payment](/api-reference/store-management/payment-processing/process-payment/paymentspost).

## Class V: Storefront REST APIs
### Customer Login API



### Current Customer API



## Unauthenticated endpoints: the Storefront APIs

The Storefront APIs allow you to make client-side requests for carts, checkouts, and orders using JavaScript or an alternative language that compiles to run in the browser. They are a convenience collection of operations that affect one customer at a time. These endpoints are unauthenticated and may be low-risk for your store's use case. You can perform authenticated versions of the same operations using GraphQL or the Store Management REST APIs.



## Resources

### Related articles
* [Creating API Accounts](/api-docs/getting-started/authentication/rest-api-authentication)
* [OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes)

### Outside reading
* [OAuth 2.0 Simplified (oauth.net)](https://oauth.net/getting-started/)
* [What the Heck is OAuth (Okta)](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)
* [An Introduction to OAuth 2 (Digital Ocean)](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
* [RFC6749 Standard (IETF)](https://tools.ietf.org/html/rfc6749)
