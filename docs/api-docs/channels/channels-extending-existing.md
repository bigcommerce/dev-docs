# Extending Sales Channel Apps with Channels Toolkit

<!-- https://developer.bigcommerce.com/api-docs/channels/tutorials/extend-existing-apps -->

<div class="otp" id="no-index">

## On this page

 - [Step 1: Update API credentials](#step-1-update-api-credentials)
 - [Step 2: Integrate channel API](#step-2-integrate-channel-api)
 - [Step 3: Migrate existing data](#step-3-migrate-existing-data)
 - [App requirements](#app-requirements)
 - [Sample configuration](#sample-configuration)
 - [Terminology](#terminology)
 - [Related resources](#related-resources)

</div>

This article provides a guide to partners who would like to update or replace their existing sales channel apps to leverage new functionality available via Channels Toolkit.


## Step 1: Update API credentials

Existing sales channel apps need app credentials with updated OAuth scopes to authenticate and authorize requests to Channels Toolkit APIs. Login to the [Developer Portal](https://devtools.bigcommerce.com) to update your app's credentials. Channel APIs require the following scopes:

|UI Name|Parameter|Enables|
|-|-|-|
|Channels Settings Modify|`store_channel_settings`|Creating channels that reference external platforms|
|Channels Listings Modify|`store_channel_listings`|Creating and reading product listing information|

See [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication) for more information on app credentials.

## Step 2: Integrate channel API

To be visible in Channel Manager once installed, apps must meet certain requirements. All channel apps are required to use BigCommerce’s Channel API. Select partner apps have additional [Channel API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) implementation requirements to facilitate being marketed in Channel Manager.

### All partners

- [Create a Channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) (for each platform the app enables a merchant to sell on) - this enables the channel to be displayed within the “Manage” screen in the new Channel Manager for merchants, once the app has been installed.

- [Create a Channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) request must include `app_id` at a minimum in the [app config object](#sample-configuration).


### Channel manager example

![Extending Existing Apps 01](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-channel-manager.png "Extending Existing Apps 01")

### Select partners

- Update UI to use [BigDesign](https://developer.bigcommerce.com/big-design/) and the general design patterns and user flows demonstrated in the sample app (shown in the screenshots below) with channel name, icon, and menu nav sections.

- Include sections in the [Channel API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) request in the [app config object](#sample-channel-app-configuration).

### Channel app import section

![Extending Existing Apps 03](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-pos-import.png "Extending Existing Apps 03")

### Channel app settings section

![Extending Existing Apps 04](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-04.png "Extending Existing Apps 04")

## Step 3: Migrate existing data

- **Channels** - Register a channel for all existing merchants using the app.
- **Orders** - Add `channel_id` with the corresponding channel ID for the merchant and which channel the order was placed on, if orders are synced to BigCommerce.
- **Listings (optional)** - Create channel specific [product listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api). This is primarily necessary for storefronts, marketplaces, and marketing type of channels.


## App requirements

Although the sample app shown in the screenshots above is for a point of sale integration, we've designed [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference) to be flexible enough to build any type of sales channel app, and each type of channel app has its own specific requirements centered around ensuring performance and user experience best practices.

The above "updating existing app" data applies; however, non-POS channel apps are not necessarily required to use the same sections and user flows shown in the example app screenshots.

### Storefronts

**All Partners**:

- Add usage of [Sites and Routes API](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) so that links generated within BigCommerce, such as "view storefront" and links sent in transactional emails to shoppers, will use the headless storefront's correct URL.

### Marketplaces and marketing

**All Partners**:

- Must use [Listings API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) if supporting per product listings.



## Sample configuration

To create or modify a channel app's configuration, send a `POST` or `PUT` request to `/stores/{{STORE_HASH}}/v3/channels`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[{
    "type": "type of channel",
    "platform": "sales channel platform",
    "name": "name of the sales channel",  // Name displayed to merchant
    "external_id": "",
    "status": "connected",
    "config_meta": {
      "app": {
        "id": 123,                        // ID of the app
        "sections": [{                    // Label displayed to merchant in BigCommerce navigation bar
          "title": "Overview",            // query param passed app iframe
          "query_path": "overview"
         }, {
         "title": "Settings",
         "query_path": "settings"
        }]
      }
    }
}]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> **Note**
>
> - You can find the app ID in the URL when editing the app in the [Developer Portal](https://devtools.bigcommerce.com/). For more information, see [Finding an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id).

</div>
</div>
</div>

<!-- title: Properties -->
|  Property | Type | Description |	
| --- | --- | --- |	

| `type`                      | str        | Allowed Values: pos, marketplace, storefront, marketing                                                                                                     |
| `platform`                  | str        | Allowed Values: see below or in [API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) |
| `name`                      | str        | The name the merchant will see                                                                                                                              |
| `external_id`               | str        | Associated ID within a system / platform outside of BC.                                                                                                     |
| `status`                    | str        | Allowed Values: active, inactive, connected, disconnected, archived                                                                                         |
| `app`                       | obj        | App configuration                                                                                                                                           |
| ↳ `id`                      | int        | ID of the app                                                                                                                                               |
| ↳ `sections`                | array[obj] | User interface section options                                                                                                                              |
| &nbsp;&nbsp; ↳ `title`      | str        | Label displayed to merchants in navigation bar                                                                                                              |
| &nbsp;&nbsp; ↳ `query_path` | str        | Passed to app's iframe. Ex: `https://<store_url>/manage/channel/2/app?id=5&section=overview`                                                                |

<!-- title: Accepted platforms and types -->

| Platform          | Accepted Type                                   |
| ----------------- | ----------------------------------------------- |
| `square`          | `pos`                                           |
| `vend`            | `pos`                                           |
| `clover`          | `pos`                                           |
| `facebook`        | `marketplace`,`marketing`                       |
| `amazon`          | `marketplace`                                   |
| `ebay`            | `marketplace`                                   |
| `wordpress`       | `storefront`                                    |
| `drupal`          | `storefont`                                     |
| `acquia`          | `storefront`                                    |
| `bloomreach`      | `storefront`                                    |
| `deity`           | `storefront`                                    |
| `google_shopping` | `marketing`                                     |
| `custom`          | `storefront`, `pos`, `marketing`, `marketplace` |

For a complete Channel API reference (including request schemas and property descriptions), see: [API Reference > Channels and Listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api).

## Terminology

|Term|Definition|
|-|-|
| **Channels Toolkit** | Channels Toolkit is a set of tools, UI patterns, guidelines, and APIs provided by BigCommerce to enable partners and developers to extend the BigCommerce ecosystem by building sales channel integrations (whether they are point of sale, marketing, marketplace, social, or headless storefronts) that are more deeply embedded within the BigCommerce control panel. |
| **Select Partners**  | Partners approved by BigCommerce to be marketed and discoverable as sales channel providers within the new Channel Manager. These are partners who offer what we know to be best in breed integrations to key sales channels that help merchants grow their business.                                                                                                    |
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
<!-- theme: info -->

> **Note**
>
> - Select partners have slightly more stringent requirements for their sales channel apps due to the high visibility and marketability of their apps directly within the BigCommerce control panel.

</div>
</div>
</div>

For a high-level overview and more information on Channels Toolkit, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview).

## Related resources

### Articles

- [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview)
- [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps)
- [Becoming a Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
- [Types of Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps)
- [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
- [Building an App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
- [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)

### Endpoints

- [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)
- [Sites and Rites API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)
