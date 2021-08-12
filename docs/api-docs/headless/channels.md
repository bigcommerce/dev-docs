# Creating Channels

<div class="otp" id="no-index">

### On this page
- [Creating channels](#creating-channels)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

This section demonstrates how to create a channel and a channel site for a headless storefront.

## Creating channels

Before you can display products on a headless storefront, you need to create a channel and a channel site for that storefront. A **channel** is essentially a sales platform such as a headless storefront, a marketplace, or a POS system. A **site** is a domain that links a headless storefront to a sales channel.

You can create both using the [Channels API](https://developer.bigcommerce.com/api-reference/store-management/channels).

1. Start by sending a `POST` request to the `/channels` endpoint to create a channel for your headless platform. Retrieve the channel ID returned in the response. You will use it to create a channel site and authenticate cross-origin requests.
2. Pass that channel ID in a `POST` request to `/channels/{channel_id}/site` to create a site for the provided channel.
3. After setting up the channel, you can authenticate cross-origin requests by [creating a JWT token](https://developer.bigcommerce.com/api-reference/store-management/tokens/api-token/createtoken) through the GraphQL Storefront API. Make sure to create your GraphQL Storefront API token with the same channel ID as your headless platform; otherwise, your request will be rejected.

## Next steps

- [Learn how to work with products](https://developer.bigcommerce.com/api-docs/storefronts/guide/products)

## Resources

- [Building Storefront Channels](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront)