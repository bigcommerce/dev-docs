# Defining Global Styles

<div class="otp" id="no-index">

### On this page
- [Keys and example values](#keys-and-example-values)
- [Requirements and restrictions](#requirements-and-restrictions)
- [New products example](#new-products-example)
- [Changing page layout using local front matter](#changing-page-layout-using-local-front-matter)
- [Retrieving specific config.json values through Sass](#retrieving-specific-configjson-values-through-sass)
- [Adding and removing components](#adding-and-removing-components)
- [Resources](#resources)

</div>

Manage your theme's front-end components by configuring the `config.json` file. This file is made up of different keys and values that define the global styles shoppers will see on a theme.`config.json` performs the following functions:

* Provides global context for Stencil's CSS and Handlebars resources.
* Provides values for the Store Design GUI to manage.
* Provides metadata for your theme's listing in the Theme Marketplace.
* Defines variations included in your theme.

## Keys and example values

For a list of all available keys and values in `config.json`, see [Theme Objects](/stencil-docs/reference-docs/theme-objects/models/configjson) in the API Reference.

## Requirements and restrictions

The `config.json` file must meet the following requirements:

* It must be named `config.json`, must reside in the root of your `<theme-name>` top level subdirectory (e.g.: `/cornerstone/config.json`), and must contain valid JSON.
* The maximum allowable size for a theme's `config.json` file is 64 KB. Exceeding this limit will trigger an error upon uploading the theme to BigCommerce.
* Each key's value is restricted to 64 characters. Exceeding this limit will similarly trigger an upload error.
* Other than these size constraints, there is no limit on the number of keys and values that you can place in a theme's `config.json`.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

> Carefully check your theme against all the listed requirements  – including the required keys within the `meta` object and `variations` array. While some requirements are not enforced in local development, they will be validated when you later upload your theme to BigCommerce.

</div>
</div>
</div>

### Required keys
The `config.json` file must contain at least the following keys, with appropriate values (as outlined above):

* `name`
* `version`
* `settings` (must be a valid JSON object)
* `variations` (an array of at least one, and at most four, variation objects)
* `meta` (an object; see specific requirements below)

### Required meta keys

The meta object must contain at least the following keys, with appropriate values:

* `price`
* `author_name`
* `author_email`
* `author_support_url`
* `documentation_url`

For illustration, below is a commented excerpt:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Required Meta Keys and Values</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Required Meta Keys and Values"
subtitle: ""
lineNumbers: true
-->

```json
{
  ...
  "meta": {
    "price": 15000, // in cents; non-negative integer, minimum 0
    "author_name": "eCommerce Themes, Inc.", // Must be a string, not null
    "author_email": "support@example.com", // Must be a string, should be a valid email address, not null
    "author_support_url": "http://example.com/contactus", //  Must be a string, should be a valid URL, not null
    "documentation_url": "http://example.com/guide", // Must be a string, limit of 255 characters, not null
    "composed_image": "path/to/composed.png", // Must be a string path to the composed-image file
    "features": [ // Array of feature strings, all of which must be in the list enumerated here:
          https://github.com/bigcommerce/theme-registry/blob/master/app/schemas/theme_config.json#L33
      "fully_responsive" // Must include at least one feature, and no duplicate entries
    ]
  },
  ...
}
```

### Required variation keys

At least one variation is required in a theme. For each variation that you choose to include in your theme, you must provide at least the following keys and sub-element, with appropriate values:

* `name`
* `id`
* `meta`
* `description`

For illustration, below is a code sample from Cornerstone.

```json
"variations": [
    {
      "name": "Light",
      "id": "light",
      "meta": {
        "desktop_screenshot": "desktop_light.png",
        "mobile_screenshot": "mobile_light.png",
        "description": "Ideal for a wide range of businesses and brands, this design is fully responsive, simple, and ready for you to add your branding, logo, and products. ...",
    ...
    }
  ]
```

## New products example

To customize your theme's appearance at a global level, the values that you define in the `config.json` file interact with local resources. Your `config.json` definitions set global defaults for templates, front-matter attributes, and Handlebars resources throughout your theme. You can also define custom variables in `config.json`, named according to your needs.

To see how interactions with `config.json` values work, first note the default values in `config.json` for the `homepage_new_products_count` and `product_list_display_mode` keys:

```json
{
"settings": {
  "homepage_new_products_count": 12,
  "product_list_display_mode": "grid",
  }
}
```

Next, open your `templates/pages/home.html` file. Highlighted in bold below is a statement that uses the theme-wide settings above to customize an API request to the server.

Note the reference to the `homepage_new_products_count` key in the file's front matter, between the two `""` delimiters. If your current theme's `home.html` front matter omits `products:new:limit`, paste it in for this demonstration.

```html
products:
  new:
    limit: {{theme_settings.homepage_new_products_count}}
  featured:
    limit: {{theme_settings.homepage_featured_products_count}}
  top_sellers:
    limit: {{theme_settings.homepage_top_products_count}}
carousel: {{theme_settings.homepage_show_carousel}}
blog:
    recent_posts:
        limit: {{theme_settings.homepage_blog_posts_count}}

{{#partial "hero"}}

<!-- [...] -->

{{/partial}}
{{> layout/base}}
```

You should see a new products section displaying twelve products in a grid on your homepage.

## Changing page layout using local front matter

In the `templates/pages/home.html` front matter, products > featured is listed. This controls
how many products appear on the home page. This is set by the `config.json` `theme_settings.homepage_featured_products_count}`. This example shows how you can set theme wide configurations in the front matter using the `config.json`.

```html

<!-- [...] -->
products:
  featured:
      limit: {{theme_settings.homepage_featured_products_count}}
<!-- [...] -->

```

Next, try changing the `limit: {{theme_settings.homepage_featured_products_count}}` statement in the `home.html` file to a hard-coded limit: 2, as indicated below in bold.


```html
products:
  <!-- [...] -->
  featured:
      limit: 2
  <!-- [...] -->
<!-- [...] -->

{{#partial "page"}}

<!-- [...] -->

<div class="main full">
  {{#if products.featured}}
      {{> components/products/featured products=products.featured columns=2}}
  {{/if}}
</div>
{{/partial}}
{{> layout/base}}
```

Reload the page. You should see the number of products displayed in "Featured Products" change to two.

## Retrieving specific config.json values through Sass

In `config.json`, global variables bring dynamic values into the framework. Sass imports these global variables' values to handle data like colors hexadecimal values and to make the data available to Page Builder. Below is a short snippet from `config.json`.

```css
{
<!-- [...] -->
"color-highlight": "#00abc9",
"color-highlightDark": "#f2f2f2",
"color-highlightDarker": "#dfdfdf",
<!-- [...] -->
}
```

Below are the corresponding references in the default Stencil theme's `assets/scss/settings/global/color/_color.scss` file.

```scss
// ...
$color-highlight:       stencilColor("color-highlight");
$color-highlightDarker: stencilColor("color-highlightDarker");
$color-highlightDark:   stencilColor("color-highlightDark");
// ...
```

In `config.json`, try redefining one or more color variables to hex values of your choice. Reload the home page to see the effects.

## Adding and removing components

The properties Stencil abstracts as Handlebars resources are portable between HTML files. For an example of how this works, first open any storefront page in a browser. In the page's footer, note the appearance of Categories.

Next, edit `templates/components/common/footer.html`, and cut the code section shown below.

```html
<footer class="footer" role="contentinfo">
  <div class="container">
      <section class="footer-info">
          <!-- [...] -->
<article class="footer-info-col footer-info-col--small">
  <h5 class="footer-info-heading">{{lang 'footer.categories'}}</h5>
  <ul class="footer-info-list">
      {{#each categories}}
      <li>
          <a href="{{url}}">{{name}}</a>
      </li>
      {{/each}}
  </ul>
</article>
```

Refresh the page. The Categories list should disappear from the footer.

Next, add a directory to `templates/components` called `footer` and create a new `categories.html` template there. (ex: `templates/components/footer/categories.html`). Then, paste the code block from the previous step into `category.html`.

```html
<article class="footer-info-col footer-info-col--small">
  <h5 class="footer-info-heading">{{lang 'footer.categories'}}</h5>
  <ul class="footer-info-list">
      {{#each categories}}
      <li>
          <a href="{{url}}">{{name}}</a>
      </li>
      {{/each}}
  </ul>
</article>
```

In `templates/components/common/footer.html`, add a reference to the new template.

```html
<footer class="footer" role="contentinfo">
  <div class="container">
      <section class="footer-info">
          <!-- [...] -->
          {{> components/footer/categories}}
          <!-- [...] -->
      </section>
  </div>
</footer>
```

Refresh the page. The Categories list should reappear in the footer.

## Resources

### Additional resources

* [Customizing a Theme Video](https://www.youtube.com/watch?v=VZYZsDoEOpQ) (Youtube)
