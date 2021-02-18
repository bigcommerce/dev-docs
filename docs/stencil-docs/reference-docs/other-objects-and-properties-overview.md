# Other Objects and Properties Overview

<div class="otp" id="no-index">

### On This Page
- [Product](#product)
- [Product Reviews](#product-reviews)
- [Related Products](#related-products)
- [Similar Products by Customer Views](#similar-products-by-customer-views)
- [Product Videos](#product-videos)
- [Compare](#compare)
- [Download Item](#download-item)
- [Product Other Details](#product-other-details)
- [Category](#category)
- [Category Products](#category-products)
- [Category Shop by Price](#category-shop-by-price)
- [Brand](#brand)
- [Brand List](#brand-list)
- [Shop by Brand](#shop-by-brand)
- [Cart](#cart)
- [Customer](#customer)
- [Order Details](#order-details)
- [Recent Items](#recent-items)
- [Customer Wishlists](#customer-wishlists)
- [Wishlist Details](#wishlist-details)
- [Account Order Shipments](#account-order-shipments)
- [Account Orders](#account-orders)
- [Account Returns](#account-returns)
- [Account New Return](#account-new-return)
- [Create Account](#create-account)
- [Shipping Addresses](#shipping-addresses)
- [Payment Methods](#payment-methods)
- [Edit Payment Methods](#edit-payment-methods)
- [Add Payment Methods](#add-payment-methods)
- [Blog](#blog)
- [Blog Post](#blog-post)
- [Forms](#forms)
- [Order Confirmation Objects](#order-confirmation-objects)

</div> 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Debugging Your Theme
> The Stencil framework provides built-in debugging tools to aid in your custom front-end development. When you want to see what data is available on the page you are working on, you can simply add the debug query string to your store’s localhost URL. Here is an example:
> ```http://localhost:3000/product/this-is-a-sample-product?debug=context```
> This will return a list of all the objects available on the page, in JSON syntax. If you want to view the available JSON objects and rendered page at the same time, simply change the debug value to bar. Below is an example:
> ```http://localhost:3000/product/this-is-a-sample-product?debug=bar```

</div>
</div>
</div>

## Product

<b>Description:</b> Default property that provides detailed product data. Called on the default `templates/pages/product.html`and `templates/pages/amp/product.html` templates, and on several partials in the `templates/components/` subdirectory:

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
  <tr>
    <td><span class="indent1">category</span></td>
    <td>An array of categories the product belongs to</td>
  </tr>
</table>

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

-

## Related Products

<b>Description:</b> A list of products related to this product. (Called on the default `templates/components/products/tabs.html` partial.)

<b>Handlebars Expression:</b> `{{product.related_products}}`

<b>Object Properties: </b>References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>.

## Similar Products by Customer Views

**Description:** A list of products similar to a given product, based on customer’s product browsing history. (Called on the default <code>&lt;theme-name&gt;/templates/components/products/tabs.html</code> partial.)

<b>Handlebars Expression:</b> <code>{{product.similar_by_views}}</code>

<b>Object Properties:</b> References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a>.

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

## Category

**Description:**  The category object for the page calling the object. When retrieving a collection of categories, default sorting is by category `id`, from lowest to highest. (Called on the default `templates/pages/category.html` template, and on several partials in the `<theme-name&gt;/templates/components/</code> subdirectory: <code>category/shop-by-price.html`,`category/sidebar.html`, and `amp/category/subcategories.html`)

<b>Handlebars Expression:</b> `{{category}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique ID for the category </td>
  </tr>
  <tr>
    <td>name</td>
    <td>Merchant-defined category name</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL for the category-specific page</td>
  </tr>
  <tr>
    <td>description</td>
    <td>Merchant-defined description of the category</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Image representing this category, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td>subcategories <!-- Possible change to `children`--></td>
    <td>List of any child categories</td>
  </tr>
  <tr>
    <td><span class="indent1">id</span></td>
    <td>Unique ID for the subcategory </td>
  </tr>
  <tr>
    <td><span class="indent1">name</span></td>
    <td>Name of the subcategory</td>
  </tr>
  <tr>
    <td><span class="indent1">url</span></td>
    <td>URL to the subcategory</td>
  </tr>
  <tr>
    <td><span class="indent1">description</span></td>
    <td>Merchant-defined description of the subcategory </td>
  </tr>
  <tr>
    <td><span class="indent1">image</span></td>
    <td>Image representing this subcategory, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td><span class="indent1">product_count</span></td>
    <td>Number of products in the subcategory. (Counts at the current level only &ndash; not recursive to deeper levels.)</td>
  </tr>
  <tr>
  	<td>detail_messages</td>
    <td>Message displayed when a product is out of stock, and inventory settings are configured to redirect to a category: "Sorry, the product you tried to view is currently out of stock, here are some similar products we have available." (This phrasing is set by the BigCommerce App.)</td>
  </tr>
  <tr>
    <td>show_compare</td>
    <td>Boolean that defines whether to show controls for product comparison</td>
  </tr>
  <tr>
    <td>show_add_to_cart</td>
    <td>Boolean that defines whether to show an Add to Cart button for this category</td>
  </tr>
  <tr>
    <td>total_products</td>
    <td>Count of the number of products in the category</td>
  </tr>
  <tr>
    <td>faceted_search_enabled</td>
    <td>Boolean that defines whether product-filtering search is enabled for the store</td>
  </tr>
  <tr>
    <td><span class="indent1">facets</span></td>
    <td>Available search facets</td>
  </tr>
  <tr>
    <td><span class="indent1">pagination</span></td>
    <td>References the pagination model</td>
  </tr>
  <tr>
    <td><span class="indent1">selected</span></td>
    <td>Selected search facets</td>
  </tr>
</table>

## Category Products

**Description:** A list of products associated with this category. (Called on the default `templates/pages/category.html` template, and on the `templates/components/category/product-listing.html` partial.)

**Handlebars Expression:** `{{category.products}}`

**Object Properties:** References the  [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

## Category Shop by Price

<b>Description:</b> A list of price ranges, to enable customers to set price limits within a product category. Called on the default<code>&lt;theme-name&gt;/templates/components/category/shop-by-price.html</code> and <code>&lt;theme-name&gt;/templates/components/category/sidebar.html</code> partials.)

<b>Handlebars Expression:</b> `{{category.shop_by_price}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of price-filtered product results for this category</td>
  </tr>
  <tr>
    <td>low</td>
    <td><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the minimum price boundary </td>
  </tr>
  <tr>
    <td>high</td>
    <td><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the maximum price boundary</td>
  </tr>
  <tr>
    <td>selected</td>
    <td><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the currently selected price range</td>
  </tr>
</table>

## Brand

**Description:** The brand object for the page calling the object. (Called on the default `templates/pages/brand.html` template.)

**Handlebars Expression:** `{{brand}}`

<b>Object Properties:</b>
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>show_compare</td>
    <td>Boolean corresponding to merchant’s control panel selection whether or not to enable product comparisons</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of the brand page</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Name of the brand </td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>References the pagination model</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Image used to visually represent the brand (i.e., logo)</td>
  </tr>
  <tr>
    <td>faceted_search_enabled</td>
    <td>Boolean that defines whether product-filtering search is enabled for the store</td>
  </tr>
  <tr>
    <td>facets</td>
    <td>A list of all possible search filters for this brand</td>
  </tr>
  <tr>
    <td>products</td>
    <td>An array of product card models</a></td>
  </tr>
  <tr>
    <td>selected</td>
    <td>An array of selected facets</td>
  </tr>
</table>

## Brand List

<b>Description:</b> A list of brands with their basic data. Default sorting is by brand id, from lowest to highest. (Called on the default `templates/pages/brands.html` template.)

<b>Handlebars Expression:</b> `{{brands}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>url</td>
    <td>URL to this brand’s products listing</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Name of the brand</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Internal identifier for the brand </td>
  </tr>
  <tr>
    <td>image</td>
    <td>Stencil image object (if any) for the brand</td>
  </tr>
</table>

## Shop by Brand

**Description:** Objects to enable customers to shop by brand. Returns top 10 brands, by product count. (Called on the default `templates/components/brand/sidebar.html` and `templates/components/common/footer.html` partials.)

<b>Handlebars Expression:</b> `{{shop_by_brand}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td class="">links</td>
    <td class="">Array of links to individual brands</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">id</span></td>
    <td class="">ID for this brand</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">url</span></td>
    <td class="">URL for this brand</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">name</span></td>
    <td class="">Name of this brand</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">count</span></td>
    <td class="">Number of products matching this brand</td>
  </tr>
</table>

## Cart

<b>Description:</b> The cart-specific properties for the current session

**Handlebars Expression:** `{{cart}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>quantity</td>
    <td>Total number of items in the cart</td>
  </tr>
  <tr>
    <td class="">additional_checkout_buttons</td>
    <td class="">Generates checkout buttons for third-party payments (PayPal, Google Checkout, etc.)</td>
  </tr>
  <tr>
    <td>show_primary_checkout_button</td>
    <td>Boolean that determines whether to show a checkout button</td>
  </tr>
  <tr>
    <td>show_multiple_address_shipping</td>
    <td>Boolean: If >1 physical items are in the cart, and checkout button is displayed: whether to also display the "Ship to multiple addresses"/"Multiple Shipping Addresses” user option</td>
  </tr>

  <tr>
    <td class="">discount</td>
    <td class="">Discount being applied to the cart in the current session</td>
  </tr>
  <tr>
    <td>gift_wrapping_cost</td>
    <td>Price object that defines the cost associated with adding gift wrapping to the items in the cart</td>
  </tr>
  <tr>
    <td>sub_total</td>
		<td>Price object</a> that defines the total cost of all the items in the cart. Might or might not include tax, based on the tax display settings the merchant has configured. Excludes shipping, discounts, and gift wrapping.</td>
  </tr>
  <tr>
    <td>grand_total</td>
    <td>Price object that defines the total cost of all the items in the cart. Incorporates estimated shipping, discounts, taxes, and gift wrapping.</td>
  </tr>
  <tr>
    <td class="">shipping_handling</td>
    <td class="">Current configuration of the shipping estimator for this session’s current cart; will be null/undefined if the cart contains no physical products</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">handling_cost</span></td>
    <td class="">Price object that defines the handling cost for the carted items (if any)</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">show_estimator</span></td>
    <td class="">Boolean indicating whether the merchant wants to show the shipping estimator to customers</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> countries</span></td>
    <td class="">Countries available to ship to</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> states</span></td>
    <td class="">List of states/provinces/regions for the country</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> selected_state</span></td>
    <td class="">The state/province/region that the customer selected for the shipping estimate</td>
  </tr>

  <tr>
    <td class=""><span class="indent2"> selected_zip</span></td>
    <td class="">The ZIP/postal code that the customer selected for the shipping estimate</td>
  </tr>

  <tr>
    <td class=""><span class="indent2"> selected_city</span></td>
    <td class="">The city/town that the customer selected for the shipping estimate</td>
  </tr>

  <tr>
    <td class=""><span class="indent2"> shipping_cost</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines shipping cost</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> provider</span></td>
    <td class="">Shipping provider associated with this shipping estimate</td>
  </tr>
  <tr>
    <td class="">coupons</td>
    <td class="">List of coupons applied to the cart; default sorting is by coupon <span class="inline-code">id</span>, from lowest to highest</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> id</span></td>
    <td class="">Unique ID of the coupon</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> code</span></td>
    <td class="">Code associated with the coupon</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> discount</span></td>
    <td class="">Discount associated with the coupon</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> type</span></td>
    <td class="">Coupon type</td>
  </tr>
  <tr>
    <td class="">gift_certificates</td>
    <td class="">List of gift certificates applied to the cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> id</span></td>
    <td class="">Unique system ID for the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> code</span></td>
    <td class="">Customer code used to identify the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remaining</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the amount remaining on the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> used</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the amount already used on the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remove_url</span></td>
    <td class="">URL to remove gift certificate from the cart</td>
  </tr>
  <tr>
    <td class="">taxes</td>
    <td class="">List of all applicable taxes for the cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Name of the applied tax</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> cost</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the cost of the applied tax</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> included</span></td>
    <td class="">Boolean that indicates whether taxes are included in the total price for the cart’s contents</td>
  </tr>
</table>

### Cart Items

<b>Description:</b> A list of items added to the cart in the current session

<b>Handlebars Expression:</b> `{{cart.items}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td class="">id</td>
    <td class="">Unique system ID for the item in the cart</td>
  </tr>
	<tr>
		<td class="">remove_url</td>
		<td class="">URL to remove this item from the cart</td>
	</tr>
  <tr>
    <td class="">quantity</td>
    <td class="">Quantity of the item being ordered</td>
  </tr>
	<tr>
		<td class="">min_purchase_quantity</td>
		<td class="">Quantity of the item being ordered</td>
	</tr>
	<tr>
		<td class="">max_purchase_quantity</td>
		<td class="">Maximum quantity the customer can order of the given item (if applicable)</td>
	</tr>
  <tr>
    <td class="">type</td>
    <td class="">String indicating the type of purchase: either "Item" or "GiftCertificate"</td>
  </tr>
	<tr>
    <td class="">If type == Item</td>
    <td class="">If the item in the cart is a purchasable product, these properties are available:</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">product_id</span></td>
    <td class="">Product ID for the cart item</td>
  </tr>
	<tr>
		<td class=""><span class="indent1">brand</span></td>
		<td class="">Brand details for this cart item</td>
	</tr>
	<tr>
		<td class=""><span class="indent2"> name</span></td>
		<td class="">The product’s brand name</td>
	</tr>
  <tr>
    <td class=""><span class="indent1">name</span></td>
    <td class="">Product name of the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">url</span></td>
    <td class="">Link to the product page for the cart item</td>
  </tr>
	<tr>
		<td class=""><span class="indent1">sku</span></td>
		<td class="">SKU value for this cart item</td>
	</tr>
  <tr>
    <td class=""><span class="indent1">availability</span></td>
    <td class="">An optional availability message set by the merchant</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">image</span></td>
    <td class="">Product image for the cart item</td>
  </tr>
	<tr>
		<td class="">can_modify</td>
		<td class="">Boolean indicating whether the customer may modify the quantity of, or remove, this cart item</td>
	</tr>
  <tr>
    <td class=""><span class="indent1">event_date</span></td>
    <td class="">Chosen event date for event-based products</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">show_gift_wrapping</span></td>
    <td class="">Boolean indicating whether the wrapping options are shown</td>
  </tr>
	<tr>
		<td class="">gift_wrapping</td>
		<td class="">Gift-wrapping options</td>
	</tr>
	<tr>
		<td class=""><span class="indent1"> name</span></td>
		<td class="">Name of the gift-wrapping option</td>
	</tr>
	<tr>
		<td class=""><span class="indent1"> price</span></td>
		<td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the price of the gift-wrapping option</td>
	</tr>
	<tr>
		<td class=""><span class="indent1"> message</span></td>
		<td class="">Customer-defined message for the gift wrapping </td>
	</tr>
	<tr>
		<td class=""><span class="indent1"> remove_url</span></td>
		<td class="">URL to remove the gift-wrapping option</td>
	</tr>
  <tr>
    <td class=""><span class="indent1">rrp</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the cart item's list price (MSRP); can be used to display struck-out list prices, as explained <a href="#strikeout">here</a></td>
  </tr>
  <tr>
    <td class=""><span class="indent1">price</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the unit price of the cart item, after discounts; to see how this and the next three price properties relate to each other, see Cart Price Properties</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">price_discounted</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the unit price, after all cart discounts and promotions</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">total</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the total price (price * quantity) of the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">total_discounted</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the total price (price * quantity), after all cart discounts and promotions</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">release_date</span></td>
    <td class="">If a pre-order product was added to the cart,  displays a message about when the item is expected to ship to the customer</td>
  </tr>
  <tr>
    <td class="">options</td>
    <td class="">Options chosen when product was added to cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Name of the option</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td class="">Value of the option</td>
  </tr>

  <tr>
		<td>bulk_pricing</td>
    <td>Properties for applying bulk-pricing discounts to cart items</td>
  </tr>

  <tr>
    <td class=""><span class="indent1"> base_price </span></td>
    <td class="">The lowest calculated price on an item. For example, 2 items are $99, 3 items are $98 and 4 items are $97. There are 3 items in the cart, the base price will be $98. </td>
  </tr>

  <tr>
    <td class=""><span class="indent1"> discount_amount </span></td>
    <td class="">Bulk-discount amount per item, if applicable; otherwise, null</td>
  </tr>  

  <tr>
    <td class=""><span class="indent1"> discount_percentage </span></td>
    <td class="">Bulk-discount percentage per item, if applicable; otherwise, null</td>
  </tr>  
	<tr>
		<td class="">custom_fields</td>
		<td class="">Custom product fields set when product was added to cart</td>
	</tr>
  <tr>
    <td class="">configurable_fields</td>
    <td class="">Custom product fields set when product was added to cart</td>
  </tr>

  <tr>
    <td class="">If type == GiftCertificate</td>
    <td class="">If the item in the cart is a gift certificate, these properties are available:</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Sender’s name </td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> edit_url</span></td>
    <td class="">URL to edit the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> recipient</span></td>
    <td class="">Recipient’s name</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> price</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the gift certificate’s basic price</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> total</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the gift certificate’s total cost, with applicable taxes included</td>
  </tr>
</table>

### Strikeout Pricing Example

As a theme developer, you can use the `{{cart.items.rrp}}` property to display strike-out pricing in the Cart context. Here is the general approach:

In your `templates/components/cart/content.html` file, as you iterate over the list of items in the cart, you would check each item's `type`. (No `rrp` property is available where the `type` is `GiftCertificate`.)

If the type is `Item`, then you would check the {{cart.items.rrp}} value. If the value is _not_ `null`, then you would know that you can display a strike-out price for the item. Below is a sample code skeleton:

```html
{{#each cart.items}}
   <!--...-->
  {{#if type '==' 'GiftCertificate'}}
      {{#if rrp}}
          <!-- your code to display strike-thru pricing -->
      {{else}}
          <!-- your code to display normal pricing -->
      {{/if}}
  {{/if}}
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

### Suggested Products

<b>Description:</b> A list of suggested products, based on cart contents; displays only if enabled by the `cart.suggestions` front-matter attribute, and only immediately after a product is added to the cart

<b>Handlebars Expression:</b> `{{cart.suggested_products}}`

<b>Object Properties:</b> References standard product card model.

## Customer

**Description:** Customer-specific properties for a storefront customer object. When filtering/limiting, customers' default sorting is by customer id, from lowest to highest. (Called on several partials in the `templates/components/` subdirectory:
`page/contact-us-form.html`,
`common/subscription-form.html`,
`account/address-list.html`,
`account/messages-form.html`, and
`account/wishlist-list.html`.)

**Handlebars Expression:** `{{customer}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Customer’s ID</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Customer’s name</td>
  </tr>
  <tr>
    <td>email</td>
    <td>Customer’s email address</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>Customer’s phone number</td>
  </tr>

  <tr>
    <td>store_credit</td>
    <td>Customer’s store credit</td>
  </tr>

  <tr>
    <td>customer_group_id</td>
    <td>ID of this customer's group</td>
  </tr>

  <tr>
    <td>customer_group_name</td>
    <td>Name of this customer's group</td>
  </tr>

  <tr>
    <td>num_new_messages</td>
    <td>Number of unread messages for this customer</td>
  </tr>
  <tr>
    <td>num_wishlists</td>
    <td>Number of wishlists for this customer</td>
  </tr>
  <tr>
    <td>shipping_address</td>
    <td>Shipping address used for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> id</span></td>
    <td>Unique, system-generated ID</td>
  </tr>
  <tr>
    <td><span class="indent1"> first_name</span></td>
    <td>Customer’s shipping (first) name</td>
  </tr>
  <tr>
    <td><span class="indent1"> last_name</span></td>
    <td>Customer’s shipping (last) name</td>
  </tr>
  <tr>
    <td><span class="indent1"> company</span></td>
    <td>Customer's shipping company name</td>
  </tr>
  <tr>
    <td><span class="indent1"> address1</span></td>
    <td>Customer's shipping address, first line</td>
  </tr>
  <tr>
    <td><span class="indent1"> address2</span></td>
    <td>Customer's shipping address, second line</td>
  </tr>
  <tr>
    <td><span class="indent1"> city</span></td>
    <td>Customer's shipping city</td>
  </tr>
  <tr>
    <td><span class="indent1"> state</span></td>
    <td>Customer's shipping state</td>
  </tr>
  <tr>
    <td><span class="indent1"> zip</span></td>
    <td>Customer's shipping zip</td>
  </tr>
  <tr>
    <td><span class="indent1"> country</span></td>
    <td>Customer's shipping country</td>
  </tr>
  <tr>
    <td><span class="indent1"> phone</span></td>
    <td>Customer's shipping phone number</td>
  </tr>
  <tr>
    <td><span class="indent1"> state_id</span></td>
    <td>ID for customer's shipping state/province/region
</td>
  </tr>
  <tr>
    <td><span class="indent1"> country_id</span></td>
    <td>ID for customer's shipping country</td>
  </tr>
  <tr>
    <td><span class="indent1"> destination</span></td>
    <td>Type of delivery destination: residential or business/commercial</td>
  </tr>
  <tr>
    <td><span class="indent1"> last_used</span></td>
    <td>Timestamp when this address was last used as a shipping address</td>
  </tr>
  <tr>
    <td><span class="indent1"> form_session_id</span></td>
    <td>Used for custom shipping forms</td>
  </tr>
	  <tr>
    <td><span class="indent1">payment_methods</span></td>
    <td>Used on the <a href="https://github.com/bigcommerce/cornerstone/blob/master/templates/components/account/payment-methods-list.html">payment methods page</a> to render list of customer's saved payment methods</td>
  </tr>
</table>

## Order Details

**Description:** The order properties for a specific order, usable on the order details page. (Called on the default `templates/pages/account/orders/details.html` and `<theme-name&gt;/templates/pages/account/orders/invoice.html` templates, and on the `<theme-name&gt;/templates/components/account/order-contents.html` partial.)

**Handlebars Expression:** `{{order}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>date</td>
    <td>Date of the order</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique, system-generated ID</td>
  </tr>
  <tr>
    <td>total</td>
    <td>Price object that defines the order’s total value</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Order status code</td>
  </tr>
  <tr>
    <td>status_text</td>
    <td>Status text associated with the status code for the order</td>
  </tr>
  <tr>
    <td>returns_enabled</td>
    <td>Boolean that indicates whether merchant allows products from the order to be returned</td>
  </tr>
  <tr>
    <td>reorder_url</td>
    <td>URL to place reorders for items in this order</td>
  </tr>
  <tr>
    <td>invoice_url</td>
    <td>URL to display an invoice for this order</td>
  </tr>
  <tr>
    <td>is_complete</td>
    <td>Boolean indicating that the order has been completed</td>
  </tr>
  <tr>
    <td>comments</td>
    <td>Customer’s message about the order</td>
  </tr>
  <tr>
    <td>items</td>
    <td>List of items for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> order_product_id</span></td>
    <td>Product ID</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Product Name</td>
  </tr>
  <tr>
    <td><span class="indent1"> quantity</span></td>
    <td>Quantity Ordered</td>
  </tr>
  <tr>
    <td><span class="indent1"> refunded</span></td>
    <td>Price object that defines the value of this product that has been refunded</td>
  </tr>
  <tr>
    <td><span class="indent1"> event_date </span></td>
    <td>A chosen event date for the product</td>
  </tr>
  <tr>
    <td><span class="indent1"> price</span></td>
    <td>Price object that defines the product’s price</td>
  </tr>
  <tr>
    <td><span class="indent1">shipping_rows</span></td>
    <td>Array of shipping addresses, for each item in the order</td>
  </tr>
  <tr>
    <td><span class="indent2">address</span></td>
    <td>Street address to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">city</span></td>
    <td>City to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">state </span></td>
    <td>State to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">zip</span></td>
    <td>Postal/ZIP code to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">country</span></td>
    <td>Country to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2"> gift_wrapping_name</span></td>
    <td>Name of the gift-wrapping option used</td>
  </tr>
  <tr>
    <td><span class="indent2"> type</span></td>
    <td>Type of purchase; value is one of: physical, digital, giftcertificate</td>
  </tr>
  <tr>
    <td><span class="indent2"> download_url</span></td>
    <td>URL at which customer can download digital item</td>
  </tr>
  <tr>
    <td><span class="indent2"> image</span></td>
    <td>The image of the order’s first product, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td><span class="indent2">show_reorder</span>
</td>
    <td>Boolean indicating whether the customer should see a button for reordering items on the Account Order Details page</td>
  </tr>
  <tr>
    <td><span class="indent2"> reorder_message</span></td>
    <td>An error message to be displayed when the customer attempts to reorder items that can’t be reordered</td>
  </tr>
  <tr>
    <td><span class="indent2"> options</span></td>
    <td>A list of options selected when this product was purchased</td>
  </tr>
  <tr>
    <td><span class="indent3"> name</span></td>
    <td>Display name for the option ("Small", "Medium", etc.)</td>
  </tr>
  <tr>
    <td><span class="indent3"> value</span></td>
    <td>Value that customer selected for the option</td>
  </tr>
  <tr>
    <td>billing_address</td>
    <td>Billing address used for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> full_name</span></td>
    <td>Customer's billing name</td>
  </tr>
  <tr>
    <td><span class="indent1"> company</span></td>
    <td>Customer's billing company name</td>
  </tr>
  <tr>
    <td><span class="indent1"> address_lines</span></td>
    <td>Customer's billing address</td>
  </tr>
  <tr>
    <td><span class="indent1"> city</span></td>
    <td>Customer's billing city</td>
  </tr>
  <tr>
    <td><span class="indent1"> state</span></td>
    <td>Customer's billing state</td>
  </tr>
  <tr>
    <td><span class="indent1"> country</span></td>
    <td>Customer billing country</td>
  </tr>
  <tr>
    <td><span class="indent1"> zip</span></td>
    <td>Customer billing ZIP</td>
  </tr>
  <tr>
    <td><span class="indent1"> phone</span></td>
    <td>Customer billing phone number</td>
  </tr>
  <tr>
    <td>shipping_address_count</td>
    <td>Number of shipping addresses the customer has specified for this order</td>
  </tr>
  <tr>
    <td>shipping_address</td>
    <td>Shipping address used for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> full_name</span></td>
    <td>Customer's shipping name</td>
  </tr>
  <tr>
    <td><span class="indent1"> company</span></td>
    <td>Customer's shipping company name</td>
  </tr>
  <tr>
    <td><span class="indent1"> address_lines</span></td>
    <td>Customer's shipping address</td>
  </tr>
  <tr>
    <td><span class="indent1"> city</span></td>
    <td>Customer's shipping city</td>
  </tr>
  <tr>
    <td><span class="indent1"> state</span></td>
    <td>Customer's shipping state</td>
  </tr>
  <tr>
    <td><span class="indent1"> country</span></td>
    <td>Customer's shipping country</td>
  </tr>
  <tr>
    <td><span class="indent1"> zip</span></td>
    <td>Customer's shipping zip</td>
  </tr>
  <tr>
    <td><span class="indent1"> phone</span></td>
    <td>Customer's shipping phone number</td>
  </tr>
  <tr>
    <td>payment_method</td>
    <td>Customer’s payment method for this order (payment gateway)</td>
  </tr>
  <tr>
    <td>card_number_last_four</td>
    <td>Last four digits of customer’s credit card</td>
  </tr>
  <tr>
    <td>total_rows</td>
    <td>A list of “total” rows containing total pricing information</td>
  </tr>
  <tr>
    <td><span class="indent1"> label</span></td>
    <td>The label of the total row (Subtotal, Tax, Grand Total, etc.)</td>
  </tr>
</table>

## Recent Items

**Description:** Items the customer has recently viewed. (Called on the default `templates/pages/account/recent-items.html` template.)

**Handlebars Expression:** `{{customer.recently_viewed_products}}`

**Object Properties:** References the standard [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

## Customer Wishlists

**Description:** Array of product wishlists, specific to this store, for the customer. (Called on the default `templates/components/account/wishlist-list.html` partial.)

**Handlebars Expression:** `{{customer.wishlists}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique system ID of the wishlist</td>
  </tr>
  <tr>
    <td>num_items</td>
    <td>Number of items in the wishlist</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Customer-defined name of the wishlist</td>
  </tr>
  <tr>
    <td>is_public</td>
    <td>Boolean value indicating whether the wishlist is publicly available </td>
  </tr>
  <tr>
    <td>is_editable</td>
    <td>Boolean indicating whether the "Remove Item" button, and account navigation controls, are displayed (i.e., whether the customer viewing the wishlist is this wishlist’s owner)</td>
  </tr>
  <tr>
    <td>token</td>
    <td>Unique public token for the wishlist</td>
  </tr>
  <tr>
    <td>view_url</td>
    <td>URL to view the wishlist</td>
  </tr>
  <tr>
    <td>edit_url</td>
    <td>URL to edit the wishlist</td>
  </tr>
  <tr>
    <td>delete_url</td>
    <td>URL to delete the wishlist</td>
  </tr>
  <tr>
    <td>share_url</td>
    <td>URL to share the wishlist</td>
  </tr>
</table>

## Wishlist Details

**Description:** Wishlist information for a specific wishlist. (Called on the default `templates/pages/account/wishlist-details.html` template and `templates/components/account/wishlist-item-list.html`partial.)

**Handlebars Expression:** `{{wishlist}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique system ID for the wishlist</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Customer-defined name of the wishlist</td>
  </tr>
  <tr>
    <td>is_public</td>
    <td>Boolean value indicating whether the wishlist is publicly available </td>
  </tr>
  <tr>
    <td>token</td>
    <td>Unique public token for the wishlist</td>
  </tr>
  <tr>
    <td>share_url</td>
    <td>URL used to share the wishlist</td>
  </tr>
  <tr>
    <td>items</td>
		<td>List of items in the wishlist; extends <a href="">the product card model</a>, adding the extra properties below:</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> id</span></td>
    <td class="">Unique system ID for this wishlist item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> product_id</span></td>
    <td class="">Product ID for the item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remove_url</span></td>
    <td class="">URL to remove the product from the wishlist</td>
  </tr>
</table>

## Account Order Shipments

<b>Description:</b> Objects to manage shipments associated with a specific order details for the current customer. (Called on the default `<theme-name&gt;/templates/pages/account/orders/details.html` template.)

**Handlebars Expression:** `{{shipments}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>date_shipped</td>
    <td>Shipping date for this shipment</td>
  </tr>
  <tr>
    <td>shipping_provider</td>
    <td>Carrier for this shipment</td>
  </tr>
  <tr>
    <td>shipping_method</td>
    <td>Shipping method for this shipment</td>
  </tr>
  <tr>
    <td>show_shipping_method</td>
    <td>Boolean indicating whether to display the shipping method to the customer</td>
  </tr>
  <tr>
    <td>shipping_track</td>
    <td>Tracking information for this shipment</td>
  </tr>
  <tr>
		<td><span class="indent1">url</span></td>
    <td>Tracking URL for this shipment</td>
  </tr>
  <tr>
		<td><span class="indent1">number</span></td>
    <td>Tracking number for this shipment</td>
  </tr>
</table>

## Account Orders

**Description:** Objects to manage completed orders for the current customer. By default, orders sort by order id, from lowest to highest. (Called on the default `templates/pages/account/orders/all.html`and `<theme-name&gt;/templates/pages/account/orders/completed.html`  templates, and on the `templates/components/account/orders-list.html` partial.)

**Handlebars Expression:** `{{customer.orders}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>References pagination model</td>
  </tr>
  <tr>
    <td>date</td>
    <td>Date this order was placed</td>
  </tr>
  <tr>
    <td>last_update_date</td>
    <td>Date this order was last updated</td>
  </tr>
  <tr>
    <td>id</td>
    <td>ID for this order</td>
  </tr>
  <tr>
    <td>total</td>
    <td>Total value of this order</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Status of this order ("Completed" or other)</td>
  </tr>
  <tr>
    <td>return_url</td>
    <td>URL for returning items in this order</td>
  </tr>
  <tr>
    <td>reorder_url</td>
    <td>URL for reordering items in this order</td>
  </tr>
  <tr>
    <td>details_url</td>
    <td>URL for details about this order</td>
  </tr>
  <tr>
    <td>payment_instructions</td>
    <td>Text field defined by merchant as to payment instructions for manual gateways such as “Bank Deposit”</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Image of the order’s first product, in Stencil image format</td>
  </tr>
  <tr>
    <td>items</td>
    <td>Array of products in this order</td>
  </tr>
    <tr>
    <td><span class="indent1">name</span></td>
    <td>Name of this product</td>
  </tr>
  <tr>
    <td><span class="indent1">quantity</span></td>
    <td>Quantity of this product ordered</td>
  </tr>
  <tr>
    <td><span class="indent1">refunded</span></td>
    <td>Price object that defines the amount of this product that has been refunded</td>
  </tr>
  <tr>
    <td><span class="indent1">expected_release_date</span></td>
    <td>Expected ship date if the product is set to pre-order status</td>
  </tr>
  <tr>
    <td><span class="indent1">type</span></td>
    <td>Type of purchase; value is one of: physical, digital, giftcertificate</td>
  </tr>
  <tr>
    <td><span class="indent1">download_url</span></td>
    <td>URL for customer to download a digital product</td>
  </tr>
  <tr>
    <td><span class="indent1">image</span></td>
    <td>The image for this ordered product</td>
  </tr>
  <tr>
    <td><span class="indent1">options</span></td>
    <td>Array of additional product details (size, color, etc.), as name/value pairs</td>
  </tr>
  <tr>
    <td><span class="indent2">name</span></td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
    <td><span class="indent2">value</span></td>
    <td>Displayed value for this product’s entry</td>
  </tr>
</table>

## Account Returns

**Description:** Objects to manage returns for the current customer. (Called on the default `templates/pages/account/returns.html` template.)

**Handlebars Expression:** `{{customer.returns}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>date_requested</td>
    <td>Date on which the customer requested this return</td>
  </tr>
  <tr>
    <td>id</td>
    <td>The ID for this return</td>
  </tr>
  <tr>
    <td>quantity</td>
    <td>Quantity of items returned</td>
  </tr>
  <tr>
    <td>reason</td>
    <td>Reason for return; merchants can define actions beyond the default strings created with each store, which are: Received Wrong Product, Wrong Product Ordered, Not Satisfied With The Product, and There Was A Problem With The Product</td>
  </tr>
  <tr>
    <td>action</td>
    <td>Return action; merchants can define actions beyond the default set created with each store (Repair, Replacement, or Store Credit)</td>
  </tr>
  <tr>
    <td>comments</td>
    <td>Comments that the customer entered with the return request</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Status of the return: Pending, Received, Authorized, Repaired,
Refunded, Rejected, or Cancelled</td>
  </tr>
  <tr>
    <td>product</td>
    <td>Array of products included in the return</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL for this product</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Name of this product</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array of additional product details (size, color, etc.), as name/value pairs</td>
  </tr>
  <tr>
		<td><span class="indent1">name</span></td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
		<td><span class="indent1">value</span></td>
    <td>Displayed value for this product’s entry</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Image for this product</td>
  </tr>
</table>

## Account New Return

**Description:** Objects to handle a new return for the current customer. (Called on the default `templates/pages/account/add-return.html` template.)

**Handlebars Expression:** `{{forms.return}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>order_id</td>
    <td>ID for the original order</td>
  </tr>
  <tr>
    <td>reasons</td>
    <td>Reasons for return</td>
  </tr>
  <tr>
    <td>actions</td>
    <td>Return actions: an array of strings arbitrarily defined by the merchant: refund, exchange, credit, etc.</td>
  </tr>
  <tr>
    <td>order_products</td>
    <td>Array of products from the order that are available to return</td>
  </tr>
  <tr>
    <td><span class="indent1">id</span></td>
    <td>ID for the product</td>
  </tr>
  <tr>
    <td><span class="indent1">name</span></td>
    <td>Name of this product</td>
  </tr>
  <tr>
    <td><span class="indent1">product_id</span></td>
    <td>ID for this product</td>
  </tr>
  <tr>
    <td><span class="indent1">price</span></td>
    <td>Price object that defines this product’s price</td>
  </tr>
  <tr>
    <td><span class="indent1">quantity</span></td>
    <td>Quantity of the product returned</td>
  </tr>
  <tr>
    <td><span class="indent1">options</span></td>
    <td>Array of additional product details (size, color, etc.), as name/value pairs</td>
  </tr>
  <tr>
    <td><span class="indent3">name</span></td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
    <td><span class="indent3">value</span></td>
    <td>Displayed value for this product’s entry</td>
  </tr>
</table>

## Create Account

**Description:** Object to enable the current customer to create a store account. (Called on the default `<theme-name&gt;/templates/pages/auth/create-account.html` template.)

**Handlebars Expression:** `{{forms.create_account}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>recaptcha</td>
    <td>Objects for integrating the Google reCAPTCHA service to distinguish human visitors from ’bots (automated agents)</td>
  </tr>
  <tr>
    <td><span class="indent1">enabled</span></td>
    <td>Boolean indicating whether reCAPTCHA is enabled for this store</td>
  </tr>
  <tr>
    <td><span class="indent1">public_key</span></td>
    <td>Public key (site key) that reCAPTCHA returns upon merchant’s enabling CAPTCHA security in Store Settings > Display Settings</td>
  </tr>
  <tr>
    <td>address_fields</td>
    <td>Array of form fields that define each shipping address for this customer; for details, see this repo: <NOBR><a href="https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms">https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms</a></nobr></td>
  </tr>
  <tr>
    <td><span class="indent1">class_name</span></td>
    <td>Specifies a CSS class (defined in the theme's <code>/assets/scss/</code> subdirectory) to apply to a field within the array; for corresponding control-panel steps, see this support article:
 <NOBR><a href="https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings">https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings</a> </td>
  </tr>
  <tr>
    <td>account_fields</td>
    <td>Object of form fields; for details, see this repo:
 <NOBR><a href="https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms">https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms</a></nobr></td>
  </tr>
  <tr>
    <td><span class="indent1">class_name</span></td>
    <td>Specifies a CSS class to apply to a field within the array; for corresponding control-panel steps, see:
<a href="https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings">https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings</a></td>
  </tr>
  <tr>
    <td>error</td>
    <td>BCApp generated message to display when customer’s account creation fails</td>
  </tr>
  <tr>
    <td>checking_out</td>
    <td>Boolean indicating whether customer created the account during a purchase checkout</td>
  </tr>
</table>

## Shipping Addresses

**Description:** Object to enable the customer to enter shipping and contact information. (Called on the default `templates/components/account/address-list.html` partial.)

**Handlebars Expression:**`{{customer.addresses}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>ID for this shipping address</td>
  </tr>
  <tr>
    <td>customer_id</td>
    <td>ID for this customer</td>
  </tr>
  <tr>
    <td>first_name</td>
    <td>First name to ship to</td>
  </tr>
  <tr>
    <td>last_name</td>
    <td>Last name to ship to</td>
  </tr>
  <tr>
    <td>company</td>
    <td>Company name to ship to</td>
  </tr>
  <tr>
    <td>address1</td>
    <td>Street (etc.) address, first line</td>
  </tr>
  <tr>
    <td>address2</td>
    <td>Street (etc.) address, second line</td>
  </tr>
  <tr>
    <td>city</td>
    <td>City to ship to</td>
  </tr>
  <tr>
    <td>state</td>
    <td>State/province/region to ship to</td>
  </tr>
  <tr>
    <td>zip</td>
    <td>Postal/ZIP code to ship to</td>
  </tr>
  <tr>
    <td>country</td>
    <td>Country to ship to</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>Addressee’s phone number</td>
  </tr>
  <tr>
    <td>state_id</td>
    <td>ID for destination state/province/region</td>
  </tr>
  <tr>
    <td>country_id</td>
    <td>ID for destination country</td>
  </tr>
  <tr>
    <td>destination</td>
    <td>residential or commercial</td>
  </tr>
  <tr>
    <td>last_used</td>
    <td>Boolean, indicating whether this was the last-used shipping address for this customer</td>
  </tr>
  <tr>
    <td>full_name</td>
    <td>Full name of addressee</td>
  </tr>
  <tr>
    <td>edit_url</td>
    <td>URL for customer to edit this shipping address</td>
  </tr>
  <tr>
    <td>delete_url</td>
    <td>URL for customer to delete this shipping address </td>
  </tr>
</table>

## Payment Methods

**Description:** Object to view stored customer payment methods.

**Called on:** [`[templates/pages/account/payment-methods.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/payment-methods.html)

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

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Blog name</td>
  </tr>
  <tr>
    <td>url</td>
    <td>Blog custom url</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>References pagination model</td>
  </tr>
  <tr>
    <td>posts </td>
    <td>A list of posts for the blog index; default sorting is by date_published,<br> from most-recent to earliest</td>
  </tr>
  <tr>
    <td><span class="indent1">author</span></td>
    <td>Author of the blog post</td>
  </tr>
  <tr>
    <td><span class="indent1">title</span></td>
    <td>Title of the blog post</td>
  </tr>
  <tr>
    <td><span class="indent1">url</span></td>
    <td>URL of the blog entry</td>
  </tr>
  <tr>
    <td><span class="indent1">body</span></td>
    <td>Body of the blog entry</td>
  </tr>
  <tr>
    <td><span class="indent1">thumbnail</span></td>
    <td>Image thumbnail for the blog entry, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td><span class="indent1">date_published</span></td>
    <td>Date the blog entry was published</td>
  </tr>
  <tr>
    <td><span class="indent1">social</span></td>
    <td>Social media tags for the blog entry</td>
  </tr>
  <tr>
    <td><span class="indent1">tags </span></td>
    <td>Tags for the blog</td>
  </tr>
  <tr>
    <td><span class="indent2">name</span></td>
    <td>Name for the tag</td>
  </tr>
  <tr>
    <td><span class="indent2">url</span></td>
    <td>URL for the tag</td>
  </tr>
</table>

## Blog Post

<b>Description:</b> Individual blog post object

<b>Handlebars Expression:</b> `{{blog.post}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>author</td>
    <td>Author of the blog post</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Title of the blog post</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of the blog entry</td>
  </tr>
  <tr>
    <td>body</td>
    <td>Body of the blog entry</td>
  </tr>
  <tr>
    <td>thumbnail</td>
    <td>Image thumbnail for the blog entry, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td>date_published</td>
    <td>Date the blog entry was published</td>
  </tr>
  <tr>
    <td>social</td>
    <td>Social media tags for the blog entry</td>
  </tr>
  <tr>
    <td>tags </td>
    <td>Tags for the blog</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Name for the tag</td>
  </tr>
  <tr>
    <td><span class="indent1"> url</span></td>
    <td>URL for the tag</td>
  </tr>
</table>

## Forms

### Account Form

<b>Description:</b> The form object used to edit a customer object. <br>

<b>Handlebars Expression:</b> <code>{{forms.edit_account}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td class="">first_name</td>
    <td class="">First name of the customer being edited</td>
  </tr>
  <tr>
    <td class="">last_name</td>
    <td class="">Last name of the customer being edited</td>
  </tr>
  <tr>
    <td class="">company_name</td>
    <td class="">Company of the customer being edited</td>
  </tr>
  <tr>
    <td class="">phone</td>
    <td class="">Phone number of the customer being edited</td>
  </tr>
  <tr>
    <td class="">error</td>
    <td class="">Message to display (generated by the BigCommerce App) when customer’s account edit fails</td>
  </tr>
  <tr>
    <td class="">success</td>
    <td class="">Message to display (generated by the BigCommerce App) when customer’s account edit succeeds</td>
  </tr>
</table>

### Account Address Form

<b>Description:</b> Form object presented to customers in the Add/Edit Address page. Called on the default <NOBR><span class="inline-code">&lt;theme-name&gt;/templates/components/account/address-list.html</span></nobr> partial and <NOBR><span class="inline-code">&lt;theme-name&gt;/templates/pages/account/add-address.html</span></nobr> template. <br>

<b>Handlebars Expression:</b> <code>{{forms.address}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td class="">address_id</td>
    <td class="">ID for this shipping address</td>
  </tr>
  <tr>
    <td class="">shipping_fields</td>
    <td class="">Array of form fields that define each shipping address for this customer; for details, see this repo:
https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms</td>
  </tr>
  <tr>
    <td class="">action</td>
    <td class="">URL to the proper handler (Update Address versus Save New Address)</td>
  </tr>
  <tr>
    <td class="">error</td>
    <td class="">Message to display when form entry fails (defined by the BigCommerce App)</td>
  </tr>
</table>

### Wishlist Form

<b>Description:</b> Form object presented to customers on the Add/Edit Wishlist page. Called on the default <code>&lt;theme-name&gt;/templates/components/account/add-wishlist.html</code> partial and <code>&lt;theme-name&gt;/templates/pages/account/add-wishlist.html</code> template.

<b>Handlebars Expression:</b> `{{forms.wishlist}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Displayed name for this wishlist</td>
  </tr>
  <tr>
    <td class="">id</td>
    <td class="">ID for this wishlist</td>
  </tr>
  <tr>
    <td class="">is_public</td>
    <td class="">Boolean indicating whether this wishlist is displayed to other store visitors</td>
  </tr>
  <tr>
    <td class="">errors</td>
    <td class="">Message to display when form entry fails (generated by the BigCommerce App)</td>
  </tr>
  <tr>
    <td class="">action</td>
    <td class="">URL to the proper handler (Update Wish List versus Save New Wish List)</td>
  </tr>
</table>

### Gift Certificate Form

<b>Description:</b><b><em> </em></b>Form object used to create and edit a gift certificate object for the merchant's store. Called on the default <NOBR><span class="inline-code">&lt;theme-name&gt;templates/pages/gift-certificate/purchase.html</span></nobr> template. <br>

<b>Handlebars Expression:</b> <code>{{forms.gift_certificate}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>editing</td>
    <td>Whether the current context is editing a gift certificate in the cart, or adding a new gift certificate</td>
  </tr>
  <tr>
    <td>can_use_custom_amount</td>
    <td>Whether the customer can enter free-text input (otherwise, must select from a drop-down list)</td>
  </tr>
  <tr>
    <td>amount_options</td>
    <td>If can_use_custom_amount is disabled, this variable fills the dropdown with the available options, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">price object</a> form</td>
  </tr>
  <tr>
    <td>minimum</td>
    <td><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the minimum amount a customer can enter (when can_use_custom_amount is enabled)</td>
  </tr>
  <tr>
    <td>maximum</td>
    <td><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the minimum amount a customer can enter  (when can_use_custom_amount is enabled)</td>
  </tr>
  <tr>
    <td>expires_in_days</td>
    <td>If the gift certificates expire, this will be non-0 numerical days</td>
  </tr>
  <tr>
    <td>errors</td>
    <td>Server-side validation errors from the form’s submission</td>
  </tr>
  <tr>
    <td>themes</td>
    <td>A list of active gift-certificate themes (Birthday, Celebration, General, etc.), each stored as an object containing corresponding display and value children</td>
  </tr>

  <tr>
    <td>display</td>
    <td>Birthday, Celebration, General, etc.</td>
  </tr>
  <tr>
    <td>value</td>
    <td class="">Birthday.html, Celebration.html, General.html, etc.</td>
  </tr>

  <tr>
    <td>action</td>
    <td>The action for the form</td>
  </tr>
  <tr>
    <td>cart_item_id</td>
    <td>If editing, this is the cart item id being edited.</td>
  </tr>
  <tr>
    <td>values</td>
    <td>An array of the form values for prefilling</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">to_name</span></td>
    <td class="">The recipient's name</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">to_email</span></td>
    <td class="">To email address</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">from_name</span></td>
    <td class="">The sender’s name</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">from_email</span></td>
    <td class="">From email address</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">message</span></td>
    <td class="">An optional custom message</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">amount</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the amount of the gift certificate</td>
  </tr>
</table>

### Contact Us Form

<b>Description:</b>Form object used to manage merchants’ "Contact Us" pages. Called on the default <code>&lt;theme-name&gt;/templates/pages/contact-us.html</code>template.

<b>Handlebars Expression:</b> <code>{{forms.contact}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>success</td>
    <td>Boolean indicating whether form was just submitted</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Boolean indicating whether name input is enabled for the form</td>
  </tr>
  <tr>
    <td>company</td>
    <td>Boolean indicating whether company-name input is enabled for the form</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>Boolean indicating whether phone-number input is enabled for the form</td>
  </tr>
  <tr>
    <td>order</td>
    <td>Boolean indicating whether order-number input is enabled for the form</td>
  </tr>
  <tr>
    <td>rma</td>
    <td>Boolean indicating whether RMA (Return Merchandise Authorization) input is enabled for the form</td>
  </tr>
  <tr>
    <td>page_id</td>
    <td>Page ID for this contact page (there can be multiple contact pages)</td>
  </tr>
  <tr>
    <td>captcha_url</td>
    <td>URL to provide an image file for a CAPTCHA field</td>
  </tr>
  <tr>
    <td>text</td>
    <td>Text content to display above the form</td>
  </tr>
  <tr>
    <td>error</td>
    <td>Potential error that occurred during previous form submission</td>
  </tr>
	<tr>
    <td>recaptcha.markup</td>
    <td>Adds reCaptcha V2</td>
  </tr>
</table>

### Login Account Form

<b>Description:</b> Form object used to manage merchants’ "Login" page. Called on the default <code>&lt;theme-name&gt;/templates/pages/create-login.html</code>template.

<b>Handlebars Expression:</b> <code>{{forms.login}}</code>

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>error</td>
    <td>BigCommerce defined message to display when customer’s login action fails</td>
  </tr>
  <tr>
    <td>success</td>
    <td>BigCommerce defined message to display when customer’s login action succeeds</td>
  </tr>
  <tr>
  <td>reCAPTCHA</td>
  <td></td>
  </tr>
  <tr>
  <td class=""><span class="indent1">enabled</span></td>
  <td class="">Returns 1 when reCAPTCHA is enabled and 0 when it's disabled within the BigCommerce control panel</td>
  </tr>
  <tr>
  <td class=""><span class="indent1">public_key</span></td>
  <td class="">Optional key used for all reCAPTCHA in your store if specified in the BigCommerce control panel</td>
  </tr>
  <tr>
  <td class=""><span class="indent1">markup</span></td>
  <td class="">HTML that adds reCAPTCHA V2</td>
  </tr>
</table>

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

### Customizing Login Form Content
> Login form content can be customized in templates/components/common/alert-success.html

</div>
</div>
</div>

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
