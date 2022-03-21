# Authenticating BigCommerce's REST APIs


Two types of API credentials are available to developers wishing to make requests against BigCommerce's REST APIs.

## What is an API account?

Every parent set of API credentials that you request for your store is its own **API Account**. An API account consists of an `access_token`, a `client_id`, a `client_secret`, your `api_path` and a `client_name` that you define to help tell your API accounts apart. The `access_token` can change, but the parent `client_id` and `client_secret` will never change. Guard them closely. It's best practice to create separate API accounts for each app, store API user, and/or function, so that you can limit the [OAuth scope](#oauth-scopes) of each account to only the privileges needed to complete that app or user's designated tasks.

### All API accounts

The **client ID** value uniquely identifies the app or user making a request. 

The **client secret** value is a secret that your app and BigCommerce share. 

### App API accounts

Developers create app API accounts in the [Developer Portal](https://devtools.bigcommerce.com). Apps use access tokens generated from the API account's `client_ID`, `client_secret`, and a grant `code` to read and change store data once the store owner installs and authorizes the app. The vast majority of app API access tokens must be generated in an authorization grant code flow.
### Store API accounts

Merchants generate store API credentials when they create store API accounts in their store's control panel (**Advanced Settings** > **API Accounts**). You can use these credentials to read and change your store's data using BigCommerce's APIs. Generate store API OAuth access tokens manually in the control panel's **API Accounts** view, or programmatically by authorization grant code.

Most of the time, you will use the **access token** to authenticate your requests to BigCommerce.  However, `access_token`s can be invalidated, so the authentication library or middleware that your software uses should use the `client_id` and `client_secret` to request a new `access_token` when the old one no longer works.

Although the **client ID** value uniquely identifies the app or user making a request, you no longer need to pass it in the header of each API request. Typically, the `access_token` will suffice. For more particulars about when BigCommerce will need your `client_id` rather than just your `access_token`, or bearer token, read more about [OAuth 2.0](https://oauth.net/2/) or its standard, [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749).

The **API path** for your store will not change, but it will have `/v3/` or `/v2/` appended to it, depending on which version is current for the endpoint you're querying.

The **client name** is for your convenience and is not currently required to send or receive requests.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Be careful with `client_secret`s
> Although you never want to send your `client_id`, `client_secret`, or `access_token` in plain text or an unencrypted payload, **be particularly careful with the `client_secret`.**  An attacker can use your `client_secret` to both sign and decrypt JWTs sent between you and BigCommerce.

</div>
</div>
</div>

## Obtaining store API credentials

To create a store API account, do the following:

1. Navigate to **Advanced Settings** > **API Accounts** > **Create API Account**.
2. Give the account a name, for internal reference only.
3. In the **OAuth Scopes** section, select the minimum scopes your use case requires.
4. Click **Save**.

If your save is successful, the browser displays a pop-up that contains an `access_token`, and most browsers also download a `.txt` file containing the full set of API account credentials. Save the token and `.txt` file somewhere secure. You will need the token to make API requests and the additional credentials to request new tokens. The `.txt` file also contains the base API path for your store, preconfigured for the V3 API. The API path contains your store hash. 

The API path will look something like this: 

`https://api.bigcommerce.com/stores/123456/v3/`. 

In this example, the store hash is `123456`. The store hash is part of most API requests.

To get started making requests, see [API Requests](/api-docs/getting-started/basics/making-requests).

![Create an API Account](//s3.amazonaws.com/user-content.stoplight.io/6012/1536087816482 "Create an API Account")

<!-- theme: warning -->
> #### Save your credentials
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before exiting this screen.



## Revoking store API credentials

To get started making requests, see [API Requests](https://developer.bigcommerce.com/api-docs/getting-started/basics/making-requests).

![Revoking API Credentials](//s3.amazonaws.com/user-content.stoplight.io/6012/1537388177603 "Revoking API Credentials")

<!-- theme: danger -->
> #### Delete carefully
> Deleting an account cannot be undone, so be sure before clicking the trash can icon. You can also use the checkboxes on the left side to delete multiple accounts at once – but be especially careful when using this option.



## Obtaining app API credentials

To get app API credentials, create and sign in to your BigCommerce [Developer Portal](https://devtools.bigcommerce.com) account. Navigate to **My Apps** in the top-right corner, then:

1. Click **Create an app**.  
2. Give your app a name. This name will only be visible to you.
3. Click **Create**. A pop-up box will display showing Your Profile, App Summary, and Category.

![Create an App](//s3.amazonaws.com/user-content.stoplight.io/6012/1537389767940 "Create an App")

4. Click on **Step 3 - Technical**. Fill out the App Features sections with app type, callback URLs, and scope.


![Step 3 - Technical](//s3.amazonaws.com/user-content.stoplight.io/6012/1537389883100 "Step 3 - Technical")

5. In the lower right-hand corner of the popup box, click **Update & Close**.
6. A new pop up will show asking if you want to change the OAuth scopes. Click **Confirm Update**.
7. You will be routed back to the Developer Portal home page and your app will be listed. Click **View Client ID**.

![View Client Id](//s3.amazonaws.com/user-content.stoplight.io/6012/1537390078741 "View Client Id")

8. Copy your client ID and client secret. The client ID and client secret can be accessed by clicking **View Client ID**.

<!-- theme: info -->
> #### Client ID and client secret
> The client ID value uniquely identifies your app. However, you no longer need to pass it in the header of all your requests to the API.

The client secret value is a secret that your app and BigCommerce share. You only need to pass the client secret value once, during the app installation sequence. Thereafter, BigCommerce uses it to sign payloads in load, uninstall, and remove user requests, and your app uses it to verify the signature to ensure that the request is coming from BigCommerce.


![Client Id and Client Secret](//s3.amazonaws.com/user-content.stoplight.io/6012/1537390135692 "Client Id and Client Secret")

<!-- theme: warning -->
> #### Delete apps carefully
> If you delete the app, there is no way to recover the client ID and client secret.




### Next steps

During the app installation process, your app uses the client ID and client secret to obtain an OAuth token authorized against the store installing the app. For a detailed look at this process, see [Authenticating an app](https://developer.bigcommerce.com/api-docs/apps/guide/auth).

## Use cases by credential type

|  | App API Credentials | Store API Credentials |
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

<!-- theme: danger -->
> #### Legacy API Accounts
> As of July 31, 2018, new BigCommerce stores are no longer able to create legacy API Accounts (accounts using HTTP basic auth) within their control panels. Existing legacy API Accounts will continue to work until further notice, but we strongly recommend migrating to OAuth as soon as possible.



### Benefits of migrating to OAuth:

We recommend that you migrate from legacy API credentials to OAuth. Some benefits include the following:

* **Unified requests**: Send all OAuth requests to a single URL: `https://api.bigcommerce.com`. Using a common hostname prevents any interruption of service when a store's domain or SSL changes or expires.

* **Latest and greatest APIs**: BigCommerce’s V3 APIs are accessible exclusively with OAuth.

* **Webhook subscriptions**: OAuth API accounts can subscribe to real-time event notifications using BigCommerce’s webhooks.

* **Shared secrets**: Use new APIs and endpoints that require shared secrets, including the Storefront Login API and the Storefront Current Customer identification endpoint.

* **Zippier responses**: Responses to OAuth requests use gzip compression, and less of your bandwidth.

* **Better security with granular permissions**: All OAuth tokens are scoped to specific operations and endpoints. If you suspect a breach, revoke, reissue, and get on with your day.

### How to migrate

Consider whether your application should reside within the public [App Marketplace](https://www.bigcommerce.com/apps/), where any BigCommerce merchant can quickly discover and install it. To learn more about how to set up this kind of app, see [Becoming a Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner).

If you would like to update your API connection from basic authentication to OAuth, you will need to make the following changes:

- Get an access token, by creating an API account within the control panel. Make sure the account has the correct scopes for the API endpoints you need to access. We recommend that you provide the minimum scopes that your application requires to function, as a good security practice.
- If you use one of the [client libraries](/tools-resources), follow the relevant guide within the library’s documentation for establishing an OAuth connection.
- If you have created your connection, you’ll want to update your connection parameters:
	- Where you previously used the BigCommerce store’s secure hostname, you will instead use the `https://api.bigcommerce.com` gateway URL. As an example, requests to `https://store-abc123.mybigcommerce.com/api/v2/orders/123` or `https://my-custom-store-domain.com/api/v2/orders/123` would instead go to `https://api.bigcommerce.com/stores/{store_hash}/v2/orders/123`.
- With basic auth, you use an authentication HTTP header to authenticate your connection. With OAuth, you’ll want to use the header:
	- X-Auth-Token header for your access token. For more information see the article [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

Rate limiting of API requests works differently for OAuth API connections. To become familiar with OAuth limitations, please see the [Rate Limits](https://developer.bigcommerce.com/api-docs/getting-started/basics/best-practices#best-practices_rate-limits).

## OAuth scopes

Scope limits ability to read or write to data. Set the scopes to the minimum level of access needed to accomplish the task at hand.

All OAuth scopes except `default` have `read_only` scopes that allow only `GET` and `HEAD` requests.

<!-- theme: info -->
> Webhooks are accessible from the default scope that is available when API Credentials are created.


| Scope GUI Name | Resources  | Description |
|-|-|-|
| Content | store_v2_content | View and modify store content |
||| [/v2/pages](https://developer.bigcommerce.com/api-reference/content/store-content-api) |
||| [/v2/blog](https://developer.bigcommerce.com/api-reference/content/store-content-api) |
||| [/v2/redirects](https://developer.bigcommerce.com/api-reference/content/store-content-api) |
||| /v3/widgets |
||store_v2_content_read_only| View Site Content |
||| [/v2/pages](https://developer.bigcommerce.com/api-reference/content/store-content-api) |
||| [/v2/blog](https://developer.bigcommerce.com/api-reference/content/store-content-api) |
||| [/v2/redirects](https://developer.bigcommerce.com/api-reference/content/store-content-api)  |
||| /v3/widgets |
| Checkout Content | store_content_checkout | View and modify content on checkout pages |
||| [/v3/scripts](https://developer.bigcommerce.com/api-reference/content/store-content-api) |
||store_content_checkout_read_only|View content on checkout pages|
||| [/v3/scripts](https://developer.bigcommerce.com/api-reference/content/store-content-api)|
| Customers | store_v2_customers | View and modify customer information |
||| [/v2/customers](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api) |
||| [/v2/customer_groups](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api) |
||| [/v3/customers/subscribers](https://developer.bigcommerce.com/api-reference/customer-subscribers/subscribers-api) |
||| [/v3/customers/subscribers/wishlist](https://developer.bigcommerce.com/api-reference/customer-subscribers/wishlist-api) |
||store_v2_customers_read_only|View customer information |
||| [/v2/customers](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api) |
||| [/v2/customer_groups](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api) |
||| [/v3/customers/subscribers](https://developer.bigcommerce.com/api-reference/customer-subscribers/subscribers-api) |
||| [/v3/customers/subscribers/wishlist](https://developer.bigcommerce.com/api-reference/customer-subscribers/wishlist-api) |
| Customers Login | store_v2_customers_login | Sign customers in to your storefront |
||| [Access to the Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)
| Information & Settings| store_v2_information | View and modify general store information and settings |
||| [/v2/store](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/store-information/) |
||| [/v2/time](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/time-zone/) |
|| store_v2_information_read_only | View general store information and settings |
||| [/v2/store](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/store-information/) |
||| [/v2/shipping/time](https://developer.bigcommerce.com/api-reference/store-management/store-information-api/time-zone/) |
| Marketing | store_v2_marketing | View and modify marketing information |
||| [/v2/coupons](https://developer.bigcommerce.com/api-reference/marketing/marketing-api) |
||| [/v2/gift_certificates](https://developer.bigcommerce.com/api-reference/marketing/marketing-api) |
||| [/v2/banners](https://developer.bigcommerce.com/api-reference/marketing/marketing-api) |
|| store_v2_marketing_read_only | View marketing information |
||| [/v2/coupons](https://developer.bigcommerce.com/api-reference/marketing/marketing-api) |
||| [/v2/gift_certificates](https://developer.bigcommerce.com/api-reference/marketing/marketing-api) |
||| [/v2/banners](https://developer.bigcommerce.com/api-reference/marketing/marketing-api) |
| Orders | store_v2_orders | View and modify orders |
||| [/v2/orders](https://developer.bigcommerce.com/api-reference/orders/orders-api) |
||| [/v2/order_statuses](https://developer.bigcommerce.com/api-reference/orders/orders-api) |
|| store_v2_orders_read_only | View orders |
||| [/v2/orders](https://developer.bigcommerce.com/api-reference/orders/orders-api) |
||| [/v2/order_statuses](https://developer.bigcommerce.com/api-reference/orders/orders-api) |
| Order Transactions | store_v2_transactions | View and modify order transactions |
||| [/v3/orders/{id}/transactions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api) |
|| store_v2_transactions_read_only | View order transactions |
||| [/v3/orders/{id}/transactions](https://developer.bigcommerce.com/api-reference/orders/orders-transactions-api) |
| Create Payments  | store_payments_access_token_create | Process Payments |
||| [/payments/access_tokens](https://developer.bigcommerce.com/api-reference/payments/payments-create-payment-token-api)|
| Get Payment Methods | store_payments_methods_read | Get Order Payment Methods |
||| [/payments](https://developer.bigcommerce.com/api-reference/payments/payments-process-payments)|
| Products | store_v2_products | View and modify products, brands, categories and other product information. |
||| [/v3/catalog](https://developer.bigcommerce.com/api-reference/catalog/catalog-api) |
||| [/v3/pricelists](https://developer.bigcommerce.com/api-reference/price-lists/pricelists-api) |
|| store_v2_products_read_only | View products |
||| [/v3/catalog](https://developer.bigcommerce.com/api-reference/catalog/catalog-api) |
||| [/v3/pricelists](https://developer.bigcommerce.com/api-reference/price-lists/pricelists-api) |
| Themes | store_themes_manage | View and modify themes |
||| [/v3/themes](https://developer.bigcommerce.com/api-reference/themes/themes-api) |
|| store_themes_read_only | View themes |
||| [/v3/themes](https://developer.bigcommerce.com/api-reference/themes/themes-api) |
| Carts | store_cart | View and Modify carts |
||| [/v3/carts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api) |
|| store_cart_read_only | View Carts |
||| [/v3/carts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api) |
| Checkouts | store_checkout | View and modify a checkout |
||| [/v3/checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api) |
|| store_checkout_read_only | View checkout content |
||| [/v3/checkouts](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api) |
| Sites & Routes | store_sites | View and modify sites and routes |
||| [/v3/channels/{channel_id}/site](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) |
||| [/v3/sites/{site_id}/routes](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) |
|| store_sites_read_only | View external storefronts with Non-BigCommerce URLs |
||| [/v3/channels/{channel_id}/site](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) |
||| [/v3/sites/{site_id}/routes](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) |
| Channel Settings | store_channel_settings | View and modify a list of channels |
||| [/v3/channels](/api-reference/store-management/channels) |
|| store_channel_settings_read_only | View a list of channels |
||| [/v3/channels](/api-reference/store-management/channels) |
| Channel Listings | store_channel_listings | View and modify a list of all channel listings for a particular channel |
||| [/v3/channels/listings](/api-reference/store-management/channels) |
|| store_channel_listings_read_only | View a list of all channel listings for a particular channel |
||| [/v3/channels/listings](/api-reference/store-management/channels) |
| Storefront API Tokens | store_storefront_api | Create a storefront API token |
||| [/v3/storefront/api-token](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-api-token)
| Storefront API Customer Impersonation Tokens | store_storefront_api_customer_impersonation | Create a storefront API token that allows for customer impersonation |
||| [/v3/storefront/api-token-customer-impersonation](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-api-token) |

## Resources
* [Building An App](/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Rate Limits](/api-docs/getting-started/best-practices#best-practices_rate-limits)
