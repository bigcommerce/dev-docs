<h1><code>config.json</code> Interactions</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#config_new">New Products Example</a></li>
    <li><a href="#config_changing">Changing Page Layout using Local Front Matter</a></li>
    <li><a href="#config_retrieving">Retrieving Specific config. Values through Sass</a></li>
    <li><a href="#config_adding">Adding/Removing Components</a></li>
	</ul>
</div>

<a href='#config_new' aria-hidden='true' class='block-anchor'  id='config_new'><i aria-hidden='true' class='linkify icon'></i></a>

To customize your theme’s appearance at a global level, the values that you define in the 
`<theme-name>/config.json` file interact with local resources. Your config.json definitions set global defaults for templates, front-matter attributes, and Handlebars resources throughout your theme. You can also define custom variables in config.json, named according to your needs.

## New Products Example

To see how interactions with `config.json` values work, first note the default values in `config.json` for the `homepage_new_products_count` and `product_list_display_mode` keys:

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

Next, open your `<theme-name>templates/pages/home.html` file. Highlighted in bold below is a statement that uses the theme-wide settings above to customize an API request to the server.

(Note the reference to the `homepage_new_products_count` key in the file’s front matter, between the two "---" delimiters. If your current theme’s `home.html` front matter omits this `products:new:limit` definition, paste it in for this demonstration.)

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

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
---
{{#partial "hero"}}

<!-- [...] -->

{{/partial}}
{{> layout/base}}
```

If you load your storefront’s home page (by default, [http://localhost:3000](http://localhost:3000), you should see a "New Products" section that displays 12 products in a grid.

<a href='#config_changing' aria-hidden='true' class='block-anchor'  id='config_changing'><i aria-hidden='true' class='linkify icon'></i></a>

## Changing Page Layout Using Local Front Matter

Look again at your `<theme-name>templates/pages/home.html` file’s front matter. As in the New Products example above, note how the presence and number of featured products correlates to your theme’s `config.json` setting:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
---
[...]
products:
  featured:
      limit: {{theme_settings.homepage_featured_products_count}}
[...]
---
```

Next, try changing the `limit: {{theme_settings.homepage_featured_products_count}}` statement in the `home.html` file to a hard-coded limit: 2, as indicated below in bold:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
---
products:
  // [...]
  featured:
      limit: 2
  // [...]  
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

If you now reload your storefront’s home page in your browser, you should see the number of displayed "Featured Products" change from its default number (as specified in `config.json`) to two.

<a href='#config_retrieving' aria-hidden='true' class='block-anchor'  id='config_retrieving'><i aria-hidden='true' class='linkify icon'></i></a>

## Retrieving Specific config.json Values through Sass

In `config.json`, global variables bring dynamic values into the framework. Sass imports these global variables’ values to gracefully handle data like theme-wide colors’ hexadecimal values, and to make the data available to Theme Editor. Here is one short snippet from `config.json`:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```css
{
// [...]
"color-highlight": "#00abc9",
"color-highlightDark": "#f2f2f2",
"color-highlightDarker": "#dfdfdf",
// [...]
}
```

Here are the corresponding references in the default Stencil theme’s `<theme-name>/assets/scss/settings/global/color/_color.scss` file:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```css
// [...]
$color-highlight:       stencilColor("color-highlight");
$color-highlightDarker: stencilColor("color-highlightDarker");
$color-highlightDark:   stencilColor("color-highlightDark");
// [...]
```

In `config.json`, try redefining one or more color variables to hex values of your choice. Then re-render your theme’s home page to see the effects.

<a href='#config_adding' aria-hidden='true' class='block-anchor'  id='config_adding'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding/Removing Components

The storefront properties that Stencil abstracts as Handlebars resources are completely portable between HTML files. For an example of how this works, first open any storefront page in a browser. In the page’s footer, note the appearance of product Categories.

Next, open your `<theme-name>/templates/components/common/footer.html` file in a text editor. As indicated below, cut (or copy and comment out) the code section shown below (characterized by the strikethrough), and keep it on your Clipboard:

<!--
title: ""
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

Next, create a new `<theme-name>/templates/components/footer/ `subdirectory. Paste the code block from the previous cut/copy into a new file named `<theme-name>/templates/components/footer/categories.html`, and save it:

<!--
title: ""
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

Next, back in `/templates/components/common/footer.html`, add a reference to your new path/file, as indicated below in comments:

<!--
title: ""
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

