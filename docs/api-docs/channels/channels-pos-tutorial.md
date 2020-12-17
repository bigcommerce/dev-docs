# Building Point-of-Sale Channels

<div class="otp" id="no-index">

### On this page


 - [Prerequisites](#prerequisites)
 - [Creating a channel](#creating-a-channel)
 - [Specifying the platform](#specifying-the-platform)
 - [Configuring UI sections](#configuring-ui-sections)
 - [Rendering UI sections](#rendering-ui-sections)
 - [Related resources](#related-resources)

</div>

This article documents how to use [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference) to install a POS channel into [Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager) during a [single-click app's](https://developer.bigcommerce.com/api-docs/apps/guide/types) installation. We'll assume you're an experienced app and POS developer familiar with channels on BigCommerce.

### Prerequisites


- [Familiarity with channels on BigCommerce](https://developer.bigcommerce.com/api-docs/channels/guide/overview)
- [Experience building apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- Experience building POS integrations

## Creating a channel

After receiving the [POST response](https://developer.bigcommerce.com/api-docs/apps/guide/auth#receiving-the-post-response) at the end of the single-click app OAuth flow, create a channel on the merchant's store. This allows merchants to import sales from the POS system and configure settings. To create a POS channel, set `type` to `pos` in the [create a channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) request.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Sample POS",
  "type": "pos",
  "platform": "custom",
  "external_id": "",
  "status": "connected",
  "is_listable_from_ui": true,
  "is_visible": true,
  "config_meta": {
    "app": {
      "id": 112233,
      "sections": [
        {
          "title": "Overview",
          "query_path": "overview"
        },
        {
          "title": "Import",
          "query_path": "import"
        },
        {
          "title": "Settings",
          "query_path": "settings"
        },
      ]
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

[View reference documentation for this request](https://developer.bigcommerce.com/api-reference/store-management/channels/channels/createchannel).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
>
> You can [find an app's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id) in the URL when editing the app in the [Developer Portal](https://developer.bigcommerce.com/api-docs/apps/guide/developer-portal).

</div>
</div>
</div>

## Specifying the platform

Specify the POS system by assigning an [accepted value for `platform`](#accepted-values) in the [create channel request](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel).

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Sample POS",
  "type": "pos",
  "platform": "custom",
  ...
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

### Accepted values

| Platform          | Accepted Type             |
|-------------------|---------------------------|
| `square `         | `pos`                     |
| `vend`            | `pos`                     |
| `clover`          | `pos`                     |
| `custom`          | `pos`, `storefront`, `marketing`, `marketplace` |

## Configuring UI sections

Define and configure the channel's UI tabs displayed in the control panel by passing in a `config_meta` object.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Sample POS",
  ...
  "config_meta": {
    "app": {
      "id": 112233,
      "sections": [
        {
          "title": "Overview",
          "query_path": "overview"
        },
        {
          "title": "Import",
          "query_path": "import"
        },
        {
          "title": "Settings",
          "query_path": "settings"
        },
      ]
    }
  }
}
```

## Rendering UI sections

Use the `query_path` value passed to the app's control panel iFrame to render the corresponding UI section.

### Exmple overview section

![Example Overview Section](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-channel-overview.png "Example Overview Section")

### Example import section

![Example Import Section](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-pos-import.png "Example Import Section")

## Related resources

### Articles

- [Building Apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- [Building Channels](https://developer.bigcommerce.com/api-docs/channels/guide/overview)
- [Find an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id)

### Endpoints

- [Channels API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)
- [Settings API](https://developer.bigcommerce.com/api-reference/store-management/settings)

- [Building Apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- [Building Channels](https://developer.bigcommerce.com/api-docs/channels/guide/overview)
- [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)
- [Settings API Reference](https://developer.bigcommerce.com/api-reference/store-management/settings)
- [Find an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id)
