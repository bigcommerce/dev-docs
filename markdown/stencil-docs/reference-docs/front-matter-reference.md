<h1>Front Matter Reference</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#front-matter-attributes-reference_global">Global Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_category">Category Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_blog">Blog Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_product">Product Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_brand">Brand Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_brand-list">Brand List Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_cart">Cart Attributes</a></li>
    <li><a href="#front-matter-attributes-reference_search">Search Attributes</a></li>
	</ul>
</div>









<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Front Matter Restrictions
> You can use front matter to specify attributes on the tops of pages in your
`<theme-name>/templates/pages/` subdirectory, but you **cannot** use front matter to accomplish this on pages in the following subdirectories:
 - `<theme-name>/templates/components/`
 - `<theme-name>/templates/layout/`
 - `<theme-name>/templates/pages/custom/` 
* Indent using **only** spaces. (YAML forbids tabs to avoid inconsistent encoding of tabs across platforms.) An indent of even one space indicates a child.
* Front matter on a given page cannot exceed 64 KB.
* If a front-matter directive contains an invalid option, Stencil CLI will silently ignore that option.


</div>
</div>
</div>

## Global Attributes

Global attributes are available on all pages.

<table>
  <tr>
    <th>Attribute</th>
    <th>Option with Sample Assignment</th>
    <th>Default Value</th>
    <th>Details and Other Allowable Values/Results</th>
  </tr>
  <tr>
    <td>customer:</td>
    <td></td>
    <td></td>
    <td>Customer attributes are always included, and are available if the active shopper is logged in.</td>
  </tr>

  <tr>
  	<td></td>
  	<td>addresses: true</td>
    <td>true – on address page null – on all other pages</td>
    <td>Boolean indicating whether to retrieve addresses for this customer. No filtering available. Default sorting is by address id, from lowest to highest. <b>null or false:</b> Do not retrieve addresses. <b>true</b>: Retrieve addresses.</td>
  </tr>
  
  <tr>
    <td></td>
    <td>returns: true</td>
    <td></b>true – on returns page; <b>null</b> – on all other pages</td>
    <td>Boolean indicating whether to retrieve product-return requests for this customer. No filtering available.<b>true</b>: Retrieve requests. <b>null</b> or <b>false</b>: Do not retrieve requests.</td>
  </tr>
  
  <tr>
    <td></td>
    <td>wishlists: <br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">null</td>
    <td class="">null: No wishlists displayed.
      <br><p></p>
      &lt;number&gt; limits the number of wishlists displayed.
      <br><p></p>
      If &lt;number&gt; is not defined, retrieves an unlimited number of wishlists.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">orders: <br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">null</td>
    <td class="">Contains all orders, complete or not.
      <br><p></p>
      null: no orders displayed.
      <br><p></p>
      &lt;number&gt; limits the number of orders displayed.
      <br><p></p>
      If &lt;number&gt; is not defined, displays 20 orders. (Default sorting is by order id, from lowest to highest.)</td>
  </tr>

  <tr>
    <td class=""></td>
    <td class="">recently_viewed_products:</td>
    <td class="">null</td>
    <td class="">Boolean indicating whether to display recently viewed products.<br><p></p>

No filtering available.</td>
  </tr>

  <tr>
    <td class="">products:</td>
    <td class=""></td>
    <td class=""></td>
    <td class="">(When filtering/limiting, products' default sorting is by order id, from lowest to highest.)</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">featured: <br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">null</td>
    <td class="">null: No featured products displayed.<br><p></p>
&lt;number&gt; limits the number of featured products displayed.
      <br><p></p>
      If &lt;number&gt; is not set, defaults to 4 products.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">new:<br>
      <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">
null</td>
    <td class="">null: No new products displayed.<br><p></p>
&lt;number&gt; limits the number of new products displayed. Maximum allowable value is 25.
      <br><p></p>
      If &lt;number&gt; is not defined, defaults to 8 products.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">top_sellers: <br>
      <span class="indent1">limit:  &lt;number&gt;</span></td>
    <td class="">null</td>
    <td class="">null: No top-selling products displayed.
      <br><p></p>
      &lt;number&gt; limits the number of top sellers displayed.
      <br><p></p>
      If &lt;number&gt; is not defined, defaults to all top sellers.</td>
  </tr>
  
  <tr>
    <td class="">carousel: true</td>
    <td class=""></td>
  <td class="">null</td>
    <td class="">Boolean indicating whether to display a carousel on storefront.
      <br><p></p>
      No filtering available.
      <br><p></p>
      null or false: No carousel display.</td>
  </tr>
  
  <tr>
    <td class="">blog:</td>
    <td class=""></td>
    <td class=""></td>
    <td class="">(Default sorting is by published_date, from most-recent to earliest.)</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">recent_posts:<br>
      <span class="indent1">limit: &lt;number&gt;</span>
    </td>
    <td class="">20</td>
    <td class="">null: No recent blog posts displayed.
      <br><p></p>      
      &lt;number&gt; limits the number of recent blog posts displayed.
      <br><p></p>      
      If &lt;number&gt; is not defined, defaults to the maximum of 20 blog posts.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">summary: &lt;number&gt;</td>
    <td class="">100</td>
    <td class=""><!-- null: No summary characters displayed.<br><p></p> -->      
      &lt;number&gt; sets the number of characters to display in each blog-post summary.
      <br><p></p>
      If &lt;number&gt; is not defined, displays 100 characters.</td>
  </tr>
  <tr>
    <td class="">cart: true</td>
    <td class=""></td>
    <td class="">false</td>
    <td class="">Boolean indicating whether to retrieve cart data.<br><p></p>
true: Return cart data.<br><p></p>
false: Do not return cart data.</td>
  </tr>
  
  <tr>
    <td>categories: true</td>
    <td></td>
    <td>false</td>
    <td>Boolean indicating whether to retrieve the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/global-objects/categories">category tree</a> during an AJAX request.
      <br><p></p>
      true: Retrieve the category tree.
      <br><p></p>
      false: Do not retrieve the category tree.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">description: true</td>
    <td class="">
false</td>
    <td class="">
Boolean indicating whether to retrieve category descriptions dynamically from the database.
      <br><p></p>
      Set to true for themes that must display category descriptions when pages render. (This can slow page loads.)</td>
  </tr>
    
  <tr>
    <td>shop_by_brand:</td>
    <td>limit: &lt;number&gt;</td>
    <td>null</td>
    <td>Typically used in a footer or sidebar.<br><p></p>
null: Do not display this brand list.<br><p></p>
&lt;number&gt; limits the number of brands to return.<br><p></p>
If &lt;number&gt; is not defined, returns 10 brands, ordered by the number of products per brand.</td>
  </tr>
</table>



## Category Attributes 

Category attributes are available in the context of a category.

<table>
  <tr>
    <th>Attribute</th>
    <th>Option with Sample Assignment</th>
    <th>Default Value</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>category:</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>

  <tr>
    <td></td>
    <td>shop_by_price:</td>
    <td>
false</td>
    <td>
Boolean indicating whether to display Shop-by-Price controls.</td>
  </tr>

  <tr>
    <td></td>
    <td>products:<br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td>
16</td>
    <td>
Defines the number of products displayed per page for this category. Range of possible values is 1&ndash;100 products.</td>
  </tr>
</table>


## Blog Attributes

Blog attributes are available in the context of a blog.

<table>
  <tr>
    <th>Attribute</th>
    <th>Sub-Attribute</th>
    <th>Option with Sample Assignment</th>
    <th>Default Value</th>
    <th>Details</th>
  </tr>
  
  <tr>
    <td class="">blog:</td>
    <td class=""></td>
    <td class=""></td>
    <td class=""></td>
    <td class=""></td>
  </tr>

  <tr>
    <td class=""></td>
    <td class="">posts:</td>
    <td class=""></td>
    <td class=""></td>
    <td class="">(Default sorting is by published_date, from most-recent to earliest.)</td>
  </tr>

  <tr>
    <td class=""></td>
    <td class=""></td>
    <td class="">limit: &lt;number&gt;</td>
    <td class="">null</td>
    <td class="">null: No blog posts displayed.<br><p></p>
      &lt;number&gt; limits the number of blog posts displayed.<br><p></p>
      Maximum is 20 blog posts per page.
    </td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class=""></td>
    <td class="">pages: &lt;number&gt;</td>
    <td class="">5</td>
    <td class=""><b>null:</b> No pagination. <b>&lt;number&gt;</b> sets the number of pages to display in pagination links. If <b>&lt;number&gt; is not defined</b>, defaults to 5 pages.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class=""></td>
    <td class="">summary: &lt;number&gt;</td>
    <td class="">250</td>
    <td class=""> <!-- null: No summary characters displayed.<br><p></p> -->  
      &lt;number&gt; sets the number of characters to display in each blog-post summary.<br><p></p>
If &lt;number&gt; is not defined, displays 250 characters.</td>
  </tr>
</table>

<a href='#front-matter-attributes-reference_product' aria-hidden='true' class='block-anchor'  id='front-matter-attributes-reference_product'><i aria-hidden='true' class='linkify icon'></i></a>


</table>

## Product Attributes 

Product attributes are available in the context of a product.

<table>
  <tr>
    <td>Attribute</td>
    <td>Option with Sample Assignment</td>
    <td>Default Value</td>
    <td>Details</td>
  </tr>
  <tr>
    <td class="">product:</td>
    <td class=""></td>
    <td class=""></td>
    <td class="">(When filtering/limiting, products' default sorting is by order id, from lowest to highest.)</td>
  </tr>

  <tr>
    <td class=""></td>
    <td class="">videos:<br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">
[unlimited]</td>
    <td class="">If <b>product.videos is not defined</b>, no videos are returned.
      <b>If product.videos is defined</b>, the default behavior is to return all videos. <b>If product.videos.limit is also defined</b>, &lt;number&gt; sets the maximum number of videos returned.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">images:<br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">
[unlimited]</td>
    <td class=""><b>If product.images is not defined</b>, no images are returned. <b>If product.images is defined</b>, you must also define product.images.limit, which throttles the number of images returned. The maximum allowable value for this option's &lt;number&gt; parameter is 5 images.</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">reviews: true<br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td>[false]</td>
    <td>Boolean indicating whether to display product reviews. <b>If product.reviews is present, and is not explicitly set to "false"</b>, reviews will appear. <b>If &lt;number&gt; is not defined</b>, defaults to 10 reviews (When filtering/limiting reviews, default sorting is by review id, from lowest to highest).</td>
  </tr>
  
  <tr>
    <td class=""></td>
    <td class="">related_products:<br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">
[unlimited]</td>
    <td class="">Displays products that are related by name. <b>&lt;number&gt;</b> limits the number of products displayed. <b>If &lt;limit&gt; is absent or undefined</b>, the default behavior is to display all related products. Inserting <b>“limit:”</b> with no integer will display 0 products.</td>
  </tr>
  
  <tr>
    <td></td>
    <td>similar_by_views:<br>
        <span class="indent1">limit: &lt;number&gt;</span></td>
    <td>[unlimited]</td>
    <td>Displays products similar to those displayed in the current page context. <b>&lt;number&gt;</b> limits the number of products displayed. <b>If &lt;limit&gt; is absent or undefined</b>, default is to display 4 products.
  </tr>
</table>

## Brand Attributes

Brand attributes are available in the context of a brand.<br><br>

<table>
  <tr>
    <td>Attribute</td>
    <td>Option with Sample Assignment</td>
    <td>Default Value</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>brand:</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>

  <tr>
    <td class=""></td>
    <td class="">products: <br>
      <span class="indent1">limit: &lt;number&gt;</span></td>
    <td class="">
50</td>
    <td class="">
Defines the number of products displayed per page for this brand. Range of possible values is 1&ndash;50 products.</td>
  </tr>
</table>

## Brand List Attributes

These attributes are available in the context of a list of brands.<br><br>

<table>
  <tr>
    <td>Attribute</td>
    <td>Option with Sample Assignment</td>
    <td>Default Value</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>brands:</td>
    <td></td>
    <td></td>
    <td>(When retrieving a collection of brands, default sorting is by brand id, from lowest to highest.)</td>
  </tr>

  <tr>
    <td class=""></td>
    <td class="">limit: &lt;number&gt;</td>
    <td class="">50</td>
    <td class="">
Sets the number of brands displayed in the list. If &lt;limit&gt; is not defined, returns all brands, up to a maximum of 50.</td>
  </tr>
</table>

## Cart Attributes 

Cart attributes are available in the context of a shopper's cart.

<table>
  <tr>
    <td>Attribute</td>
    <td>Sub-Attribute</td>
    <td>Option with Sample Assignment</td>
    <td>Default Value</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>cart</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>suggestions:</td>
    <td></td>
    <td></td>
    <td>Suggested products to display to shopper, based on cart contents. <NOBR>(If enabled,</nobr> these suggestions appear only immediately after the shopper adds an item to the cart.)</td>
  </tr>
  <tr>
    <td class=""></td>
    <td class=""></td>
    <td class="">limit: &lt;number&gt;</td>
    <td class="">null</td>
    <td class="">null: Do not display suggested products.<br><p></p>
&lt;number&gt; limits the number of suggested products to return.
If &lt;number&gt; is not defined, returns 4 suggested products.</td>
  </tr>
</table>

## Search Attributes 

Search attributes are available in the context of a search results page.

<table>
  <tr>
    <td>Attribute</td>
    <td>Sub-Attribute</td>
    <td>Option with Sample Assignment</td>
    <td>Default Value</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>search</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>product_results:</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>

  <tr>
    <td></td>
    <td></td>
    <td>limit: &lt;number&gt;</td>
    <td>16</td>
    <td>
Defines the number of product search results displayed per page. Range of possible values is 1&ndash;100 products.</td>
  </tr>
</table>

