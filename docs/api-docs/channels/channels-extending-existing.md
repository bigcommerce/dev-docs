# Extending Sales Apps with Channels Toolkit

<div class="otp" id="no-index">

### On this Page
- [Terminology](#terminology)
- [Step 1: Integrate Channel API](#step-1-integrate-channel-api)
- [Step 2: Migrate Existing Data](#step-2-migrate-existing-data)
- [Channel Type Specific Requirements](#channel-type-specific-requirements)
- [Sample Channel App Configuration](#sample-channel-app-configuration)
- [Resources](#resources)

</div>

This is article provides early access information to select partners who would like to update (or replace) their existing sales channel apps to leverage new functionality available via Channels Toolkit. The BigCommerce team will also use this draft content to gather feedback and input on Channels Toolkit from select partners.

## Terminology

|Term|Definition|
|-|-|
|**Channels Toolkit**|Formerly known as Channels SDK, it is the set of tools, patterns, and APIs provided by BigCommerce to enable partners and developers to extend the BigCommerce ecosystem by building sales channel integrations (whether they are point of sale, marketing, marketplace, social, or headless storefronts) that are more deeply embedded within the BigCommerce control panel.|
|**Select Partners**|Partners approved by BigCommerce to be marketed and discoverable as sales channel providers within the new Channel Manager. These are partners who offer what we know to be best in breed integrations to key sales channels that help merchants grow their business.|

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * Select partners have slightly more stringent requirements for their sales channel apps due to the high visibility and marketability of their apps directly within the BigCommerce control panel.

</div>
</div>
</div>

For a high-level overview and more information on Channels Toolkit, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview).


## Step 1: Integrate Channel API

To be visible in Channel Manager once installed, apps must meet certain requirements. All channel apps are required to use BigCommerce's Channel API. Select partner apps have additional Channel API implementation requirements to facilitate being marketed in Channel Manager.

### All Partners
* Create Channel (for each platform the app enables a merchant to sell on) - this enables the channel to be displayed within the “Manage” screen in the new Channel Manager for merchants, once the app has been installed.
* Channel must have app_id at minimum in the “app” config object. (see Appendix Channel App Config for API documentation)

![Extending Existing Apps 01](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-01.png "Extending Existing Apps 02")

### Select Partners
* Update UI to use BigDesign and the user flows indicated in the sample POS app design flow (will have sample app, but here are the screenshots for now) with Channel name, icon, and menu nav sections
* Include sections in Channel API request in the app config object.

![Extending Existing Apps 02](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-02.png "Extending Existing Apps 02")

![Extending Existing Apps 03](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-03.png "Extending Existing Apps 03")

![Extending Existing Apps 04](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-04.png "Extending Existing Apps 04")

![Extending Existing Apps 05](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-05.png "Extending Existing Apps 05")

## Step 2: Migrate Existing Data

* **Channels** - Register a channel for all existing merchants using the app.
* **Orders** - Add `channel_id` with the corresponding channel ID for the merchant and which channel the order was placed on, if orders are synced to BigCommerce.
* **Listings (optional)** - Create channel specific [product listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api).

## Channel Type Specific Requirements

Although the sample app shown in the screenshots above is for a point of sale integration, we've designed Channel Toolkit to be a flexible enough to build any type of sales channel app, and each type of channel app has its own specific requirements centered around ensuring performance and user experience best practices.

The above "updating existing app" data applies; however, non-POS channel apps are not necessarily required to use the same sections and user flows shown in the example app screenshots.

### Storefronts

**All Partners**:
* Add usage of Sites & Routes API so that links generated within BigCommerce, such as “view storefront” and links sent in transactional emails to shoppers, will use the headless storefront’s correct URL.

### Marketplaces & Marketing

**All Partners**:
* Must use listings API, if supporting per product listings (i.e. not simply syncing the entire catalog).

## Sample Channel App Configuration

To create or modify a channel app's configuration, send a `POST` or `PUT` request to `/stores/{{STORE_HASH}}/v3/channels`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/endpoint
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

[{
    "type": "type of channel",
    "platform": "sales channel platform",
    "name": "name of the sales channel", // Name displayed to merchant
    "external_id": "",
    "status": "connected”,
    "app": {
      "id": 123,                         // ID of the app
      "sections": [{
        "title": "Overview",             // Label displayed to merchant in nav bar
        "query_path": "overview"         // query param passed app iframe
       }, {
       "title": "Settings",
       "query_path": "settings"
      }]
    }
}]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

**Properties**
|  Property | Type | Description |
| --- | --- | --- |
| `type` | str | Allowed Values: pos, marketplace, storefront, marketing |
| `platform` | str | Allowed Values: see below or in [API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) |
| `name` | str | The name the merchant will see |
| `external_id` | str | Associated ID within a system / platform outside of BC. |
| `status` | str | Allowed Values: active, inactive, connected, disconnected, archived |
| `app` | obj | App configuration |
| ↳ `id` | int | ID of the app |
| ↳ `sections` | array[obj] | User interface section options |
| &nbsp;&nbsp; ↳ `title` | str | Label displayed to merchants in navigation bar |
| &nbsp;&nbsp; ↳ `query_path` | str | Passed to app's iframe. Ex: `https://<store_url>/manage/channel/2/app?id=5§ion=overview` |

**Accepted Platforms and Types**
| Platform          | Accepted Type             |
|-------------------|---------------------------|
| `square `         | `pos`                     |
| `vend`            | `pos`                     |
| `clover`          | `pos`                     |
| `facebook`        | `marketplace`,`marketing` |
| `amazon`          | `marketplace`             |
| `ebay`            | `marketplace`             |
| `wordpress`       | `storefront`              |
| `drupal`          | `storefont`               |
| `acquia`          | `storefront`              |
| `bloomreach`      | `storefront`              |
| `deity`           | `storefront`              |
| `google_shopping` | `marketing`               |
| `custom`          | `storefront`, `pos`, `marketing`, `marketplace`             |

For a complete Channel API reference (including request schemas and property descriptions), see: [API Reference > Channels and Listings](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api).

## Resources
* [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview)
* [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps)
* [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)
* [Sites and Rites API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api)