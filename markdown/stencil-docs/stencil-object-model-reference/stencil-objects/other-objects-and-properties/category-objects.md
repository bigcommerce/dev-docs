<h1>Category Objects</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#category_category">Category</a></li>
    <li><a href="#category_category-products">Category Products</a></li>
    <li><a href="#category_category-shop">Category Shop by Price</a></li>
	</ul>
</div>

<a href='##category_category' aria-hidden='true' class='block-anchor'  id='#category_category'></a>

## Category

**Description:**  The category object for the page calling the object. When retrieving a collection of categories, default sorting is by category `id`, from lowest to highest. (Called on the default `<theme-name>/templates/pages/category.html` template, and on several partials in the `<theme-name&gt;/templates/components/</code> subdirectory: <code>category/shop-by-price.html`,`category/sidebar.html`, and `amp/category/subcategories.html`)

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

<a href='#category_category-products' aria-hidden='true' class='block-anchor'  id='category_category-products'></a>

## Category Products

**Description:** A list of products associated with this category. (Called on the default `<theme-name>/templates/pages/category.html` template, and on the `<theme-name>/templates/components/category/product-listing.html` partial.)

**Handlebars Expression:** `{{category.products}}`

**Object Properties:** References the  [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

<a href='#category_category-shop' aria-hidden='true' class='block-anchor'  id='category_category-shop'></a>

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

