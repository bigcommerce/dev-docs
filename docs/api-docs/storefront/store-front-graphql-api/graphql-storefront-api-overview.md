# GraphQL Storefront API Overview

<div class="otp" id="no-index">

### On this Page

- [Accessing the GraphQL Playground](#accessing-the-graphql-playground)
- [Using the GraphQL Playground](#using-the-graphql-playground)
- [Authentication](#authentication)
- [Making GraphQL Queries within a Stencil Theme](#making-graphql-queries-within-a-stencil-theme)
- [Section6](#section6)
- [Section7](#section7)
- [Section8](#section8)
- [Section9](#section9)
- [Section10](#section10)
- [Section11](#section11)
- [Section12](#section12)

</div>

The GraphQL Storefront API enables you to freely query storefront data on top of the BigCommerce Stencil theming framework. This means that you can use frontend JavaScript to access the same information you previously had to write as template logic. For example, you can:

Access Product Option details about any product from any page
Ask for details about particular product variations based on option values or variant IDs
Request a product’s custom fields
Request any of a product’s images, at any resolution
Ask for details about a Customer, such as their name, email address, and Customer Attributes
Look up an object by its URL, and fetch information about it
Build frontend applications on top of Stencil or externally

The Storefront API will always return information from the perspective of a storefront shopper - so if you’re not logged in to the storefront, you’ll get the same information that would be accessible to a guest shopper on the storefront - product availability, pricing, etc - and no Customer-specific information will be available.

Once you log in as a particular Customer, you’ll be able to access details about that Customer, and the information that is returned on other nodes (such as Product or Category information, or pricing) will reflect the correct information for that Customer.

Due to our use of GraphQL, you can request information from many different resources in a single API call, which drastically simplifies integration. We’ve also put special emphasis on the performance of the API to make sure you can build pleasurable shopper experiences.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

> The GraphQL Storefront API is currently in Beta

</div>
</div>
</div>

---

<a id="sectionId" class="devdocsAnchor"></a>

## Accessing the GraphQL Playground

>TODO: Add passage about what the playground is 

To access the GraphQL Storefront API playground and documentation:

1. Log into the BigCommerce store enrolled in the beta
2. Navigate to **Advanced Settings** > **Storefront Playground**

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

> If the **Storefront Playground** link is not visible, the store is not enrolled in the GraphQL Storefront API Open Beta. To enroll, contact support (we're only accepting sandbox stores at this time, however).

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

## Authentication

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Making GraphQL Queries within a Stencil Theme

You can invoke the API directly from within a Stencil theme or a Script in the Script Manager. Here’s a few ways:
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

## Section6 

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Section7

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Section8

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Section9

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Section10

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Section11

content

---

<a id="sectionId" class="devdocsAnchor"></a>

## Section12

content  