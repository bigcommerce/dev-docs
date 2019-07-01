<h1>Search</h1>

<b>Description:</b> Defines search parameters for the merchant’s site

<b>Handlebars Expression:</b> `{{forms.search}}`

<b>Object Properties:</b>

<table>
		<th>Property</th>
		<th>Description</th>
  <tr>
    <td>query</td>
    <td>Active search query, if available</td>
  </tr>
  <tr>
    <td>section</td>
    <td>Active search-results section: either content or product</td>
  </tr>
  <tr>
    <td>content_url</td>
    <td>URL to the content section</td>
  </tr>
  <tr>
    <td>product_url</td>
    <td>URL to the product section</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Brand name</td>
  </tr>
  <tr>
    <td>suggested_query</td>
    <td>An alternative query – related to the current query – that can be offered to substitute for misspelled entries</td>
  </tr>
  <tr>
    <td>has_suggestions</td>
    <td>Boolean – true if there is at least one of brand results, category results, or a (non-null) suggested_query</td>
  </tr>
  <tr>
    <td>brand_results</td>
    <td>Array of brands that match the search query; default sorting is by brand id, from lowest to highest</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of the brand</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Displayed name for the brand</td>
  </tr>
  <tr>
    <td>category_results</td>
    <td>An array of category paths matching the search query; used to populate category suggestions</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of the category</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Displayed name for the category</td>
  </tr>
  <tr>
    <td>values</td>
    <td>Values of the submitted search form</td>
  </tr>
  <tr>
    <td>brand</td>
    <td>Any brand ID that customer has selected from drop-down list</td>
  </tr>
  <tr>
    <td>price_from</td>
    <td>Any minimum price the customer has specified</td>
  </tr>
  <tr>
    <td>price_to</td>
    <td>Any maximum price the customer has specified</td>
  </tr>
  <tr>
    <td>featured_products</td>
    <td>Whether customer has chosen to view featured products: null = no preference; 1 = only featured products; 2 = only non-featured products</td>
  </tr>
  <tr>
    <td>free_shipping</td>
    <td>Value indicating customer’s preference for free shipping within search results: null = no preference; 1 = free shipping only; 2 = paid shipping only</td>
  </tr>
  <tr>
    <td>result_count</td>
    <td>Combined number of returned results for product and content search</td>
  </tr>
  <tr>
    <td>category_options</td>
    <td>Array of options to present to customer as search-by-category fields</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Category ID</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Displayed name of the category</td>
  </tr>
  <tr>
    <td>state</td>
    <td>If category contains children, and customer selects a child category: Whether that category’s display will default to closed (collapsed) or opened (expanded)</td>
  </tr>
  <tr>
    <td>children</td>
    <td>Array of objects representing a child category; recursively replicates the structure of its parent</td>
  </tr>
  <tr>
    <td>content_results</td>
    <td>Search results across blog posts and storefront pages (not products or categories)</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Title of the result (title embedded in blog post or page)</td>
  </tr>
  <tr>
    <td>content</td>
    <td>Summary of text from the blog post or page (first 200 characters)</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL to the result</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Either post (for blog posts) or page (for storefront pages)</td>
  </tr>
  <tr>
		<td>product_results</td>
    <td>Results of customer’s last search by product (each result contains the below properties)</td>
  </tr>
  <tr>
		<td><span class="indent1">products</span></td>
    <td>List of search results for a product; points to <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">product card model</a></td>
  </tr>
  <tr>
         <td><span class="indent1">show_compare</span></td> 
         <td>Boolean corresponding to merchant’s control-panel selection whether or not to enable product comparisons </td> 
      </tr> 
       <tr> 
         <td><span class="indent1">faceted_search_enabled</span>
         </td> <td>Boolean that defines whether product-filtering search is enabled for the store</td> 
       </tr> 
       <tr> 
         <td><span class="indent1">facets</span></td> 
         <td>All available search filters</td> 
       </tr> 
       <tr> 
         <td><span class="indent1">pagination</span></td> 
         <td>References pagination model</td> 
       </tr> 
       <tr> 
				 <td><span class="indent1">selected</span</td> 
         <td>Currently selected filters</td> 
       </tr>
</table>


