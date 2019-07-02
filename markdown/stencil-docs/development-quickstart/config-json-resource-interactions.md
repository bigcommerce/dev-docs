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
<span class="fp">{theme-name}/config.json</span> file interact with local resources. Your <span class="fp">config.json</span> definitions set global defaults for templates, front-matter attributes, and Handlebars resources throughout your theme. You can also define custom variables in <span class="fp">config.json</span>, named according to your needs.

## New Products Example

To see how interactions with <span class="fp">config.json</span> values work, first note the default values in <span class="fp">config.json</span> for the `homepage_new_products_count` and `product_list_display_mode` keys:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Setttings</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Setttings"
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
        <div class="HubBlock-header-name">Home.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Home.html"
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

---

<a href='#config_changing' aria-hidden='true' class='block-anchor'  id='config_changing'><i aria-hidden='true' class='linkify icon'></i></a>

## Changing Page Layout Using Local Front Matter

In the <span class="fp">{theme-name}templates/pages/home.html</span> front matter, products > featured is listed. This controls
how many products appear on the home page. This is set by the <span class="fp">config.json</span> `theme_settings.homepage_featured_products_count}`. This example shows how you can set theme wide configurations in the front matter using the <span class="fn">config.json</span>.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Home.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Home.html"
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

If you now reload your storefront’s home page in your browser, you should see the number of displayed "Featured Products" change from its default number (as specified in <span class="fp">config.json</span>) to two.

---

<a href='#config_retrieving' aria-hidden='true' class='block-anchor'  id='config_retrieving'><i aria-hidden='true' class='linkify icon'></i></a>

## Retrieving Specific config.json Values through Sass

In <span class="fn">config.json</span>, global variables bring dynamic values into the framework. Sass imports these global variables’ values to gracefully handle data like theme-wide colors’ hexadecimal values, and to make the data available to Theme Editor. Here is one short snippet from <span class="fn">config.json</span>:

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
// [...]
"color-highlight": "#00abc9",
"color-highlightDark": "#f2f2f2",
"color-highlightDarker": "#dfdfdf",
// [...]
}
```

Here are the corresponding references in the default Stencil theme’s<span class="fn">{theme-name}/assets/scss/settings/global/color/_color.scss</span> file:

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
// [...]
$color-highlight:       stencilColor("color-highlight");
$color-highlightDarker: stencilColor("color-highlightDarker");
$color-highlightDark:   stencilColor("color-highlightDark");
// [...]
```

In <span class="fn">config.json</span>, try redefining one or more color variables to hex values of your choice. Then re-render your theme’s home page to see the effects.

---

<a href='#config_adding' aria-hidden='true' class='block-anchor'  id='config_adding'><i aria-hidden='true' class='linkify icon'></i></a>

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

