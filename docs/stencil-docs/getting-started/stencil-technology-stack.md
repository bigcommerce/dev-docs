# Stencil Technology Stack



Stencil's use of Handlebars.js, Javascript, and YAML Front Matter on the front end allows developers to create dynamic, templated customizations across a BigCommerce storefront.

## Handlebars overview

[Handlebars.js](https://handlebarsjs.com/) is a minimal templating language that allows developers to create dynamic and robust templates for any BigCommerce Stencil storefront. A Handlebars template looks like an HTML file, with the addition of Handlebars.js expressions for dynamic logic that can be embedded into the page.

A Handlebars expression begins and end with curly braces. Below is a basic example.

```handlebars title="Using handlebars to access the {{title}} variable" lineNumbers
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body"></div>
</div>
```

In production, Handlebars statements run on the server side, generating HTML received by the shopper’s browser.

View the [full Handlebars Helpers Reference](/stencil-docs/reference-docs/handlebars-helpers-reference) to learn about the helpers available on a Stencil storefront.

## Stencil objects overview

Stencil objects are the individual JavaScript objects that are rendered onto a Stencil storefront. The following example is the JavaScript Object Notation (JSON) for a [Banner object](/stencil-docs/reference-docs/global-objects-and-properties#global-objects_banner) rendered on a category page of a storefront.

```json title="Example banners object JSON for a banner object, accessible through Handlebars.js " lineNumbers
  "banners": {
    "top": [
      "For the week of May 20th, all apparel available at the online store will be 25% off the standard store price."
    ],
    "bottom": [ ],
    "top_metadata": [
      {
        "id": "3",
        "banner-name": "All Apparel 25% off for a limited time!",
        "content": "<p>For the week of May 20th, all apparel available at the online store will be 25% off the standard store price.</p>",
        "location": "top"
      }
    ]
  }
```

![Banners Object (rendered)](//s3.amazonaws.com/user-content.stoplight.io/6116/1558381899909 "Banners Object (rendered)")

As a developer, you can use Handlebars.js syntax to access objects and use them to customize your Stencil theme.

Stencil Objects are categorized as either Global, Common, or Other, which is representative of the object's scope or where in the theme it can be accessed. For example, Global Objects are components shared across the entire BigCommerce storefront.

## YAML front matter overview

BigCommerce Stencil themes utilize YAML front matter on template pages. Front matter allows developers to request objects on the storefront, allowing developers to define each page's design and layout details.


When utilized, Front Matter must be the opening text of a file and must take the form of valid YAML set between triple-dashed lines.

See our [Front Matter Reference](/stencil-docs/reference-docs/front-matter-reference) to see what Front Matter attributes are available on a Stencil storefront. Below is a snippet from the base Cornerstone theme's <span class="fn">home.html</span> file, showing how Front Matter can be used in a theme.


```yml title="YAML Front Matter home.html, Cornerstone theme" lineNumbers
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

* [Stencil Technology Stack Video](//youtube.com/watch/p5SR8N0SeCg) (YouTube)
* [Cornerstone Components Subdirectory](https://github.com/bigcommerce/cornerstone) (BigCommerce GitHub)
