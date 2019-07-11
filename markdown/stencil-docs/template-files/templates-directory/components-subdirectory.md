<h1>Components Subdirectory</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#components_components-subdirectory">Components Subdirectory</a></li>
    <li><a href="#components_naming-requirements">Naming Requirements</a></li>
	</ul>
</div>

<a href='#components_components-subdirectory' aria-hidden='true' class='block-anchor'  id='components_components-subdirectory'><i aria-hidden='true' class='linkify icon'></i></a>

## Components Subdirectory

The <span class="fp">/templates/components/</span> subdirectory contains Handlebars and HTML components (provided as <span class="fn">.html</span> files) to create page structure. You can reuse these code snippets and partials throughout your theme.

You can take a look at the Cornerstone components subdirectory and its contents in the [Github repository here](https://github.com/bigcommerce/cornerstone/tree/master/templates/components).

Subdirectories of <span class="fp">/templates/components/</span> group together pages that serve a particular storefront function. For example, [here](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/search) are the <span class="fn">.html</span> files contained in the <span class="fp">/search/</span> subdirectory.

Furthermore, the <a href="https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common"><span class="fp">/common/</span> subdirectory</a> contains forms and icons resources, plus a collection of single-purpose files.

<a href='#components_naming-requirements' aria-hidden='true' class='block-anchor'  id='components_naming-requirements'><i aria-hidden='true' class='linkify icon'></i></a>

## Naming Requirements

Three children of the <span class="fp">/templates/components/</span> subdirectory each contain a set of templates whose file names must remain constant. However, you are free to move each set of template files to other path locations – as long as you keep each set together in one folder and specify the new location. Those folders are note below:

* [common/forms](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms)
* [common/faceted-search/facets](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/faceted-search/facets)
* [common/products/options](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/products/options)

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

###  Front-Matter Restrictions
> You can use front matter to specify resources only on pages in the `/templates/pages/` subdirectory, not on pages here in the `/templates/components/` subdirectory.

Please bear in mind that if a front-matter directive contains an invalid option, Stencil CLI will silently ignore that option.

</div>
</div>
</div>

---

## Resources
### Cornerstone GitHub Respository
* [common/forms](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms)
* [common/faceted-search/facets](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/faceted-search/facets)
* [common/products/options](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/products/options)

