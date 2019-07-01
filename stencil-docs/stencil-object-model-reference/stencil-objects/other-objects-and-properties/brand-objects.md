<h1>Brand Objects</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#brand_brand">Brand</a></li>
		<li><a href="#brand_brand-list">Brand List</a></li>
    <li><a href="#brand_shop-by-brand">Category Shop by Price</a></li>
	</ul>
</div>

<a href='#brand_brand' aria-hidden='true' class='block-anchor'  id='brand_brand'></a>

## Brand

**Description:** The brand object for the page calling the object. (Called on the default `<theme-name>/templates/pages/brand.html` template.)

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

<a href='#brand_brand-list' aria-hidden='true' class='block-anchor'  id='brand_brand-list'></a>

## Brand List

<b>Description:</b> A list of brands with their basic data. Default sorting is by brand id, from lowest to highest. (Called on the default `<theme-name>/templates/pages/brands.html` template.)

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

<a href='#brand_shop-by-brand' aria-hidden='true' class='block-anchor'  id='brand_shop-by-brand'></a>

## Shop by Brand

**Description:** Objects to enable customers to shop by brand. Returns top 10 brands, by product count. (Called on the default `<theme-name>/templates/components/brand/sidebar.html` and `<theme-name>/templates/components/common/footer.html` partials.)

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

