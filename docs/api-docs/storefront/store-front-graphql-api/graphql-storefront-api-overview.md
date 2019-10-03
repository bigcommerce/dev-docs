# GraphQL Storefront API Overview

<div class="otp" id="no-index">

### On this Page

- [See it in Action](#see-it-in-action)
- [Accessing the GraphQL Playground](#accessing-the-graphql-playground)
- [Using the GraphQL Playground](#using-the-graphql-playground)
- [Storefront API Authentication](#storefront-api-authentication)
- [Querying from a Stencil Theme](#querying-from-a-stencil-theme)
- [Querying from a Remote Site](#querying-from-a-remote-site)
- [Resources](#resources)

</div>

BigCommerce's GraphQL Storefront API makes it possible to query storefront data from from within a [Stencil](https://devcenter-production.docs.stoplight.io/stencil-docs/getting-started/about-stencil) theme or remote site. This means information previously only available on the back-end via [Stencil's template logic](https://devcenter-production.docs.stoplight.io/stencil-docs/reference-docs/global-objects-and-properties) can now be accessed via front-end javascript. For example, with the Storefront API, it is possible to:

* Access product options, variations, and custom fields for any product from any page
* Request any product's images at any resolution
* Ask for customer details such as name, email address, and attributes (if logged in)
* Look up objects (e.g. categories or brands) by URL, and fetch their details
* Build front-end applications on top of a BigCommerce [Stencil](https://devcenter-production.docs.stoplight.io/stencil-docs/getting-started/about-stencil) theme or on a remote site

Additionally, by leveraging the power of [GraphQL](https://graphql.org/), data for multiple resources can be returned from a single API call, which simplifies integration and increases performance so that developers can focus on building delightful shopper experiences.

This article is a general overview of the capabilities and usage of BigCommerce's GraphQL Storefront API; it includes sections on authentication and how to access a store's GraphQL Playground. To see specific examples of how GraphQL can be used to query storefront data, see [GraphQL Storefront API Code Samples](https://developer.bigcommerce.com/api-docs/storefront/graphql-api/graphql-code-samples).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Note

> * The GraphQL Storefront API is currently in open beta and only sandbox stores are being accepted into the program at this time
> * This API officially supports only Stencil themes at this time.

### Theme Support

>

</div>
</div>
</div>

---

<a id="sectionId" class="devdocsAnchor"></a>

## See it in Action

To see the GraphQL storefront API in action, checkout the [Bootstrap + Vanilla JS Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) hosted on GitHub -- This example shows how a static HTML site can be used to render dynamic product information via the GraphQL Storefront API.

Simply open the link and click submit with the sample data in the form. To see the example page with your store's data, [create a Storefront API Token](https://developer.bigcommerce.com/api-reference/storefront/storefront-token-api/storefront-api-auth/createtoken) against your store and paste the token into the example form (be sure to create a token valid for this origin: `https://bigcommerce.github.io`).

For a full list of examples, see the [Storefront API Examples repo](https://github.com/bigcommerce/storefront-api-examples).

---

<a id="sectionId" class="devdocsAnchor"></a>

## Accessing the GraphQL Playground

>TODO: Add passage about what the playground is https://electronjs.org/apps/graphql-playground

To access the GraphQL Storefront API Playground and documentation:

1. Log into a BigCommerce store enrolled in the beta
2. Navigate to **Advanced Settings** > **Storefront Playground**

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

> If the **Storefront Playground** link is not visible, the store is not enrolled in the GraphQL Storefront API Open Beta. To enroll, contact support (only sandbox stores are accepted at this time, however).

</div>
</div>
</div>

>TODO: Add url https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/img/

The GraphQL Storefront API Playground will be opened:

![GraphQL Storefront API Playground](/assets/img/graphql-storefront-api-playground.png "GraphQL Storefront API Playground")

---

<a id="sectionId" class="devdocsAnchor"></a>

## Using the GraphQL Playground

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

```


---

<a id="sectionId" class="devdocsAnchor"></a>

## Storefront API Authentication

* overview of authentication methods and use cases
* How to add token to stencil context
* how to authenticate from a remote site using the auth token endpoint

---

<a id="sectionId" class="devdocsAnchor"></a>

## Querying from a Stencil Theme

You can invoke the API directly from within a Stencil theme or a script in the [Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager). There's a few way to do so:
1. Using [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
2. Using the Apollo Client
3. Using any GraphQL Client

`{{ settings.storefront_api.token }}`

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


---

<a id="sectionId" class="devdocsAnchor"></a>

## Querying from a Remote Site

content

---

<a id="sectionId" class="devdocsAnchor"></a>

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