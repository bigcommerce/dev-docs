# Authentication

BigCommerce offers a suite of APIs that let you manage store data, sign customers in, make client-side queries for product information, and write apps that integrate third-party services into store operations.

Although each class of APIs configures authentication differently, all BigCommerce authentication credentials have their roots in the OAuth2.0 standard.

## Class I: Store Management REST APIs

BigCommerce's Store Management REST APIs use OAuth API account access tokens to authenticate requests. Create a store management OAuth API account to generate and manage access tokens, and pass the access token in the header of the request you want to authenticate.

For more details, see [Obtaining Store API Credentials](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).

```http title="Store management REST authentication header"
X-Auth-Token: {{access_token}}
```

<!-- theme: info -->
> Legacy API accounts used HTTP basic authentication. They are no longer available to new stores. [Learn more about migrating](/api-docs/getting-started/authentication/rest-api-authentication#migrating-from-legacy-to-oauth). 

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

For more on working with apps, see our [Guide to Building Apps](/api-docs/apps/guide/intro). The sections on [Implementing OAuth](/api-docs/apps/guide/auth) and [Callback Handlers](/api-docs/apps/guide/callbacks) are particularly relevant to generating access tokens.

```http title="App authentication header for store management APIs"
X-Auth-Token: {{grant_code_generated_access_token}}
```

### Shipping Provider API

The Shipping Provider API connects a shipping service to stores and supports a range of shipping-related actions, such as custom rate table calculations. You must create or work within an app to use the Shipping Provider API. Create an app OAuth API account to use it.

Learn more about working with the [Shipping Provider API](/api-docs/providers/shipping).

```http title="App authentication header for the Shipping Provider API"
X-Auth-Token: {{grant_code_generated_access_token}}
```

### Tax Provider API

The Tax Provider API connects tax calculation and filing services to stores. You must create or work within an app to use the Tax Provider API. Create an app OAuth API account to use it.

Learn more about working with the [Tax Provider API](/api-docs/providers/tax).

```http title="App authentication header for the Tax Provider API"
X-Auth-Token: {{grant_code_generated_access_token}}
```

## Class IV: Payment Processing API

The Payment Processing API uses a unique authentication.

For OAuth scope and implementation details, consult the[Payments API](/api-docs/store-management/payment-processing) article and the API reference for [Create a payment access token](/api-reference/store-management/payment-processing/access-tokens/paymentsaccesstokenspost) and [Process a payment](/api-reference/store-management/payment-processing/process-payment/paymentspost).

## Class V: Storefront REST APIs
### Customer Login API

The Customer Login API facilitates alternative sign-in methods by letting your app generate JWTs that authenticate customers to BigCommerce's servers. Create an app OAuth API account to use the Customer Login API for single sign-on.

For OAuth scope and implementation details, consult [Customer Login API](/api-docs/storefront/customer-login-api) and [SSO API Reference](/api-reference/storefront/customer-login-sso).

### Current Customer API

The Current Customer API enables your app or script to request BigCommerce-generated JWTs that will confirm a customer's identity and logged-in status.
Create an app OAuth API account to use the Current Customer API. 

For OAuth scope and implementation details, consult [Current Customer API](/api-docs/storefront/current-customer-api) and [Get Current Customer](/api-reference/storefront/current-customers/current-customers/getcurrentcustomer).

### Unauthenticated Storefront API endpoints

The Storefront API allows you to make client-side requests for carts, checkouts, and orders using JavaScript or an alternative language that compiles to run in the browser. It's a convenience collection of operations that affect one customer at a time. These endpoints are unauthenticated and may be low-risk for your store's use case. You can perform authenticated versions of the same operations using GraphQL or the Store Management REST APIs.



## Resources

### Related articles
* [Creating API Accounts](/api-docs/getting-started/authentication/rest-api-authentication)
* [OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes)

### Outside reading
* [OAuth 2.0 Simplified (oauth.net)](https://oauth.net/getting-started/)
* [What the Heck is OAuth (Okta)](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)
* [An Introduction to OAuth 2 (Digital Ocean)](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
* [RFC6749 Standard (IETF)](https://tools.ietf.org/html/rfc6749)
