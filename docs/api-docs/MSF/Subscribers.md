# Subscribers

[Subscribers API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/subscribers)

Each Subscriber now has an `origin_channel_id` property which indicates on which the Channel on which each Subscriber signaled intent to receive a newsletter. If not supplied, will default to 1, but should be supplied with every request explicitly.

If your application deals with Subscribers, be sure to check the `origin_channel_id` to understand exactly where the Subscriber signed up. If you are integrating with a email marketing system, you may want to allow the merchant to pick which email lists will be used for which Channels.

The Subscriber webhooks will also be augmented with an `origin_channel_id` so new subscriptions can be added to the appropriate email list for each storefront.