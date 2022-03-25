# Price Lists

[Price List Assignments API documentation](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists-assignments/getlistofpricelistassignments)

Previously, Price Lists could only be assigned to a Customer Group, using the V2 Customer Groups API.

Now, Price Lists can be assigned to a Channel, a Customer Group, or a combination of a Channel and Customer Group. Only one Price List can be active at any given time, however, and the weighting of which Price List is evaluated like this:

- If a Price List Assignment is found matching the shopper's current Customer Group AND Channel, it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Customer Group only (with no Channel as part of the assignment), it will be used, otherwise...
- If a Price List Assignment is found matching the shopper's current Channel only (with no Customer Group as part of the assignment), it will be used, otherwise...
- The catalog default pricing will be used.

If your application manages pricing via Price Lists, it is recommended to move to the new V3 Price List Assignments API in order to fully understand the state of pricing on a store.

If your application simply needs to know what the price will be for a given shopper, you can instead consider using the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) to fetch the shopper-view data in real time.
