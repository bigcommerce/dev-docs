<h1>Price Order of Operations</h1>

The table below lists out each price type available on a product. The table is read from top to bottom with the default price having the lowest weight and the tax having the highest weight when calculating price.  


| Price Type | Description | Notes |
|--|--| --|
| Default Product Price | Required on product  |  |
| Product Sale Price | Optional on product. | Overrides default price.|
| Variant Price | Optional on product. | Overrides product sale price |
| Variant Sale Price | Optional on product.| Overrides variant price. |
| Customer Group Discount | Available in Fixed ($5), Relative (-$2), or Percentage (-25%). Might apply to one product, category, subcategory or the entire store's products. | Overrides variant sale price. |
| Product Bulk Pricing | Available in Fixed ($5), Relative (-$2), or Percentage (-25%). Dependent on total quantity of the product including SKUs added to cart. | Overrides customer group discount. |
| | <p style="text-align:center;font-weight:bold;">Price Lists override all previous pricing</p> | |
| Price List Variants | Required for a price list record.  | Overrides all previous pricing and excludes SKUs from the total number of items for product bulk pricing. |
| Price List Variant Sale Price | Optional on product. Overrides if variant pricing is set and selected. | Overrides price list pricing. |
| Price List Variant Bulk Pricing | Available in Fixed ($5), Relative (-$2), or Percentage (-25%). Dependent on quantity added to cart. | Overrides price list sale price on variants |
| Price List Variant with Product Pick List | The Product Pick List is configured to change the price when a Pick List Item is selected. | Overrides price list bulk pricing | 
| Product with Modifier | Optional on product. A modifier includes choices such as add $5 for insurance. Can be fixed ($5) or percentage (%10) to add or remove from total product price | Overrides price list with a product pick list |
| Product with a Product Pick List | If the product pick list is configured to change the price, it will update the price when the option is selected. | Overrides product with modifier |
| | <p style="text-align:center;font-weight:bold;">Cart</p>||
| Cart Level Discounts | Cart Level Discounts apply automatically when the shopper meets certain conditions or takes certain actions. | Modifies the final product or cart price depending on the discount type. |
| Coupons | Coupons require customer action to take effect. | Modifies the final product or cart price depending on the coupon type. |
| Tax | Products can be assigned to a different tax class, which will change the final amount the shopper pays. | Tax is the last to calculate after shipping and promotions are applied. |

---

## Resources

### Webhooks
* [Products](/api-docs/getting-started/webhooks/webhook-events#webhook-events_products)
* [Cart](/api-docs/getting-started/webhooks/webhook-events#webhook-events_cart)

### Related Endpoints
* [Storefront Cart API](/api-reference/cart-checkout/storefront-cart-api) 
* [Server to Server Cart API](/api-reference/cart-checkout/server-server-cart-api)
* [Price Lists API](/api-reference/catalog/pricelists-api)
* [Catalog API](/api-reference/catalog/catalog-api)

### Related Articles
* [Price Lists](/api-docs/catalog/price-list-overview)
* [Products Overview](/api-docs/catalog/products-overview)

