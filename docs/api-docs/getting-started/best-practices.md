# API Best Practices

## Keep your integration up-to-date

BigCommerce frequently enhances its core product and is actively developing v3 API endpoints. By using the newest API version, you will ensure that your app has access to the latest resources. You will also be better positioned to provide a user experience consistent with what merchants see in their BigCommerce store’s control panel. To stay up to date, bookmark our [changelog](/changelog).

## Anticipate changes to BigCommerce APIs

At BigCommerce, we make a distinction between "breaking" and "non-breaking" changes. 

In most cases, we will give advance notice in our developer [changelog](/changelog) when we make any of the following "breaking" changes. However, we will make breaking changes _without warning_ to non-production (alpha/beta) endpoints, or when analytics indicate that an endpoint has no traffic.

Examples of breaking changes include:

- Removing fields from API responses
- Changing the data type of request or response fields
- Changing the structure of request or response objects
- Adding new required fields to `POST` and `PUT` request bodies
- Removing endpoints

We will push "non-breaking" changes to the code base without warning as part of our normal development.

Examples of non-breaking changes include:

- Adding new fields to `GET` request responses
- Adding new optional fields to `POST` and `PUT` request bodies
- Adding new endpoints

We encourage you to write robust, resilient code that will not break or leak memory if an endpoint begins to return additional fields.

## >>>VERB Response headers

HTTP response header names are case-insensitive. For example, your application may receive `x-rate-limit-requests-left` rather than `X-Rate-Limit-Requests-Left`. Per the [HTTP specification](https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2), it's a best practice for all customer-facing software to treat HTTP header names as case-insensitive. Most HTTP clients already treat headers with the appropriate case insensitivity. >>> closing connective sentence

## Use webhooks to listen for changes

To keep data in your application up-to-date, [webhooks](/api-docs/getting-started/webhooks/about-webhooks) provide a great alternative to periodic API polling. Use an [OAuth API account](/api-docs/getting-started/authentication/rest-api-authentication) to register and subscribe to webhook-enabled events that are relevant to your application.

When an event your app is listening for occurs, BigCommerce sends a payload with a few identifying details relevant the event. See a list of [webhook events and their payloads](/api-docs/store-management/webhooks/webhook-events). Use the payload data points to make subsequent API requests for more details.

### Avoid polling the Storefront Cart API 
Client-side applications should avoid polling the [Storefront Cart API](/api-reference/cart-checkout/storefront-cart-api) on interval. Hundreds of thousands of browsers could potentially poll the Storefront Cart API at any given time, causing a significant load increase to BigCommerce's servers. We may take action against a store using this practice to prevent service interruptions to other stores.

Consider writing a server-side application to subscribe to the [Cart Webhook](/api-docs/store-management/webhooks/webhook-events#carts) as an alternative to polling the Storefront Cart API, and only query the Storefront Cart API as a response to user input. Storing cart information in the browser cache is an alternative method for keeping cart information up to date across browser tabs.

## Thread API requests

You can use threaded requests in order to quickly update information in an API. Threaded requests allow you to send multiple requests at one time. They can come from a different open connection or multiple requests to the same resource.

The [BigCommerce Ruby API](https://github.com/bigcommerce/bigcommerce-api-ruby) client is thread-safe. It satisfies the need for multiple threads to access the same shared data and the need for only one thread to access a shared piece of data at any given time. These attributes can reduce the total time that your app will require to complete a series of requests.

## Marketplace apps

<!-- ### Consider multi-storefront support
brief pitch, link to the [MSF App Compatibility and Optimization](/api-docs/apps/multi-storefront) article.
 -->

### Offer multi-user access

Merchants often have more than one person who can access a store's control panel. BigCommerce allows additional users to access an app when the store owner has granted them appropriate permissions. The requirements for supporting multi-user app access are:
* The app must save the API account access token for each store with its `store_hash`, rather than a user's info.
* In the app's [Developer Portal profile](https://devtools.bigcommerce.com), you must [enable multiple users](/api-docs/apps/guide/developer-portal#edit-technical-details).

In the payload returned when a user launches an app, users are distinguished by `owner_email` versus `user_email`. If these two emails match, the user is the store owner.

Enabling user removal is optional. If you want merchants to be able to remove users, you can do so by writing a `remove_user` callback and [adding its URL](/api-docs/apps/guide/developer-portal#edit-technical-details) to your app's [Developer Portal profile](https://devtools.bigcommerce.com).  For more advanced implementations, you can enable the store owner to grant specific permissions to different non-admin users. For example, `person1@example.com` could have permission to edit product inventory but not to view orders. If you decide to implement user permissions in your app, it’s a great feature to advertise.

For more information, see [Multi-User Support](/api-docs/apps/guide/intro#multi-user-support).

## API rate limits
Apps that authenticate with OAuth are rate-limited based on a quota that is refreshed every few seconds. The maximum quota for a store will vary depending on the [store’s plan](https://support.bigcommerce.com/s/article/Platform-Limits#storelimits).

| Plans & sandboxes | Maximum quota |
|:------------------|:--------------|
| Enterprise plans and Enterprise sandboxes (Enterprise-Test) | Unlimited\*| 
| Pro plans| 60k per hour (450 / 30sec) | 
| All other sandboxes (Dev/Partner/Employee) | Unlimited\*| 
| Plus & Standard plans| 20k per hour (150 / 30sec) | 

<!-- theme: info -->
> #### Unlimited rate limit plans
>The **Unlimited** rate limit on BigCommerce Enterprise plans means that stores on this plan will not be artificially rate-limited on the basis of API-requests-per-unit-of-time. However, there are physical limits to the infrastructure which may limit the maximum throughput of requests on any given API endpoint. BigCommerce also reserves the right to limit unreasonable or abusive API activity in the interest of platform stability, per our [Terms of Service](https://www.bigcommerce.com/terms/api-terms/).

Each request to the API consumes one available request from the quota. When an app hits the quota limit, subsequent requests are rejected until the quota is refreshed.

The store’s overall quota is distributed across all apps that are accessing the store at a given time. This provides fairness for multiple apps that are accessing the API simultaneously, preventing a single app from consuming the store’s entire quota by itself. The quota might adjust as additional clients connect or disconnect while you’re running requests.

### Concurrent API call rate limits

Certain BigCommerce API resources rate-limit concurrent requests. This is to ensure the performance and reliability of the platform for all of our users. API calls are metered on a per-store, per-endpoint basis. These limitations are subject to change.

| Limit | Endpoint | Method |
|:------|:---------|:-------|
| 10 | `/stores/:hash/v3/customers` | `POST` |


### Playing nicely with the platform

Every API response’s HTTP headers give you full visibility into your position in the rate-limiting algorithm:

```http title="Example: Rate limit headers"
X-Rate-Limit-Requests-Left: 6
X-Rate-Limit-Requests-Quota: 25
X-Rate-Limit-Time-Reset-Ms: 3000
X-Rate-Limit-Time-Window-Ms: 5000
```

| Name | Description |
|:-----|:------------|
| `X-Rate-Limit-Time-Window-Ms`| Shows the size of your current rate limiting window. In this case, it’s 5000 milliseconds.|
| `X-Rate-Limit-Time-Reset-Ms` | Shows how many milliseconds are remaining in the window. In this case, 3000 milliseconds. 3000 milliseconds after this request, the API quota will be refreshed. |
| `X-Rate-Limit-Requests-Quota` | Shows how many API requests are allowed in the current window for your client. In this case, the number is 25 requests. |
| `X-Rate-Limit-Requests-Left` | Details how many remaining requests your client can make in the current window before being rate limited. In this case, you would expect to be able to make 6 more requests in the next 3000 milliseconds; on the 7th request within 3000 milliseconds, you would be rate limited and would receive an HTTP 429 response.|

You will know you've been limited if your request to the API triggers a [429: Too Many Requests](/api-docs/getting-started/api-status-codes#4xx-client-error) response.

The rate limited response will contain the `X-Rate-Limit-Time-Reset-Ms` header, specifying a time (in milliseconds) that your client must wait before its quota has refreshed. Retry the request after this time has elapsed, and your API service will resume as normal.

### Example of 429 status code

When you see a response with an HTTP `429` status code, your client shouldn’t make any further requests until your quota has refreshed:

```http title="Example: 429 response"
HTTP/1.1 429 Too Many Requests
Date: Mon, 03 Feb 2022 20:36:00 GMT
Content-Type: application/json
X-Rate-Limit-Time-Reset-Ms: 15000
```

Parse the `X-Rate-Limit-Time-Reset-Ms` header to determine how long you have to wait. In this case, it would be 15000 milliseconds.
Your client can sleep on the specified interval:

```php title="PHP example for delaying response"
    $milliseconds = $response->getHeader("X-Rate-Limit-Time-Reset-Ms");
    usleep($milliseconds * 1000);
```

After waiting for the given number of milliseconds, your client can go back to making API requests.

### Making requests in parallel
You might wish to increase the amount of work your application can do in a given unit of time by sending multiple HTTP requests to the BigCommerce API in parallel. This is perfectly acceptable. However, your application should monitor the rate limiting headers to avoid an HTTP `429` response. Methods for doing this include:
* Slowing your rate of API requests when `X-Rate-Limit-Requests-Left` is nearing zero.
* Determining an acceptable average rate of requests, by dividing `X-Rate-Limit-Requests-Quota` by `X-Rate-Limit-Time-Window-Seconds`, and then self-throttling to that rate.

<!-- theme: warning -->
> #### Note
> Endpoints that accept bulk requests may have specific limitations on the number of accepted parallel requests. For example, making multiple parallel `upsert` requests to [`/pricelists/{price_list_id}/records`](/api-reference/store-management/price-lists/price-lists-records/setpricelistrecordcollection) will result in a `429` error response. These limitations are documented at the operation level in the API reference.

## Platform limits

BigCommerce does have limits on the number of products, categories, brands, etc. that can be created in a store. See [Platform Limits](https://support.bigcommerce.com/s/article/Platform-Limits) for more details.

## Resources
### Related articles
* [API Status Codes](/api-docs/getting-started/api-status-codes)
* [Filtering](/api-docs/getting-started/filtering)
* [Platform Limits](https://support.bigcommerce.com/s/article/Platform-Limits)
