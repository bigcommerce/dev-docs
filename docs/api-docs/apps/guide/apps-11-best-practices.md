# App Development Best Practices

<div class="otp" id="no-index">

### On this page
- [OAuth flow](#oauth-flow)
- [API requests](#api-requests)
- [Webhook events](#webhook-events)
- [User interface](#user-interface)
- [Deployment](#deployment)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

Review the following best practices before submitting your app to the [Apps Marketplace](https://www.bigcommerce.com/apps/).

## OAuth flow

### Follow security best practices and requirements

[RFC 6749](https://tools.ietf.org/html/rfc6749#section-10) discusses OAuth security considerations, recommendations, and requirements. Here's a summary of important items applicable to apps:
* Request access tokens with minimal scopes necessary.
* Serve all redirect URIs over TLS.
* Keep access tokens confidential in transit and storage.
* Do not transmit access tokens, refresh tokens, or client credentials in the clear.
* Do not transmit authorization codes in the clear.
* Educate end-users about the risks phishing attacks pose.
* Provide mechanisms that make it easy for end-users to confirm the authenticity of your app.
* Implement CSRF protection on redirect URI.

For details, see [Security Considerations in RC6749](https://tools.ietf.org/html/rfc6749#section-10). For a list of the top web application security risks and best practices to avoid them, see [OWASP Top Ten](https://owasp.org/www-project-top-ten/).

## API requests

### Use the latest APIs

BigCommerce is actively developing V3 API endpoints. By using the newest endpoints, you will ensure that your app has access to the latest resources. You will also be better positioned to provide a user experience consistent with what merchants will see in their BigCommerce store's control panel. To stay up to date, bookmark our [changelog](https://developer.bigcommerce.com/changelog).

### Plan for API updates

We encourage developers to write code against our API that will not break if an endpoint starts returning additional fields, as these "non-breaking" changes may be made by us without warning as part of our normal development. Breaking changes will be made with early warning, typically via our developer [changelog](https://developer.bigcommerce.com/changelog) and other channels as appropriate. In exceptional cases where we know the usage of a particular endpoint to be zero, or for beta APIs, we may make breaking changes without warning.

### Thread API requests

Thread requests to make rapid updates via API. Threaded requests allow you to send multiple requests at a time. They can come from a different open connection or multiple requests to the same resource. Our [Ruby API client](https://github.com/bigcommerce/bigcommerce-api-ruby) is thread-safe; it satisfies the need for multiple threads to access the same shared data and the need for a shared piece of data to be accessed by only one thread at a time. These attributes can reduce the total time that your app will require to complete a series of requests.

### Respect API rate limits

BigCommerce rate limits all API requests made to a store in a thirty-second window. The rate limit varies by plan level.

| Plan                     | Requests per Hour | Requests per 30 Seconds     |
| ------------------------ | ----------------- | --------------------------- |
| Enterprise               | -                 | `7,000,000`                 |
| Enterprise Sandboxes     | -                 | `7,000,000`                 |
| Pro                      | `60,000`          | `450`                       |
| Plus                     | `20,000`          | `150`                       |
| Standard                 | `20,000`          | `150`                       |
| Non-Enterprise Sandboxes | `20,000`          | `150`                       |

Apps making API requests to a store share the store's rate limit. This promotes fairness between apps accessing the API simultaneously, and prevents a single app from consuming the store's entire limit.

BigCommerce allots applications a share of a store's rate limit via quota system, and exposes rate limit positioning to applications via the following response headers.

```http
X-Rate-Limit-Requests-Left →6
X-Rate-Limit-Requests-Quota →25
X-Rate-Limit-Time-Reset-Ms →3000
X-Rate-Limit-Time-Window-Ms →5000
```

| Name | Description |
| -- | -- |
| `X-Rate-Limit-Time-Window-Ms` | size of rate limit window in milliseconds                        |
| `X-Rate-Limit-Time-Reset-Ms`  | time remaining in window in milliseconds                         |
| `X-Rate-Limit-Requests-Quota` | total requests allotted to your application per window            |
| `X-Rate-Limit-Requests-Left`  | remaining requests allotted to your application in current window |

BigCommerce responds to apps that exceed the quota with a [429](/api-docs/getting-started/basics/api-status-codes#api-status-codes_4-client-error) response. When this happens, applications should pause requests until the number of milliseconds in `X-Rate-Limit-Time-Reset-Ms` elapses.

### Understand concurrent API request limits

BigCommerce limits concurrent requests to most endpoints to three. The endpoints specified below enjoy an increased limit.

| Limit | Endpoint | Method |
| -- | -- | -- |
| `10` | `/v3/customers` | `POST` |

### Play nicely when making parallel requests

BigCommerce's REST endpoints accept requests made in parallel. Applications making parallel requests should monitor rate limit headers to avoid a `429` response. Methods for doing so include the following:
* Slow rate of requests when `X-Rate-Limit-Requests-Left` nears zero.
* Self-throttles requests to the average rate of `(X-Rate-Limit-Requests-Quota / X-Rate-Limit-Time-Window-Seconds)`.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> ### Note
> * Endpoints that accept bulk requests may have specific limitations on the number of accepted parallel requests. For example, making multiple parallel `upsert` requests to [`/pricelists/{price_list_id}/records`](https://developer.bigcommerce.com/api-reference/store-management/price-lists/price-lists-records/setpricelistrecordcollection) will result in a `429` error response -- these limitations are documented at the operation level in the API Reference.

</div>
</div>
</div>

### Respect platform limits

To promote stability and performance, BigCommerce sets store maximums on certain entities and values, and responds to API requests that would exceed them with a `403 Forbidden` response.

For a list of limits, see [Platform Limits](https://support.bigcommerce.com/s/article/Platform-Limits) in the Help Center.

## Webhook events

### Use webhooks to keep app data up-to-date

Rather than polling endpoints, get notified when updates occur by subscribing to [webhooks](/api-docs/getting-started/webhooks/about-webhooks).

## User interface

### Manage user session timeouts

Add BigCommerce's JavaScript SDK to your single-click app's front-end to prevent users from getting logged out of the control panel while using your app. To do so, reference the following script in your app's client-side code:

```html
https://cdn.bigcommerce.com/jssdk/bc-sdk.js
```

To perform some action when a logout occurs, specify an `onLogout` callback:


```javascript
Bigcommerce.init({
      onLogout: callback
});
```

### Streamline new user onboarding

- If your app has a new user form, we recommend auto-filling input fields with data from the [stores](https://developer.bigcommerce.com/api-reference/store-management/store-information-api) endpoint, which contains much of the info you need.
- If your app doesn't have an approval process for new users, consider automatically generating accounts for new stores that install your app.
- If your app requires the user to login at launch, use the information BigCommerce sends to your callback URL to authenticate the user without asking for a username and password each time.
- If you plan to share user testimonials, add a link to your full case study in the case studies field.

## Deployment

### Consider hosting on Google Cloud Platform's us-central1 region

BigCommerce hosts [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region; maximize performance by hosting in the same region.

## Next steps
* [Check requirements](https://developer.bigcommerce.com/api-docs/apps/guide/requirements).
* [Publish your app](https://developer.bigcommerce.com/api-docs/apps/guide/publish).

## Resources

### Sample aps
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Nelify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/getconversio/node-bigcommerce)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [BigDesign Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)