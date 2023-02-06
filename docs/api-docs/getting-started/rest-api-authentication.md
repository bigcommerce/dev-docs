# Guide to API Accounts

BigCommerce offers two types of OAuth-based API accounts to developers who wish to use BigCommerce's REST APIs: store management credentials and app credentials. This article describes the difference between the two, how to obtain and revoke account credentials, and the use cases for each. It also contains a reference for available OAuth scopes and provides a compelling list of reasons to migrate from legacy API tokens to OAuth credentials.

In addition to authenticating REST APIs, BigCommerce API accounts are the fundamental authentication layer for all authenticated API requests. To learn more about different authentication schemes, see [Authenticating BigCommerce APIs](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis).

## API accounts

Every parent set of API credentials that you request for your store is its own **API account**. At its simplest, an API account consists of the following: 
* the `client_id` uniquely identifies the app or user, or the _client_, making a request;
* the `client_secret` is a cryptographically secure value known only to the client and BigCommerce.

Every active API account has at least one `access_token`. [Store API accounts](#store-api-accounts) include a static `access_token` that does not change. [App API accounts](#app-api-accounts) expect each application to generate a unique `access_token` for every store that installs the app.

**Guard these values closely.** The `client_id` and `client_secret` will never change; `access_token`s do not expire based on time and cannot be manually invalidated. It's best practice to limit each account's [OAuth scope](#oauth-scopes) to only the privileges needed to complete that app or user's designated tasks. Create separate API accounts for each app, store API user, and/or function.

## Store API accounts

Merchants generate single-store API credentials when they create API accounts in their store control panel (**Advanced Settings** > **API Accounts**). Use these credentials to read and change one store's data with BigCommerce's APIs. You can't change store API accounts' access tokens or OAuth scopes. 

In addition to the [API account components](#api-accounts) in the preceding section, store API accounts contain the following attributes out of the box:
* an `access_token`, which accompanies most REST API requests;
* the **client name** is a label for your convenience, and it doesn't accompany requests;
* the **API path** is the URL to which you make requests. The API path won't change, but it will have `/v3/` or `/v2/` appended to it, depending on the current version for the endpoint you're querying.

Most APIs that work with store API accounts use the `access_token` to authenticate requests to BigCommerce. However, a few use the access token to generate a temporary credential. To learn more about special cases that involve store credentials, read about [Authenticating BigCommerce APIs](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis) and consult the documentation for the API you want to use.

<!-- theme: danger -->
> #### Be careful with client secrets
> Do not send your `client_secret` or `access_token` in plain text or an unencrypted payload. **Be particularly careful with the `client_secret`.** An attacker can use your `client_secret` to both sign and decrypt JWTs sent between you and BigCommerce.

### Obtaining store API credentials

To create a store API account, consult our Knowledge Base article on [Creating a Store API Account](https://support.bigcommerce.com/s/article/Store-API-Accounts?language=en_US#creating).

To get started making requests, see [Getting Started](/api-docs/getting-started/making-requests).

### Revoking store API credentials

To revoke store API credentials, you must delete the corresponding store API account. If the `client_id` and `client_secret` are compromised, or the account has become unnecessary, secure your account by deleting the API account. You cannot recover a deleted API account, so take care.

<!-- theme: danger -->
> #### Delete carefully
> Deleting an account cannot be undone, so be sure before clicking the trash can icon. You can also use the checkboxes on the left side to delete multiple accounts at once – but be especially careful when using this option.

To delete a store API account, consult our Knowledge Base article on [Deleting a Store API Account](https://support.bigcommerce.com/s/article/Store-API-Accounts?language=en_US#deleting).

<!-- theme: warning -->
> #### Don't forget your webhooks and metafields
> Some resources are only accessible to the API account that created them. These include webhooks and metafields. If you need to revoke a store API account, plan accordingly.


## App API accounts

You can [create app API accounts](#obtaining-app-api-credentials) in the [Developer Portal](https://devtools.bigcommerce.com). Most apps use access tokens generated from the API account's `client_ID`, `client_secret`, and a grant `code` to read and change store data once the store owner installs and authorizes the app. [Generate access tokens](#app-access-tokens) with the BigCommerce-initiated grant code authorization flow.

Some APIs use app API accounts to implement alternative authentication patterns. For a summary of all our authentication methods, see [Authenticating BigCommerce APIs](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis).

For more on working with apps, see our [Guide to Building Apps](/api-docs/apps/guide/intro). The sections on [Implementing OAuth](/api-docs/apps/guide/auth) and [Callback Handlers](/api-docs/apps/guide/callbacks) are particularly relevant to generating access tokens.

### Obtaining app API credentials

To create an app and its associated API account, consult our article on [Managing Apps in the Developer Portal](/api-docs/apps/guide/developer-portal#create-an-app).

### App access tokens

App API accounts do not come pre-configured with an access token. Each time a store installs your app, BigCommerce initiates a grant code authorization flow to help your app generate a dedicated access token for that store. For further details, see [Authenticating an app](/api-docs/apps/guide/auth).

### Revoking app API credentials

There is no way to manually revoke or force-regenerate app API account access tokens. However, either of the following actions triggers a token refresh:
* When the store owner's email address changes
* When you modify the app API account's OAuth scopes

After one of these changes, the store owner will be prompted to review the change and reauthorize the app the next time they click the app icon in the store control panel.

<!-- theme: danger -->
> #### Delete apps carefully
> When you delete an app in the [Dev Portal](https://devtools.bigcommerce.com), there is no way to recover the client ID or client secret. If you choose to do this, don't forget to mitigate the potential loss of [webhook and metafield](#dont-forget-your-webhooks-and-metafields)-related data and functionality.

To delete an app API account, consult our article on [Managing Apps in the Developer Portal](/api-docs/apps/guide/developer-portal#delete-an-app).

## Choosing the right kind of API account

Where both types of API account are supported, review the preceding sections to make an informed choice about which best fits your use case. In the following table, links go to the relevant section of our [Authentication](/api-docs/getting-started/authentication) article.

| API or Use Case | App API Account | Store API Account |
|:----------------|:---------------:|:-----------------:|
| [REST Store Management APIs](/api-docs/getting-started/authentication#access-tokens) | &times; | &times; |
| [GraphQL Store Management APIs](/api-docs/getting-started/authentication#access-tokens) | &times; | &times; |
| [REST Storefront API](/api-docs/getting-started/authentication#same-origin-cors-authentication) |  | &times; |
| [GraphQL Storefront API](/api-docs/getting-started/authentication#bigcommerce-generated-jwts) |  | &times; |
| [Customer Login API](/api-docs/getting-started/authentication#user-generated-jwts) | &times; |  |
| [Current Customer API](/api-docs/getting-started/authentication#client-id) | &times; |  |
| [Payments API](/api-docs/getting-started/authentication#bigcommerce-generated-jwts) | &times; | &times; |
| [Apps that host REST Provider APIs (provider apps)](/api-docs/getting-started/authentication#developer-configured-authentication) | &times; |  |
| Apps hosted in the store control panel (single-click app) | &times; |  |
| Manual connection between a third-party app and a store |  | &times; |
| Single-store front-end scripts |  | &times; |

## Migrating from legacy to OAuth

<!-- theme: warning -->
> #### Legacy API Accounts
> BigCommerce no longer issues legacy API Accounts to new stores. Existing legacy API Accounts will continue to work until further notice. **Migrate to OAuth as soon as possible.**

### Benefits of migrating to OAuth

We recommend migrating from legacy API credentials to OAuth, if you haven't already. Migration provides a wealth of benefits, including the following:

* **Unified requests**: Send all OAuth requests to a single URL: `https://api.bigcommerce.com`. Using a common hostname prevents interruptions of service when a store's domain or SSL/TLS certificate changes or expires.

* **Latest and greatest APIs**: BigCommerce’s V3 APIs are accessible exclusively with OAuth.

* **Webhook subscriptions**: OAuth API accounts can subscribe to real-time event notifications using BigCommerce’s webhooks.

* **Shared secrets**: Use new APIs and endpoints that require shared secrets, including the [Customer Login](/api-docs/storefront/customer-login-api) and [Current Customer](/api-docs/storefront/current-customer-api) APIs.

* **Zippier responses**: Responses to OAuth requests use gzip compression and less of your bandwidth.

* **Better security with granular permissions**: All OAuth tokens are scoped to specific operations and endpoints. If you suspect a breach, you will know which resources could be affected.

### How to migrate

Before you update your API connections to use OAuth instead of legacy basic authentication, take the following actions:

* Create an API account appropriate to your use case. Keeping in mind the API endpoints your connections use, create either a store API account or an app API account per the preceding instructions. To adhere to industry-standard security practices, configure the account with the minimum OAuth scopes for your use case. If you're using an app API account, you can always modify the scope later.
* If you use one of our [client libraries](/tools-resources), consult the library’s documentation for establishing an optimal OAuth configuration.
* After you create your connection, update your connection parameters as follows:
  * Use `https://api.bigcommerce.com` as the gateway URL instead of the BigCommerce store’s secure hostname. For example, route requests that formerly went to `https://store-{{store_hash}}.mybigcommerce.com/api/v2/orders/{{order_id}}` or `https://my-custom-store-domain.com/api/v2/orders/{{order_id}}` will now use `https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders/{{order_id}}`.
  * Rewrite your HTTP request headers to use the `X-Auth-Token` header to pass the API account's `access_token` instead of the `Authorization` header. For more information, see [Authentication](/api-docs/getting-started/authentication).

Rate limiting works differently for OAuth API connections. For details, see the [Rate Limits section](/api-docs/getting-started/best-practices#api-rate-limits) of our API best practices article.

## OAuth scopes

**Scope** grants and limits a program's ability to read and write data. Set the scopes to the minimum level of access your implementation needs.

All OAuth scopes except `default` provide `read-only` permissions scopes so that you can limit some accounts to sending `GET` and `HEAD` requests.

<!-- theme: info -->
> #### Webhooks scope
> Webhooks are accessible from the default scope that is automatically accessible to all API accounts.

| UI Name | Permission | Parameter | Description | Resources |
|:--------|:-----------|:----------|:------------|:----------|
| Content | modify | `store_v2_content` | View and modify store content | [/v2/pages](/api-reference/content/store-content-api) <br>[/v2/blog](/api-reference/content/store-content-api) <br>[/v2/redirects](/api-reference/content/store-content-api) <br>/v3/widgets |
| Content | read-only | `store_v2_content_read_only` | View store content | [/v2/pages](/api-reference/content/store-content-api) <br>[/v2/blog](/api-reference/content/store-content-api) <br>[/v2/redirects](/api-reference/content/store-content-api) <br>/v3/widgets |
| Checkout Content | modify | `store_content_checkout` | View and modify content on checkout pages | [/v3/scripts](/api-reference/content/store-content-api) |
| Checkout Content | read-only | `store_content_checkout_read_only` | View content on checkout pages | [/v3/scripts](/api-reference/content/store-content-api) |
| Customers | modify | `store_v2_customers` | View and modify customer information | [/v2/customers](/api-reference/customer-subscribers/customers-api) <br>[/v2/customer_groups](/api-reference/customer-subscribers/customers-api) <br>[/v3/customers/subscribers](/api-reference/customer-subscribers/subscribers-api) <br>[/v3/customers/subscribers/wishlist](/api-reference/customer-subscribers/wishlist-api) |
| Customers | read-only | `store_v2_customers_read_only` | View customer information | [/v2/customers](/api-reference/customer-subscribers/customers-api) <br>[/v2/customer_groups](/api-reference/customer-subscribers/customers-api) <br>[/v3/customers/subscribers](/api-reference/customer-subscribers/subscribers-api) <br>[/v3/customers/subscribers/wishlist](/api-reference/customer-subscribers/wishlist-api) |
| Customers Login | modify | `store_v2_customers_login` | Sign customers in to your storefront | [Customer Login API](/api-docs/storefront/customer-login-api)
| Information & Settings | modify | `store_v2_information` | View and modify store information and settings | [/v2/store](/api-reference/store-management/store-information-api/store-information/) <br>[/v2/time](/api-reference/store-management/store-information-api/time-zone/) |
| Information & Settings | read-only | `store_v2_information_read_only` | View general store information and settings | [/v2/store](/api-reference/store-management/store-information-api/store-information/) <br>[/v2/shipping/time](/api-reference/store-management/store-information-api/time-zone/) |
| Marketing | modify | `store_v2_marketing` | View and modify marketing information | [/v2/coupons](/api-reference/marketing/marketing-api) <br>[/v2/gift_certificates](/api-reference/marketing/marketing-api) <br>[/v2/banners](/api-reference/marketing/marketing-api) |
| Marketing | read-only | `store_v2_marketing_read_only` | View marketing information | [/v2/coupons](/api-reference/marketing/marketing-api) <br>[/v2/gift_certificates](/api-reference/marketing/marketing-api) <br>[/v2/banners](/api-reference/marketing/marketing-api) |
| Orders | modify | `store_v2_orders` | View and modify orders | [/v2/orders](/api-reference/orders/orders-api) <br>[/v2/order_statuses](/api-reference/orders/orders-api) |
| Orders | read-only | `store_v2_orders_read_only` | View orders | [/v2/orders](/api-reference/orders/orders-api) <br>[/v2/order_statuses](/api-reference/orders/orders-api) |
| Order Transactions | modify | `store_v2_transactions` | View and modify order transactions | [/v3/orders/{id}/transactions](/api-reference/orders/orders-transactions-api) |
| Order Transactions | read-only | `store_v2_transactions_read_only` | View order transactions | [/v3/orders/{id}/transactions](/api-reference/orders/orders-transactions-api) |
| Create Payments | modify | `store_payments_access_token_create` | Process payments | [/payments/access_tokens](/api-reference/payments/payments-create-payment-token-api)|
| Get Payment Methods | read-only | `store_payments_methods_read` | Get a list of payment methods | [/payments](/api-reference/payments/payments-process-payments) |
| Products | modify | `store_v2_products` | View and modify products, brands, categories, and other product information. | [/v3/catalog](/api-reference/catalog/catalog-api) <br>[/v3/pricelists](/api-reference/price-lists/pricelists-api) |
| Products | read-only | `store_v2_products_read_only` | View products | [/v3/catalog](/api-reference/catalog/catalog-api) <br>[/v3/pricelists](/api-reference/price-lists/pricelists-api) |
| Themes | modify | `store_themes_manage` | View and modify themes | [/v3/themes](/api-reference/themes/themes-api) |
| Themes | read-only | `store_themes_read_only` | View themes | [/v3/themes](/api-reference/themes/themes-api) |
| Carts | modify | `store_cart` | View and modify carts | [/v3/carts](/api-reference/cart-checkout/storefront-cart-api) |
| Carts | read-only | `store_cart_read_only` | View carts | [/v3/carts](/api-reference/cart-checkout/storefront-cart-api) |
| Checkouts | modify | `store_checkout` | View and modify a checkout | [/v3/checkouts](/api-reference/cart-checkout/storefront-checkout-api) |
| Checkouts | read-only | `store_checkout_read_only` | View checkout content | [/v3/checkouts](/api-reference/cart-checkout/storefront-checkout-api) |
| Sites & Routes | modify | `store_sites` | View and modify sites and routes | [/v3/channels/{channel_id}/site](/api-reference/cart-checkout/sites-routes-api) <br>[/v3/sites/{site_id}/routes](/api-reference/cart-checkout/sites-routes-api) |
| Sites & Routes | read-only | `store_sites_read_only` | View external storefronts with non-BigCommerce URLs | [/v3/channels/{channel_id}/site](/api-reference/cart-checkout/sites-routes-api) <br>[/v3/sites/{site_id}/routes](/api-reference/cart-checkout/sites-routes-api) |
| Channel Settings | modify | `store_channel_settings` | View and modify a list of channels | [/v3/channels](/api-reference/cart-checkout/channels-listings-api) |
| Channel Settings | read-only | `store_channel_settings_read_only` | View a list of channels | [/v3/channels](/api-reference/cart-checkout/channels-listings-api) |
| Channel Listings | modify | `store_channel_listings` | View and modify a list of all channel listings for a particular channel | [/v3/channels/listings](/api-reference/cart-checkout/channels-listings-api) |
| Channel Listings | read-only | `store_channel_listings_read_only` | View a list of all channel listings for a particular channel | [/v3/channels/listings](/api-reference/cart-checkout/channels-listings-api) |
| Storefront API Tokens | modify | `store_storefront_api` | Create a storefront API token | [/v3/storefront/api-token](/api-reference/store-management/tokens/createtoken) |
| Storefront API Customer Impersonation Tokens | modify | `store_storefront_api_customer_impersonation` | Create a storefront API token that allows customer impersonation | [/v3/storefront/api-token-customer-impersonation](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation) |

## Resources
* [Authenticating BigCommerce APIs](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis)
* [Guide to Building Apps](/api-docs/apps/guide/intro)
* [Rate Limits](/api-docs/getting-started/best-practices#api-rate-limits)
* [API Status Codes](/api-docs/getting-started/api-status-codes)
