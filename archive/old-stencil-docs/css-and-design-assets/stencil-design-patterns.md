<h1>Components Directory and Design Patterns</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#components_components-directory">Components Directory</a></li>
    <li><a href="#components_citadel-sub">Citadel Subdirectory</a></li>
    <li><a href="#components_foundation-sub">Foundation Subdirectory</a></li>
    <li><a href="#components_stencil-sub">Stencil Subdirectory</a></li>
    <li><a href="#components_vendor-sub">Vendor Subdirectory</a></li>
	</ul>
</div>

<a href='#components_design-patterns' aria-hidden='true' class='block-anchor'  id='components_design-patterns'><i aria-hidden='true' class='linkify icon'></i></a>

Stencil themes include an internal pattern library called Citadel, which consumes the ZURB Foundation framework. Foundation provides the basis for creating responsive themes. Citadel extends the Foundation framework’s mixins and components to provide Stencil’s own mixins, extensible components, and utilities.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Citadel Version
> Citadel is based specifically on Foundation 5.5.3, which installs with the Stencil framework. We do not support Foundation 6.x, due to breaking changes introduced between versions 5.x and 6.x.

</div>
</div>
</div>

Citadel extends Foundation’s mix-ins and components to provide Stencil’s own mix-ins, extensible components, and utilities. These include drop-down lists, forms, and similar resources. Citadel resources are named according to BEM and SUIT CSS conventions. Classes are named functionally, rather than based on visual presentation or content. Our [sass style](https://github.com/bigcommerce/sass-style-guide) guide explains more about how we name our classes.
Citadel assets bundled with Cornerstone are located in these Cornerstone subdirectories: 

* <span class="fp">cornerstone/assets/scss/settings/citadel/</span>
* <span class="fp">cornerstone/assets/scss/components/citadel/</span>

A theme developer might use drop-down lists, forms, and similar resources from Citadel’s design patterns. The design/style language underlying these Citadel resources is the Sass/SCSS preprocessor.

---

<a href='#components_components-directory' aria-hidden='true' class='block-anchor'  id='components_components-directory'><i aria-hidden='true' class='linkify icon'></i></a>

## Components Directory 

Citadel design patterns reside in the <span class="fp">{theme-name}/assets/scss/components/</span> subdirectory. The components subdirectory contains the 4 following subdirectories:
* <span class="fp">/citadel/</span> 
* <span class="fp">/foundation/</span>
* <span class="fp">/stencil/</span>
* <span class="fp">/vendor/</span>


You can see the components directory and its children present in the [Cornerstone Theme Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/components).

---

<a href='#components_citadel-sub' aria-hidden='true' class='block-anchor'  id='components_citadel-sub'><i aria-hidden='true' class='linkify icon'></i></a>

## Citadel Subdirectory

The <span class="fp">components/citadel</span> subdirectory contains Citadel-specific resources. The resources are named according to our [style guide](https://github.com/bigcommerce/sass-style-guide), which follows [BEM](http://getbem.com/naming/) and [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) naming conventions: Class names are structured, and hyphens are meaningful (that is, hyphens are not used merely to separate words). 

As a general rule, classes here are named functionally, not based on their visual presentation or their content. Here are some prototypes and examples:

* `componentName` (for example: `.dropdown or .buttonGroup`)

* `componentName--modifierName` (for example: `.dropdown--dropUp` or `.button--primary`)

* `componentName-descendantName` (for example: `.dropdown-item`)

* `componentName.is-stateOfComponent` (for example: `.dropdown.is-active`)

* `u-utilityName` (for example: `.u-textTruncate`)

* Abstractly: `[<namespace>-]<componentName>[--modifierName|-descendentName]`

### Components versus Utilities

Our naming scheme makes an architectural distinction between components and utilities. Components are defined as custom elements that enclose specific semantics, styling, and behavior. Our syntax for naming them is:

`<componentName>[--modifierName|-descendantName]`

Component names are in camel case. We have tried to choose names that are as short as possible, but as long as necessary. For example:

* `.nav`, not `.navigation`; but:
* `.button`, not `.btn`

Utility classes are defined as low-level, structural and positional traits. Utilities can be applied directly to any element. Multiple utilities can be used together, and utilities can be used alongside component classes.

To make HTML patterns as reusable as possible, we have used utility classes sparingly, reserving them for component-level styling.

Our syntax for naming utilities is camel case, prefixed with a `u-` namespace:

`u-<utilityName>`

### Variables and Mixins

Citadel variables and mixins follow similar naming conventions.

Variables are things that can change over time. Their names are in camel case, and show context:

` [<componentName>[--modifierName][-descendentName]-<propertyName>
-<variablename>[--<modifierName>]`

Mixins follow regular camel-case naming conventions. Namespacing is not universally required for mixins. However, where a mixin has been created for a utility, its name matches the utility’s name, including `u-` namespacing:

```
@mixin buttonVariant;
@mixin u-textTruncate;
```

---

<a href='#components_foundation-sub' aria-hidden='true' class='block-anchor'  id='components_foundation-sub'><i aria-hidden='true' class='linkify icon'></i></a>

## Foundation Subdirectory

The <span class="fp">/components/foundation/</span> subdirectory contains files installed by the [ZURB Foundation framework](https://foundation.zurb.com/showcase/about.html). (Stencil's Foundation support is limited to version 5.5.3.)


---

<a href='#components_stencil-sub' aria-hidden='true' class='block-anchor'  id='components_stencil-sub'><i aria-hidden='true' class='linkify icon'></i></a>

## Stencil Subdirectory

The <span class="fp">/components/stencil/</span> subdirectory contains CSS files unique to Stencil themes, which are used to create specific page elements within the themes. You can view this subdirectory and all its children in the [Cornerstone Theme Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/components/stencil).

This subdirectory’s children contain CSS for the following page elements.

| Subdirectory  |  UI Element/Purpose |
| -- | -- |
| account | Customer account details |
| addressBox | Customer shipping addresses |
| addReturn | Add a product-return request |
| banners | Banners displayed across storefront’s top and bottom |
| blocker | Position .blocker element above another element, to prevent a user action |
| compare | Layout for product-comparison table |
| facetedSearch | Faceted-search toggle (on/off), navigation list, and filters |
| facetLabel | Labels for faceted-search display |
| heroCarousel | Carousel of prominent ("hero") images |
| navPages | Styles for page navigation, with responsive layout |
| navUser | Styles for cart counter, quick search |
| productCarousel | Carousel of product images |
| productReviews | Styles for product reviews |
| productView | Product display (with thumbnails suppressed for mobile/tablet), product details, product options (size, color, etc.), product sharing |
| quickView | Quick-view modal window for a selected product |
| ribbon | Top-right text badges, for messages like "On sale" |
| socialLinks | Styles for social-media links |
| tags | Styles for blog-post tags |
| toggleLink | Styles for collapsible/expandable components |
| writeReview | Styles for product-review submission form |


---

<a href='#components_vendor-sub' aria-hidden='true' class='block-anchor'  id='components_vendor-sub'><i aria-hidden='true' class='linkify icon'></i></a>

## Vendor Subdirectory

The <span class="fp">/components/vendor/</span> subdirectory contains the consumed version of framework components from your chosen provider. There is some renaming of these components to match Stencil naming conventions.

---

## Resources

### Sample Apps
* [Cornerstone Theme Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/components) (BigCommerce GitHub)

## Related Articles
* [BigCommerce Sass Styling Guide](https://github.com/bigcommerce/sass-style-guide) (BigCommerce GitHub)

## Additonal Resources
* [Citadel 5.3](https://github.com/zurb/foundation-sites/releases/tag/v5.5.3) (GitHub)
* [Getting Started With Foundation 5](https://foundation.zurb.com/sites/docs/v/5.5.3/) (Zurb)
* [BEM](http://getbem.com/naming/) (Get BEM)
* [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) (GitHub)

