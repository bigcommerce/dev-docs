# BigCommerce APIs Quick Start



This quick start guide will take you through making your first requests with BigCommerce's APIs.

## REST API

### Create API credentials

See the [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication#creating-store-level-api-accounts) for instructions on creating store-level API accounts.

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

## GraphQL API

### Create storefront token
You can use **Request Runner** to create a Storefront API token. 

Make a `POST` request to the [Create a token](/api-reference/store-management/tokens/api-token/createtoken) endpoint, and include the URL of the storefront on which you'll use the token in the `allowed_cors_origin` array.

It is a REST API request, so you will need to copy and paste your [store-level API account access_token](/api-docs/getting-started/authentication/rest-api-authentication#creating-store-level-api-accounts) in the `X-Auth-Token` field.

```http title="Example request: Create a token" lineNumbers
POST https://api.bigcommerce.com/stores/{store_hash}/v3/storefront/api-token
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

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

```javacsript
   fetch('/graphql', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer token`},
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

            }),
      })
      .then(res => res.json())
      .then(res => res.data);

```

## Customer Login API
The Customer Login API is a Server-to-Server API, which means to make requests against it, you will need a backend service. To view a sample request, see sample code within our [PHP client](
https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421).

