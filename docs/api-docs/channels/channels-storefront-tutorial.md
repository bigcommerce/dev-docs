# Building Storefront Channels

<!-- https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront#building-a-channel-app -->

<div class="otp" id="no-index">

## On this page

 - [Prerequisites](#prerequisites)
 - [Creating a channel](#creating-a-channel)
 - [Specifying the platform](#specifying-the-platform)
 - [Configuring UI sections](#configuring-ui-sections)
 - [Protected UI sections](#protected-ui-sections)
 - [Storefront settings](#storefront-settings)
 - [Currencies settings](#currencies-settings)
 - [Notification settings](#notification-settings)
 - [Related resources](#related-resources)

</div>

This article documents how to use [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference) to install a storefront channel into [Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager) during a [single-click app's](https://developer.bigcommerce.com/api-docs/apps/guide/types) installation. We'll assume you're an experienced app and headless storefront developer familiar with channels on BigCommerce.

## Prerequisites

- [Familiarity with channels on BigCommerce](https://developer.bigcommerce.com/api-docs/channels/guide/overview)
- [Experience building apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- [Experience building headless storefronts](https://developer.bigcommerce.com/api-docs/storefronts/developers-guide-headless)

## Creating a channel

After receiving the [POST response](https://developer.bigcommerce.com/api-docs/apps/guide/auth#receiving-the-post-response) at the end of the [single-click app OAuth flow](https://developer.bigcommerce.com/api-docs/apps/guide/auth#receiving-the-post-response), create a channel on the merchant's store. This allows merchants to assign product listings to the storefront and configure storefront specific settings. To create a storefront channel, set `type` to `storefront` in the [create a channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) request.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Custom PWA Storefront",
  "type": "storefront",
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
          "title": "Storefront Settings",
          "query_path": "storefront_settings"
        },
        {
          "title": "Domains",
          "query_path": "domains"
        },
        {
          "title": "Notifications",
          "query_path": "notifications"
        },
        {
          "title": "Currencies",
          "query_path": "currencies"
        }
      ]
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

[View reference documentation for this request](https://developer.bigcommerce.com/api-reference/store-management/channels/channels/createchannel).

## Specifying the platform

Specify the headless storefront's platform by assigning an [accepted value for `platform`](#accepted-values) in the [create channel request](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel).

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Deity PWA Storefront",
  "type": "storefront",
  "platform": "deity",
  ...
  }
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

### Accepted values

| Platform     | Accepted Type                                   |
| ------------ | ----------------------------------------------- |
| `wordpress`  | `storefront`                                    |
| `drupal`     | `storefront`                                    |
| `acquia`     | `storefront`                                    |
| `bloomreach` | `storefront`                                    |
| `deity`      | `storefront`                                    |
| `custom`     | `storefront`, `pos`, `marketing`, `marketplace` |

## Configuring UI sections

Define and configure the channel's UI tabs displayed in the control panel by passing in a `config_meta` object.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Deity Falcon PWA Storefront",
  ...
  "config_meta": {
    "app": {
      "id": 112233,
      "sections": [
        {
          "title": "Overview",
          "query_path": "overview"
        }
          ...
      ]
    }
  }
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme:info -->

> **Note**
>
> You can [find an app's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id) in the URL when editing the app in the [Developer Portal](https://developer.bigcommerce.com/api-docs/apps/guide/developer-portal).

</div>
</div>
</div>

## Protected UI sections

The following protected sections are provided by BigCommerce.

| Title                                         | Query                 | Description                                    |
| --------------------------------------------- | --------------------- | ---------------------------------------------- |
| [`Storefront Settings`](#storefront-settings) | `storefront_settings` | Renders channel specific storefront settings   |
| `Domains`                                     | `domains`             | Renders channel specific domain settings       |
| `Notifications`                               | `notifications`       | Renders channel specific notification settings |
| [`Currencies`](#currencies-settings)          | `currencies`          | Renders channel specific currency settings     |

Include protected sections in the [create channel request](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) to display BigCommerce provided channel specific settings.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Dog US",
  ...
  "config_meta": {
    "app": {
      "id": 112233,
      "sections": [
        {
          "title": "Storefront Settings",
          "query_path": "storefront_settings"
        },
        {
          "title": "Domains",
          "query_path": "domains"
        },
        {
          "title": "Notifications",
          "query_path": "notifications"
        },
        {
          "title": "Currencies",
          "query_path": "currencies"
        }
      ]
    }
  }
}
```

Included protected sections display above custom sections.

![Protected Sections](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-protected-custom-settings.png "Protected Sections")

<!-- theme:info -->

> **Note**
>
> - Any content an app attempts to render to the control panel iFrame for a protected section will be overridden by the BigCommerce provided content.

## Storefront settings

Include the `Storefront Settings` [protected section](#protected-ui-sections) in the channel's `config_meta` object to render the BigCommerce provided **Storefront Settings** tab on the channel's settings page.

![Channel Storefront Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-storefront-settings.png "Channel Storefront Settings")

Read channel specific storefront settings using the [Settings API](https://developer.bigcommerce.com/api-reference/store-management/settings). For example, to [get storefront category settings](https://developer.bigcommerce.com/api-reference/store-management/settings/storefront-category/getsettingsstorefrontcategory), send a `GET` request to `/v3/settings/storefront/category`.

```http
GET /stores/{{STORE_HASH}}/v3/settings/storefront/category?channel_id={{CHANNEL_ID}}
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/settings/storefront-category/getsettingsstorefrontcategory#requestrunner)

**Response:**

```json
{
  "data": {
    "listing_mode": null,
    "default_product_sort": "bestselling",
    "category_tree_depth": 0
  },
  "meta": {}
}
```

[View the settings API Reference](https://developer.bigcommerce.com/api-reference/store-management/settings).

## Currencies settings

Include the `Currencies` [protected section](#protected-ui-sections) in the channel's `config_meta` object to render the BigCommerce provided **Currencies** tab on the channel's settings page.

![Channel Currency Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-currencies.png "Channel Currency Settings")

You can manage channel specific currency settings using the Channel API [Currency Assignments](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-currency-assignments) endpoints. For example, To [get a channel's currency assignments](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-currency-assignments/get-channels-channel-id-currency-assignments), send a `GET` request to `/v3/channels/{channel_id}/currency-assignments`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}}/v3/channels/{channel_id}/currency-assignments
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-currency-assignments/get-channels-channel-id-currency-assignments#requestrunner)

**Response:**

```json
{
  "data": {
    "channel_id": 1,
    "default_currency": "USD",
    "enabled_currencies": ["USD", "CAD"]
  },
  "meta": {}
}
```

[View the Channels API reference](https://developer.bigcommerce.com/api-reference/store-management/channels).

## Notification settings

Include the `Notifications` [protected section](#protected-ui-sections) in the channel's `config_meta` object to render the BigCommerce provided **Notifications** tab on the channel's settings page.

![Channel Notification Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-notifications-small.png "Channel Notification Settings")

## Related resources

### Articles

- [Building Apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- [Building Channels](https://developer.bigcommerce.com/api-docs/channels/guide/overview)
- [Find an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id)

### Endpoints

- [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)
- [Settings API Reference](https://developer.bigcommerce.com/api-reference/store-management/settings)
