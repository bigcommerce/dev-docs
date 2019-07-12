<h1>Authentication</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#authentication_getting-api-credentials"> Obtaining Store API Credentials </a></li>
		<li><a href="#authentication_revoking-api-credentials"> Revoking Store API Credentials</a></li>
		<li><a href="#authentication_client-id-secret"> Obtaining App API Credentials</a></li>
		<li><a href="#authentication_when-to-use"> Use Cases by Credential Type</a></li>
    <li><a href="#authentication_migration-legacy-oauth">Migrating from Legacy to OAuth</a></li>
		<li><a href="#authentication_oauth-scopes"> OAuth Scopes</a></li>
	</ul>
</div>

<a href='#authentication_what-are-oauth-credentials' aria-hidden='true' class='block-anchor'  id='authentication_what-are-oauth-credentials'><i aria-hidden='true' class='linkify icon'></i></a>

Two types of API credentials are available to developers wishing to make requests against BigCommerce APIs:

1. Store API Credentials (created in a store's control panel)
2. App API Credentials (created in the [Developer Portal](https://devtools.bigcommerce.com))

**Store API Credentials** are generated when a Store API Account is created in a store's control panel (**Advanced Settings** > **API Accounts**). These credentials are used to programmatically interact with an individual store's data using BigCommerce's APIs. Both OAuth and token-based authentication are possible with Store API Credentials

Developers can also create **App API Credentials** in the BigCommerce [Developer Portal](https://devtools.bigcommerce.com). App API Credentials are used during the OAuth flow to request authorization “on behalf” of a store owner, allowing the app to make API requests against store data. App API Credentials are OAuth only, and the store owner must install the app before the app is granted access to the store. 

---

<a href='#authentication_getting-api-credentials' aria-hidden='true' class='block-anchor'  id='authentication_getting-api-credentials'><i aria-hidden='true' class='linkify icon'></i></a>

## Obtaining Store API Credentials

To generate store API Credentials, log into the store, then:

1. Navigate to **Advanced Settings** > **API Accounts** > **Create API Account**. 
2. Give the account a name (internal only).
6. In the OAuth Scopes section, select the minimum scopes the app will require.
7. Select **Save**. 

A successful save will display a pop-up containing the API credentials that your app will need to run authenticated requests – your Client ID and Access Token. A `.txt` file containing the same credentials will (on most browsers) automatically download to your computer. This file also contains the base API Path for your store, preconfigured for the v3 API.

The base api path will look something like this: `https://api.bigcommerce.com/stores/123456/`. In the base path, the store hash is the `123456`. This will be used to make API requests.

To get started making requests, see [API Requests](/api-docs/getting-started/basics/making-requests).

<!--
    title: #### Create an API Account

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1536087816482
-->

#### Create an API Account
![#### Create an API Account
](//s3.amazonaws.com/user-content.stoplight.io/6012/1536087816482 "#### Create an API Account
")

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Save your credentials
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen. 

</div>
</div>
</div>

---

<a href='#authentication_revoking-api-credentials' aria-hidden='true' class='block-anchor'  id='authentication_revoking-api-credentials'><i aria-hidden='true' class='linkify icon'></i></a>

## Revoking Store API Credentials

To revoke Store API Credentials:
1. Log into the store, using the store owner’s username/password.
2. Select **Advanced Settings**.
3. Select **API Accounts**. This will display the Store API Accounts page, shown below.
4. In the Actions column at right, select the trash-can button next to the account you want to delete.

<!--
    title: #### Revoking API Credentials

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1537388177603
-->

#### Revoking API Credentials
![#### Revoking API Credentials
](//s3.amazonaws.com/user-content.stoplight.io/6012/1537388177603 "#### Revoking API Credentials
")

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Delete Carefully
> There is no undo, so be sure before you delete an account. You can also use the checkboxes on the left side to delete multiple accounts at once – but be especially careful when using this option.

</div>
</div>
</div>

---

<a href='#authentication_client-id-secret' aria-hidden='true' class='block-anchor'  id='authentication_client-id-secret'><i aria-hidden='true' class='linkify icon'></i></a>

## Obtaining App API Credentials

To get App API Credentials, login to (or create) your BigCommerce [Developer Portal](https://devtools.bigcommerce.com) account. Navigate to **My Apps** (top-right corner), then:

1. Click **Create an app**  
2. Give your app a name (only be visible to you)
3. Click **Create** (a pop up box will display showing Your Profile, App Summary and Category)

<!--
    title: #### Create an App

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1537389767940
-->

#### Create an App
![#### Create an App
](//s3.amazonaws.com/user-content.stoplight.io/6012/1537389767940 "#### Create an App
")

4. Click on **Step 3 - Technical**. Fill out the App Features sections with App Type, Callback URLs and Scope.

<!--
    title: #### Step 3 - Technical

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1537389883100
-->

#### Step 3 - Technical
![#### Step 3 - Technical
](//s3.amazonaws.com/user-content.stoplight.io/6012/1537389883100 "#### Step 3 - Technical
")

5. In the lower right-hand corner of the popup box, click **Update & Close**.
6. A new pop up will show asking if you want to change the OAuth Scopes. Click **Confirm Update**.
7. You will be routed back to the Dev Tools home page and your app will be listed. Click **View Client ID**. 

<!--
    title: #### View Client Id

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1537390078741
-->

#### View Client Id
![#### View Client Id
](//s3.amazonaws.com/user-content.stoplight.io/6012/1537390078741 "#### View Client Id
")

9. Copy your Client ID and Client Secret. The Client ID and Client Secret can be accessed at any time by clicking **View Client ID**. 

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Client ID and Client Secret
> The Client ID value uniquely identifies your app. You will need to pass it in the header of all your requests to the API.

The Client Secret value is a secret that your app and BigCommerce share. You only need to pass the Client Secret value once, during the app installation sequence. Thereafter, BigCommerce uses it to sign payloads in load, uninstall, and remove user requests, and your app uses it to verify the signature to ensure that the request is coming from BigCommerce.

</div>
</div>
</div>

<!--
    title: #### Client Id and Client Secret

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1537390135692
-->

#### Client Id and Client Secret
![#### Client Id and Client Secret
](//s3.amazonaws.com/user-content.stoplight.io/6012/1537390135692 "#### Client Id and Client Secret
")

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Delete apps carefully
> If you delete the app, there is no way to recover the Client Id and Client Secret.

</div>
</div>
</div>

### Next Steps

During the app installation process, your app will use the Client Id and Client Secret to obtain an Oauth token authorized against the store installing the app. For a detailed look at this process, see [Building an App](/api-docs/getting-started/building-apps-bigcommerce/building-apps).

---

<a href='#authentication_when-to-use' aria-hidden='true' class='block-anchor'  id='authentication_when-to-use'><i aria-hidden='true' class='linkify icon'></i></a>

## Use Cases by Credential Type

|  | App API Credentials | Store API Credentials|
|---|:---:|:---:|
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

---

<a href='#authentication_migration-legacy-oauth' aria-hidden='true' class='block-anchor'  id='authentication_migration-legacy-oauth'><i aria-hidden='true' class='linkify icon'></i></a>

## Migrating from Legacy to OAuth

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Legacy API Accounts
> As of July 31, 2018, new BigCommerce stores are no longer able to create Legacy API Accounts (accounts using HTTP Basic Auth) within their control panels. Existing Legacy API Accounts will continue to work until further notice, but we strongly recommend migrating to OAuth as soon as possible.

</div>
</div>
</div>

### Migrating to OAuth comes with several benefits:

* All OAuth requests are sent to a common hostname: `https://api.bigcommerce.com`. Using a single hostname prevents any interruption of service when the domain or SSL on a particular store changes or expires.

* All of BigCommerce’s newest V3 APIs are exclusively available via OAuth.

* OAuth API accounts have access to subscribe to BigCommerce’s Webhooks for real-time event notifications

* The ability to use new APIs that require a shared secret, such as the Storefront Login API or the Storefront Current Customer identification endpoint.

* Gzip compression on API responses to reduce bandwidth usage

* Better security as all OAuth tokens are scoped to particular endpoints

### How to Migrate

First, consider whether your application should reside within the public App Marketplace, where any BigCommerce merchant can quickly discover and install it. To learn more about how to set up this kind of app, see [Becoming a Partner](/api-docs/partner/becoming-a-partner).

If you would like to update your API connection from Basic Authentication to OAuth, you will need to make the following changes:

- Get a Client ID and an Access Token, by creating an API Account within the control panel. You’ll want to make sure the account has the correct Scopes for the API endpoints you need to access. We recommend that you provide the minimum scopes that your application requires to function, as a good security practice.
- If you use one of the Client Libraries, follow the relevant guide (within the library’s documentation) for establishing an OAuth connection.
- If you have created your connection, you’ll want to update your connection parameters:
	- Where you previously used the BigCommerce store’s secure hostname, you will instead use the `https://api.bigcommerce.com` gateway URL.
As an example, requests to `https://store-abc123.mybigcommerce.com/api/v2/orders/123` or `https://my-custom-store-domain.com/api/v2/orders/123 `would instead go to `https://api.bigcommerce.com/stores/{store_hash}/v2/orders/123`.
- With Basic Auth, you use an Authentication HTTP Header to authenticate your connection. With OAuth, you’ll want to use two headers:
	- X-Client-Id for your Client ID
	- X-Auth-Token header for your Access Token. You can read more [here](/api-docs/getting-started/basics/authentication#authentication_what-are-oauth-credentials-1).

Rate limiting of API requests works differently for OAuth API connections. To become familiar with the OAuth system, please see the [Rate Limits](/api-docs/getting-started/basics/best-practices#best-practices_rate-limits).

---

<a href='#authentication_oauth-scopes' aria-hidden='true' class='block-anchor'  id='authentication_oauth-scopes'><i aria-hidden='true' class='linkify icon'></i></a>

## OAuth Scopes

Scope limits ability to read or write to data. Set the scope to the minimum level needed to accomplish the task at hand.

All OAuth scopes except `default` have `read_only` scopes that allow only `GET` and `HEAD` requests.

- Webhooks are accessible from the default scope that is available when API Credentials are created.

| Scope GUI Name | Resources  | Description |
|---|---|---|
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
| Customers | store_v2_customers | View and modify customer information |
||| [/v2/customers](/api-reference/customer-subscribers/customers-api) |
||| [/v2/customer_groups](/api-reference/customer-subscribers/customers-api) |
||| [/v3/customers/subscribers](/api-reference/customer-subscribers/subscribers-api) |
||store_v2_customers_read_only|View customer information |
||| [/v2/customers](/api-reference/customer-subscribers/customers-api) |
||| [/v2/customer_groups](/api-reference/customer-subscribers/customers-api) |
||| [/v3/customers/subscribers](/api-reference/customer-subscribers/subscribers-api) |
| Customers Login | store_v2_customers_login | Log in customers to your storefront |
||| [Access to the Customer Login API](/api-docs/customers/customer-login-api)
| Information & Settings| store_v2_information | View and modify general store information and settings |
||| [/v2/shipping/methods](/api-reference/shipping/shipping-api) |
||| [/v2/shipping/zones](/api-reference/shipping/shipping-api) |
||| [/v2/shipping/carrier](/api-reference/shipping/shipping-api) |
|| store_v2_information_read_only | View general store information and settings |
||| [/v2/shipping/methods](/api-reference/shipping/shipping-api) |
||| [/v2/shipping/zones](/api-reference/shipping/shipping-api) |
||| [/v2/shipping/carrier](/api-reference/shipping/shipping-api) |
||| [/v2/payments/methods](/api-reference/shipping/shipping-api) |
||| [/v2/tax_classes](/api-reference/store/tax-classes-api) |
||| [/v2/store](/api-reference/store/store-information-api) |
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
| Order Transactions | store_v2_transactions_read_only | View order transactions |
||| [/v3/orders/{id}/transactions](/api-reference/orders/orders-transactions-api) |
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
| Create Payments  | store_payments_access_token_create | Process Payments |
| | | [/payments/access_tokens](/api-reference/payments/payments-create-payment-token-api)|
| Get Payment Methods | store_payments_methods_read | Get Order Payment Methods |
| | | [/payments](/api-reference/payments/payments-process-payments)|

---

## Resources
* [Building An App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Rate Limts](https://developer.bigcommerce.com/api-docs/getting-started/best-practices#best-practices_rate-limits)
