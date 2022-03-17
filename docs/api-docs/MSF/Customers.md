# Customers

[Customers API documentation](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)

Each Customer account has an `origin_channel_id` indicating the Channel on which it was created. The uniqueness constraint on email addresses has been modified to require email addresses to be unique within each Channel, instead of the entire Store. This means a given email address can exist on two different Channels, with two different Customer IDs.
