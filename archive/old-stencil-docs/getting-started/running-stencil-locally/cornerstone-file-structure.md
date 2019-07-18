<h1>Cornerstone File Structure</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#cornerstone_templates-pages">templates/pages</a></li>
    <li><a href="#cornerstone_templates-components">templates/components</a></li>
    <li><a href="#cornerstone_templates-layouts">templates/layouts</a></li>
    <li><a href="#cornerstone_assets">assets/</a></li>
    <li><a href="#cornerstone_lang">lang/</a></li>
	</ul>
</div>

Cornerstone is the base Stencil theme, and serves as the default theme for all newly initialized local storefronts. Cornerstone provides the standard file structure, base design pattern, and default file assets necessary to start developing a custom storefront experience.

The Cornerstone file structure consists of four main subdirectories, which are detailed below.

---

<a href='#cornerstone_templates-pages' aria-hidden='true' class='block-anchor'  id='cornerstone_templates-pages'><i aria-hidden='true' class='linkify icon'></i></a>

## template/pages
<span class="fp">templates/pages</span> contains all the base template pages used in a BigCommerce Stencil storefront. The pages are grouped by page category.  For details, see [Pages Subdirectory](/stencil-docs/template-files/templates-directory/pages-subdirectory).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Prevent Rendering Errors 
> In order to prevent any rendering errors, avoid changing the html file names in the <span class="fp">template/pages</span> directory.

</div>
</div>
</div>

---

<a href='#cornerstone_templates-components' aria-hidden='true' class='block-anchor'  id='cornerstone_templates-components'><i aria-hidden='true' class='linkify icon'></i></a>

## template/components
The <span class="fp">templates/components</span> directory consists of code snippets and partials that can be reused throughout your theme. This components directory is grouped by component type. For details, see [Components Subdirectory](/stencil-docs/template-files/templates-directory/components-subdirectory).

---

<a href='#cornerstone_templates-layouts' aria-hidden='true' class='block-anchor'  id='cornerstone_templates-layouts'><i aria-hidden='true' class='linkify icon'></i></a>

## template/layout
The <span class="fp">templates/layout</span> directory defines the overall structure (header, footer, etc.) for your storefront. Within this directory, you can create multiple layouts for different use cases, making it easy to switch between different variations for the same theme. For details, see [Layout Subdirectory](/stencil-docs/template-files/templates-directory/layout-subdirectory).

---

<a href='#cornerstone_assets' aria-hidden='true' class='block-anchor'  id='cornerstone_assets'><i aria-hidden='true' class='linkify icon'></i></a>

## assets/
<span class="fp">assets/</span> (images, CSS and JavaScript files) will be located in this directory. For details, see [Assets Directory](/stencil-docs/css-and-design-assets/assets-directory).

---

<a href='#cornerstone_lang' aria-hidden='true' class='block-anchor'  id='cornerstone_lang'><i aria-hidden='true' class='linkify icon'></i></a>

## lang/
<span class="fp">lang/</span> contains translation files, including the required <span class="fn">en.json</span>. For details, see [Internationalization/Localization](/stencil-docs/internationalization-and-localization/localizing-stores)

When developing in your local environment, all files that you change in your Stencil theme directory (<span class="fp">/cornerstone/</span> in our default installation) will be reflected immediately at `http://localhost:3000`.


---

## Resources
### Related Articles
* [Pages Subdirectory](/stencil-docs/template-files/templates-directory/pages-subdirectory)
* [Components Subdirectory](/stencil-docs/template-files/templates-directory/components-subdirectory)
* [Layout Subdirectory](/stencil-docs/template-files/templates-directory/layout-subdirectory)
* [Assets Directory](/stencil-docs/css-and-design-assets/assets-directory)
* [Localizing Stores](/stencil-docs/internationalization-and-localization/localizing-stores)

