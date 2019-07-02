<h1>Anatomy of a Theme</h1>
<div class="otp" id="no-index">
	<h3>On This Page</h3>
	<ul>
		<li><a href="#directory-structure">Directory Structure</a></li>
		<li><a href="#blueprint-images">Images</a></li>
		<li><a href="#blueprint-layouts">Layouts</a></li>
    <li><a href="#blueprint-panels">Panels</a></li>
    <li><a href="#blueprint-snippets">Snippets</a></li>
    <li><a href="#blueprint-styles">Styles</a></li>
		</ul>
</div>

Themes are built using a powerful template system that enables designers and developers familiar with CSS and HTML to modify the presentation and structure of a BigCommerce store.



<a href='#directory-structure' aria-hidden='true' class='block-anchor'  id='directory-structure'><i aria-hidden='true' class='linkify icon'></i></a>

## Directory Structure

Theme files that apply to a store design are organized in several different directories, as follows:

*   **Images**
*   **Panels**
*   **Snippets**
*   **Styles**




<a href='#blueprint-images' aria-hidden='true' class='block-anchor'  id='blueprint-images'><i aria-hidden='true' class='linkify icon'></i></a>

## Images

Theme specific static images (referenced from CSS, or in image tags).



<a href='#blueprint-layouts' aria-hidden='true' class='block-anchor'  id='blueprint-layouts'><i aria-hidden='true' class='linkify icon'></i></a>

## Layouts

Layout templates provide the base HTML structure that wraps storefront page content. Each layout file corresponds to a specific page.

For example, `product.html` refers to the page that’s shown when a customer is viewing the details of a product.

Most layout files contain nothing more than references to individual panels to be shown on a page. These panels are contained in div tags that generally define left, center, or right columns of the page.



<a href='#blueprint-panels' aria-hidden='true' class='block-anchor'  id='blueprint-panels'><i aria-hidden='true' class='linkify icon'></i></a>

## Panels

Panels provide reusable blocks or dynamic sections of content.

For example, the `SideCategoryList` panel builds a list of categories to be shown throughout the store.

Panels are generally referenced directly from layout templates. They define which content should be shown on a particular page and handle the generation of that specific content.

Some panels contain strictly static content (such as the store name) whilst others generate content dynamically. Dynamically generated panels cannot be created ad-hoc as they are linked to specific data and logic within the application.



<a href='#blueprint-snippets' aria-hidden='true' class='block-anchor'  id='blueprint-snippets'><i aria-hidden='true' class='linkify icon'></i></a>

## Snippets

Snippets are templates containing a fragment of HTML that can be embedded multiple times in a page, either from direct references or from being part of a loop that iterates over the items in a list.

For example, the `HomeFeaturedProductsItem` snippet renders each individual product listed in the `HomeFeaturedProducts` panel.



<a href='#blueprint-styles' aria-hidden='true' class='block-anchor'  id='blueprint-styles'><i aria-hidden='true' class='linkify icon'></i></a>

## Styles

Primary layout stylesheets for the Theme, with `styles.css` being the core file.

