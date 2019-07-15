<h1>Common Objects</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#common-objects_common-objects">Catalog Price</a></li>
    <li><a href="#common-objects_common-objects">Price</a></li>
    <li><a href="#common-objects_common-objects">Price Range</a></li>
    <li><a href="#common-objects_common-objects">Stencil Image</a></li>
    <li><a href="#common-objects_common-objects">Common Product Card Model</a></li>
	</ul>
</div>

Certain Stencil objects can be accessed through multiple other Stencil objects. For example, the image object is exposed through the Category, Product, Product Options, and other objects. Its structure is consistent for all objects/properties that access it. 

This consistent behavior is true for each of the common objects documented in the following subsection.

## Catalog Price

**Description:** Exposes catalog price- and currency-related properties in both raw numeric, and formatted string, formats.

**Available through:** 

Object/Property: `{{product.price}}`

<b>Object Properties:</b>

<br></br>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>with_tax</td>
    <td>Price including tax</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>    
    <td>Raw numeric value of the above price</td>  
  </tr>
  <tr>
    <td>without_tax</td>
    <td>Price excluding tax</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
  <tr>
    <td>non_sale_price_with_tax</td>
    <td>Non-sale price, including tax (can be displayed alongside standard with_tax during sale events)</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
  <tr>
    <td>non_sale_price_without_tax</td>
    <td>Non-sale price, excluding tax (can be displayed alongside standardwithout_tax during sale events)</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
  <tr>
    <td>rrp_with_tax</td>
    <td>List (i.e., manufacturer’s suggested retail) price, including tax</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
  <tr>
    <td>rrp_without_tax</td>
    <td>List (i.e., suggested retail) price, excluding tax</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
  <tr>
    <td>saved</td>
    <td>Amount customer saved, compared to list price</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
  <tr>
    <td>tax_label</td>
    <td>Tax label (VAT, sales tax, etc.) displayed to customers</td>
  </tr>
  <tr>
    <td>price_range</td>
    <td>See Price Range Object </td>
  </tr>
  <tr>
    <td>map_price</td>
    <td>Minimum advertised price</td>
  </tr>
  <tr>
    <td><span class="indent1"> formatted</span></td>
    <td>String representation of the above price, including currency formatting</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Raw numeric value of the above price</td>
  </tr>
</table>
	
---
	
## Price
	
<b>Description:</b> Exposes price- and currency-related properties in both raw numeric, and formatted string, formats. 
	
<b>Available through:</b>

* Common Object: <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">Common Product Card Model</a>
* Object: `{{category.shop_by_price}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
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
	
---
	
## Price Range
	
----

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

<b>Common Object:</b> <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">Common Product Card Model</a> 

<b>Object/Property:</b> `{{category.image}}`

<b>Arrays/Elements:</b> `{{product.options.image}}`, `{{product.images}}`, `{{downloads.items.images}}`, `{{downloads.items.thumbnail}}`, `{{category.subcategories.image}}`, `{{order.items.image}}`, `{{customer.orders.image}}`, `{{brands.image}}`, `{{order.items.shipping_rows.image}}` 

<b> Usage Example: </b> 

`{{getImage image "thumbnail"}}`
	
---
	
## Common Product Card Model
	
<b>Description:</b> A model for a product’s basic, primary properties. Typically used for list components that show multiple products, each in its own "card" or panel.

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>ID of the product </td>
  </tr>
  <tr>
    <td>sku</td>
    <td>The product's SKU (stock keeping unit)/product code, as a string; if the SKU field is not populated, then null
 </td>
  </tr>
  <tr>
    <td>name</td>
    <td>Name of the product</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL to product detail page for the product</td>
  </tr>
  <tr>
    <td>availability</td>
    <td>Typical shipping time for the product; used to populate "Usually ships within…" fields</td>
  </tr>
  <tr>
    <td>rating</td>
    <td>Product’s rating</td>
  </tr>
  <tr>
    <td>ratings</td>
    <td>Number of reviews on which the rating is based</td>
  </tr>
  <tr>
		<td><b>brand</b></td>
    <td>Brand properties for the product (includes the name property</td>
  </tr>
  <tr>
    <td><i>name</i></td>
    <td>Product’s brand name</td>
  </tr>
  <tr>
    <td>add_to_cart_url</td>
    <td>URL that adds this product to customer’s cart</td>
  </tr>
  <tr>
    <td>price</td>
    <td class="">References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price">catalog price object</a>, to access price properties in both raw-numeric and formatted/string formats</td>
  </tr>
  <tr>
    <td>summary</td>
    <td>Summary description of the product</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Default image for the product, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a> <!-- <a href="/docs/handlebars-image-helpers">Stencil image format</a> --> </td>
  </tr>
  <tr>
    <td>images</td>
    <td>Array of a product's images, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a>; currently limited to 5 images </td>
  </tr>
  <tr>
    <td>date_added</td>
    <td>Date the product was added to this BigCommerce storefront</td>
  </tr>
  <tr>
    <td>pre_order</td>
    <td>Product’s availability for pre-order</td>
  </tr>
  <tr>
    <td>release_date</td>
    <td>Release date, if the product is set to pre-order status</td>
  </tr>
  <tr>
    <td>show_cart_action</td>
    <td>Boolean that indicates whether the product is available for purchase</td>
  </tr>
  <tr>
    <td>has_options</td>
    <td>Boolean that indicates whether customer is required to specify options when ordering the product</td>
  </tr>
  
  <tr>
    <td>stock_level</td>
    <td>If inventory tracking is turned on: The number of items available for sale (0 or more). If inventory tracking is turned off: A "null" string. </td>
  </tr>
     
  <tr>
    <td>low_ stock_level</td>
    <td>If inventory tracking is turned on: Sets a threshold low-stock level. You can use conditional logic to display a "limited availability" badge if the <code>stock_level</code> property's value falls below this threshold. If inventory tracking is turned off: A "null" string. </td>
  </tr>
   
  <tr>
    <td>qty_in_cart</td>
    <td>Quantity of this item in the customer’s cart</td>
  </tr>
  <tr>
    <td>out_of_stock_message</td>
    <td>Text to display when the product is out of stock</td>
  </tr>
  
  <tr>
		<td><b>custom_fields</b></td>
    <td>Array of <a href="https://support.bigcommerce.com/articles/Public/Custom-Fields">custom fields</a> for this product; custom fields can be used for purposes like: alternate brand name, merchandising title for the product, product type, "gift idea" indicator, etc.
</td>
  </tr>

  <tr>
		<td><i>id</i></td>
    <td>Unique (integer) identifier for this custom field</td>
  </tr>

  <tr>
    <td><i>name</i></td>
    <td>Name of this custom field</td>
  </tr>

  <tr>
    <td><i>value</i></td>
    <td>Value for this custom field</td>
  </tr>
</table>

<b>Available through:</b>

<b>Object:</b> <code>{{comparisons}} </code> 

<b>Arrays/Elements:</b> <code>{{product.related_products}}, {{product.similar_by_views}}, {{category.products}}, {{cart.suggested_products}}, {{customer.recently_viewed_products}} </code>

<!-- :"Common Product Card Model" moved from "Product Objects" page -->
	
---
	

