# Price Order of Operations

The table below lists each price type available on a product. The table is read from top to bottom, with the default price having the lowest weight and the tax having the highest weight when calculating price.  

| Price Type | Description | Notes |
|--|--| --|
| Default product price | Product requirement | Default price. |
| Product sale price | Product option. | Overrides default price.|
| Variant price | Product option. | Overrides product sale price. |
| Variant sale price | Product option.| Overrides variant price. |
| Customer group discount | Available in fixed ($5), relative (-$2), or percentage (-25%). Might apply to one product, category, subcategory, or the entire store's products. | Overrides variant sale price. |
| Product bulk pricing | Available in fixed ($5), relative (-$2), or percentage (-25%). Dependent on the total quantity of the product, including SKUs added to the cart. | Overrides customer group discount. |
| | <p style="text-align:center;font-weight:bold;">Price lists override all previous pricing</p> | |
| Price list variants | Price list record requirement.  | Overrides all previous pricing and excludes SKUs from the total number of items for product bulk pricing. 
| Price list variant sale price | Product option. Overrides if variant pricing is set and selected. | Overrides price list pricing. |
| Price list variant bulk pricing | Available in fixed ($5), relative (-$2), or percentage (-25%). Dependent on quantity added to cart. | Overrides price list sale price on variants. |
| Price list variant with product pick list | The product pick list allows you to change the price when a pick list item is selected. | Overrides price list bulk pricing. | 
| Product with modifier | Product option. A modifier includes choices such as add $5 for insurance. Can be fixed ($5) or percentage (%10) to add or remove from the total product price. | Overrides price list with a product pick list. |
| Product with a product pick list | If you configure the product pick list to change the price, it will update the price when the option is selected. | Overrides product with modifier. |
| | <p style="text-align:center;font-weight:bold;">Cart</p>||
| Cart level discounts | Cart level discounts apply automatically when the shopper meets certain conditions or takes certain actions. | Modifies the final product or cart price depending on the discount type. |
| Coupons | Coupons require customer action to take effect. | Modifies the final product or cart price depending on the coupon type. |
| Tax | You can assign products to different tax classes, which will change the final amount the shopper pays. | Tax is the last to calculate after shipping and promotions are applied. |

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
