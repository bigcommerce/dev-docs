# Authenticating BigCommerce's REST APIs

<div class="otp" id="no-index">

### On This Page
- [Obtaining store API credentials](#obtaining-store-api-credentials)
- [Revoking store API credentials](#revoking-store-api-credentials)
- [Obtaining app API credentials](#obtaining-app-api-credentials)
- [Use cases by credential type](#use-cases-by-credential-type)
- [Migrating from legacy to OAuth](#migrating-from-legacy-to-oauth)
- [OAuth scopes](#oauth-scopes)
- [Resources](#resources)

</div>

Two types of API credentials are available to developers wishing to make requests against BigCommerce's REST APIs.

### Store API credentials

Store API credentials are generated when a store API account is created in a store's control panel (**Advanced Settings** > **API Accounts**). You can use these credentials to programmatically interact with an individual store's data using BigCommerce's APIs. Both OAuth and token-based authentication are possible with store API credentials.

### App API credentials

Developers can create app API credentials in the BigCommerce [Developer Portal](https://devtools.bigcommerce.com). App API credentials are used during the OAuth flow to request authorization “on behalf” of a store owner, allowing the app to make API requests against store data. App API credentials are OAuth only, and the store owner must install the app before the app is granted access to the store.

## Obtaining store API credentials

The following steps outline how to generate store API Credentials.

1. Navigate to **Advanced Settings** > **API Accounts** > **Create API Account**.
2. Give the account a name (it will only be visible to store users).
3. In the **OAuth Scopes** section, select the minimum scopes the app will require.
4. Select **Save**.

A successful save will display a pop-up containing an Access Token. Your app will need this credential to run authenticated requests. A `.txt` file containing the same credentials will (on most browsers) automatically download to your computer. This file also contains the base API Path for your store, preconfigured for the V3 API.

The base API path will look something like this: 

`https://api.bigcommerce.com/stores/123456/`. 

In the base path, the store hash is the `123456`. You will use this to make API requests.

To get started making requests, see [API Requests](/api-docs/getting-started/basics/making-requests).

![#### Create an API Account](//s3.amazonaws.com/user-content.stoplight.io/6012/1536087816482 "#### Create an API Account")

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Save your credentials
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before exiting this screen.

</div>
</div>
</div>

## Revoking store API credentials

To revoke Store API Credentials:
1. Log into the store, using the store owner’s username/password.
2. Navigate to **Advanced Settings** > **API Accounts** and click the check box next to the account you want to delete.
3. In the Actions column at right, click the trash can icon.

![#### Revoking API Credentials](//s3.amazonaws.com/user-content.stoplight.io/6012/1537388177603 "#### Revoking API Credentials")

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">

<!-- theme: error -->

### Delete carefully
> Deleting an account cannot be undone, so be sure before clicking the trash can icon. You can also use the checkboxes on the left side to delete multiple accounts at once – but be especially careful when using this option.

</div>
</div>
</div>

## Obtaining app API credentials

To get app API credentials, create and log into your BigCommerce [Developer Portal](https://devtools.bigcommerce.com) account. Navigate to **My Apps** in the top-right corner, then:

1. Click **Create an app**.  
2. Give your app a name. This name will only be visible to you.
3. Click **Create**. A pop-up box will display showing Your Profile, App Summary, and Category.

![#### Create an App](//s3.amazonaws.com/user-content.stoplight.io/6012/1537389767940 "#### Create an App")

4. Click on **Step 3 - Technical**. Fill out the App Features sections with app type, callback URLs, and scope.

#### Step 3 - Technical
![#### Step 3 - Technical](//s3.amazonaws.com/user-content.stoplight.io/6012/1537389883100 "#### Step 3 - Technical")

5. In the lower right-hand corner of the popup box, click **Update & Close**.
6. A new pop up will show asking if you want to change the OAuth scopes. Click **Confirm Update**.
7. You will be routed back to the Dev Tools home page and your app will be listed. Click **View Client ID**.

![#### View Client Id](//s3.amazonaws.com/user-content.stoplight.io/6012/1537390078741 "#### View Client Id")

8. Copy your client ID and client secret. The client ID and client secret can be accessed by clicking **View Client ID**.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

### Client ID and client secret
> The client ID value uniquely identifies your app. However, you no longer need to pass it in the header of all your requests to the API.

The client secret value is a secret that your app and BigCommerce share. You only need to pass the client secret value once, during the app installation sequence. Thereafter, BigCommerce uses it to sign payloads in load, uninstall, and remove user requests, and your app uses it to verify the signature to ensure that the request is coming from BigCommerce.

</div>
</div>
</div>

![#### Client Id and Client Secret](//s3.amazonaws.com/user-content.stoplight.io/6012/1537390135692 "#### Client Id and Client Secret")

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Delete apps carefully
> If you delete the app, there is no way to recover the client ID and client secret.

</div>
</div>
</div>


### Next steps

During the app installation process, your app will use the client ID and client secret to obtain an OAuth token authorized against the store installing the app. For a detailed look at this process, see [Building an App](/api-docs/getting-started/building-apps-bigcommerce/building-apps).

## Use cases by credential type

| App API Credentials | Store API Credentials|
|-|-|
| From Dev Tools| X | |
|From Store Control Panel| | X |
| Single Click Apps (Marketplace)| X | |
| Private Apps | X |
| Hidden Apps | X | |
| Connector Apps | | X |
|Scripts| | X |
|Testing | | X |
| V2 | X | X |
| V3 | X | X |
|Webhooks | X | X |

## Migrating from legacy to OAuth

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">

<!-- theme: error -->

### Legacy API Accounts
> As of July 31, 2018, new BigCommerce stores are no longer able to create legacy API Accounts (accounts using HTTP basic auth) within their control panels. Existing legacy API Accounts will continue to work until further notice, but we strongly recommend migrating to OAuth as soon as possible.

</div>
</div>
</div>

### Benefits of migrating to OAuth:

It is recommended you migrate from using legacy API credentials to OAuth. Some benefits include the following:

* All OAuth requests are sent to a common hostname: `https://api.bigcommerce.com`. Using a single hostname prevents any interruption of service when the domain or SSL on a particular store changes or expires.

* All of BigCommerce’s newest V3 APIs are exclusively available via OAuth.

* OAuth API accounts have access to subscribe to BigCommerce’s Webhooks for real-time event notifications.

* You can use new APIs that require a shared secret, such as the Storefront Login API or the Storefront Current Customer identification endpoint.

* Gzip compression on API responses reduce bandwidth usage.

* Requests are more secure, as all OAuth tokens are scoped to particular endpoints.

### How to migrate

Consider whether your application should reside within the public (App Marketplace)[https://www.bigcommerce.com/apps/], where any BigCommerce merchant can quickly discover and install it. To learn more about how to set up this kind of app, see [Becoming a Partner](/api-docs/partner/becoming-a-partner).

If you would like to update your API connection from basic authentication to OAuth, you will need to make the following changes:

- Get an access token, by creating an API account within the control panel. Make sure the account has the correct scopes for the API endpoints you need to access. We recommend that you provide the minimum scopes that your application requires to function, as a good security practice.
- If you use one of the [client libraries](https://developer.bigcommerce.com/tools-resources), follow the relevant guide within the library’s documentation for establishing an OAuth connection.
- If you have created your connection, you’ll want to update your connection parameters:
	- Where you previously used the BigCommerce store’s secure hostname, you will instead use the `https://api.bigcommerce.com` gateway URL. As an example, requests to `https://store-abc123.mybigcommerce.com/api/v2/orders/123` or `https://my-custom-store-domain.com/api/v2/orders/123` would instead go to `https://api.bigcommerce.com/stores/{store_hash}/v2/orders/123`.
- With basic auth, you use an authentication HTTP header to authenticate your connection. With OAuth, you’ll want to use the header:
	- X-Auth-Token header for your access token. For more information see the article [Authentication](/api-docs/getting-started/authentication).

Rate limiting of API requests works differently for OAuth API connections. To become familiar with OAuth limitations, please see the [Rate Limits](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits).

## OAuth scopes

Scope limits ability to read or write to data. Set the scopes to the minimum level of access needed to accomplish the task at hand.

All OAuth scopes except `default` have `read_only` scopes that allow only `GET` and `HEAD` requests.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

> Webhooks are accessible from the default scope that is available when API Credentials are created.
</div>
</div>
</div>

| Scope GUI Name | Resources  | Description |
|-|-|-|
| Content | store_v2_content | View and modify store content |
||| [/v2/pages](/api-reference/content/store-content-api) |
||| [/v2/blog](/api-reference/content/store-content-api) |
||| [/v2/redirects](/api-reference/content/store-content-api) |
||| /v3/widgets |
||store_v2_content_read_only| View Site Content |
||| [/v2/pages](/api-reference/content/store-content-api) |
||| [/v2/blog](/api-reference/content/store-content-api) |
||| [/v2/redirects](/api-reference/content/store-content-api)  |
||| /v3/widgets |
| Checkout Content | store_content_checkout | View and modify content on checkout pages |
||| [/v3/scripts](/api-reference/content/store-content-api) |
||store_content_checkout_read_only|View content on checkout pages|
||| [/v3/scripts](/api-reference/content/store-content-api)|
| Customers | store_v2_customers | View and modify customer information |
||| [/v2/customers](/api-reference/customer-subscribers/customers-api) |
||| [/v2/customer_groups](/api-reference/customer-subscribers/customers-api) |
||| [/v3/customers/subscribers](/api-reference/customer-subscribers/subscribers-api) |
||| [/v3/customers/subscribers/wishlist](/api-reference/customer-subscribers/wishlist-api) |
||store_v2_customers_read_only|View customer information |
||| [/v2/customers](/api-reference/customer-subscribers/customers-api) |
||| [/v2/customer_groups](/api-reference/customer-subscribers/customers-api) |
||| [/v3/customers/subscribers](/api-reference/customer-subscribers/subscribers-api) |
||| [/v3/customers/subscribers/wishlist](/api-reference/customer-subscribers/wishlist-api) |
| Customers Login | store_v2_customers_login | Log in customers to your storefront |
||| [Access to the Customer Login API](/api-docs/customers/customer-login-api)
| Information & Settings| store_v2_information | View and modify general store information and settings |
||| [/v2/store](/api-reference/store-management/store-information-api/store-information/) |
||| [/v2//time](/api-reference/store-management/store-information-api/time-zone/) |
|| store_v2_information_read_only | View general store information and settings |
||| [/v2/store](/api-reference/store-management/store-information-api/store-information/) |
||| [/v2/shipping/time](/api-reference/store-management/store-information-api/time-zone/) |
| Marketing | store_v2_marketing | View and modify marketing information |
||| [/v2/coupons](/api-reference/marketing/marketing-api) |
||| [/v2/gift_certificates](/api-reference/marketing/marketing-api) |
||| [/v2/banners](/api-reference/marketing/marketing-api) |
|| store_v2_marketing_read_only | View marketing information |
||| [/v2/coupons](/api-reference/marketing/marketing-api) |
||| [/v2/gift_certificates](/api-reference/marketing/marketing-api) |
||| [/v2/banners](/api-reference/marketing/marketing-api) |
| Orders | store_v2_orders | View and modify orders |
||| [/v2/orders](/api-reference/orders/orders-api) |
||| [/v2/order_statuses](/api-reference/orders/orders-api) |
|| store_v2_orders_read_only | View orders |
||| [/v2/orders](/api-reference/orders/orders-api) |
||| [/v2/order_statuses](/api-reference/orders/orders-api) |
| Order Transactions | store_v2_transactions | View and modify order transactions |
||| [/v3/orders/{id}/transactions](/api-reference/orders/orders-transactions-api) |
|| store_v2_transactions_read_only | View order transactions |
||| [/v3/orders/{id}/transactions](/api-reference/orders/orders-transactions-api) |
| Create Payments  | store_payments_access_token_create | Process Payments |
||| [/payments/access_tokens](/api-reference/payments/payments-create-payment-token-api)|
| Get Payment Methods | store_payments_methods_read | Get Order Payment Methods |
||| [/payments](/api-reference/payments/payments-process-payments)|
| Products | store_v2_products | View and modify products, brands, categories and other product information. |
||| [/v3/catalog](/api-reference/catalog/catalog-api) |
||| [/v3/pricelists](/api-reference/price-lists/pricelists-api) |
|| store_v2_products_read_only | View products |
||| [/v3/catalog](/api-reference/catalog/catalog-api) |
||| [/v3/pricelists](/api-reference/price-lists/pricelists-api) |
| Themes | store_themes_manage | View and modify themes |
||| [/v3/themes](/api-reference/themes/themes-api) |
|| store_themes_read_only | View themes |
||| [/v3/themes](/api-reference/themes/themes-api) |
| Carts | store_cart | View and Modify carts |
||| [/v3/carts](/api-reference/cart-checkout/storefront-cart-api) |
|| store_cart_read_only | View Carts |
||| [/v3/carts](/api-reference/cart-checkout/storefront-cart-api) |
| Checkouts | store_checkout | View and modify a checkout |
||| [/v3/checkouts](/api-reference/cart-checkout/storefront-checkout-api) |
|| store_checkout_read_only | View checkout content |
||| [/v3/checkouts](/api-reference/cart-checkout/storefront-checkout-api) |
| Sites & Routes | store_sites | View and modify sites and routes |
||| [/v3/channels/{channel_id}/site](/api-reference/cart-checkout/sites-routes-api) |
||| [/v3/sites/{site_id}/routes](/api-reference/cart-checkout/sites-routes-api) |
|| store_sites_read_only | View external storefronts with Non-BigCommerce URLs |
||| [/v3/channels/{channel_id}/site](/api-reference/cart-checkout/sites-routes-api) |
||| [/v3/sites/{site_id}/routes](/api-reference/cart-checkout/sites-routes-api) |
| Channel Settings | store_channel_settings | View and modify a list of channels |
||| [/v3/channels](/api-reference/cart-checkout/channels-listings-api) |
|| store_channel_settings_read_only | View a list of channels |
||| [/v3/channels](/api-reference/cart-checkout/channels-listings-api) |
| Channel Listings | store_channel_listings | View and modify a list of all channel listings for a particular channel |
||| [/v3/channels/listings](/api-reference/cart-checkout/channels-listings-api) |
|| store_channel_listings_read_only | View a list of all channel listings for a particular channel |
||| [/v3/channels/listings](/api-reference/cart-checkout/channels-listings-api) |
| Storefront API Tokens | store_storefront_api | Create a storefront API token |
||| [/v3/storefront/api-token](/api-reference/cart-checkout/storefront-api-token)
| Storefront API Customer Impersonation Tokens | store_storefront_api_customer_impersonation | Create a storefront API token that allows for customer impersonation |
||| [/v3/storefront/api-token-customer-impersonation](/api-reference/cart-checkout/storefront-api-token) |

## Resources
* [Building An App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Rate Limits](https://developer.bigcommerce.com/api-docs/getting-started/best-practices#best-practices_rate-limits)
