# GraphQL Storefront API Overview

<div class="otp" id="no-index">

### On this Page

- [Authentication](#authentication)
- [Querying Within a BigCommerce Storefront](#querying-within-a-bigcommerce-storefront)
- [Accessing the GraphQL Playground](#accessing-the-graphql-playground)
- [Using the GraphQL Playground](#using-the-graphql-playground)
- [Complexity Limits](#complexity-limits)
- [See it in Action](#see-it-in-action)
- [Resources](#resources)

</div>

BigCommerce's GraphQL Storefront API makes it possible to query storefront data from from within a [Stencil](https://devcenter-production.docs.stoplight.io/stencil-docs/getting-started/about-stencil) theme or remote site. This means information previously only available on the back-end via [Stencil's template logic](https://devcenter-production.docs.stoplight.io/stencil-docs/reference-docs/global-objects-and-properties) can now be accessed via front-end javascript. For example, with the Storefront API, it is possible to:

* Access product options, variations, and custom fields for any product from any page
* Request any product's images at any resolution
* Ask for customer details such as name, email address, and attributes (if logged in)
* Look up objects (e.g. categories or brands) by URL, and fetch their details
* Build front-end applications on top of a BigCommerce [Stencil](https://devcenter-production.docs.stoplight.io/stencil-docs/getting-started/about-stencil) theme or on a remote site

Additionally, by leveraging the power of [GraphQL](https://graphql.org/), data for multiple resources can be returned from a single API call, which simplifies integration and increases performance so that developers can focus on building delightful shopper experiences.

This article is a general overview of the capabilities and usage of BigCommerce's GraphQL Storefront API; it includes sections on authentication and how to access a store's GraphQL Playground. To see specific examples of how GraphQL can be used to query storefront data, see [GraphQL Storefront API Code Samples](https://developer-beta.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-samples).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Note

> * GraphQL Storefront API is in beta
> * BigCommerce legacy Blueprint themes currently do not support the GraphQL API and Playground

</div>
</div>
</div>

<a id="authentication" class="devdocsAnchor"></a>

## Authentication

GraphQL Storefront API requests are authenticated with tokens sent via the HTTP `Authorization` header:

```bash
curl 'https://www.{bigcommerce_storefront_domain}.com/graphql'\
  # ...
  -H 'Authorization: Bearer {token}'\
  # ...
```

### Creating a Token

JWT tokens for authenticating cross-origin requests to the Storefront API can be created using the [Storefront API Token endpoint](https://developer.bigcommerce.com/api-reference/storefront/storefront-token-api/api-token/createtoken):

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

**Response:**

```json
{
  "token":"...eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9...",
  "meta": {
    // ...
  }
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
<!-- theme: warning -->

### Authenticating with a Stencil Simple Token
Client code in BigCommerce Stencil themes can be passed a token at render time with the `{{settings.storefront_api.token}}` handlebars object:

```html
<script>
fetch('/graphql', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer {{settings.storefront_api.token}}'
       },
       body: JSON.stringify({
           query: `
            query MyFirstQuery {...}
  `
// ...
</script>
```

### Note
> * `1` can be passed in for the `channel_id` for generating tokens for use on the storefront itself.
> * `1` is currently the only accepted `channel_id`.
> * To create a channel for a remote site, see [Create Channel].(https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) in the API Reference.
> * `allowed_cors_origins` array accepts only a single origin currently -- one token must be generated for each origin.
> * `/storefront/api-token` endpoint requires the `Manage` `Storefront API Tokens` OAuth Scope.
> * `storefront/api-token-customer-impersonation` endpoint requires the `Manage` `Storefront API Customer Impersonation Tokens` OAuth Scope.

</div> 
</div>
</div>

### Customer Impersonation Tokens

Its also possible to generate tokens for use in server-to-server interactions with a trusted consumer by POSTing to the [API Token Customer Impersonation Endpoint](https://developer.bigcommerce.com/api-reference/storefront/storefront-token-api/api-token-customer-impersonation/createtokenwithcustomerimpersonation) with the `X-Bc-Customer-Id` header set to the customer's ID:

**`POST`** `https://api.bigcommerce.com/stores/{store_id}/v3/storefront/api-token-customer-impersonation`

```json
{
  "channel_id": 1,
  "expires_at": 1602288000
}
```

**Response**:

```json
{
  "data":
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  "meta": {}
}
```

Customer Impersonation Token authenticated requests made to the GraphQL API receive store information from the perspective of the customer corresponding to the customer ID specified in the `X-Bc-Customer-Id` header used to create the token -- for example: pricing, product availability, customer account, and customer details.


<a id="querying-within-a-bigcommerce-storefront" class="devdocsAnchor"></a>

## Querying Within a BigCommerce Storefront

GraphQL Storefront API calls can be made directly from within a Stencil theme or a from a script in [Storefront > Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager).

Here's an an example request using the  `{{settings.storefront_api.token}}` handlebars object and [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```html
<script>
   fetch('/graphql', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer {{ settings.storefront_api.token }}'
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
</script>
```

In addition to using `fetch()`, there's a other ways to query the API:
1. **Using [Apollo Client](https://www.apollographql.com/docs/react/)** - Apollo is a popular GraphQL client that's easy to use in BigCommerce themes. For a a quick example of adding Apollo Client to cornerstone, checkout this [Cornerstone commit](https://github.com/bigcommerce/cornerstone/commit/508feeb1b00d2bb2940771e5e91250a08b6be4d9) on GitHub.
2. **Using any GraphQL Client** - GraphQL is standard with client libraries in many languages, so feel free to explore your options. The focus of the beta is on using the API from frontend JavaScript within Stencil; however, in the future, the API will also be opened up for server-to-server requests.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Note

> * If pasted directly into a script in [**Storefront** > **Script Manager**](https://support.bigcommerce.com/s/article/Using-Script-Manager), the output from `console.log(json)` will be viewable in the browser's Javascript Console.
> * The above code must be used in a place where the `{{settings.storefront_api.token}}` handlebars variable can be accessed in order to get credentials for the API request.

</div>
</div>
</div>

<a id="accessing-the-graphql-playground" class="devdocsAnchor"></a>

## Accessing the GraphQL Playground

To access the GraphQL Storefront API Playground<sup>1</sup> and documentation:

1. Login to a BigCommerce store enrolled in the beta
2. Navigate to **Advanced Settings** > **Storefront API Playground**<sup>2</sup>

The GraphQL Storefront API Playground will be opened:

![GraphQL Storefront API Playground](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-storefront-api-playground.png "GraphQL Storefront API Playground")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Note

> 1. GraphQL Playground is a GraphQL IDE built on Electron. For more information, see [GraphQL Playground](https://electronjs.org/apps/graphql-playground) on [electrongjs.org](https://electronjs.org)

> 2. If the **Storefront API Playground** link is not visible, the store is not enrolled in the Beta program. To enroll, [contact support](https://support.bigcommerce.com/SubmitCase) (all stores using Stencil are now eligible).

</div> 
</div>
</div>

<a id="using-the-graphql-playground" class="devdocsAnchor"></a>

## Using the GraphQL Playground

To use the request runner, input queries on the left side and then click the play button. Query results will be displayed on the the right side:

![GraphQL Playground Query](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-storefront-api-playground2.png "GraphQL Playground Query")

Here's a sample Query to get you started:

```javascript
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
```

To explore the storefront GraphQL schema, checkout the Docs and Schema tabs on the right:

![GraphQL Playground Docs](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-playground-docs.png "GraphQL Playground Docs")

Click changelog in the top right to view a list of recent changes to the storefront API:

![GraphQL Playground Changelog](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-playground-changelog.png "GraphQL Playground Changelog")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * The changelog is updated with each deployment. 
> * Additive Changes are possible during beta, so we recommend checking for changes frequently

</div> 
</div>
</div>

<a id="complexity-limits" class="devdocsAnchor"></a>

## Complexity Limits

The GraphQL Storefront API uses an algorithm to calculate a complexity score for queries made against the API. Queries that exceed the complexity score will receive an error response:

```json
{
  "error": {
    "error": "The query is too complex as it has a complexity score of 1223 out of 1000. Please remove some elements and try again"
  }
}
```

The complexity limit error is usually caused by queries for a large quantity of deeply nested objects, for example, this query for first 50 products and their prices, variants, options, and option values: 

```js
query {
  site {
    products(first:50) {
      edges {
        node {
          name
          prices {
            price {
              value
              currencyCode
            }
            retailPrice {
              value
              currencyCode
            }
          }
          variants {
            edges {
              node {
                entityId
                depth {
                  value
                  unit
                }
                sku
              }
            }
          }
          options {
            edges {
              node {
                displayName
                values {
                  edges {
                    node {
                      label
                      entityId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
} 
```

The complexity of this query is easily reduced by changing the number of products queried from `first:50` to `first:10`: 

```js
query {
  site {
    products(first:10) { // <--- reducing quantity requested reduces complexity score
      // ...
```

In general, to reduce complexity, reduce the number of objects requested: 
* limit collections to a smaller page size (for example `first:10` instead of `first:50`)
* reduce the number of items in nested collections
* request less fields

<a id="see-it-in-action" class="devdocsAnchor"></a>

## See it in Action

To see the GraphQL storefront API in action, checkout the [Bootstrap + Vanilla JS Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) hosted on GitHub. This example shows how a static HTML site can be used to render dynamic product information via the GraphQL Storefront API.

Simply open the link and click submit with the sample data in the form. To see the example page with your store's data, [create a Storefront API Token](https://developer.bigcommerce.com/api-reference/storefront/storefront-token-api/api-token/createtoken) against your store and paste the token into the example form (be sure to create a token valid for this origin: `https://bigcommerce.github.io`).

For a full list of examples, see the [Storefront API Examples repo](https://github.com/bigcommerce/storefront-api-examples).

## Resources

### Examples
* [Bootstrap + Vanilla JS Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) (bigcommerce.github.io)
* [All BigCommerce Storefront API Examples](https://github.com/bigcommerce/storefront-api-examples) (github.com)
* [GraphQL Storefront API Community Group](https://support.bigcommerce.com/s/group/0F91B000000bo3TSAQ/storefront-api-beta) (support.bigcommerce.com)

### Pull Requests
* [Simple GraphQL Example Using Apollo Client with Cornerstone](https://github.com/bigcommerce/cornerstone/compare/graphQL-example)

### Additional Resources
* [GraphQL Cheat Sheet](https://devhints.io/graphql) (devhints.io)
* [GraphQL IDE](https://github.com/andev-software/graphql-ide) (github.com)
* [GraphQL Playground](https://www.npmjs.com/package/graphql-playground-react) (npmjs.com)