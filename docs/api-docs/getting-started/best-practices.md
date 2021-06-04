# API Best Practices

<div class="otp" id="no-index">

### On this page
- [Ensure your integration is up-to-date](#ensure-your-integration-is-up-to-date)
- [Anticipate changes to BigCommerce APIs](#anticipate-changes-to-bigcommerce-apis)
- [Use webhooks effectively](#use-webhooks-effectively)
- [Thread API requests](#thread-api-requests)
- [Marketplace apps](#marketplace-apps)
- [API rate limits](#api-rate-limits)
- [Platform limits](#platform-limits)
- [Resources](#resources)

</div>

## Ensure your integration is up-to-date

BigCommerce frequently enhances its core product and is actively developing v3 API endpoints. By using the newest API version, you will ensure that your app has access to the latest resources. You will also be better positioned to provide a user experience consistent with what merchants will see in their BigCommerce store’s control panel. To stay up to date, bookmark our [changelog](/changelog).

## Anticipate changes to BigCommerce APIs

At BigCommerce, we make a distinction between "breaking" and "non-breaking" changes. 

Any "breaking" changes listed below will always be made with early warning via our developer [changelog](/changelog) and other channels. There are several exceptional cases. BigCommerce will make breaking changes without warning to non-production (alpha/beta) APIs, or when we know the usage of a particular endpoint is zero.

Breaking changes:


- Removal of a field from an API response
- Changing the data type of a field
- Changing the structure of an object
- Removal of an entire endpoint
- Adding a new required field to a `POST`/`PUT` body

We encourage developers to write code against our APIs that will not break if an endpoint begins returning additional fields. We will push these "non-breaking" changes to the code base without warning as part of our normal development.

Non-breaking changes:

- Adding a new field to a `GET` response
- Adding a new optional field to a `POST`/`PUT` body
- Adding new endpoints

## Use webhooks effectively

To keep data in your application up-to-date, [webhooks](/api-docs/getting-started/webhooks/about-webhooks) provide a great alternative to periodic API polling. Use OAuth to register a webhook event that your application can listen for. Do not use legacy [basic authentication](/api-docs/getting-started/authentication/rest-api-authentication#migrating-from-legacy-to-oauth/) for this.

BigCommerce will send a partial payload when a subscribed event is triggered, with a few identifying details such as the order ID when an order is created. Your application can use the order ID returned in the payload to make a subsequent API request for the full order details.


## Thread API requests

You can use threaded requests in order to quickly update information in an API. Threaded requests allow you to send multiple requests at one time. They can come from a different open connection or multiple requests to the same resource.

The [BigCommerce Ruby API](https://github.com/bigcommerce/bigcommerce-api-ruby) client is thread-safe. It satisfies the need for multiple threads to access the same shared data and the need for only one thread to access a shared piece of data at any given time. These attributes can reduce the total time that your app will require to complete a series of requests.

## Marketplace apps

Merchants often have more than one person who can access a store's control panel. BigCommerce allows additional users to access an app when the store owner has granted them appropriate permissions. The requirements for supporting multi-user app access are:
* Tokens must be stored against the `store_hash` and not against user info.
* Within the [Developer Portal](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-app-api-credentials) workspace, you must enable your app’s **Technical** > **Multiple Users** option.

In the payload returned when a user launches an app, users are distinguished by `owner_email` versus `user_email`. If these two emails match, the user is the store owner.

If you wish to enable user removal, you can do so by filling in your app’s **Technical** > **Remove User Callback URL** field in the Developer Portal. Enabling user removal is optional. For more advanced implementations, you can enable the store owner to grant specific permissions to different non-admin users. For example, `person1@email.com` could be restricted to only editing product inventory but not viewing orders. If you decide to include user permission in your app, it’s a great feature to advertise.

For more information, see [Multi-User Support](/api-docs/apps/guide/intro#multi-user-support).

## API rate limits
Apps that authenticate with OAuth are rate-limited based on a quota that is refreshed every few seconds. The maximum quota for a store will vary depending on the [store’s plan](https://support.bigcommerce.com/s/article/Platform-Limits#storelimits).

| Plans & sandboxes | Maximum quota |
| -- | -- | 
| Enterprise plans and Enterprise sandboxes (Enterprise-Test) | Unlimited\*| 
| Pro plans| 60k per hour (450 / 30sec) | 
| All other sandboxes (Dev/Partner/Employee) | 20k per hour (150 / 30sec)| 
| Plus & Standard plans| 20k per hour (150 / 30sec) | 

_\* The **Unlimited** rate limit on BigCommerce Enterprise plans means that stores on this plan will not be artificially rate-limited on the basis of API-requests-per-unit-of-time. However, there are physical limits to the infrastructure which may limit the maximum throughput of requests on any given API endpoint. BigCommerce also reserves the right to limit unreasonable or abusive API activity in the interest of platform stability, per our [Terms of Service](https://www.bigcommerce.com/terms/api-terms/)._


Each request to the API consumes one available request from the quota. When an app hits the quota limit, subsequent requests are rejected until the quota is refreshed.

The store’s overall quota is distributed across all apps that are accessing the store at a given time. This provides fairness for multiple apps that are accessing the API simultaneously, preventing a single app from consuming the store’s entire quota by itself. The quota might adjust as additional clients connect or disconnect while you’re running requests.

### Concurrent API call rate limits

Certain BigCommerce API resources rate-limit concurrent requests. This is to ensure the performance and reliability of the platform for all of our users. API calls are metered on a per-store, per-endpoint basis. These limitations are subject to change.

| Limit | Endpoint | Method |
| -- | -- | -- |
| 10| `/stores/:hash/v3/customers` | `POST` |

All other BigCommerce API resource endpoints have a rate limit of 3 concurrent requests at a time.

### Playing nicely with the platform

Every API response’s HTTP headers give you full visibility into your position in the rate-limiting algorithm:

```http
X-Rate-Limit-Requests-Left →6
X-Rate-Limit-Requests-Quota →25
X-Rate-Limit-Time-Reset-Ms →3000
X-Rate-Limit-Time-Window-Ms →5000
```

| Name | Description |
| -- | -- |
| `X-Rate-Limit-Time-Window-Ms`| Shows the size of your current rate limiting window. In this case, it’s 5000 milliseconds.|
| `X-Rate-Limit-Time-Reset-Ms` | Shows how many milliseconds are remaining in the window. In this case, 3000 milliseconds. 3000 milliseconds after this request, the API quota will be refreshed. |
| `X-Rate-Limit-Requests-Quota` | Shows how many API requests are allowed in the current window for your client. In this case, the number is 25 requests. |
| `X-Rate-Limit-Requests-Left` | Details how many remaining requests your client can make in the current window before being rate limited. In this case, you would expect to be able to make 6 more requests in the next 3000 milliseconds; on the 7th request within 3000 milliseconds, you would be rate limited and would receive an HTTP 429 response.|

You will know you've been limited if your request to the API triggers a [429 Too Many Requests](/api-docs/getting-started/basics/api-status-codes#api-status-codes_4-client-error) response.

The rate limited response will contain the `X-Rate-Limit-Time-Reset-Ms` header, specifying a time (in milliseconds) that your client must wait before its quota has refreshed. Retry the request after this time has elapsed, and your API service will resume as normal.

### Example of 429 status code

When you see a response with an HTTP `429` status code, your client shouldn’t make any further requests until your quota has refreshed:

**429 response**

```http
HTTP/1.1 429 Too Many Requests
    	Date: Mon, 03 Feb 2017 20:36:00 GMT
    	Content-Type: application/json
    	X-Rate-Limit-Time-Reset-Ms: 15000
```

Parse the `X-Rate-Limit-Time-Reset-Ms` header to determine how long you have to wait. In this case, it would be 15000 milliseconds.
Your client can sleep on the specified interval:

**PHP example for delaying response**
```php
   $milliseconds = $response->getHeader("X-Rate-Limit-Time-Reset-Ms");
    usleep($milliseconds * 1000);
```

After waiting for the given number of milliseconds, your client can go back to making API requests.

### Making requests in parallel
You might wish to increase the amount of work your application can do in a given unit of time by sending multiple HTTP requests to the BigCommerce API in parallel. This is perfectly acceptable. However, your application should monitor the rate limiting headers to avoid an HTTP `429` response. Methods for doing this include:
* Slowing your rate of API requests when `X-Rate-Limit-Requests-Left` is nearing zero.
* Determining an acceptable average rate of requests, by dividing `X-Rate-Limit-Requests-Quota` by `X-Rate-Limit-Time-Window-Seconds`, and then self-throttling to that rate.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Note
> Endpoints that accept bulk requests may have specific limitations on the number of accepted parallel requests. For example, making multiple parallel `upsert` requests to [`/pricelists/{price_list_id}/records`](/api-reference/store-management/price-lists/price-lists-records/setpricelistrecordcollection) will result in a `429` error response -- these limitations are documented at the operation level in the API reference.

</div>
</div>
</div>

### Making requests with the Storefront Cart API 
Client-side applications should avoid polling the [Storefront Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api) on interval. Hundreds of thousands of browsers could potentially poll the Storefront Cart API at any given time, causing a significant load increase to BigCommerce's servers. We may take action against a store using this practice to prevent interruptions in service to other stores.

Consider subscribing to the [Cart Webhook](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#cart) via a server-side application as an alternative to polling the Storefront Cart API at an interval, and only query the Storefront Cart API as a response to user input. Storing cart information in the browser cache is also an alternative method for keeping cart information up to date across browser tabs.

## Platform limits

BigCommerce does have limits on the number of products, categories, brands, etc. that can be created in a store. See [Platform Limits](https://support.bigcommerce.com/s/article/Platform-Limits) for more details.

## Resources
### Related articles
* [API Status Codes](https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes)
* [Filtering](https://developer.bigcommerce.com/api-docs/getting-started/filtering)
* [Platform Limits](https://support.bigcommerce.com/s/article/Platform-Limits)
