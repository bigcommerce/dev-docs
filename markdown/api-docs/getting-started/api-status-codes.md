<h1>API Status Codes</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#api-status-codes_2-success">2xx Success</a></li>
        <li><a href="#api-status-codes_3-redirection">3xx Redirection</a></li>
        <li><a href="#api-status-codes_4-client-error">4xx Client Error</a></li>
        <li><a href="#api-status-codes_5-server-error">5xx Server Error</a></li>
        <li><a href="#api-status-codes_troubleshooting">Troubleshooting</a></li>
	</ul>
</div>

The BigCommerce API responds to requests with different HTTP status codes depending on the result from the request. Error responses might also include an error message in the body to assist in resolving the problem.



<a href='#api-status-codes_2-success' aria-hidden='true' class='block-anchor'  id='api-status-codes_2-success'></a>

## 2xx Success 

2xx codes are returned for requests that were understood and processed successfully.

| Code | Text | Purpose |
| --- | --- | --- |
| **200** | **OK** | For successful `GET` and `PUT` requests. |
| **201** | **Created** | For a successful `POST` request. |
| **202** | **Accepted** | For a request that resulted in a scheduled task being created to perform the actual request. |
| **204** | **No Content** | For a successful request that produced no response (such as `DELETE` requests). |



<a href='#api-status-codes_3-redirection' aria-hidden='true' class='block-anchor'  id='api-status-codes_3-redirection'></a>

## 3xx Redirection 

3xx codes are returned for requests that require further action.

| Code | Text | Purpose |
| --- | --- | --- |
| **301** | **Moved Permanently** | When the API routes have changed (unlikely), or if the incoming request is not secure (`http`), the request will be redirected to the secure (`https`) version. |
| **304** | **Not Modified** | This response will be sent if the request included an `If-Modified-Since` header, but the resource has *not* been modified since the specified date. Please refer to individual resources' documentation regarding support for the `If-Modified-Since` header. |



<a href='#api-status-codes_4-client-error' aria-hidden='true' class='block-anchor'  id='api-status-codes_4-client-error'></a>

## 4xx Client Error 

4xx codes are returned for requests that could not be processed due to problems with the request or the data.

| Code | Text | Purpose |
| --- | --- | --- |
| **400** | **Bad Request** | Issued when a malformed request was sent.
| **401** | **Unauthorized** | This response is sent when your client failed to provide credentials or its credentials were invalid. |
| **403** | **Forbidden** | Returned when permissions do not allow the operation. 
| **404** | **Not Found** | When a particular resource doesn’t exist or couldn’t be found. |
| **405** | **Method Not Allowed** | The resource was found, but doesn’t support the request method. Issued when either a specific method isn’t yet implemented on a resource, or the resource doesn’t support the method at all. For example, a `PUT` on `/orders` is invalid, but a `PUT` on `/orders/{_id_}` is valid. |
| **406** | **Not Acceptable** | When the client specifies a response content type in the `Accept` header that is not supported. |
| **409** | **Conflict** | A change requested by the client is being rejected, due to a condition imposed by the server. The exact reasons for this response will vary from one resource to the next. An example might be attempting to delete a category whose deletion would cause products to be orphaned. Additional information about the conflict, and about how to resolve it, might be available in the response's `details` section. |
| **413** | **Request Entity Too Large** | When the client requests too many objects. For example, the `limit` parameter exceeded the maximum. |
| **415** | **Unsupported Media Type** | Returned due to issues with the `Content-Type` header.
| **422** | **Missing or Invalid Data** | The request cannot be processed either because it omitted required fields or because it contained invalid data. See the response for more details. |
| **429** | **Too Many Requests** | When an OAuth client exceeds the [rate limit](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits) for API requests to a store. |



<a href='#api-status-codes_5-server-error' aria-hidden='true' class='block-anchor'  id='api-status-codes_5-server-error'></a>

## 5xx Server Error 

5xx codes are returned for requests that could not be processed due to an internal error with the API or server.

| Code | Text | Purpose |
| --- | --- | --- |
| **500** | **Internal Server Error** | When an error has occurred within the API. |
| **501** | **Not Implemented** | When a request method is sent that is not supported by the API (e.g., `TRACE`, `PATCH`). |
| **503** | **Service Unavailable** | When the store is marked as “Down for Maintenance,” or the store is being upgraded to a new version. |
| **507** | **Insufficient Storage** | When the store has reached a limitation for the resource, according to their BigCommerce plan (e.g., 500-product limit). |



<a href='#api-status-codes_troubleshooting' aria-hidden='true' class='block-anchor'  id='api-status-codes_troubleshooting'></a>

## Troubleshooting

|Code|Common Causes|Solutions
|-|-|-|
|**204**, **301**, and **302**|Redirects| Try the `www` or non-`www` version of the URL.
|**400**|Invalid syntax, required data missing, `content-type` header missing|Double-check request body for syntax errors and missing data; check `content-type` header.
|**401** |API credentials are missing or invalid.|Double-check the `access_token` and `client_id`.
|||Send cURL request with the same credentials to rule app or config issues.
|**403**| App lacks required OAuth scopes, a store-owner account changed, operations resulting from API request exceed a platform limit, or URL requested is incorrect.|Double-check OAuth Scopes in **control panel** > **API Accounts** or in **Developer Portal** > **My Apps**.
|||Check the URL. Are the endpoint and store hash correct?
|||Ensure [platform limits](https://support.bigcommerce.com/s/article/Platform-Limits#product-catalog-limits) have not been reached.
|**415**| Request headers specify an unsupported `content-type` (or header is missing).|Double-check `content-type` request header.
|**500**|Expensive API calls or an internal server error in BigCommerce.|Re-attempt the request three to five times, with increasing delays of at least a minute between attempts.
|||Try reducing the number of objects being requested (in the v2 API, you can request fewer objects by using `?limit={count}`. In  `v2` and `v3` API, fewer objects can be requested by excluding certain fields or only requesting certain fields).
||| Check the BigCommerce [Status Page](https://status.bigcommerce.com/).

