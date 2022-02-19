# Guide to OAuth API Accounts for REST Endpoints

BigCommerce offers two types of OAuth API accounts to developers who wish to use BigCommerce's REST APIs: store management credentials and app credentials. This article describes the difference between the two, how to obtain and revoke account credentials, and the use cases for each.  It also contains a reference for available OAuth scopes, and provides a compelling list of reasons to migrate from legacy API tokens to OAuth credentials.

## What is a BigCommerce OAuth API account?

Every parent set of API credentials that you request for your store is its own **API account**. An API account consists of an `access_token`, a `client_id`, a `client_secret`, your `api_path` and a `client_name` that you define to help tell your API accounts apart. The `access_token` can change, but the parent `client_id` and `client_secret` will never change. Guard them closely. It's best practice to limit the [OAuth scope](#oauth-scopes) of each account to only the privileges needed to complete that app or user's designated tasks, so you should create separate API accounts for each app, store API user, and/or function.

### All OAuth API accounts

An API account's **client ID** uniquely identifies the app or user making a request. 

The **client secret** value is a secret that your app and BigCommerce share. 

### App OAuth API accounts

Developers create app API accounts in the [Developer Portal](https://devtools.bigcommerce.com). Most apps use access tokens generated from the API account's `client_ID`, `client_secret`, and a grant `code` to read and change store data once the store owner installs and authorizes the app. The vast majority of app API access tokens must be generated in an authorization grant code flow.

Some APIs may use app OAuth API accounts to implement authentication patterns other than the traditional OAuth grant `code` to `access_token` pipeline. As of this writing, this includes the [Current Customer API](/api-docs/storefront/current-customer-api). Consult the documentation for the API you want to use to learn more about the authentication pattern it requires. For a summary of the authentication methods in each of our APIs, read about [Authenticating BigCommerce APIs](api-docs/getting-started/authentication/authenticating-bigcommerce-apis).
### Store OAuth API accounts

Merchants generate single-store API credentials when they create store OAuth API accounts in their store's control panel (**Advanced Settings** > **API Accounts**). Use these credentials to read and change one store's data using BigCommerce's APIs. Generate store API OAuth access tokens manually in the control panel's **API Accounts** view, or programmatically by authorization grant code.

Most of the time, you will use the **access token** to authenticate your requests to BigCommerce.  However, `access_token`s can be invalidated, so the authentication library or middleware that your software uses should use the `client_id` and `client_secret` to request a new `access_token` when the old one no longer works.

Although the **client ID** value uniquely identifies the app or user making a request, you no longer need to pass it in the header of each API request. Typically, the `access_token` will suffice. For more particulars about when BigCommerce will need your `client_id` rather than just your `access_token`, or bearer token, read about [Authenticating BigCommerce APIs](api-docs/getting-started/authentication/authenticating-bigcommerce-apis) and consult the documentation for the API you want to use.

The **API path** for your store will not change, but it will have `/v3/` or `/v2/` appended to it, depending on which version is current for the endpoint you're querying.

The **client name** is for your convenience and is not currently required to send or receive requests.


<!-- theme: warning -->
> #### Be careful with client secrets
> Although you never want to send your `client_id`, `client_secret`, or `access_token` in plain text or an unencrypted payload, **be particularly careful with the `client_secret`.**  An attacker can use your `client_secret` to both sign and decrypt JWTs sent between you and BigCommerce.

## Obtaining store API credentials

To create a store API account, do the following:

1. Navigate to **Advanced Settings** > **API Accounts** > **Create API Account**.
2. Give the account a name, for internal reference only.
3. In the **OAuth Scopes** section, select the minimum scopes your use case requires.
4. Click **Save**.

If your save is successful, the browser displays a pop-up that contains an `access_token`, and most browsers also download a `.txt` file containing the full set of API account credentials. Save the token and `.txt` file somewhere secure. You will need the token to make API requests and the additional credentials to request new tokens. The `.txt` file also contains the base API path for your store, preconfigured for the V3 API. The API path contains your store hash, which is part of most API requests. 

```yml title="Example: .txt download for store OAuth API account"
ACCESS TOKEN: xxxxalphanumstringxxxx
CLIENT NAME: products read-write # user-defined identifier
API PATH: https://api.bigcommerce.com/stores/123456/v3/ # the store hash here is 123456
CLIENT ID: xxxxdifferentalphanumstringxxxx
CLIENT SECRET: xxxxhexadecimalstringxxxx
```

<!-- theme: warning -->
> #### Save your credentials
> There is no way to re-display this pop-up or download the .txt file again after selecting Done, so be sure to securely store the credentials before exiting this screen.


![Create an API Account](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536087816482 "Create an API Account")

To get started making requests, see [API Requests](/api-docs/getting-started/basics/making-requests).

## Revoking or modifying store API credentials

When revoking store API credentials, the most conservative course of action is to invalidate the API account's `access_token`. Requests that use the old `access_token` will fail, but if the requestor has access to the `client_id` and `client_secret`, they will be able to generate a new one. You can also manually create a new `access_token`. 

If the `client_id` and `client_secret` are compromised, or the account has become unnecessary, secure your account by deleting the API account altogether. You cannot recover a deleted API account, so take care.

### Invalidating a store API access token
### Deleting a store API account

<!-- theme: error -->
> #### Delete carefully
> Deleting an account cannot be undone, so be sure before clicking the trash can icon. You can also use the checkboxes on the left side to delete multiple accounts at once – but be especially careful when using this option.

To delete a store API account:
1. Sign in to the store, using the store owner’s username and password.
2. Navigate to **Advanced Settings** > **API Accounts** and click the checkbox next to the account you want to delete.
3. In the **Actions** column on the right, click the trash can icon.

![Revoking API Credentials](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537388177603 "Revoking API Credentials")

## Obtaining app API credentials

To get app API credentials, create and sign in to your BigCommerce [Developer Portal](https://devtools.bigcommerce.com) account. Navigate to **My Apps** in the top-right corner, then:

1. Click **Create an app**.  
2. Give your app a name. This name will only be visible to you.
3. Click **Create**. A pop-up box will display showing Your Profile, App Summary, and Category.

![Create an App](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537389767940 "Create an App")

4. Click on **Step 3 - Technical**. Fill out the App Features sections with app type, callback URLs, and scope.

![Step 3 - Technical](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537389883100 "Step 3 - Technical")

5. In the lower right-hand corner of the popup box, click **Update & Close**.
6. A new pop up will show asking if you want to change the OAuth scopes. Click **Confirm Update**.
7. You will be routed back to the Developer Portal home page and your app will be listed. Click **View Client ID**.

![View Client ID](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537390078741 "View Client ID")

8. Copy your client ID and client secret. The client ID and client secret can be accessed by clicking **View Client ID**.

<!-- theme: info -->
> #### Client IDs and client secrets in apps
> The client ID value uniquely identifies your app. However, you no longer need to pass it in the header of all your requests to the API.
> You only need to pass the client secret value once, during the app installation sequence. Thereafter, BigCommerce uses it to sign payloads in load, uninstall, and remove user requests, and your app uses it to verify the signature to ensure that the request is coming from BigCommerce.


![Client ID and client secret](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537390135692 "Client ID and client secret")

<!-- theme: warning -->
> #### Delete apps carefully
> If you delete the app, there is no way to recover the client ID and client secret.
### Next steps

During the app installation process, your app uses the client ID and client secret to obtain an OAuth token authorized against the store installing the app. For a detailed look at this process, see [Authenticating an app](/api-docs/apps/guide/auth).

## Use cases by credential type

| Use Case | App API Credentials | Store API Credentials |
|:---|:---:|:---:|
| From Developer Portal | **x** | |
| From Store Control Panel | | **x** |
| Single-click Apps (Marketplace) | **x** | |
| Private Apps | **x** |
| Hidden Apps | **x** | |
| Connector Apps | | **x** |
| Scripts | | **x** |
| Testing | | **x** |
| V2 | **x** | **x** |
| V3 | **x** | **x** |
| Webhooks | **x** | **x** |

## Migrating from legacy to OAuth

<!-- theme: error -->
> #### Legacy API Accounts
> As of February 2022, BigCommerce no longer issues legacy API Accounts (accounts using HTTP basic auth) to new stores. Starting July 2018, new BigCommerce stores were no longer able to create legacy API Accounts (accounts using HTTP basic auth) within their control panels. 
> We strongly recommend migrating to OAuth as soon as possible. Existing legacy API Accounts will continue to work until further notice.

### Benefits of migrating to OAuth

If you haven't already, we recommend that you migrate from legacy API credentials to OAuth. Migration provides a wealth of benefits, including the following:

* **Unified requests**: Send all OAuth requests to a single URL: `https://api.bigcommerce.com`. Using a common hostname prevents any interruption of service when a store's domain or SSL changes or expires.

* **Latest and greatest APIs**: BigCommerce’s V3 APIs are accessible exclusively with OAuth.

* **Webhook subscriptions**: OAuth API accounts can subscribe to real-time event notifications using BigCommerce’s webhooks.

* **Shared secrets**: Use new APIs and endpoints that require shared secrets, including the Storefront Customer Login API and the Storefront Current Customer identification endpoint.

* **Zippier responses**: Responses to OAuth requests use gzip compression and less of your bandwidth.

* **Better security with granular permissions**: All OAuth tokens are scoped to specific operations and endpoints. If you suspect a breach, revoke, reissue, and get on with your day.

### How to migrate

When you update your API connections to use OAuth instead of legacy basic authentication, you will need to do the following:

* Create an API account appropriate to your use case. Keeping in mind the API endpoints your connections use, create either a store API account or an app API account per the preceding instructions. Configure the account with the correct scopes for the work your use case does. We recommend adhering to industry standard security practices; provision the API account with the minimum scope that your application requires.
* If you use one of our [client libraries](/tools-resources), consult the library’s documentation for establishing an optimal OAuth configuration.
* After you create your connection, update your connection parameters as follows:
  * Use `https://api.bigcommerce.com` as the gateway URL instead of the BigCommerce store’s secure hostname. For example, route requests that formerly went to  `https://store-abc123.mybigcommerce.com/api/v2/orders/123` or `https://my-custom-store-domain.com/api/v2/orders/123` to `https://api.bigcommerce.com/stores/{{store_hash}}/v2/orders/123`.
  * Rewrite your HTTP request headers to use the `X-Auth-Token` header to pass the API account's `access_token` instead of the `Authentication` header. For more information, see [Authentication](/api-docs/getting-started/authentication).

Rate limiting works differently for OAuth API connections. For details, see the [Rate Limits section](/api-docs/getting-started/best-practices#api-rate-limits) of our API best practices article.

## OAuth scopes

**Scope** grants and limits a program's ability to read and write data. Set the scopes to the minimum level of access needed to accomplish the task at hand.

All OAuth scopes except `default` provide `read-only` permissions scopes, so that you can limit some accounts to sending `GET` and `HEAD` requests.

<!-- theme: info -->
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
| Create Payments | modify | `store_payments_access_token_create` | Process Payments | [/payments/access_tokens](/api-reference/payments/payments-create-payment-token-api)|
| Get Payment Methods | read-only | `store_payments_methods_read` | Get Order Payment Methods | [/payments](/api-reference/payments/payments-process-payments) |
| Products | modify | `store_v2_products` | View and modify products, brands, categories, and other product information. | [/v3/catalog](/api-reference/catalog/catalog-api) <br>[/v3/pricelists](/api-reference/price-lists/pricelists-api) |
| Products | read-only | `store_v2_products_read_only` | View products | [/v3/catalog](/api-reference/catalog/catalog-api) <br>[/v3/pricelists](/api-reference/price-lists/pricelists-api) |
| Themes | modify | `store_themes_manage` | View and modify themes | [/v3/themes](/api-reference/themes/themes-api) |
| Themes | read-only | `store_themes_read_only` | View themes | [/v3/themes](/api-reference/themes/themes-api) |
| Carts | modify | `store_cart` | View and Modify carts | [/v3/carts](/api-reference/cart-checkout/storefront-cart-api) |
| Carts | read-only | `store_cart_read_only` | View Carts | [/v3/carts](/api-reference/cart-checkout/storefront-cart-api) |
| Checkouts | modify | `store_checkout` | View and modify a checkout | [/v3/checkouts](/api-reference/cart-checkout/storefront-checkout-api) |
| Checkouts | read-only | `store_checkout_read_only` | View checkout content | [/v3/checkouts](/api-reference/cart-checkout/storefront-checkout-api) |
| Sites & Routes | modify | `store_sites` | View and modify sites and routes | [/v3/channels/{channel_id}/site](/api-reference/cart-checkout/sites-routes-api) <br>[/v3/sites/{site_id}/routes](/api-reference/cart-checkout/sites-routes-api) |
| Sites & Routes | read-only | `store_sites_read_only` | View external storefronts with Non-BigCommerce URLs | [/v3/channels/{channel_id}/site](/api-reference/cart-checkout/sites-routes-api) <br>[/v3/sites/{site_id}/routes](/api-reference/cart-checkout/sites-routes-api) |
| Channel Settings | modify | `store_channel_settings` | View and modify a list of channels | [/v3/channels](/api-reference/cart-checkout/channels-listings-api) |
| Channel Settings | read-only | `store_channel_settings_read_only` | View a list of channels | [/v3/channels](/api-reference/cart-checkout/channels-listings-api) |
| Channel Listings | modify | `store_channel_listings` | View and modify a list of all channel listings for a particular channel | [/v3/channels/listings](/api-reference/cart-checkout/channels-listings-api) |
| Channel Listings | read-only | `store_channel_listings_read_only` | View a list of all channel listings for a particular channel | [/v3/channels/listings](/api-reference/cart-checkout/channels-listings-api) |
| Storefront API Tokens | modify | `store_storefront_api` | Create a storefront API token | [/v3/storefront/api-token](/api-reference/store-management/tokens/createtoken) |
| Storefront API Customer Impersonation Tokens | modify | `store_storefront_api_customer_impersonation` | Create a storefront API token that allows for customer impersonation | [/v3/storefront/api-token-customer-impersonation](/api-reference/store-management/tokens/customer-impersonation-token/createtokenwithcustomerimpersonation) |

## Resources
* [Authenticating BigCommerce APIs](api-docs/getting-started/authentication/authenticating-bigcommerce-apis)
* [Guide to Building Apps](/api-docs/apps/guide/intro)
* [Rate Limits](/api-docs/getting-started/best-practices#api-rate-limits)
* [API Status Codes](/api-docs/getting-started/api-status-codes)
