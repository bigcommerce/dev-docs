<h1>Pages Subdirectory</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#pages_pages-subdirectory">Pages Subdirectory</a></li>
    <li><a href="#pages_naming-requirements">Naming Requirements</a></li>
	</ul>
</div>

<a href='#pages_pages-subdirectory' aria-hidden='true' class='block-anchor'  id='pages_pages-subdirectory'><i aria-hidden='true' class='linkify icon'></i></a>

## Pages Subdirectory

The <span class="fp">/templates/pages/</span> subdirectory contains the complete set of base template pages used to construct a BigCommerce online store. These pages call resources from the <span class="fp">/templates/components/</span> and <span class="fp">/templates/layout/</span> subdirectories.

Children of the [pages subdirectory](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages) group together pages that serve a particular **storefront function**. For example, you can view contents of the [/errors/](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages/errors) and [/gift-certificate/](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages/gift-certificate) subdirectories.

The subdirectory’s [.html files](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages) are single-purpose pages.

---

<a href='#pages_naming-requirements' aria-hidden='true' class='block-anchor'  id='pages_naming-requirements'><i aria-hidden='true' class='linkify icon'></i></a>

## Naming Requirements

Do not change the names of the <span class="fp">/templates/pages/</span> subdirectory or its contained files. These default names are required for the storefront to compile properly. You can, however, edit pages’ front‑matter and Handlebars resources to customize the storefront theme’s look and function.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

###  Front-Matter Restriction
> Pages in the <span class="fp">/templates/pages/</span> subdirectory are the **only** place you can insert and modify
YAML front-matter attributes to customize the rendered storefront.

</div>
</div>
</div>

---

## Resources

* [Cornerstone Pages Subdirectory](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages)

