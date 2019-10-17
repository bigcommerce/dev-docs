<h1>Featured Products</h1>

<b>Description:</b> Renders a list of all the featured products for the BigCommerce storefront.

<b>Handlebars Expression:</b> `{{products.featured}}`

<b>Object Properties:</b> References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

<b> Usage Example: </b>

The code example below displays the global `{{products.featured}}` object on the `cornerstone/templates/pages/home.html` page template from [Stencil's base Cornerstone theme](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L5) (Github).

First, you must declare the object using Front Matter. To declare the object, the following front matter must be placed at the top of the template HTML page. This following declaration also limits the number of featured products to be displayed:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">{{products.featured}} Front Matter Declaration</div>
    </div><div class="HubBlock-header-subtitle">cornerstone/templates/pages/home.html</div>
</div>

<!--
title: "{{products.featured}} Front Matter Declaration"
subtitle: "cornerstone/templates/pages/home.html"
lineNumbers: true
-->

```js

products:
    [...]
    featured:
        limit: {{theme_settings.homepage_featured_products_count}} //limits the number of featured products to be displayed

```

The `homepage_featured_products_count` limit is one of two relevant variables defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L45) (Github).



<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">"settings" object</div>
    </div><div class="HubBlock-header-subtitle">cornerstone/config.json</div>
</div>

<!--
title: ""settings" object"
subtitle: "cornerstone/config.json"
lineNumbers: true
-->

```
"settings": {
    [...]
    "homepage_featured_products_count": 8,
    [...]
    "homepage_featured_products_column_count": 4,
    [...]    
```

In the body of [Cornerstone's `home.html` template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L27) (Github), the below Handlebars conditional statement is responsible for displaying the `{{products.featured}}` object. This is the object that we declared above using front matter.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">conditional {{products.featured}} view</div>
    </div><div class="HubBlock-header-subtitle">cornerstone/templates/pages/home.html</div>
</div>

<!--
title: "conditional {{products.featured}} view"
subtitle: "cornerstone/templates/pages/home.html"
lineNumbers: true
-->

```js
{{#if products.featured}}
		{{> components/products/featured products=products.featured 
    columns=theme_settings.homepage_featured_products_column_count}}
{{/if}}

```

This above statement formats the _Featured Products_ display according to the `homepage_featured_products_column_count` variable, which is the second relevant variable defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L53) (Github).

