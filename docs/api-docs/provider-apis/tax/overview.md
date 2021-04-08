# Tax Provider API

<div class="otp" id="no-index">

### On this Page

- [Obtaining an app ID](#obtaining-an-app-id)
- [Sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce)
- [Building the app](#building-the-app)
- [Installing the app](#installing-the-app)
- [Establishing a connection](#establishing-a-connection)
- [Enabling tax providers in the control panel](#enabling-tax-providers-in-the-control-panel)
- [Tax estimation](#tax-estimation)
- [Document submission](#document-submission)
- [Testing](#testing)
- [Support](#support)
- [Related resources](#related-resources)

</div>

The [Tax Provider API](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api) allows you to provide business-to-consumer sales tax estimates to shoppers on the storefront and to merchants in the control panel; it can also be used to submit documents for tax reconciliation purposes.

The [Tax Provider API](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api) works in conjunction with a BigCommerce app, so you will need to [build an app](https://developer.bigcommerce.com/api-docs/apps/guide/intro) that integrates the [Tax Provider API](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api).

Multi-tenant tax providers can choose to publish their BigCommerce app so that it's discoverable by anyone, or publish their app as unlisted so that it can only be installed via URL. Furthermore, tax solutions that have been built in-house or for specific merchants by digital agencies are also supported as private instances, and will only work on the stores specified.

## Obtaining an app ID

To get your app ID, start creating an app in the [Developer Portal](https://devtools.bigcommerce.com/), and fill out the information on [Step 3 Technical](https://developer.bigcommerce.com/api-docs/apps/guide/publishing#add-technical-information). In the URL, you will see your unique app ID.

[Learn more about finding your app's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id).

## Sharing provider details with BigCommerce

Once you've obtained your app ID, please share your app ID as well as the below information with BigCommerce by emailing [taxproviderapi@bigcommerce.com](mailto:taxproviderapi@bigcommerce.com). This allows us to create your tax provider configuration, which will take approximately 5 days.

Once your tax provider configuration is ready, we'll let you know via email. The email will also include your `provider_id` which is required when [establishing a connection](#establishing-a-connection) with the [Tax Provider API](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api).

</br>

|Tax Provider Details              |Required / Optional            |Value(s)                     |Description                                                                                           |Example                                           |
| ------------------------------------- | ------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| App ID                                | Required                       | Integer                      | Tells us which provider config to use after the app is installed.                                     | `123456`                                          |
| Tax provider name                     | Required                       | String                       | Displayed in the BigCommerce control panel (like in **Store Setup > Tax > Add Tax Service**).             | `Sample Tax`                                      |
| Tax provider type                     | Required                       | Production, Sandbox             | Hierarchy of your provider (Production is primary and Sandbox is secondary, see [sandbox tax provider configuration](#sandbox-tax-provider-configuration) for more information.               | `Production`                                      |
| Merchant support email                | Optional                       | Email                        | Displayed in the BigCommerce control panel in **Store Setup > Tax > Tax Provider**.                       | `support@sampletax.example.com`                   |
| Merchant support URL                  | Optional                       | URL                          | Displayed in the BigCommerce control panel in **Store Setup > Tax > Tax Provider**.                        | `sampletax.example.com/support`                   |
| **Coverage**                          |                                |                              |                                                                                                       |                                                   |
| Tax provider visibility               | Required                       | Show, Hide                   | Tells us if your tax provider should be displayed to users in the BigCommerce control panel.          | `Show`                                            |
| Supported store(s)                    | Required                       | All stores, Private instance | Tells us which stores your tax provider is supported on.                                              | `All stores`                                      |
| Supported store(s) - private instance | Required (if private instance) | Store hashes                 | Test store hashes that are supported by your tax provider (if private instance).                      | `dwvjntfqv,epq54yymgq`                            |
| Supported / unsupported countries     | Required                       | ISO 3166-1 alpha-2           | Comma separated ISO 3166-1 alpha-2 country codes for supported countries.                             | `US,CA,GB,FR,AU,NZ`                               |
| **URLs**                              |                                |                              |                                                                                                       |                                                   |
| Estimate URL                          | Required                       | URL                          | URL BigCommerce should use for Tax Provider API estimate requests.                                    | `https://sampletax.example.com/tax/estimate`      |
| Commit URL                            | Optional                       | URL                          | URL BigCommerce should use for Tax Provider API quote requests.                                       | `https://sampletax.example.com/doc/commit`        |
| Adjust URL                            | Optional                       | URL                          | URL BigCommerce should use for Tax Provider API quote requests.                                       | `https://sampletax.example.com/doc/adjust`        |
| Void URL                              | Optional                       | URL                          | URL BigCommerce should use for Tax Provider API quote requests.                                       | `https://sampletax.example.com/doc/void`          |
| **Testing**                               |                                |                              |                                                                                                       |                                                   |
| Partner test store domain(s)          | Required                       | Domain name                  | Share your test store domain(s) sow we can test prior to launching your tax provider.                 | `https://sampletax-test-store.mybigcommerce.com/` |

### Sandbox tax provider configuration

Sandbox tax provider configurations are nested within your production tax provider configuration, as such tax providers requiring a sandbox tax provider configuration should also provide the details for their production tax provider configuration.

Additionally, when providing the details for a sandbox tax provider configuration, it's unncessary to specify the below properties because they are inherited from the parent production tax provider configuration (all other properties are still required):

* Supported store(s)
* Supported store hash(es) (in the case tax provider is a private instance)
* Supported / supported countries

Tax providers can create multiple sandbox tax providers within their production tax provider configuration, for example a tax provider could have a development and a test sandbox tax provider nested within their production tax provider configuration.

## Building the app

Tax providers are required to build a BigCommerce [single-click app](https://developer.bigcommerce.com/api-docs/apps/guide/types#single-click) in order to utilise the Tax Provider API to provide tax estimates and submit tax documents. A BigCommerce single-click app provides many benefits, for example, it enables tax providers to promote their solution in the BigCommerce apps marketplace, ask for merchant authorisation of API scopes during app install, as well as enable configuration of tax provider settings via an iFrame in the BigCommerce control panel.

Review our [introduction to building apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro) guide and use the sidebar to explore topics including: types of apps, managing apps in the dev portal, implementing OAuth, and designing the UI.

Make sure to also review our [app development best practices](https://developer.bigcommerce.com/api-docs/apps/guide/best-practices) for some tips.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * If you have registered your app in the Developer Portal but have not submitted it for approval because it's still in development, the app will be in a Draft state. This means your app can only be installed on stores owned by the same email address as the Developer Portal account email.

</div>
</div>
</div>

## Installing the app

Once the merchant clicks **Install** on a tax providers single-click app, it's essential the app successfully handles the OAuth flow before moving onto the next step of establishing a connection with the [Tax Provider API](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api). This [OAuth summary](https://developer.bigcommerce.com/api-docs/apps/guide/auth#oauth-summary) provides an overview of the OAuth flow.

When handling the OAuth flow, tax providers must ensure their app is requesting read and write permissions on the **Information and Settings** API scopes. Additionally, the tax provider should store the **client_id** and **access_token** that are received. Both are required later when [establishing a connection with the Tax Provider API](#establishing-a-connection-with-the-tax-provider-api).

## Establishing a connection

A tax provider is ready to establish a connection with the Tax Provider API when all of the below are true:

* Tax provider has shared their tax provider details with BigCommerce via email, and we've replied confirming the tax provider configuration is now ready on all supplied merchant and/or partner test stores (see [Sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce)).
* BigCommerce has shared the `provider_id` of the tax provider configuration with the tax provider via email (see [Sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce)).
* Tax provider has built a draft app and it successfully handles the OAuth flow during app installation (see [Building the app](#building-the-app)).
* During the OAuth flow the app requested the merchant to authorise read and write permissions on the Information and Settings API scopes (see [Installing the app](#installing-the-app)).
* During the OAuth flow the `client_id` and `access_token` was received and stored by the tax provider (see [Installing the app](#installing-the-app)).

For context, the [Tax Provider API Connection endpoints](https://developer.bigcommerce.com/api-reference/store-management/tax) provide an added layer of security for tax providers. They're used to set basic authentication credentials for the tax provider and these basic credentials are used to authenticate each API request to the tax provider from the associated store.

If the tax provider supports all eligible stores, then they may choose to provide an account registration flow in their app iFrame in order to capture these basic authentication credentials from merchants. Learn more about designing the app UI [here](https://developer.bigcommerce.com/api-docs/apps/guide/ui).

If the tax provider is a private instance, then they may choose to provide the basic authentication credentials themselves.

In either case, the [Update Connection](https://developer.bigcommerce.com/api-reference/store-management/tax/tax-provider-connection/provider-connection-put) endpoint should be called after the tax provider's app has been successfully installed. Tax providers will need to include `store_hash`, `provider_id`, `X-Auth-Client` (`client_id`) and `X-Auth-Token`(`access_token`) values.

We recommend calling the [Update Connection](https://developer.bigcommerce.com/api-reference/store-management/tax/tax-provider-connection/provider-connection-put) endpoint immediately after the app has been successfully installed, otherwise your tax provider will not be displayed when merchants navigate to the **Store Setup > Tax** page in the BigCommerce control panel.

The [Get a Connection](https://developer.bigcommerce.com/api-reference/store-management/tax/tax-provider-connection/provider-connection-get) request may be used at any time to retrieve the connection status of the specified tax provider in the context of a store.

## Enabling tax providers in the control panel

Once the tax provider's app has been successfully installed and basic authentication credentials have been provided via the Update a Connection request, users will be able to enable the tax provider on all supplied merchant and/or partner test stores provided by the tax proivder in [sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce).

To enable the tax provider, users must navigate to **Store Setup > Tax** in the BigCommerce control panel and click **Enable** next to the associated tax provider.

If document submission is supported, navigate to **Store Setup > Tax > {Tax Provider}** and ensure the submit order data checkbox is checked.

## Tax estimation

### When tax estimates are requested

Once the tax provider app has been enabled in the BigCommerce control panel, the tax provider is ready to respond to tax estimate requests sent by BigCommerce.

Tax estimates will be requested, depending on the BigCommerce store's settings, multiple times during a standard BigCommerce checkout flow.

* After selecting a shipping method when using the **Estimate Shipping & Tax functionality** on the cart page
* After specifying a shipping address during a checkout
* After specifying a billing address during a checkout

Estimate requests are not expected after the following events.

* While browsing a store's product catalog or product pages.
* On the cart page prior to a shopper selecting a shipping method using the **Estimate Shipping & Tax** functionality.
* On the checkout page prior to specifying a shipping address.
* On the checkout page, when toggling any option related to using the shopper's shipping address as their billing address.

Estimate calls will also be made in the control panel when using flows like the following.

* Line-item refund flows
* Test connection functionality when users navigate to **Store Setup > Tax > {Tax Provider}** in the BigCommerce control panel

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Tax estimate requests sent by BigCommerce may not always contain complete data as these requests will be fired at different stages of the shopper checkout. For example, the **Estimate Shipping & Tax** functionality on the cart page does not provide any billing address data, but the tax provider will still be expected to return a valid tax estimate.

</div>
</div>
</div>

### Responding to tax estimate requests

When responding to tax estimate requests sent by BigCommerce, tax providers are required to include aggregates and breakdowns of sales tax amounts and rates for product item prices, shipping and handling prices. This is because when navigating to the **Store Setup > Tax > Tax Settings** page in the BigCommerce control panel, merchants have the ability to specify whether they would like to show taxes in cart, checkout, orders and invoice **As one summarized line item** or **Broken down by tax rate**.

[View the Estimate Taxes API reference](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api/tax-provider/estimate).

## Document submission

Document submission enables tax providers to persist a tax quote request, replace it with another one, or invalidate it if necessary.

Supporting document submission is optional; however, tax providers wishing to support this functionality are required to share document submission URLs with BigCommerce when [sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce).

If document submission is supported, navigate to **Store Setup > Tax > {Tax Provider}** and ensure the submit order data checkbox is checked.

[View the Commit Tax Quote API reference](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api/tax-provider/commit).

## Testing

Prior to testing a tax provider, the merchant or partner test store should have the following configured in the BigCommerce control panel:

* The store profile address, found by navigating to **Store Setup > Store Profile** is configured and the selected country is one of the countries supported by the tax provider
* The shipping origin address found by navigating to **Store Setup > Shipping** is configured. This value is included in tax estimate requests
* The tax provider, found by navigating to **Store Setup > Tax** is enabled
* If document submission is supported, navigate to **Store Setup > Tax > {Tax Provider}** and ensure the submit order data checkbox is checked

To test the tax provider connection, navigate to **Store Setup > Tax > {Tax Provider}** in the BigCommerce control panel and click **Test Connection**. This will trigger a sample tax estimate request to be sent to the estimate URL provided by the tax provider. If the connection is unsuccessful, users can navigate to **Server Settings > Store Logs** in the BigCommerce control panel to view the error and it’s description to assist with triaging the issue.

## Support

For anything related to the BigCommerce app, please raise a ticket using your [BigCommerce dev tools portal](https://devtools.bigcommerce.com/).

Refer to our [Tax Provider API reference](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api) here for a complete API description.

For Tax Provider API related questions, or to request set up of a new tax provider configuration, email [taxproviderapi@bigcommerce.com](mailto:taxproviderapi@bigcommerce.com).

## Related resources

### Articles

* [Building Apps Guide](https://developer.bigcommerce.com/api-docs/apps/guide/intro)

### Endpoints

  - [Tax Provoider API Reference](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api)
  - [Get a Tax Provider Connection](https://developer.bigcommerce.com/api-reference/store-management/tax/tax-provider-connection/provider-connection-get)
  - [Delete a Tax Provider Connection](https://developer.bigcommerce.com/api-reference/store-management/tax/tax-provider-connection/provider-connection-delete)
  - [Update a Tax Provider Connection](https://developer.bigcommerce.com/api-reference/store-management/tax/tax-provider-connection/provider-connection-put)
  - [Tax Classes](https://developer.bigcommerce.com/api-reference/store-management/tax-classes-api)