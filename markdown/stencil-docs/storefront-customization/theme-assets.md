<h1>Theme Assets</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#theme-assets_cornerstone-assets-directory">Cornerstone Assets Directory</a></li>
	</ul>
</div>

Each Stencil theme’s `/assets/` directory contains CSS, JavaScript, and image assets that help create the design of storefront pages. A minimal `/assets/` directory contains the files and subdirectories that you can view on the [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets). 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

> In parts of your theme's directory tree where you are free to add new subdirectories and files, be sure to:

* Set newly added directories to permission `755 (drwxr-xr-x)`.
* Set newly added files to permission `644 (rw-r--r--)`.
* Without these permissions, running your theme locally will fail, with multiple error messages. Bundling your theme will also fail, blocking its upload to a store.

</div>
</div>
</div>

<a href='#theme-assets_cornerstone-assets-directory' aria-hidden='true' class='block-anchor'  id='theme-assets_cornerstone-assets-directory'><i aria-hidden='true' class='linkify icon'></i></a>

## Cornerstone Assets Directory 

* Directory: `cornerstone/assets/`
<table>
  <tr>
  	<th>File Path</th>
    <th>Description</th>
  <tr>
    <td>cornerstone/assets/fonts</td>
    <td>The `/fonts/` subdirectory contains local versions of theme-specific fonts.</td>
  <tr>
  <tr>
    <td>cornerstone/assets/icons</td>
    <td>The `/icons/` subdirectory contains .svg files for icons used within a theme.</td>
  <tr>
  <tr>
    <td>cornerstone/assets/img</td>
    <td>The `/img/` subdirectory contains images used in the theme’s display – background images, sprites, and other images not related to store content. You would typically reference these image assets using Stencil's cdn Handlebars helper. For example, generically: <<code>img src="{{cdn 'assets/img/image.jpg'}}"</code>> Or, with a realistic file name: <<code>img src="{{cdn 'assets/img/size-chart.png'}}"</code>>. <br><br>To avoid unexpected 404 errors on your production store, we recommend that you use short relative paths in your SCSS to reference images in your `/img/` subdirectory. So, for example, use references of the form:
`background: url('../img/header-bg.png');` rather than references of the form:
`background: url('/assets/img/header-bg.png');`</td>
  </tr>
  <tr>
    <td>cornerstone/assets/js</td>
    <td>The /js/ subdirectory contains general JavaScript files used in the theme.</td>
  </tr>
  <tr>
    <td>cornerstone/assets/scss</td>
    <td>The /scss/ subdirectory contains theme-specific CSS resources.</td>
  </tr>
	<tr>
	  <tr>
    <td>cornerstone/assets/layouts/</td>
    <td>The {theme-name}/assets/scss/layouts/ subdirectory contains .scss files that provide default styling for major layout components of theme pages. You can see the /layouts/ subdirectory’s internal structure on the Cornerstone Github Repository.</td>
  </tr>
	<tr>
	  <tr>
    <td>cornerstone/assets/settings/</td>
    <td>The {theme-name}/assets/scss/settings/ subdirectory contains SCSS variables for your framework. Files here map directly to components. If present, these variables override defaults in consumed libraries. The /settings/ subdirectory’s internal structure can be viewed at the Cornerstone Github Repository

The nested subdirectory for your chosen framework contains a file that includes that framework’s variables. For example, in the default Stencil theme, this file is: /settings/foundation/_foundation.scss.

Within each subdirectory nested at the ultimate level is one primary file, `_settings.scss`, that imports all other variables that have been broken into logical files, such as `_colors.scss`, `_typography.scss`, and `_z-index.scss`.</td>
  </tr>
	<tr>
	  <tr>
    <td>cornerstone/assets/utilities/</td>
    <td>The {theme-name}/assets/scss/utilities subdirectory contains mixins and tools, beyond the Citadel library, that help create UI’s. You can apply these CSS snippets to your HTML for quick prototyping when you need a unique, yet repeatable, style.

Every utility in this subdirectory will have both a class and a mixin. For example, consider the utility truncatedText: You can use it by applying the class `.u-truncatedText`, or by applying the mixin `@include u-truncatedText;`.</td>
  </tr>
	<tr>
    <td>cornerstone/assets/scss/components</td>
    <td>The components subdirectory contains the 4 following subdirectories:

* /citadel/
* /foundation/
* /stencil/
* /vendor/</td>
  </tr>
	<tr>
    <td>cornerstone/assets/scss/components/citadel</td>
    <td>read about the Citadel directory below.</td>
  </tr>
	<tr>
    <td>cornerstone/assets/scss/components/foundation</td>
    <td>The /components/vendor/ subdirectory contains the consumed version of framework components from your chosen provider. There is some renaming of these components to match Stencil naming conventions.</td>
  </tr>
	<tr>
    <td>cornerstone/assets/scss/components/stencil</td>
    <td>Read about the stencil directory below.</td>
  </tr>
	<tr>
    <td>cornerstone/assets/scss/components/vendor</td>
    <td>The /components/vendor/ subdirectory contains the consumed version of framework components from your chosen provider. There is some renaming of these components to match Stencil naming conventions.</td>
  </tr>
</table>

### Citadel Subdirectory 

Stencil themes include an internal pattern library called Citadel, which consumes the ZURB Foundation framework. Foundation provides the basis for creating responsive themes. Citadel extends the Foundation framework’s mixins and components to provide Stencil’s own mixins, extensible components, and utilities. The design/style language underlying these Citadel resources is the Sass/SCSS preprocessor. Citadel resources are named according to BEM and SUIT CSS conventions. Classes are named functionally, rather than based on visual presentation or content. Citadel is based specifically on Foundation 5.5.3, which installs with the Stencil framework. We do not support Foundation 6.x, due to breaking changes introduced between versions 5.x and 6.x.

Citadel design patterns reside in `cornerstone/assets/scss/components/`. Citadel assets bundled with Cornerstone are located in the following subdirectories:

* [cornerstone/assets/scss/settings/citadel/]()
* [cornerstone/assets/scss/components/citadel/]()

The `components/citadel` subdirectory contains Citadel-specific resources. The resources are named according to our style guide, which follows BEM and SUIT CSS naming conventions: Class names are structured, and hyphens are meaningful (that is, hyphens are not used merely to separate words). Here are some prototypes and examples:

<table>
  <tr>
  	<th>Citadel Component Name Design Pattern</th>
    <th>Class Name Example</th>
  <tr>
    <td>componentName</td>
    <td>.dropdown or .buttonGroup</td>
  <tr>
  <tr>
    <td>componentName--modifierName</td>
    <td>.dropdown--dropUp or .button--primary</td>
  <tr>
  <tr>
    <td>componentName-descendantName</td>
    <td>.dropdown-item</td>
  </tr>
  <tr>
    <td>componentName.is-stateOfComponent</td>
    <td>.dropdown.is-active.</td>
  </tr>
  <tr>
    <td>u-utilityName</td>
    <td>.u-textTruncate</td>
  </tr>
</table>

#### Components vs Utilities

Our naming scheme makes an architectural distinction between components and utilities. Components are defined as custom elements that enclose specific semantics, styling, and behavior. Component names are in camel case. Our syntax for naming them is:

<table>
  <tr>
  	<th>Component Name Design Pattern</th>
    <th>Component Name Example</th>
  <tr>
    <td>componentName[--modifierName|-descendantName]</td>
    <td>.nav, .button</td>
  <tr>
</table>

Utility classes are defined as low-level, structural and positional traits. Utilities can be applied directly to any element. Multiple utilities can be used together, and utilities can be used alongside component classes.

To make HTML patterns as reusable as possible, we have used utility classes sparingly, reserving them for component-level styling.

Our syntax for naming utilities is camel case, prefixed with a u- namespace:

<table>
  <tr>
  	<th>Utility Name Design Pattern</th>
    <th>Class Name Example</th>
  <tr>
    <td>u-utilityName</td>
    <td>u-navigationBar</td>
  <tr>
</table>

#### Variables and Mixins

Citadel variables and mixins follow similar naming conventions.

Variables are things that can change over time. Their names are in camel case, and show context:

<table>
  <tr>
  	<th>Variable Name Design Pattern</th>
    <th>Variable Name Example</th>
  <tr>
    <td>[componentName[--modifierName][-descendentName]-propertyName-variablename[--modifierName]</td>
    <td>-</td>
  <tr>
</table>

<table>
  <tr>
  	<th>Mixin Name Design Pattern</th>
    <th>Mixin Name Example</th>
  <tr>
    <td>Mixins follow regular camel-case naming conventions. Namespacing is not universally required for mixins. However, where a mixin has been created for a utility, its name matches the utility’s name, including u- namespacing:</td>
    <td>@mixin buttonVariant;
@mixin u-textTruncate;</td>
  <tr>
</table>

### Stencil Subdirectory

The /components/stencil/ subdirectory contains CSS files unique to Stencil themes, which are used to create specific page elements within the themes. You can view this subdirectory and all its children in the Cornerstone Theme Github Repository.

This subdirectory’s children contain CSS for the following page elements.

| Subdirectory  | UI Element/Purpose  |
|---|---|
| account  | Customer account details |
| addressBox  | Customer shipping addresses |
| addReturn  | Add a product-return request |
| banners  | Banners displayed across storefront’s top and bottom |
| blocker   | Position .blocker element above another element, to prevent a user action |
| compare  | Layout for product-comparison table |
| facetedSearch  | Faceted-search toggle (on/off), navigation list, and filters |
| facetLabel | 	Labels for faceted-search display  |
| heroCarousel  | Carousel of prominent (“hero”) images
  |
| navPages  | Styles for page navigation, with responsive layout |
| navUser  | Styles for cart counter, quick search|
| productCarousel  | Carousel of product images |
| productReviews  | Styles for product reviews |
| productView  | Product display (with thumbnails suppressed for mobile/tablet), product details, product options (size, color, etc.), product sharing  |
| quickView | Quick-view modal window for a selected product |
| ribbon  |  Top-right text badges, for messages like “On sale” |
| socialLinks  | Styles for social-media links  |
| tags | 	Styles for blog-post tags |
| toggleLink  | Styles for collapsible/expandable components  |
|writeReview   | Styles for product-review submission form  |

<a href='#akamai-image-manager' aria-hidden='true' class='block-anchor'  id='akamai-image-manager'><i aria-hidden='true' class='linkify icon'></i></a>

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Akamai Image Manager
> For Stencil themes only, images that use the default zoom library pass through Akamai Image Manager. This chooses the best image to serve based on device. To bypass the image optimization, include `imbypass=on` as a query parameter in the image url. This will serve un-optimized images.

* `<img src="{{cdn 'webdav:img/image.jpg?imbypass=on'}}">`
* `<img src="{{getImage settings.store_logo.image 'logo_size'}}?imbypass=on">`
* `<img src="{{cdn 'assets/img/image.jpg?imbypass=on'}}">`


</div>
</div>
</div>

---

## Resources

### Sample Apps
* [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone) (BigCommerce GitHub)

### Additonal Resources
* [Getting Started With Foundation 5](https://foundation.zurb.com/sites/docs/v/5.5.3/) (Zurb)
* [BEM](http://getbem.com/) (Get BEM)
* [SUIT CSS](https://suitcss.github.io/) (GitHub)
* [Customizing a Theme (Assets Directory)](https://www.youtube.com/embed/zUDNgprOEts) (Youtube)
* [BigCommerce Sass Styling Guide](https://github.com/bigcommerce/sass-style-guide) (BigCommerce GitHub)

