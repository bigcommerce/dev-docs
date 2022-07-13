# BigCommerce APIs Quick Start

This quick start guide will take you through making your first requests with BigCommerce's APIs.

## REST API

### Obtain API credentials

See [Authenticating BigCommerce's Rest APIs](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials) for instructions on obtaining store API credentials.

### Use Request Runner

The easiest way to experiment with BigCommerce REST APIs is via the built-in **Request Runner**:

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/catalog/catalog-api/products/getproducts#requestrunner) -->

Just copy and paste your `store_hash` and `access_token` into the form, then click **Send**.

### Visual Studio Code REST Client

If you use **Visual Studio Code**, another way to make API requests is with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension. Once you have it installed, create a new file called `bigcommerce.http` and paste in the following:

```http
@ACCESS_TOKEN = your_access_token
@STORE_HASH = your_store_hash

###

GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

Save and you'll see the **send request** link above `GET`. Click **send request** and the response will open in a split window.

### Import API spec file with Postman

You can import many of our API Specification Files into [Postman](https://www.getpostman.com/) (or any other tool that can import [Open API Specification](https://swagger.io/specification/) files) to try out endpoints and view responses.

To view sample JSON request bodies for each REST API resource, see the [API Reference](/api-reference) for that resource.

## Storefront API quick start

To make your first requests in a browser with the Storefront APIs, see the step-by-step tutorial [Working with Storefront Cart and Checkout APIs](/api-docs/cart-and-checkout/working-sf-apis).

## GraphQL Storefront API

For more about authenticating the GraphQL Storefront API, see 



### Obtain a Storefront token
The request to obtain a GraphQL Storefront token uses a REST endpoint.

You can use any of the preceding REST API clients to obtain the token.  

Use a store API account [access token](/api-docs/getting-started/authentication/rest-api-authentication#api-accounts). 

For example request headers, see [X-Auth-Token header example requests](/api-docs/getting-started/authentication#x-auth-token-header-example-requests). 

For example request bodies, see [Create a token](/api-reference/storefront/graphql-api-tokens/api-token/createtoken).

For a description... >>>



Include the URL of the storefront you will be making the request from as the `allowed_cors_origin`.

**`POST`** `https://api.bigcommerce.com/stores/{store_hash}/v3/storefront/api-token`

```javascript title="" lineNumbers
{
  "channel_id": 1,            // int (only ID 1 currently accepted)
  "expires_at": 1602288000,   // double utc unix timestamp (required)
  "allowed_cors_origins": [   // array (accepts 1 origin currently)
    "https://example.com"
  ]
}
```

### Create sample request in the browser
While viewing your storefront in a browser, navigate to the integrated JavaScript console; for example, [Google Chrome's Console](https://developers.google.com/web/tools/chrome-devtools/console). Use it to run the following code after entering your API token in the authorization header, and adding a valid [Product ID](/api-reference/catalog/catalog-api/products/getproductbyid) for the `entityId`:

```javascript title="Sample GraphQL request" lineNumbers
  fetch('/graphql', {
  method: 'POST',
  mode: 'cors',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer token`
  },
  body: JSON.stringify({
      query: `
      query SingleProduct {
        site {
          products (entityIds: product ID) {
            edges {
              node {
                id
                entityId
                name
                prices {
                  price {
                    value
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }`
    })
  })
  .then(res => res.json())
  .then(res => console.log(res.data))
  .catch(err => console.log(error));

```

## Customer Login API
You need an [app API account](>>>) to make requests to the [Customer Login API](/api-docs/storefront/customer-login-api). Successful requests to this API send JSON web tokens, or JWTs. To view a sample request, see our article on [Authentication](>>>#user-generated-jwts).

