# Common Objects

<div class="otp" id="no-index">

### On This Page
- [Catalog Price](#catalog-price)
- [Price](#price)
- [Price Range](#price-range)
- [Stencil Image](#stencil-image)
- [Common Product Card Model](#common-product-card-model)

</div> 

Certain Stencil objects can be accessed through multiple other Stencil objects. For example, the image object is exposed through the Category, Product, Product Options, and other objects. Its structure is consistent for all objects/properties that access it.

This consistent behavior is true for each of the common objects documented in the following subsection.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Debugging Your Theme
> The Stencil framework provides built-in debugging tools to aid in your custom front-end development. When you want to see what data is available on the page you are working on, you can simply add the debug query string to your store’s localhost URL. Here is an example:

> `http://localhost:3000/product/this-is-a-sample-product?debug=context`
> This will return a list of all the objects available on the page, in JSON syntax. If you want to view the available JSON objects and rendered page at the same time, simply change the debug value to bar. Below is an example:

> `http://localhost:3000/product/this-is-a-sample-product?debug=bar`

</div>
</div>
</div>

## Catalog Price

**Description:** Exposes catalog price and currency-related properties in both raw numeric, and formatted string, formats. Tax settings display [configuration](https://support.bigcommerce.com/s/article/Manual-Tax-Setup#display-settings) will determine which properties are available.

**Available through:**
* Common Object: <a href="#common-objects_common-product">Common Product Card Model</a>
* Object: `{{product.price}}`

**Object Properties:**

| Property | Description | Type |
|-|-|-|
| with_tax | Price including tax | object |
| &#x21B3; currency | Currency code | string  <br> `"USD"`|
| &#x21B3; formatted | String representation of the above price, including currency formatting | string <br> `"$216.50"` |
| &#x21B3; value |Raw numeric value of the above price | number <br> `216.5`
| without_tax | Price excluding tax | object |
| &#x21B3; currency | Currency code | string <br> `"USD"` |
| &#x21B3; formatted | String representation of the above price, including currency formatting | string <br> `"$200.00"` |
| &#x21B3; value | Raw numeric value of the above price | number <br> `200` |
| non_sale_price_with_tax | Non-sale price, including tax (can be displayed alongside standard with_tax during sale events) | object |
| &#x21B3; currency | Currency code | string <br> `"USD"` |
| &#x21B3; formatted | String representation of the above price, including currency formatting | string <br> `"$243.56"`|
| &#x21B3;  value | Raw numeric value of the above price | number <br> `243.56`|
| non_sale_price_without_tax | Non-sale price, excluding tax (can be displayed alongside standard without_tax during sale events) | object |
| &#x21B3; currency | Currency code | string <br> `"USD"` |
| &#x21B3; formatted | String representation of the above price, including currency formatting | string <br> `"$225.00"`|
| &#x21B3; value | Raw numeric value of the above price | number <br> `225.00`|
| rrp_with_tax	|List (i.e., manufacturer’s suggested retail) price, including tax | object |
| &#x21B3; currency | Currency code | string <br> `"USD"` |
|  &#x21B3; formatted	| String representation of the above price, including currency formatting | string <br> `"$242.48"` |
| &#x21B3; value	| Raw numeric value of the above price | number <br> `242.48` |
| rrp_without_tax | List (i.e., suggested retail) price, excluding tax | object|
| &#x21B3; currency | Currency code | string <br> `"USD"` |
|  &#x21B3; formatted	| String representation of the above price, including currency formatting | string <br> `"$224.00"` |
| &#x21B3; value | Raw numeric value of the above price | number <br> `224`|
|saved | Amount customer saved, compared to list price | object |
| &#x21B3; currency | Currency code | string <br> `"USD"` |
|  &#x21B3; formatted	| String representation of the above price, including currency formatting | string <br> `"$25.98"` |
| &#x21B3; value | Raw numeric value of the above price | number <br> `25.98`|
| tax_label	| Tax label (VAT, sales tax, etc.) displayed to customers. | string  <br> `"Tax"`|
| price_range | See [Price Range Object](https://developer.bigcommerce.com/stencil-docs/reference-docs/common-objects#common-objects_price-range)| |

## Price

<b>Description:</b> Exposes price- and currency-related properties in both raw numeric, and formatted string, formats.

<b>Available through:</b>

* Common Object: <a href="#common-objects_common-product">Common Product Card Model</a>
* Object: `{{category.shop_by_price}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>currency</td>
    <td>Currency code </td>
  </tr>
  <tr>
    <td>formatted</td>
    <td>String representation of the price, including currency formatting</td>
  </tr>
  <tr>
    <td>value</td>
    <td>Raw numeric value of the price</td>
  </tr>
</table>

## Price Range

<b>Description:</b> For products with several variants with different prices, a price range is available which exposes the minimum and maximum variant price.

<b>Object Properties:</b>

| Property | Description | Type |
|-|-|--|
| retail_price_range | Product Price Range | object |
|&#x21B3;   max | The minimum variant price for the product | object |
|&nbsp;  &nbsp;  &#x21B3;  with_tax | Price including tax | object |
|&nbsp;  &nbsp; &nbsp;  &nbsp;  &#x21B3; currency | Currency code | string  <br> `"USD"`|
| &nbsp;  &nbsp; &nbsp;  &nbsp; &#x21B3;formatted | String representation of the above price, including currency formatting | string <br> `"$37.89"` |
| &nbsp;  &nbsp; &nbsp;  &nbsp;  &#x21B3; value |Raw numeric value of the above price | number <br> `37.89` |
| &nbsp;  &nbsp; &#x21B3; without_tax | Price without tax| object |
| &nbsp;  &nbsp; &nbsp; &nbsp; &#x21B3; currency| Currency price is displayed in | string <br> `USD`|
| &nbsp;  &nbsp; &nbsp; &nbsp; &#x21B3; formatted | String representation of the above price, including currency formatting | string <br> `"$35.00"` |
| &nbsp;  &nbsp; &nbsp; &nbsp; &#x21B3; value | Raw numeric value of the above price | number <br> `35` |
|&#x21B3;  min | The minimum variant price for the product | object |
| &nbsp;  &nbsp; &#x21B3;  with_tax | Price including tax | object |
| &nbsp;  &nbsp;&nbsp;  &nbsp;  &#x21B3;currency | Currency code | string  <br> `"USD"`|
| &nbsp;  &nbsp; &nbsp;  &nbsp;  &#x21B3;formatted | String representation of the above price, including currency formatting | string <br> `"$37.89"` |
| &nbsp;  &nbsp; &nbsp;  &nbsp;  &#x21B3; value |Raw numeric value of the above price | number <br> `37.89` |
| &nbsp;  &nbsp; &#x21B3; without_tax | Price without tax| object |
| &nbsp;  &nbsp; &nbsp; &nbsp; &#x21B3; currency| Currency price is displayed in | string  <br> `"USD"`|
| &nbsp;  &nbsp; &nbsp; &nbsp; &#x21B3; formatted | String representation of the above price, including currency formatting | string <br> `"$35.00"` |
| &nbsp;  &nbsp; &nbsp; &nbsp; &#x21B3; value | Raw numeric value of the above price | number <br> `35`|

<b>Available through:</b>

<b>Object/Property:</b><code>{{product.price}</code></a>

-

## Stencil Image

<b>Description:</b> Exposes a URL and an "alt" string for images used in the Stencil framework

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>data</td>
    <td>Internal URL to product or category image</td>
  </tr>
  <tr>
    <td>alt</td>
    <td>Corresponding text to display for missing images, accessible screen readers, etc.</td>
  </tr>
</table>

<b>Available through:</b>

<b>Stencil Handlebars Helper:</b> `{{getImage}}`

<b>Common Object:</b> <a href="#common-objects_common-product">Common Product Card Model</a>

<b>Object/Property:</b> `{{category.image}}`

<b>Arrays/Elements:</b> `{{product.options.image}}`, `{{product.images}}`, `{{downloads.items.images}}`, `{{downloads.items.thumbnail}}`, `{{category.subcategories.image}}`, `{{order.items.image}}`, `{{customer.orders.image}}`, `{{brands.image}}`, `{{order.items.shipping_rows.image}}`

<b> Usage Example: </b>

`{{getImage image "thumbnail"}}`

<a id="common-objects_common-product"></a>

## Common Product Card Model

<b>Description:</b> A model for a product’s basic, primary properties. Typically used for list components that show multiple products, each in its own "card" or panel.

<b>Object Properties:</b>

|Property| Description  | Format | 
|--|--| -- | 
| id | ID of the product | integer |
| sku | The product's SKU (stock keeping unit)/product code, as a string; if the SKU field is not populated, then null | string or null |
| name | Name of the product | string |
| url | URL to product detail page for the product | string|
| availability | Typical shipping time for the product; used to populate "Usually ships within…" fields | string |
| rating | Product’s rating | number | 
| brand | Brand properties for the product (includes the name property) | object |
| &#x21B3; name | Name of the brand | string |
| &#x21B3; url | URL of the brand | string |
| add_to_cart_url | URL that adds this product to customer’s cart | string |
| category | Categories the product belongs to. | array |
| price |References the [catalog price object](https://developer.bigcommerce.com/stencil-docs/reference-docs/common-objects#common-objects_catalog-price), to access price properties in both raw-numeric and formatted/string formats | object | 
| summary | Summary description of the product |  string |
| image | Default image for the product, in  [Stencil image format](https://developer.bigcommerce.com/stencil-docs/reference-docs/common-objects#common-objects_stencil-image) | object
| images | Array of a product's images, in  [Stencil image format](https://developer.bigcommerce.com/stencil-docs/reference-docs/common-objects#common-objects_stencil-image); currently limited to 5 images | array object |
| date_added | Date the product was added to this BigCommerce storefront | string Ex. `"Aug 15th 2018"` |
| pre_order |Product’s availability for pre-order | boolean |
| show_cart_action | Indicates whether the product is available for purchase | boolean |
| has_options | Indicates whether customer is required to specify options when ordering the product | Boolean | 
| stock_level | If inventory tracking is turned on: The number of items available for sale (0 or more). If inventory tracking is turned off: A "null" string. | number or null |
| low_stock_level | If inventory tracking is turned on: Sets a threshold low-stock level. You can use conditional logic to display a "limited availability" badge if the  `stock_level`property's value falls below this threshold. If inventory tracking is turned off: A "null" string. | number or "null" |
| custom_fields | Array of [custom fields](https://support.bigcommerce.com/articles/Public/Custom-Fields) for this product; custom fields can be used for purposes like: alternate brand name, merchandising title for the product, product type, "gift idea" indicator, etc. | array |
| &#x21B3; id |Unique (integer) identifier for this custom field | integer |
| &#x21B3; name | Name of this custom field| string |
| &#x21B3; value |Value for this custom field | string|
| num_reviews | Number of product reviews | number |
| weight | Weight of the product | object 
| &#x21B3; formatted| String representation of weight on storefront | string |
| &#x21B3; value | Numerical value of weight | number |
| out_of_stock_message |Text to display when the product is out of stock. If no message is configured, returns false. | string or `false` |
| release_date | Release date, if the product is set to pre-order status| string Ex. `Available: Aug 6th 2019` | 

<b>Available through:</b>

<b>Object:</b> <code>{{comparisons}} </code>

<b>Arrays/Elements:</b> <code>{{product.related_products}}, {{product.similar_by_views}}, {{category.products}}, {{cart.suggested_products}}, {{customer.recently_viewed_products}} </code>

<!-- :"Common Product Card Model" moved from "Product Objects" page -->
