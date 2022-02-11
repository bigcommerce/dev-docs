# Creating Channel-Specific Customers

## Introduction

If you have a BigCommerce store with multiple channels, you may want greater control over which channels your customers can access using their customer account. The Customers V3 API enables that level of customer access control. This guide will walk you through how to view and modify:

- customer login settings per channel
- customer channel access per customer

## Channel-specific customers

Customers can create accounts on any channel, and each customer may have access to one or more channels. The Customers V3 API supports the following two options:

1. Global customers **-** customers can log in to any channel that allows global customer logins

   _OR_

2. Channel specific customers **-** restricts customer login to specific channels

Each channel has a unique channel ID and an `allow_global_login` property that can have the following values:

- `true` - the channel allows global customer logins.
- `false` - the customer must have login access to the channel.

If you have a BigCommerce store, you already have at least one channel. Your BigCommerce hosted storefront has channel ID `1` and allows global customer logins by default.

To determine whether customers have global login access or channel-specific access, each customer account has a `channel_ids` property that can contain the following values:

- `null` - this customer can only log in to channels with `"allow_global_logins": true`.
- An array of one or more channel IDs, such as `[1]` or `[1,2]`, grants a customer access to log in to those channels and no others.

### Customer access example

Let's look at an example of how you might set up a BigCommerce store with three channels and three customers.

In the following diagram, each of the three channels has its own column and lists values for its unique `channel_id` and the boolean value of `allow_global_login`.

Each of the three is an origin channel for a single customer account located within its column. Origin channels are where the customer first created their account.

Whether each customer account can log in to channels other than its origin channel depends on the value of `allow_global_login` for each channel and the value of `channel_ids` for the customer.

![creating channel-specific customers diagram](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channel-specific-customers.png)

#### Access levels for each customer

1. Customer 1 with `channel_ids: null` can log in to any channel with `allow_global_login: true`, so channels 1 and 3. Customer 1 cannot log in to channel 2 because `allow_global_login: false`, therefore only allows customers with a `channel_ids` value containing `2`.
2. Customer 2 with `channel_ids: [2]` can only log in to channel 2. Because customer 2 is assigned a channel ID of 2, this customer doesn't have access to stores that allow global login.
3. Customer 3 with `channel_ids: [1,2,3]` can log in to channels 1, 2 and 3. This customer does not have global access but has explicit permissions for all three channels, overriding `allow_global_login`.

## Guides

### Channels settings guide

Now that you have seen how channel settings affect customer login access, we will walk through how to set `allow_global_access` on new channel creation or determine and update settings for an existing channel.

#### Determine if a channel allows for global customer login

You can get a list of your store's channels by sending a `GET` request to the `/v3/channels` endpoint. For more information on how to retrieve this list, see [Get All Channels](/api-reference/store-management/channels/channels/listchannels). Once you receive a server response, note the returned `id`s as you will use them in some of the following sections.

Now that you have the `channel_id` value for one or more channels, we can determine if a channel allows for global customer login. Send a `GET` request to `/v3/customers/settings/channels/{channel_id}` using the `id` retrieved in the previous step for the `{channel_id}` segment of the path.

The following is an example response detailing the customer settings for a channel:

```json
{
  "data": {
    "allow_global_logins": true,
    "customer_group_settings": {
      "default_customer_group_id": null,
      "guest_customer_group_id": null
    },
    "privacy_settings": {
      "ask_shopper_for_tracking_consent": null,
      "ask_shopper_for_tracking_consent_on_checkout": null,
      "policy_url": null
    }
  }
}
```

Note the returned value of the `allow_global_logins` property. `true` means the channel allows global customer logins. `false` means the customer must be explicitly granted access to the channel.

#### Change whether a channel allows global logins

Now that you know how to check whether one of your channels allows for global logins or not, we will walk through how to change the setting.

##### Update customer settings for a channel

Taking the `channel_id` of the channel you would like to update, send a `PUT` request to `/v3/customer/settings/channels/{channel_id}` and update the value of `allow_global_logins` to either `true` or `false`. The following is an example request:

```
PUT https://api.bigcommerce.com/stores/{store-hash}/v3/customers/settings/channels/{channel_id}

Headers:
  Content-Type: application/json
	X-Auth-Token: {{X-Auth-Token}}

Body:
  {
  "allow_global_logins": false
	}
```

For more information on this step, see [Update the customer settings per channel](/api-reference/store-management/customers-v3/customer-settings-channel/customersettingschannelput).

### Customers access guide

Once you configure your channels to allow or disallow global logins, you can configure channel access on the customer level for increased control.

#### Determine the channels accessible to a customer

To retrieve a list of all customers, send a `GET` request to `/v3/customers`. To retrieve information for one or more specific customers, you can append the `?id:in=` query parameter to your request. For more information on how to get a list of all customers, visit [Get All Customers](/api-reference/store-management/customers-v3/customers/customersget).

Each returned customer has a `channel_ids` property with either an array of channels to which the customer has login access or a `null` value. If this is your first time setting up channel-specific customer access, the `channel_ids` value will be `null`, meaning that a customer only has access to channels with `"allow_global_logins": true`.

#### Set customer channel access

Now that you have retrieved a list of customers and determined their access levels, you can now update those values using the following methods:

##### Set customer channel access on customer creation

By default, the value of `channel_ids` is `null`, granting login access to any store that allows global logins. You can specify the channels that a customer has access to on creation by sending a `POST` request to `/v3/customers`. In addition to the required `email`, `first_name`, and `last_name`, include a `channel_ids` array similar to the following example:

```json
{
  "email": "string@example.com",
  "first_name": "string",
  "last_name": "string",
  "channel_ids": [1]
}
```

For more information on creating a customer, visit [Create Customers](/api-reference/store-management/customers-v3/customers/customerspost).

##### Update customer channel access for existing customer

To change the channels that an existing customer can access, send a `PUT` request to `/v3/customers`. In the request body, include the `id` of the customer and the updated value for `channel_ids`. The body will resemble the following example:

```json
{
  "id": 132,
  "channel_ids": [1]
}
```

For more information on updating customers, see [Update Customers](/api-reference/store-management/customers-v3/customers/customersput).
