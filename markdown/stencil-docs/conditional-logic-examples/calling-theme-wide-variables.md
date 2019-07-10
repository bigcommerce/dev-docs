<h1>Calling Theme-Wide Variables via Handlebars</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#calling-theme-wide_calling-theme-wide">Calling Theme-Wide Variables via Handlebars</a></li>
	</ul>
</div>

<a href='#calling-theme-wide_calling-theme-wide' aria-hidden='true' class='block-anchor'  id='calling-theme-wide_calling-theme-wide'><i aria-hidden='true' class='linkify icon'></i></a>

## Calling Theme-Wide Variables via Handlebars

As shown in an earlier Quick Start example, you can reference variables from `config.json` in a theme template's front matter. But you can also call any `config.json` variable within a template's HTML/Handlebars body, by using a Handlebars expression that precedes the variable with `theme_settings`.

Below, from Cornerstone's `templates/pages/home.html`, is a code snippet that provides three examples:

```
<div class="main full">
    {{#if products.featured}}
        {{> components/products/featured products=products.featured
            columns=theme_settings.homepage_featured_products_column_count}}
    {{/if}}

    {{#if products.top_sellers}}
        {{> components/products/top products=products.top_sellers
            columns=theme_settings.homepage_top_products_column_count}}
    {{/if}}

    {{#if products.new}}
        {{> components/products/new products=products.new 
            columns=theme_settings.homepage_new_products_column_count}}
    {{/if}}
</div> 
```

Above, each `if` conditional statement tests whether one of the three products attributes (Featured Products, Top Sellers/Popular Brands, or New Products) is declared within this template's front matter. If so, for the corresponding section on this page, it sets the local column count to match the theme-wide `theme_settings...._column_count value` defined in `config.json`.

