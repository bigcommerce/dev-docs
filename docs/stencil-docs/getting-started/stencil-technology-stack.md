# Stencil Technology Stack

<div class="otp" id="no-index">

### On This Page
- [Handlebars.js Overview](#handlebarsjs-overview)
- [Stencil Objects Overview](#stencil-objects-overview)
- [YAML Front Matter Overview](#yaml-front-matter-overview)
- [Resources](#resources)

</div> 

Stencil's use of Handlebars.js, Javascript, and YAML Front Matter on the front end allows developers to create dynamic, templated customizations across a BigCommerce storefront.

## Handlebars.js Overview

[Handlebars.js](https://handlebarsjs.com/) is a minimal templating language that allows developers to create dynamic and robust templates for any BigCommerce Stencil storefront. A Handlebars template looks like an HTML file, with the addition of Handlebars.js expressions for dynamic logic that can be embedded into the page.

A Handlebars expression begins and end with curly braces.
Below is a basic example that accesses the `` and `` variables.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Using handlebars to access the {{title}} variable</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Using handlebars to access the {{title}}  variable"
subtitle: ""
lineNumbers: true
-->

```html
<div class="entry">
  # Using handlebars to access the {{title}} and  variables
  <div class="body"></div>
</div>
```

In production, Handlebars statements run on the server side, generating HTML received by the shopper’s browser.

View the [full Handlebars Helpers Reference](/stencil-docs/reference-docs/handlebars-helpers-reference) to learn about the helpers avilable on a Stencil storefront.

## Stencil Objects Overview

Stencil Objects are the individual Javascript objects which are rendered onto a Stencil storefront. Below is the Javascript Object Notation (JSON) for a [Banner object](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties#global-objects_banner) rendered on a category page of a storefront.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Banners Object </div>
    </div><div class="HubBlock-header-subtitle">JSON for a banners object, accessible through Handlebars.js</div>
</div>

<!--
title: "Banners Object "
subtitle: "JSON for a banners object, accessible through Handlebars.js"
lineNumbers: true
-->

```json
banners: {
    top: [
    "For the week of May 20th, all apparel available at the online store will be 25% off the standard store price."
    ],
    bottom: [ ],
    top_metadata: [
    {
      id: "3",
      banner-name: "All Apparel 25% off for a limited time!",
      content: "<p>For the week of May 20th, all apparel available at the online store will be 25% off the standard store price.</p>",
      location: "top"
    }
  ]
}
```

<!--
    title: #### Banners Object (rendered)

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1558381899909
-->

#### Banners Object (rendered)
![#### Banners Object (rendered)
](//s3.amazonaws.com/user-content.stoplight.io/6116/1558381899909 "#### Banners Object (rendered)
")

As a developer, you can use Handlebars.js syntax to access objects and use them to customize your Stencil theme.

Stencil Objects are categorized as either Global, Common, or Other, which is representative of the object's scope or where in the theme it can be accessed. For example, Global Objects are components shared across the entire BigCommerce storefront.

## YAML Front Matter Overview

BigCommerce Stencil themes utilize YAML Front Matter on template pages. Front Matter allows developers to request objects on the storefront, allowing developers to define each page's design and layout details.

When utilized, Front Matter must be the opening text of a file and must take the form of valid YAML set between triple-dashed lines.

See our [Front Matter Reference](/stencil-docs/reference-docs/front-matter-reference) to see what Front Matter attributes are available on a Stencil storefront. Below is a snippet from the base Cornerstone theme's <span class="fn">home.html</span> file, showing how Front Matter can be used in a theme.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">home.html</div>
    </div><div class="HubBlock-header-subtitle">The YAML Front Matter below is present in the Cornerstone's home.html file </div>
</div>

<!--
title: "home.html"
subtitle: "The YAML Front Matter below is present in the Cornerstone's home.html file "
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

```

## Resources

### Related Articles

* [Handlebars.js documentation](https://handlebarsjs.com/) (Handlebars)

### Additional Resources

* [Stencil Technology Stack Video](https://www.youtube.com/watch/p5SR8N0SeCg) (Youtube)
* [Cornerstone Components Subdirectory](https://github.com/bigcommerce/cornerstone) (BigCommerce Github)
