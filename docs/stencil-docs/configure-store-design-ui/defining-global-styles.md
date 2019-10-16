# Defining Global Styles

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#defining_keys-and-example">Keys and Example Values</a></li>
    <li><a href="#defining_requirements-and-restrictions">Requirements and Restrictions</a></li>
    <li><a href="#defining_new">New Products Example</a></li>
    <li><a href="#defining_changing">Changing Page Layout using Local Front Matter</a></li>
    <li><a href="#defining_retrieving">Retrieving Specific config.json Values through Sass</a></li>
    <li><a href="#defining_adding">Adding/Removing Components</a></li>
	</ul>
</div>

You can manage your custom theme's front-end components by configuring the <span class="fn">config.json</span> file. This file is made up of different keys and values that define the global styles shoppers will see on a theme. This <span class="fn">config.json</span> file’s functions are to:

* Provide global context for Stencil’s CSS and Handlebars resources.
* Provide values for the Store Design GUI to manage.
* Provide metadata for your theme’s listing in the Theme Marketplace.
* Define variations included in your custom theme

---

<a href='#defining_keys-and-example' aria-hidden='true' class='block-anchor'  id='defining_keys-and-example'><i aria-hidden='true' class='linkify icon'></i></a>

## Keys and Example Values

For a list of all available keys and values in <span class="fp">config.json</span>, see [Theme Objects](/stencil-docs/reference-docs/theme-objects/models/configjson) in the API Reference.

</div>

---

<a href='#defining_requirements-and-restrictions' aria-hidden='true' class='block-anchor'  id='defining_requirements-and-restrictions'><i aria-hidden='true' class='linkify icon'></i></a>

## Requirements and Restrictions

The <span class="fn">config.json</span> file must meet the following requirements:

* It must be named <span class="fn">config.json</span>, must reside in the root of your `<theme-name>` top level subdirectory (e.g.: <span class="fp">/cornerstone/config.json</span>), and must contain valid JSON.
* The maximum allowable size for a theme's <span class="fn">config.json</span> file is 64 KB. Exceeding this limit will trigger an error upon uploading the theme to BigCommerce.
* Each key's value is restricted to 64 characters. Exceeding this limit will similarly trigger an upload error.
* Other than these size constraints, there is no limit on the number of keys and values that you can place in a theme's <span class="fn">config.json</span>.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

> Carefully check your theme against all the listed requirements  – including the required keys within the `meta` object and `variations` array. While some requirements are not enforced in local development, they will be validated when you later upload your theme to BigCommerce.

</div>
</div>
</div>

### Required Themewide Keys
The <span class="fn">config.json</span> file must contain at least the following keys, with appropriate values (as outlined above):

* `name`
* `version`
* `settings` (must be a valid JSON object)
* `variations` (an array of at least one, and at most four, variation objects)
* `meta` (an object; see specific requirements below)

### Required `meta` Keys

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

### Required `variation` Keys

At least one variation is required in a theme. For each variation that you choose to include in your theme, you must provide at least the following keys and sub-element, with appropriate values:

* `name`
* `id`
* `meta`
* `description`

For illustration, below is a code sample from Cornerstone:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Required Variation Object with Key/Value pairs</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Required Variation Object with Key/Value pairs"
subtitle: ""
lineNumbers: true
-->

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

---

<a href='#defining_new' aria-hidden='true' class='block-anchor'  id='defining_new'><i aria-hidden='true' class='linkify icon'></i></a>

## New Products Example

To customize your theme’s appearance at a global level, the values that you define in the
<span class="fp">{theme-name}/config.json</span> file interact with local resources. Your <span class="fp">config.json</span> definitions set global defaults for templates, front-matter attributes, and Handlebars resources throughout your theme. You can also define custom variables in <span class="fp">config.json</span>, named according to your needs.

To see how interactions with <span class="fp">config.json</span> values work, first note the default values in <span class="fp">config.json</span> for the `homepage_new_products_count` and `product_list_display_mode` keys:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
"settings": {
  "homepage_new_products_count": 12,
  "product_list_display_mode": "grid",
  }
}
```

Next, open your <span class="fp">{theme-name}templates/pages/home.html</span> file. Highlighted in bold below is a statement that uses the theme-wide settings above to customize an API request to the server.

(Note the reference to the `homepage_new_products_count` key in the file’s front matter, between the two "---" delimiters. If your current theme’s <span class="fp">home.html</span> front matter omits this `products:new:limit` definition, paste it in for this demonstration.)

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```yaml
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
---
{{#partial "hero"}}

<!-- [...] -->

{{/partial}}
{{> layout/base}}
```

If you load your storefront’s home page (by default, [http://localhost:3000](http://localhost:3000), you should see a "New Products" section that displays 12 products in a grid.

---

<a href='#defining_changing' aria-hidden='true' class='block-anchor'  id='defining_changing'><i aria-hidden='true' class='linkify icon'></i></a>

## Changing Page Layout Using Local Front Matter

In the <span class="fp">{theme-name}templates/pages/home.html</span> front matter, products > featured is listed. This controls
how many products appear on the home page. This is set by the <span class="fp">config.json</span> `theme_settings.homepage_featured_products_count}`. This example shows how you can set theme wide configurations in the front matter using the <span class="fn">config.json</span>.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
---
<!-- [...] -->
products:
  featured:
      limit: {{theme_settings.homepage_featured_products_count}}
<!-- [...] -->
---
```

Next, try changing the `limit: {{theme_settings.homepage_featured_products_count}}` statement in the `home.html` file to a hard-coded limit: 2, as indicated below in bold:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
---
products:
  <!-- [...] -->
  featured:
      limit: 2
  <!-- [...] -->
---

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

If you now reload your storefront’s home page in your browser, you should see the number of displayed "Featured Products" change from its default number (as specified in <span class="fp">config.json</span>) to two.

---

<a href='#defining_retrieving' aria-hidden='true' class='block-anchor'  id='defining_retrieving'><i aria-hidden='true' class='linkify icon'></i></a>

## Retrieving Specific config.json Values through Sass

In <span class="fn">config.json</span>, global variables bring dynamic values into the framework. Sass imports these global variables’ values to gracefully handle data like theme-wide colors’ hexadecimal values, and to make the data available to Store Design. Here is one short snippet from <span class="fn">config.json</span>:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```css
{
<!-- [...] -->
"color-highlight": "#00abc9",
"color-highlightDark": "#f2f2f2",
"color-highlightDarker": "#dfdfdf",
<!-- [...] -->
}
```

Here are the corresponding references in the default Stencil theme’s <span class="fn">{theme-name}/assets/scss/settings/global/color/_color.scss</span> file:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```scss
// ...
$color-highlight:       stencilColor("color-highlight");
$color-highlightDarker: stencilColor("color-highlightDarker");
$color-highlightDark:   stencilColor("color-highlightDark");
// ...
```

In <span class="fn">config.json</span>, try redefining one or more color variables to hex values of your choice. Then re-render your theme’s home page to see the effects.

---

<a href='#defining_adding' aria-hidden='true' class='block-anchor'  id='defining_adding'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding/Removing Components

The storefront properties that Stencil abstracts as Handlebars resources are completely portable between HTML files. For an example of how this works, first open any storefront page in a browser. In the page’s footer, note the appearance of Categories.

Next, open your <span class="fn">{theme-name}/templates/components/common/footer.html</span> file in a text editor. As indicated below, cut (or copy and comment out) the code section shown below.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">footer.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "footer.html"
subtitle: ""
lineNumbers: true
-->

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

If you now refresh the storefront page in your browser, the Categories list should disappear from the footer.

Next, create a new <span class="fn">{theme-name}/templates/components/footer/ subdirectory</span>. Paste the code block from the previous cut/copy into a new file named <span class="fn">{theme-name}/templates/components/footer/categories.html</span>, and save it:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">categories.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "categories.html"
subtitle: ""
lineNumbers: true
-->

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

Next, back in <span class="fp">/templates/components/common/footer.html</span>, add a reference to your new path/file, as indicated below in comments:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">footer.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "footer.html"
subtitle: ""
lineNumbers: true
-->

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

If you now refresh storefront pages in your browser, the Categories list should reappear in the footer. The component returns even though you have moved its data resources to an arbitrary new location, and referenced them indirectly.

---

## Resources

### Additional Resources

* [Customizing a Theme Video](https://www.youtube.com/watch?v=VZYZsDoEOpQ) (Youtube)
