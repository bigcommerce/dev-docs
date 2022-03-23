# Categories

[Categories API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories)

Previously, a store had a collection of Categories, which were organized in a tree structure. This collection of categories has been migrated into the store's first Category Tree, and you have an opportunity to create additional Trees, which can be assigned to Channels.

![categories-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/HfM2xB4ksa4)

Previously, a store had a collection of Categories, which were organized in a tree structure. This collection of categories has been migrated into the store's first Category Tree, and you have an opportunity to create additional Trees, which can be assigned to Channels.

If you need to understand the category structure that is being used by a particular storefront, or manage these data, you must first identify which Tree is tied to that storefront Site's Channel, via its `channel_id` on the Trees endpoint. You may use the Channel ID filter for this, e.g. `GET /catalog/trees?channel_id:in=1,2,3,4`.

A temporary restriction is in place in which a Tree may only be assigned to a maximum of 1 Channel. This will be relaxed in a future release, to allow sharing of a common Tree among several Channels.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct Category Tree for a given shopper, in real-time.
