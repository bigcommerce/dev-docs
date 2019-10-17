<h1>New Products</h1>

**Description:** A list of new products for the BigCommerce storefront

**Handlebars Expression:**`{{products.new}}`

**Object Properties:** References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

**Usage Example:**

To access the global `{{products.new}}` object on your page, you must first use front matter to declare the object at the top of your page template. 

The code example below declares the global `{{products.new}}` object on the `cornerstone/templates/pages/home.html` page template from [Stencil's base Cornerstone Theme](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L3) (Github).

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">{{products.new}} Front Matter Declaration</div>
    </div><div class="HubBlock-header-subtitle">cornerstone/templates/pages/home.html</div>
</div>

<!--
title: "{{products.new}} Front Matter Declaration"
subtitle: "cornerstone/templates/pages/home.html"
lineNumbers: true
-->

```html

products:
    new:
        limit: {{theme_settings.homepage_new_products_count}}

```

The `homepage_featured_products_count` limit is one of two relevant variables defined in Cornerstone's `config.json` file (Github).

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

```json
 "settings": {
    "homepage_new_products_count": 5,
    [...]
    "homepage_new_products_column_count": 4,
    [...]
```

In the body of [Cornerstone's `home.html` template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L36) (Github), the below Handlebars conditional statement is responsible for displaying the `{{products.featured}}` object. This is the object that we declared above using front matter.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">conditional {{products.new}} view</div>
    </div><div class="HubBlock-header-subtitle">cornerstone/templates/pages/home.html</div>
</div>

<!--
title: "conditional {{products.new}} view"
subtitle: "cornerstone/templates/pages/home.html"
lineNumbers: true
-->

```js
{{#if products.new}}
  {{> components/products/new products=products.new 	
 	columns=theme_settings.homepage_new_products_column_count}}
{{/if}}
```

This above statement formats the _New Products_ display according to the `homepage_new_products_column_count` variable, which is the second relevant variable defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L46) (Github).

