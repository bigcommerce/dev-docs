# Orders

[Orders API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/order-transactions)

The V2 Orders API experiences no schema changes as a result of this release. However, for applications that deal with order management, it becomes crucial to note the `channel_id` of the Order, and make it easy for users of your application sort, categorize, and filter Orders on the basis of Channel.

Similarly, it's important to make sure you provide the appropriate channel-specific information to shoppers if your application is shopper-facing and deals with Orders. For example, if you send emails to customers based on new Orders, you'll want to make sure that you look up the correct store information based on its Channel and/or Site to make sure store information, URLs, links, and so forth in your email reflect the correct storefront.
