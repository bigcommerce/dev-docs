# Find an App's ID

<div class="otp" id="no-index">

### On this page
- [Find in control panel](#find-in-control-panel)
- [Find in Developer Portal](#find-in-devtools)

- [Usage](#usage)
- [Resources](#resources)
</div>

Select partners [building channel apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps) need to know their app's ID in order to create and modify the channel's configuration. This tutorial demonstrates how to find an app's ID in the [Developer Portal](#find-in-devtools) and the [control panel](#find-in-control-panel).


## Find in control panel
An app's ID can be found in the URL while on the app's page in a store's control panel. The location of the app's page depends on if the app is installed or uninstalled.

* **Uninstalled Draft Apps:** **Apps** > **My Apps** > [**My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts)

* **Installed Apps:** **Apps** > [**My Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps)


To open the app page, click the app:

![Draft App](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-id-01.png "Draft App")

The app ID is in the URL after `/manage/marketplace/apps/`:

![Draft App ID](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-id-02.png "Draft App ID")

## Find in Developer Portal


To find an app's ID in the [Developer Portal](https://devtools.bigcommerce.com/my/apps):
1. Log into the [Developer Portal](https://devtools.bigcommerce.com/my/apps).

2. Click **Edit App**.

3. Identify the app's ID is in the URL (ex: `/my/apps/{{APP_ID}}/summary?review=false`).


## Usage

Once you obtain the app ID, you can use it to create or modify the `app` configuration for a channel via `POST` or `PUT` request to `/stores/{{STORE_HASH}}/v3/channels`:


```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[{
    "type": "type of channel",
    "platform": "sales channel platform",
    "name": "name of the sales channel",
    "external_id": "",
    "status": "connected",
    "app": {
      "id": 123,                         // ID of the app
      "sections": [{
        "title": "Overview",
        "query_path": "overview"
       }, {
       "title": "Settings",
       "query_path": "settings"
      }]
    }
}]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

## Resources
* [Building Apps Guide](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps)
* [Extending Existing Apps with Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/extending-existing-apps)
