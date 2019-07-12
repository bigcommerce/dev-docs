<h1>Best Practices</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#best-practices_integration-up-to-date">Ensure That Your Integration is Up-to-Date</a></li>
        <li><a href="#best-practices_use-webhooks">Use Webhooks Effectively Within Your Application</a></li>
        <li><a href="#best-practices_thread-api-requests">Thread Your Requests to the BigCommerce API</a></li>
        <li><a href="#best-practices_marketplace-apps">Marketplace Apps</a></li>
        <li><a href="#best-practices_rate-limits">API Rate Limits</a></li>
        <li><a href="#best-practices_platform-limits">Platform Limits</a></li>
	</ul>
</div>

<a href='#best-practices_integration-up-to-date' aria-hidden='true' class='block-anchor'  id='best-practices_integration-up-to-date'><i aria-hidden='true' class='linkify icon'></i></a>

## Ensure that your integration is up-to-date

BigCommerce frequently enhances its core product and is actively developing v3 API endpoints. By using the newest API version, you will ensure that your app has access to the latest resources. You will also be better positioned to provide a user experience consistent with what merchants will see in their BigCommerce store’s control panel. To stay up to date, bookmark our [changelog](/changelog). 

---

<a href='#best-practices_use-webhooks' aria-hidden='true' class='block-anchor'  id='best-practices_use-webhooks'><i aria-hidden='true' class='linkify icon'></i></a>

## Use webhooks effectively within your application

To keep data in your application up-to-date, [webhooks](/api-docs/getting-started/webhooks/about-webhooks) provide a great alternative to doing periodic checks. In order to register a webhook event that your application can listen for, you will need to use OAuth (not legacy “Basic Authentication”).

BigCommerce will send a partial payload when a subscribed event is triggered, with minimal identifying details (such as the order ID when an order is created). Your application could use the order ID returned in the payload to make a subsequent API request for the full order details.

---

<a href='#best-practices_thread-api-requests' aria-hidden='true' class='block-anchor'  id='best-practices_thread-api-requests'><i aria-hidden='true' class='linkify icon'></i></a>

## Thread your requests to the BigCommerce API

In order to quickly update information in the API, you can use threaded requests. Threaded requests allow you to send multiple requests at one time. They can come from a different open connection or multiple requests to the same resource. 

The [BigCommerce Ruby API](https://github.com/bigcommerce/bigcommerce-api-ruby) client is thread-safe: It satisfies the need for multiple threads to access the same shared data and the need for a shared piece of data to be accessed by only one thread at any given time. These attributes can reduce the total time that your app will require to complete a series of requests.

---

<a href='#best-practices_marketplace-apps' aria-hidden='true' class='block-anchor'  id='best-practices_marketplace-apps'><i aria-hidden='true' class='linkify icon'></i></a>

## Marketplace Apps

Merchants often have more than one person working on their store. BigCommerce allows additional users to access your app when the store owner has granted them appropriate permissions. The requirements for supporting multi-user access are:
* Tokens must be stored against the `store_hash` and not against user info.
* Within the Dev Tools workspace, you must enable your app’s **Technical** > **Multiple Users** option.

In the payload returned when a user launches an app, users are distinguished by `owner_email` versus `user_email`. If these two emails match, the user is the store owner.

If you wish to enable user removal, you can do by filling in your app’s **Technical** > **Remove User Callback URL** field in Dev Tools. (Enabling user removal is optional).
For more advanced implementations, you can enable the store owner to grant specific permissions to different non-admin users. For example, person1@email.com could be restricted to editing product inventory but not seeing orders. If you decide to include this feature in your app, it’s a great feature to advertise.

---

<a href='#best-practices_rate-limits' aria-hidden='true' class='block-anchor'  id='best-practices_rate-limits'><i aria-hidden='true' class='linkify icon'></i></a>

## API Rate Limits
Apps that authenticate with OAuth are rate-limited, based on a quota that is refreshed every few seconds. The maximum quota for a store will vary depending on the store’s plan.

* Enterprise plans and Enterprise Sandboxes (Enterprise-Test): Unlimited (7mil / 30sec)
* Pro plans: 60k per hour (450 / 30sec)
* All other sandboxes (Dev/Partner/Employee): 20k per hour (150 / 30sec)
* Plus & Standard plans: 20k per hour (150 / 30sec)

Each request to the API consumes one available request from the quota. When an app hits the quota limit, subsequent requests are rejected until the quota is refreshed.

The store’s overall quota is distributed across all apps that are accessing the store at a given time. This provides fairness for multiple apps that are accessing the API simultaneously, preventing a single greedy app from consuming the store’s entire quota by itself. The quota might adjust as additional clients connect or disconnect while you’re running requests. 

### Playing Nicely with the Platform

Every API response’s HTTP headers give you full visibility into your position in the rate-limiting algorithm:

```
X-Rate-Limit-Requests-Left →6
X-Rate-Limit-Requests-Quota →25
X-Rate-Limit-Time-Reset-Ms →3000
X-Rate-Limit-Time-Window-Ms →5000
```

| Name | Description |
| -- | -- |
| X-Rate-Limit-Time-Window-Ms| Shows the size of your current rate limiting window. In this case, it’s 5000 milliseconds.|
| X-Rate-Limit-Time-Reset-Ms | Shows how many milliseconds are remaining in the window. In this case, 3000 milliseconds. 3000 milliseconds after this request, the API quota will be refreshed. |
| X-Rate-Limit-Requests-Quota | Shows how many API requests are allowed in the current window for your client. In this case, the number is 25 requests. |
| X-Rate-Limit-Requests-Left | Details how many remaining requests your client can make in the current window before being rate limited. In this case, you would expect to be able to make 6 more requests in the next 3000 milliseconds; on the 7th request within 3000 milliseconds, you would be rate limited and would receive an HTTP 429 response.|

If your request to the API triggers a [429 Too Many Requests](/api-docs/getting-started/basics/api-status-codes#api-status-codes_4-client-error) response, then you know you’ve been limited.

The rate limited response will contain the `X-Rate-Limit-Time-Reset-Ms` header, specifying a time (in milliseconds) that your client must wait before its quota has refreshed. Retry the request after this time has elapsed, and your API service will resume as normal.


### Example of 429 Status Code

When you see a response with an HTTP 429 status code, your client shouldn’t make any further requests until your quota has refreshed:

```
HTTP/1.1 429 Too Many Requests
    	Date: Mon, 03 Feb 2017 20:36:00 GMT
    	Content-Type: application/json
    	X-Rate-Limit-Time-Reset-Ms: 15000
```


Parse the `X-Rate-Limit-Time-Reset-Ms` header to determine how long you have to wait. In this case, it would be 15000 milliseconds.
Your client can sleep on the specified interval:

```
   $milliseconds = $response->getHeader("X-Rate-Limit-Time-Reset-Ms");
    usleep($milliseconds * 1000);
```


After waiting for the given number of milliseconds, you can go back to making API requests.

### Making Requests in Parallel
You might wish to increase the amount of work your application can do in a given unit of time, by sending multiple HTTP requests to the BigCommerce API in parallel. This is perfectly acceptable.
However, your application should monitor the rate limiting headers to avoid an HTTP 429 response. Methods for doing this might include:
* Slowing your rate of API requests when X-Rate-Limit-Requests-Left is nearing zero.
* Determining an acceptable average rate of requests, by dividing X-Rate-Limit-Requests-Quota by X-Rate-Limit-Time-Window-Seconds, and then self-throttling to that rate.

---

<a href='#best-practices_platform-limits' aria-hidden='true' class='block-anchor'  id='best-practices_platform-limits'><i aria-hidden='true' class='linkify icon'></i></a>

## Platform Limits

BigCommerce does have limits on the number of products, categories, brands, etc. that can be created in a store. See [Platform Limits](https://forum.bigcommerce.com/s/article/Platform-Limits#product-catalog-limits) for more details.

---

## Resources
### Related Artices
* [API Status Codes](https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes)
* [Platform Limits](https://support.bigcommerce.com/s/article/Platform-Limits#product-catalog-limits) (BigCommerce Knowledge Base)

