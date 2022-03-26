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

The shopper-facing experience is represented via the Stencil storefront platform as well as the GraphQL Storefront API. If your application is mostly concerned with the shopper-facing "final product" of a particular Channel's configuration, consider using the [GraphQL Storefront API](/api-docs/storefront/graphql/graphql-storefront-api-overview) to simplify your integration. As all Storefront API requests are run in the context of a particular Channel, all relevant configuration is automatically applied to the data returned in a Storefront API response. The "Settings APIs" discussed in this article are primarily for use cases related to the **management** or **administration** of store settings.

>>> DON'T MISS DEVDOCS-3672

AC

We need to add a note to MSF API docs for:

GET /settings/store/profile
PUT /settings/store/profile
 
the following settings are currently global ONLY and can not be set per channel:  * store_address_type

store_country
