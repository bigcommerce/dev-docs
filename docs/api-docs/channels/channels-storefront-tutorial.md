# Building Storefront Channels

<!-- Dev Center URL: https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront#building-a-channel-app -->



This article documents how to use [Channels Toolkit](/api-docs/channels/guide/channels-toolkit-reference) to install a storefront channel into [Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager) during a [single-click app's](/api-docs/apps/guide/types) installation. We'll assume you're an experienced app and headless storefront developer familiar with channels on BigCommerce.

### Prerequisites


- [Familiarity with channels on BigCommerce](/api-docs/channels/guide/overview)
- [Experience building apps](/api-docs/apps/guide/intro)
- [Experience building headless storefronts](/api-docs/storefronts/developers-guide-headless)

## Creating a channel

After receiving the [POST response](/api-docs/apps/guide/auth#receiving-the-post-response) at the end of the [single-click app OAuth flow](/api-docs/apps/guide/auth#receiving-the-post-response), create a channel on the merchant's store. This allows merchants to assign product listings to the storefront and configure storefront specific settings. To create a storefront channel, set `type` to `storefront` in the [create a channel](/api-reference/store-management/channels/channels/createchannel) request.

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

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/channels/channels/createchannel#requestrunner) -->

[View reference documentation for this request](/api-reference/store-management/channels/channels/createchannel).

## Specifying the platform

Specify the headless storefront's platform by assigning an [accepted value for `platform`](#accepted-values) in the [create channel request](/api-reference/store-management/channels/channels/createchannel).

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

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/channels/channels/createchannel#requestrunner) -->

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

<!-- theme: info -->
 
<!-- theme:info -->
> #### Note
> You can [find an app's ID](/api-docs/apps/tutorials/id) in the URL when editing the app in the [Developer Portal](/api-docs/apps/guide/developer-portal).



## Protected UI sections

The following protected sections are provided by BigCommerce.

| Title               | Query                 | Description                                    |
| ------------------- | --------------------- | ---------------------------------------------- |
| [`Storefront Settings`](#storefront-settings) | `storefront_settings` | Renders channel specific storefront settings   |
| `Domains`             | `domains`             | Renders channel specific domain settings       |
| `Notifications`       | `notifications`       | Renders channel specific notification settings |
| [`Currencies`](#currencies-settings)          | `currencies`          | Renders channel specific currency settings     |

Include protected sections in the [create channel request](/api-reference/store-management/channels/channels/createchannel) to display BigCommerce provided channel specific settings.

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

<!-- theme: warning -->
> #### Note
> Any content an app attempts to render to the control panel iFrame for a protected section will be overridden by the BigCommerce provided content.


## Storefront settings

Include the `Storefront Settings` [protected section](#protected-ui-sections) in the channel's `config_meta` object to render the BigCommerce provided **Storefront Settings** tab on the channel's settings page.

![Channel Storefront Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-storefront-settings.png "Channel Storefront Settings")

Read channel specific storefront settings using the [Settings API](/api-reference/store-management/settings). For example, to [get storefront category settings](/api-reference/store-management/settings/storefront-category/getsettingsstorefrontcategory), send a `GET` request to `/v3/settings/storefront/category`.

```http
GET /stores/{{STORE_HASH}}/v3/settings/storefront/category?channel_id={{CHANNEL_ID}}
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/settings/storefront-category/getsettingsstorefrontcategory#requestrunner) -->

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

[View the settings API Reference](/api-reference/store-management/settings).

## Currencies settings

Include the `Currencies` [protected section](#protected-ui-sections) in the channel's `config_meta` object to render the BigCommerce provided **Currencies** tab on the channel's settings page.

![Channel Currency Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-currencies.png "Channel Currency Settings")

You can manage channel specific currency settings using the Channel API [Currency Assignments](/api-reference/store-management/channels/channel-currency-assignments) endpoints. For example, To [get a channel's currency assignments](/api-reference/store-management/channels/channel-currency-assignments/get-channels-channel-id-currency-assignments), send a `GET` request to `/v3/channels/{channel_id}/currency-assignments`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}}/v3/channels/{channel_id}/currency-assignments
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/channels/channel-currency-assignments/get-channels-channel-id-currency-assignments#requestrunner) -->

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

[View the Channels API reference](/api-reference/store-management/channels).

## Notification settings

Include the `Notifications` [protected section](#protected-ui-sections) in the channel's `config_meta` object to render the BigCommerce provided **Notifications** tab on the channel's settings page.

![Channel Notification Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-notifications-small.png "Channel Notification Settings")

## Related resources

### Articles

- [Building Apps](/api-docs/apps/guide/intro)
- [Building Channels](/api-docs/channels/guide/overview)
- [Find an App's ID](/api-docs/apps/tutorials/id)

### Endpoints

- [Channels API Reference](/api-reference/store-management/channels)
- [Settings API Reference](/api-reference/store-management/settings)
