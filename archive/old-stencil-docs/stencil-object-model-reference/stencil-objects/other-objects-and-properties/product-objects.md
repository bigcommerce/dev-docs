<h1>Product Objects</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#product-objects_product">Product</a></li>
    <li><a href="#product-objects_product-reviews">Product Reviews</a></li>
    <li><a href="#product-objects_related-products">Related Products</a></li>
    <li><a href="#product-objects_similar-products">Similar Products by Customer Views</a></li>
    <li><a href="#product-objects_product-videos">Product Videos</a></li>
    <li><a href="#product-objects_compare">Compare</a></li>
    <li><a href="#product-objects_download">Download Item</a></li>
    <li><a href="#product-objects_product-other">Product Other Details</a></li>
	</ul>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Other Product Objects
> Also see Common Objects > Common Product Card Model, which documents the product object returned in collections.

</div>
</div>
</div>

<a href='#product-objects_product' aria-hidden='true' class='block-anchor'  id='product-objects_product'><i aria-hidden='true' class='linkify icon'></i></a>

## Product

<b>Description:</b> Default property that provides detailed product data. Called on the default `<theme-name>/templates/pages/product.html`and `<theme-name>/templates/pages/amp/product.html` templates, and on several partials in the `<theme-name>/templates/components/` subdirectory: 

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

<b>Handlebars Expression:</b> `{{product}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique ID for the product</td>
  </tr>
  <tr>
    <td>sku</td>
    <td>Default product variant when no options are selected</td>
  </tr>
   <tr>
    <td>mpn</td>
    <td>Manufacturer Part Number</td>
  </tr>
   <tr>
    <td>gtin</td>
    <td>Global Trade Item Number</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL to the product detail page</td>
  </tr>
  <tr>
    <td>upc</td>
    <td>Optional UPC code for the product</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Displayed name of the product</td>
  </tr>
  <tr>
    <td>description</td>
    <td>(HTML) description of the product</td>
  </tr>
  <tr>
    <td>detail_messages</td>
    <td>Status messages for display at the top of the product page</td>
  </tr>
  <tr>
    <td>min_purchase_quantity</td>
    <td>Minimum quantity that can be purchased at once</td>
  </tr>
  <tr>
    <td>max_purchase_quantity</td>
    <td>Maximum quantity that can be purchased at once</td>
  </tr>
  <tr>
    <td>can_purchase</td>
    <td>Boolean that indicates whether the product is available for purchase</td>
  </tr>
  <tr>
    <td>out_of_stock</td>
    <td>Boolean that indicates whether the product is out of stock</td>
  </tr>
  <tr>
    <td>out_of_stock_message</td>
    <td>Merchant-defined label to display when a product is out of stock</td>
  </tr>
  <tr>
    <td>cart_url</td>
    <td>URL to the customer’s shopping cart</td>
  </tr>
  <tr>
    <td>add_to_wishlist_url</td>
    <td>URL to add the product to the customer’s wishlist</td>
  </tr>
  <tr>
    <td>customizations</td>
    <td>Product customizations (for example, a T-shirt size); these correspond to <a href="https://support.bigcommerce.com/articles/Public/What-are-configurable-fields-and-how-do-I-create-them">configurable fields</a> and <a href="https://support.bigcommerce.com/s/article/Options-SKUs-Rules#text">numeric-text</a> <a href="https://support.bigcommerce.com/articles/Public/Adding-Product-Options">product options</a> in the BigCommerce control panel</td>
  </tr>
  <tr>
    <td><span class="indent1">id</span></td>
    <td>Customization ID</td>
  </tr>
  <tr>
    <td><span class="indent1">display_name</span></td>
    <td>Label for this customization, as displayed to customers</td>
  </tr>
  <tr>
    <td><span class="indent1">type</span></td>
    <td>Customization type [<code>text</code>|<code>textarea</code>|<code>NumbersOnlyText</code>|<code>checkbox</code>|<code>select</code>|<code>file</code>]</td>
  </tr>
  <tr>
    <td><span class="indent1">required</span></td>
    <td>Boolean value that indicates whether customer must specify this customization in order to buy the product</td>
  </tr>
  <tr>
    <td><span class="indent1">condition</span></td>
    <td>Boolean value indicating whether to display this product's condition (new, used, or refurbished)</td>
  </tr>
  <tr>
    <td><span class="indent1">prefill</span></td>
    <td>Optional string value to prefill this field</td>
  </tr>
  <tr>
    <td><span class="indent1">&lt;values&gt;</span></td>
    <td>For <code>select</code> type, array of strings listing the available options</td>
  </tr>
  <tr>
    <td>
      <span class="indent1">&lt;file_types&gt;</span></td>
    <td>For <code>file</code> type, string representing the types of allowed files</td>
  </tr>
  <tr>
    <td><span class="indent1">&lt;file_size&gt;</span></td>
    <td>For <code>file</code> type, string representing the maximum file size allowed</td>
  </tr>

<!-- Inserted new properties here for NumbersOnlyText type, MERC-159: -->
  <tr>
    <td><span class="indent1">integer_only</span></td>
    <td>For <code>NumbersOnlyText</code> type, boolean value indicating whether to restrict customer's entries to whole numbers only</td>
  </tr>
  <tr>
    <td><span class="indent1">default</span></td>
    <td>For <code>NumbersOnlyText</code> type, optional string representing a default number that customers can see and overwrite</td>
  </tr>
  <tr>
    <td><span class="indent1">limit_input</span></td>
    <td>For <span class="inline-code">NumbersOnlyText</span> type, boolean indicating whether to impose any limits on the numeric values that customers can enter as strings</td>
  </tr>
  <tr>
    <td><span class="indent1">limit_input_option</span></td>
    <td>For <code>NumbersOnlyText</code> type and <code>limit_input</code> = <code>true</code>, the type of limit: <code>lowest</code> or <code>highest</code></td>
  </tr>
  <tr>
    <td><span class="indent1">lowest</span></td>
    <td>For <code>NumbersOnlyText</code> type and <code>limit_input</code> = <code>true</code>,  minimum allowable value; a value of <code>0</code> imposes no limit</td>
  </tr>
  <tr>
    <td><span class="indent1">highest</span></td>
    <td>For <code>NumbersOnlyText</code> type and <code>limit_input</code> = <code>true</code>,  maximum allowable value; a value of <code>0</code> imposes no limit</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Options for color and pattern swatches displayed for this product</td>
  </tr>
  <tr>
    <td><span class="indent1">id</span></td>
    <td>Product ID</td>
  </tr>
  <tr>
    <td><span class="indent1">type</span></td>
    <td>String indicating size, color, swatch, etc.</td>
  </tr>
  <tr>
    <td><span class="indent1">display_name</span></td>
    <td>Option Name displayed in control panel for this option</td>
  </tr>
  <tr>
    <td><span class="indent1">required</span></td>
    <td>Boolean value that indicates whether customer must specify this option in order to buy the product</td>
  </tr>
  <tr>
    <td><span class="indent1">condition</span></td>
    <td>Boolean value indicating whether to display this product's condition (new, used, or refurbished)</td>
  </tr>
  <tr>
    <td><span class="indent1">values</span></td>
    <td>Array of data (color) or image (pattern) values</td>
  </tr>
  <tr>
    <td><span class="indent2">label</span></td>
    <td>Internal label for this value (not normally displayed to shoppers)</td>
  </tr>
  <tr>
    <td><span class="indent2">id</span></td>
    <td>ID for this value, unique within this values array</td>
  </tr>
  <tr>
    <td><span class="indent2">selected</span></td>
    <td>Boolean indicating whether this value is preselected as the option's default value, upon page load</td>
  </tr>
  <tr>
    <td><span class="indent2">data</span></td>
    <td>Each <code>values</code> member can contain either a <code>data</code> or an <code>image</code> member; <code>data</code> denotes a color</td>
  </tr>
  <tr>
    <td><span class="indent3">&lt;color value&gt;</span></td>
    <td>Hex code for this color</td>
  </tr>
  <tr>
    <td><span class="indent2">image</span></td>
    <td>
      Each <code>values</code> member can contain either a <code>data</code> or an <code>image</code> member; <code>image</code> denotes a pattern, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image object format</a>. (Note: This <code>image</code> value replaces the <code>{{pattern}}</code> property, which was limited to 18 x 18 pixels, and will be deprecated.)</td>
  </tr>
  <tr>
    <td>price</td>
    <td>References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price">catalog price object</a>, to access the product’s price</td>
  </tr>
  <tr>
    <td>weight</td>
    <td>Weight of the default variant</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Height of the default variant</td>
  </tr>
  <tr>
    <td>width</td>
    <td>Width of the default variant</td>
  </tr>
  <tr>
    <td>depth</td>
    <td>Depth of the default variant</td>
  </tr>
  <tr>
    <td>rating</td>
    <td>Rating for the product</td>
  </tr>
  <tr>
    <td>num_reviews</td>
    <td>Number of reviews the product has</td>
  </tr>
  <tr>
    <td>bulk_discount_rates </td>
    <td>List of discount rates for the current product</td>
  </tr>
  <tr>
    <td>condition</td>
    <td>Condition of the product</td>
  </tr>
  <tr>
    <td>stock_level</td>
    <td>Current stock level of the product; will be null if storefront stock display is disabled by the merchant, or if the product lacks inventory tracking</td>
  </tr>
  <tr>
    <td>shipping</td>
    <td>Shipping properties for the product</td>
  </tr>
  <tr>
    <td><span class="indent1"> fixed</span></td>
    <td>Boolean that indicates whether the product’s shipping price is fixed</td>
  </tr>
  <tr>
    <td><span class="indent1"> price</span></td>
    <td><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the shipping cost for this product (if shipping cost is fixed)</td>
  </tr>
  <tr>
    <td><span class="indent1"> calculated</span></td>
    <td>Boolean that indicates whether the product’s shipping price is calculated at checkout</td>
  </tr>
  <tr>
    <td>stock_label</td>
    <td>Shows whether the product stock level is for on-hand merchandise or pre-orders.</td>
  </tr>
  <tr>
    <td>availability</td>
    <td>Optional availability message set by the merchant</td>
  </tr>
  <tr>
    <td>pre_order</td>
    <td>Availability of the product for pre-order</td>
  </tr>
  <tr>
    <td>release_date</td>
    <td>Release date, if the product is set to pre-order status</td>
  </tr>
  <tr>
    <td>error_message</td>
    <td>Potential error on the page (e.g.: out of stock, form validations)</td>
  </tr>
  <tr>
    <td>gift_wrapping</td>
    <td>Whether or not gift wrapping is enabled</td>
  </tr>
  <tr>
    <td>brand</td>
    <td>Brand of the product</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Displayed name of the brand</td>
  </tr>
  <tr>
    <td><span class="indent1"> url</span></td>
    <td>URL to the brand page</td>
  </tr>
  <tr>
    <td>main_image</td>
    <td>Primary image to display when the product details page loads</td>
  </tr>
  <tr>
    <td>images</td>
    <td>List of all images for this product, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a> (as configured in config.json; used with the <code>getImage</code> Handlebars helper)</td>
  </tr>
  <tr>
    <td>pinterest_js</td>
    <td>Property to display Pinterest button</td>
  </tr>
  <tr>
    <td>facebook_like</td>
    <td>Property to display Facebook Like button</td>
  </tr>
  <tr>
    <td>warranty</td>
    <td>Optional warranty text set by the merchant</td>
  </tr>
  <tr>
    <td>meta_keywords</td>
    <td>Optional search keywords that merchants may enter in the control panel’s "Add a Product" or “Edit a Product” page, to characterize the product in meta tags and storefront searches </td>
  </tr>

  <tr>
    <td>tags</td>
    <td>Keywords by which this product can also be identified</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Name of the tag</td>
  </tr>

  <tr>
    <td>custom_fields </td>
    <td>Extra details to display about the product </td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Custom field name</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Custom field value</td>
  </tr>
  <tr>
    <td>event_date</td>
    <td>Property to handle a date-based product</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Name of the event</td>
  </tr>
  <tr>
    <td><span class="indent1"> date_start</span></td>
    <td>Event’s start date range</td>
  </tr>
  <tr>
    <td><span class="indent1"> date_end</span></td>
    <td>Event’s end date range</td>
  </tr>
  <tr>
    <td><span class="indent1"> earliest_year</span></td>
    <td>Event’s starting year</td>
  </tr>
  <tr>
    <td><span class="indent1"> latest_year</span></td>
    <td>Event’s ending year</td>
  </tr>
  <tr>
    <td><span class="indent1">type</span></td>
    <td>Type of event</td>
  </tr>
</table>

<a href='#product-objects_product-reviews' aria-hidden='true' class='block-anchor'  id='product-objects_product-reviews'><i aria-hidden='true' class='linkify icon'></i></a>

## Product Reviews

<b>Description:</b> A list of reviews related to this product. When filtering/limiting, reviews' default sorting is by review id, from lowest to highest. (Called on the default <code>&lt;theme-name&gt;/templates/pages/product.html</code><code>&lt;theme-name&gt;/templates/components/</code> subdirectory: 
* <code>products/product-view.html</code>,
* <code>products/modals/writeReview.html</code>, and 
* <code>amp/products/product-view.html</code>.)

<b>Handlebars Expression:</b> <code>{{product.reviews}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>start</td>
    <td>The review that starts the current page of reviews</td>
  </tr>
  <tr>
    <td>total</td>
    <td>Total number of reviews</td>
  </tr>
  <tr>
    <td>end</td>
    <td>Last review on this page</td>
  </tr>
  <tr>
    <td>show_review_email</td>
    <td>Boolean that indicates whether the Write Review form should have an input field for the reviewer’s e-mail address</td>
  </tr>
  <tr>
    <td>captcha</td>
    <td>reCAPTCHA public key (for validating human versus bot visitors)</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>References the pagination model</td>
  </tr>
  <tr>
    <td>list </td>
    <td>List of reviews</td>
  </tr>
  <tr>
    <td><span class="indent1"> rating</span></td>
    <td>Product’s rating (1–5 stars)</td>
  </tr>
  <tr>
    <td><span class="indent1"> title</span></td>
    <td>Title of the review</td>
  </tr>
  <tr>
    <td><span class="indent1"> date</span></td>
    <td>Date the product was reviewed</td>
  </tr>
  <tr>
    <td><span class="indent1"> text</span></td>
    <td>Text content of the product review</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Name of the person providing the review</td>
  </tr>
</table>

<a href='#product-objects_related-products' aria-hidden='true' class='block-anchor'  id='product-objects_related-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Related Products

<b>Description:</b> A list of products related to this product. (Called on the default `<theme-name>/templates/components/products/tabs.html` partial.)

<b>Handlebars Expression:</b> `{{product.related_products}}`

<b>Object Properties: </b>References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>.


<a href='#product-objects_similar-products' aria-hidden='true' class='block-anchor'  id='product-objects_similar-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Similar Products by Customer Views

**Description:** A list of products similar to a given product, based on customer’s product browsing history. (Called on the default <code>&lt;theme-name&gt;/templates/components/products/tabs.html</code> partial.)

<b>Handlebars Expression:</b> <code>{{product.similar_by_views}}</code>

<b>Object Properties:</b> References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>.


<a href='#product-objects_product-videos' aria-hidden='true' class='block-anchor'  id='product-objects_product-videos'><i aria-hidden='true' class='linkify icon'></i></a>

## Product Videos

<b>Description:</b> A list of videos for a given product. (Called on the default <code>&lt;theme-name&gt;/templates/pages/product.html</code> template, and on the <code>&lt;theme-name&gt;/templates/components/amp/products/product-view.html</code> partial.)

<b>Handlebars Expression:</b> <code>{{product.videos}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>ID of the product video</td>
  </tr>
  <tr>
    <td>title_short</td>
    <td>Short title of the product video</td>
  </tr>
  <tr>
    <td>title_long</td>
    <td>Long title of the product video</td>
  </tr>
  <tr>
    <td>description_long</td>
    <td>Long description of the product video</td>
  </tr>
  <tr>
    <td>description_short</td>
    <td>Short description of the product video</td>
  </tr>
  <tr>
    <td>length</td>
    <td>Duration of the product video</td>
  </tr>
</table>

<a href='#product-objects_compare' aria-hidden='true' class='block-anchor'  id='product-objects_compare'><i aria-hidden='true' class='linkify icon'></i></a>

## Compare

**Description:** Property to display an array of products on product comparison pages. (Called on the default <code>&lt;theme-name&gt;/templates/pages/compare.html</code> template.)

<b>Handlebars Expression:</b> <code>{{comparisons}}</code>

<b>Object Properties:</b> References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>, plus the additional fields listed here:<br>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>availability</td>
    <td>How long this product usually takes to ship</td>
  </tr>
  <tr>
    <td>brand</td>
    <td>Object containing brand data for this product</td>
  </tr>
  <tr>
    <td><span class="indent1"> url</span></td>
    <td>Brand URL for this product</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Brand name for this product</td>
  </tr>
  <tr>
    <td>remove_url</td>
    <td>URL to remove this product/column from the comparison</td>
  </tr>
  <tr>
    <td>custom_fields</td>
    <td>Array of additional product details – size, color, book's ISBN, DVD's release date, etc. – as name/value pairs</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Displayed name for this custom field</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td>Value for this custom field’s entry</td>
  </tr>
</table>

<a href='#product-objects_download' aria-hidden='true' class='block-anchor'  id='product-objects_download'><i aria-hidden='true' class='linkify icon'></i></a>

## Download Item

<b>Description:</b> Property for digital (non-physical) products. (Called on the default <code>&lt;theme-name&gt;/templates/pages/account/download-item.html</code>template.)

<b>Handlebars Expression:</b> <code>{{downloads}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>order_id</td>
    <td>ID for this order</td>
  </tr>
  <tr>
    <td>product_name</td>
    <td>Name of the digital product</td>
  </tr>
  <tr>
    <td>items</td>
    <td>Array of product components</td>
  </tr>
  <tr>
    <td><span class="indent1">name</span></td>
    <td>Name of this digital item</td>
  </tr>
  <tr>
    <td><span class="indent1">expired</span></td>
    <td>Boolean indicating whether customer’s access/subscription to this item has expired</td>
  </tr>
  <tr>
    <td><span class="indent1">days_remaining</span></td>
    <td>Number of days left in customer’s access/subscription to this item</td>
  </tr>
  <tr>
    <td><span class="indent1">downloads_remaining</span></td>
    <td>Number of times customer may download this item</td>
  </tr>
  <tr>
    <td><span class="indent1">size</span></td>
    <td>File size of this digital item (string, responsively formatted as: 240 KB, 1.1 MB, etc.)</td>
  </tr>
  <tr>
    <td><span class="indent1">description</span></td>
    <td>Description (if entered by merchant) for this item</td>
  </tr>
  <tr>
    <td><span class="indent1">id</span></td>
    <td>ID for this item</td>
  </tr>
  <tr>
    <td><span class="indent1">images</span></td>
    <td>List of all images for the product associated with this list of downloadable items (in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a>)</td>
  </tr>
  <tr>
    <td><span class="indent1">thumbnail</span></td>
    <td>"Primary" image for the product associated with this list of downloadable items (in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a>)</td>
  </tr>
</table>

<a href='#product-objects_product-other' aria-hidden='true' class='block-anchor'  id='product-objects_product-other'><i aria-hidden='true' class='linkify icon'></i></a>

## Product Other Details

<b>Description:</b> Property to display custom product details (such as a book's ISBN code, a DVD's release date, etc.). (Called on the default <code>&lt;theme-name&gt;/templates/components/products/product-view.html</code> and <code>&lt;theme-name&gt;/templates/components/amp/products/product-view-details.html</code> partials.)

**Handlebars Expression:**`{{product.custom_fields}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
    <td>value</td>
    <td>Displayed value for this product’s entry</td>
  </tr>
</table>

