# About Our APIs

The BigCommerce suite of APIs empowers you to create apps, automate store processes, and build headless ecommerce solutions. You can manage store data, authenticate customers, make client-side queries for product information, and more.

If you're new to building BigCommerce apps, we recommend that you start by exploring the [App Marketplace](https://www.bigcommerce.com/apps/) to get a feel for what's possible. When you want to get started experimenting with our APIs, check out the [API Request Quick Start](/api-docs/getting-started/basics/making-requests). 

The following APIs are currently available.

## REST Store Management APIs (V2 & V3)
BigCommerce's REST APIs (for example, the [Catalog API](/api-reference/catalog/catalog-api)) allow you to manage store data and take actions that mimic store administrator activity. Some example uses of the REST APIs are:
* Add and update products in a store
* Update a customer's order and change the order status
* Create a coupon
* Manage a customer's store account details

The [REST Storefront API](/api-reference/cart-checkout/storefront-cart-api) allows you to manage customer carts checkouts and order information client-side. Some use cases for this API are:
## REST Storefront API
The [REST Storefront API](/api-reference/cart-checkout/storefront-cart-api) allows you to manage customer carts and checkouts and order information client-side. Some use cases for this API are:
* Add an item with JavaScript to a shopper's cart from the Storefront
* Programmatically retrieve and display information to a customer about their recent order
* Update the billing address of a checkout
* Clear a customer's current cart


## GraphQL Storefront API
BigCommerce's [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) allows you to query product and customer data and store settings remotely or from a store's front end. Some use cases for this API are:
* Pull a product's data with JavaScript into a Stencil theme
* Access customer data via the front end of a site
* Fetch category and brand details from a store's front end

## Customer Login API
The [Customer Login API](/api-docs/storefront/customer-login-api) lets you programmatically sign customers in to a BigCommerce storefront. Some use cases for this API are:
* Sign customers in to a BigCommerce store from a third-party account or a headless storefront
* Enable login using credentials other than email and password, such as a phone number
* Integrate a BigCommerce store with an SSO provider


## Current Customer API
BigCommerce's [Current Customer API](/api-docs/customers/current-customer-api) allows you to determine which customer is logged in to a storefront during a session.
* Confirm a customer's identity in the browser
* Validate a customer's identity to display specific information to them from an external app


## API environments

Make BigCommerce API requests in the context of the storefront or server-to-server.

| API | Base URL |
| -- | -- |
| Server-to-Server | `https://api.bigcommerce.com/stores/{{store_hash}}/v3/`|
| V2 | `https://api.bigcommerce.com/stores/{{store_hash}}/v2/`|
| Storefront API | `https://your-store.mybigcommerce.com/api/{{endpoint}}`|
| GraphQL | `https://www.{{bigcommerce_storefront_domain}}.com/graphql`|
| Customer Login | `https://www.{{bigcommerce_storefront_domain}}.com/login/token/{{token}}`|
| Current Customer | `/customer/current.jwt?app_client_id={{app_client_id}}` |


## Available store resources

| Resource | Description |
|--|--|
| [Catalog](/api-reference/catalog/catalog-api) | The Catalog API manages products, brands, and categories for a store. |
| [Store Infomation](/api-reference/store-management/store-information-api) | Get system timestamp and basic store information. |
| [Currency](/api-reference/store/currency-api) | Manage currency displayed on the storefront. |
| [Geography](/api-reference/store/geography-api) | Get a list of states and countries.  |
| [Tax Class](/api-reference/store/tax-classes-api) | Get available tax classes on a store. |
| [Storefront Cart](/api-reference/cart-checkout/storefront-cart-api) | Create a cart or scrape cart data from the front end. |    
| [Storefront Checkout](/api-reference/cart-checkout/storefront-checkout-api) | Create a checkout or scrape checkout data from the front end. |
| [Server-to-Server Cart](/api-reference/cart-checkout/server-server-cart-api) | Create a cart and bypass the BigCommerce front end. |
| [Server-to-Server Checkout](/api-reference/cart-checkout/server-server-checkout-api) | Create a checkout and bypass the BigCommerce front end. |
| [Orders](/api-reference/orders/orders-api) | Create and manage orders. |
| [Order Transactions](/api-reference/orders/orders-transactions-api) | View order payment information. |
| [Storefront Orders](/api-reference/orders/storefront-orders-api) | View storefront order information. |
| [Customers](/api-reference/customer-subscribers/customers-api) | Manage store customers.  |
| [V3 Customers](/api-reference/customer-subscribers/v3-customers-api) | Manage store customers. To learn about using V3 Customers vs V2 Customers, see [Customers Overview](/api-docs/customers/customers-subscribers-overview). |
| [Subscribers](/api-reference/customer-subscribers/subscribers-api) | Manage newsletter subscribers. |
| [Price Lists](/api-reference/catalog/pricelists-api)| Create variations of catalog pricing. |
| [Scripts](/api-reference/content/content-scripts-api) | Add a script to a stores page. |
| [Marketing](/api-reference/marketing/marketing-api) | Create and manage coupons, banners, and gift certificates. |
| [Enabled Payment Methods](/api-reference/payments/payment-methods-api) | Get a list of available payment methods on a store. |
| Process Payments | Process payments on orders or checkouts. There are two APIs used to process payments. Get the [payment access token](/api-reference/payments/payments-create-payment-token-api) then [process the payment](/api-reference/payments/payments-process-payments).  |
| [Shipping](/api-reference/shipping/shipping-api) | Create and manage shipping methods and zones. 
| [Store Content](/api-reference/content/store-content-api) | Manage the store's blog, web pages, and redirects. |
| [Storefront GraphQL API](/api-docs/storefront/graphql/graphql-storefront-api-overview) | Query storefront data from within a Stencil theme or remote site. |
| [Themes](/api-reference/themes/themes-api) | Manage store's themes. |
| [Widgets](/api-reference/storefront/widgets-api) | Programmatically inject content into a BigCommerce theme. |
| [Wishlist](/api-reference/customer-subscribers/wishlist-api) | Wishlist API allows a developer to create and manage customer wishlists. |

## REST APIs (V2 & V3)
### Request Headers

Server-to-Server requests require the `Accept`, `X-Auth-Token`, and `Content-Type` headers.


| Header | Allowed Values | Description | Example |
|-|-|-| -|
| `Accept` | `application/json` (for .json requests) `application/xml` (for .xml requests) | The MIME type format for receiving a response.|`application/xml` |
| `Content-Type` | `application/json` (for JSON requests) `application/xml` (for XML requests) | The MIME type of the request body. Used to validate and parse the request to the API. | `application/json` |
| `User-Agent` | String | While it is not required, we ask that you specify a user agent which identifies your integration/client with your requests. |
| `X-Auth-Token` | String | Access token authorizing the app to access resources on behalf of a user. |

### Response headers

| Header | Possible Values | Description | Example |
|-|-| -- | - |
| `Date` | An <a href="http://tools.ietf.org/html/rfc2822#section-3.3" target="_blank">RFC 2822</a> date. | The date the response was sent. | `Tue, 15 Nov 2011 12:45:26 GMT` |
| `last-modified` | An <a href="http://tools.ietf.org/html/rfc2822#section-3.3" target="_blank">RFC 2822</a> date. | The date the resource was last modified. Please refer to the individual resource pages for support for this header. | `Tue, 15 Nov 2011 12:45:26 GMT` |
| `Content-Type` | `application/json` | The MIME type of the response, dependent on the extension of the endpoint that was requested. | `application/json` |
| `Content-Location` | A URI | Sent if the request was redirected. | `/api/v2/orders/5.json` |
| `Location` | A URI | The URI of a newly created resource. Sent with a `201 Created` response. | `/api/v2/products/7` |
| `X-Retry-After` | integer | Rate limited response, indicating the number of seconds before the quota refreshes. See [Rate Limits](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits) for more information. | `15` |
| `X-BC-ApiLimit-Remaining` | integer | The number of API requests remaining for the current period (rolling one hour). See [Rate Limits](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits) for more information. | `987` |
| `X-BC-Store-Version` | A version number | The version of BigCommerce on which the store is running. This header is available on versions 7.3.6+. | ` 7.3.6` |
| `Content-Encoding` | `gzip` | Allows API clients to request content to be compressed before being sent back in the response to an API request. | `gzip` |
| `Transfer-Encoding` | `chunked` | Specifies the form of encoding used to transfer the resource. | `chunked`
| `X-Rate-Limit-Requests-Left` | number | Details how many remaining requests your client can make in the current window before being rate-limited. In this case, you would expect to be able to make 6 more requests in the next 3000 milliseconds; on the 7th request within 3000 milliseconds, you would be rate-limited and would receive an HTTP 429 response. | `16101491` |
| `X-Rate-Limit-Requests-Quota` | number | Shows how many API requests are allowed in the current window for your client. | `16101495` |
| `X-Rate-Limit-Time-Reset-Ms` | number | Shows how many milliseconds are remaining in the window. In this case, 3000 milliseconds – so, 3000 milliseconds after this request, the API quota will be refreshed. |`30000 `|
| `X-Rate-Limit-Time-Window-Ms` | number | Shows the size of your current rate-limiting window. | `9762` |

### Media types

A media type is the format of the request or response body. BigCommerce APIs accept requests and send responses in JSON. Encode requests using the UTF-8 character set; other character sets can have unpredictable results.


### Content types

### Request content type
When performing a request that contains a body, specify the type of content you are sending with the `Content-Type` header. This typically applies to `PUT` and `POST` requests.

### Response content type
When requesting a resource that returns a body, specify the type of content you want to receive with the `Accept` header. Alternatively, you can supply an extension to the resource you're requesting.


The priority in which you can process these methods are:
* Accept header high-priority types (eg. `Accept: application/json`) extensions on the resource (e.g. `customers.json`).
* Accept header low priority types (priorities less than 1, e.g. `Accept: application/json;q=0.9`)

### Request Structure
The body of a JSON request is an object containing a set of key-value pairs. A simple representation of a product object is:

```json title="Example request body: Product object" lineNumbers
{
 "id": 5,
 "name": "iPod",
 "description": "A portable MP3 music player."
}
```

### Response structure
Responses are structured similarly to requests. If a request returns a single object, then the response will contain a single object containing the fields for that resource.

```json title="Example response: Get a category" lineNumbers
//GET https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/categories/{{category_id}}
{
  "data": {
    "id": 39,
    "parent_id": 19,
    "name": "Bath",
    "description": "",
    "views": 0,
    "sort_order": 0,
    "page_title": "",
    "meta_keywords": [
      ""
    ],
    "meta_description": "",
    "layout_file": "category.html",
    "image_url": "",
    "is_visible": true,
    "search_keywords": "",
    "default_product_sort": "use_store_settings",
    "custom_url": {
      "url": "/garden/bath/",
      "is_customized": false
    }
  },
  "meta": {}
}
```

## Support

### Developer community
The [developer community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) is a great place to get help from other developers who work on the BigCommerce platform. If you have BigCommerce-specific questions, this online forum is the best place to ask. It's also an excellent place for beginners to get assistance.

### BC at Stack Overflow
Are you a more experienced developer or have a programming language-specific question? [StackOverflow](https://stackoverflow.com/questions/tagged/bigcommerce) is a good place to ask questions and get help. The developer community is the best place to get answers about the BigCommerce platform specifically.

## Resources
* [Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers)
* [Terms of Service](https://www.bigcommerce.com/terms/api-terms/)
* [StackOverflow](https://stackoverflow.com/questions/tagged/bigcommerce)
