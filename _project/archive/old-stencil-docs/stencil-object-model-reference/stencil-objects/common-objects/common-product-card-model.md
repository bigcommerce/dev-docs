<h1>Common Product Card Model</h1>

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

