# Managing Store Configuration

[Settings API reference documentation](/api-reference/store-management/settings)

BigCommerce's Settings APIs can manage many of the configuration settings that are exposed to merchants in their store control panel, such as the store's name and contact information, SEO settings, and search filters.

These Settings APIs can be used to simplify the setup of new storefronts and other new sales channels, as well as to automate ongoing configuration changes. They enable developers to build configuration management tools that may be more efficient than the store control panel for a particular use case. 

They are also useful for app developers who want to build integrations that can understand, respect, and work with the potentially complex states of a store's configuration. For example, knowing the settings that relate to the display of pricing in a storefront or other sales channel can be useful for an application that also displays pricing, automates the application of promotions, or sends emails containing prices. 

Unlike many of BigCommerce's APIs, Settings APIs usually don't involve large collections of objects that can be created, deleted, and paginated. Instead, these APIs deal with a limited, static set of configurable properties that affect various aspects of store operations. They can be configured both on the **global** level and as channel-specific **contextual overrides** that apply to only one sales channel.

## Global settings and channel-specific settings

![settings-diagram.webp](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/msf-beta-guide/settings-diagram.webp)

The majority of BigCommerce merchants sell their products exclusively through the storefront website that comes preconfigured with their plan. When these merchants configure their store settings, they're modifying the **global default** versions of their settings.

Once a merchant starts to take advantage of multi-storefront or other multi-channel functionality, they often want to configure settings differently for each sales channel.

Each new channel will use the store's global default values unless the merchant chooses to override them by defining **channel-specific** settings.

The Settings APIs use query parameters to distinguish which set of settings a request is accessing.

Consider the following request to the `GET` store profile settings endpoint:

```http title="Example request: Get store profile settings"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```
&nbsp;
```json title="Example response: Get store profile" lineNumbers
{
  "data": {
    "store_phone": "+1 123-456-7890",
    "store_name": "My Default Store Name",
    "store_address": "123 Default St"
  },
  "meta": {}
}
```

Because the request did not specify any query parameters, the API returned the **global default** configuration for this merchant. Responses that return global configuration data will contain values for all properties of the requested object.

The merchant's global configuration is used for all storefronts and other channels that have not specified different, channel-specific configuration settings.

To check whether channel-specific values for a setting are defined, send the channel_id as a query parameter in your requests to settings `GET` endpoints.

```http title="Example request: Get store profile settings for channel 122"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile?channel_id=122
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```
&nbsp;
```json title="Example response: Get store profile settings for channel 122" lineNumbers
{
  "data": {},
  "meta": {}
}
```

The response's empty `data` object indicates that no channel-specific store profile settings are configured for the specified channel. It is safe to infer that this channel is using the global default store profile settings. When the global default store profile settings change, this channel's profile will reflect those changes. For example, if the global default value for the store name changed, the store name would change at each place it appears in this channel.

The following request-response pair shows an example of a channel that does have channel-specific store profile settings configured.

```http title="Example request: Get store profile settings for channel 123"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```
&nbsp;
```json title="Example response: Get store profile settings for channel 123" lineNumbers
{
  "data": {
    "store_name": "My Channel-Specific Name for Channel 123",
  },
  "meta": {}
}
```

Because a custom store name exists for channel 123, the channel-specific store name overrides the global default. Shoppers who interact with this channel will see the custom store name at each place it appears in the channel. When the global default `store_name` in the merchant's store profile settings changes, this channel will not reflect that change. However, any other changes to the global default store profile will affect channel 123, because `store_name` is the only channel-specific value defined. 

The following request-response pair shows an example of a channel with a complete set of channel-specific store profile settings configured.

```http title="Example request: Get store profile settings for channel 124"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile?channel_id=124
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```
&nbsp;
```json title="Example response: Get store profile settings for channel 124" lineNumbers
{
  "data": {
    "store_phone": "+1 555-555-555",
    "store_name": "My Channel-Specific Name For Channel 124",
    "store_address": "124 Channel St"
  },
  "meta": {}
}
```

Because channel-specific values exist for all store profile object properties, this channel is configured to override all the global default store profile configuration settings. Changes to the global defaults will not affect this channel.

## Editing store configuration settings

<!-- theme: info -->
> #### Global-only settings
> Currently, the following settings are inherently global and cannot be modified with channel-specific overrides: 
> * store_address_type
> * store_country

You can modify global and channel-specific settings alike by sending `PUT` requests to the relevant endpoints. 

The following is an example of a global default configuration update:

```http title="Example request: Update global store profile settings"
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "The new global store name",
}
```

To update channel-specific settings, send a request to the same endpoint along with a value for the `channel_id` query parameter.

```http title="Example request: Update store profile settings for channel 123"
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "store_name": "A different Channel-Specific Name for Channel 123",
}
```

If you wish to restore global defaults on a channel with a channel-specific configuration, you can "un-override" the channel's settings by sending a `DELETE` request that contains query parameters with the following information:
* the `channel_id`
* a comma-separated list of the property `keys` for the values you wish to reset.


```http title="Example request: Reset channel-specific store profile settings to default"
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/profile?channel_id=124&keys=store_name,store_address
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

<!-- theme: info -->
> #### Note
> Global settings cannot be deleted, only updated.

## The cumulative effect of global and channel-specific settings

At every point of contact a shopper has with a storefront or other sales channel, channel-specific settings are displayed first. Global default settings will only appear to shoppers when channel-specific values for those properties are not defined. This goes for viewing the storefront or product feed, reading a transactional email, receiving a packing slip, and all other interactions with the channel.

The Settings APIs discussed in this article are primarily for use cases involved with the management or administration of store settings. If your application's proposed implementation of the Settings APIs is mostly concerned with presenting the correct shopper-facing details at their "touch point" with a storefront or other sales channel, consider using the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to simplify your integration. Storefront API requests are run in the context of the shopper's active channel, so the relevant configuration is already correctly integrated with the data it returns. Stencil-powered storefront themes are also equipped with objects that represent the shopper-facing experience in context.  
