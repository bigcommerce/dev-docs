<h1>About Our API</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#about-api_api-enviroment">API Environment</a></li>
        <li><a href="#about-api__available-api">Available APIs</a></li>
        <li><a href="#about-api_request-headers">Request Headers</a></li>
        <li><a href="#about-api_response-headers">Response Headers</a></li>
        <li><a href="#about-api_media-types">Media Types</a></li>
        <li><a href="#about-api_content-types">Content Types</a></li>
    <li><a href="#  about-api_request-and-response-structure">Request and Response Structure</a></li>
    		<li><a href="#about-api_get-help">Support</a></li>
    		<li><a href="https://www.bigcommerce.com/terms/api-terms/">Terms of Service</a></li>
	</ul>
</div>

Want to get started making API Requests right away? Check out the [Quick Start](/api-docs/getting-started/basics/making-requests).

The BigCommerce set of APIs allow you to create apps, automate store processes, or build headless ecommerce solutions. Need inspiration on what to build? Visit our [App Marketplace](https://www.bigcommerce.com/apps/). 

---

<a href='#about-api_api-enviroment' aria-hidden='true' class='block-anchor'  id='about-api_api-enviroment'><i aria-hidden='true' class='linkify icon'></i></a>

## API Environment 

BigCommerce API requests can be made in the context of the storefront or server-to-server.  

* Storefront APIs use the store url: `https://your-store.mybigcommerce.com/api/{endpoint}`
* Server-to-Server requests use the base url:  `https://api.bigcommerce.com/stores/{store_hash}/v3/`
* V2 API Requests use the base url: `https://api.bigcommerce.com/stores/{store_hash}/v2/`

---

<a href='#about-api__available-api' aria-hidden='true' class='block-anchor'  id='about-api__available-api'><i aria-hidden='true' class='linkify icon'></i></a>

## Available APIs

|API | Description | Download Schema |
|--|--| -- |
| [Catalog](/api-reference/catalog/catalog-api) | The Catalog API manages products, brands and categories for a store. | [Download Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/BigCommerce_Catalog_API.oas2.json)
| [Store Infomation](/api-reference/store-management/store-information-api) | Get system time stamp and basic store information. | [Download Store Information API](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/BigCommerce_Store_Information_API.oas2.json) |
| [Currency](/api-reference/store/currency-api) | Manage currency displayed on the storefront | [Download Currency API](https://developer.bigcommerce.com/api-reference/store-management/currency-api/BigCommerce_Currency_API.oas2.json)
| [Geography](/api-reference/store/geography-api) | Get a list of states and countries  | [Download Geography API](https://developer.bigcommerce.com/api-reference/store-management/geography-api/BigCommerce_Geography_API.oas2.json)
| [Tax Class](/api-reference/store/tax-classes-api) | Get available tax classes on a store | [Download Tax Class API](https://developer.bigcommerce.com/api-reference/store-management/tax-classes-api/BigCommerce_Tax_Class_API.oas2.json)
| [Storefront Cart](/api-reference/cart-checkout/storefront-cart-api) | Create a cart or scrape cart data from the front end | [Download Storefront Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api/BigCommerce_Storefront_Cart_API.oas2.json)
| [Storefront Checkout](/api-reference/cart-checkout/storefront-checkout-api) | Create a checkout or scrape checkout data from the front end |[Download Storefront Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api/BigCommerce_Storefront_Checkout_API.oas2.json)
| [Server-to-Server Cart](/api-reference/cart-checkout/server-server-cart-api) | Create a cart and bypass the BigCommerce front end | [Download Server-to-Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/BigCommerce_Server_to_Server_Cart_API.oas2.json)
| [Server-to-Server Checkout](/api-reference/cart-checkout/server-server-checkout-api) | Create a checkout and bypass the BigCommerce front end | [Download Server-Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/BigCommerce_Server_to_Server_Checkout_API.oas2.json)
| [Orders](/api-reference/orders/orders-api) | Create and manage orders | [Download Orders API](https://developer.bigcommerce.com/api-reference/orders/orders-api/BigCommerce_Orders_API.oas2.json)
| [Order Transactions](/api-reference/orders/orders-transactions-api) | View order payment information | [Download Order Transactions API](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api/BigCommerce_Order_Transactions_API.oas2.json)
| [Storefront Orders](/api-reference/orders/storefront-orders-api) | View storefront order information | [Download Storefront Orders API](https://developer.bigcommerce.com/api-reference/orders/storefront-orders-api/BigCommerce_Storefront_Orders_API.oas2.json)
| [Customers](/api-reference/customer-subscribers/customers-api) | Manage store customers  | [Download Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/BigCommerce_Customers_API.oas2.json)|
| [V3 Customers](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api) |Manage store customers. To learn about using V3 Customers vs V2 Customers, see [Customers Overview](https://developer.bigcommerce.com/api-docs/customers/customers-subscribers-overview). | [Download V3 Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/BigCommerce_Customers_V3_API.oas2.json) |
| [Subscribers](/api-reference/customer-subscribers/subscribers-api) | Manage newsletter subscribers | [Download Subscribers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/subscribers-api/BigCommerce_Subscribers_API.oas2.json)
| [Price Lists](/api-reference/price-lists/pricelists-api) | Create variations of catalog pricing. | [Download Price Lists API](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/BigCommerce_Price_Lists_API.oas2.json) |
| [Scripts](/api-reference/content/content-scripts-api) | Add a script to a stores page | [Download Scripts API](https://developer.bigcommerce.com/api-reference/storefront/content-scripts-api/BigCommerce_Scripts_API.oas2.json)
| [Marketing](/api-reference/marketing/marketing-api) | Create and manage Coupons, Banners and Gift Certificates. | [Download Marketing API](https://developer.bigcommerce.com/api-reference/marketing/marketing-api/BigCommerce_Marketing_API.oas2.json)
| [Enabled Payment Methods](/api-reference/payments/payment-methods-api) | Get a list of available payment methods on a store. | [Download Payment Methods API](https://developer.bigcommerce.com/api-reference/payments/payment-methods-api/BigCommerce_Enabled_Payment_Methods_API.oas2.json)|
| Process Payments | Process payments on orders or checkouts. There are two APIs used to process payments. Get the [payment access token](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api) then [process the payment](https://developer.bigcommerce.com/api-reference/payments/payments-process-payments).  | [Payment Token & Payment Methods](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api/BigCommerce_Payments_API.oas2.json), [Process Payment](https://developer.bigcommerce.com/api-reference/payments/payments-process-payments/BigCommerce_Process_Payment_API.oas2.json)
| [Shipping](/api-reference/shipping/shipping-api) | Create and manage shipping methods and zones. |[Download Shipping API](https://developer.bigcommerce.com/api-reference/store-management/shipping-api/BigCommerce_Shipping_API.oas2.json)
| [Store Content](/api-reference/content/store-content-api) | Mange the store's blog, web pages and redirects. | [Download Store Content API](https://developer.bigcommerce.com/api-reference/marketing/store-content-api/BigCommerce_Store_Content_API.oas2.json)
| [Themes](/api-reference/themes/themes-api) | Manage store's themes. |[Download Themes API](https://developer.bigcommerce.com/api-reference/storefront/themes-api/BigCommerce_Themes_API.oas2.json) |
| [Widgets](https://developer.bigcommerce.com/api-reference/storefront/widgets-api) | Programatically inject content into a BigCommerce theme. | [Download Widgets API](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/BigCommerce_Widgets_API.oas2.json) |
| [Wishlist](https://developer.bigcommerce.com/api-reference/customer-subscribers/wishlist-api) | Wishlist API allows a developer to create and manage customer wishlists. | [Download Wishlist API](https://developer.bigcommerce.com/api-reference/customer-subscribers/wishlist-api/BigCommerce_Wishlist_API.oas2.json) |

---

<a href='#about-api_request-headers' aria-hidden='true' class='block-anchor'  id='about-api_request-headers'><i aria-hidden='true' class='linkify icon'></i></a>

## Request Headers

Server-to-Server request headers require Accept, X-Auth-Client, X-Auth-Token and Content-Type at a minimum.


| Header | Allowed Values | Description | Example |
| --- | --- | --- | --- |
| `Accept` | `application/json` (for .json requests) `application/xml` (for .xml requests) | The MIME type for the format you want to receive a response in.|`application/xml` |
| `Content-Type` | `application/json` (for JSON requests) `application/xml` (for XML requests) | The MIME type of the request body. Used to validate and parse the request to the API. | `application/json` |
| `User-Agent` | String | While it is not required, we ask that you specify a user agent which identifies your integration/client with your requests. |
| `X-Auth-Client` | String | Client ID of the requesting app |
| `X-Auth-Token` | String | Access token authorizing the app to access resources on behalf of a user |

---

<a href='#about-api_response-headers' aria-hidden='true' class='block-anchor'  id='about-api_response-headers'><i aria-hidden='true' class='linkify icon'></i></a>

## Response Headers 

| Header | Possible Values | Description | Example |
| ------ | --------------- | ----------- | ------- |
| `Date` | An <a href="http://tools.ietf.org/html/rfc2822#section-3.3" target="_blank">RFC 2822</a> date. | The date the response was sent. | `Tue, 15 Nov 2011 12:45:26 GMT` |
| `last-modified` | An <a href="http://tools.ietf.org/html/rfc2822#section-3.3" target="_blank">RFC 2822</a> date. | The date the resource was last modified. Please refer to the individual resource pages for support for this header. | `Tue, 15 Nov 2011 12:45:26 GMT` |
| `Content-Type` | `application/json` | The MIME type of the response, dependent on the extension of the endpoint that was requested. | `application/json` |
| `Content-Location` | A URI | Sent if the request was redirected. | `/api/v2/orders/5.json` |
| `Location` | A URI | The URI of a newly created resource. Sent with a `201 Created` response. | `/api/v2/products/7` |
| `X-Retry-After` | integer | Rate limited response, indicating the number of seconds before the quota refreshes. See [Rate Limits](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits) for more information. | `15` |
| `X-BC-ApiLimit-Remaining` | integer | The number of API requests remaining for the current period (rolling one hour). See [Rate Limits](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits) for more information. | `987` |
| `X-BC-Store-Version` | A version number | The version of BigCommerce the store is running on. This header is available on versions 7.3.6+. | ` 7.3.6` |
| `Content-Encoding` | `gzip` | Allows API clients to request content to be compressed before being sent back in the response to an API request. | `gzip` |
| `Transfer-Encoding` | `chunked` | Specifies the form of encoding used to transfer the resource. | `chunked`
| `X-Rate-Limit-Requests-Left` | number | Details how many remaining requests your client can make in the current window before being rate-limited. In this case, you would expect to be able to make 6 more requests in the next 3000 milliseconds; on the 7th request within 3000 milliseconds, you would be rate-limited and would receive an HTTP 429 response. | `16101491` |
| `X-Rate-Limit-Requests-Quota` | number | Shows how many API requests are allowed in the current window for your client. | `16101495` |
| `X-Rate-Limit-Time-Reset-Ms`  | number | Shows how many milliseconds are remaining in the window. In this case, 3000 milliseconds – so, 3000 milliseconds after this request, the API quota will be refreshed. |`30000 `|
| `X-Rate-Limit-Time-Window-Ms` | number | Shows the size of your current rate-limiting window. | `9762` |

---

<a href='#about-api_media-types' aria-hidden='true' class='block-anchor'  id='about-api_media-types'><i aria-hidden='true' class='linkify icon'></i></a>

## Media Types

A media type is the format of the request or response body. The BigCommerce API accepts requests and responds in JSON. You should encode requests using the UTF-8 character set (other character sets might have unpredictable results).

---

<a href='#about-api_content-types' aria-hidden='true' class='block-anchor'  id='about-api_content-types'><i aria-hidden='true' class='linkify icon'></i></a>

## Content Types

### Request Content Type
When performing a request that contains a body (eg. POST or PUT), the type of content you are sending needs to be specified in the Content-Type header. 

### Response Content Type
There are two ways you can specify the type of content you would like to receive. The first method is to specify an Accept header. The second is to supply an extension to the resource you are requesting. 

The priority in which these methods are processed are:
* Accept header high-priority types (eg. `Accept: application/json`) extensions on the resource (e.g. `customers.json`).
* Accept header low priority types (priorities less than 1, e.g. `Accept: application/json;q=0.9`)

---

<a href='#about-api_request-and-response-structure' aria-hidden='true' class='block-anchor'  id='about-api_request-and-response-structure'><i aria-hidden='true' class='linkify icon'></i></a>

## Request and Response Structure

### Request Structure
The body of a JSON request is an object containing a set of key-value pairs. A simple representation of a product object is:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
 "id": 5,
 "name": "iPod",
 "description": "A portable MP3 music player."
} 
```

### Response Structure
Responses are structured similarly to requests. If a request returns a single object, then the response will contain a single object, containing the fields for that resource.

<!--
title: "Single Category Response"
subtitle: ""
lineNumbers: true
-->

**Response Get a Category**  
`/GET https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/categories/{category_id}`

```json
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

<br>

<!--
title: "Multiple Categories Response"
subtitle: ""
lineNumbers: true
-->

**Response Get All Categories**  
`/GET https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/categories/{category_id}`


```json
{
  "data": [
    {
      "id": 19,
      "parent_id": 0,
      "name": "Garden",
      "description": "<p>A collection of products for the garden.</p>",
      "views": 0,
      "sort_order": 2,
      "page_title": "page title",
      "meta_keywords": [
        "meta keyword"
      ],
      "meta_description": "meta description",
      "layout_file": "category.html",
      "image_url": "",
      "is_visible": true,
      "search_keywords": "search keywords",
      "default_product_sort": "use_store_settings",
      "custom_url": {
        "url": "/garden/",
        "is_customized": false
      }
    },
    {
      "id": 20,
      "parent_id": 0,
      "name": "Publications",
      "description": "",
      "views": 0,
      "sort_order": 4,
      "page_title": "",
      "meta_keywords": [
        ""
      ],
      "meta_description": "",
      "layout_file": "category_with_facets.html",
      "image_url": "",
      "is_visible": true,
      "search_keywords": "",
      "default_product_sort": "use_store_settings",
      "custom_url": {
        "url": "/publications/",
        "is_customized": false
      }
    },
    {
      "id": 21,
      "parent_id": 0,
      "name": "Kitchen",
      "description": "",
      "views": 0,
      "sort_order": 3,
      "page_title": "",
      "meta_keywords": [
        ""
      ],
      "meta_description": "",
      "layout_file": "category_with_facets.html",
      "image_url": "",
      "is_visible": true,
      "search_keywords": "",
      "default_product_sort": "use_store_settings",
      "custom_url": {
        "url": "/kitchen/",
        "is_customized": false
      }
    },
    {
      "id": 22,
      "parent_id": 0,
      "name": "Utility",
      "description": "",
      "views": 0,
      "sort_order": 5,
      "page_title": "",
      "meta_keywords": [
        ""
      ],
      "meta_description": "",
      "layout_file": "category_with_facets.html",
      "image_url": "",
      "is_visible": true,
      "search_keywords": "",
      "default_product_sort": "use_store_settings",
      "custom_url": {
        "url": "/utility/",
        "is_customized": false
      }
    },
    {
      "id": 23,
      "parent_id": 0,
      "name": "Shop All",
      "description": "<h1>Browse our full collection</h1>",
      "views": 0,
      "sort_order": 0,
      "page_title": "",
      "meta_keywords": [
        ""
      ],
      "meta_description": "",
      "layout_file": "category_with_facets.html",
      "image_url": "",
      "is_visible": true,
      "search_keywords": "",
      "default_product_sort": "use_store_settings",
      "custom_url": {
        "url": "/shop-all/",
        "is_customized": false
      }
    },
    {
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
    }
  ],
  "meta": {
    "pagination": {
      "total": 6,
      "count": 6,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?page=1&limit=50"
      }
    }
  }
}
```

---

<a href='#about-api_get-help' aria-hidden='true' class='block-anchor'  id='about-api_get-help'><i aria-hidden='true' class='linkify icon'></i></a>

## Support


### [Developer Community](https://forum.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers)
This is a great place to get help from other developers who work on the BigCommerce platform. If you have BigCommerce specific questions this is the best place to ask. It's also great for beginners to get assistance. 

### [StackOverflow](https://stackoverflow.com/questions/tagged/bigcommerce)
Are you a more experienced developer or have a programming language specific question? This is a good place to ask questions and get help. The developer community is the best place to get answers about the BigCommerce platform specifically.  


---

## Resources
* [Developer Community](https://forum.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers)
* [Terms of Service](https://www.bigcommerce.com/terms/api-terms/)
* [StackOverflow](https://stackoverflow.com/questions/tagged/bigcommerce)

