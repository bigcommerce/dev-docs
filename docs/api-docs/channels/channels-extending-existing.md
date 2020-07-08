---
title: Extending Sales Apps with Channels Toolkit
status: draft
published:
reviewed:
tags: [channels]
---

# Extending Sales Apps with Channels Toolkit

<div class="otp" id="no-index">

### On this Page
- [Terminology](#terminology)
- [Updating an Existing App](#updating-an-existing-app)
- [Extending Channels Toolkit](#extending-channels-toolkit)
- [Channel App Configuration](#channel-app-configuration)
- [Resources](#resources)

</div>

This is a draft document to provide early access documentation and information to select partners for 2 primary reasons:

* To build / update existing sales channel apps with the new functionality available via Channels Toolkit
* To gather their input and feedback on Channels Toolkit

## Terminology

* **Channels Toolkit** - formerly known as Channels SDK, it is the set of tools, patterns, and APIs provided by BigCommerce to enable partners and developers to extend the BC ecosystem by building sales channel integrations, whether POS, marketing, marketplace, social, or headless storefronts, that are more deeply embedded within the BigCommerce control panel.

* **Select Partners** - partners approved by BigCommerce product and/or SBD to be marketed and discoverable as sales channel providers within the new Channel Manager. These are partners who offer what we know to be best in breed integrations to key sales channels that help merchants grow their business.
  * Select partners have slightly more stringent requirements for their sales channel apps due to the high visibility and marketability of their apps directly within the BigCommerce control panel

[Current GA Channel App Documentation]()

## Updating an Existing App

Need to add Channel API with following:

All Partners
Create Channel (for each platform the app enables a merchant to sell on) - this enables the channel to be displayed within the “Manage” screen in the new Channel Manager for merchants, once the app has been installed.
Channel must have app_id at minimum in the “app” config object. (see Appendix Channel App Config for API documentation)

![Extending Existing Apps 01](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/ "Extending Existing Apps 02")

Select
Update UI to use BigDesign and the user flows indicated in the sample POS app design flow (will have sample app, but here are the screenshots for now) with Channel name, icon, and menu nav sections
Include sections in Channel API request in the app config object.

![Extending Existing Apps 02](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-02.png "Extending Existing Apps 02")
![Extending Existing Apps 03](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-03.png "Extending Existing Apps 03")
![Extending Existing Apps 04](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-04.png "Extending Existing Apps 04")
![Extending Existing Apps 05](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/extending-screenshots-05.png "Extending Existing Apps 05")

Data migration
Channels
Register / backfill a channel for all existing merchants using the app
Orders
Add “channel_id” with the corresponding channel ID for the merchant and which channel the order was placed on, if orders are synced to BC
Listings (optional)
Note: Eventually this will be Product to Channel assignments via Catalog (this is part of MSF, so we won’t add this in now, but likely we’ll be managing this through catalog in the long term)

## Extending Channels Toolkit
The above “updating existing app” data all applies as well, with the exception that they are not necessarily required to use the same sections and user flows in their app as what’s displayed in the Sample POS app.

Storefronts
All partners
Add usage of Sites & Routes API so that links generated within BigCommerce, such as “view storefront” and links sent in transactional emails to shoppers, will use the headless storefront’s correct URL.
Marketplaces & Marketing

Must use listings API, if supporting per product listings (i.e. not simply syncing the entire catalog)

## Channel App Configuration
Endpoint: api.bigcommerce.com/stores/store_hash/v3/channels

To DO_SOME_THING, send a HTTP_VERB request to `/stores/{{STORE_HASH}}/ENDPOINT`:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/endpoint
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

[{
    "type": "type of channel",
    "platform": "sales channel platform",
    "name": "name of the sales channel", // what the merchant will see as the name
    "external_id": "",
    "status": "connected”,
    "app": {
      "id": 123, // ID of the app
      "sections": [{
        "title": "Overview", // This is the label of the section as it will be displayed to merchants in the navigation bar
        "query_path": "overview" // this is the query parameter that will be passed to the iframe that the app is displayed in. It will be passed as so: https://<store_url>/manage/channel/2/app?id=5&section=overview
       }, {
       "title": "Settings",
       "query_path": "settings"
      }]
    }
}]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](LINK_TO_OPERATION#requestrunner)

For a complete THING API reference (including request schemas and property descriptions), see: [API Reference > THING](URL).

## Resources
* []()
* []()