# API Status Codes


BigCommerce **REST APIs** and **GraphQL APIs** respond to each request with an HTTP status code that depends on the result from the request. Error responses might also include an error message in the body to assist in resolving the problem.

This article covers [REST](#rest-api-http-status-codes) and [GraphQL](#graphql-api-http-status-codes) status codes and error messages.

## REST API HTTP status codes
### 2xx Success 

2xx codes are returned for requests that were understood and processed successfully.

| Code | Text | Purpose |
|:----:|:-----|:--------|
| **200** | **OK** | For successful `GET` and `PUT` requests. |
| **201** | **Created** | For a successful `POST` request. |
| **202** | **Accepted** | For a request that resulted in a scheduled task being created to perform the actual request. |
| **204** | **No Content** | For a successful request that produced no response (such as `DELETE` requests). |
| **207** | **Multi-Status** | Multiple operations have taken place and the status for each operation can be viewed in the body of the response. Typically indicates that a partial failure has occurred.|

### 3xx Redirection 

3xx codes are returned for requests that require further action.

| Code | Text | Purpose |
|:----:|:-----|:--------|
| **301** | **Moved Permanently** | When the API routes have changed (unlikely), or if the incoming request is not secure (`http`), the request will be redirected to the secure (`https`) version. |
| **304** | **Not Modified** | This response will be sent if the request included an `If-Modified-Since` header, but the resource has *not* been modified since the specified date.|

### 4xx Client Error 

4xx codes are returned for requests that could not be processed due to problems with the request or the data.

| Code | Text | Purpose |
|:----:|:-----|:--------|
| **400** | **Bad Request** | Issued when a malformed request was sent. The request could not be completed due to a URL restriction. Check the URL for ports that may conflict with site permissions. |
| **401** | **Unauthorized** | This response is sent when your client failed to provide credentials or its credentials were invalid. |
| **403** | **Forbidden** | Returned when permissions do not allow the operation. |
| **404** | **Does not exist** | The requested entity does not exist. |
| **405** | **Method Not Allowed** | The resource was found, but doesn't support the request method. Issued when either a specific method isn’t yet implemented on a resource, or the resource doesn’t support the method at all. For example, a `PUT` on `/orders` is invalid, but a `PUT` on `/orders/{_id_}` is valid. |
| **406** | **Not Acceptable** | When the client specifies a response content type in the `Accept` header that is not supported. |
| **409** | **Conflict** | A change requested by the client is being rejected, due to a condition imposed by the server. The exact reasons for this response will vary from one resource to the next. An example might be attempting to delete a category whose deletion would cause products to be orphaned. Additional information about the conflict, and about how to resolve it, might be available in the response's `details` section. |
| **413** | **Request Entity Too Large** | When the client requests too many objects. For example, the `limit` parameter exceeded the maximum. |
| **415** | **Unsupported Media Type** | Returned due to issues with the `Content-Type` header.  |
| **422** | **Missing or Invalid Data** | The request cannot be processed either because it omitted required fields or because it contained invalid data. See the response for more details. |
| **429** | **Too Many Requests** | When an OAuth client exceeds the [rate limit](/api-docs/getting-started/best-practices#best-practices_rate-limits) for API requests to a store. |

### 5xx Server Error 

5xx codes are returned for requests that could not be processed due to an internal error with the API or server.

| Code | Text | Purpose |
|:----:|:-----|:--------|
| **500** | **Internal Server Error** | When an error has occurred within the API. |
| **501** | **Not Implemented** | When a request method is sent that is not supported by the API (e.g., `TRACE`, `PATCH`). |
| **503** | **Service Unavailable** | When the store is “Down for Maintenance,” being upgraded to a new version, or is suspended due to administrative action or a billing issue.|
| **507** | **Insufficient Storage** | When the store has reached a limitation for the resource, according to their [BigCommerce plan](https://support.bigcommerce.com/s/article/Pricing#plan-features) (e.g., 500-product limit). |

### Troubleshooting

| Code | Common Causes | Solutions |
|:----:|:--------------|:----------|
|**204**, **301**, and **302**|Redirects| Try the `www` or non-`www` version of the URL. |
|**400**|Invalid syntax, required data missing, `content-type` header missing|Double-check request body for syntax errors and missing data; check `content-type` header.|
|**401** |API credentials are missing or invalid.|Double-check the `access_token` and `client_id`.|
|||Send cURL request with the same credentials to rule app or config issues.|
|**403**| App lacks required OAuth scopes, a store-owner account changed, operations resulting from API request exceed a platform limit, or URL requested is incorrect.|Double-check OAuth Scopes in **control panel** > **API Accounts** or in **Developer Portal** > **My Apps**.|
|||Check the URL. Are the endpoint and store hash correct?|
|||Ensure [platform limits](https://support.bigcommerce.com/s/article/Platform-Limits#product-catalog-limits) have not been reached.|
|**415**| Request headers specify an unsupported `content-type` (or header is missing).|Double-check `content-type` request header.|
|**500**|Expensive API calls or an internal server error in BigCommerce.|Re-attempt the request three to five times, with increasing delays of at least a minute between attempts.|
|||Try reducing the number of objects being requested. You can request fewer objects in the v2 API, by using `?limit={count}`. In  `v2` and `v3` API, fewer objects can be requested by excluding certain fields or only requesting certain fields.|
||| Check the BigCommerce [Status Page](https://status.bigcommerce.com/).|

## GraphQL API HTTP status codes

All GraphQL errors return a 401 HTTP status code.

| Code | Text | Purpose |
|:----:|:-----|:--------|
| **401** | **Unauthorized** | This response is sent when your client failed to provide credentials or its credentials were invalid. |
| | "GraphQL credentials were missing. No token was sent." | No token sent (missing token). |
| | "GraphQL invalid credentials. String is not a JWT" | Invalid JWT sent (token was not a JWT). |
| | "GraphQL invalid credentials. JWT signature is invalid" | One of the JWT claims failed (token was not generated by BC). |
| | "GraphQL invalid credentials. JWT is expired" | Token has expired. |
| | "GraphQL invalid credentials. JWT channel id doesn't match channel id of the URL" | Channel ID mismatch (channel ID in the token does not match channel ID of the site/URL). |
| | "Unknown JWT token" | JWT was revoked. |
| | "GraphQL invalid credentials. JWT has no valid Json" | Invalid JWT sent. Token has no valid JSON. |
| | "GraphQL invalid credentials. JWT has Json of an unknown format" | Invalid JWT sent. Token has no valid JSON. |
| | "GraphQL invalid credentials. JWT store id doesn't match store id of the URL" | Store ID in the token does not match store ID of the site/URL). |
