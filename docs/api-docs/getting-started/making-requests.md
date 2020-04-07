# BigCommerce APIs Quick Start

<div class="otp" id="no-index">

### On This Page
- [REST API](#rest-api)
- [Storefront API Quick Start](#storefront-api-quick-start)
- [GraphQL API](#graphql-api)
- [Customer Login API](#customer-login-api)

</div>

This Quick Start Guide will take you through making your first requests with BigCommerce's APIs.

## REST API 

### Obtain API Credentials

See [Authenticating BigCommerce's Rest APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials) for instructions on obtaining store API credentials.

### Use Request Runner

The easiest way to experiment with BigCommerce REST APIs is via the built-in **Request Runner**:

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts#requestrunner)

Just copy and paste your `store_hash`, `client_id` ID, and `access_token` into the form, then click **Send**

### Visual Studio Code REST Client

If you use **Visual Studio Code**, another simple way to make API requests is with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension. Once you have it installed, create a new file called `bigcommerce.http` and paste in the following:

```http
@ACCESS_TOKEN = your_access_token
@CLIENT_ID = your_client_id
@STORE_HASH = your_store_hash

###

GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

Save and you'll see the **send request** link above `GET`. Click **send request** and the response will open in a split window.

### Import API Spec File with Postman

Alternatively, you can import the [Specification File](https://developer.bigcommerce.com/api-reference/store-management/catalog/BigCommerce_Catalog_API.oas2.json) into [Postman](https://www.getpostman.com/) (or any other tool that can import [Open API Specification](https://swagger.io/specification/) files).

To view sample JSON request bodies for each REST API resource, see the [API Reference](https://developer.bigcommerce.com/api-reference) for that resource.

## Storefront API Quick Start

To make your first requests in a browser with the Storefront APIs, see the step-by-step tutorial [Working with Storefront Cart and Checkout APIs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/working-sf-apis)

## GraphQL API 

### Obtain Storefront Token
We'll use [Postman](https://www.getpostman.com/) for making an initial request to obtain a Storefront API token. It is a REST API request, so you will need [API credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials).

**`POST`** `https://api.bigcommerce.com/stores/{store_hash}/v3/storefront/api-token`

```javascript
{
  "channel_id": 1,            // int (only ID 1 currently accepted)
  "expires_at": 1602288000,   // double utc unix timestamp (required)
  "allowed_cors_origins": [   // array (accepts 1 origin currently)
    "https://example.com"
  ]  
}
```

### Create Sample Request in the browser
Open your browser and navigate to the integrated JavaScript console, for example [Google Chrome's Console](https://developers.google.com/web/tools/chrome-devtools/console). Use it to run the following code after entering your API token:

```javacsript
fetch('/graphql', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer your-api-token '
       },
       body: JSON.stringify({
           query: `
            query MyFirstQuery {
            site {
                settings {
                storeName
                }
                products {
                edges {
                    node {
                      name
                      sku
                      prices {
                        retailPrice {
                          value
                          currencyCode
                        }
                        price {
                          value
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
            `
       }),
   })
   .then(res => res.json())
   .then(json => console.log(json));
```

## Customer Login API
The Customer Login API is a server-to-server API, meaning you will need to make the request from a backend service. To view a sample request using the customer login API, see our [PHP client](
https://github.com/bigcommerce/bigcommerce-api-php/blob/master/src/Bigcommerce/Api/Client.php#L421)

