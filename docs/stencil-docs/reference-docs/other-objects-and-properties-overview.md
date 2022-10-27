# Other Objects and Properties Overview
 

<!-- theme: info -->
> #### Debugging Your Theme
> The Stencil framework provides built-in debugging tools to aid in your custom front-end development. When you want to see what data is available on the page you are working on, you can simply add the debug query string to your store’s localhost URL. For example:
> `http://localhost:3000/product/this-is-a-sample-product?debug=context` will return a list of all the objects available on the page, in JSON syntax.
> If you want to view the available JSON objects and rendered page at the same time, change the debug value to "bar": `http://localhost:3000/product/this-is-a-sample-product?debug=bar`


## Product

**Description:** Default property that provides detailed product data. Called on the default `templates/pages/product.html`and `templates/pages/amp/product.html` templates, and on several partials in the `templates/components/` subdirectory:

* `account/returns-list.html`,
* `cart/item-options.html`,
* `products/add-to-cart.html`,
* `products/event-date.html`,
* `products/modals/writeReview.html`,
* `products/price.html`,
* `products/product-view.html`,
* `amp/products/product-options.html`,
* `amp/products/product-view.html`, and
* `amp/products/product-view-details.html`.

**Handlebars Expression:** `{{product}}`

**Object Properties:**

| Property | Description |
|---|---|
| id | Unique ID for the product |
| sku | Default product variant when no options are selected |
| mpn | Manufacturer Part Number |
| gtin | Global Trade Item Number |
| url | URL to the product detail page |
| upc | Optional UPC code for the product |
| title | Displayed name of the product |
| description | (HTML) description of the product |
| detail_messages | Status messages for display at the top of the product page |
| min_purchase_quantity | Minimum quantity that can be purchased at once |
| max_purchase_quantity | Maximum quantity that can be purchased at once |
| can_purchase | Boolean that indicates whether the product is available for purchase |
| out_of_stock | Boolean that indicates whether the product is out of stock |
| out_of_stock_message | Merchant-defined label to display when a product is out of stock |
| cart_url | URL to the customer’s shopping cart |
| add_to_wishlist_url | URL to add the product to the customer’s wishlist |
| customizations | Product customizations (for example, a T-shirt size); these correspond to [configurable fields](https://support.bigcommerce.com/articles/Public/What-are-configurable-fields-and-how-do-I-create-them) and [numeric-text](https://support.bigcommerce.com/s/article/Options-SKUs-Rules#text) [product options](https://support.bigcommerce.com/articles/Public/Adding-Product-Options) in the BigCommerce control panel |
| &nbsp;&nbsp;id | Customization ID |
| &nbsp;&nbsp;display_name | Label for this customization, as displayed to customers |
| &nbsp;&nbsp;type | Customization type [`text`,`textarea`,`NumbersOnlyText`,`checkbox`,`select`,`file`] |
| &nbsp;&nbsp;required | Boolean value that indicates whether customer must specify this customization in order to buy the product |
| &nbsp;&nbsp;condition | Boolean value indicating whether to display this product's condition (new, used, or refurbished) |
| &nbsp;&nbsp;prefill | Optional string value to prefill this field |
| &nbsp;&nbsp;&lt;values&gt; | For `select` type, array of strings listing the available options |
| &nbsp;&nbsp;&lt;file_types&gt; | For `file` type, string representing the types of allowed files |
| &nbsp;&nbsp;&lt;file_size&gt; | For `file` type, string representing the maximum file size allowed |
| &nbsp;&nbsp;integer_only | For `NumbersOnlyText` type, boolean value indicating whether to restrict customer's entries to whole numbers only |
| &nbsp;&nbsp;default | For `NumbersOnlyText` type, optional string representing a default number that customers can see and overwrite |
| &nbsp;&nbsp;limit_input | For `NumbersOnlyText` type, boolean indicating whether to impose any limits on the numeric values that customers can enter as strings |
| &nbsp;&nbsp;limit_input_option | For `NumbersOnlyText` type and `limit_input` = `true`, the type of limit: `lowest` or `highest` |
| &nbsp;&nbsp;lowest | For `NumbersOnlyText` type and `limit_input` = `true`,  minimum allowable value; a value of `0` imposes no limit |
| &nbsp;&nbsp;highest | For `NumbersOnlyText` type and `limit_input` = `true`,  maximum allowable value; a value of `0` imposes no limit |
| options | Options for color and pattern swatches displayed for this product |
| &nbsp;&nbsp;id | Product ID |
| &nbsp;&nbsp;type | String indicating size, color, swatch, etc. |
| &nbsp;&nbsp;display_name | Option Name displayed in control panel for this option |
| &nbsp;&nbsp;required | Boolean value that indicates whether customer must specify this option in order to buy the product |
| &nbsp;&nbsp;condition | Boolean value indicating whether to display this product's condition (new, used, or refurbished) |
| &nbsp;&nbsp;values | Array of data (color) or image (pattern) values |
| &nbsp;&nbsp;&nbsp;label | Internal label for this value (not normally displayed to shoppers) |
| &nbsp;&nbsp;&nbsp;id | ID for this value, unique within this values array |
| &nbsp;&nbsp;&nbsp;selected | Boolean indicating whether this value is preselected as the option's default value, upon page load |
| &nbsp;&nbsp;&nbsp;data | Each `values` member can contain either a `data` or an `image` member; `data` denotes a color |
| &nbsp;&nbsp;&nbsp;&nbsp;&lt;color value&gt; | Hex code for this color |
| &nbsp;&nbsp;&nbsp;image | Each `values` member can contain either a `data` or an `image` member; `image` denotes a pattern, in [Stencil image object format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image). (Note: This `image` value replaces the `{{pattern}}` property, which was limited to 18 x 18 pixels, and will be deprecated.) |
| price | References the [catalog price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price), to access the product’s price |
| weight | Weight of the default variant |
| height | Height of the default variant |
| width | Width of the default variant |
| depth | Depth of the default variant |
| rating | Rating for the product |
| num_reviews | Number of reviews the product has |
| bulk_discount_rates  | List of discount rates for the current product |
| condition | Condition of the product |
| stock_level | Current stock level of the product; will be null if storefront stock display is disabled by the merchant, or if the product lacks inventory tracking |
| shipping | Shipping properties for the product |
| &nbsp;&nbsp;fixed | Boolean that indicates whether the product’s shipping price is fixed |
| &nbsp;&nbsp;price | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the shipping cost for this product (if shipping cost is fixed) |
| &nbsp;&nbsp;calculated | Boolean that indicates whether the product’s shipping price is calculated at checkout |
| stock_label | Shows whether the product stock level is for on-hand merchandise or pre-orders. |
| availability | Optional availability message set by the merchant |
| pre_order | Availability of the product for pre-order |
| release_date | Release date, if the product is set to pre-order status |
| error_message | Potential error on the page (e.g.: out of stock, form validations) |
| gift_wrapping | Whether or not gift wrapping is enabled |
| brand | Brand of the product |
| &nbsp;&nbsp;name | Displayed name of the brand |
| &nbsp;&nbsp;url | URL to the brand page |
| main_image | Primary image to display when the product details page loads |
| images | List of all images for this product, in [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) (as configured in config.json; used with the `getImage` Handlebars helper) |
| pinterest_js | Property to display Pinterest button |
| facebook_like | Property to display Facebook Like button |
| warranty | Optional warranty text set by the merchant |
| meta_keywords | Optional search keywords that merchants may enter in the control panel’s "Add a Product" or “Edit a Product” page, to characterize the product in meta tags and storefront searches |
| tags | Keywords by which this product can also be identified |
| &nbsp;&nbsp;name | Name of the tag |
| custom_fields  | Extra details to display about the product  |
| &nbsp;&nbsp;name | Custom field name |
| &nbsp;&nbsp;value | Custom field value |
| event_date | Property to handle a date-based product |
| &nbsp;&nbsp;name | Name of the event |
| &nbsp;&nbsp;date_start | Event’s start date range |
| &nbsp;&nbsp;date_end | Event’s end date range |
| &nbsp;&nbsp;earliest_year | Event’s starting year |
| &nbsp;&nbsp;latest_year | Event’s ending year |
| &nbsp;&nbsp;type | Type of event |
| &nbsp;&nbsp;category | An array of categories the product belongs to |

## Product Reviews

**Description:** A list of reviews related to this product. When filtering/limiting, reviews' default sorting is by review id, from lowest to highest. (Called on the default `<theme-name>/templates/pages/product.html` and `<theme-name>/templates/components/` subdirectory:
* `products/product-view.html`,
* `products/modals/writeReview.html`, and
* `amp/products/product-view.html`.)

**Handlebars Expression:** `{{product.reviews}}`

**Object Properties:**

| Property | Description |
|---|---|
| start | The review that starts the current page of reviews |
| total | Total number of reviews |
| end | Last review on this page |
| show_review_email | Boolean that indicates whether the Write Review form should have an input field for the reviewer’s e-mail address |
| captcha | reCAPTCHA public key (for validating human versus bot visitors) |
| pagination | References the pagination model |
| list  | List of reviews |
| &nbsp;&nbsp;rating | Product’s rating (1–5 stars) |
| &nbsp;&nbsp;title | Title of the review |
| &nbsp;&nbsp;date | Date the product was reviewed |
| &nbsp;&nbsp;text | Text content of the product review |
| &nbsp;&nbsp;name | Name of the person providing the review |

## Related Products

**Description:** A list of products related to this product. (Called on the default `templates/components/products/tabs.html` partial.)

**Handlebars Expression:** `{{product.related_products}}`

**Object Properties: **References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>.

## Similar Products by Customer Views

**Description:** A list of products similar to a given product, based on customer’s product browsing history. (Called on the default `<theme-name>/templates/components/products/tabs.html` partial.)

**Handlebars Expression:** `{{product.similar_by_views}}`

**Object Properties:** References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>.

## Product Videos

**Description:** A list of videos for a given product. (Called on the default `<theme-name>/templates/pages/product.html` template, and on the `<theme-name>/templates/components/amp/products/product-view.html` partial.)

**Handlebars Expression:** `{{product.videos}}`

**Object Properties:**

| Property | Description |
|---|---|
| id | ID of the product video |
| title_short | Short title of the product video |
| title_long | Long title of the product video |
| description_long | Long description of the product video |
| description_short | Short description of the product video |
| length | Duration of the product video |

## Compare

**Description:** Property to display an array of products on product comparison pages. (Called on the default `<theme-name>/templates/pages/compare.html` template.)

**Handlebars Expression:** `{{comparisons}}`

**Object Properties:** References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>, plus the additional fields listed here:<br>

| Property | Description |
|---|---|
| availability | How long this product usually takes to ship |
| brand | Object containing brand data for this product |
| &nbsp;&nbsp;url | Brand URL for this product |
| &nbsp;&nbsp;name | Brand name for this product |
| remove_url | URL to remove this product/column from the comparison |
| custom_fields | Array of additional product details – size, color, book's ISBN, DVD's release date, etc. – as name/value pairs |
| &nbsp;&nbsp;name | Displayed name for this custom field |
| &nbsp;&nbsp;value | Value for this custom field’s entry |

## Download Item

**Description:** Property for digital (non-physical) products. (Called on the default `<theme-name>/templates/pages/account/download-item.html` template.)

**Handlebars Expression:** `{{downloads}}`

**Object Properties:**

| Property | Description |
|---|---|
| order_id | ID for this order |
| product_name | Name of the digital product |
| items | Array of product components |
| &nbsp;&nbsp;name | Name of this digital item |
| &nbsp;&nbsp;expired | Boolean indicating whether customer’s access/subscription to this item has expired |
| &nbsp;&nbsp;days_remaining | Number of days left in customer’s access/subscription to this item |
| &nbsp;&nbsp;downloads_remaining | Number of times customer may download this item |
| &nbsp;&nbsp;size | File size of this digital item (string, responsively formatted as: 240 KB, 1.1 MB, etc.) |
| &nbsp;&nbsp;description | Description (if entered by merchant) for this item |
| &nbsp;&nbsp;id | ID for this item |
| &nbsp;&nbsp;images | List of all images for the product associated with this list of downloadable items [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |
| &nbsp;&nbsp;thumbnail | "Primary" image for the product associated with this list of downloadable items [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |

## Product Other Details

**Description:** Property to display custom product details (such as a book's ISBN code, a DVD's release date, etc.). (Called on the default `<theme-name>/templates/components/products/product-view.html` and `<theme-name>/templates/components/amp/products/product-view-details.html` partials.)

**Handlebars Expression:**`{{product.custom_fields}}`

**Object Properties:**

| Property | Description |
|---|---|
| name | Displayed name for this category of information |
| value | Displayed value for this product’s entry |

## Category

**Description:**  The category object for the page calling the object. When retrieving a collection of categories, default sorting is by category `id`, from lowest to highest. (Called on the default `templates/pages/category.html` template, and on several partials in the `<theme-name>/templates/components/` subdirectory: `category/shop-by-price.html`,`category/sidebar.html`, and `amp/category/subcategories.html`)

**Handlebars Expression:** `{{category}}`

**Object Properties:**
| Property | Description |
|---|---|
| id | Unique ID for the category  |
| name | Merchant-defined category name |
| url | URL for the category-specific page |
| description | Merchant-defined description of the category |
| image | Image representing this category, in [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |
| subcategories | List of any child categories |
| &nbsp;&nbsp;id | Unique ID for the subcategory  |
| &nbsp;&nbsp;name | Name of the subcategory |
| &nbsp;&nbsp;url | URL to the subcategory |
| &nbsp;&nbsp;description | Merchant-defined description of the subcategory  |
| &nbsp;&nbsp;image | Image representing this subcategory, in [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |
| &nbsp;&nbsp;product_count | Number of products in the subcategory. (Counts at the current level only &ndash; not recursive to deeper levels.) |
| detail_messages | Message displayed when a product is out of stock, and inventory settings are configured to redirect to a category: "Sorry, the product you tried to view is currently out of stock, here are some similar products we have available." (This phrasing is set by the BigCommerce App.) |
| show_compare | Boolean that defines whether to show controls for product comparison |
| show_add_to_cart | Boolean that defines whether to show an Add to Cart button for this category |
| total_products | Count of the number of products in the category |
| faceted_search_enabled | Boolean that defines whether product-filtering search is enabled for the store |
| &nbsp;&nbsp;facets | Available search facets |
| &nbsp;&nbsp;pagination | References the pagination model |
| &nbsp;&nbsp;selected | Selected search facets |

## Category Products

**Description:** A list of products associated with this category. (Called on the default `templates/pages/category.html` template, and on the `templates/components/category/product-listing.html` partial.)

**Handlebars Expression:** `{{category.products}}`

**Object Properties:** References the  [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

## Category Shop by Price

**Description:** A list of price ranges, to enable customers to set price limits within a product category. Called on the default`<theme-name>/templates/components/category/shop-by-price.html` and `<theme-name>/templates/components/category/sidebar.html` partials.)

**Handlebars Expression:** `{{category.shop_by_price}}`

**Object Properties:**

| Property | Description |
|---|---|
| url | URL of price-filtered product results for this category |
| low | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the minimum price boundary  |
| high | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the maximum price boundary |
| selected | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the currently selected price range |

## Brand

**Description:** The brand object for the page calling the object. (Called on the default `templates/pages/brand.html` template.)

**Handlebars Expression:** `{{brand}}`

**Object Properties:**

| Property | Description |
|---|---|
| show_compare | Boolean corresponding to merchant’s control panel selection whether or not to enable product comparisons |
| url | URL of the brand page |
| name | Name of the brand  |
| pagination | References the pagination model |
| image | Image used to visually represent the brand (i.e., logo) |
| faceted_search_enabled | Boolean that defines whether product-filtering search is enabled for the store |
| facets | A list of all possible search filters for this brand |
| products | An array of product card models |
| selected | An array of selected facets |

## Brand List

**Description:** A list of brands with their basic data. Default sorting is by brand id, from lowest to highest. (Called on the default `templates/pages/brands.html` template.)

**Handlebars Expression:** `{{brands}}`

**Object Properties:**

| Property | Description |
|---|---|
| url | URL to this brand’s products listing |
| name | Name of the brand |
| id | Internal identifier for the brand  |
| image | Stencil image object (if any) for the brand |

## Shop by Brand

**Description:** Objects to enable customers to shop by brand. Returns top 10 brands, by product count. (Called on the default `templates/components/brand/sidebar.html` and `templates/components/common/footer.html` partials.)

**Handlebars Expression:** `{{shop_by_brand}}`

**Object Properties:**

| Property | Description|
|---|---|
| links | Array of links to individual brands |
| &nbsp;&nbsp;id | ID for this brand |
| &nbsp;&nbsp;url | URL for this brand |
| &nbsp;&nbsp;name | Name of this brand |
| &nbsp;&nbsp;count | Number of products matching this brand |

## Cart

**Description:** The cart-specific properties for the current session

**Handlebars Expression:** `{{cart}}`

**Object Properties:**

| Property | Description |
|---|---|
| quantity | Total number of items in the cart |
| additional_checkout_buttons | Generates checkout buttons for third-party payments (PayPal, Google Checkout, etc.) |
| show_primary_checkout_button | Boolean that determines whether to show a checkout button |
| show_multiple_address_shipping | Boolean: If **> 1** physical items are in the cart, and checkout button is displayed: whether to also display the ”Ship to multiple addresses”/”Multiple Shipping Addresses” user option |
| discount | Discount being applied to the cart in the current session |
| gift_wrapping_cost | Price object that defines the cost associated with adding gift wrapping to the items in the cart |
| sub_total | Price object that defines the total cost of all the items in the cart. Might or might not include tax, based on the tax display settings the merchant has configured. Excludes shipping, discounts, and gift wrapping. |
| grand_total | Price object that defines the total cost of all the items in the cart. Incorporates estimated shipping, discounts, taxes, and gift wrapping. |
| shipping_handling | Current configuration of the shipping estimator for this session’s current cart; will be null/undefined if the cart contains no physical products |
| &nbsp;&nbsp;handling_cost | Price object that defines the handling cost for the carted items (if any) |
| &nbsp;&nbsp;show_estimator | Boolean indicating whether the merchant wants to show the shipping estimator to customers |
| &nbsp;&nbsp;&nbsp;countries | Countries available to ship to |
| &nbsp;&nbsp;&nbsp;states | List of states/provinces/regions for the country |
| &nbsp;&nbsp;&nbsp;selected_state | The state/province/region that the customer selected for the shipping estimate |
| &nbsp;&nbsp;&nbsp;selected_zip | The ZIP/postal code that the customer selected for the shipping estimate |
| &nbsp;&nbsp;&nbsp;selected_city | The city/town that the customer selected for the shipping estimate |
| &nbsp;&nbsp;&nbsp;shipping_cost | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines shipping cost |
| &nbsp;&nbsp;&nbsp;provider | Shipping provider associated with this shipping estimate |
| coupons | List of coupons applied to the cart; default sorting is by coupon `id`, from lowest to highest |
| &nbsp;&nbsp;id | Unique ID of the coupon |
| &nbsp;&nbsp;code | Code associated with the coupon |
| &nbsp;&nbsp;discount | Discount associated with the coupon |
| &nbsp;&nbsp;type | Coupon type |
| gift_certificates | List of gift certificates applied to the cart |
| &nbsp;&nbsp;id | Unique system ID for the gift certificate |
| &nbsp;&nbsp;code | Customer code used to identify the gift certificate |
| &nbsp;&nbsp;remaining | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the amount remaining on the gift certificate |
| &nbsp;&nbsp;used | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the amount already used on the gift certificate |
| &nbsp;&nbsp;remove_url | URL to remove gift certificate from the cart |
| taxes | List of all applicable taxes for the cart |
| &nbsp;&nbsp;name | Name of the applied tax |
| &nbsp;&nbsp;cost | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the cost of the applied tax |
| &nbsp;&nbsp;included | Boolean that indicates whether taxes are included in the total price for the cart’s contents |

### Cart Items

**Description:** A list of items added to the cart in the current session

**Handlebars Expression:** `{{cart.items}}`

**Object Properties:**

| Property | Description|
|---|---|
| id | Unique system ID for the item in the cart |
| remove_url | URL to remove this item from the cart |
| quantity | Quantity of the item being ordered |
| min_purchase_quantity | Quantity of the item being ordered |
| max_purchase_quantity | Maximum quantity the customer can order of the given item (if applicable) |
| type | String indicating the type of purchase: either "Item" or "GiftCertificate" |
| If type == Item | If the item in the cart is a purchasable product, these properties are available: |
| &nbsp;&nbsp;product_id | Product ID for the cart item |
| &nbsp;&nbsp;brand | Brand details for this cart item |
| &nbsp;&nbsp;&nbsp;name | The product’s brand name |
| &nbsp;&nbsp;name | Product name of the cart item |
| &nbsp;&nbsp;url | Link to the product page for the cart item |
| &nbsp;&nbsp;sku | SKU value for this cart item |
| &nbsp;&nbsp;availability | An optional availability message set by the merchant |
| &nbsp;&nbsp;image | Product image for the cart item |
| can_modify | Boolean indicating whether the customer may modify the quantity of, or remove, this cart item (read-only field)|
| &nbsp;&nbsp;event_date | Chosen event date for event-based products |
| &nbsp;&nbsp;show_gift_wrapping | Boolean indicating whether the wrapping options are shown |
| gift_wrapping | Gift-wrapping options |
| &nbsp;&nbsp;name | Name of the gift-wrapping option |
| &nbsp;&nbsp;price | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the price of the gift-wrapping option |
| &nbsp;&nbsp;message | Customer-defined message for the gift wrapping  |
| &nbsp;&nbsp;remove_url | URL to remove the gift-wrapping option |
| &nbsp;&nbsp;rrp | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the cart item's list price (MSRP); can be used to display struck-out list prices |
| &nbsp;&nbsp;price | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the unit price of the cart item, after discounts; to see how this and the next three price properties relate to each other, see Cart Price Properties |
| &nbsp;&nbsp;price_discounted | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the unit price, after all cart discounts and promotions |
| &nbsp;&nbsp;total | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the total price (price * quantity) of the cart item |
| &nbsp;&nbsp;total_discounted | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the total price (price * quantity), after all cart discounts and promotions |
| &nbsp;&nbsp;release_date | If a pre-order product was added to the cart,  displays a message about when the item is expected to ship to the customer |
| options | Options chosen when product was added to cart |
| &nbsp;&nbsp;name | Name of the option |
| &nbsp;&nbsp;value | Value of the option |
| bulk_pricing | Properties for applying bulk-pricing discounts to cart items |
| &nbsp;&nbsp;base_price  | The lowest calculated price on an item. For example, 2 items are $99, 3 items are $98 and 4 items are $97. There are 3 items in the cart, the base price will be $98.  |
| &nbsp;&nbsp;discount_amount  | Bulk-discount amount per item, if applicable; otherwise, null |
| &nbsp;&nbsp;discount_percentage  | Bulk-discount percentage per item, if applicable; otherwise, null |
| custom_fields | Custom product fields set when product was added to cart |
| configurable_fields | Custom product fields set when product was added to cart |
| If type == GiftCertificate | If the item in the cart is a gift certificate, these properties are available: |
| &nbsp;&nbsp;name | Sender’s name  |
| &nbsp;&nbsp;edit_url | URL to edit the gift certificate |
| &nbsp;&nbsp;recipient | Recipient’s name |
| &nbsp;&nbsp;price | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the gift certificate’s basic price |
| &nbsp;&nbsp;total | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the gift certificate’s total cost, with applicable taxes included |

### Strikeout Pricing Example

As a theme developer, you can use the `{{cart.items.rrp}}` property to display strike-out pricing in the Cart context. Here is the general approach:

In your `templates/components/cart/content.html` file, as you iterate over the list of items in the cart, you would check each item's `type`. (No `rrp` property is available where the `type` is `GiftCertificate`.)

If the type is `Item`, then you would check the `{{cart.items.rrp}}` value. If the value is _not_ `null`, then you would know that you can display a strike-out price for the item. Below is a sample code skeleton:

```handlebars title="templates/components/cart/content.html" lineNumbers
{{#each cart.items}}
   <!--...-->
  {{#if type '==' 'GiftCertificate'}}
      {{#if rrp}}
          <!-- your code to display strike-thru pricing -->
      {{else}}
          <!-- your code to display normal pricing -->
      {{/if}}
  {{/if}}
{{/each}}
```

For further details about catalog price properties, please see [Catalog Price Object: How Properties Interact](/stencil-docs/conditional-logic-examples/catalog-price-object). For usage examples of the `{{cart.items}}` `price` and `total` properties, please see [Cart Price Properties](/stencil-docs/conditional-logic-examples/cart-price-relationships).

### Cart Status Message

**Description:** A list of relevant messages for the cart in the current session

**Handlebars Expression:** `{{cart.status_messages}}`

**Object Properties:**

| Property  | Description  |
|-|-|
| message  | System-generated messages for the cart  |
|type|Type of message: error, info, or success	|


## Customer

**Description:** Customer-specific properties for a storefront customer object. When filtering/limiting, customers' default sorting is by customer id, from lowest to highest. (Called on several partials in the `templates/components/` subdirectory:
`page/contact-us-form.html`,
`common/subscription-form.html`,
`account/address-list.html`,
`account/messages-form.html`, and
`account/wishlist-list.html`.)

**Handlebars Expression:** `{{customer}}`

**Object Properties:**

| Property | Description|
|---|---|
| id | Customer’s ID |
| name | Customer’s name |
| email | Customer’s email address |
| phone | Customer’s phone number |
| store_credit | Customer’s store credit |
| customer_group_id | ID of this customer's group |
| customer_group_name | Name of this customer's group |
| num_new_messages | Number of unread messages for this customer |
| num_wishlists | Number of wishlists for this customer |
| shipping_address | Shipping address used for the order |
| &nbsp;&nbsp;id | Unique, system-generated ID |
| &nbsp;&nbsp;first_name | Customer’s shipping (first) name |
| &nbsp;&nbsp;last_name | Customer’s shipping (last) name |
| &nbsp;&nbsp;company | Customer's shipping company name |
| &nbsp;&nbsp;address1 | Customer's shipping address, first line |
| &nbsp;&nbsp;address2 | Customer's shipping address, second line |
| &nbsp;&nbsp;city | Customer's shipping city |
| &nbsp;&nbsp;state | Customer's shipping state |
| &nbsp;&nbsp;zip | Customer's shipping zip |
| &nbsp;&nbsp;country | Customer's shipping country |
| &nbsp;&nbsp;phone | Customer's shipping phone number |
| &nbsp;&nbsp;state_id | ID for customer's shipping state/province/region |
| &nbsp;&nbsp;country_id | ID for customer's shipping country |
| &nbsp;&nbsp;destination | Type of delivery destination: residential or business/commercial |
| &nbsp;&nbsp;last_used | Timestamp when this address was last used as a shipping address |
| &nbsp;&nbsp;form_session_id | Used for custom shipping forms |
| &nbsp;&nbsp;payment_methods | Used on the [payment methods page](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/account/payment-methods-list.html) to render list of customer's saved payment methods |

## Order Details

**Description:** The order properties for a specific order, usable on the order details page. (Called on the default `templates/pages/account/orders/details.html` and `<theme-name>/templates/pages/account/orders/invoice.html` templates, and on the `<theme-name>/templates/components/account/order-contents.html` partial.)

**Handlebars Expression:** `{{order}}`

**Object Properties:**

| Property | Description|
|---|---|
| date | Date of the order |
| id | Unique, system-generated ID |
| total | Price object that defines the order’s total value |
| status | Order status code |
| status_text | Status text associated with the status code for the order |
| returns_enabled | Boolean that indicates whether merchant allows products from the order to be returned |
| reorder_url | URL to place reorders for items in this order |
| invoice_url | URL to display an invoice for this order |
| is_complete | Boolean indicating that the order has been completed |
| comments | Customer’s message about the order |
| items | List of items for the order |
| &nbsp;&nbsp;order_product_id | Product ID |
| &nbsp;&nbsp;name | Product Name |
| &nbsp;&nbsp;quantity | Quantity Ordered |
| &nbsp;&nbsp;refunded | Price object that defines the value of this product that has been refunded |
| &nbsp;&nbsp;event_date  | A chosen event date for the product |
| &nbsp;&nbsp;price | Price object that defines the product’s price |
| &nbsp;&nbsp;shipping_rows | Array of shipping addresses, for each item in the order |
| &nbsp;&nbsp;&nbsp;address | Street address to ship to |
| &nbsp;&nbsp;&nbsp;city | City to ship to |
| &nbsp;&nbsp;&nbsp;state  | State to ship to |
| &nbsp;&nbsp;&nbsp;zip | Postal/ZIP code to ship to |
| &nbsp;&nbsp;&nbsp;country | Country to ship to |
| &nbsp;&nbsp;&nbsp;gift_wrapping_name | Name of the gift-wrapping option used |
| &nbsp;&nbsp;&nbsp;type | Type of purchase; value is one of: physical, digital, giftcertificate |
| &nbsp;&nbsp;&nbsp;download_url | URL at which customer can download digital item |
| &nbsp;&nbsp;&nbsp;image | The image of the order’s first product, in [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |
| &nbsp;&nbsp;&nbsp;show_reorder
 | Boolean indicating whether the customer should see a button for reordering items on the Account Order Details page |
| &nbsp;&nbsp;&nbsp;reorder_message | An error message to be displayed when the customer attempts to reorder items that can’t be reordered |
| &nbsp;&nbsp;&nbsp;options | A list of options selected when this product was purchased |
| &nbsp;&nbsp;&nbsp;&nbsp;name | Display name for the option ("Small", "Medium", etc.) |
| &nbsp;&nbsp;&nbsp;&nbsp;value | Value that customer selected for the option |
| billing_address | Billing address used for the order |
| &nbsp;&nbsp;full_name | Customer's billing name |
| &nbsp;&nbsp;company | Customer's billing company name |
| &nbsp;&nbsp;address_lines | Customer's billing address |
| &nbsp;&nbsp;city | Customer's billing city |
| &nbsp;&nbsp;state | Customer's billing state |
| &nbsp;&nbsp;country | Customer billing country |
| &nbsp;&nbsp;zip | Customer billing ZIP |
| &nbsp;&nbsp;phone | Customer billing phone number |
| shipping_address_count | Number of shipping addresses the customer has specified for this order |
| shipping_address | Shipping address used for the order |
| &nbsp;&nbsp;full_name | Customer's shipping name |
| &nbsp;&nbsp;company | Customer's shipping company name |
| &nbsp;&nbsp;address_lines | Customer's shipping address |
| &nbsp;&nbsp;city | Customer's shipping city |
| &nbsp;&nbsp;state | Customer's shipping state |
| &nbsp;&nbsp;country | Customer's shipping country |
| &nbsp;&nbsp;zip | Customer's shipping zip |
| &nbsp;&nbsp;phone | Customer's shipping phone number |
| payment_method | Customer’s payment method for this order (payment gateway) |
| card_number_last_four | Last four digits of customer’s credit card |
| total_rows | A list of “total” rows containing total pricing information |
| &nbsp;&nbsp;label | The label of the total row (Subtotal, Tax, Grand Total, etc.) |

## Recent Items

**Description:** Items the customer has recently viewed. (Called on the default `templates/pages/account/recent-items.html` template.)

**Handlebars Expression:** `{{customer.recently_viewed_products}}`

**Object Properties:** References the standard [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

## Customer Wishlists

**Description:** Array of product wishlists, specific to this store, for the customer. (Called on the default `templates/components/account/wishlist-list.html` partial.)

**Handlebars Expression:** `{{customer.wishlists}}`

**Object Properties:**

| Property | Description |
|---|---|
| id | Unique system ID of the wishlist |
| num_items | Number of items in the wishlist |
| name | Customer-defined name of the wishlist |
| is_public | Boolean value indicating whether the wishlist is publicly available  |
| is_editable | Boolean indicating whether the "Remove Item" button, and account navigation controls, are displayed (i.e., whether the customer viewing the wishlist is this wishlist’s owner) |
| token | Unique public token for the wishlist |
| view_url | URL to view the wishlist |
| edit_url | URL to edit the wishlist |
| delete_url | URL to delete the wishlist |
| share_url | URL to share the wishlist |
## Wishlist Details

**Description:** Wishlist information for a specific wishlist. (Called on the default `templates/pages/account/wishlist-details.html` template and `templates/components/account/wishlist-item-list.html`partial.)

**Handlebars Expression:** `{{wishlist}}`

**Object Properties:**

| Property | Description |
|---|---|
| id | Unique system ID for the wishlist |
| name | Customer-defined name of the wishlist |
| is_public | Boolean value indicating whether the wishlist is publicly available  |
| token | Unique public token for the wishlist |
| share_url | URL used to share the wishlist |
| items | List of items in the wishlist; extends the product card model, adding the extra properties below: |
| &nbsp;&nbsp;id | Unique system ID for this wishlist item |
| &nbsp;&nbsp;product_id | Product ID for the item |
| &nbsp;&nbsp;remove_url | URL to remove the product from the wishlist |
## Account Order Shipments

**Description:** Objects to manage shipments associated with a specific order details for the current customer. (Called on the default `<theme-name>/templates/pages/account/orders/details.html` template.)

**Handlebars Expression:** `{{shipments}}`

**Object Properties:**

| Property | Description |
|---|---|
| date_shipped | Shipping date for this shipment |
| shipping_provider | Carrier for this shipment |
| shipping_method | Shipping method for this shipment |
| show_shipping_method | Boolean indicating whether to display the shipping method to the customer |
| shipping_track | Tracking information for this shipment |
| &nbsp;&nbsp;url | Tracking URL for this shipment |
| &nbsp;&nbsp;number | Tracking number for this shipment |
## Account Orders

**Description:** Objects to manage completed orders for the current customer. By default, orders sort by order id, from lowest to highest. (Called on the default `templates/pages/account/orders/all.html` and `<theme-name>/templates/pages/account/orders/completed.html`  templates, and on the `templates/components/account/orders-list.html` partial.)

**Handlebars Expression:** `{{customer.orders}}`

**Object Properties:**

| Property | Description|
|---|---|
| pagination | References pagination model |
| date | Date this order was placed |
| last_update_date | Date this order was last updated |
| id | ID for this order |
| total | Total value of this order |
| status | Status of this order ("Completed" or other) |
| return_url | URL for returning items in this order |
| reorder_url | URL for reordering items in this order |
| details_url | URL for details about this order |
| payment_instructions | Text field defined by merchant as to payment instructions for manual gateways such as “Bank Deposit” |
| image | Image of the order’s first product, in Stencil image format |
| items | Array of products in this order |
| &nbsp;&nbsp;name | Name of this product |
| &nbsp;&nbsp;quantity | Quantity of this product ordered |
| &nbsp;&nbsp;refunded | Price object that defines the amount of this product that has been refunded |
| &nbsp;&nbsp;expected_release_date | Expected ship date if the product is set to pre-order status |
| &nbsp;&nbsp;type | Type of purchase; value is one of: physical, digital, giftcertificate |
| &nbsp;&nbsp;download_url | URL for customer to download a digital product |
| &nbsp;&nbsp;image | The image for this ordered product |
| &nbsp;&nbsp;options | Array of additional product details (size, color, etc.), as name/value pairs |
| &nbsp;&nbsp;&nbsp;name | Displayed name for this category of information |
| &nbsp;&nbsp;&nbsp;value | Displayed value for this product’s entry |
## Account Returns

**Description:** Objects to manage returns for the current customer. (Called on the default `templates/pages/account/returns.html` template.)

**Handlebars Expression:** `{{customer.returns}}`

**Object Properties:**

| Property | Description |
|---|---|
| date_requested | Date on which the customer requested this return |
| id | The ID for this return |
| quantity | Quantity of items returned |
| reason | Reason for return; merchants can define actions beyond the default strings created with each store, which are: Received Wrong Product, Wrong Product Ordered, Not Satisfied With The Product, and There Was A Problem With The Product |
| action | Return action; merchants can define actions beyond the default set created with each store (Repair, Replacement, or Store Credit) |
| comments | Comments that the customer entered with the return request |
| status | Status of the return: Pending, Received, Authorized, Repaired,
Refunded, Rejected, or Cancelled |
| product | Array of products included in the return |
| url | URL for this product |
| name | Name of this product |
| options | Array of additional product details (size, color, etc.), as name/value pairs |
| &nbsp;&nbsp;name | Displayed name for this category of information |
| &nbsp;&nbsp;value | Displayed value for this product’s entry |
| image | Image for this product |
## Account New Return

**Description:** Objects to handle a new return for the current customer. (Called on the default `templates/pages/account/add-return.html` template.)

**Handlebars Expression:** `{{forms.return}}`

**Object Properties:**

| Property | Description |
|---|---|
| order_id | ID for the original order |
| reasons | Reasons for return |
| actions | Return actions: an array of strings arbitrarily defined by the merchant: refund, exchange, credit, etc. |
| order_products | Array of products from the order that are available to return |
| &nbsp;&nbsp;id | ID for the product |
| &nbsp;&nbsp;name | Name of this product |
| &nbsp;&nbsp;product_id | ID for this product |
| &nbsp;&nbsp;price | Price object that defines this product’s price |
| &nbsp;&nbsp;quantity | Quantity of the product returned |
| &nbsp;&nbsp;options | Array of additional product details (size, color, etc.), as name/value pairs |
| &nbsp;&nbsp;&nbsp;&nbsp;name | Displayed name for this category of information |
| &nbsp;&nbsp;&nbsp;&nbsp;value | Displayed value for this product’s entry |
## Create Account

**Description:** Object to enable the current customer to create a store account. (Called on the default `<theme-name>/templates/pages/auth/create-account.html` template.)

**Handlebars Expression:** `{{forms.create_account}}`

**Object Properties:**

| Property | Description|
|---|---|
| recaptcha | Objects for integrating the Google reCAPTCHA service to distinguish human visitors from ’bots (automated agents) |
| &nbsp;&nbsp;enabled | Boolean indicating whether reCAPTCHA is enabled for this store |
| &nbsp;&nbsp;public_key | Public key (site key) that reCAPTCHA returns upon merchant’s enabling CAPTCHA security in **Store Settings > Display Settings** |
| address_fields | Array of form fields that define each shipping address for this customer; for details, see the [Cornerstone template form component](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms) |
| &nbsp;&nbsp;class_name | Specifies a CSS class (defined in the theme's `/assets/scss/` subdirectory) to apply to a field within the array; for corresponding control-panel steps, see [Editing Form Fields](https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings)  |
| account_fields | Object of form fields; for details, see the [Cornerstone template form component](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms) |
| &nbsp;&nbsp;class_name | Specifies a CSS class to apply to a field within the array; for corresponding control-panel steps, see
[Editing Form Fields](https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings)  |
| error | BCApp generated message to display when customer’s account creation fails |
| checking_out | Boolean indicating whether customer created the account during a purchase checkout |
## Shipping Addresses

**Description:** Object to enable the customer to enter shipping and contact information. (Called on the default `templates/components/account/address-list.html` partial.)

**Handlebars Expression:**`{{customer.addresses}}`

**Object Properties:**

| Property | Description |
|---|---|
| id | ID for this shipping address |
| customer_id | ID for this customer |
| first_name | First name to ship to |
| last_name | Last name to ship to |
| company | Company name to ship to |
| address1 | Street (etc.) address, first line |
| address2 | Street (etc.) address, second line |
| city | City to ship to |
| state | State/province/region to ship to |
| zip | Postal/ZIP code to ship to |
| country | Country to ship to |
| phone | Addressee’s phone number |
| state_id | ID for destination state/province/region |
| country_id | ID for destination country |
| destination | residential or commercial |
| last_used | Boolean, indicating whether this was the last-used shipping address for this customer |
| full_name | Full name of addressee |
| edit_url | URL for customer to edit this shipping address |
| delete_url | URL for customer to delete this shipping address  |

## Payment Methods

**Description:** Object to view stored customer payment methods.

**Called on:** [`[templates/pages/account/payment-methods.html]`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/payment-methods.html)

**Handlebars Expression:**`{{customer.payment_methods}}`

**Object Properties:**
| Property | Description  |
|--|--|
| add_url | URL to add a payment method to this provider |
| display_name | display name set on the payment settings page for the gateway |
| methods | array |
| ↳ bigpay_token | unique ID identifying the payment method |
| ↳ billing_address | object |
|&nbsp; &nbsp; ↳ address_line_1 | Address Line One |
|&nbsp; &nbsp; ↳ address_line_2 | Address Line Two |
|&nbsp; &nbsp; ↳ city | City |
|&nbsp; &nbsp; ↳ company | Company |
|&nbsp; &nbsp; ↳ country_code |Country code |
|&nbsp; &nbsp; ↳ country_name | Country name |
|&nbsp; &nbsp; ↳ first_name | First name |
|&nbsp; &nbsp; ↳ last_name | Last name |
|&nbsp; &nbsp; ↳ phone | Phone |
|&nbsp; &nbsp; ↳ postal_code | Postal Code |
|&nbsp; &nbsp; ↳ state | State |
|  ↳ brand | Brand of card. visa. mastercard etc. |
| ↳ default_instrument | Boolean, whether the card is the default payment method for the shopper |
| ↳ delete_url | URL to delete this specific payment method |
| ↳ edit_url | URL to edit this specific payment method |
| ↳ expiry_month | Expiration month |
| ↳ expiry_year | Expiration Year |
| ↳ last_4 | Last four of card |
| ↳ provider | ID of the provider to add a vaulted card |
| ↳ expiry_year | Expiration Year |

## Edit Payment Methods

**Description:** Object to view stored customer payment methods.

**Called on:** [`templates/pages/account/payment-methods.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/payment-methods.html)

**Handlebars Expression:**`{{customer.payment_methods}}`

**Object Properties:**
| Property | Description  |
|--|--|
| bigpay_token | unique ID identifying the payment method |
| billing_address | object |
| ↳ address_line_1 | Address Line One |
| ↳ address_line_2 | Address Line Two |
| ↳ city | City |
| ↳ company | Company |
| ↳ country_code |Country code |
| ↳ country_name | Country name |
| ↳ first_name | First name |
| ↳ last_name | Last name |
| ↳ phone | Phone |
| ↳ postal_code | Postal Code |
| ↳ state | State |
|brand | Brand of card. visa. mastercard etc. |
|default_instrument | Boolean, whether the card is the default payment method for the shopper |
| forms | Contains all the availble form fields on the update payments page. Object |
| &nbsp; ↳ action | The url to update payment methods. `/account.php?action=update_payment_method` |
| &nbsp; ↳  billing_fields | Array. The drop down for the billing country selection. |
| &nbsp; &nbsp; ↳  chooseprefix | Appears at the top of the country drop-down. Ex. `Choose a Country` |
| &nbsp; &nbsp; ↳  class_name | Field identifier Ex. `Field200` |
| &nbsp; &nbsp; ↳  id | Id of the Field Ex. `FormField_11`  |
| &nbsp; &nbsp; ↳  label | Field Label . Appears above the field. Ex. `Country`|
| &nbsp; &nbsp; ↳  name | Field identifier `FormField[2][11]` |
| &nbsp; &nbsp; ↳  options | Only returns if the field has a dropdown value |
| &nbsp; &nbsp;  &nbsp; &nbsp; ↳  label | Country label Ex. `United States` |
| &nbsp; &nbsp;  &nbsp; &nbsp; ↳  selected | This only appears in the results if the field is selected. Boolean Ex. `true` |
| &nbsp; &nbsp;  &nbsp; &nbsp; ↳  value | Country value Ex. `United States` |
| &nbsp; &nbsp; ↳  partial | The type of field. `select`, `text`, `multiline` |
| &nbsp; &nbsp; ↳  private_id | The ID of the field. (Used by the backend to identify what type of value has been provided.) e.g. "City"  |
| &nbsp; &nbsp; ↳  required |  Boolean value to indicate whether the field is required or not.|
| &nbsp; &nbsp; ↳  type |  The type of field e.g. "singleline" for a First Name text entry or "singleselect" for a Country drop down |
| &nbsp; &nbsp; ↳  validation | A JSON string used by the front-end to provide validation and error cues. |
| &nbsp; &nbsp; ↳  size |  This indicates the size of the field's box. Not used. Always empty. (Theme styles will override this anyway.)|
| &nbsp; &nbsp; ↳  value | Returns if there is a current value for the field e.g. 90210 |
| last_four | last four of the credit card |
| provider | Credit card provider |

## Add Payment Methods

**Description:** Object to add stored customer payment methods.

**Called on:** [`templates/pages/account/payment-methods.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/add-payment-method.html)

**Handlebars Expression:**
* `{{vault}}`
* `{{countries}}`
* `{{forms}}`

**Object Properties:**
| Property | Description  |
|--|--|
| vault | Object |
|&nbsp;↳ access_token | token needed to submit with the ADD payment method form otherwise form submission will fail with 401 Unauthorized |
|&nbsp;↳ expires_at | Expiration Date in Unix Timestamp|
| countries |  countries with state information, used in the country and state drop downs when submitting the ADD payment form |
| &nbsp; ↳ code | country code |
| &nbsp; ↳ label | country name that appears in the dropdown |
| &nbsp; ↳ value | country name |
| &nbsp; ↳ name | state name |
| forms | Object |
| &nbsp; ↳ provider | ID of the provider to add a vaulted card. Ex. stripe |

## Blog

_These objects are called on the default `templates/components/blog/post.html` partial._

**Description:** Blog-specific properties for the blog feature within BigCommerce storefronts

**Handlebars Expression:** `{{blog}}`

**Object Properties:**

| Property | Description |
|---|---|
| name | Blog name |
| url | Blog custom url |
| pagination | References pagination model |
| posts  | A list of posts for the blog index; default sorting is by date_published, from most recent to earliest |
| &nbsp;&nbsp;author | Author of the blog post |
| &nbsp;&nbsp;title | Title of the blog post |
| &nbsp;&nbsp;url | URL of the blog entry |
| &nbsp;&nbsp;body | Body of the blog entry |
| &nbsp;&nbsp;thumbnail | Image thumbnail for the blog entry, in [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |
| &nbsp;&nbsp;date_published | Date the blog entry was published |
| &nbsp;&nbsp;social | Social media tags for the blog entry |
| &nbsp;&nbsp;tags  | Tags for the blog |
| &nbsp;&nbsp;&nbsp;name | Name for the tag |
| &nbsp;&nbsp;&nbsp;url | URL for the tag |
## Blog Post

**Description:** Individual blog post object

**Handlebars Expression:** `{{blog.post}}`

**Object Properties:**

| Property | Description |
|---|---|
| author | Author of the blog post |
| title | Title of the blog post |
| url | URL of the blog entry |
| body | Body of the blog entry |
| thumbnail | Image thumbnail for the blog entry, in [Stencil image format](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image) |
| date_published | Date the blog entry was published |
| social | Social media tags for the blog entry |
| tags  | Tags for the blog |
| &nbsp;&nbsp;name | Name for the tag |
| &nbsp;&nbsp;url | URL for the tag |
## Forms

### Account Form

**Description:** The form object used to edit a customer object. <br>

**Handlebars Expression:** `{{forms.edit_account}}`

**Object Properties:**

| Property | Description|
|---|---|
| first_name | First name of the customer being edited |
| last_name | Last name of the customer being edited |
| company_name | Company of the customer being edited |
| phone | Phone number of the customer being edited |
| error | Message to display (generated by the BigCommerce App) when customer’s account edit fails |
| success | Message to display (generated by the BigCommerce App) when customer’s account edit succeeds |
### Account Address Form

**Description:** Form object presented to customers in the Add/Edit Address page. Called on the default <NOBR><span class="inline-code"><theme-name>/templates/components/account/address-list.html</span></nobr> partial and <NOBR><span class="inline-code"><theme-name>/templates/pages/account/add-address.html</span></nobr> template. <br>

**Handlebars Expression:** `{{forms.address}}`

**Object Properties:**

| Property | Description|
|---|---|
| address_id | ID for this shipping address |
| shipping_fields | Array of form fields that define each shipping address for this customer; for details, see the [Cornerstone template form component](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms) |
| action | URL to the proper handler (Update Address versus Save New Address) |
| error | Message to display when form entry fails (defined by the BigCommerce App) |
### Wishlist Form

**Description:** Form object presented to customers on the Add/Edit Wishlist page. Called on the default `<theme-name>/templates/components/account/add-wishlist.html` partial and `<theme-name>/templates/pages/account/add-wishlist.html` template.

**Handlebars Expression:** `{{forms.wishlist}}`

**Object Properties:**

| Property | Description |
|---|---|
| name | Displayed name for this wishlist |
| id | ID for this wishlist |
| is_public | Boolean indicating whether this wishlist is displayed to other store visitors |
| errors | Message to display when form entry fails (generated by the BigCommerce App) |
| action | URL to the proper handler (Update Wish List versus Save New Wish List) |

### Gift Certificate Form

**Description:****<em> </em>**Form object used to create and edit a gift certificate object for the merchant's store. Called on the default <NOBR><span class="inline-code"><theme-name>templates/pages/gift-certificate/purchase.html</span></nobr> template. <br>

**Handlebars Expression:** `{{forms.gift_certificate}}`

**Object Properties:**

| Property | Description |
|---|---|
| editing | Whether the current context is editing a gift certificate in the cart, or adding a new gift certificate |
| can_use_custom_amount | Whether the customer can enter free-text input (otherwise, must select from a drop-down list) |
| amount_options | If can_use_custom_amount is disabled, this variable fills the dropdown with the available options, in [price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) form |
| minimum | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the minimum amount a customer can enter (when can_use_custom_amount is enabled) |
| maximum | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the minimum amount a customer can enter  (when can_use_custom_amount is enabled) |
| expires_in_days | If the gift certificates expire, this will be non-0 numerical days |
| errors | Server-side validation errors from the form’s submission |
| themes | A list of active gift-certificate themes (Birthday, Celebration, General, etc.), each stored as an object containing corresponding display and value children |
| display | Birthday, Celebration, General, etc. |
| value | Birthday.html, Celebration.html, General.html, etc. |
| action | The action for the form |
| cart_item_id | If editing, this is the cart item id being edited. |
| values | An array of the form values for prefilling |
| &nbsp;&nbsp;to_name | The recipient's name |
| &nbsp;&nbsp;to_email | To email address |
| &nbsp;&nbsp;from_name | The sender’s name |
| &nbsp;&nbsp;from_email | From email address |
| &nbsp;&nbsp;message | An optional custom message |
| &nbsp;&nbsp;amount | [Price object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price) that defines the amount of the gift certificate |


### Contact Us Form

**Description:**Form object used to manage merchants’ "Contact Us" pages. Called on the default `<theme-name>/templates/pages/contact-us.html`template.

**Handlebars Expression:** `{{forms.contact}}`

**Object Properties:**

| Property | Description |
|---|---|
| success | Boolean indicating whether form was just submitted |
| name | Boolean indicating whether name input is enabled for the form |
| company | Boolean indicating whether company-name input is enabled for the form |
| phone | Boolean indicating whether phone-number input is enabled for the form |
| order | Boolean indicating whether order-number input is enabled for the form |
| rma | Boolean indicating whether RMA (Return Merchandise Authorization) input is enabled for the form |
| page_id | Page ID for this contact page (there can be multiple contact pages) |
| captcha_url | URL to provide an image file for a CAPTCHA field |
| text | Text content to display above the form |
| error | Potential error that occurred during previous form submission |
| recaptcha.markup | Adds reCaptcha V2 |
### Login Account Form

**Description:** Form object used to manage merchants’ "Login" page. Called on the default `<theme-name>/templates/pages/create-login.html`template.

**Handlebars Expression:** `{{forms.login}}`

**Object Properties:**

| Property | Description |
|---|---|
| error | BigCommerce defined message to display when customer’s login action fails |
| success | BigCommerce defined message to display when customer’s login action succeeds |
| reCAPTCHA |  |
| &nbsp;&nbsp;enabled | Returns 1 when reCAPTCHA is enabled and 0 when it's disabled within the BigCommerce control panel |
| &nbsp;&nbsp;public_key | Optional key used for all reCAPTCHA in your store if specified in the BigCommerce control panel |
| &nbsp;&nbsp;markup | HTML that adds reCAPTCHA V2 |

<!-- theme: info -->
> #### Customizing Login Form Content
> Login form content can be customized in templates/components/common/alert-success.html

## Order Confirmation Objects

### Checkout Object

**Description:** Used to access checkout content and data in `templates\pages\order-confirmation.html`

**Handlebars Expression:** `{{checkout.*}}`

**Object Properties:**

| Property                     | Description                            |
|-|-|
| checkout                     |                                        |
| ↳ order_confirmation_content | default content from checkout template |
| ↳ checkout_head              | default content from checkout `<head>` |
| ↳ order                      | an order object                        |
|   ↳ id                       | the `id` of the order                  |
| ↳ header_image               | img `src` for header                   |
