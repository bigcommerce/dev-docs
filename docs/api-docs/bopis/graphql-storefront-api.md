---
stoplight-id: 6e5040693dacc
---

# Storefront GraphQL API

Inventory and location information can be queried using the GraphQL Storefront API. The information exposed to the storefront is controlled by the [inventory settings](#inventory-settings) and [location settings](#location-settings) for the store.  Additionally the token used to generate requests via the Storefront API must include scopes for 'Products' and 'Information & Settings'.

Specific information that can be queried through this API:
* Total inventory for a given variant that is available for shoppers (aggregate inventory)   
	* Your API token must have the read-only or modify scope for 'Products'
* Inventory available at a specified location for a given variant
	* Your API token must have the read-only or modify scope for 'Products' 
* Store locations
	* Your API token must have the read-only or modify scope for 'Information & Settings'
	* Storefront details for a location that can be queried include general store information, location address, contact details, and storefront display information.

## Inventory Settings

Inventory levels may return null depending on what has been configured on the Advanced Settings > Inventory page within the Control Panel.

For product inventory levels:
- If out-of-stock products are completely hidden from the storefront, a product will not be returned. 
- If a merchant chooses not to display stock levels for products, then you will receive `null` for all product inventory levels. 
- If a merchant chooses to only display stock levels for products that are low in stock, then inventory levels for products that aren't low in stock (or out of stock) will return `null`.

A store's inventory settings also affect inventory levels for variants.

To see examples of these responses, see [Get Inventory by Location](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/graphql/get-inventory-by-location).  

## Location Settings 

The visibility of locations will depend on location settings that can be managed via API or CP. Specifically, a merchant must enable a location for product and variant stocks to be included in aggregate stocks. A location must also be enabled if you want to fetch storefront details.


## Example Queries

This page's sub-pages include sample queries:
1. [Get Store Locations](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/graphql/get-locations)
2. [Get Inventory by Location](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/graphql/get-inventory-by-location) 

## Resources
* [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)
* [GraphQL Playground](https://developer.bigcommerce.com/graphql-playground)
* [GraphQL Explorer](https://developer.bigcommerce.com/graphql-explorer)
