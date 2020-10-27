# Authentication

<div class="otp" id="no-index">

### On this page
- [REST APIs](#rest-apis)
- [Storefront API](#storefront-api)
- [GraphQL Storefront API](#graphql-storefront-api)
- [Customer Login API](#customer-login-api)
- [Current Customer API](#current-customer-api)
</div>

BigCommerce has five different APIs that let you manage store data, log in customers, make client-side queries for product information, and more. Each requires a different authentication method.

## REST APIs

Requests to BigCommerce's V2 and V3 REST APIs require you to pass an access token in the header. For instructions on generating this credential, see [Obtaining Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials).

## Storefront API
The Storefront API is unauthenticated, allowing you to make client-side requests for carts, checkouts, and orders using JavaScript. 


## GraphQL Storefront API
There are two ways to authenticate with the GraphQL API:
1. Via a [Storefront API token](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-api-token/api-token/createtoken) passed in your request's header.
2. Passing a token from within a Stencil theme in your request's header.

For more details, see [GraphQL API Authentication](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication).

## Customer Login API

The Customer Login API requires authentication via a [JWT token](https://jwt.io/) and your app's OAuth client ID.

For details, see [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

## Current Customer API

Your application's client ID must be included in the Current Customer API request to receive a response. For details, see [Current Customer API](https://developer.bigcommerce.com/api-docs/customers/current-customer-api).
