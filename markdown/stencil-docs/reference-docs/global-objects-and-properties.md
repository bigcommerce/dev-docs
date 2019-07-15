<h1>Global Objects and Properties</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#global-objects_banner">Banner</a></li>
    <li><a href="#global-objects_breadcrumbs">Breadcrumbs</a></li>
    <li><a href="#global-objects_categories">Categories</a></li>
    <li><a href="#global-objects_currency-selector">Currency Selector</a></li>
    <li><a href="#global-objects_faceted-search">Faceted Search</a></li>
    <li><a href="#global-objects_featured-products">Featured Products</a></li>
    <li><a href="#global-objects_footer">Footer</a></li>
    <li><a href="#global-objects_carousel">Carousel</a></li>
    <li><a href="#global-objects_html-head">HTML Head</a></li>
    <li><a href="#global-objects_is-ajax">Is Ajax</a></li>
    <li><a href="#global-objects_login">Login</a></li>
    <li><a href="#global-objects_new-products">New Products</a></li>
    <li><a href="#global-objects_page-content">Page Content</a></li>
    <li><a href="#global-objects_pages">Pages</a></li>
    <li><a href="#global-objects_page-type">Page Type</a></li>
    <li><a href="#global-objects_pagination">Pagination</a></li>
    <li><a href="#global-objects_settings">Settings</a></li>
    <li><a href="#global-objects_sitemap">Sitemap</a></li>
    <li><a href="#global-objects_social-links">Social Links</a></li>
    <li><a href="#global-objects_template-property">Template Property</a></li>
    <li><a href="#global-objects_top-sellers">Top Sellers</a></li>
  </ul>
</div>


<a href='#global_global-objects' aria-hidden='true' class='block-anchor'  id='global_global-objects'><i aria-hidden='true' class='linkify icon'></i></a>

Global objects and properties are common components shared across the entire BigCommerce storefront. 

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Debugging Your Theme
> The Stencil framework provides built-in debugging tools to aid in your custom front-end development. When you want to see what data is available on the page you are working on, you can simply add the debug query string to your store’s localhost URL. Here is an example:

`http://localhost:3000/product/this-is-a-sample-product?debug=context`

This will return a list of all the objects available on the page, in JSON syntax. If you want to view the available JSON objects and rendered page at the same time, simply change the debug value to bar. Below is an example:

`http://localhost:3000/product/this-is-a-sample-product?debug=bar`

</div>
</div>
</div>

## Banner

<b>Description:</b> Elements of marketing banners at page’s top and/or bottom

<b>Handlebars Expressions:</b> `{{banner}}`, `{{{banner}}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
		<td>banners</td>
    <td>Blocks of static HTML content to define banners</td>
  </tr>
  <tr>
		<td><span class="indent1">top</span></td>
    <td>Array of HTML content/strings, for custom top-banner content; banners are populated from the BigCommerce control panel</td>
  </tr>
  <tr>
		<td><span class="indent1">bottom</span></td>
    <td>Array of HTML content/strings, for custom bottom-banner content; banners are populated from the BigCommerce control panel</td>
  </tr>
</table>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

###  Handlebars Formatting Exception
> Where a banner contains HTML, the banner helper must be placed in triple braces, as in this
example: `{{{banner}}}`. (Double braces would escape the HTML.)

</div>
</div>
</div>

---
## Breadcrumbs 

<b>Description:</b> Defines a page's breadcrumbs – available on virtually all pages that have a breadcrumb trail

<b>Handlebars Expression:</b> `{{breadcrumbs}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Displayed name of this breadcrumb element</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL of this breadcrumb element</td>
  </tr>
</table>

---

## Carousel

<b>Description:</b> A list of images, text, and style assets for a storefront’s image slide show

<b>Handlebars Expression: </b> `{{carousel}}`

<b>Object Properties:</b>

<table>  
  <tr>    
    <td>Property</td>    
    <td>Description</td>  
  </tr>    
  <tr>    
    <td>swap_frequency</td>    
    <td>Indicates how often (in seconds) the slides will change; the value must be between 1 and 90,000 seconds</td>  
  </tr>    
  <tr>    
    <td>slides</td>    
    <td>Object containing properties for each slide in the slideshow</td>  
  </tr>    
  <tr>    
    <td><span class="indent1">image</span></td>    
    <td>Path to the image file used on this slide</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">alt_text</span></td>    
    <td>Alt text for the image</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">url</span></td>    
    <td>URL to which the image will link</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">heading</span></td>    
    <td>Heading message defined by the merchant</td>  
  </tr>  
  <tr>    
  <td><span class="indent1">heading_color</span></td>    
  <td>Color of the heading text</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">text</span></td>    
    <td>Subheading defined by the merchant</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">text_color</span></td>    
    <td>Color of the subheading text</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">button_text</span></td>    
    <td>Text displayed on a call-to-action button defined by the merchant</td>  
</tr>  
  <tr>    
  <td><span class="indent1">button_text_color</span></td>    
  <td>Color of the button</td>  
</tr>
</table>

---


## Currency Selector 

<b>Description:</b> A list of all supported currencies, and the currency that is actively in use in the storefront

<b>Handlebars Expression:</b> `{{currency_selector}}`

<b>Object Properties:</b>

<table>  
<tr>    
  <th>Property</th>   
  <th>Description</th>  
</tr>  
<tr>    
  <td>active_currency_id</td>    
  <td>ID of the currency actively in use in the storefront</td>  
</tr>  
<tr>    
  <td>active_currency_flag</td>    
  <td>Country flag used to represent the active currency</td>  
</tr> 
<tr>    
  <td>active_currency_name</td>    
  <td>Name of the active currency</td>  
</tr>
<tr>    
  <td>active_currency_code</td>    
  <td>Code for the active currency</td>  
</tr>  
<tr>    
  <td>currencies</td>    
  <td>List of all the currencies supported for this storefront</td>  
</tr> 
<tr>    
  <td><span class="indent1">is_active</span></td>    
  <td>Boolean that indicates whether this currency is active for use in the storefront</td>  
</tr> 
<tr>    
  <td><span class="indent1">switch_url</span></td>    
  <td>The URL to invoke a switch to this currency</td> 
</tr> 
<tr>    
 <td><span class="indent1"> id</span></td>    
 <td>ID of the currency</td>  
</tr> 
<tr>    
 <td><span class="indent1"> name</span></td>    
 <td>Name of the currency</td>  
</tr> 
 <tr>    
  <td><span class="indent1"> flag</span></td>    
  <td>Country flag used to visually represent the currency</td>  
 </tr>
 </table>
 
 ---
 
 ## Categories
 
 <b>Description:</b> A list of all product categories shown in the current page context; default sorting is by category id, from lowest to highest

<b>Handlebars Expression:</b> `{{categories}}`

<b>Object Properties:</b>

<b>Object Properties:</b>
<table>  
  <tr>   
    <td>Property</td>    
    <td>Description</td>  
  </tr>  
  <tr>    
    <td>id</td>    
    <td>ID of the top-level category listed</td>  
  </tr>  
  <tr>    
    <td>name</td>    
    <td>Name of the top-level category</td>  
  </tr>  
  <tr>    
    <td>description</td>    
    <td>Description of the top-level category (optional &ndash; when requested in front matter)</td>  
  </tr>  
  <tr>    
    <td>url</td>    
    <td>URL to the category page</td>  
  </tr>  
  <tr>    
    <td>count</td>    
    <td>Number of products in this category</td>  
  </tr>  
  <tr>    
    <td>children</td>    
    <td>List of child categories for this top-level category</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> id</span></td>    
    <td>ID of the child category</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> name</span></td>    
    <td>Name of the child category</td>  
  </tr>    
  <tr>    
    <td><span class="indent1"> description</span></td>    
    <td>Description of the child category (optional &ndash; when requested in front matter)</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> url</span></td>    
    <td>URL of the child category</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> count</span></td>    
    <td>Number of products in this child category</td> 
  </tr>
</table>

---

## Faceted Search

<b>Description:</b> Faceted-search object for searching globally, by category, or by brand

<b>Handlebars Expression:</b> `{{faceted_search}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>facets</td>
    <td>List of all search facets available</td>
  </tr>
  <tr>
		<td><b>selected</b></td>
		<td>Container for the selected search facets (selected facets contain properties below</i>)</td>
  </tr>
  <tr>
	<td><span class="indent1">remove_all_url</span></td>
    <td>URL to remove all selected search restrictions</td>
  </tr>
  <tr>
    <td><span class="indent1">items</span></td>
    <td>Currently enabled search facets</td>
  </tr>
</table>

---

## Featured Products

<b>Description:</b> Renders a list of all the featured products for the BigCommerce storefront.

<b>Handlebars Expression:</b> `{{products.featured}}`

<b>Object Properties:</b> References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

<b> Usage Example: </b>

The code example below displays the global `{{products.featured}}` object on the `cornerstone/templates/pages/home.html` page template from [Stencil's base Cornerstone theme](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L5) (Github).

First, you must declare the object using Front Matter. To declare the object, the following front matter must be placed at the top of the template HTML page. This following declaration also limits the number of featured products to be displayed:

```
---
products:
    [...]
    featured:
        limit: {{theme_settings.homepage_featured_products_count}} //limits the number of featured products to be displayed
---
```

The `homepage_featured_products_count` limit is one of two relevant variables defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L45) (Github).

```
"settings": {
    [...]
    "homepage_featured_products_count": 8,
    [...]
    "homepage_featured_products_column_count": 4,
    [...]    
```


In the body of [Cornerstone's `home.html` template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L27) (Github), the below Handlebars conditional statement is responsible for displaying the `{{products.featured}}` object. This is the object that we declared above using front matter.

```
{{#if products.featured}}
		{{> components/products/featured products=products.featured 
    columns=theme_settings.homepage_featured_products_column_count}}
{{/if}}
```

This above statement formats the _Featured Products_ display according to the `homepage_featured_products_column_count` variable, which is the second relevant variable defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L53) (Github).

---

## Footer

<b>Description:</b>The footer content for each storefront page

<b>Handlebars Expression:</b> `{{footer}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>sitemap_url</td>
    <td>The URL to the sitemap, based on store’s SEO setting</td>
  </tr>
  <tr>
    <td>scripts</td>
    <td>Scripts to be loaded after the HTML has loaded; includes performance metrics</td>
  </tr>
</table>

---

## HTML Head

<b>Description:</b> Data to be included in the HTML `<head>` element<br>

<b>Handlebars Expression:</b>`{{head}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>character_set</td>
    <td>The character set to specify</td>
  </tr>
  <tr>
    <td>meta_tags</td>
    <td>Meta tags to improve store SEO</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Current page’s title</td>
  </tr>
  <tr>
    <td>stylesheets</td>
    <td>CSS files to be included</td>
  </tr>
  <tr>
    <td>scripts</td>
    <td>Scripts to be loaded in the &lt;head&gt; tag</td>
  </tr>
  <tr>
    <td>favicon</td>
    <td>The store’s favicon (Favorite icon)</td>
  </tr>
  <tr>
    <td>rsslinks</td>
    <td>RSS feeds to improve SEO</td>
  </tr>
</table>

---

## Is_Ajax

<b>Description:</b> Boolean; returns `true` if the current executing request is an Ajax request

<b>Handlebars Expression:</b> `{{is_ajax}}`

No properties available for this object.

---

## Login

<b>Description: </b>Object to handle customer login details<br>

<b>Handlebars Expression:</b> `{{forms.login}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>came_from_checkout</td>
    <td>Boolean indicating whether the customer submitted login information at checkout</td>
  </tr>
  <tr>
    <td>error</td>
    <td>BC-defined message to display when customer’s login fails</td>
  </tr>
</table>

---

## New Products 

**Description:** A list of new products for the BigCommerce storefront

**Handlebars Expression:**`{{products.new}}`

**Object Properties:** References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

**Usage Example:**

To access the global `{{products.new}}` object on your page, you must first use front matter to declare the object at the top of your page template. 

The code example below declares the global `{{products.new}}` object on the `cornerstone/templates/pages/home.html` page template from [Stencil's base Cornerstone Theme](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L3) (Github).

```
---
products:
    new:
        limit: {{theme_settings.homepage_new_products_count}}
---
```

The `homepage_featured_products_count` limit is one of two relevant variables defined in Cornerstone's `config.json` file (Github).

```
"settings": {
    "homepage_new_products_count": 5,
    [...]
    "homepage_new_products_column_count": 4,
    [...]
```

In the body of [Cornerstone's `home.html` template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L36) (Github), the below Handlebars conditional statement is responsible for displaying the `{{products.featured}}` object. This is the object that we declared above using front matter.

```
{{#if products.new}}
  {{> components/products/new products=products.new 	
 	columns=theme_settings.homepage_new_products_column_count}}
{{/if}}
```

This above statement formats the _New Products_ display according to the `homepage_new_products_column_count` variable, which is the second relevant variable defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L46) (Github

---

## Page Content

<b>Description:</b> Defines elements of merchant’s store page

<b>Handlebars Expression:</b> `{{page}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Page title, to be used as the HTML <code>title</code> tag</td>
  </tr>
  <tr>
    <td>description</td>
    <td>Description for the page, to be used as the HTML <code>meta &gt; description</code> tag</td>
  </tr>
  <tr>
    <td>content</td>
    <td>HTML content of the page</td>
  </tr>
  <tr>
    <td>sub_pages</td>
    <td>Array of child pages</td>
  </tr>
  <tr>
    <td><span class="indent1">title</span></td>
    <td>Title of this child page</td>
  </tr>
  <tr>
    <td><span class="indent1">url</span></td>
    <td>URL of this child page</td>
  </tr>
</table>

---

## Pages

<b>Description:</b> A list of all web content pages for the BigCommerce storefront

<b>Handlebars Expression:</b> `{{pages}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th> 
	</tr> 
    <tr>
      <td>name</td>
      <td>Name of the page</td>
    </tr> 
    <tr>
      <td>url</td>
      <td>URL of the page</td>
    </tr>
    <tr>
      <td>children</td>
      <td>List of child pages for this page</td>
    </tr>
    <tr>
      <td><span class="indent1"> name</span></td>
      <td>Name of the child page</td>
    </tr>
    <tr>
      <td><span class="indent1"> url</span></td>
      <td>URL of the child page</td>
    </tr>
</table>

---

## Page Type Property

<b>Description:</b> A string representing the type of page currently displayed. <br>

<b>Handlebars Expression:</b> `{{page_type}}`

<b>Values:</b> The four most-commonly-used values for `{{page_type}}` are:

* default (for a home page)
* product (for a product page)
* category (for a category page)
* page (for a Web [static] page)

All possible values for `{{page_type}}` are:

| account | shippingaddressform | account_new_return | 
|---|---|---|
| account_addressbook | account_downloaditem | account_inbox | 
| editaccount | account_orderstatus | account_orders | 
| invoice_print | account_order | account_recentitems | 
| account_saved_return | account_returns | wishlists | 
| add-wishlist | wishlist | createaccount_thanks | 
| createaccount | forgotpassword | login | 
| getnewpassword | blog | blog_post | 
| brand | brands | cart | 
| category | compare | 403 | 
| 404 | error | giftcertificates_balance | 
| giftcertificates | giftcertificates_redeem | default | 
| page | page_contact_form | product | 
| rss | search | sitemap | 
| newsletter_subscribe | unsubscribe | hibernation | 
| maintenance |

---

## Pagination

<b>Description:</b> Defines pagination of storefront pages

<b>Handlebars Expression:</b> `{{pagination}}`

<b>Object Properties:</b>

<table>
    <tr>   
      <th>Property</th>   
      <th>Description</th> 
    </tr> 
    <tr>   
      <td>next</td>   
      <td>Link to next page, if any</td> 
    </tr> 
    <tr>   
      <td>previous</td>   
      <td>Link to previous page, if any</td> 
    </tr> 
    <tr>   
      <td>sort</td>   
      <td>Field to sort by</td> 
    </tr> 
    <tr>   
      <td>current</td>   
      <td>Number representing which page (in the current collection) the customer is viewing</td> 
    </tr> 
      <tr>   
        <td>total</td>   
        <td>Total number of results, across all pages</td> 
      </tr> 
        <tr>   
          <td>links</td>   
          <td>Array of pages that surround the current page; displayed as a set of links, dynamically sized based on the current page number</td> 
        </tr> 
        <tr>   
          <td><span class="indent1">url</span></td>   
          <td>URL to this page of results</td> 
        </tr> 
        <tr>   
          <td><span class="indent1">number</span></td>   
          <td>The page number of this link, based on an index starting at 1</td> 
      </tr>
    </table>
---

## Search

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
	
---
	
## Settings
	
**Description:** Common settings shared across every BigCommerce storefront

**Handlebars Expression:** `{{settings}}`

**Object Properties:**

| Property | Description |
| --- | --- |
| account_creation_enabled | Site-wide boolean value that indicates whether to allow customers to create accounts |
| show_product_rating | Site-wide boolean value that indicates whether to display product ratings (in numeric or star format) to visitors |
| show_product_reviews | Site-wide boolean value that indicates whether to display full-text product reviews to visitors |
| show_newsletter_box | Site-wide boolean value that indicates whether to display a mailing-list invite to visitors |
|  gift_certificates_enabled | Site-wide boolean value that indicates whether to enable the gift certificate system for this store |
|  blog_enabled | Site-wide boolean value that indicates whether the blog is visible for this store |
|  data_tag_enabled | Site-wide boolean that indicates whether GAEE is enabled in a theme. For {{settings.data_tag_enabled}} to be true, the enhanced_ecommerce key must be present in config.json and a GAEE experiment must be enabled along with GA property value set in Advanced Settings > Analytics > GA in the BigCommerce Control Panel |
| show_wishlist | Site-wide boolean value that indicates whether to allow customers to create wishlists |
| base_url | The normal shop URL |
| client_ip_address | IP address of the customer browsing the store |
|country_code|The country code corresponding to the IP|
|request|object that contaisn details about the HTTP request|
| &#x21B3; referer|refer of the request|
| &#x21B3; host|hostname of the request|
| &#x21B3; user_agent|user agent string of the request|
| &#x21B3; is_crawler|renders "true" if user angent is known crawler; "false" otherwise
| &#x21B3; absolute_path|The absolute URL requested. **Never** use request.path in the actual body of the page<sup>1</sup>
| secure_base_url | The SSL-enabled, secure, shop URL |
| address | Store’s complete physical address, as entered by merchant in the [Store Profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings)|
| store_name | Name of the BigCommerce store |
| store_logo | The store’s logo |
| &#x21B3; title | Title for the logo – the text configured in the control panel under Storefront Design Design Options Logo |
| &#x21B3; image | Optional image file, as a Stencil image object. To access the store_logo use: `{{settings.store_logo.image.data}}` and `{{settings.store_logo.image.alt}}` to access the alt tag. These are pulled from the Stencil image object. |
| privacy_cookie | If enabled, a string containing merchant-customizable text for (European Union–required) cookie-setting notification; if disabled, a boolean with a value of false |
| urls | Global URLs that the template can access – for example, the template could link to the cart page using {{urls.cart}} |
| &#x21B3; home | Store’s home page |
| &#x21B3; account | Collection of (customer and storefront) account-related URLs:|
| &nbsp; &nbsp; &#x21B3; index | Account index page `/account.php` |
| &nbsp; &nbsp; &#x21B3; orders | Collection of orders-related URLs: |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; all | List of all orders. `/account.php?action=order_status` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; completed | URL to view completed orders `/account.php?action=view_orders` |
|  &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; save_new_return | URL to submit a New Return form<. `/account.php?action=save_new_return` |
| &nbsp; &nbsp; &#x21B3; update_action | URL to submit an Edit Account form. `/account.php?action=update_account` |
| &nbsp; &nbsp; &#x21B3; returns | List of returns. `/account.php?action=view_returns` |
|  &nbsp; &nbsp; &#x21B3; addresses | List of addresses; default sorting is by address id, from lowest to highest. `/account.php?action=address_book` |
| &nbsp; &nbsp; &#x21B3; inbox | List of messages in customer’s inbox. `/account.php?action=inbox` |
| &nbsp; &nbsp; &#x21B3; send_message | URL to submit a message to the merchant. `/account.php?action=send_message` |
| &nbsp; &nbsp; &#x21B3; add_address | Link to add shipping address form. `/account.php?action=add_shipping_address` |
| &nbsp; &nbsp; &#x21B3; wishlists | Collection of wishlist-related URLs: |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; add | URL to the Add Wishlist form `/wishlist.php?action=addwishlist` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; edit | URL to the Edit Wishlist form `/wishlist.php?action=editwishlist` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; delete | URL to delete a wishlist `/wishlist.php?action=deletewishlist` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; all | URL to view all wishlists `/wishlist.php` |
| &nbsp; &nbsp; &#x21B3; details | URL to the Edit Account form `/account.php?action=account_details` |
| &nbsp; &nbsp; &#x21B3; recent_items | URL to a list of recently viewed items `/account.php?action=recent_items` |
| &#x21B3; brands | URL to view all brands; default sorting is by brand id, from lowest to highest |
| &#x21B3; gift_certificate | Collection of gift-certificate–related URLs: |
| &nbsp; &nbsp; &#x21B3; purchase | URL to a form for purchasing a gift certificate `/giftcertificates.php` |
| &nbsp; &nbsp; &#x21B3; redeem | URL to view redemption information `/giftcertificates.php?action=redeem` |
| &nbsp; &nbsp; &#x21B3; balance | URL to check the balance of a gift certificate `/giftcertificates.php?action=balance` |
| &#x21B3; auth | Collection of authorization-related URLs: |
| &nbsp; &nbsp; &#x21B3; login | URL to the login form `/login.php` |
| &nbsp; &nbsp; &#x21B3; check_login | URL to which to submit the login form `/login.php?action=check_login` |
| &nbsp; &nbsp; &#x21B3; create_account | URL to the Create Account form page `/login.php?action=create_account` |
| &nbsp; &nbsp; &#x21B3; save_new_account | URL to which to submit the Create Account form< `/login.php?action=save_new_account` |
| &nbsp; &nbsp; &#x21B3; forgot_password | URL to the Forgot Password form `/login.php?action=reset_password` |
| &nbsp; &nbsp; &#x21B3; send_password_email | Submission URL for the Forgot Password form `/login.php?action=send_password_email` |
| &nbsp; &nbsp; &#x21B3; save_new_password | Submission URL for saving a new password `/login.php?action=save_new_password` |
| &nbsp; &nbsp; &#x21B3; logout | URL for customer to log out of their account `/login.php?action=logout` |
| &#x21B3; product | Collection of product-related URLs |
| &nbsp; &nbsp; &#x21B3; post_review | URL to submit a Write Review form `/postreview.php`  |
| &#x21B3; cart | URL to the cart page `/cart.php` |
| &#x21B3; checkout  | Collection of checkout related URLs |
| &nbsp; &nbsp; &#x21B3; single_address  | URL for the customer to check out with a single shipping address `/checkout.php` |
| &nbsp; &nbsp; &#x21B3; multiple_address  | URL for the customer to check out with multiple shipping addresses `/checkout.php?action=multiple` |
| &#x21B3; rss | Collection of RSS-related URLs: |
| &nbsp; &nbsp; &#x21B3; products | Collection of product-feed–related URLs: |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; new| RSS feed of new products `/rss.php?type=rss` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; new_atom | RSS feed of new products, in Atom format `/rss.php?type=atom` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; popular | RSS feed of popular products `/rss.php?action=popularproducts&type=rss` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; popular_atom | RSS feed of popular products, in Atom format `/rss.php?action=popularproducts&type=atom` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; featured | RSS feed of featured products `/rss.php?action=featuredproducts&type=rss';` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; featured_atom | RSS feed of featured products, in Atom format `/rss.php?action=featuredproducts&type=atom` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; search | RSS feed of products matching the active search query |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; search_atom | RSS feed of products matching the active search query, in Atom format |
| &nbsp; &nbsp; &#x21B3; blog | RSS feed of recent blog posts `/rss.php?action=newblogs&type=rss` |
| &nbsp; &nbsp; &#x21B3; blog_atom | RSS feed of recent blog posts, in Atom format `/rss.php?action=newblogs&type=atom` |
| &#x21B3; contact_us_submit | URL to submit the Contact Us form `/pages.php?action=sendContactForm`|
| &#x21B3; search | URL to submit a search request `/search.php` |
| &#x21B3; compare | A string String containing the URL to the products comparison page `/compare` |
| &#x21B3; sitemap | URL to the sitemap `/sitemap.php` |
| &#x21B3; subscribe | Collection of subscription-related URLs |
| &nbsp; &nbsp; &#x21B3; action | URL to which the the newsletter subscription will be submitted `/subscribe.php` |
| money | List of child items that define the store’s default currency formatting |
| &#x21B3; currency_token | Symbol for the currency |
| &#x21B3; currency_location | Whether currency symbol appears at left or right of the quantity |
| &#x21B3; decimal_token | Symbol for decimal separator |
| &#x21B3; decimal_places | Number of decimal places to display |
| &#x21B3; thousands_token | Symbol for thousands separator |
| returns_enabled | Boolean that indicates whether the control-panel setting for the returns system is enabled |
| tax_label | Defines the Tax Label (VAT, Sales Tax, etc.) that a merchant can set in the control panel’s Settings > Tax page for display to customers |
| add_this | Object that defines links for the AddThis social sharing component |
| &#x21B3; buttons | Array of buttons to display for AddThis social sharing `{{#each settings.add_this.buttons}}{{service}}{{/each}}` `{{#each settings.add_this.buttons}}{{annotations}}{{/each}}` |
| service | String containing the name of this button's social-media service (facebook, email, print, twitter, linkedin, google, etc.) |
| annotation | String containing HTML attributes associated with this button |
| maintenance | Object that manages information about the store when in maintenance (offline) mode |
| header | If store is in maintenance mode, string containing header text for the "Down for Maintenance" window displayed to visitors; otherwise, null |
| message | If store is in maintenance mode, string containing merchant-customizable body text (and optionally, HTML) for the "Down for Maintenance" window displayed to visitors; otherwise, null |
| notice | If store is in maintenance mode, one of three strings identifying the store's status, and generating a corresponding text notice to merchants about how to proceed: AdminPrelaunchNotice for preview stores, AdminMaintenanceNotice for active stores taken down for maintenance, or AdminHibernationModeNotice for deactivated stores; otherwise, null |
| phone_number | The contact phone number for the store located in the [stores profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings).  |
| rss_item_limit | An integer that sets a limit on the number of RSS items to display |
| password_requirements | Collection of properties representing BigCommerce requirements for customer-account passwords: |
| alpha | Regular expression representing required/acceptable alphabetic characters |
| numeric | Regular expression representing required/acceptable numeric characters |
| minlength | Integer representing minimum acceptable password length |
| error | String that passes a standard error message for noncompliant passwords |
| measurements | Collection of units-of-measure definitions, to be used when displaying product details: |
| &#x21B3; length | Units of measure for product length |
| &#x21B3; weight | Units of measure for product weight |
| Time and date settings | The four settings below are configured in the control panel under **Store Setup > Store Settings > Language and Date > Date Settings** . Date formats follow php conventions. |
| store_time_zone | Store's time zone, as selected in the control panel's Your Timezone drop-down list |
| store_dst_correction | Whether or not this time zone observes Daylight Saving Time (boolean), as set by the control panel's Enable DST Correction check box |
| display_date_format | Brief display format/pattern for dates, as configured in the control panel's Display Date Format field |
| extended_display_date_format | Extended display format/pattern for dates, as configured in the control panel's Extended Display Date Format field |
| show_payment_methods | A boolean value. If true available payment methods on a store will be shown. If false they are hidden.  |
| as payments_url| Exposes the BigCommerce payments URL. `https://payments.bigcommerce.com`|
| secure_host | Returns the SSL url for a store. Example: `https://www.bigcommerce.com` |
| store_hash | Returns the store hash as a string.  |
|  is_eu_ip_address| A boolean value. Return true if the shoppers ip address is in the EU. |
| show_newsletter_box | Returns `1` if customers to allowed to subscribe to the [store newsletter](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter). Returns `0` if customers are not able to subscribe. |
| show_newsletter_summary | Returns a `1` if the [newsletter summary](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter) is shown. Returns `0` if it is now shown. If `show_newsletter_box` is `0` then `show_newsletter_summary` will also be `0`. |
| newsletter_summary | Returns the [newsletter summary](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter) |
| amp_analytics_id | Returns Google AMP analytics ID |
| bulk_discount_enabled | Boolean that return `true` if bulk discount is enabled on products. |

---

## Sitemap
	
	<b>Description:</b>A list of all sitemap properties for this BigCommerce storefront: pages, categories, and brands.<br>

<b>Handlebars Expression:</b> `{{sitemap}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>subsection_url</td>
    <td>URL to subsection content (pages, categories, brands) of the sitemap</td>
  </tr>
  <tr>
    <td>label</td>
    <td>Subsection title (pages, categories, brands)</td>
  </tr>
  <tr>
    <td>body</td>
    <td>List of all sitemap subsections</td>
  </tr>
  <tr>
    <td><span class="indent1"> url</span></td><td>URL to the page, category, or brand</td>
  </tr>
  <tr>
      <td><span class="indent1"> label</span></td>
      <td>Label of the page, category, or brand</td>
    </tr>
    <tr>
      <td><span class="indent1"> children </span></td>
      <td>Nested list of children within pages or categories; will be null for brands</td>
    </tr>
    <tr>
      <td><span class="indent2">url</span></td>
      <td>URL to the child page or category</td>
    </tr>
    <tr>
      <td><span class="indent2">label</span></td>
      <td>Label for the child page or category</td>
    </tr>
  </table>
	
---

## Social Links
	
<b>Description:</b> Array of all social-media site links for the storefront<br>

<b>Handlebars Expression:</b> `{{social_media}}`

<b>Object Properties:</b><br><br>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Internal name of this social-media platform (e.g., "googleplus")</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL to point to, set by merchant in control panel (https://www.facebook.com/BigCommerce, etc.)</td>
  </tr>
  <tr>
    <td>position</td>
    <td>Display sort order for this platform within the social-media list</td>
  </tr>
  <tr>
    <td>display_name</td>
    <td>Displayed/formatted name of this social-media platform (e.g., “Google+”) </td>
  </tr>
</table>
	
---
	
## Template Property
	
<b>Description:</b> A string containing the name of the root template currently being rendered in the page context. <br>

<b>Handlebars Expression:</b> `{{template}}`

<b>Values:</b> Values will reflect each theme's specific directory structure. Possible values include:

* `pages/home`
* `pages/brand` (for brand pages)
* `pages/brands`
* `pages/cart`
* `pages/category` (for category pages)
* `pages/contact-us`
* `pages/page` (for Web [static] pages)
* `pages/product` (for product pages)
* `pages/errors/404`
* `pages/auth/login`
* `pages/custom/product/<some_page_name>` (for a custom product page)
(etc.)

---
	
## Top Sellers

<b>Description:</b> Object to display a sidebar of top-selling products<br>

<b>Handlebars Expression:</b> `{{products.top_sellers}}`

<b>Object Properties:</b> References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model"> product card model </a>

<b>Usage Example:</b>

To access the global`{{products.top_sellers}}` object on your page, you must first use [front matter](/stencil-docs/front-matter/front-matter-attributes-reference) to declare the object at the top of your page template. For example, you would place this front-matter declaration at the top of your template file:

```
---
products:
    top_sellers:
---
```
	

