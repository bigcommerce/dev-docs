# Products

[Channel Assigments API documentation](https://developer.bigcommerce.com/api-reference/store-management/catalog)

Products must be "assigned" to a Channel in order to be sold on that Channel. For native Stencil storefronts, if a product is not assigned to the storefront's Channel, it will be hidden from that channel's storefront.

![products-diagram.webp](https://stoplight.io/api/v1/projects/cHJqOjI4MDIz/images/Djh2L6UFyPg)

If your application provides a selling Channel to merchants (e.g. a 3rd-party marketplace integration), it is recommended to check the products assigned to your Channel to understand which products have been marked as available to be sold on your Channel by the merchant. You may also want to consult the [Channel Listings API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channel-listings/listchannellistings) for extended product information relevant to your Channel.

Products can be assigned to Channels in two ways:

**1. Explicitly creating the Assignment via the Channel Assignments endpoint**

Using the [Channel Assignments API](https://developer.bigcommerce.com/api-reference/store-management/catalog), you can directly assign Products to Channels. This will allow those Products to be sold on the Channel, although it won't make them easily discoverable on Storefront-type Channels via Categories. For Storefronts, it's recommended to assign the products to Categories as well (see below).

**2. Assigning the product to a Category whose Tree is assigned to the Channel**

As a convenience, Channel Assignments will be created for products when you assign them to one of the Channel's Categories (connected via to the Channel via a Tree). BigCommerce makes an assumption that products being assigned to categories within a Channel are for sale within that channel. If this is not the case, the assignment can be reversed with the Channel Assignments API.

Assignments will not be removed by the removal of Products from Categories. To remove Channel Assignments, you must use the Channel Assignments API.

If your application interacts with shoppers, you may be able to simply use the [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) instead to get the correct product availability & data for a given shopper, in real-time.