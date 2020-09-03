# Price Order of Operations

The table below lists each price type available on a product. The table is read from top to bottom, with the default price having the lowest weight and the tax having the highest weight when calculating price.  

| Price Type | Description |
|--|--|
| Default product price | Product requirement | 
| Product sale price | A product option that overrides the default price |  
| Variant price | A product option that overrides the product sale price | 
| Variant sale price | A product option that overrides the variant price | 
| Customer group discount | Available in fixed ($5), relative (-$2), or percentage (-25%) amount that overrides the variant sale price. Might apply to one product, category, subcategory, or the entire store's products. |
| Product bulk pricing | Available in fixed ($5), relative (-$2), or percentage (-25%) amount that overrides the customer group discount. Dependent on the total quantity of products, including SKUs added to the cart. |
| Price list variants | A price list record requirement that overrides all previous pricing and excludes SKUs from the total number of items for product bulk pricing. 
| Price list variant sale price | A product option that overrides price list pricing if variant pricing is set and selected. |
| Price list variant bulk pricing | Available in fixed ($5), relative (-$2), or percentage (-25%) amount that overrides price list sale price on variants. It is dependent on the quantity added to a cart. | 
| Price list variant product pick list | The product pick list overrides price list bulk pricing and allows you to change the price when a pick list item is selected. | 
| Product modifier | Available in fixed ($5) or percentage (%10) amount that is added or removed from the total product price and overrides the price list variant product pick list. A modifier includes choices such as adding $5 for insurance. |
| Product pick list | If you configure the product pick list to change the price, it will update the price and override the product modifier when the option is selected. |
Discounts | When a shopper meets certain criteria or takes certain actions to automatically modify the final product or cart price depending on the discount type. |
| Coupons | Coupons require customer action to take effect and modify the final product or cart price depending on the coupon type. |
| Tax | You can assign products to different tax classes, which will change the final amount the shopper pays. Tax is the last to calculate after shipping and promotions are applied. |

## Resources

### Webhooks
* [Products](/api-docs/store-management/webhooks/events#products)
* [Cart](/api-docs/store-managment/webhooks/events#cart)

### Related endpoints
* [Storefront Cart API](/api-reference/cart-checkout/storefront-cart-api) 
* [Server to Server Cart API](/api-reference/cart-checkout/server-server-cart-api)
* [Price Lists API](/api-reference/catalog/pricelists-api)
* [Catalog API](/api-reference/catalog/catalog-api)

### Related resources
* [Price Lists](/api-docs/catalog/price-list-overview)
* [Products Overview](/api-docs/catalog/products-overview#products-overview)
