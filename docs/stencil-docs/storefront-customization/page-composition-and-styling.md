# Page Composition and Styling



## Referencing a CSS stylesheet

To apply CSS styling to a page in your theme, make sure that page's code includes a reference to the stylesheet you want to use. This example does so using the `{{partial}}` and `{{cdn}}` custom Handlebars helpers:


```handlebars title="Example of stylesheet link inserted with Handlebars" lineNumbers
{{#partial "head"}}
    <link href="{{cdn '/assets/css/invoice.scss'}}" rel="stylesheet">
{{/partial}}
```

## Template composition

Template composition is a valuable Stencil feature. By defining blocks of overrideable content, your themes can insert templates on a per-page basis, while sharing code that is common to the whole theme.

### Defining content blocks

A base template defines content blocks by name. The following snippet uses `{{block}}` custom Handlebars helpers to define three content blocks, respectively named `head`, `hero`, and `page`:


```handlebars title="Example content block templates/layout/base.html" lineNumbers
<!DOCTYPE html>
<html>
    <head>
        <title>{{ head.title }}</title>
        {{#block "head"}} {{/block}}
    </head>
    <body>
        <div class="body">
		    {{#block "hero"}} {{/block}}
		    <div class="container">
		        {{#block "page"}} {{/block}}
		    </div>
		    {{> components/common/modal}}
        </div>
    </body>
</html>
```

### Replacing content blocks

Pages can use a base template, replacing the defined blocks with their own content. This example replaces content for the head and page blocks:


```handlebars title="Example of replacing content blocks /templates/pages/account/orders/invoice.html" lineNumbers
{{#partial "head"}}
    <link href="{{cdn '/assets/css/invoice.scss'}}" rel="stylesheet">
{{/partial}}

{{#partial "page"}}
    <p>An invoice for a particular order would go here</p>
{{/partial}}
{{> layout/empty}}
```

### Matching partials with blocks

For any given name defined within the template rendering path, we recommend that you maintain a 1:1 mapping of partials to blocks.
