# Performance

### Stop unnecessary webhooks

BigCommerce contains a number of webhooks that your site may benefit from. We recommend disabling unused webhooks to enhance performance. To disable the webhooks you do not need, use the [Webhooks API](https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview) and update the `is_active` fields to false.

Because webhooks are associated by client ID, make sure you are using BigCommerce for WordPress API credentials to make these Webhook API calls.