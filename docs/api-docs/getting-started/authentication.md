# Authentication

<div class="otp" id="no-index">

- [Server-to-Server API](#server-to-server-api)
- [Storefront API](#storefront-api)
- [GraphQL Storefront API](#graphql-storefront-api)
- [Customer Login API](#customer-login-api)
- [Current Customer API](#current-customer-api)
</div>

BigCommerce has five different APIs that let you manage store data, log in customers, make client-side queries for product information, and more. Each requires a different method for authentication.

## Server-to-Server API

Requests to BigCommerce's Server-to-Server API require both an OAuth Client ID and Access Token be passed in the header. See [Obtaining Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authenticating-s2s-api#obtaining-store-api-credentials) for instructions on generating these credentials.

## Storefront API
The Storefront API is unauthenticated, allowing you to make client-side requests for carts, checkouts and orders using Javascript. 

## GraphQL Storefront API
There are two ways to authenticate with the GraphQL API:
1. Via a [Storefront API token](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-api-token/api-token/createtoken) passed in your request’s header
2. Passing a Simple Token from within a Stencil theme in your request’s header

For more details, see [GraphQL API Authentication](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication).

## Customer Login API

The Customer Login API requires authentication via a [JWT token](https://jwt.io/) and your app's OAuth Client ID.

For details, see [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api).

## Current Customer API

Your application’s Client ID must be included in the request to the Current Customer API to receive a response. For details, see [Current Customer API](https://developer.bigcommerce.com/api-docs/customers/current-customer-api).