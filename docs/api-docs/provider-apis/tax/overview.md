# Tax Provider API



The [Tax Provider API](/api-reference/providers/tax-provider-api) allows you to provide business-to-consumer sales tax estimates to shoppers on the storefront and to merchants in the control panel; it can also be used to submit documents for tax reconciliation purposes.

The [Tax Provider API](/api-reference/providers/tax-provider-api) works in conjunction with a BigCommerce app, so you will need to [build an app](/api-docs/apps/guide/intro) that integrates the [Tax Provider API](/api-reference/providers/tax-provider-api).

Multi-tenant tax providers can choose to publish their BigCommerce app so that it's discoverable by anyone, or publish their app as unlisted so that it can only be installed via URL. Furthermore, tax solutions that have been built in-house or for specific merchants by digital agencies are also supported as private instances, and will only work on the specified stores.


## Obtaining an app ID

To get your app ID, start creating an app in the [Developer Portal](https://devtools.bigcommerce.com/), and fill out the information on [Step 3 Technical](/api-docs/apps/guide/publishing#add-technical-information). In the URL, you will see your unique app ID.

[Learn more about finding your app's ID](/api-docs/apps/tutorials/id).

## Sharing provider details with BigCommerce

Once you've obtained your app ID, please share your app ID as well as the below information with BigCommerce by emailing [taxproviderapi@bigcommerce.com](mailto:taxproviderapi@bigcommerce.com). This allows us to create your tax provider configuration, which will take approximately 5 days.

Once your tax provider configuration is ready, we'll let you know via email. The email will also include your `provider_id` which is required when [establishing a connection](#establishing-a-connection) with the [Tax Provider API](/api-reference/providers/tax-provider-api).


</br>

|Tax Provider Details              |Required / Optional            |Value(s)                     |Description                                                                                           |Example                                           |
| ------------------------------------- | ------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| App ID                                | Required                       | Integer                      | Tells us which tax provider configuration to use after the app is installed.                                     | `123456`                                          |
| Tax provider name                     | Required                       | String                       | Displayed in the active MSF-enabled BigCommerce control panel (e.g. **Settings > Setup > Tax > Add tax service**).             | `Sample Tax`                                      |
| Tax provider type                     | Required                       | Production, Sandbox             | Hierarchy of tax provider configurations, Production is primary and Sandboxes are secondary, see [sandbox tax provider configuration](#sandbox-tax-provider-configuration) for more information.               | `Production`                                      |
| Partner support email                | Required                       | Email                        | Used by BigCommerce to contact tax provider, in the case we need to forward a merchant support request.                       | `support@sampletax.example.com`                   |
| Links displayed in an active MSF-enabled control panel                  | Optional                       | URL, Title, Description                          | Link(s) displayed to shoppers when they navigate to **Settings > Setup > Tax > {Tax Provider}**. One or multiple links supported.                        | `support.sampletax.com`, `Sample Tax Support`, `The Sample Tax Support website.`                    |
| **Coverage**                          |                                |                              |                                                                                                       |                                                   |
| Tax provider visibility               | Required                       | Show, Hide                   | Tells us if tax provider should be displayed to users in the BigCommerce control panel before the tax providers app is installed on the associated store.          | `Show`                                            |
| Platform availability                    | Required                       | All stores, Private instance | Tells us if tax provider should work on all stores or only on the stores where a store hash has been provided.                                           | `All stores`                                      |
| Supported store(s) | Required if platform availability is **private instance** | Store hashes                 | As a private instance, tax provider configuration will only work on store hashes provided.                      | `dwvjntfqv,epq54yymgq`                            |
| Supported / unsupported countries     | Required                       | ISO 3166-1 alpha-2           | Comma separated ISO 3166-1 alpha-2 country codes for supported countries.                             | `US,CA,GB,FR,AU,NZ`                               |
| **URLs**                              |                                |                              |                                                                                                       |                                                   |
| Estimate URL                          | Required                       | URL                          | URL BigCommerce should use for Tax Provider API estimate requests.                                    | `https://sampletax.example.com/tax/estimate`      |
| Commit URL                            | Optional                       | URL                          | URL BigCommerce should use for Tax Provider API quote requests.                                       | `https://sampletax.example.com/doc/commit`        |
| Adjust URL                            | Optional                       | URL                          | URL BigCommerce should use for Tax Provider API quote requests.                                       | `https://sampletax.example.com/doc/adjust`        |
| Void URL                              | Optional                       | URL                          | URL BigCommerce should use for Tax Provider API quote requests.                                       | `https://sampletax.example.com/doc/void`          |
| **Testing**                               |                                |                              |                                                                                                       |                                                   |
| Partner sandbox store domain          | Required                       | Domain name                  | Share your partner sandbox store for testing purposes prior to launching your tax provider. Learn how to [create a partner sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store).                 | `https://sampletax-test-store.mybigcommerce.com/` |

### Sandbox tax provider configuration

Sandbox tax provider configurations are nested within your production tax provider configuration, as such tax providers requiring a sandbox tax provider configuration should also provide details for their production tax provider configuration.

Additionally, when providing the details for a sandbox tax provider configuration, it's unnecessary to specify the below properties because they are inherited from the primary production tax provider configuration (all other properties are still required):

* Merchant support email
* Merchant support URL
* Tax provider visibility
* Platform availability, i.e. all stores or only specified store hashes
* Supported / unsupported countries

<!-- theme: info -->
> #### Note
> * We recommend tax providers request to create only one sandbox tax provider within their production tax provider configuration, any development procedures related to testing different estimate, commit, adjust and void Tax Provider API endpoints should be performed externally and decoupled from the BigCommerce platform to avoid unnecessary dependencies.



## Building the app

Tax providers are required to build a BigCommerce [single-click app](/api-docs/apps/guide/types#single-click) in order to utilise the Tax Provider API to provide tax estimates and submit tax documents. A BigCommerce single-click app provides many benefits, for example, it enables tax providers to promote their solution in the BigCommerce App Marketplace, ask for merchant authorisation of API scopes during app install, as well as enable configuration of tax provider settings via an iFrame in the BigCommerce control panel.

Review our [introduction to building apps](/api-docs/apps/guide/intro) guide and use the sidebar to explore topics including: types of apps, managing apps in the dev portal, implementing OAuth, and designing the UI.

Make sure to also review our [app development best practices](/api-docs/apps/guide/best-practices) for some tips.

<!-- theme: info -->
> #### Note
> * If you have registered your app in the Developer Portal but have not submitted it for approval because it's still in development, the app will be in a Draft state. This means your app can only be installed on stores owned by the same email address as the Developer Portal account email.



## Installing the app

When the merchant clicks **Install** on a tax provider's single-click app, it's essential that the app successfully handle the OAuth flow before moving on to the next step of establishing a connection with the [Tax Provider API](/api-reference/providers/tax-provider-api). The [Apps Guide](/api-docs/apps/guide/auth) provides an overview of the OAuth flow.

When handling the OAuth flow, tax providers must ensure their app is requesting read and write permissions on the **Information and Settings** API scopes. Additionally, the tax provider should store the **client_id** and **access_token** that are received. Both are required later when [establishing a connection with the Tax Provider API](#establishing-a-connection).

## Establishing a connection

A tax provider is ready to establish a connection with the Tax Provider API when all of the following are true:

* Tax provider has shared their tax provider details with BigCommerce via email, and we've replied confirming the tax provider configuration is now ready on all supplied merchant and/or partner test stores (see [Sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce)).
* BigCommerce has shared the `provider_id` of the tax provider configuration with the tax provider via email (see [Sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce)).
* Tax provider has built a draft app that successfully handles the OAuth flow during app installation (see [Building the app](#building-the-app)).
* During the OAuth flow the app requested the merchant to authorize read and write permissions on the Information and Settings API scopes (see [Installing the app](#installing-the-app)).
* During the OAuth flow the `client_id` and `access_token` was received and stored by the tax provider (see [Installing the app](#installing-the-app)).

For context, the [Tax Provider API Connection endpoints](/api-reference/store-management/tax) provide an added layer of security for tax providers. They set basic authentication credentials for the tax provider and these basic credentials are used to authenticate each API request to the tax provider from the associated store.

If the tax provider supports all eligible stores, then they may choose to provide an account registration flow in their app iFrame in order to capture these basic authentication credentials from merchants. Learn more about designing the app UI [here](/api-docs/apps/guide/ui).

If the tax provider is a private instance, then they may choose to provide the basic authentication credentials themselves.

In either case, the [Update Connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-put) endpoint should be called after the tax provider's app has been successfully installed. Tax providers will need to include `store_hash`, `provider_id`, and `X-Auth-Token`(`access_token`) values.

We recommend calling the [Update Connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-put) endpoint immediately after the app has been successfully installed, otherwise your tax provider will not be displayed when merchants navigate to the **Settings > Setup > Tax** page in an active MSF-enabled BigCommerce control panel.

The [Get a Connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-get) request may be used at any time to retrieve the connection status of the specified tax provider in the context of a store.

## Enabling tax providers in the control panel

Once the tax provider's app has been successfully installed and basic authentication credentials have been provided via the Update a Connection request, users will be able to enable the tax provider on all supplied merchant and/or partner test stores provided by the tax provider in [sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce).

To enable the tax provider, users must navigate to **Settings > Setup > Tax** in an active MSF-enabled BigCommerce control panel and click **Enable** next to the associated tax provider.

If document submission is supported, navigate to **Settings > Setup > Tax > {Tax Provider}** in an active MSF-enabled BigCommerce control panel and ensure the **Submit Order Data** checkbox is checked.

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
* Test connection functionality when users navigate to **Settings > Setup > Tax > {Tax Provider}** in an active MSF-enabled BigCommerce control panel

<!-- theme: info -->
> #### Note
> * Tax estimate requests sent by BigCommerce may not always contain complete data as these requests will be fired at different stages of the shopper checkout. For example, the **Estimate Shipping & Tax** functionality on the cart page does not provide any billing address data, but the tax provider will still be expected to return a valid tax estimate.



### Responding to tax estimate requests

When responding to tax estimate requests sent by BigCommerce, tax providers are required to include aggregates and breakdowns of sales tax amounts and rates for product item prices, shipping and handling prices. This is because when navigating to the **Settings > Setup > Tax > Tax Settings** page in an active MSF-enabled BigCommerce control panel, merchants have the ability to specify whether they would like to show taxes in cart, checkout, orders and invoice **As one summarized line item** or **Broken down by tax rate**.

[View the Estimate Taxes API reference](/api-reference/providers/tax-provider-api/tax-provider/estimate).

## Document submission

Document submission enables tax providers to persist a tax quote request, replace it with another one, or invalidate it if necessary.

Supporting document submission is optional. However, tax providers wishing to support this functionality must share document submission URLs with BigCommerce when [sharing provider details with BigCommerce](#sharing-provider-details-with-bigcommerce).

If document submission is supported, navigate to **Settings > Setup > Tax > {Tax Provider}** in an active MSF-enabled control panel and ensure the **Submit Order Data** checkbox is checked.

[View the Commit Tax Quote API reference](/api-reference/providers/tax-provider-api/tax-provider/commit).

## Testing

Prior to testing a tax provider, the merchant or partner test store should have the following configured in the BigCommerce control panel. The following menu paths are for active MSF-enabled stores:

* The store default country, found by navigating to **Settings > Setup > Store profile**, is set to a country that is supported by the tax provider
* The shipping origin address, found by navigating to **Settings > Setup > Shipping**, is configured. This value is included in tax estimate requests
* The tax provider, found by navigating to **Settings > Setup > Tax**, is enabled
* If document submission is supported, navigate to **Settings > Setup > Tax > {Tax Provider}** and ensure the **Submit Order Data** checkbox is checked

To test the tax provider connection, navigate to **Settings > Setup > Tax > {Tax Provider}** in an active MSF-enabled BigCommerce control panel and click **Test Connection**. This will trigger a sample tax estimate request to be sent to the estimate URL provided by the tax provider. If the connection is unsuccessful, users can navigate to **Settings > Advanced > Store logs** in an active MSF-enabled BigCommerce control panel to view the error and its description to assist with triaging the issue.

## Support

For anything related to the BigCommerce app, please raise a ticket using your [BigCommerce dev tools portal](https://devtools.bigcommerce.com/).

Refer to our [Tax Provider API reference](/api-reference/providers/tax-provider-api) here for a complete API description.

For Tax Provider API related questions, or to request set up of a new tax provider configuration, email [taxproviderapi@bigcommerce.com](mailto:taxproviderapi@bigcommerce.com).

## Related resources

### Articles

* [Building Apps Guide](/api-docs/apps/guide/intro)

### Endpoints

  - [Tax Provider API Reference](/api-reference/providers/tax-provider-api)
  - [Get a Tax Provider Connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-get)
  - [Delete a Tax Provider Connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-delete)
  - [Update a Tax Provider Connection](/api-reference/store-management/tax/tax-provider-connection/provider-connection-put)
  - [Tax Classes](/api-reference/store-management/tax-classes-api)
