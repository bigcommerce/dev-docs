# Managing Store Configuration

[Settings API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/settings)

BigCommerce's Settings APIs allow management of the store's configuration, which allows you to control many of the same settings that are available in the BigCommerce Control Panel.

These Settings APIs can be used to simplify the setup of new stores and new selling Channels, as well as automating changes to configuration in an ongoing capacity. They could furthermore build tools that are more efficient than the BigCommerce control panel for managing configuration for particular use cases.

They are also useful for app developers to understand the current state of a store's configuration, for applications that wish to respect a merchant's existing settings.

As an example, knowing the store or Channel settings related to the display of pricing (inclusive or exclusive of tax) can be useful for an application that also displays pricing, or perhaps sends emails containing pricing.

Unlike many of BigCommerce's APIs, Settings APIs usually don't involve a large collection of objects that can be created, deleted, and paginated. Instead, these APIs deal with a static set of allowed configuration keys for a particular area of the platform. They can be configured either on a **global** level or as a **contextual override** for a particular Channel.

## Global vs Contextual settings

![settings-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/RDrWEKAXZwM)


Most BigCommerce stores only sell on a single Channel, typically a single storefront website. When these stores are configuring their settings, they're modifying the "global" versions of those settings, which are used to affect the behavior of their single Channel.

However, when a store starts taking advantage of multi-channel or multi-storefront functionality, they often want to configure settings differently for each selling Channel.

Therefore, the existing settings are treated as the defaults for any new Channels, but the merchant has an opportunity to override many of the settings as appropriate for a particular Channel.

In the Settings APIs, this functionality is represented via URL parameters which allow interacting with the different layers of configuration.

For example, a GET request to the Store Profile endpoint may look like this:

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_phone": "+1 123-456-7890",
    "store_name": "My Default Store Name",
    "store_address": "123 Default St"
  },
  "meta": {}
}
```

As no query parameters were supplied, this data returned is the **global default** version of this configuration. All available configuration keys are always returned on the global level.

This global configuration will be used for all Channels that have not provided a channel-specific version of these settings.

To see if a Channel-specific setting exists, you can request this setting in the context of a particular channel:


```http
GET /v3/settings/profile?channel_id=122
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {},
  "meta": {}
}
```

The empty `data` object in the response indicates that no channel-specific data exists. Therefore, all of this channel's Store Profile settings are coming from the global defaults. If the global defaults were to change (for example, a change to the Store Name), that data would also take effect on this channel.

Let's consider another case:

```http
GET /v3/settings/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_name": "My Channel-Specific Name for Channel 123",
  },
  "meta": {}
}
```

In this case, I see that the Store Name has been overridden for Channel 123. Therefore, this is the name that will appear to any shoppers interacting with this Channel. If the store name were to change at the global level, this channel's name would not change.

One more case:

```http
GET /v3/settings/profile?channel_id=124
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

**Response:**

```json
{
  "data": {
    "store_phone": "+1 555-555-555",
    "store_name": "My Channel-Specific Name For Channel 124",
    "store_address": "124 Channel St"
  },
  "meta": {}
}
```

In this case, I see that all fields of the Store Profile have been overridden on this channel, so none of the global default settings are being used.

The global settings or the channel-specific settings can be updated with a `PUT` (supporting partial update, similar to `PATCH`):

```http
PUT /v3/settings/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "The new global store name",
}
```


```http
PUT /v3/settings/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "A different Channel-Specific Name for Channel 123",
}
```

If you wish to "un-override" a channel's settings and return that channel to the global defaults, simply use the `DELETE` method, and pass the keys that should be cleared in addition to the channel ID as URL parameters:

```http
DELETE /v3/settings/profile?channel_id=124&keys=store_name,store_address
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

Note that **global** settings cannot be deleted, only updated.

## The cumulative effect of Global and Channel settings

For any "touch point" a shopper has with a particular Channel - whether that's viewing the storefront, or when a transactional email sends, when a merchant is printing a packing slip to put into a package being shipped, or any other place where shopper-facing information is displayed - any Channel-specific settings will be overlaid over the existing Global settings to determine the final state of the shopping experience.

The shopper-facing experience is represented via the Stencil storefront platform as well as the GraphQL Storefront API. If your application is mostly concerned with the shopper-facing "final product" of a particular Channel's configuration, consider using the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to simplify your integration. As all Storefront API requests are run in the context of a particular Channel, all relevant configuration is automatically applied to the data returned in a Storefront API response. The "Settings APIs" discussed in this article are primarily for use cases related to the **management** or **administration** of store settings.
