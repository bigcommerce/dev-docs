<h1>Product Filtering Toolkit</h1>
<div class="otp" id="no-index">
	<h3>On This Page</h3>
	<ul>
		<li><a href="#creating-new-theme-product-filtering">Creating a New Theme With Product Filtering</a></li>
		<li><a href="#enabling-product-filtering-customized-theme">Enabling Product Filtering for Your Customized Theme</a></li>
		<li><a href="#implementing-product-filtering-your-theme">Implementing Product Filtering in Your Theme</a></li>
    <li><a href="#allowing-filtering-on-off">Allowing For Filtering On/Off</a></li>
    <li><a href="#category-filtering-details">Category Filtering Details</a></li>
		</ul>
</div>

Product filtering (also known as faceted search) enables shoppers to refine product searches based on multiple attributes like price, size, ratings, etc. For a store owner's view of administering this feature, please see <a href="https://forum.bigcommerce.com/s/article/Product-Filtering-Settings" target="_blank">this KB article</a>. 


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Requirements/Restrictions
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#creating-new-theme-product-filtering' aria-hidden='true' class='block-anchor'  id='creating-new-theme-product-filtering'><i aria-hidden='true' class='linkify icon'></i></a>

## Creating a New Theme with Product Filtering 

Product filtering is fully functional in the Blueprint base theme. Once you’ve enabled [Developer Mode](#blueprint-and-developer-mode), you’ll be able to access this base theme and add product filtering to your developer store.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Restricted/Grandfathered Access to Blueprint Base Theme
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#enabling-product-filtering-customized-theme' aria-hidden='true' class='block-anchor'  id='enabling-product-filtering-customized-theme'><i aria-hidden='true' class='linkify icon'></i></a>

## Enabling Product Filtering for Your Customized Theme 

To enable product filtering, just enable [Developer Mode](#devmode) on your store. This will enable product filtering on your store by default, regardless of whether or not your theme and plan support it.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Start with a Sandbox Store
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

If you are working with a new store, product filtering might already work out-of-the-box for your theme.





<a href='#implementing-product-filtering-your-theme' aria-hidden='true' class='block-anchor'  id='implementing-product-filtering-your-theme'><i aria-hidden='true' class='linkify icon'></i></a>

## Implementing Product Filtering in Your Theme 

Once you’ve enabled product filtering for your sandbox store, you’ll need to get the most up-to-date Blueprint files and copy them into your own theme. Here is how to do so.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

###  Restricted/Grandfathered Access to Blueprint Base Theme

> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

1.  Enable [Developer Mode](#devmode) in your sandbox store, if you haven’t already. This will enable the Blueprint theme and the faceted search feature.
2.  Unless you’re starting from scratch, back up your theme customizations.
3.  Select Blueprint as your store’s theme. 
4.  Download the Blueprint theme – don’t worry, you’ll only need certain files for faceted search.
5.  Restore your theme from the backups you downloaded in step 2.
6.  Upload the following files from Blueprint to your sandbox store:
   *   `Panels/FacetedSearch.html` – This panel contains the markup for your Faceted Search column. It calls all the panels for each of the searchable facets as well.
    *   `Panels/FacetedSearchProductGrid.html` - This panel contains the markup for your list of product results when your category lists are set to "grid view".
    *   `Panels/FacetedSearchProductList.html` - This panel contains the markup for your list of product results when your category lists are set to "list view".
    *   `Panels/FacetedSearchTemplateCategory.html` – The panel that contains the markup for the Category facet.
    *   `Panels/FacetedSearchTemplateMultichoice.html` – The panel that contains the markup for any facet containing multiple-choice check boxes.
    *   `Panels/FacetedSearchTemplateRange.html` – The panel that contains the markup for facets containing ranges.
    *   `Panels/FacetedSearchTemplateRating.html` – The panel that contains the markup for the Rating facet.
    *   `Panels/FacetedSearchTemplateShowing.html` – The panel that contains the markup for the list of currently selected filters.
    *   `Panels/FacetedSearchTemplateSingle.html` – The panel that contains the markup for any facet containing single-choice radio buttons.
    *   `Panels/Pagination.html` – The panel that contains the markup for your pagination – note that this will not use any existing pagination panels that your theme may have.
    *   `Styles/faceted-search.css` – This will be included in `FacetedSearch.html`, so you don’t need to add it to your `HTMLHead.html` file.

7.  Copy your `brands.html` page and name it `brands_with_facets.html`.
8.  Copy your `search.html` page and name it `search_with_facets.html`.
9.  Copy your `category.html` page and name it `category_with_facets.html`.
10.  Include the required assets on your new facets pages. You can use the facets pages from Blueprint for reference (the assets will be named the same):
   *   `%%Panel.FacetedSearch%%` – This is the main Faceted Search panel, and will call the rest of the panels it needs accordingly (including required JavaScript and CSS).
    *   Add the `js-faceted-search-column` class to the container of your Faceted Search panel.
    *   If you have a responsive theme, you can add the `Refine` button to your page, which toggles the Faceted Search column on or off. By default, this button displays only on mobile:<br>
    `<button class="js-faceted-search-action btn"> %%LNG_FilterBy%% </button>`
11.  If the pages mentioned above don’t exist, you can copy the existing pages from the Blueprint theme. Keep in mind that you’ll need to modify these pages to suit the structure of your theme.



<a href='#allowing-filtering-on-off' aria-hidden='true' class='block-anchor'  id='allowing-filtering-on-off'><i aria-hidden='true' class='linkify icon'></i></a>

## Allowing For Filtering On/Off 

When faceted search is switched on, the following templates will be used:

*   Brand pages > `brands_with_facets.html`
*   Search page > `search_with_facets.html`
*   Category pages > `category_with_facets.html`

When switched off:

*   Brand pages > `brands.html`
*   Search page > `search.html`
*   Category pages > `category.html`


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

###  Clone and Rename Templates, Don’t Alter Originals
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#category-filtering-details' aria-hidden='true' class='block-anchor'  id='category-filtering-details'><i aria-hidden='true' class='linkify icon'></i></a>

## Category Filtering Details 

When you turn on product filtering for a store, it will automatically switch all `Category Layout File`s to your new `category_with_facets.html` page. To view product filtering on Category pages, you must ensure that the `Category Layout File` is set to `category_with_facets.html`.

You will not see the Category filter on storefront Category pages. This has been hidden for SEO reasons.

