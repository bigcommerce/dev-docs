# BigCommerce APIs Quick Start


This quick start guide will take you through making your first requests with BigCommerce's APIs.

## Store Management REST APIs

To get started making requests to our REST APIs, consult the [API Reference](/api-reference) to determine the OAuth scopes, or sets of permissions, that the endpoints you want to work with require. Then [create an API account](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials) with those scopes.  

There are many ways to make API requests during the development process. The following sections list some options.

### Built-in Request Runner

You can experiment with BigCommerce REST APIs using the built-in **Request Runner** on the [API Reference](/api-reference/store-management/catalog/products/getproducts) page for each endpoint.

To make a request, copy and paste the parameters and any `access_token` the endpoint requires into the Request Runner form in the page's right sidebar, then click **Send API Request**.

### VS Code REST Client extension

If you use [Visual Studio Code](https://code.visualstudio.com/), you can make API requests with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension. Once you have it installed, create a new file called `bigcommerce.http`. You can declare request variables and list multiple requests in this file, provided they are separated by the `###` delimiter.

```http title="Example VS Code REST Client configuration"
@ACCESS_TOKEN = your_access_token
@STORE_HASH = your_store_hash

###

GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

###

GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/currencies
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

###

...

```

After you save the file, a **Send Request** link will appear above each request. Click **Send Request** above the request you want to make.

### Postman with imported API spec files

You can import many of our API Specification Files into [Postman](https://www.getpostman.com/) (or any other tool that can import [Open API Specification](https://swagger.io/specification/) files) to try out endpoints and view responses.

To view sample JSON request bodies for each REST API resource, see the [API Reference](/api-reference) for that resource.

## Storefront REST APIs

To make your first requests in a browser with the Storefront APIs, see the step-by-step tutorial [Working with Storefront Cart and Checkout APIs](/api-docs/cart-and-checkout/working-sf-apis).

## Storefront GraphQL API

To start working with the GraphQL API, consult the [GraphQL Storefront API Overview](/api-docs/storefront/graphql/graphql-storefront-api-overview).

## Customer Login API
The Customer Login API is a Server-to-Server API, which means to make requests against it, you will need a backend service. To view a sample request, see sample code within our [PHP client](https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421).
